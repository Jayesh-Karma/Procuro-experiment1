"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "@/components/Modal/ModalProvider";
import Image from "next/image";
import { CASE_STUDIES } from "./data";

function useInView() {
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
  return { ref, vis };
}

export default function CaseStudiesPreview() {
  const { ref, vis } = useInView();
  const modal = useModal();

  return (
    <section className="relative bg-[#fafaf9] py-20 px-6 md:px-12">
      <div className="absolute top-0 left-0 right-0 h-px bg-stone-100" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div
          ref={ref}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          style={{
            opacity:   vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
              <span className="text-xs font-semibold text-orange-600 tracking-widest uppercase">Proof</span>
            </div>
            <h2 className="font-display text-[clamp(24px,3.5vw,40px)] font-extrabold text-stone-900 tracking-tight">
              Real companies.
              <span className="text-orange-500"> Measurable results.</span>
            </h2>
          </div>
          <a href="/case-studies"
            className="flex-shrink-0 flex items-center gap-2 text-sm font-semibold text-stone-500 hover:text-orange-500 transition-colors">
            View all case studies
            <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
            </svg>
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {CASE_STUDIES.map((cs, i) => {
            const c = cs.color;
            return (
              <div
                key={cs.company}
                className="group bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-stone-200 hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
                style={{
                  opacity:   vis ? 1 : 0,
                  transform: vis ? "translateY(0) translateX(0)" : "translateY(24px)",
                  transition: `opacity 0.6s ${0.1 + i * 0.1}s ease-out, transform 0.6s ${0.1 + i * 0.1}s ease-out, box-shadow 0.25s`,
                }}
              >
                {/* Photo */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={cs.image}
                    alt={cs.industry}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                  {/* Accent bar */}
                  <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: c.hex }} />
                  {/* Company on photo */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <p className={`text-[10px] font-bold uppercase tracking-widest mb-0.5`}
                      style={{ color: c.hex }}>
                      {cs.industry}
                    </p>
                    <p className="text-white font-display font-bold text-sm">{cs.company}</p>
                  </div>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Problem */}
                  <div className="mb-4">
                    <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide mb-1.5">
                      The challenge
                    </p>
                    <p className="text-sm text-stone-500 font-light leading-relaxed line-clamp-3">
                      {cs.problem}
                    </p>
                  </div>

                  {/* Result */}
                  <div
                    className={`rounded-xl ${c.bg} border ${c.border} p-4 mb-5`}
                  >
                    <p className="text-[10px] font-semibold text-stone-400 uppercase tracking-wide mb-2">
                      The result
                    </p>
                    <div className="flex items-baseline gap-2 mb-1.5">
                      <span className={`font-display text-2xl font-extrabold ${c.text}`}>
                        {cs.metric}
                      </span>
                      <span className="text-xs text-stone-500">{cs.metricLabel}</span>
                    </div>
                    <p className="text-xs text-stone-600 leading-snug">{cs.result}</p>
                  </div>

                  {/* Dual CTA */}
                  <div className="flex items-center gap-2 mt-auto">
                    <a
                      href={`/case-studies/${cs.industry.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[11px] font-semibold border transition-all hover:-translate-y-0.5 ${c.text} ${c.bg} ${c.border}`}
                    >
                      Read case study
                      <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 8L8 2M8 2H4.5M8 2V5.5" />
                      </svg>
                    </a>
                    <button onClick={() => modal.open("demo")}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[11px] font-semibold text-white transition-all hover:-translate-y-0.5"
                      style={{ background: c.hex }}
                    >
                      Book demo
                      <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="5" x2="8" y2="5" /><polyline points="5.5 2.5 8 5 5.5 7.5" />
                      </svg>
                    </button>
                    
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
