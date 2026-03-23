type ContactBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
};

type DemoBody = {
  name?: string;
  email?: string;
  company?: string;
  notes?: string;
};

function wrapHtml(title: string, headerColor = "#F97316", content: string) {
  return `<!doctype html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body style="font-family:Inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; margin:0; padding:0; background:#f7f7fb;">
      <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
        <tr>
          <td style="padding:24px 16px;">
            <table width="680" align="center" cellpadding="0" cellspacing="0" role="presentation" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 6px 30px rgba(16,24,40,0.08);">
              <tr>
                <td style="padding:20px 28px; background:${headerColor}; color:#fff;">
                  <h2 style="margin:0; font-size:20px; font-weight:700;">${title}</h2>
                </td>
              </tr>
              <tr>
                <td style="padding:24px 28px; color:#0f172a; font-size:14px; line-height:1.5;">
                  ${content}
                </td>
              </tr>
              <tr>
                <td style="padding:18px 28px; font-size:12px; color:#667085; background:#fafafa;">
                  <div>Sent from <strong>innovaciotech.com</strong></div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>`;
}

export function contactEmailTemplate(body: ContactBody) {
  const name = body.name || "-";
  const email = body.email || "-";
  const company = body.company || "-";
  const message = (body.message || "-").replace(/\n/g, "<br />");

  const content = `
    <p style="margin:0 0 12px 0; color:#0f172a;">You have a new contact request submitted through the website.</p>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:8px; border-collapse:collapse;">
      <tr>
        <td style="padding:10px 0; width:140px; color:#667085;">Type</td>
        <td style="padding:10px 0; font-weight:600;">Contact Request</td>
      </tr>
      <tr>
        <td style="padding:10px 0; color:#667085;">Name</td>
        <td style="padding:10px 0; font-weight:600;">${name}</td>
      </tr>
      <tr>
        <td style="padding:10px 0; color:#667085;">Company</td>
        <td style="padding:10px 0; font-weight:600;">${company}</td>
      </tr>
      <tr>
        <td style="padding:10px 0; color:#667085;">Email</td>
        <td style="padding:10px 0; font-weight:600;">${email}</td>
      </tr>
    </table>

    <div style="margin-top:18px;">
      <strong style="display:block; margin-bottom:8px; color:#0f172a;">Message</strong>
      <div style="color:#102a43; background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #eef2ff;">${message}</div>
    </div>
  `;

  return wrapHtml("New Contact Request", "#0f172a", content);
}

export function demoEmailTemplate(body: DemoBody) {
  const name = body.name || "-";
  const email = body.email || "-";
  const company = body.company || "-";
  const notes = (body.notes || "-").replace(/\n/g, "<br />");

  const content = `
    <p style="margin:0 0 12px 0; color:#0f172a;">You have a new demo request submitted through the website.</p>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:8px; border-collapse:collapse;">
      <tr>
        <td style="padding:10px 0; width:140px; color:#667085;">Type</td>
        <td style="padding:10px 0; font-weight:600;">Demo Request</td>
      </tr>
      <tr>
        <td style="padding:10px 0; color:#667085;">Name</td>
        <td style="padding:10px 0; font-weight:600;">${name}</td>
      </tr>
      <tr>
        <td style="padding:10px 0; color:#667085;">Company</td>
        <td style="padding:10px 0; font-weight:600;">${company}</td>
      </tr>
      <tr>
        <td style="padding:10px 0; color:#667085;">Email</td>
        <td style="padding:10px 0; font-weight:600;">${email}</td>
      </tr>
    </table>

    <div style="margin-top:18px;">
      <strong style="display:block; margin-bottom:8px; color:#0f172a;">Notes</strong>
      <div style="color:#102a43; background:#f8fafc; padding:12px; border-radius:8px; border:1px solid #eef2ff;">${notes}</div>
    </div>

    <div style="margin-top:18px; color:#475569; font-size:13px;">Please follow up to schedule the demo. If a Calendly link was used, check the booking details in Calendly.</div>
  `;

  return wrapHtml("New Demo Request", "#3730a3", content);
}

export default { contactEmailTemplate, demoEmailTemplate };
