'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.ok) {
        toast.success('Message sent successfully!');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        const data = await res.json();
        toast.error(data.error || 'Something went wrong');
      }
    } catch (error) {
      toast.error('Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-center mb-8 text-cyan-400"
      >
        Contact Me
      </motion.h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-cyan-400">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/30 border border-cyan-400 text-white"
          required
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-black/30 border border-cyan-400 text-white"
          required
        />
        <textarea
          placeholder="Your Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          className="w-full p-3 rounded-lg bg-black/30 border border-cyan-400 text-white"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition"
        >
          {loading ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </section>
  );
}
