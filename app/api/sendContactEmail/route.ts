import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { contactEmailTemplate } from "../../lib/emailTemplates";

type Body = {
    fullName?: string;
    companyName?: string;
    businessEmailId?: string;
    phoneNumber?: string;
    message?: string;
    website?: string;
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();
    console.log(body);
    if (!body?.businessEmailId) return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : undefined,
      secure: process.env.SMTP_SECURE === "true" || (process.env.SMTP_PORT === "465"),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const to = process.env.CONTACT_TO_EMAIL || "hello@innovaciotech.com";
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || `no-reply@innovaciotech.com`;

    const subject = `Supply chain query: ${body.fullName || body.businessEmailId}`;
    const text = `Name: ${body?.fullName || "-"}\nCompany: ${body.companyName || "-"}\nEmail: ${body.businessEmailId}\n\nMessage:\n${body.message || "-"}`;
    const html = contactEmailTemplate({ name: body.fullName, email: body.businessEmailId, company: body.companyName, message: body.message, phone: body.phoneNumber, website: body.website });

    await transporter.sendMail({ from, to, subject, text, html });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
