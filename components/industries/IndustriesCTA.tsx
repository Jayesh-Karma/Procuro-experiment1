"use client";

import { useEffect, useRef, useState } from "react";

export default function IndustriesCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="relative bg-stone-950 py-24 px-6 md:px-12 overflow-hidden">

      {/* Orange top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[220px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.18) 0%, transparent 70%)" }} />

      {/* Top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.5) 40%, rgba(249,115,22,0.5) 60%, transparent)" }} />

      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      <div
        ref={ref}
        className="relative max-w-3xl mx-auto text-center"
        style={{
          opacity:   vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-xs font-semibold text-orange-400 tracking-widest uppercase">
            Your industry. Your data.
          </span>
        </div>

        <h2 className="font-display text-[clamp(26px,4vw,46px)] font-extrabold text-white leading-tight tracking-tight mb-4">
          See how it works
          <br />
          <span className="text-orange-400">for your industry.</span>
        </h2>

        <p className="text-base text-stone-400 font-light max-w-lg mx-auto leading-relaxed mb-10">
          Get a personalized demo tailored to your specific supply chain challenges, industry workflows, and existing systems.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
          <button className="w-full sm:w-auto px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold shadow-xl shadow-orange-900/30 transition-all hover:-translate-y-0.5">
            Book a personalized demo →
          </button>
          <button className="w-full sm:w-auto px-7 py-4 rounded-xl border border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 text-sm font-medium transition-all">
            Talk to our team
          </button>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          {[
            { icon: "🔒", text: "Your data stays on your servers" },
            { icon: "⚡", text: "Live in under 5 days" },
            { icon: "🧠", text: "AI trained on your data only" },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-2">
              <span className="text-base">{t.icon}</span>
              <span className="text-xs text-stone-500">{t.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
