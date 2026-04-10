"use client";

import gsap from "gsap";
import { ArrowRight, Car, Cpu, Factory, Hamburger, MoveRight, Pill, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ─── Scroll reveal hook ───────────────────────────────────────────────────
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

// ─── Data ─────────────────────────────────────────────────────────────────
const INDUSTRIES = [
  {
    id: "manufacturing",
    emoji: <Factory className="w-4 h-4 text-orange-600" />,
    label: "Manufacturing",
    tagline: "Align procurement with production - before shortages happen.",
    accent: {
      text: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      dot: "bg-orange-400",
      badge: "bg-orange-500",
      glow: "shadow-orange-100",
      line: "bg-orange-400",
      hoverText: "text-white",
      hoverBg: "bg-orange-500",
    },
    stat: { value: "49%", label: "of manufacturers cite supply chain as top AI priority" },
    pains: [
      "Raw material shortages halt production without warning",
      "Single supplier dependency creates unpredictable risk",
      "Procurement is disconnected from production schedules",
    ],
    solutions: [
      "Predict raw material needs weeks before shortages",
      "Track supplier performance & flag dependency risks",
      "Sync procurement timelines with production plans",
    ],
    caseStudy: {
      result: "34% reduction in production stoppages",
    },
  },
  {
    id: "retail",
    emoji: <ShoppingCart className="w-4 h-4 text-indigo-600" />,
    label: "Retail & E-commerce",
    tagline: "Never lose a sale to a stockout or bleed margin on overstock.",
    accent: {
      text: "text-indigo-600",
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      dot: "bg-indigo-400",
      badge: "bg-indigo-500",
      glow: "shadow-indigo-100",
      line: "bg-indigo-400",
    },
    stat: { value: "7.4%", label: "of annual revenue lost to stockouts on average" },
    pains: [
      "Stockouts during demand spikes send customers to competitors",
      "Overstock of slow-moving SKUs ties up capital for months",
      "Multi-channel inventory goes out of sync constantly",
    ],
    solutions: [
      "Demand forecasting per SKU catches spikes in advance",
      "Dead stock detection surfaces overstock before write-offs",
      "One real-time inventory view synced across all channels",
    ],
    caseStudy: {
      result: "28% fewer stockout incidents in 90 days",
    },
  },
  {
    id: "pharma",
    emoji: <Pill className="w-4 h-4 text-violet-600" />,
    label: "Pharma & Healthcare",
    tagline: "Full batch traceability and compliance without the manual effort.",
    accent: {
      text: "text-violet-600",
      bg: "bg-violet-50",
      border: "border-violet-200",
      dot: "bg-violet-400",
      badge: "bg-violet-500",
      glow: "shadow-violet-100",
      line: "bg-violet-400",
    },
    stat: { value: "+24%", label: "fastest YoY AI adoption of any industry in 2025" },
    pains: [
      "Batch and expiry tracking done manually - audit nightmares",
      "30% of worker time spent on compliance documentation",
      "Cold chain breaks go undetected until damage is done",
    ],
    solutions: [
      "Batch-level tracking with automated FEFO picking suggestions",
      "Expiry alerts and auto-generated compliance reports",
      "Full lot traceability from raw material to last delivery",
    ],
    caseStudy: {
      result: "85% reduction in manual documentation time",
    },
  },
  {
    id: "food",
    emoji: <Hamburger className="w-4 h-4 text-emerald-700" />,
    label: "Food & Beverage",
    tagline: "Cut waste, plan for seasons, and keep stock rotating correctly.",
    accent: {
      text: "text-emerald-700",
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      dot: "bg-emerald-400",
      badge: "bg-emerald-600",
      glow: "shadow-emerald-100",
      line: "bg-emerald-400",
    },
    stat: { value: "30%", label: "of food is wasted in supply chains globally" },
    pains: [
      "Spoilage from poor inventory rotation drains margins daily",
      "Seasonal demand swings cause overstock or sudden shortages",
      "Vendor inconsistency disrupts production schedules",
    ],
    solutions: [
      "Consumption prediction reduces waste before it happens",
      "Seasonal planning module adjusts stock targets per period",
      "FEFO rotation ensures oldest inventory always ships first",
    ],
    caseStudy: {
      result: "$3M in recovered inventory value in 6 months",
    },
  },
  {
    id: "automotive",
    emoji: <Car className="w-4 h-4 text-sky-600" />,
    label: "Automotive",
    tagline: "One missing part shouldn't stop an entire production line.",
    accent: {
      text: "text-sky-600",
      bg: "bg-sky-50",
      border: "border-sky-200",
      dot: "bg-sky-400",
      badge: "bg-sky-500",
      glow: "shadow-sky-100",
      line: "bg-sky-400",
    },
    stat: { value: "$1000s", label: "lost per minute of production stoppage" },
    pains: [
      "Long supplier lead times make stoppages hard to predict",
      "One missing component halts the entire assembly line",
      "No real-time visibility into which vendor is at risk",
    ],
    solutions: [
      "Supplier risk tracking with lead time variance alerts",
      "Component-level inventory planning with dependency maps",
      "Live supply visibility across every Tier-1 and Tier-2 vendor",
    ],
    caseStudy: {
      result: "Zero unplanned stoppages over a 4-month period",
    },
  },
  {
  id: "semiconductors",
  emoji: <Cpu className="w-4 h-4 text-indigo-600" />,
  label: "Electronics & Semiconductors",
  tagline: "A single chip shortage can stall entire global industries.",
  accent: {
    text: "text-indigo-600",
    bg: "bg-indigo-50",
    border: "border-indigo-200",
    dot: "bg-indigo-400",
    badge: "bg-indigo-500",
    glow: "shadow-indigo-100",
    line: "bg-indigo-400",
  },
  stat: { value: "68%", label: "industry adoption of AI in operations" },
  pains: [
    "Demand forecasting is highly volatile due to rapid tech cycles and market shifts",
    "Global supply chains are vulnerable to geopolitical disruptions",
    "Extremely long lead times make shortages hard to recover from quickly",
  ],
  solutions: [
    "AI-powered demand forecasting adapting to market and product lifecycle signals",
    "Supply chain risk intelligence with geopolitical and vendor dependency tracking",
    "Lead-time prediction models with proactive supply planning recommendations",
  ],
  caseStudy: {
    result: "Reduced supply shortages by 40% and improved planning accuracy across global suppliers",
  },
}

];




// ─── Single industry card ──────────────────────────────────────────────────
function IndustryCard({
  industry,
  index,
}: {
  industry: typeof INDUSTRIES[0];
  index: number;
}) {
  const { ref, visible } = useReveal(0.1);
  const cardRef = useRef<HTMLDivElement>(null);
  const a = industry.accent;
  
  
  const iconRef = useRef(null);
  const handleHover = () => {
  const el = iconRef.current;

  gsap.timeline()
    .to(el, {
      x: 8,
      opacity: 0,
      duration: 0.15,
      ease: "power2.out",
    })
    .set(el, {
      x: -8,
      opacity: 0,
    })
    .to(el, {
      x: 0,
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });
};

  // GSAP entrance
  useEffect(() => {
    if (!visible || !cardRef.current) return;
    let ctx: { revert?: () => void } = {};
    (async () => {
      const { gsap } = await import("gsap");
      ctx = gsap.context(() => {
        gsap.fromTo(
          cardRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1, y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: "power3.out",
          }
        );
      });
    })();
    return () => ctx.revert?.();
  }, [visible, index]);

  return (
    <div ref={ref}>
      <div
        ref={cardRef}
        style={{ opacity: 0 }}
        className={`
          group relative bg-white rounded-2xl border border-stone-100
          hover:border-stone-200 hover:shadow-lg ${a.glow}
          transition-all duration-300 ease-out overflow-hidden
          flex flex-col h-full
        `}
      >
        {/* Top accent line */}
        <div className={`h-[3px] w-full ${a.line} opacity-70`} />

        {/* Card body */}
        <div className="p-6 flex flex-col flex-1">

          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${a.bg} border ${a.border}`}>
                  {industry.emoji}
                </div>
              <div>
                <p className={`text-xs font-semibold uppercase tracking-widest ${a.text} mb-0.5`}>
                  {industry.label}
                </p>
                <p className="text-[11px] text-stone-400 font-light leading-tight max-w-[160px]">
                  {industry.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Stat */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-xl ${a.bg} border ${a.border} mb-5`}>
            <span className={`font-display text-lg font-extrabold ${a.text} leading-none`}>
              {industry.stat.value}
            </span>
            <span className="text-[10px] text-stone-500 leading-tight">
              {industry.stat.label}
            </span>
          </div>

          {/* Pain → Solution rows */}
          <div className="flex flex-col gap-2.5 flex-1">
            {industry.pains.map((pain, i) => (
              <div key={i} className="grid grid-cols-[1fr_auto_1fr] gap-2 items-start">

                {/* Pain */}
                <div className="flex items-start gap-2 bg-stone-50 border border-stone-100 rounded-xl p-2.5">
                  <div className="w-4 h-4 rounded-full bg-red-50 border border-red-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 8 8" fill="none" className="w-2 h-2 text-red-400" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <line x1="1.5" y1="1.5" x2="6.5" y2="6.5" />
                      <line x1="6.5" y1="1.5" x2="1.5" y2="6.5" />
                    </svg>
                  </div>
                  <p className="text-[11px] text-stone-500 font-light leading-snug">{pain}</p>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center mt-2.5">
                  <svg viewBox="0 0 16 16" fill="none" className={`w-3.5 h-3.5 ${a.text} opacity-50`} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="8" x2="14" y2="8" />
                    <polyline points="9 3 14 8 9 13" />
                  </svg>
                </div>

                {/* Solution */}
                <div className={`flex items-start gap-2 ${a.bg} border ${a.border} rounded-xl p-2.5`}>
                  <div className={`w-4 h-4 rounded-full ${a.bg} border ${a.border} flex items-center justify-center flex-shrink-0 mt-0.5 ${a.text}`}>
                    <svg viewBox="0 0 8 8" fill="none" className="w-2 h-2" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 3.5 6.5 7 2" />
                    </svg>
                  </div>
                  <p className="text-[11px] text-stone-700 font-normal leading-snug">
                    {industry.solutions[i]}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Case study strip */}
          <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between gap-3">
            <div>
              <p className={`text-[11px] font-semibold ${a.text} mb-0.5`}>
                {industry.caseStudy.result}
              </p>
            </div>
            <Link
            href={"/case-studies"}
            onMouseEnter={handleHover}
              className={`
                flex-shrink-0 flex items-center gap-1.5
                text-[11px] font-semibold px-3.5 py-2 rounded-lg
                border ${a.border} ${a.text} ${a.bg}
                group-hover:${a.hoverBg} group-hover:${a.hoverText} hover:border-transparent
                transition-all duration-200
                group-hover:shadow-sm cursor-pointer 
              `}
            >
              Case study
              <MoveRight ref={iconRef} className={`w-3 h-3 ${a.text}`} />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── Main section ──────────────────────────────────────────────────────────
export default function IndustrySection() {
  const { ref: headRef, visible: headVisible } = useReveal(0.2);

  
  const iconRef = useRef(null);
  const handleHover = () => {
  const el = iconRef.current;

  gsap.timeline()
    .to(el, {
      x: 8,
      opacity: 0,
      duration: 0.15,
      ease: "power2.out",
    })
    .set(el, {
      x: -8,
      opacity: 0,
    })
    .to(el, {
      x: 0,
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });
};

  return (
    <section className="relative bg-[#fafaf9] py-24 px-6 md:px-12 overflow-hidden">

      {/* Subtle dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage: "radial-gradient(circle, #a8a29e 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      {/* Orange warm wash top */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[260px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Header */}
        <div
          ref={headRef}
          className="text-center mb-14"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="text-xs font-semibold text-orange-600 tracking-widest uppercase">
              Industry fit
            </span>
          </div>

          <h2 className="font-display text-[clamp(28px,4vw,46px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-3">
            Built for every complex
            <br />
            <span className="text-orange-500">supply chain.</span>
          </h2>

          <p className="text-base text-stone-600 font-light max-w-md mx-auto leading-relaxed">
            From manufacturing to retail - our platform adapts to your industry&apos;s exact challenges.
            Real results, real companies.
          </p>
        </div>

        {/* Cards grid — 3 top, 2 bottom centered */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2   gap-5">
          {INDUSTRIES?.map((ind, i) => (
            <IndustryCard key={ind.id} industry={ind} index={i} />
          ))}
        </div>

        {/* Bottom strip */}
       <div
  className="mt-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 px-5 sm:px-7 py-6 bg-white border border-stone-100 rounded-2xl"
  style={{
    opacity: headVisible ? 1 : 0,
    transition: "opacity 0.6s 0.4s ease-out",
  }}
>
  {/* Text Section */}
  <div className="font-space text-center sm:text-left">
    <p className="font-display text-base md:text-lg font-bold text-stone-900 mb-1">
      Don&apos;t see your industry?
    </p>
    <p className="text-xs md:text-sm text-stone-400 font-light">
      Our platform adapts to any operation. Let&apos;s talk.
    </p>
  </div>

  {/* Buttons */}
  <div className="flex flex-col sm:flex-row w-full sm:w-auto items-stretch sm:items-center gap-3">
    <Link
      href="/contact"
      onMouseEnter={handleHover}
      className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-200 hover:shadow-orange-300 transition-all hover:-translate-y-0.5 w-full sm:w-auto"
    >
      Book a discovery call
      <ArrowRight ref={iconRef} className="w-5 h-5" />
    </Link>

    <Link
      href="/case-studies"
      className="px-5 py-3 rounded-xl border border-stone-200 text-stone-500 text-sm font-medium hover:border-orange-200 hover:text-orange-600 transition-all text-center w-full sm:w-auto"
    >
      View Case Studies
    </Link>
  </div>
</div>


      </div>
    </section>
  );
}