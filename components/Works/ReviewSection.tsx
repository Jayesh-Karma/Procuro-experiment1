"use client";

import { Star, ThumbsUp, TrendingUp, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Data ──────────────────────────────────────────────────────────────────
const REVIEWS = [
  {
    quote:
      "We were running on spreadsheets and gut feel for inventory. Three weeks after connecting Our Product, we had our first stockout prediction - and it was right. We haven't had an unplanned shortage since.",
    author: "Rajiv Menon",
    role: "Head of Operations",
    company: "Sterling AutoParts",
    industry: "Automotive",
    metric: { value: "0", label: "unplanned stockouts in 4 months" },
    avatar: "RM",
    color: "orange",
  },
  {
    quote:
      "The AI assistant alone is worth it. I can ask 'what's sitting dead in Chennai warehouse' and get an answer in seconds. That used to take my team half a day pulling reports from three different systems.",
    author: "Priya Nair",
    role: "Supply Chain Director",
    company: "FreshHarvest Foods",
    industry: "Food & Beverage",
    metric: { value: "↓85%", label: "time spent on manual reporting" },
    avatar: "PN",
    color: "emerald",
  },
  {
    quote:
      "What sold us was the data privacy model. Our product formulas and batch data are sensitive - the fact that everything stays on our servers and the AI is trained only on our data made legal and compliance sign off immediately.",
    author: "Dr. Anshul Sharma",
    role: "VP Technology",
    company: "MediCore Pharma",
    industry: "Pharma & Healthcare",
    metric: { value: "< 4 Weeks", label: "from contract to go-live" },
    avatar: "AS",
    color: "violet",
  },
  {
    quote:
      "Our Q4 seasonal surge used to clean us out - every year. This year the platform flagged the surge 6 weeks early, we procured ahead of time, and we hit 99.1% in-stock through the entire peak season.",
    author: "Karan Mehta",
    role: "Founder & CEO",
    company: "QuickRetail Group",
    industry: "Retail & E-commerce",
    metric: { value: "99.1%", label: "in-stock rate through peak season" },
    avatar: "KM",
    color: "indigo",
  },
];

const ACCENT = {
  orange: {
    avatar:   "bg-orange-100 text-orange-600 border-orange-200",
    metric:   "text-orange-500",
    metricBg: "bg-orange-50 border-orange-100",
    tag:      "bg-orange-50 border-orange-100 text-orange-600",
    quote:    "text-orange-400",
    glow:     "rgba(249,115,22,0.06)",
    dot:      "bg-orange-400",
    border:   "border-orange-200 shadow-md shadow-orange-200/30 hover:shadow-lg hover:shadow-orange-200/50",
  },
  emerald: {
    avatar:   "bg-emerald-100 text-emerald-700 border-emerald-200",
    metric:   "text-emerald-600",
    metricBg: "bg-emerald-50 border-emerald-100",
    tag:      "bg-emerald-50 border-emerald-100 text-emerald-700",
    quote:    "text-emerald-400",
    glow:     "rgba(16,185,129,0.06)",
    dot:      "bg-emerald-400",
    border:   "border-emerald-200 shadow-emerald-200/30 hover:shadow-lg hover:shadow-emerald-200/50",
  },
  violet: {
    avatar:   "bg-violet-100 text-violet-700 border-violet-200",
    metric:   "text-violet-600",
    metricBg: "bg-violet-50 border-violet-100",
    tag:      "bg-violet-50 border-violet-100 text-violet-700",
    quote:    "text-violet-400",
    glow:     "rgba(139,92,246,0.06)",
    dot:      "bg-violet-400",
    border:   "border-violet-200 shadow-violet-200/30 hover:shadow-lg hover:shadow-violet-200/50",
  },
  indigo: {
    avatar:   "bg-indigo-100 text-indigo-700 border-indigo-200",
    metric:   "text-indigo-600",
    metricBg: "bg-indigo-50 border-indigo-100",
    tag:      "bg-indigo-50 border-indigo-100 text-indigo-700",
    quote:    "text-indigo-400",
    glow:     "rgba(99,102,241,0.06)",
    dot:      "bg-indigo-400",
    border:   "border-indigo-200 shadow-indigo-200/30 hover:shadow-lg hover:shadow-indigo-200/50",
  },
};

// ─── Star row ─────────────────────────────────────────────────────────────
function Stars() {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg key={i} viewBox="0 0 14 14" className="w-3.5 h-3.5 text-amber-400" fill="currentColor">
          <path d="M7 1l1.545 3.09L12 4.635l-2.5 2.43.59 3.435L7 8.91l-3.09 1.59L4.5 7.065 2 4.635l3.455-.545L7 1z" />
        </svg>
      ))}
    </div>
  );
}

