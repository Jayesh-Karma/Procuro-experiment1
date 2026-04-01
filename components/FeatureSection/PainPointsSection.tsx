"use client";

import { BotMessageSquare, BrainIcon, ChartSpline, ShieldCheckIcon, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Scroll reveal ────────────────────────────────────────────────────────
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─── Pain → Solution data ─────────────────────────────────────────────────

const ITEMS = [
  {
    pain: "Your team spends hours on manual reports, follow-ups, and spreadsheets, tracking stocks.",
    solution: "Automated alerts, one-click procurement suggestions, and AI-generated summaries cut manual ops by up to 80% - freeing your team for actual decisions.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <polygon points="10 1 12.9 7 19.5 7.6 14.8 11.8 16.2 18.3 10 14.8 3.8 18.3 5.2 11.8 0.5 7.6 7.1 7 10 1" />
      </svg>
    ),
    accent: "amber",
    tag: "Automation",
  },
  {
    pain: "Stock is scattered across warehouses and nobody has a clear picture.",
    solution: "A unified live dashboard shows every warehouse, every SKU, and every stock movement - in one place, updated in real time.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="7" height="7" rx="1.5" /><rect x="11" y="2" width="7" height="7" rx="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" /><rect x="11" y="11" width="7" height="7" rx="1.5" />
      </svg>
    ),
    accent: "indigo",
    tag: "Unified View",
  },
  {
    pain: "You don't know what's overstocked or understocked until it's too late.",
    solution: "We predict your sales and calculate exact raw material needs, so your team procures the right quantity, weeks in advance.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M10 2L2 7l8 5 8-5-8-5z" /><path d="M2 12l8 5 8-5" /><path d="M2 7l8 5 8-5" />
      </svg>
    ),
    accent: "orange",
    tag: "Demand Forecasting",
  },
  {
    pain: "Capital is locked in dead stock that nobody is tracking.",
    solution: "Our AI flags every slow-moving or zero-movement SKU and tells you exactly how much capital is sitting idle.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="8" /><line x1="10" y1="6" x2="10" y2="10" /><line x1="10" y1="13" x2="10" y2="14" />
      </svg>
    ),
    accent: "red",
    tag: "Dead Stock Detection",
  },
  {
    pain: "You can't ask your current tools a simple question and get a straight answer.",
    solution: "A seperate AI service for you. Ask anything - about your current stock, overstock risks, supplier delays and get a direct answer in seconds, in plain English.",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10c0 3.866-3.582 7-8 7a8.6 8.6 0 01-4-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
        <line x1="8" y1="10" x2="8" y2="10.01" strokeWidth={2} />
        <line x1="10" y1="10" x2="10" y2="10.01" strokeWidth={2} />
        <line x1="12" y1="10" x2="12" y2="10.01" strokeWidth={2} />
      </svg>
    ),
    accent: "violet",
    tag: "AI Assistant",
  },
  {
    pain: "You don't trust AI tools because you don't know what they do with your data.",
    solution: "We connect to your Database / ERP's - we never store or share your data. Every recommendation shows its reasoning. Your data stays on your servers, always.",
    icon: (
      <ShieldCheckIcon className="p-0.5" />
    ),
    accent: "emerald",
    tag: "Data Privacy",
  },
  {
    pain: "ROI is unclear for every tools. You don't know which ones are worth the money and which ones aren't.",
    solution: "We layer agents on top of your data lake and SaaS stack to drive real decisions and workflows. You got clear, measurable impact and we show you exactly how much time and money you're saving.",
    icon: (
      <BotMessageSquare className="p-0.5" />
    ),
    accent: "red",
    tag: "ROI Tracking",
  },
];

// ─── Accent color maps ────────────────────────────────────────────────────
const ACCENT: Record<string, { icon: string; dot: string; tag: string; tagText: string; border: string }> = {
  orange:  { icon: "text-orange-500",  dot: "bg-orange-400",  tag: "bg-orange-50 border-orange-100",  tagText: "text-orange-600",  border: "border-orange-200" },
  indigo:  { icon: "text-indigo-500",  dot: "bg-indigo-400",  tag: "bg-indigo-50 border-indigo-100",  tagText: "text-indigo-600",  border: "border-indigo-200" },
  red:     { icon: "text-red-500",     dot: "bg-red-400",     tag: "bg-red-50 border-red-100",        tagText: "text-red-600",     border: "border-red-200"    },
  amber:   { icon: "text-amber-500",   dot: "bg-amber-400",   tag: "bg-amber-50 border-amber-100",    tagText: "text-amber-600",   border: "border-amber-200"  },
  violet:  { icon: "text-violet-500",  dot: "bg-violet-400",  tag: "bg-violet-50 border-violet-100",  tagText: "text-violet-600",  border: "border-violet-200" },
  emerald: { icon: "text-emerald-600", dot: "bg-emerald-400", tag: "bg-emerald-50 border-emerald-100",tagText: "text-emerald-700", border: "border-emerald-200"},
};

