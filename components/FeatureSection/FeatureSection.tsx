"use client";

import { useEffect, useRef, useState } from "react";
import { useModal } from "@/components/Modal/ModalProvider";
import FloatingOrbs from "../ui/FloatingOrbs";

// ─── Scroll reveal hook ───────────────────────────────────────────────────
function useReveal(threshold = 0.15) {
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

// ─── Inline SVG icons (MIT/free, hand-crafted) ───────────────────────────

const Icon = {
  Grid: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  TrendUp: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
      <polyline points="16 7 22 7 22 13" />
    </svg>
  ),
  Package: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  ),
  Warehouse: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <rect x="9" y="14" width="6" height="8" rx="0.5" />
      <line x1="9" y1="14" x2="9" y2="22" /><line x1="15" y1="14" x2="15" y2="22" />
    </svg>
  ),
  Brain: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.5 2A2.5 2.5 0 017 4.5v0A2.5 2.5 0 014.5 7v0A2.5 2.5 0 012 9.5v0A2.5 2.5 0 014.5 12v0A2.5 2.5 0 017 14.5v0A2.5 2.5 0 019.5 17h5a2.5 2.5 0 002.5-2.5v0A2.5 2.5 0 0019.5 12v0A2.5 2.5 0 0022 9.5v0A2.5 2.5 0 0019.5 7v0A2.5 2.5 0 0017 4.5v0A2.5 2.5 0 0014.5 2h-5z" />
      <line x1="12" y1="17" x2="12" y2="22" />
      <line x1="9" y1="22" x2="15" y2="22" />
      <line x1="9" y1="10" x2="9" y2="10.01" strokeWidth={2} /><line x1="12" y1="8" x2="12" y2="8.01" strokeWidth={2} /><line x1="15" y1="10" x2="15" y2="10.01" strokeWidth={2} />
    </svg>
  ),
  Shield: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  ),
  BarChart: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  ),
  Zap: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  Link: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
    </svg>
  ),
  Eye: () => (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

// ─── Mini spark bar ───────────────────────────────────────────────────────
function SparkBars({ heights, color }: { heights: number[]; color: string }) {
  return (
    <div className="flex items-end gap-0.5 h-8">
      {heights.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-all duration-700"
          style={{ height: `${h}%`, background: color, opacity: 0.55 + (i / heights.length) * 0.45 }}
        />
      ))}
    </div>
  );
}

// ─── Mini forecast line ───────────────────────────────────────────────────
function ForecastLine() {
  return (
    <svg viewBox="0 0 120 36" className="w-full h-9" preserveAspectRatio="none">
      <defs>
        <linearGradient id="fl" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(249,115,22,0.2)" />
          <stop offset="100%" stopColor="rgba(249,115,22,0)" />
        </linearGradient>
      </defs>
      <path d="M0,32 L15,28 L30,30 L45,22 L60,18 L75,12 L90,8 L105,5 L120,3" fill="url(#fl)" />
      <path d="M0,32 L15,28 L30,30 L45,22 L60,18 L75,12 L90,8 L105,5 L120,3"
        fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M75,12 L90,8 L105,5 L120,3"
        fill="none" stroke="#fb923c" strokeWidth="1" strokeDasharray="3,2" strokeLinecap="round" />
      <circle cx="120" cy="3" r="2.5" fill="#f97316" opacity="0.8" />
    </svg>
  );
}

// ─── Card data ────────────────────────────────────────────────────────────

interface CardProps {
  icon: keyof typeof Icon;
  accent: string;           // tailwind color class e.g. "text-orange-500"
  accentBg: string;         // e.g. "bg-orange-50"
  accentBorder: string;     // e.g. "border-orange-100"
  label: string;
  title: string;
  body: string;
  trustLine: string;        // short proof / trust builder
  visual?: React.ReactNode; // optional mini UI inside the card
  wide?: boolean;
  tall?: boolean;
}

