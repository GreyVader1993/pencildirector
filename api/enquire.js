// Vercel serverless function: receives an enquiry from the contact form and
// emails it to the artist via Resend (https://resend.com).
//
// Required environment variables (set in the Vercel project settings):
//   RESEND_API_KEY        API key from Resend
//   ENQUIRY_TO_EMAIL      where enquiries are delivered, e.g. the artist's inbox
//   ENQUIRY_FROM_EMAIL    a sender on a domain verified in Resend, e.g. "Website <enquiries@yourdomain.com>"
//   TURNSTILE_SECRET_KEY  secret key from Cloudflare Turnstile (pairs with site.turnstileSiteKey)

const RESEND_URL = "https://api.resend.com/emails";
const TURNSTILE_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TYPES = [
  "Commission",
  "Exhibition or screening",
  "Workshop or education",
  "Collaboration",
  "Other",
];
const LIMITS = { name: 120, email: 254, message: 5000 };
const MIN_FILL_MS = 3000; // people take longer than this to fill in the form
const MAX_LINKS = 2;

// Remove line breaks so user input cannot inject extra headers into the subject.
const oneLine = (s) => s.replace(/[\r\n]+/g, " ").trim();

function parseBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  try {
    return JSON.parse(req.body || "{}");
  } catch {
    return null;
  }
}

function clientIp(req) {
  const forwarded = req.headers?.["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded)
    return forwarded.split(",")[0].trim();
  return req.socket?.remoteAddress || "";
}

// Asks Cloudflare whether a Turnstile token is valid. Throws if the secret is missing.
async function turnstilePasses(token, ip) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) throw new Error("TURNSTILE_SECRET_KEY is not set");
  const res = await fetch(TURNSTILE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });
  const data = await res.json();
  return data.success === true;
}

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed." });
  }

  const body = parseBody(req);
  if (!body)
    return res.status(400).json({ ok: false, error: "Invalid request." });

  // Honeypot: real visitors leave this field empty. Pretend success for bots.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return res.status(200).json({ ok: true });
  }

  // Time check: the form records when it was shown. A submission faster than a
  // person could type is dropped silently, the same as the honeypot.
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt) || startedAt > Date.now()) {
    return res.status(400).json({ ok: false, error: "Invalid request." });
  }
  if (Date.now() - startedAt < MIN_FILL_MS) {
    return res.status(200).json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const type = typeof body.type === "string" ? body.type.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  const errors = {};
  if (!name) errors.name = "Please enter your name.";
  else if (name.length > LIMITS.name) errors.name = "Name is too long.";
  if (!email) errors.email = "Please enter your email address.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email))
    errors.email = "Please enter a valid email address.";
  if (!TYPES.includes(type))
    errors.type = "Please choose what your enquiry is about.";
  if (!message) errors.message = "Please write a message.";
  else if (message.length > LIMITS.message)
    errors.message = "Message is too long (5,000 characters maximum).";
  else if ((message.match(/https?:\/\/|www\./gi) || []).length > MAX_LINKS)
    errors.message = `Please keep to ${MAX_LINKS} links or fewer.`;

  if (Object.keys(errors).length) {
    return res.status(400).json({
      ok: false,
      error: "Please check the highlighted fields.",
      errors,
    });
  }

  // Bot check: the token comes from the Turnstile widget on the form.
  const token =
    typeof body.turnstileToken === "string" ? body.turnstileToken : "";
  if (!token) {
    return res.status(400).json({
      ok: false,
      error: "Please complete the spam check and try again.",
    });
  }
  try {
    if (!(await turnstilePasses(token, clientIp(req)))) {
      return res.status(400).json({
        ok: false,
        error: "The spam check did not pass. Please try again.",
      });
    }
  } catch (err) {
    console.error("Turnstile check failed:", err);
    return res.status(500).json({
      ok: false,
      error:
        "The enquiry form is not available right now. Please email directly.",
    });
  }

  const { RESEND_API_KEY, ENQUIRY_TO_EMAIL, ENQUIRY_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !ENQUIRY_TO_EMAIL || !ENQUIRY_FROM_EMAIL) {
    console.error(
      "Enquiry email is not configured: set RESEND_API_KEY, ENQUIRY_TO_EMAIL and ENQUIRY_FROM_EMAIL.",
    );
    return res.status(500).json({
      ok: false,
      error:
        "The enquiry form is not available right now. Please email directly.",
    });
  }

  try {
    const upstream = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: ENQUIRY_FROM_EMAIL,
        to: [ENQUIRY_TO_EMAIL],
        reply_to: email,
        subject: oneLine(`New enquiry: ${type} from ${name}`),
        text: [
          `Name: ${name}`,
          `Email: ${email}`,
          `About: ${type}`,
          "",
          message,
        ].join("\n"),
      }),
    });

    if (!upstream.ok) {
      console.error(
        "Resend rejected the enquiry:",
        upstream.status,
        await upstream.text(),
      );
      return res.status(502).json({
        ok: false,
        error:
          "Your message could not be sent. Please try again or email directly.",
      });
    }
  } catch (err) {
    console.error("Could not reach Resend:", err);
    return res.status(502).json({
      ok: false,
      error:
        "Your message could not be sent. Please try again or email directly.",
    });
  }

  return res.status(200).json({ ok: true });
}
