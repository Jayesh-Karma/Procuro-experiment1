"use client";

import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || 'Failed to send');
      setSent(true);
      setName(''); setEmail(''); setCompany(''); setMessage('');
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white py-25 px-6 md:px-12 lg:px-24">
      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-6">
          <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-500 font-bold text-xs tracking-wider">
            Contact
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-black leading-tight">
            Let's build something that moves the needle.
          </h1>
          <p className="text-black/75 max-w-xl leading-relaxed">
            We specialise in supply-chain intelligence, tailored AI, and integrated dashboards that deliver measurable ROI. Tell us about your challenge and we’ll respond within one business day.
          </p>

          <div className="rounded-lg border border-black/5 p-6 bg-black/[0.02]">
            <h3 className="text-sm font-semibold mb-2">Quick contact details</h3>
            <p className="text-sm text-black/70">Phone: <a className="text-orange-500 font-medium" href="tel:+919007271601">+91 90072 71601</a></p>
            <p className="text-sm text-black/70">Email: <a className="text-orange-500 font-medium" href="mailto:hello@innovaciotech.com">hello@innovaciotech.com</a></p>
            <p className="text-sm text-black/70">Website: <a className="text-orange-500 font-medium" href="https://innovaciotech.com" target="_blank">innovaciotech.com</a></p>
          </div>

          <div className="mt-4">
            <Link href="/book-demo" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-400 shadow-md">
              Book a demo
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full bg-white rounded-2xl border border-black/5 shadow-sm p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="px-4 py-3 rounded-lg border border-black/10 focus:ring-2 focus:ring-orange-200 outline-none" required />
            <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company (optional)" className="px-4 py-3 rounded-lg border border-black/10 focus:ring-2 focus:ring-orange-200 outline-none" />
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Work email" className="px-4 py-3 rounded-lg border border-black/10 focus:ring-2 focus:ring-orange-200 outline-none md:col-span-2" required />
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your project — scope, timeline, goals" className="px-4 py-3 rounded-lg border border-black/10 focus:ring-2 focus:ring-orange-200 outline-none md:col-span-2 min-h-[140px]" required />
          </div>

            <div className="mt-4 flex items-center justify-between">
              <button type="submit" disabled={loading} className="px-6 py-3 rounded-lg bg-orange-500 hover:bg-orange-400 text-white font-semibold shadow disabled:opacity-60">
                {loading ? 'Sending…' : 'Send message'}
              </button>
              <div className="text-xs text-black/50">We respond within one business day.</div>
            </div>

            {sent && (<div className="mt-3 text-sm text-green-600">Thanks — we received your message and will reply within one business day.</div>)}
            {error && (<div className="mt-3 text-sm text-red-600">{error}</div>)}

          </form>
      </section>

      <div className="mt-12">
        <div className="max-w-6xl mx-auto text-center text-xs text-black/50">
          <div className="mt-8 flex items-center justify-center gap-6 text-xs text-black/50">
            <a target="_blank" href="tel:+919007271601" className="hover:text-orange-400 transition-colors">+91 90072 71601</a>
            <span>·</span>
            <a target="_blank" href="mailto:hello@innovaciotech.com" className="hover:text-orange-400 transition-colors">hello@innovaciotech.com</a>
            <span>·</span>
            <a target="_blank" href="https://innovaciotech.com" className="hover:text-orange-400 transition-colors">innovaciotech.com</a>
          </div>
        </div>
      </div>
    </main>
  );
}
