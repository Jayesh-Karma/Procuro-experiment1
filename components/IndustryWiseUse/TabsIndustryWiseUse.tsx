"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────
interface Industry {
  id: string;
  label: string;
  emoji: string;
  color: string;           // tailwind text color
  bg: string;              // tailwind bg for active tab
  lightBg: string;         // section accent bg
  border: string;          // tailwind border color
  tagBg: string;
  tagText: string;
  stat: { value: string; label: string };
  pains: string[];
  solutions: { text: string; icon: React.ReactNode }[];
}

// ─── Inline icons ─────────────────────────────────────────────────────────
const CheckIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="2.5 8 6 11.5 13.5 4" />
  </svg>
);
const XIcon = () => (
  <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 flex-shrink-0" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
    <line x1="3" y1="3" x2="13" y2="13" /><line x1="13" y1="3" x2="3" y2="13" />
  </svg>
);

// ─── Industry data ────────────────────────────────────────────────────────
const INDUSTRIES: Industry[] = [
  {
    id: "manufacturing",
    label: "Manufacturing",
    emoji: "🏭",
    color: "text-orange-600",
    bg: "bg-orange-500",
    lightBg: "bg-orange-50/60",
    border: "border-orange-200",
    tagBg: "bg-orange-50",
    tagText: "text-orange-600",
    stat: { value: "23%", label: "of AI supply chain market" },
    pains: [
      "Raw material shortages halt production lines without warning",
      "Supplier dependency creates single points of failure",
      "Procurement is disconnected from production schedules",
    ],
    solutions: [
      { text: "Predict raw material needs weeks before shortages occur", icon: <CheckIcon /> },
      { text: "Track supplier performance and flag dependency risks early", icon: <CheckIcon /> },
      { text: "Align procurement timelines directly with production plans", icon: <CheckIcon /> },
    ],
  },
  {
    id: "retail",
    label: "Retail & E-commerce",
    emoji: "🛒",
    color: "text-indigo-600",
    bg: "bg-indigo-500",
    lightBg: "bg-indigo-50/60",
    border: "border-indigo-200",
    tagBg: "bg-indigo-50",
    tagText: "text-indigo-600",
    stat: { value: "47.8%", label: "fastest growing segment CAGR" },
    pains: [
      "Stockouts during demand spikes cost up to 7.4% of annual revenue",
      "Overstock of slow-moving items locks capital in warehouses",
      "Multi-channel inventory gets out of sync — customers see wrong stock",
    ],
    solutions: [
      { text: "Demand forecasting per SKU catches spikes before they hit", icon: <CheckIcon /> },
      { text: "Dead stock detection surfaces overstock before it becomes write-offs", icon: <CheckIcon /> },
      { text: "Real-time stock sync across all channels from one source of truth", icon: <CheckIcon /> },
    ],
  },
  {
    id: "pharma",
    label: "Pharma & Healthcare",
    emoji: "💊",
    color: "text-violet-600",
    bg: "bg-violet-500",
    lightBg: "bg-violet-50/60",
    border: "border-violet-200",
    tagBg: "bg-violet-50",
    tagText: "text-violet-600",
    stat: { value: "+24%", label: "fastest YoY AI adoption" },
    pains: [
      "Batch and expiry tracking done manually — error-prone and audit-risky",
      "Compliance documentation consumes 30% of worker time",
      "Cold chain breaks go undetected until product is already compromised",
    ],
    solutions: [
      { text: "Batch-level tracking with automated FEFO picking logic", icon: <CheckIcon /> },
      { text: "Expiry alerts and automated compliance documentation", icon: <CheckIcon /> },
      { text: "Full end-to-end lot traceability from raw material to delivery", icon: <CheckIcon /> },
    ],
  },
  {
    id: "food",
    label: "Food & Beverage",
    emoji: "🍔",
    color: "text-emerald-600",
    bg: "bg-emerald-500",
    lightBg: "bg-emerald-50/60",
    border: "border-emerald-200",
    tagBg: "bg-emerald-50",
    tagText: "text-emerald-600",
    stat: { value: "30%", label: "of food wasted in supply chains" },
    pains: [
      "Spoilage and wastage from poor inventory rotation drains margins",
      "Seasonal demand swings cause massive overstock or shortages",
      "Supply inconsistency from vendors disrupts production schedules",
    ],
    solutions: [
      { text: "Consumption prediction models reduce waste before it happens", icon: <CheckIcon /> },
      { text: "Seasonal planning module adjusts stock targets per period", icon: <CheckIcon /> },
      { text: "FEFO-based inventory rotation ensures oldest stock ships first", icon: <CheckIcon /> },
    ],
  },
  {
    id: "automotive",
    label: "Automotive",
    emoji: "🚗",
    color: "text-sky-600",
    bg: "bg-sky-500",
    lightBg: "bg-sky-50/60",
    border: "border-sky-200",
    tagBg: "bg-sky-50",
    tagText: "text-sky-600",
    stat: { value: "₹000s", label: "lost per minute of production stoppage" },
    pains: [
      "Long supplier lead times make production stoppages unpredictable",
      "Complex part dependencies mean one missing component halts everything",
      "No real-time visibility into which supplier is at risk",
    ],
    solutions: [
      { text: "Supplier risk tracking with lead time variance alerts", icon: <CheckIcon /> },
      { text: "Inventory planning per component with dependency mapping", icon: <CheckIcon /> },
      { text: "Real-time supply visibility across every Tier 1 and Tier 2 vendor", icon: <CheckIcon /> },
    ],
  },
];

