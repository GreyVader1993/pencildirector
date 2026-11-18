import { useEffect, useRef, useState } from "react";
import { site } from "../data/site";
import usePageMeta from "../components/usePageMeta";

const empty = { name: "", email: "", type: "", message: "", website: "" };
const TURNSTILE_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
const TURNSTILE_READY = "turnstile-ready";
// Public Turnstile site key, from the TURNSTILE_SITE_KEY environment variable (see vite.config.js).
// It must belong to the same widget as TURNSTILE_SECRET_KEY.
const TURNSTILE_SITE_KEY = import.meta.env.TURNSTILE_SITE_KEY;

export default function Contact() {
  usePageMeta(
    "Enquire",
    "Enquire about commissions, exhibitions, screenings, workshops and collaborations.",
  );
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error
  const [message, setMessage] = useState("");
  const [startedAt] = useState(() => Date.now()); // used by the server to spot instant submissions

  // Turnstile widget: loaded once, then rendered explicitly into the form each time the page opens.
  const widgetHost = useRef(null);
  const widgetId = useRef(null);
  useEffect(() => {
    const renderWidget = () => {
      if (!widgetHost.current || !window.turnstile || widgetId.current !== null)
        return;
      widgetId.current = window.turnstile.render(widgetHost.current, {
        sitekey: TURNSTILE_SITE_KEY,
        theme: "light",
      });
    };

    if (!document.querySelector(`script[src="${TURNSTILE_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = TURNSTILE_SRC;
      script.async = true;
      script.onload = () => window.dispatchEvent(new Event(TURNSTILE_READY));
      document.head.appendChild(script);
    }
    window.addEventListener(TURNSTILE_READY, renderWidget);
    renderWidget();

    return () => {
      window.removeEventListener(TURNSTILE_READY, renderWidget);
      if (widgetId.current !== null) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, []);

  const update = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: undefined }));
  };

  // Each Turnstile token can be used once, so the widget is reset after any failed attempt.
  const resetSpamCheck = () => {
    if (widgetId.current !== null) window.turnstile?.reset(widgetId.current);
  };

  async function submit(e) {
    e.preventDefault();
    const turnstileToken =
      new FormData(e.currentTarget).get("cf-turnstile-response") || "";
    setStatus("sending");
    setMessage("");
    try {
      const res = await fetch("/api/enquire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, startedAt, turnstileToken }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setStatus("sent");
        setForm(empty);
        setErrors({});
        return;
      }
      setErrors(data.errors || {});
      setMessage(
        data.error ||
          "Your message could not be sent. Please try again or email directly.",
      );
      setStatus("error");
      resetSpamCheck();
    } catch {
      setMessage(
        `Your message could not be sent. Please check your connection, or email ${site.email}.`,
      );
      setStatus("error");
      resetSpamCheck();
    }
  }

  if (status === "sent") {
    return (
      <section className="section" aria-labelledby="thanks-heading">
        <div className="enquire__card enquire__thanks">
          <h1 id="thanks-heading">Thank you</h1>
          <p className="lede" role="status">
            Your enquiry has been sent. I will reply to the email address you
            gave.
          </p>
          <p>
            <a className="button" href="/">
              Back to the home page
            </a>
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section" aria-labelledby="contact-heading">
      <div className="enquire">
        <div className="enquire__intro">
          <h1 id="contact-heading">Enquire</h1>
          <p className="lede">
            For commissions, exhibitions, screenings, workshops and
            collaborations.
          </p>
          <p>
            Include what you have in mind, any dates or deadlines, and your
            budget if you have one.
          </p>
          <p className="big">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
          <p className="meta">Prefer email? Write to the address above.</p>
        </div>

        <form className="form enquire__card" onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={form.name}
              onChange={update}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
            />
            {errors.name && (
              <p id="name-error" className="field__error">
                {errors.name}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={update}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
            />
            {errors.email && (
              <p id="email-error" className="field__error">
                {errors.email}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="type">What is your enquiry about?</label>
            <select
              id="type"
              name="type"
              required
              value={form.type}
              onChange={update}
              aria-invalid={Boolean(errors.type)}
              aria-describedby={errors.type ? "type-error" : undefined}
            >
              <option value="">Choose one</option>
              {site.enquiryTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.type && (
              <p id="type-error" className="field__error">
                {errors.type}
              </p>
            )}
          </div>

          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              rows={7}
              required
              value={form.message}
              onChange={update}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
            />
            {errors.message && (
              <p id="message-error" className="field__error">
                {errors.message}
              </p>
            )}
          </div>

          {/* Hidden from people; bots tend to fill it in. */}
          <div className="hp" aria-hidden="true">
            <label htmlFor="website">Website (leave this empty)</label>
            <input
              id="website"
              name="website"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form.website}
              onChange={update}
            />
          </div>

          <div className="field">
            <div ref={widgetHost}></div>
          </div>

          <button
            className="button"
            type="submit"
            disabled={status === "sending"}
          >
            {status === "sending" ? "Sending…" : "Send enquiry"}
          </button>

          <div role="alert" aria-live="assertive" className="form__status">
            {status === "error" && message && (
              <p className="field__error">{message}</p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
