// Automatic reply sent to someone straight after they submit the enquiry form.
// Used by api/enquire.js. Edit the wording here; colors match the site's palette.
// Draft copy: check the wording reads the way you want it to.

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export const autoReplySubject = "Thank you for your enquiry";

export function autoReplyText(name) {
  return [
    `Dear ${name},`,
    "",
    "Thank you for getting in touch. I have received your enquiry and will reply to you by email as soon as I can.",
    "",
    "Warm regards,",
    "Shraddha Tiwari",
    "thepencildirector.com",
  ].join("\n");
}

export function autoReplyHtml(name) {
  const n = escapeHtml(name);
  return `<!doctype html>
<html lang="en">
  <body style="margin:0; padding:0; background:#fdf4ee;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fdf4ee; padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="560" cellpadding="0" cellspacing="0" style="max-width:560px; width:100%; background:#ffffff; border-radius:20px; overflow:hidden;">
            <tr>
              <td style="background:#faa275; padding:28px 36px;">
                <p style="margin:0; font-family:Georgia, 'Times New Roman', serif; font-weight:700; font-size:22px; color:#5c374c;">Shraddha Tiwari</p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px 36px 12px; font-family:Helvetica, Arial, sans-serif; font-size:16px; line-height:1.6; color:#3b2433;">
                <h1 style="margin:0 0 20px; font-family:Georgia, 'Times New Roman', serif; font-weight:700; font-size:28px; line-height:1.2; color:#5c374c;">Thank you for your enquiry</h1>
                <p style="margin:0 0 16px;">Dear ${n},</p>
                <p style="margin:0 0 16px;">Thank you for getting in touch. I have received your enquiry and will reply to you by email as soon as I can.</p>
                <p style="margin:0 0 24px;">Warm regards,<br /><span style="color:#985277; font-weight:700;">Shraddha Tiwari</span></p>
              </td>
            </tr>
            <tr>
              <td style="padding:0 36px 36px;">
                <table role="presentation" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="background:#985277; border-radius:999px; padding:12px 24px;">
                      <a href="https://thepencildirector.com/work" style="font-family:Helvetica, Arial, sans-serif; font-weight:700; font-size:15px; color:#ffffff; text-decoration:none;">See the work</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="background:#5c374c; padding:20px 36px; font-family:Helvetica, Arial, sans-serif; font-size:13px; color:#fbe6da;">
                Shraddha Tiwari &middot; <a href="https://thepencildirector.com" style="color:#faa275;">thepencildirector.com</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
