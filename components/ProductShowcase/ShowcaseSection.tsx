"use client";

import { useEffect, useRef, useState } from "react";

// ─── Module definitions ───────────────────────────────────────────────────
const MODULES = [
  {
    id: "command-center",
    number: "01",
    tag: "Command Center",
    title: "Total visibility.\nEverything in one place.",
    description:
      "Monitor inventory, orders, warehouses, and shipments in real time from a single dashboard. No more switching between tools.",
    points: [
      "Real-time inventory status across all locations",
      "Live order tracking from creation to delivery",
      "Shipment visibility with delay alerts",
      "KPI monitoring with custom thresholds",
    ],
    accent: "orange",
  },
  {
    id: "forecasting",
    number: "02",
    tag: "Demand Forecasting",
    title: "Predict demand\nbefore it happens.",
    description:
      "AI analyses your historical sales, seasonal patterns, and trends to forecast future demand — so you're always one step ahead.",
    points: [
      "Sales prediction per SKU",
      "Seasonal trend detection",
      "Raw material quantity planning",
      "Forecast accuracy monitoring",
    ],
    accent: "indigo",
  },
  {
    id: "inventory",
    number: "03",
    tag: "Inventory & Warehouse",
    title: "Smart inventory.\nAcross every warehouse.",
    description:
      "Track stock across all locations, detect imbalances, monitor internal movements, and surface dead stock before it costs you.",
    points: [
      "Multi-warehouse stock tracking",
      "AI-driven stock balancing recommendations",
      "Internal movement and transfer tracking",
      "Dead stock and overstock detection",
    ],
    accent: "emerald",
  },
  {
    id: "ai-assistant",
    number: "04",
    tag: "AI Assistant",
    title: "Ask anything.\nGet instant answers.",
    description:
      "Our AI is trained on your data only. Ask about inventory, orders, shortages, or forecasts — in plain English. No dashboards needed.",
    points: [
      "Natural language queries",
      "Real-time answers from your live data",
      "Every decision shown with its reasoning",
      "No navigation or fixed reports required",
    ],
    accent: "violet",
  },
];

// ─── Accent config ────────────────────────────────────────────────────────
const A: Record<string, {
  text: string; bg: string; border: string; dot: string;
  tagText: string; tagBg: string; tagBorder: string;
  glow: string; barActive: string; number: string;
}> = {
  orange: {
    text: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200",
    dot: "bg-orange-400", tagText: "text-orange-600", tagBg: "bg-orange-50",
    tagBorder: "border-orange-100", glow: "rgba(249,115,22,0.08)",
    barActive: "bg-orange-500", number: "text-orange-200",
  },
  indigo: {
    text: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200",
    dot: "bg-indigo-400", tagText: "text-indigo-600", tagBg: "bg-indigo-50",
    tagBorder: "border-indigo-100", glow: "rgba(99,102,241,0.08)",
    barActive: "bg-indigo-500", number: "text-indigo-100",
  },
  emerald: {
    text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200",
    dot: "bg-emerald-400", tagText: "text-emerald-700", tagBg: "bg-emerald-50",
    tagBorder: "border-emerald-100", glow: "rgba(16,185,129,0.08)",
    barActive: "bg-emerald-500", number: "text-emerald-100",
  },
  violet: {
    text: "text-violet-600", bg: "bg-violet-50", border: "border-violet-200",
    dot: "bg-violet-400", tagText: "text-violet-700", tagBg: "bg-violet-50",
    tagBorder: "border-violet-100", glow: "rgba(139,92,246,0.08)",
    barActive: "bg-violet-500", number: "text-violet-100",
  },
};

// ─── Placeholder visuals ──────────────────────────────────────────────────

