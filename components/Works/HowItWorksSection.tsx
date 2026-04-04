"use client";

import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { useModal } from "@/components/Modal/ModalProvider";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FloatingOrbs from "../ui/FloatingOrbs";

// ─── Data ─────────────────────────────────────────────────────────────────
const STEPS = [
  {
    number: "01",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="16" height="15" rx="2.5" />
        <path d="M3 9h16" /><path d="M8 2v4M14 2v4" />
        <path d="M7 13h3M7 17h5" />
      </svg>
    ),
    tag: "Day 0",
    label: "Book a Demo",
    headline: "One click to get started.",
    body: "Reach out via the demo form. No lengthy sales process - a focused conversation about your supply chain.",
    why: "Low effort, immediate value",
    align: "left" as const,
  },
  {
    number: "02",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 3C7 3 4 6 4 9.5c0 2.5 1.5 4.7 3.8 5.8L7 19h8l-.8-3.7C16.5 14.2 18 12 18 9.5 18 6 15 3 11 3z" />
        <path d="M9 19v2M13 19v2" />
      </svg>
    ),
    tag: "Week 1",
    label: "Understand Your Business",
    headline: "We map your entire operation.",
    body: "Our team analyses your supply chain flows, bottlenecks, data sources, and goals. Every setup is unique - nothing is templated.",
    why: "Fully tailored, not a template",
    align: "right" as const,
  },
  {
    number: "03",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 6h14M4 11h9" />
        <circle cx="16" cy="15" r="3" />
        <path d="M19 15h2" />
      </svg>
    ),
    tag: "Week 2-3",
    label: "Customize & Integrate",
    headline: "Your workflows. Your systems.",
    body: "We configure the platform for your processes and connect directly to your ERP, WMS, or database - no migration, no disruption.",
    why: "Works with what you already have",
    align: "left" as const,
  },
  {
    number: "04",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="18" height="13" rx="2.5" />
        <path d="M7 20h8M11 16v4" />
        <path d="M7 9l2.5 2.5L15 7" />
      </svg>
    ),
    tag: "Week 3-4",
    label: "Deploy on Your Infrastructure",
    headline: "On your servers. Under your control.",
    body: "The system is deployed on your own infrastructure. Your data never leaves your environment - full security, full ownership. We also have cloud options if preferred.",
    why: "No data risk, no vendor lock-in",
    align: "right" as const,
  },
  {
    number: "05",
    icon: (
      <svg viewBox="0 0 22 22" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 15 7 10 11 13 15 7 19 10" />
        <circle cx="19" cy="10" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    tag: "Ongoing",
    label: "Optimize & Scale with AI",
    headline: "Gets smarter every single day.",
    body: "AI continuously learns from your data - improving forecasts, catching dead stock earlier, and surfacing better decisions as you grow.",
    why: "Compounds into long-term advantage",
    align: "left" as const,
  },
];

// ─── Scroll reveal hook ───────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

