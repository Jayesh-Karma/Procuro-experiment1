import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { contactEmailTemplate, downloadCaseStudyEmailTemplate, sendCaseStudyDownloadDetailsToAdmin } from "../../lib/emailTemplates";
import path  from "path";

type Body = {
    fullName?: string;
    companyName?: string;
    businessEmailId?: string;
    phoneNumber?: string;
    message?: string;
    website?: string;
    selectedCaseStudy?: string;
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();
    if (!body?.businessEmailId) return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });
    
      
    const filePath = body?.selectedCaseStudy ? path.join(process.cwd(), "public", "case-studies", `${body.selectedCaseStudy}.pdf`) : null;



    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined,
      secure: process.env.SMTP_SECURE === "true" || (process.env.SMTP_PORT === "465"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to1 = body.businessEmailId;
    const from1 = process.env.SMTP_FROM || process.env.SMTP_USER || `no-reply@innovaciotech.com`;
    const subject1 = `Case Study`;
    const text1 = `Name: ${body?.fullName || "-"}\nCompany: ${body.companyName || "-"}\nEmail: ${body.businessEmailId}\n\nMessage:\n${body.message || "-"}`;
    const userHtml1 = downloadCaseStudyEmailTemplate({ name: body.fullName});

await transporter.sendMail({ 
      from: from1, 
      to: to1, 
      subject: subject1, 
      text: text1, 
      html: userHtml1,
      attachments: filePath ? [{ filename: path.basename(filePath), path: filePath }] : undefined,
    });

    const adminEmail = process.env.CONTACT_TO_EMAIL || process.env.SMTP_USER || `hello@innovaciotech.com`;
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || `no-reply@innovaciotech.com`;
    const subject = `New Case Study Download: ${body.fullName || "Unknown User"}`;
    const text = `Name: ${body?.fullName || "-"}\nCompany: ${body.companyName || "-"}\nEmail: ${body.businessEmailId}\nPhone: ${body.phoneNumber || "-"}\nWebsite: ${body.website || "-"}\nCase Study: ${body.selectedCaseStudy || "-"}\n\nMessage:\n${body.message || "-"}`;
    const html = sendCaseStudyDownloadDetailsToAdmin({ name: body.fullName, email: body.businessEmailId, company: body.companyName, message: body.message, phone: body.phoneNumber, website: body.website }, body?.selectedCaseStudy || "Unknown Case Study"  );


    await transporter.sendMail({ from, to: adminEmail, subject, text, html });


    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
