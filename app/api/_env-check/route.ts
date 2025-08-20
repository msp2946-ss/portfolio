import { NextResponse } from "next/server";

export async function GET() {
  const { GMAIL_USER, GMAIL_PASS, SMTP_URL, SENDGRID_API_KEY } = process.env;

  return NextResponse.json({
    hasGmailUser: !!GMAIL_USER,
    hasGmailPass: !!GMAIL_PASS,
    hasSmtpUrl: !!SMTP_URL,
    hasSendGrid: !!SENDGRID_API_KEY,
    anyConfigured: !!(GMAIL_USER && GMAIL_PASS) || !!SMTP_URL || !!SENDGRID_API_KEY,
  });
}