// ─── Single pain point row ────────────────────────────────────────────────
function PainRow({
  item,
  index,
}: {
  item: typeof ITEMS[0];
  index: number;
}) {
  const { ref, visible } = useReveal(0.12);
  const a = ACCENT[item.accent];

  return (
    <div
      ref={ref}
      className="grid md:grid-cols-2 gap-0 md:gap-px group  shadow-md shadow-orange-400/20 rounded-2xl overflow-hidden relative"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ${index * 0.08}s ease-out, transform 0.5s ${index * 0.08}s ease-out`,
      }}
    >
      {/* Pain side */}
      <div className="flex items-start gap-4 px-6 py-7 md:pr-10 bg-stone-50/70 rounded-l-2xl md:rounded-r-none rounded-2xl md:rounded-bl-2xl border border-stone-100 border-r-0 group-hover:border-stone-200 transition-colors duration-200">
        {/* Pain icon — muted red X */}
        <div className="w-7 h-7 rounded-lg bg-stone-100 border border-stone-200 flex items-center justify-center flex-shrink-0 mt-0.5">
          <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-stone-600" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
            <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
          </svg>
        </div>
        <p className="text-sm text-stone-600 font-light leading-relaxed">
          {item.pain}
        </p>
      </div>

      {/* Divider arrow — only on md+ */}
      <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10 items-center justify-center w-8 h-8 rounded-full bg-white border border-stone-200 shadow-sm self-center">
        <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 text-orange-400" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="8" x2="14" y2="8" /><polyline points="9 3 14 8 9 13" />
        </svg>
      </div>

      {/* Solution side */}
      <div className="flex items-start gap-4 px-6 py-7 md:pl-10 bg-white rounded-r-2xl md:rounded-l-none rounded-2xl md:rounded-tr-2xl border border-stone-100 border-l-0 group-hover:border-stone-200 transition-colors duration-200">
        {/* Solution icon — colored */}
        <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 ${a.icon} bg-white border ${a.border}`}>
          {item.icon}
        </div>
        <div>
          <p className="text-sm text-stone-700 font-normal leading-relaxed mb-3">
            {item.solution}
          </p>
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full border ${a.tag} ${a.tagText}`}>
            <span className={`w-1 h-1 rounded-full ${a.dot}`} />
            {item.tag}
          </span>
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────
export default function PainPointsSection() {
  const { ref: headRef, visible: headVisible } = useReveal(0.2);

  return (
    <section className="relative border-y border-gray-200 bg-white py-24 px-6 md:px-12 overflow-hidden">

      {/* Very light dot grid bg */}
      <div
        className="absolute top-0 inset-0 pointer-events-none opacity-[0.2]"
        style={{
          backgroundImage: "radial-gradient(circle, #000000 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-5xl mx-auto">

        {/* Header */}
        <div
          ref={headRef}
          className="text-center mb-16"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(18px)",
            transition: "opacity 0.55s ease-out, transform 0.55s ease-out",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="text-xs font-semibold text-orange-600 tracking-widest uppercase">Problems we solve</span>
          </div>

          <h2 className="font-display text-[clamp(28px,4vw,46px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-4">
            Your supply chain pains.
            <br />
            <span className="text-orange-500">Our exact solutions.</span>
          </h2>

          <p className="text-base text-stone-600 font-light max-w-lg mx-auto leading-relaxed">
            Every problem below is real, common, and expensive. Here is exactly how Our Product solves each one.
          </p>

          {/* Column labels */}
          <div className="grid md:grid-cols-2 gap-px mt-10 max-w-3xl mx-auto border border-gray-200 rounded-2xl overflow-hidden">
            <div className="flex items-center justify-center gap-2 py-2.5 rounded-tl-xl rounded-bl-xl bg-stone-50 border border-stone-100">
              <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-stone-600" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                <line x1="2" y1="2" x2="12" y2="12" /><line x1="12" y1="2" x2="2" y2="12" />
              </svg>
              <span className="text-xs font-semibold text-stone-600 uppercase tracking-widest">The problem</span>
            </div>
            <div className="flex items-center justify-center gap-2 py-2.5 rounded-tr-xl rounded-br-xl bg-orange-50 border border-orange-100">
              <svg viewBox="0 0 14 14" fill="none" className="w-3 h-3 text-orange-500" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2 7 5.5 10.5 12 4" />
              </svg>
              <span className="text-xs font-semibold text-orange-500 uppercase tracking-widest">How we solve it</span>
            </div>
          </div>
        </div>

        {/* Rows */}
        <div className="relative flex flex-col gap-3">
          {ITEMS.map((item, i) => (
            <PainRow key={item.tag} item={item} index={i} />
          ))}
        </div>

        {/* Bottom trust strip */}
        <div
          className="mt-14 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400 font-normal"
          style={{ opacity: 1 }}
        >
          {[
            { icon: <ShieldCheckIcon  className=" text-blue-500" />, text: "Your data stays on your servers" },
            { icon: <Zap fill="#FFF500" className="text-[#FFF500]" />, text: "Connect in under 4 Weeks" },
            { icon: <BrainIcon className=" text-red-500"  />, text: "AI Intelligence and Chatbot" },
            { icon: <ChartSpline className="text-green-500" />, text: "Every decision is explainable" },
          ].map((t) => (
            <div key={t.text} className="flex items-center gap-1.5">
              <span className="text-lg">{t.icon}</span>
              <span>{t.text}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}