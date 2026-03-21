"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Industry } from "./data";

function useInView(threshold = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

export default function IndustryBlock({
  industry,
  index,
}: {
  industry: Industry;
  index: number;
}) {
  const { ref, vis } = useInView(0.06);
  const isEven = index % 2 === 0;
  const a = industry.color;

  return (
    <div
      id={`industry-${industry.id}`}
      ref={ref}
      className={`relative overflow-hidden ${index % 2 === 0 ? "bg-white" : "bg-[#fafaf9]"}`}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-stone-100" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 py-20">
        <div className={`grid md:grid-cols-2 gap-10 lg:gap-16 items-start ${!isEven ? "md:[&>*:first-child]:order-2" : ""}`}>

          {/* ── Text side ─────────────────────────────────────── */}
          <div
            style={{
              opacity:   vis ? 1 : 0,
              transform: vis ? "translateX(0)" : `translateX(${isEven ? "-28px" : "28px"})`,
              transition: "opacity 0.65s ease-out, transform 0.65s ease-out",
            }}
          >
            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-[10px] font-bold uppercase tracking-[0.16em] ${a.text}`}>
                {industry.emoji} {industry.label}
              </span>
            </div>

            {/* Headline */}
            <h2 className="font-display text-[clamp(22px,2.8vw,34px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-4">
              {industry.tagline}
            </h2>

            <p className="text-sm text-stone-400 font-light leading-relaxed mb-8 max-w-sm">
              Every challenge below is documented from real operations teams in {industry.label.toLowerCase()} - and solved directly by Our Product.
            </p>

            {/* Challenges vs Solutions */}
            <div className="space-y-3 mb-8">
              {industry.challenges.map((challenge, i) => (
                <div key={i} className="grid grid-cols-2 gap-3">
                  {/* Problem */}
                  <div className="flex items-start gap-2 bg-stone-50 border border-stone-100 rounded-xl p-3">
                    <div className="w-4 h-4 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg viewBox="0 0 8 8" fill="none" className="w-2 h-2 text-red-400" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                        <line x1="1.5" y1="1.5" x2="6.5" y2="6.5" /><line x1="6.5" y1="1.5" x2="1.5" y2="6.5" />
                      </svg>
                    </div>
                    <p className="text-[11px] text-stone-500 font-light leading-snug">{challenge}</p>
                  </div>
                  {/* Solution */}
                  <div className={`flex items-start gap-2 ${a.bg} border ${a.border} rounded-xl p-3`}>
                    <div className={`w-4 h-4 rounded-full ${a.bg} border ${a.border} flex items-center justify-center flex-shrink-0 mt-0.5 ${a.text}`}>
                      <svg viewBox="0 0 8 8" fill="none" className="w-2 h-2" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="1 4 3 6.5 7 2" />
                      </svg>
                    </div>
                    <p className="text-[11px] text-stone-700 leading-snug">
                      {industry.solutions[i]}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Outcomes */}
            <div className="grid grid-cols-2 gap-2.5 mb-8">
              {industry.outcomes.map((o) => (
                <div
                  key={o.label}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl ${a.bg} border ${a.border}`}
                >
                  <span className={`font-display text-xl font-extrabold leading-none ${a.text}`}>
                    {o.value}
                  </span>
                  <span className="text-[11px] text-stone-500 leading-tight">{o.label}</span>
                </div>
              ))}
            </div>

            {/* Dual CTA */}
            <div className="flex items-center gap-3">
              <button
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg"
                style={{ background: a.hex, boxShadow: `0 6px 20px ${a.glow}` }}
              >
                {industry.ctaDemo}
                <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                </svg>
              </button>
              <a
                href={industry.caseHref}
                target="_blank"
                className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold border transition-all hover:-translate-y-0.5 ${a.text} ${a.bg} ${a.border}`}
              >
                {industry.ctaCase}
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 10L10 2M10 2H5.5M10 2V6.5" />
                </svg>
              </a>
            </div>
          </div>

          {/* ── Visual side - real photography ──────────────── */}
          <div
            style={{
              opacity:   vis ? 1 : 0,
              transform: vis ? "translateY(0)" : "translateY(24px)",
              transition: "opacity 0.65s 0.12s ease-out, transform 0.65s 0.12s ease-out",
            }}
          >
            <div className="relative">
              {/* Glow */}
              <div
                className="absolute -inset-2 rounded-3xl blur-2xl pointer-events-none"
                style={{ background: a.glow, opacity: 0.8 }}
              />

              {/* Main photo card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-stone-200/60 border border-stone-100">
                <div className="relative h-72 md:h-80">
                  <Image
                    src={industry.heroImage}
                    alt={`${industry.label} supply chain`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index < 2}
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: a.hex }} />

                  {/* Overlay content */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-white/60 text-[10px] font-medium uppercase tracking-widest mb-1">
                          {industry.label} · AI Supply Chain
                        </p>
                        <p className="text-white font-display text-lg font-bold leading-tight">
                          {industry.outcomes[0].value}{" "}
                          <span className="font-light text-white/80 text-sm">
                            {industry.outcomes[0].label}
                          </span>
                        </p>
                      </div>
                      {/* Live badge */}
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] text-white font-medium">Live monitoring</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stat strip below image */}
                <div className="grid grid-cols-3 divide-x divide-stone-100 bg-white">
                  {industry.outcomes.slice(1, 4).map((o) => (
                    <div key={o.label} className="px-4 py-4 text-center">
                      <p className={`font-display text-lg font-extrabold leading-none ${a.text}`}>
                        {o.value}
                      </p>
                      <p className="text-[9px] text-stone-400 mt-1 leading-tight">{o.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating tag */}
              <div
                className="absolute -top-3 -right-3 flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-stone-200 shadow-lg shadow-stone-100/60"
              >
                <span className="text-lg">{industry.emoji}</span>
                <div>
                  <p className={`text-[10px] font-bold ${a.text} leading-none`}>{industry.label}</p>
                  <p className="text-[9px] text-stone-400 mt-0.5">Fully configured</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
