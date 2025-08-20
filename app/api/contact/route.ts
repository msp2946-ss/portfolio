import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

async function sendWithSendGrid(apiKey: string, to: string, from: string, subject: string, text: string, html: string) {
  const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: to }] }],
      from: { email: from, name: "Portfolio Contact" },
      subject,
      content: [{ type: "text/plain", value: text }, { type: "text/html", value: html }],
    }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`SendGrid send failed: ${res.status} ${txt}`);
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

  const { GMAIL_USER, GMAIL_PASS, RECEIVER_EMAIL, SMTP_URL, SENDGRID_API_KEY } = process.env;

    // Validate config: either SMTP_URL or GMAIL_USER+GMAIL_PASS must be present
    if (!SMTP_URL && (!GMAIL_USER || !GMAIL_PASS)) {
      console.error("SMTP not configured: missing environment variables.");
      return NextResponse.json({
        error:
          "SMTP is not configured. Set SMTP_URL or GMAIL_USER and GMAIL_PASS in your environment variables (Vercel Dashboard -> Settings -> Environment Variables).",
      }, { status: 500 });
    }

    const to = RECEIVER_EMAIL || GMAIL_USER;
    const from = GMAIL_USER || (RECEIVER_EMAIL ?? "no-reply@example.com");
    const subj = subject || `New message from ${name}`;
    const text = `From: ${name} (${email})\n\n${message}`;
    const html = `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `;

    // If SendGrid key is provided, prefer API-based sending (recommended on Vercel)
    if (SENDGRID_API_KEY) {
      try {
        await sendWithSendGrid(SENDGRID_API_KEY, to!, from!, subj, text, html);
      } catch (sgErr: any) {
        console.error("SendGrid send failed:", sgErr?.message || sgErr);
        return NextResponse.json({ error: `SendGrid send failed: ${sgErr?.message || sgErr}` }, { status: 500 });
      }
      return NextResponse.json({ success: true, message: "Email sent via SendGrid" });
    }

    // Create transporter from SMTP_URL if provided, else use Gmail config
    const transporter = SMTP_URL
      ? nodemailer.createTransport(SMTP_URL)
      : nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true,
          auth: { user: GMAIL_USER, pass: GMAIL_PASS },
        });

    // Verify transporter connection (will throw if bad credentials)
    try {
      await transporter.verify();
    } catch (verifyErr: any) {
      console.error("SMTP Verify Failed:", verifyErr?.message || verifyErr);
      // Provide a helpful hint for Gmail users
      const hint = SMTP_URL
        ? "Check your SMTP_URL and credentials."
        : "If you use Gmail, ensure 2FA is enabled and use an App Password (not your regular password).";
      return NextResponse.json({ error: `SMTP connection failed. ${hint}` }, { status: 500 });
    }

    // Send the mail
    await transporter.sendMail({
      from: `"Portfolio Contact" <${from}>`,
      to,
      subject: subj,
      text,
      html,
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
