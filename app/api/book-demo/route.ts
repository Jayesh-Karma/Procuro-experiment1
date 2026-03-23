import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { demoEmailTemplate } from "../../lib/emailTemplates";

type Body = {
  name?: string;
  email: string;
  company?: string;
  notes?: string;
};

export async function POST(req: Request) {
  try {
    const body: Body = await req.json();
    if (!body?.email) return NextResponse.json({ ok: false, error: "Missing email" }, { status: 400 });

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
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || `no-reply@${process.env.NEXT_PUBLIC_VERCEL_URL || "innovaciotech.com"}`;

    const subject = `Demo request: ${body.name || body.email}`;
    const text = `Name: ${body.name || "-"}\nCompany: ${body.company || "-"}\nEmail: ${body.email}\n\nNotes:\n${body.notes || "-"}`;
    const html = demoEmailTemplate({ name: body.name, email: body.email, company: body.company, notes: body.notes });

    await transporter.sendMail({ from, to, subject, text, html });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || String(err) }, { status: 500 });
  }
}
