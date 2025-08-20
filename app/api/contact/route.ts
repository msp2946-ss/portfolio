import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Configure transporter (use App Password for Gmail!)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for 465, false for 587
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Try verifying the transporter first
    await transporter.verify().catch((err) => {
      console.error("SMTP Verify Failed:", err);
      throw new Error("SMTP connection failed. Check credentials.");
    });

    // Send the mail
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.GMAIL_USER,
      subject: subject || `New message from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully!" });
  } catch (err: any) {
    console.error("Mail error:", err);
    return NextResponse.json(
      { error: err.message || "Mail failed" },
      { status: 500 }
    );
  }
}

// Optional: block GET and other methods
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}
