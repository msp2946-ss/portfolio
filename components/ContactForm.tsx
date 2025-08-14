"use client";
import { useState } from "react";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage(null);
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed");
      setMessage("Thanks! I'll get back to you shortly.");
      (e.target as HTMLFormElement).reset();
    } catch (err: any) {
      setMessage(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card grid gap-4">
      <h3 className="font-semibold text-white">Send me a message</h3>
      <div className="grid sm:grid-cols-2 gap-4">
        <input name="name" required placeholder="Your name" className="bg-transparent border border-border rounded-xl px-3 py-2 text-sm" />
        <input name="email" type="email" required placeholder="your.email@example.com" className="bg-transparent border border-border rounded-xl px-3 py-2 text-sm" />
      </div>
      <input name="subject" placeholder="Subject" className="bg-transparent border border-border rounded-xl px-3 py-2 text-sm" />
      <textarea name="message" required placeholder="Tell me about your project..." rows={5} className="bg-transparent border border-border rounded-xl px-3 py-2 text-sm" />
      <button disabled={loading} className="btn btn-primary">{loading ? "Sending..." : "Send Message"}</button>
      {message && <p className="text-sm text-subtext">{message}</p>}
    </form>
  );
}