// ─── Animated content panel ───────────────────────────────────────────────
function ContentPanel({ industry, visible }: { industry: Industry; visible: boolean }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const painRefs = useRef<(HTMLDivElement | null)[]>([]);
  const solRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const statRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!visible) return;

    // Dynamic GSAP import
    let ctx: { revert?: () => void } = {};
    (async () => {
      const { gsap } = await import("gsap");

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        // Stat badge
        tl.fromTo(statRef.current,
          { opacity: 0, y: -10, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4 },
          0
        );

        // Pain rows stagger
        tl.fromTo(painRefs.current.filter(Boolean),
          { opacity: 0, x: -18 },
          { opacity: 1, x: 0, duration: 0.45, stagger: 0.09 },
          0.05
        );

        // Solution rows stagger
        tl.fromTo(solRefs.current.filter(Boolean),
          { opacity: 0, x: 18 },
          { opacity: 1, x: 0, duration: 0.45, stagger: 0.09 },
          0.12
        );
      }, panelRef);
    })();

    return () => ctx.revert?.();
  }, [visible, industry.id]);

  if (!visible) return null;

  return (
    <div ref={panelRef} className="grid md:grid-cols-2 gap-5 mt-8">

      {/* Pain points card */}
      <div className={`rounded-2xl border ${industry.border} bg-white p-6`}>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-6 h-6 rounded-md bg-stone-100 border border-stone-200 flex items-center justify-center">
            <XIcon />
          </div>
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest">Pain points</span>
        </div>
        <div className="flex flex-col gap-3">
          {industry.pains.map((pain, i) => (
            <div
              key={i}
              ref={(el) => { painRefs.current[i] = el; }}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-stone-50 border border-stone-100"
            >
              <div className="w-5 h-5 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5 text-red-400" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                  <line x1="2" y1="2" x2="8" y2="8" /><line x1="8" y1="2" x2="2" y2="8" />
                </svg>
              </div>
              <p className="text-sm text-stone-600 font-light leading-snug">{pain}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Solutions card */}
      <div className={`rounded-2xl border ${industry.border} bg-white p-6`}>
        <div className="flex items-center gap-2 mb-5">
          <div className={`w-6 h-6 rounded-md ${industry.tagBg} border ${industry.border} flex items-center justify-center ${industry.color}`}>
            <CheckIcon />
          </div>
          <span className={`text-xs font-semibold uppercase tracking-widest ${industry.color} opacity-80`}>How we solve it</span>
        </div>
        <div className="flex flex-col gap-3">
          {industry.solutions.map((sol, i) => (
            <div
              key={i}
              ref={(el) => { solRefs.current[i] = el; }}
              className={`flex items-start gap-3 p-3.5 rounded-xl ${industry.lightBg} border ${industry.border}`}
            >
              <div className={`w-5 h-5 rounded-full ${industry.tagBg} border ${industry.border} flex items-center justify-center flex-shrink-0 mt-0.5 ${industry.color}`}>
                {sol.icon}
              </div>
              <p className="text-sm text-stone-700 font-normal leading-snug">{sol.text}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────
export default function IndustryTabsSection() {
  const [active, setActive]   = useState(0);
  const [visible, setVisible] = useState(true);
  const sectionRef            = useRef<HTMLDivElement>(null);
  const headRef               = useRef<HTMLDivElement>(null);
  const [headIn, setHeadIn]   = useState(false);
  const tabLineRef            = useRef<HTMLDivElement>(null);
  const prevActive            = useRef(0);

  // Head reveal on scroll
  useEffect(() => {
    const el = headRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setHeadIn(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animate tab indicator on change
  useEffect(() => {
    (async () => {
      const { gsap } = await import("gsap");
      const tabs = document.querySelectorAll("[data-tab]");
      const from = tabs[prevActive.current] as HTMLElement;
      const to   = tabs[active]            as HTMLElement;
      if (!from || !to || !tabLineRef.current) return;

      const fromBox = from.getBoundingClientRect();
      const toBox   = to.getBoundingClientRect();
      const parent  = from.parentElement!.getBoundingClientRect();

      gsap.fromTo(tabLineRef.current,
        { left: fromBox.left - parent.left, width: fromBox.width },
        { left: toBox.left   - parent.left, width: toBox.width,
          duration: 0.38, ease: "power2.inOut" }
      );
      prevActive.current = active;
    })();
  }, [active]);

  const handleTab = (i: number) => {
    if (i === active) return;
    setVisible(false);
    setTimeout(() => { setActive(i); setVisible(true); }, 180);
  };

  const ind = INDUSTRIES[active];

  return (
    <section ref={sectionRef} className="relative bg-[#fafaf9] py-24 px-6 md:px-12 overflow-hidden">

      {/* Subtle warm grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
        backgroundImage: `
        linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)`,    
        backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headRef}
          className="text-center mb-12"
          style={{
            opacity: headIn ? 1 : 0,
            transform: headIn ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="text-xs font-semibold text-orange-600 tracking-widest uppercase">Industry fit</span>
          </div>

          <h2 className="font-display text-[clamp(28px,4vw,46px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-3">
            Built for every complex
            <br />
            <span className="text-orange-500">supply chain.</span>
          </h2>

          <p className="text-base text-stone-400 font-light max-w-md mx-auto leading-relaxed">
            From manufacturing to retail — our platform adapts to your industry&apos;s unique challenges.
          </p>
        </div>

        {/* Tab bar */}
        <div
          className="relative mb-0"
          style={{
            opacity: headIn ? 1 : 0,
            transition: "opacity 0.6s 0.15s ease-out",
          }}
        >
          <div className="flex items-center gap-1 relative bg-white border border-stone-200 rounded-2xl p-1.5 overflow-x-auto no-scrollbar">

            {/* Animated sliding pill bg */}
            <div
              ref={tabLineRef}
              className="absolute h-[calc(100%-12px)] top-1.5 rounded-xl bg-orange-500 shadow-md shadow-orange-200/60 pointer-events-none transition-none"
              style={{ left: 6, width: 130 }}
            />

            {INDUSTRIES.map((ind, i) => (
              <button
                key={ind.id}
                data-tab={i}
                onClick={() => handleTab(i)}
                className={`
                  relative z-10 flex items-center gap-2 px-4 py-2.5 rounded-xl
                  text-sm font-medium whitespace-nowrap flex-shrink-0
                  transition-colors duration-200 focus:outline-none
                  ${active === i ? "text-white" : "text-stone-500 hover:text-stone-800"}
                `}
              >
                <span className="text-base leading-none">{ind.emoji}</span>
                <span className="font-semibold">{ind.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Stat badge + content */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(10px)",
            transition: "opacity 0.18s ease-out, transform 0.18s ease-out",
          }}
        >
          {/* Industry stat pill */}
          <div className="flex justify-end mt-5 mb-1">
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full ${ind.tagBg} border ${ind.border}`}>
              <span className={`font-display text-sm font-extrabold ${ind.color}`}>{ind.stat.value}</span>
              <span className="text-xs text-stone-400 font-normal">{ind.stat.label}</span>
            </div>
          </div>

          {/* Content panel */}
          <ContentPanel industry={ind} visible={visible} />
        </div>

        {/* Bottom CTA */}
        <div
          className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-5 px-7 py-6 bg-white border border-stone-100 rounded-2xl"
          style={{
            opacity: headIn ? 1 : 0,
            transition: "opacity 0.6s 0.35s ease-out",
          }}
        >
          <div>
            <p className="font-display text-base font-bold text-stone-900 mb-0.5">
              Don&apos;t see your industry?
            </p>
            <p className="text-sm text-stone-400 font-light">
              Our platform adapts to any supply chain with a database. Let&apos;s talk.
            </p>
          </div>
          <button className="flex-shrink-0 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-200 hover:shadow-orange-300 transition-all hover:-translate-y-0.5">
            Book a discovery call →
          </button>
        </div>

      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}