const CARDS: CardProps[] = [
  {
    icon: "Grid",
    accent: "text-orange-500",
    accentBg: "bg-orange-50",
    accentBorder: "border-orange-100",
    label: "Command Center",
    title: "Unified view of your entire supply chain",
    body: "One dashboard for every warehouse, order, shipment, and SKU — across every location. No more switching between tabs, spreadsheets, and WhatsApp threads.",
    trustLine: "Live data · Updates in real-time from your connected DBs",
    visual: (
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          { label: "Warehouses", val: "6", sub: "connected", color: "text-orange-500" },
          { label: "SKUs tracked", val: "1,284", sub: "active", color: "text-stone-800" },
          { label: "Stock accuracy", val: "94.7%", sub: "↑ +2.1%", color: "text-emerald-600" },
        ].map((s) => (
          <div key={s.label} className="bg-stone-50 rounded-xl p-3 border border-stone-100">
            <p className={`font-display text-xl font-extrabold leading-none ${s.color}`}>{s.val}</p>
            <p className="text-[10px] text-stone-400 mt-1">{s.label}</p>
            <p className="text-[9px] text-stone-300">{s.sub}</p>
          </div>
        ))}
      </div>
    ),
    wide: true,
  },
  {
    icon: "TrendUp",
    accent: "text-orange-500",
    accentBg: "bg-orange-50",
    accentBorder: "border-orange-100",
    label: "Sales Forecasting",
    title: "Predict sales. Know what to stock — before it's too late.",
    body: "Our AI analyses your historical sales, seasonality, and market signals to predict demand per SKU. Your procurement team gets exact quantity targets — not guesses.",
    trustLine: "Trained on your data only — zero data sharing",
    visual: (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-medium text-stone-400 uppercase tracking-wide">Forecast vs Actual</span>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">91% accuracy</span>
        </div>
        <ForecastLine />
        <div className="flex gap-3 mt-2">
          <span className="flex items-center gap-1 text-[10px] text-stone-400"><span className="w-3 h-0.5 bg-orange-400 rounded inline-block" />Actual</span>
          <span className="flex items-center gap-1 text-[10px] text-stone-400"><span className="w-3 h-0.5 bg-orange-300 rounded inline-block border-dashed border border-orange-200" />Forecast</span>
        </div>
      </div>
    ),
  },
  {
    icon: "Package",
    accent: "text-red-500",
    accentBg: "bg-red-50",
    accentBorder: "border-red-100",
    label: "Inventory Intelligence",
    title: "End overstocking and understocking — permanently.",
    body: "We calculate exact raw material quantities from your predicted sales. Your procurement team sees what to buy, how much, and by when — eliminating costly over-orders and last-minute shortages.",
    trustLine: "Avg. 28% reduction in stockouts · 22% less carrying cost",
    visual: (
      <div className="mt-4 space-y-2.5">
        {[
          { label: "Raw Mat. #R-204", status: "Order 480 units", tag: "Recommended", tagColor: "text-orange-600 bg-orange-50 border-orange-100" },
          { label: "Packaging Box L",  status: "Stock sufficient", tag: "OK",          tagColor: "text-emerald-600 bg-emerald-50 border-emerald-100" },
          { label: "SKU-0887 Refill",  status: "Overstock +340%", tag: "Alert",        tagColor: "text-red-500 bg-red-50 border-red-100" },
        ].map((r) => (
          <div key={r.label} className="flex items-center justify-between bg-stone-50 rounded-lg px-3 py-2 border border-stone-100">
            <div>
              <p className="text-[11px] font-medium text-stone-700">{r.label}</p>
              <p className="text-[10px] text-stone-400">{r.status}</p>
            </div>
            <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full border ${r.tagColor}`}>{r.tag}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: "Warehouse",
    accent: "text-indigo-500",
    accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-100",
    label: "Warehouse Management",
    title: "Track every warehouse. Balance stock intelligently.",
    body: "See real-time stock levels across all your locations. Our AI detects imbalance — surplus in one city, shortage in another — and recommends inter-warehouse transfers before orders fail.",
    trustLine: "Multi-warehouse · Real-time · Transfer recommendations",
    visual: (
      <div className="mt-4">
        <div className="space-y-2">
          {[
            { loc: "Delhi WH",    pct: 88, status: "Healthy",  color: "bg-emerald-400" },
            { loc: "Mumbai WH",   pct: 34, status: "Low",       color: "bg-red-400" },
            { loc: "Bangalore WH",pct: 71, status: "Good",      color: "bg-orange-400" },
          ].map((w) => (
            <div key={w.loc} className="flex items-center gap-3">
              <span className="text-[10px] text-stone-500 w-24 flex-shrink-0">{w.loc}</span>
              <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${w.color}`} style={{ width: `${w.pct}%` }} />
              </div>
              <span className="text-[10px] text-stone-400 w-14 text-right">{w.status} · {w.pct}%</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-indigo-500 font-medium mt-3">↔ Transfer 200 units Mumbai → Bangalore recommended</p>
      </div>
    ),
  },
  {
    icon: "Brain",
    accent: "text-violet-500",
    accentBg: "bg-violet-50",
    accentBorder: "border-violet-100",
    label: "AI Assistant",
    title: "Ask anything about your supply chain — in plain English.",
    body: "Our AI is trained exclusively on your data. Ask it about current stock, dead items, overstock risks, pending orders, or supplier performance. No fixed reports. No dashboards to navigate. Just answers.",
    trustLine: "Runs on your server · Your data never leaves your infra",
    visual: (
      <div className="mt-4 space-y-2">
        {[
          { q: "What's overstocked in Delhi this week?",       a: "SKU-0887 is 340% above target. Suggest markdown." },
          { q: "Which supplier has the best lead time?",       a: "Supplier A — avg. 4.2 days over last 90 orders." },
        ].map((m, i) => (
          <div key={i}>
            <div className="flex justify-end mb-1">
              <div className="bg-violet-50 border border-violet-100 rounded-xl rounded-tr-sm px-3 py-2 text-[10px] text-violet-700 max-w-[85%]">{m.q}</div>
            </div>
            <div className="flex justify-start">
              <div className="bg-stone-50 border border-stone-100 rounded-xl rounded-tl-sm px-3 py-2 text-[10px] text-stone-600 max-w-[90%] flex gap-1.5">
                <span className="text-violet-400 flex-shrink-0">✦</span>{m.a}
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
    wide: true,
  },
  {
    icon: "Shield",
    accent: "text-emerald-600",
    accentBg: "bg-emerald-50",
    accentBorder: "border-emerald-100",
    label: "No Black Box",
    title: "Your data stays yours. Fully transparent logic.",
    body: "We connect to your existing database — we don't copy or store your data. Every AI recommendation shows its reasoning. No hidden logic. No vendor lock-in.",
    trustLine: "Self-hosted option · SOC 2 · Full audit trail",
    visual: (
      <div className="mt-4 space-y-2">
        {[
          { label: "Data stored on your servers", ok: true },
          { label: "Every AI decision is explainable", ok: true },
          { label: "Connect your existing DB — no migration", ok: true },
          { label: "Full audit trail on all actions", ok: true },
        ].map((r) => (
          <div key={r.label} className="flex items-center gap-2.5">
            <div className="w-4 h-4 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
              <svg className="w-2.5 h-2.5 text-emerald-500" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2 6 5 9 10 3" />
              </svg>
            </div>
            <span className="text-[11px] text-stone-600">{r.label}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: "BarChart",
    accent: "text-orange-500",
    accentBg: "bg-orange-50",
    accentBorder: "border-orange-100",
    label: "Dead Stock Detection",
    title: "Find the money sitting idle in your warehouse.",
    body: "Our AI flags SKUs with zero or near-zero movement. See exactly how much capital is locked in dead stock — and get markdown or liquidation recommendations before write-offs compound.",
    trustLine: "Avg. ₹4.3L in capital recovered per warehouse",
    visual: (
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] text-stone-400 uppercase tracking-wide font-medium">Dead stock detected</span>
          <span className="text-[10px] font-bold text-orange-500">₹4.3L locked</span>
        </div>
        <SparkBars heights={[85, 72, 60, 45, 30, 18, 9, 4]} color="#f97316" />
        <div className="flex items-center justify-between mt-2">
          <span className="text-[9px] text-stone-300">90 days ago</span>
          <span className="text-[9px] text-stone-300">Today</span>
        </div>
        <p className="text-[10px] text-orange-500 font-medium mt-2">8 SKUs flagged · 3 recommended for markdown</p>
      </div>
    ),
  },
  {
    icon: "Link",
    accent: "text-sky-500",
    accentBg: "bg-sky-50",
    accentBorder: "border-sky-100",
    label: "Plug-and-Play Integration",
    title: "Connect in days. No replacement. No migration.",
    body: "Our Product works alongside your existing ERP, WMS, or database. SAP, Oracle, NetSuite, PostgreSQL, MySQL — we connect to what you already use. No rip-and-replace.",
    trustLine: "Setup in < 5 days · API + direct DB connectors",
    visual: (
      <div className="mt-4">
        <div className="grid grid-cols-3 gap-2">
          {["SAP", "Oracle", "NetSuite", "MySQL", "PostgreSQL", "MongoDB"].map((db) => (
            <div key={db} className="flex items-center gap-1.5 bg-stone-50 border border-stone-100 rounded-lg px-2.5 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-[10px] font-medium text-stone-600">{db}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-stone-400 mt-2.5">+ any REST API, CSV import, or custom connector</p>
      </div>
    ),
  },
  {
    icon: "Zap",
    accent: "text-amber-500",
    accentBg: "bg-amber-50",
    accentBorder: "border-amber-100",
    label: "Cost & Time Savings",
    title: "Cut 80% of manual ops. Watch margins grow.",
    body: "Automated reorders, AI-generated reports, smart alerts, and one-click procurement approvals slash manual work. Your team spends time on strategy — not spreadsheets.",
    trustLine: "307% ROI within 18 months · avg. verified across deployments",
    visual: (
      <div className="mt-4 grid grid-cols-2 gap-2">
        {[
          { metric: "−80%",   label: "Manual ops time",   color: "text-amber-500" },
          { metric: "−28%",   label: "Stockout incidents", color: "text-red-500" },
          { metric: "+35%",   label: "Forecast accuracy",  color: "text-emerald-600" },
          { metric: "307%",   label: "18-month ROI",       color: "text-orange-500" },
        ].map((s) => (
          <div key={s.label} className="bg-stone-50 border border-stone-100 rounded-xl p-3">
            <p className={`font-display text-lg font-extrabold leading-none ${s.color}`}>{s.metric}</p>
            <p className="text-[10px] text-stone-400 mt-1 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
    ),
  },
];

// ─── Single card component ────────────────────────────────────────────────

function FeatureCard({ card, index }: { card: CardProps; index: number }) {
  const { ref, visible } = useReveal(0.1);
  const IconComp = Icon[card.icon];

  return (
    <div
      ref={ref}
      className={`
        relative bg-white rounded-2xl border border-stone-100
        shadow-sm shadow-stone-100/80 hover:shadow-md hover:shadow-stone-200/60
        hover:-translate-y-1 hover:border-stone-200 duration-500 
        transition-all ease-out p-6 flex flex-col
        ${card.wide ? "md:col-span-2" : ""}
        ${card.tall ? "row-span-2" : ""}
      `}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.55s ${index * 0.07}s ease-out, transform 0.55s ${index * 0.07}s ease-out, box-shadow 0.25s, border-color 0.25s`,
      }}
    >
      {/* Top accent line */}
      <div
        className={`absolute top-0 left-6 right-6 h-px rounded-full`}
        style={{ background: `linear-gradient(90deg, transparent, currentColor, transparent)` }}
      />

      {/* Icon + label row */}
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-xl ${card.accentBg} ${card.accentBorder} border flex items-center justify-center flex-shrink-0 ${card.accent}`}>
          <div className="w-4.5 h-4.5" style={{ width: 18, height: 18 }}>
            <IconComp />
          </div>
        </div>
        <span className={`text-xs font-semibold uppercase tracking-widest ${card.accent} opacity-80`}>
          {card.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-display text-[17px] font-bold text-stone-900 leading-snug mb-2 tracking-tight">
        {card.title}
      </h3>

      {/* Body */}
      <p className="text-sm text-stone-500 font-light leading-relaxed">
        {card.body}
      </p>

      {/* Visual */}
      {card.visual}

      {/* Trust line */}
      <div className={`mt-auto pt-4 flex items-center gap-2`}>
        <div className={`w-1 h-1 rounded-full ${card.accentBg} ${card.accent} opacity-60`}
          style={{ background: "currentColor" }} />
        <span className="text-[10px] font-medium text-stone-400 tracking-wide">
          {card.trustLine}
        </span>
      </div>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────

export default function FeatureSection() {
  const { ref: headRef, visible: headVisible } = useReveal(0.2);
  const modal = useModal();

  return (
    <section className="relative bg-white py-28 px-6 md:px-12 overflow-hidden">
        <FloatingOrbs />
      {/* Subtle bg texture */}
      <div
        className="absolute inset-0 opacity-[0.022] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, #78716c 1px, transparent 1px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Warm top gradient wash */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative max-w-6xl mx-auto">

        {/* Section header */}
        <div
          ref={headRef}
          className="max-w-2xl mb-16"
          style={{
            opacity: headVisible ? 1 : 0,
            transform: headVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
          }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
            <span className="text-xs font-semibold text-orange-600 tracking-wide uppercase">Why Our Product</span>
          </div>
          <h2 className="font-display text-[clamp(30px,4vw,48px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-4">
            Every supply chain problem
            <br />
            <span className="text-orange-500">solved in one platform.</span>
          </h2>
          <p className="text-base text-stone-500 font-light leading-relaxed max-w-xl">
            From predicting next month&apos;s demand to detecting dead stock sitting in a warehouse 800km away — Our Product gives your team the intelligence and tools to act before problems become losses.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
          {CARDS.map((card, i) => (
            <FeatureCard key={card.title} card={card} index={i} />
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 bg-stone-50 border border-stone-100 rounded-2xl px-8 py-6"
          style={{ opacity: 1 }}
        >
          <div>
            <p className="font-display text-lg font-bold text-stone-900 mb-1">
              Ready to see it on your data?
            </p>
            <p className="text-sm text-stone-500 font-light">
              We connect to your existing database in under a week — no migration, no risk.
            </p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <button onClick={() => modal.open("demo")} className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-md shadow-orange-200 hover:shadow-orange-300 transition-all hover:-translate-y-0.5">
              Get a demo →
            </button>
            <button className="px-6 py-3 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:border-orange-200 hover:text-orange-600 transition-all">
              See pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}