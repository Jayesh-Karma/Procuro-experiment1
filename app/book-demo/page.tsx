"use client";

import { useState } from "react";
import Link from "next/link";
import CalEmbed from "@/components/calendly/CadEmbed";

export default function BookDemoPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/book-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company, notes }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data?.error || 'Failed to send');
      setSent(true);
      setName(''); setEmail(''); setCompany(''); setNotes('');
    } catch (err: any) {
      setError(err?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white py-20 px-6 md:px-12 lg:px-24">
      <section className="max-w-5xl mx-auto text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 font-bold text-xs tracking-wider">
          Demo
        </div>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold text-black leading-tight mt-4">
          See the platform in action
        </h1>
        <p className="text-black/75 max-w-3xl mx-auto leading-relaxed mt-4">
          A 30-minute walkthrough to show how we’d configure the system for your operation — dashboards, forecasting, and integrations. Pick a time and we’ll prepare a focused demo tailored to your use-case.
        </p>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-black/5 p-6 md:p-8 shadow-sm">
            <div className="grid grid-cols-1 gap-4">
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" className="px-4 py-3 rounded-lg border border-black/10 focus:ring-2 focus:ring-indigo-100 outline-none" required />
              <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company" className="px-4 py-3 rounded-lg border border-black/10 focus:ring-2 focus:ring-indigo-100 outline-none" />
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Work email" className="px-4 py-3 rounded-lg border border-black/10 focus:ring-2 focus:ring-indigo-100 outline-none" required />
              <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="What would you like to focus on in the demo?" className="px-4 py-3 rounded-lg border border-black/10 focus:ring-2 focus:ring-indigo-100 outline-none min-h-[120px]" />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button type="submit" disabled={loading} className="px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold shadow disabled:opacity-60">{loading ? 'Sending…' : 'Request demo'}</button>
              <div className="text-xs text-black/50">Typical demo: 30 minutes</div>
            </div>

            {sent && (<div className="mt-3 text-sm text-green-600">Thanks — we received your request and will reach out to schedule.</div>)}
            {error && (<div className="mt-3 text-sm text-red-600">{error}</div>)}

          </form>

          <div className="bg-black/[0.02] rounded-2xl p-6">
            <h3 className="font-semibold">What to expect</h3>
            <ul className="mt-3 space-y-2 text-sm text-black/70">
              <li>Focused agenda tailored to your use-case</li>
              <li>Live walkthrough of integrations and dashboards</li>
              <li>Q&A on deployment, data, and timeline</li>
            </ul>

            <div className="mt-6">
              <Link href="/contact" className="text-sm text-indigo-600 underline">Prefer to discuss? Contact us</Link>
            </div>

            {/* Calendly embed (optional). Set NEXT_PUBLIC_CALENDLY_URL in env to use inline embed */}
            {/* {typeof process !== 'undefined' && process.env.NEXT_PUBLIC_CALENDLY_URL && (
              <div className="mt-6">
                <div className="text-sm font-semibold mb-2">Schedule directly</div>
                <div className="w-full h-[640px] rounded-lg overflow-hidden border">
                  <iframe
                    src={process.env.NEXT_PUBLIC_CALENDLY_URL}
                    className="w-full h-full"
                    frameBorder={0}
                    title="Schedule a demo"
                  />
                </div>
              </div>
            )} */}
            {/* <CalEmbed /> */}
          </div>
        </div>
      </section>
    </main>
  );
}
