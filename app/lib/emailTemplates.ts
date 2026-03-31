type ContactBody = {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
  website?: string;
  phone?: string;
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
                <td style="padding:20px 28px; background:#f97316; color:#fff;">
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
  const website = body.website || "-";
  const message = (body.message || "-").replace(/\n/g, "<br />");
  const phone = body.phone || "-";


  const content = `
    <p style="margin:0 0 12px 0; color:#f97316;">You have a new contact request submitted through the AI in supply chain website.</p>

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
      <tr>
        <td style="padding:10px 0; color:#667085;">Phone</td>
        <td style="padding:10px 0; font-weight:600;">${phone}</td>
      </tr>
      <tr>
        <td style="padding:10px 0; color:#667085;">Website</td>
        <td style="padding:10px 0; font-weight:600;">${website}</td>
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
    <p style="margin:0 0 12px 0; color:#">You have a new demo request submitted through the website.</p>

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

export function downloadCaseStudyEmailTemplate(body: any) {
  const name = body.name || "-";

  const content = `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 20px;">

      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td style="background:#f97316;padding:20px;text-align:center;color:#ffffff;font-size:20px;font-weight:bold;">
            Case Study for Supply Chain AI from Innovacio Technologies
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:30px;">


            <h2 style="margin:0 0 10px 0;color:#111827;">Thanks for your interest</h2>
            
            <p style="color:#4b5563;font-size:14px;line-height:1.6;">
              Hi ${name},
            </p>

            <p style="color:#4b5563;font-size:14px;line-height:1.6;">
              Thank you for downloading our case study. We hope it provides valuable insights into how we solve real-world problems.
            </p>

            <p style="color:#4b5563;font-size:14px;line-height:1.6;">
              Your requested case study is attached with this email.
            </p>

            <!-- CTA -->
            <div style="text-align:center;margin:30px 0;">
              <a href="https://innovaciotech.com" target="_blank" rel="noopener noreferrer"
                 style="background:#f97316;color:#ffffff;padding:12px 20px;text-decoration:none;border-radius:6px;font-size:14px;font-weight:600;">
                Visit Our Website
              </a>
            </div>

            <p style="color:#6b7280;font-size:13px;">
              If you have any questions, feel free to reply to this email - we’d love to help.
            </p>

            <p style="margin-top:20px;color:#111827;font-size:14px;font-weight:500;">
              Team Innovacio
            </p>
          </td>
        </tr>


      </table>

    </td>
  </tr>
</table>
  `

  return content;
}

export function sendCaseStudyDownloadDetailsToAdmin(body: ContactBody, caseStudyName: string) {
  
  console.log("Preparing admin notification email for case study download:", body, caseStudyName);
const name = body.name || "-";
const email = body.email || "-";
const company = body.company || "-";
const website = body.website || "-";
const phone = body.phone || "-";
const message = `User downloaded the case study: ${caseStudyName}`;
const userMessage = body.message || "-";

  const content = `
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding:40px 20px;">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td style="background:#f97316;padding:20px;text-align:center;color:#ffffff;font-size:20px;font-weight:bold;">
            New Case Study Lead
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:30px;">
            <h2 style="margin:0 0 20px 0;color:#111827;">New submission received</h2>

            <table width="100%" cellpadding="8" cellspacing="0" style="font-size:14px;color:#374151;">
              
              <tr>
                <td style="font-weight:bold;">Full Name:</td>
                <td>${name}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;">Company:</td>
                <td>${company}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;">Email:</td>
                <td>${email}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;">Phone:</td>
                <td>${phone}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;">Website:</td>
                <td>${website}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;">Case Study:</td>
                <td>${caseStudyName}</td>
              </tr>

              <tr>
                <td style="font-weight:bold;">Message:</td>
                <td>${userMessage}</td>
              </tr>

            </table>

            <div style="margin-top:30px;padding:15px;background:#fff7ed;border:1px solid #fed7aa;border-radius:6px;">
              <p style="margin:0;color:#9a3412;font-size:13px;">
                This user has downloaded a case study. Consider following up.
              </p>
            </div>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#f3f4f6;padding:15px;text-align:center;font-size:12px;color:#6b7280;">
            Internal Notification • Case Study • Innovacio Technologies Supply Chain Solutions
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
  `

  return content;
}


export default { contactEmailTemplate, demoEmailTemplate, downloadCaseStudyEmailTemplate, sendCaseStudyDownloadDetailsToAdmin };