function CommandCenterVisual() {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-5">
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Inventory Accuracy", value: "94.7%", sub: "↑ +2.1%", color: "text-emerald-600" },
          { label: "Open Orders",        value: "128",   sub: "↓ 3 delayed", color: "text-orange-500" },
          { label: "Stockout Risk",      value: "3 SKUs", sub: "needs action", color: "text-red-500" },
          { label: "Warehouses",         value: "6 / 6", sub: "all online",  color: "text-indigo-500" },
        ].map((k) => (
          <div key={k.label} className="bg-white rounded-xl border border-stone-100 p-3">
            <p className="text-[9px] text-stone-400 mb-1 leading-tight">{k.label}</p>
            <p className={`font-display text-base font-extrabold leading-none ${k.color}`}>{k.value}</p>
            <p className="text-[9px] text-stone-400 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1fr_160px] gap-3 flex-1">
        <div className="bg-white rounded-xl border border-stone-100 p-4 flex flex-col">
          <p className="text-[9px] font-semibold text-stone-500 mb-2">Inventory health · 30 days</p>
          <svg viewBox="0 0 240 60" className="w-full flex-1" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(249,115,22,0.15)" />
                <stop offset="100%" stopColor="rgba(249,115,22,0)" />
              </linearGradient>
            </defs>
            <path d="M0,52 L30,46 L60,49 L90,38 L120,32 L150,24 L180,16 L210,10 L240,5"
              fill="url(#cg)" />
            <path d="M0,52 L30,46 L60,49 L90,38 L120,32 L150,24 L180,16 L210,10 L240,5"
              fill="none" stroke="#f97316" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="240" cy="5" r="3" fill="#f97316" />
          </svg>
        </div>
        <div className="bg-white rounded-xl border border-stone-100 p-3 flex flex-col gap-1.5">
          <p className="text-[9px] font-semibold text-stone-500 mb-1">Active Alerts</p>
          {[
            { dot: "bg-orange-400", msg: "Low: SKU-2041 Delhi" },
            { dot: "bg-red-400",    msg: "Overstock: SKU-0887" },
            { dot: "bg-emerald-400",msg: "Reorder placed: 480u" },
            { dot: "bg-amber-400",  msg: "Shipment delayed #44" },
          ].map((a, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-stone-50 rounded-lg px-2 py-1.5 border border-stone-100">
              <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.dot}`} />
              <p className="text-[9px] text-stone-600 leading-tight">{a.msg}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-stone-100 p-3">
        <p className="text-[9px] font-semibold text-stone-500 mb-2">Active Shipments</p>
        <div className="flex flex-col gap-1.5">
          {[
            { id: "SHP-4421", pct: 68,  color: "bg-orange-400", label: "In Transit" },
            { id: "SHP-4398", pct: 44,  color: "bg-red-400",    label: "At Customs" },
            { id: "SHP-4382", pct: 100, color: "bg-emerald-400",label: "Delivered"  },
          ].map((s) => (
            <div key={s.id} className="flex items-center gap-2.5">
              <span className="text-[9px] text-stone-500 w-14 flex-shrink-0">{s.id}</span>
              <div className="flex-1 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
              </div>
              <span className="text-[9px] text-stone-400 w-14 text-right">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
      {/* <GifSlot label="Command Center Demo" color="orange" /> */}
    </div>
  );
}

function ForecastVisual() {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-5">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Forecast Accuracy", value: "91%",   color: "text-indigo-600" },
          { label: "Stockouts Prevented", value: "↓28%", color: "text-emerald-600" },
          { label: "SKUs Forecasted",   value: "1,284", color: "text-stone-700" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-stone-100 p-3 text-center">
            <p className={`font-display text-xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[9px] text-stone-400 mt-1 leading-tight">{s.label}</p>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-stone-100 p-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="text-[9px] font-semibold text-stone-600">Demand Forecast — SKU-2041</p>
            <p className="text-[9px] text-stone-400">Next 60 days · Q4 seasonal surge detected</p>
          </div>
          <span className="text-[9px] font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">↑ 23% surge</span>
        </div>
        <svg viewBox="0 0 300 80" className="w-full flex-1" preserveAspectRatio="none">
          <defs>
            <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(99,102,241,0.15)" />
              <stop offset="100%" stopColor="rgba(99,102,241,0)" />
            </linearGradient>
          </defs>
          <path d="M0,68 L50,60 L100,63 L150,50 L190,38"
            fill="url(#fg)" />
          <path d="M0,68 L50,60 L100,63 L150,50 L190,38"
            fill="none" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M190,38 L230,24 L265,14 L300,5"
            fill="none" stroke="#a5b4fc" strokeWidth="1.8" strokeDasharray="5,3" strokeLinecap="round" />
          <line x1="190" y1="5" x2="190" y2="75" stroke="rgba(0,0,0,0.07)" strokeWidth="1" strokeDasharray="3,2" />
          <text x="193" y="13" fontSize="6.5" fill="rgba(99,102,241,0.5)" fontFamily="system-ui">Forecast →</text>
          <circle cx="300" cy="5" r="3" fill="#a5b4fc" />
        </svg>
        <div className="flex gap-4 mt-1.5">
          <span className="flex items-center gap-1 text-[9px] text-stone-400"><span className="w-3 h-0.5 bg-indigo-500 rounded inline-block" />Actual</span>
          <span className="flex items-center gap-1 text-[9px] text-stone-400"><span className="w-3 h-0.5 bg-indigo-300 rounded inline-block" style={{ borderTop: "1px dashed" }} />Forecast</span>
        </div>
      </div>
      <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-3 flex items-center justify-between">
        <div>
          <p className="text-[9px] font-semibold text-indigo-700">AI Procurement Signal</p>
          <p className="text-[9px] text-indigo-400 mt-0.5">Purchase 480 units Raw Mat. #R-204 by Nov 15 · Supplier A</p>
        </div>
        <div className="bg-white border border-indigo-200 rounded-lg px-2.5 py-1.5 text-[9px] font-semibold text-indigo-600 flex-shrink-0">✓ Approve</div>
      </div>
      {/* <GifSlot label="Forecasting Demo" color="indigo" /> */}
    </div>
  );
}

function InventoryVisual() {
  return (
    <div className="w-full h-full flex flex-col gap-3 p-5">
      <div className="bg-white rounded-xl border border-stone-100 p-4">
        <p className="text-[9px] font-semibold text-stone-500 mb-3">Warehouse Stock Levels</p>
        <div className="flex flex-col gap-2.5">
          {[
            { name: "Delhi WH",      pct: 88, color: "bg-emerald-400", status: "Healthy" },
            { name: "Mumbai WH",     pct: 31, color: "bg-red-400",     status: "Low"     },
            { name: "Bangalore WH",  pct: 67, color: "bg-orange-400",  status: "Good"    },
            { name: "Chennai WH",    pct: 94, color: "bg-emerald-400", status: "Healthy" },
          ].map((w) => (
            <div key={w.name} className="flex items-center gap-3">
              <span className="text-[9px] text-stone-500 w-22 flex-shrink-0 w-24">{w.name}</span>
              <div className="flex-1 h-2 bg-stone-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${w.color}`} style={{ width: `${w.pct}%` }} />
              </div>
              <span className="text-[9px] text-stone-400 w-20 text-right">{w.status} · {w.pct}%</span>
            </div>
          ))}
        </div>
        <p className="text-[9px] text-emerald-600 font-medium mt-2.5">↔ Transfer 200 units Mumbai → Bangalore recommended</p>
      </div>
      <div className="bg-white rounded-xl border border-stone-100 p-4 flex-1">
        <p className="text-[9px] font-semibold text-stone-500 mb-2">Inventory Overview</p>
        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-100">
              {["SKU", "Stock", "Status", "Action"].map((h) => (
                <th key={h} className="text-left text-[8px] font-semibold text-stone-400 pb-1.5 pr-2">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-50">
            {[
              { sku: "SKU-2041", stock: "14 units",  status: "Low",       sc: "text-red-500 bg-red-50",         action: "Reorder"   },
              { sku: "SKU-0887", stock: "840 units", status: "Overstock", sc: "text-amber-600 bg-amber-50",     action: "Markdown"  },
              { sku: "SKU-1134", stock: "230 units", status: "Healthy",   sc: "text-emerald-600 bg-emerald-50", action: "—"         },
              { sku: "SKU-3021", stock: "0 units",   status: "Dead",      sc: "text-stone-400 bg-stone-100",    action: "Write-off" },
            ].map((r) => (
              <tr key={r.sku}>
                <td className="text-[9px] font-medium text-stone-700 py-1.5 pr-2">{r.sku}</td>
                <td className="text-[9px] text-stone-500 pr-2">{r.stock}</td>
                <td className="pr-2"><span className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${r.sc}`}>{r.status}</span></td>
                <td className="text-[9px] text-stone-400">{r.action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <GifSlot label="Inventory & Warehouse Demo" color="emerald" /> */}
    </div>
  );
}

function AIAssistantVisual() {
  const messages = [
    { role: "user", text: "What's overstocked in Delhi warehouse?" },
    { role: "ai",   text: "SKU-0887 is 340% above target — 840 units on hand vs 185 needed. Suggesting markdown or transfer to Mumbai WH." },
    { role: "user", text: "Which supplier has the best lead time?" },
    { role: "ai",   text: "Supplier A — avg 4.2 days over 90 orders, 97% on-time. Supplier B averages 8.6 days." },
    { role: "user", text: "Show me dead stock across all warehouses." },
    { role: "ai",   text: "4 SKUs with zero movement in 60+ days. Est. ₹4.3L locked. Want a markdown plan?" },
  ];
  return (
    <div className="w-full h-full flex flex-col gap-3 p-5">
      <div className="bg-white rounded-xl border border-stone-100 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-stone-100 bg-stone-50/60">
          <div className="w-6 h-6 rounded-lg bg-violet-100 border border-violet-200 flex items-center justify-center">
            <span className="text-[10px] text-violet-600">✦</span>
          </div>
          <div>
            <p className="text-[9px] font-semibold text-stone-700">AI Supply Chain Assistant</p>
            <p className="text-[8px] text-stone-400">Trained on your data · Always up to date</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[8px] text-emerald-600 font-medium">Live</span>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1.5 p-3 overflow-hidden">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[82%] rounded-xl px-3 py-1.5 text-[9px] leading-relaxed ${
                m.role === "user"
                  ? "bg-violet-500 text-white rounded-tr-sm"
                  : "bg-stone-50 border border-stone-100 text-stone-600 rounded-tl-sm"
              }`}>
                {m.role === "ai" && <span className="text-violet-400 mr-1">✦</span>}
                {m.text}
              </div>
            </div>
          ))}
        </div>
        <div className="px-3 py-2 border-t border-stone-100 flex items-center gap-2">
          <div className="flex-1 bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-[8px] text-stone-400">
            Ask about inventory, orders, forecasts...
          </div>
          <div className="w-6 h-6 rounded-lg bg-violet-500 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-white" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-violet-50 border border-violet-100 rounded-xl px-4 py-2.5 flex items-center gap-2.5">
        <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4 text-violet-500 flex-shrink-0" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 1.5l6 2.5v4c0 3.5-2.8 6-6 7C2 15 2 12.5 2 9V4z" /><polyline points="5.5 8 7.5 10 11 6" />
        </svg>
        <p className="text-[9px] text-violet-600 leading-snug">
          <strong className="font-semibold">Your data never leaves your servers.</strong> AI trained on your data only.
        </p>
      </div>
      {/* <GifSlot label="AI Assistant Demo" color="violet" /> */}
    </div>
  );
}

const VISUALS = [
  <CommandCenterVisual key="cc" />,
  <ForecastVisual      key="fc" />,
  <InventoryVisual     key="iv" />,
  <AIAssistantVisual   key="ai" />,
];

// ─── GIF slot ─────────────────────────────────────────────────────────────
const GIF_STYLE: Record<string, string> = {
  orange:  "border-orange-200 bg-orange-50/40 text-orange-400",
  indigo:  "border-indigo-200 bg-indigo-50/40 text-indigo-400",
  emerald: "border-emerald-200 bg-emerald-50/40 text-emerald-500",
  violet:  "border-violet-200 bg-violet-50/40 text-violet-400",
};
function GifSlot({ label, color }: { label: string; color: string }) {
  return (
    <div className={`rounded-xl border-2 border-dashed flex items-center justify-center gap-2 py-2.5 px-3 ${GIF_STYLE[color]}`}>
      <svg viewBox="0 0 16 16" fill="none" className="w-3.5 h-3.5 flex-shrink-0" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="2.5" width="14" height="11" rx="2" />
        <polygon points="6 6 6 10 11 8" fill="currentColor" stroke="none" />
      </svg>
      <p className="text-[9px] font-medium">{label} · <span className="opacity-60 font-normal">GIF placeholder</span></p>
    </div>
  );
}

// ─── Main section ─────────────────────────────────────────────────────────
export default function ShowcaseSection() {
   const sectionRef  = useRef<HTMLDivElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const tagRef        = useRef<HTMLSpanElement>(null);
  const numberRef     = useRef<HTMLSpanElement>(null);
  const titleRef      = useRef<HTMLHeadingElement>(null);
  const descRef       = useRef<HTMLParagraphElement>(null);
  const pointsRef     = useRef<HTMLDivElement>(null);
  const visualRef     = useRef<HTMLDivElement>(null);
  const progressRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const activeRef     = useRef(0);

  const SCROLL_PER_MODULE = 400;


  useEffect(() => {
    let gsapCtx: { revert?: () => void } = {};

    (async () => {
      const { gsap }          = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const animateIn = (index: number) => {
        const tl = gsap.timeline();

        tl.to([titleRef.current, descRef.current, tagRef.current, numberRef.current], {
          opacity: 0, y: -14, duration: 0.22, ease: "power2.in", stagger: 0.03,
        }, 0);

        tl.to(pointsRef.current?.children ? Array.from(pointsRef.current.children) : [], {
          opacity: 0, x: -10, duration: 0.18, ease: "power2.in", stagger: 0.02,
        }, 0);

        tl.to(visualRef.current, {
          opacity: 0, scale: 0.97, duration: 0.22, ease: "power2.in",
        }, 0);

        tl.call(() => {
          activeRef.current = index;
          setActive(index);
        });

        tl.to({}, { duration: 0.06 });

        tl.fromTo([numberRef.current, tagRef.current, titleRef.current, descRef.current], {
          opacity: 0, y: 18,
        }, {
          opacity: 1, y: 0, duration: 0.42, ease: "power3.out", stagger: 0.05,
        });

        tl.fromTo(
          pointsRef.current?.children ? Array.from(pointsRef.current.children) : [],
          { opacity: 0, x: -14 },
          { opacity: 1, x: 0, duration: 0.35, ease: "power3.out", stagger: 0.06 },
          "-=0.28"
        );

        tl.fromTo(visualRef.current, {
          opacity: 0, scale: 0.97, y: 10,
        }, {
          opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "power3.out",
        }, "-=0.38");
      };

      gsapCtx = gsap.context(() => {

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${MODULES.length * SCROLL_PER_MODULE}vh`,
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
        });

        MODULES.forEach((_, i) => {
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: `top+=${i * 400}vh top`,
            end:   `top+=${(i + 1) * 400}vh top`,
            onEnter:     () => { if (activeRef.current !== i) animateIn(i); },
            onEnterBack: () => { if (activeRef.current !== i) animateIn(i); },
          });

          ScrollTrigger.create({
            trigger: sectionRef.current,
            start:   `top+=${i * 400}vh top`,
            end:     `top+=${(i + 1) * 400}vh top`,
            onUpdate: (self) => {
              if (progressRefs.current[i]) {
                gsap.set(progressRefs.current[i], { scaleX: self.progress });
              }
            },
          });
        });
      });

    })();

    return () => gsapCtx.revert?.();
  }, []);

  const mod = MODULES[active];
  const a   = A[mod.accent];


  return (
    <>
         <div
        ref={sectionRef}
        // style={{ height: `${MODULES.length * 400}vh` }}
        className="relative"
      >
        <div
          ref={stickyRef}
          className="h-screen w-full bg-white flex flex-col overflow-hidden"
          style={{ position: "sticky", top: 0 }}
        >
          {/* ── Top header ── */}
          <div className="flex-shrink-0 pt-8 pb-4 px-8 md:px-16 border-b border-stone-100">
            <div className="max-w-6xl mx-auto flex items-end justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span className="text-[10px] font-semibold text-orange-600 tracking-widest uppercase">Platform</span>
                </div>
                <h2 className="font-display text-[clamp(22px,3vw,38px)] font-extrabold text-stone-900 leading-tight tracking-tight">
                  Your entire supply chain.{" "}
                  <span className="text-orange-500">Visualized & controlled.</span>
                </h2>
              </div>

              {/* Module nav pills */}
              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                {MODULES.map((m, i) => (
                  <div key={m.id} className="flex flex-col items-center gap-1.5">
                    <button
                      onClick={async () => {
                        const { gsap } = await import("gsap");
                        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
                        gsap.registerPlugin(ScrollTrigger);
                        // Jump scroll to this module's position
                        const top = sectionRef.current!.getBoundingClientRect().top
                          + window.scrollY + i * window.innerHeight * 2;
                        window.scrollTo({ top, behavior: "smooth" });
                      }}
                      className={`text-[10px] font-semibold px-3 py-1.5 rounded-lg border transition-all duration-200 ${
                        active === i
                          ? `${a.tagBg} ${a.tagBorder} ${a.tagText} border`
                          : "bg-stone-50 border-stone-200 text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      {m.number} · {m.tag}
                    </button>
                    {/* Progress bar under each tab */}
                    <div className="w-full h-0.5 bg-stone-100 rounded-full overflow-hidden">
                      <div
                        ref={(el) => { progressRefs.current[i] = el; }}
                        className={`h-full rounded-full origin-left ${A[m.accent].barActive}`}
                        style={{ transform: "scaleX(0)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Main content ── */}
          <div className="flex-1 overflow-hidden px-8 md:px-16 py-6">
            <div className="max-w-6xl mx-auto h-full grid md:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">

              {/* Left — text */}
              <div className="flex flex-col justify-center h-full py-2">

                {/* Number + tag */}
                <div className="flex items-center gap-3 mb-5">
                  <span
                    ref={numberRef}
                    className={`font-display text-5xl font-extrabold leading-none select-none ${a.number}`}
                  >
                    {mod.number}
                  </span>
                  <span
                    ref={tagRef}
                    className={`text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${a.tagText} ${a.tagBg} ${a.tagBorder}`}
                  >
                    {mod.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  ref={titleRef}
                  className="font-display text-[clamp(22px,2.6vw,34px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-4 whitespace-pre-line"
                >
                  {mod.title}
                </h3>

                {/* Description */}
                <p
                  ref={descRef}
                  className="text-sm text-stone-500 font-light leading-relaxed mb-7 max-w-sm"
                >
                  {mod.description}
                </p>

                {/* Key points */}
                <div ref={pointsRef} className="flex flex-col gap-2.5">
                  {mod.points.map((pt, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-full ${a.bg} border ${a.border} flex items-center justify-center flex-shrink-0 mt-0.5 ${a.text}`}>
                        <svg viewBox="0 0 10 10" fill="none" className="w-2.5 h-2.5" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="1.5 5 4 7.5 8.5 2.5" />
                        </svg>
                      </div>
                      <p className="text-sm text-stone-600 font-normal leading-snug">{pt}</p>
                    </div>
                  ))}
                </div>

                {/* Scroll hint */}
                <div className="flex items-center gap-2 mt-8">
                  <div className="flex gap-1">
                    {MODULES.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-300 ${
                          i === active ? `w-6 ${a.dot}` : "w-1.5 bg-stone-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 ml-1">scroll to explore</span>
                </div>
              </div>

              {/* Right — visual */}
              <div ref={visualRef} className="h-full flex items-center">
                <div className="relative w-full">
                  {/* Glow */}
                  <div
                    className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none"
                    style={{ background: a.glow }}
                  />
                  {/* Card */}
                  <div className="relative bg-[#f9f9f8] border border-stone-200 rounded-2xl overflow-hidden shadow-xl shadow-stone-100/60">
                    {/* Browser bar */}
                    <div className="flex items-center gap-1.5 px-4 py-2.5 bg-white border-b border-stone-100">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-300" />
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-300" />
                      <div className="flex-1 mx-3 bg-stone-100 rounded h-4 flex items-center px-2">
                        <span className="text-[8px] text-stone-400">app.ourproduct.io/{mod.id}</span>
                      </div>
                      <div className={`w-1.5 h-1.5 rounded-full ${a.dot} animate-pulse`} />
                    </div>
                    {/* Visual content */}
                    <div className="min-h-[340px] max-h-[calc(100vh-240px)] overflow-hidden">
                      {VISUALS[active]}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  );
}