#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, 'utf8');
  content.split(/\n/).forEach((line) => {
    line = line.trim();
    if (!line || line.startsWith('#')) return;
    const idx = line.indexOf('=');
    if (idx === -1) return;
    const key = line.slice(0, idx);
    const val = line.slice(idx + 1);
    // do not override existing env
    if (process.env[key] === undefined) process.env[key] = val;
  });
}

async function run() {
  const envPath = path.resolve(process.cwd(), '.env.local');
  console.log('Loading', envPath);
  loadEnvFile(envPath);
  // also attempt to load .env for cases where user put credentials there
  loadEnvFile(path.resolve(process.cwd(), '.env'));

  let { SENDGRID_API_KEY, SMTP_URL, GMAIL_USER, GMAIL_PASS, RECEIVER_EMAIL } = process.env;
  if (GMAIL_USER) GMAIL_USER = GMAIL_USER.trim();
  if (GMAIL_PASS) GMAIL_PASS = GMAIL_PASS.replace(/\s+/g, '').trim();

  if (!SENDGRID_API_KEY && !SMTP_URL && (!GMAIL_USER || !GMAIL_PASS)) {
    console.error('Missing configuration. Please create .env.local with either SENDGRID_API_KEY or SMTP_URL or GMAIL_USER+GMAIL_PASS.');
    process.exit(2);
  }

  const to = RECEIVER_EMAIL || GMAIL_USER || 'no-reply@example.com';
  const from = GMAIL_USER || RECEIVER_EMAIL || 'no-reply@example.com';

  if (SENDGRID_API_KEY) {
    console.log('Detected SENDGRID_API_KEY — attempting SendGrid API call (no email will be sent, only an API check).');
    // Quick check: try a simple API call to validate key by sending an empty request with minimal payload
    try {
      const res = await fetch('https://api.sendgrid.com/v3/user/account', {
        headers: { Authorization: `Bearer ${SENDGRID_API_KEY}` },
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`SendGrid key invalid: ${res.status} ${txt}`);
      }
      console.log('SendGrid API key is valid.');
      process.exit(0);
    } catch (e) {
      console.error('SendGrid check failed:', e.message || e);
      process.exit(3);
    }
  }

  // Otherwise test SMTP
  const transporter = SMTP_URL
    ? nodemailer.createTransport(SMTP_URL)
    : nodemailer.createTransport({ host: 'smtp.gmail.com', port: 465, secure: true, auth: { user: GMAIL_USER, pass: GMAIL_PASS } });

  try {
    console.log('Verifying SMTP transporter...');
    await transporter.verify();
    console.log('SMTP transporter verified successfully.');
    // Optionally send a test message (commented to avoid accidental sends)
    // await transporter.sendMail({ from, to, subject: 'SMTP Test', text: 'This is a test' });
    process.exit(0);
  } catch (err) {
    console.error('SMTP verify failed:', err && err.message ? err.message : err);
    process.exit(4);
  }
}

run();