// ─── Single review card ───────────────────────────────────────────────────
function ReviewCard({
  review,
  index,
  featured = false,
}: {
  review: typeof REVIEWS[0];
  index: number;
  featured?: boolean;
}) {
  const ref    = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const a = ACCENT[review.color as keyof typeof ACCENT];
  const b = ACCENT[review.color as keyof typeof ACCENT];
  return (
    <div
      ref={ref}
      className={`flex border ${b.border} rounded-2xl overflow-hidden flex-col h-full ${featured ? "md:row-span-2" : ""}`}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ${index * 0.1}s ease-out, transform 0.6s ${index * 0.1}s ease-out`,
      }}
    >
      <div
        className={`
          relative flex flex-col h-full bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 ease-out
          overflow-hidden group
          ${featured ? "p-8" : "p-6"}
        `}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2.5px] opacity-60 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            // background: `linear-gradient(90deg, transparent 0%, currentColor 40%, transparent 100%)`,
          }}
        >
          <div className={`h-full w-full ${a.dot.replace("bg-", "bg-")}`}
            style={{ background: "inherit" }}
          />
        </div>

        {/* Industry tag + stars */}
        <div className="flex items-center justify-between mb-5">
          <span className={`text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border ${a.tag}`}>
            {review.industry}
          </span>
          <Stars />
        </div>

        {/* Quote mark */}
        <div className={`text-5xl font-serif leading-none mb-2 ${a.quote} opacity-40 select-none`}>
          &ldquo;
        </div>

        {/* Quote text */}
        <blockquote
          className={`
            font-light leading-relaxed text-stone-600 flex-1 mb-6
            ${featured ? "text-[17px]" : "text-sm"}
          `}
        >
          {review.quote}
        </blockquote>

        {/* Metric pill */}
        <div className={`inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border ${a.metricBg} mb-6 self-start`}>
          <span className={`font-display font-extrabold leading-none ${featured ? "text-2xl" : "text-xl"} ${a.metric}`}>
            {review.metric.value}
          </span>
          <span className="text-[11px] text-stone-500 leading-tight max-w-[120px]">
            {review.metric.label}
          </span>
        </div>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-stone-50">
          {/* Avatar */}
          <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center flex-shrink-0 font-display text-sm font-bold ${a.avatar}`}>
            {review.avatar}
          </div>
          <div>
            <p className="text-sm font-semibold text-stone-800 leading-tight">{review.author}</p>
            <p className="text-[11px] text-stone-600 mt-0.5">
              {review.role} · <span className="text-stone-500">{review.company}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Aggregate trust bar ──────────────────────────────────────────────────
function TrustBar() {
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
    <div
      ref={ref}
      className="flex flex-wrap items-center justify-center gap-8 py-8 px-6 bg-blue-50 border border-blue-300 shadow-sm rounded-2xl mb-14"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(16px)",
        transition: "opacity 0.55s ease-out, transform 0.55s ease-out",
      }}
    >
      {[
        { value: "4.9 / 5", label: "Average rating", icon: <Star className="text-yellow-500" /> },
        { value: "100%",    label: "Would recommend", icon:<ThumbsUp className="text-blue-500" /> },
        { value: "< 4 Weeks", label: "Avg. time to go-live", icon: <Zap  className="text-orange-500"/> },
        { value: "307%",    label: "Avg. ROI in 18 months", icon: <TrendingUp className="text-green-500" /> },
      ].map((s) => (
        <div key={s.label} className="flex flex-col items-center gap-1 text-center">
          <span className="text-lg">{s.icon}</span>
          <span className="font-display text-xl font-extrabold text-stone-900">{s.value}</span>
          <span className="text-[11px] text-stone-600">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────
function SectionHead() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="text-center mb-12"
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(18px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-5">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
        <span className="text-xs font-semibold text-orange-600 tracking-widest uppercase">
          Customer stories
        </span>
      </div>
      <h2 className="font-display text-[clamp(28px,4vw,46px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-4">
        Real teams.
        <span className="text-orange-500"> Real results.</span>
      </h2>
      <p className="text-base text-stone-600 font-light max-w-xl mx-auto leading-0">
        Operations leaders across manufacturing, pharma, retail, and food tell it how it is.
      </p>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────
export default function ReviewsSection() {
  return (
    <section className="relative bg-white py-24 px-6 md:px-12 overflow-hidden">

      {/* Warm top wash */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.045) 0%, transparent 70%)" }}
      />

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        style={{
          backgroundImage: "radial-gradient(circle, #a8a29e 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-5xl mx-auto">

        <SectionHead />
        <TrustBar />

        {/* Cards - asymmetric grid: big left + 2 right stacked, then full width below */}
        <div className=" grid grid-cols-2  gap-5">

          {/* Left featured - taller, spans 2 rows */}
          <div className=" col-span-2">
            <ReviewCard review={REVIEWS[0]} index={0} featured />
          </div>

          <div className="hidden md:block">
           <ReviewCard review={REVIEWS[1]} index={1} />
          </div>
     
          <div className="hidden md:block">
          <ReviewCard review={REVIEWS[2]} index={2} />
          </div>
     
          {/* Bottom right */}

        </div>

        {/* Fourth card - full width below */}
        <div className="mt-5">
          <div
            className="bg-white rounded-2xl border border-blue-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 p-7 overflow-hidden relative group"
            style={{ boxShadow: "0 4px 24px rgba(99,102,241,0.06), 0 1px 3px rgba(0,0,0,0.04)" }}
          >
            {/* Top accent */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-indigo-400 opacity-50 group-hover:opacity-90 transition-opacity duration-300" />

            <div className="flex flex-col md:flex-row md:items-center gap-7">

              {/* Quote side */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-full border bg-indigo-50 border-indigo-100 text-indigo-600">
                    {REVIEWS[3].industry}
                  </span>
                  <Stars />
                </div>
                <div className="text-4xl font-serif leading-none text-indigo-300 opacity-50 mb-1 select-none">&ldquo;</div>
                <blockquote className="text-[15px] text-stone-600 font-light leading-relaxed">
                  {REVIEWS[3].quote}
                </blockquote>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-28 bg-stone-100 flex-shrink-0" />

              {/* Right side - metric + author */}
              <div className="flex flex-col gap-5 md:w-52 flex-shrink-0">
                <div className="inline-flex flex-col items-start gap-0.5 px-4 py-3 rounded-xl border bg-indigo-50 border-indigo-100 self-start">
                  <span className="font-display text-2xl font-extrabold text-indigo-600 leading-none">
                    {REVIEWS[3].metric.value}
                  </span>
                  <span className="text-[11px] text-stone-500 leading-tight">
                    {REVIEWS[3].metric.label}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full border-2 bg-indigo-100 text-indigo-700 border-indigo-200 flex items-center justify-center font-display text-sm font-bold flex-shrink-0">
                    {REVIEWS[3].avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-stone-800 leading-tight">{REVIEWS[3].author}</p>
                    <p className="text-[11px] text-stone-600 mt-0.5">
                      {REVIEWS[3].role} · <span className="text-stone-500">{REVIEWS[3].company}</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}