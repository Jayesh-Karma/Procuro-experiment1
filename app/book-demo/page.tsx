"use client";

import { useState } from "react";
import Link from "next/link";
import CalEmbed from "@/components/calendly/CadEmbed";
import { Loader2 } from "lucide-react";

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
    <main className="min-h-screen bg-white py-16 sm:py-16 md:py-20 px-4 sm:px-6 md:px-12 lg:px-24">
  <section className="max-w-5xl mx-auto text-center">
    
    {/* Badge */}
    <div className="inline-block px-3 py-1 rounded-full font-space bg-indigo-50 text-indigo-600 font-bold text-xs tracking-wider">
      Demo
    </div>

    {/* Heading */}
    <h1 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight mt-4">
      See the platform in action
    </h1>

    {/* Description */}
    <p className="text-sm sm:text-base text-black/75 max-w-3xl lg:max-w-4xl font-space mx-auto leading-relaxed mt-4">
      A 30-minute walkthrough to show how we’d configure the system for your operation, dashboards, forecasting, and integrations. Pick a time and we’ll prepare a focused demo tailored to your use-case.
    </p>

    {/* GRID */}
    <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
      
      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-black/10 p-4 sm:p-6 shadow-sm w-full"
      >
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-lg border border-black/10 focus:ring-2 focus:ring-indigo-100 outline-none"
            required
          />

          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Company"
            className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-lg border border-black/10 focus:ring-2 focus:ring-indigo-100 outline-none"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Work email"
            className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-lg border border-black/10 focus:ring-2 focus:ring-indigo-100 outline-none"
            required
          />

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="What would you like to focus on in the demo?"
            className="px-3 sm:px-4 py-2.5 sm:py-3 text-sm rounded-lg border border-black/10 focus:ring-2 focus:ring-indigo-100 outline-none min-h-[100px] sm:min-h-[120px]"
          />
        </div>

        {/* BUTTON ROW */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto px-5 py-2.5 sm:py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                Sending...
                <Loader2 className="animate-spin w-4 h-4" />
              </>
            ) : (
              "Request demo"
            )}
          </button>

          <div className="text-xs text-black/50 text-center sm:text-right">
            Typical demo: 30 minutes
          </div>
        </div>

        {/* FEEDBACK */}
        {sent && (
          <div className="mt-3 text-sm font-space text-green-600 text-center sm:text-left">
            Thanks for reaching out! We received your request and will reach out to schedule.
          </div>
        )}

        {error && (
          <div className="mt-3 text-sm text-red-600 font-space text-center sm:text-left">
            {error}
          </div>
        )}
      </form>

      {/* RIGHT PANEL */}
      <div className="bg-black/[0.02] rounded-2xl p-4 sm:p-6 font-space text-left">
        
        <h3 className="font-semibold text-base sm:text-lg">
          What to expect
        </h3>

        <ul className="mt-3 space-y-2 text-sm text-black/70">
          <li>Focused agenda tailored to your use-case</li>
          <li>Live walkthrough of integrations and dashboards</li>
          <li>Q&A on deployment, data, and timeline</li>
        </ul>

        <div className="mt-6">
          <Link
            href="/contact"
            className="text-sm text-indigo-600 underline break-words"
          >
            Prefer to discuss? Contact us
          </Link>
        </div>
      </div>
    </div>
  </section>
</main>
  );
}
