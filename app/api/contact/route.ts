import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

function loadDotEnvFile(filePath: string) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split(/\n/);
    for (const line of lines) {
      const l = line.trim();
      if (!l || l.startsWith("#") || l.indexOf("=") === -1) continue;
      const idx = l.indexOf("=");
      const key = l.slice(0, idx);
      let val = l.slice(idx + 1);
      // remove surrounding quotes
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = val;
    }
  } catch (e) {
    // ignore
  }
}

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Fallback: attempt to load .env if variables are missing (useful when .env exists in repo)
    const rootEnvPath = path.resolve(process.cwd(), ".env");
    loadDotEnvFile(rootEnvPath);
    // also attempt .env.local
    loadDotEnvFile(path.resolve(process.cwd(), ".env.local"));

    let { GMAIL_USER, GMAIL_PASS, RECEIVER_EMAIL, SMTP_URL } = process.env as {
      GMAIL_USER?: string;
      GMAIL_PASS?: string;
      RECEIVER_EMAIL?: string;
      SMTP_URL?: string;
    };

    // Normalize credentials: trim and remove accidental spaces in app password
    if (GMAIL_USER) GMAIL_USER = GMAIL_USER.trim();
    if (GMAIL_PASS) GMAIL_PASS = GMAIL_PASS.replace(/\s+/g, '').trim();

    // Validate config: either SMTP_URL or GMAIL_USER+GMAIL_PASS must be present
    if (!SMTP_URL && (!GMAIL_USER || !GMAIL_PASS)) {
      console.error("SMTP not configured: missing environment variables.");
      return NextResponse.json({
        error:
          "SMTP is not configured. Set GMAIL_USER and GMAIL_PASS (App Password) in your environment variables (Vercel Dashboard -> Settings -> Environment Variables) or add a .env file locally.",
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
