import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email, name, company, date, time, message } =
      await request.json();

    // Validation
    if (!email || !name || !date || !time) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Format date and time
    const demoDate = new Date(date);
    const formattedDate = demoDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL_RECIPIENT,
      subject: `New Demo Booking Request from ${name}`,
      html: `
        <h2>New Demo Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        <p><strong>Requested Date:</strong> ${formattedDate}</p>
        <p><strong>Requested Time:</strong> ${time}</p>
        ${
          message
            ? `<p><strong>Additional Notes:</strong></p>
        <p>${message.replace(/\n/g, "<br />")}</p>`
            : ""
        }
        <br />
        <p style="color: #666;">Please reach out to the customer to confirm the demo booking.</p>
      `,
    });

    // Send confirmation email to user
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Demo Booking Confirmation - Procuro",
      html: `
        <h2>Demo Booking Confirmed!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for scheduling a demo with Procuro. We're excited to show you how our AI-powered procurement platform can transform your business.</p>
        <br />
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Your Demo Details:</h3>
          <p><strong>Date:</strong> ${formattedDate}</p>
          <p><strong>Time:</strong> ${time}</p>
          ${company ? `<p><strong>Company:</strong> ${company}</p>` : ""}
        </div>
        <p>Our team will send you a meeting link shortly. If you need to reschedule, just reply to this email.</p>
        <br />
        <p>Looking forward to meeting you!<br /><strong>Procuro Team</strong></p>
      `,
    });

    return NextResponse.json(
      { message: "Demo booking scheduled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to schedule demo" },
      { status: 500 }
    );
  }
}