// ─── Step card ────────────────────────────────────────────────────────────
function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const { ref, inView } = useInView(0.15);
  const isRight = step.align === "right";

  return (
    <div
      ref={ref}
      className={`flex items-center gap-6 lg:gap-10 ${isRight ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Card */}
      <div
        className="flex-1 max-w-[420px]"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView
            ? "translateX(0) translateY(0)"
            : `translateX(${isRight ? "40px" : "-40px"}) translateY(10px)`,
          transition: `opacity 0.6s ${index * 0.08}s ease-out, transform 0.6s ${index * 0.08}s ease-out`,
        }}
      >
        <div className="group relative bg-white border border-stone-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:shadow-orange-50 hover:border-orange-200 transition-all duration-300">
          {/* Left accent */}
          <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-orange-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top row */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {/* Icon */}
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-orange-500 flex-shrink-0 group-hover:bg-orange-100 transition-colors duration-200">
                {step.icon}
              </div>
              <div>
                <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-widest">{step.label}</p>
                <p className="text-[9px] text-stone-400 mt-0.5">{step.tag}</p>
              </div>
            </div>
            {/* Big number */}
            <span className="font-display text-4xl font-extrabold text-stone-100 leading-none select-none">
              {step.number}
            </span>
          </div>

          {/* Headline */}
          <h4 className="font-display text-[17px] font-bold text-stone-900 leading-snug tracking-tight mb-2">
            {step.headline}
          </h4>

          {/* Body */}
          <p className="text-sm text-stone-500 font-light leading-relaxed mb-4">
            {step.body}
          </p>

          {/* Why */}
          <div className="flex items-center gap-2 pt-3 border-t border-stone-50">
            <div className="w-4 h-4 rounded-full bg-orange-50 border border-orange-100 flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 8 8" fill="none" className="w-2 h-2 text-orange-500" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 3 6.5 7 2" />
              </svg>
            </div>
            <span className="text-[11px] text-stone-400">{step.why}</span>
          </div>
        </div>
      </div>

      {/* Spacer for path side */}
      <div className="flex-1" />
    </div>
  );
}

// ─── Animated path SVG ────────────────────────────────────────────────────
function AnimatedPath() {
  const pathRef = useRef<SVGPathElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = pathRef.current;
    if (!el) return;

    const init = async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const length = el.getTotalLength();
      gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });

      gsap.to(el, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top 70%",
          end:   "bottom 30%",
          scrub: 1.8,
        },
      });
    };
    init();
  }, []);

  return (
    <div ref={wrapRef} className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full"
        viewBox="0 0 800 1300"
        preserveAspectRatio="xMidYMid meet"
        fill="none"
      >
        {/* Background faint path */}
        <path
          d="
            M 400 60
            C 400 60, 680 60, 680 200
            C 680 340, 120 340, 120 480
            C 120 620, 680 620, 680 760
            C 680 900, 120 900, 120 1040
            C 120 1180, 400 1180, 400 1240
          "
          stroke="#f3f4f6"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Animated orange path */}
        <path
          ref={pathRef}
          d="
            M 400 60
            C 400 60, 680 60, 680 200
            C 680 340, 120 340, 120 480
            C 120 620, 680 620, 680 760
            C 680 900, 120 900, 120 1040
            C 120 1180, 400 1180, 400 1240
          "
          stroke="url(#pathGrad)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* Gradient def */}
        <defs>
          <linearGradient id="pathGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#fdba74" />
            <stop offset="50%"  stopColor="#f97316" />
            <stop offset="100%" stopColor="#fb923c" />
          </linearGradient>
        </defs>

        {/* Step dots on path */}
        {[
          { cx: 400, cy: 60  },
          { cx: 680, cy: 200 },
          { cx: 120, cy: 480 },
          { cx: 680, cy: 760 },
          { cx: 120, cy: 1040},
        ].map((pos, i) => (
          <g key={i}>
            <circle cx={pos.cx} cy={pos.cy} r="14" fill="white" stroke="#fed7aa" strokeWidth="2" />
            <circle cx={pos.cx} cy={pos.cy} r="8"  fill="#f97316" opacity="0.9" />
            <circle cx={pos.cx} cy={pos.cy} r="4"  fill="white" />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────
function SectionHead() {
  const { ref, inView } = useInView(0.2);
 
  return (
    <div
      ref={ref}
      className="text-center mb-20"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
        <span className="text-xs font-semibold text-orange-600 tracking-widest uppercase">How it works</span>
      </div>
      <h2 className="font-display text-[clamp(28px,4vw,46px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-4">
        Get started in
        <span className="text-orange-500"> 5 simple steps.</span>
      </h2>
      <p className="text-base text-stone-400 font-light max-w-lg mx-auto leading-relaxed">
        From understanding your business to deploying a fully customized AI-powered system - we handle everything end-to-end.
      </p>
    </div>
  );
}

// ─── Bottom CTA ───────────────────────────────────────────────────────────
function BottomCTA() {
  const { ref, inView } = useInView(0.1);
     const iconRef = useRef(null);
  const modal = useModal();
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
    <div
      ref={ref}
      className="mt-20 relative overflow-hidden rounded-2xl bg-stone-900 px-8 py-10 text-center"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s 0.15s ease-out, transform 0.6s 0.15s ease-out",
      }}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[180px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.2) 0%, transparent 70%)" }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
          <span className="text-xs font-semibold text-orange-400 tracking-widest uppercase">Ready when you are</span>
        </div>
        <h3 className="font-display text-[clamp(22px,3vw,36px)] font-extrabold text-white leading-tight tracking-tight mb-3">
          Start with a 30-minute conversation.
        </h3>
        <p className="text-sm text-stone-400 font-light max-w-lg mx-auto mb-8 leading-relaxed">
          No commitment. Show us your supply chain and we&apos;ll show you exactly what&apos;s possible.
        </p>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/book-demo" onMouseEnter={handleHover} onClick={() => modal.open("demo")} className="px-8 py-3.5 cursor-pointer flex items-center gap-2 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold shadow-lg shadow-orange-500/25 transition-all hover:-translate-y-0.5">
            Book a free demo <ArrowRight ref={iconRef} className="w-5 h-5" />
          </Link>
          <Link href="/contact" className="px-7 py-3.5 cursor-pointer rounded-xl border border-stone-700 text-stone-400 hover:text-white hover:border-stone-500 text-sm font-medium transition-all">
            Talk to our team
          </Link>
        </div>
        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {["Setup started in under 4 Weeks", "Your data stays on your servers"].map((t) => (
            <div key={t} className="flex items-center gap-1.5">
              <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3 text-orange-500 flex-shrink-0" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1.5 5 4 7.5 8.5 2.5" />
              </svg>
              <span className="text-[11px] text-stone-500">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────
export default function HowItWorksSection() {
  return (
    <section className="relative bg-[#fafaf9] border-y border-gray-200 py-24 px-6 md:px-16 overflow-hidden">

      {/* Dot bg */}
      {/* <div
        className="absolute inset-0 pointer-events-none opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(circle, #a8a29e 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      /> */}

        <FloatingOrbs />

      {/* Orange wash */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-4xl mx-auto">

        <SectionHead />

        {/* Path + cards container */}
        <div className="relative">

          {/* Animated SVG path - behind cards */}
          <div className="hidden lg:block absolute inset-x-0 top-0 bottom-0 pointer-events-none" style={{ zIndex: 0 }}>
            <AnimatedPath />
          </div>

          {/* Steps - alternating left / right */}
          <div className="relative flex flex-col gap-20 lg:gap-28" style={{ zIndex: 1 }}>
            {STEPS.map((step, i) => (
              <StepCard key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        <BottomCTA />
      </div>
    </section>
  );
}