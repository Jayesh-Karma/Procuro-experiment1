"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

// ─── Scroll reveal ─────────────────────────────────────────────────────────
function useInView(t = 0.08) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: t }
    );
    obs.observe(el); return () => obs.disconnect();
  }, [t]);
  return { ref, vis };
}

function Reveal({ children, delay = 0, className = "" }: {
  children: React.ReactNode; delay?: number; className?: string;
}) {
  const { ref, vis } = useInView(0.07);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : "translateY(20px)",
      transition: `opacity 0.6s ${delay}s ease-out, transform 0.6s ${delay}s ease-out`,
    }}>{children}</div>
  );
}

// ─── Section eyebrow ────────────────────────────────────────────────────────
function Eyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="h-px w-7 rounded-full bg-orange-400" />
      <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500">{text}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// MODULE DATA
// ═══════════════════════════════════════════════════════════════════
const MODULES = [
  {
    id: "command",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="7" height="7" rx="1.5" /><rect x="11" y="2" width="7" height="7" rx="1.5" />
        <rect x="2" y="11" width="7" height="7" rx="1.5" /><rect x="11" y="11" width="7" height="7" rx="1.5" />
      </svg>
    ),
    accent: "#f97316",
    accentBg: "#fff7ed",
    accentBorder: "#fed7aa",
    title: "Command Center",
    badge: "Unified visibility",
    headline: "Everything your supply chain is doing - right now.",
    description: "A single real-time dashboard giving every role in your organisation exactly the visibility they need. Inventory health, open orders, shipments in-transit, KPIs, and AI alerts - all in one place, no report-pulling.",
    capabilities: [
      { label: "Live inventory status", detail: "Real-time stock levels across every warehouse and location" },
      { label: "Order & shipment tracking", detail: "Open POs, customer orders, in-transit shipments with ETA" },
      { label: "KPI monitoring", detail: "OTIF rate, forecast accuracy, stockout rate - configurable thresholds" },
      { label: "Alerts engine", detail: "AI-generated alerts with recommended actions, not just notifications" },
      { label: "Role-based views", detail: "Ops, procurement, finance, and C-suite each see their relevant data" },
    ],
    stat: { value: "307%", label: "Average 18-month ROI" },
    preview: "command",
  },
  {
    id: "forecasting",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="2,14 6,9 10,11 14,5 18,7" /><circle cx="18" cy="7" r="1.5" fill="currentColor" stroke="none" />
      </svg>
    ),
    accent: "#6366f1",
    accentBg: "#eef2ff",
    accentBorder: "#c7d2fe",
    title: "Demand Forecasting",
    badge: "AI-driven planning",
    headline: "Know what you'll need before you need it.",
    description: "ML models trained on your specific demand history, seasonal patterns, and operational constraints. Per-SKU, per-location forecasts updated daily - replacing static reorder points with dynamic, intelligent procurement signals.",
    capabilities: [
      { label: "Per-SKU forecasting", detail: "Individual models per product line - not category-level averages" },
      { label: "Seasonal analysis", detail: "Automatic detection of cyclical demand patterns and peak timing" },
      { label: "Promotional uplift", detail: "Campaign calendars integrated - demand adjusts before launch" },
      { label: "Raw material planning", detail: "Consumption prediction linked directly to production schedules" },
      { label: "Procurement recommendations", detail: "AI-generated purchase plan with quantity, timing, and supplier" },
    ],
    stat: { value: "91%", label: "Average forecast accuracy" },
    preview: "forecasting",
  },
  {
    id: "inventory",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="16" height="14" rx="2" />
        <line x1="2" y1="8" x2="18" y2="8" /><line x1="7" y1="8" x2="7" y2="17" />
      </svg>
    ),
    accent: "#10b981",
    accentBg: "#ecfdf5",
    accentBorder: "#a7f3d0",
    title: "Inventory Management",
    badge: "Stock optimisation",
    headline: "Stock that works. Capital that moves.",
    description: "Real-time multi-warehouse inventory visibility with AI-driven optimisation. Dead stock detection, FEFO enforcement, overstock alerts, and inter-warehouse transfer recommendations - running automatically every day.",
    capabilities: [
      { label: "Multi-warehouse unified view", detail: "Live stock levels across every location, updated in real time" },
      { label: "Dead stock detection", detail: "Zero-movement SKUs flagged daily with exact capital value locked" },
      { label: "FEFO enforcement", detail: "Oldest expiry always dispatched first - system-enforced, not manual" },
      { label: "Overstock alerts", detail: "Automatic notification when stock exceeds demand forecast threshold" },
      { label: "Transfer recommendations", detail: "AI suggests inter-warehouse moves to balance stock before write-off" },
    ],
    stat: { value: "↓31%", label: "Inventory carrying cost reduction" },
    preview: "inventory",
  },
  {
    id: "warehouse",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 8L10 3L18 8V18H2V8Z" /><rect x="7" y="12" width="6" height="6" rx="0.5" />
      </svg>
    ),
    accent: "#d97706",
    accentBg: "#fffbeb",
    accentBorder: "#fde68a",
    title: "Warehouse Management",
    badge: "Operations & compliance",
    headline: "From goods receipt to dispatch - tracked end-to-end.",
    description: "Full warehouse operations visibility with batch tracking, picking workflow intelligence, and expiry management. Everything captured automatically from your connected systems - no manual logging, no spreadsheet updates.",
    capabilities: [
      { label: "Batch & lot traceability", detail: "Complete chain from raw material receipt to final delivery" },
      { label: "Picking workflow intelligence", detail: "FEFO rules enforced at every pick, system-driven" },
      { label: "Expiry alert system", detail: "30, 60, 90-day alerts fire automatically to relevant team members" },
      { label: "Inbound/outbound tracking", detail: "Shipments, GRN, and dispatch tracked with delay alerts" },
      { label: "Utilisation monitoring", detail: "Warehouse space vs. capacity per location - live" },
    ],
    stat: { value: "↓85%", label: "Manual documentation time" },
    preview: "warehouse",
  },
  {
    id: "orders",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h12v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        <line x1="8" y1="9" x2="12" y2="9" /><line x1="8" y1="12" x2="12" y2="12" />
        <line x1="7" y1="4" x2="7" y2="2" /><line x1="13" y1="4" x2="13" y2="2" />
      </svg>
    ),
    accent: "#8b5cf6",
    accentBg: "#f5f3ff",
    accentBorder: "#ddd6fe",
    title: "Order Management",
    badge: "Full lifecycle tracking",
    headline: "Every order. Every stage. No surprises.",
    description: "Complete order lifecycle visibility from purchase order to customer delivery. Internal orders, supplier orders, and customer shipments tracked in one place - with OTIF scoring and delay escalation before SLA breach.",
    capabilities: [
      { label: "Purchase order tracking", detail: "Supplier confirmation through goods receipt - every step visible" },
      { label: "Customer order fulfilment", detail: "Pick, pack, dispatch, and delivery tracked end-to-end" },
      { label: "OTIF monitoring", detail: "On-Time In-Full rate per customer and per supplier, live" },
      { label: "Delay prediction", detail: "AI flags at-risk orders before SLA breach - not after" },
      { label: "Supplier portal", detail: "Suppliers see their open orders and update delivery status directly" },
    ],
    stat: { value: "↑22%", label: "Order fulfilment rate" },
    preview: "orders",
  },
  {
    id: "ai",
    icon: (
      <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="10" r="3" /><path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
      </svg>
    ),
    accent: "#0ea5e9",
    accentBg: "#f0f9ff",
    accentBorder: "#bae6fd",
    title: "AI Assistant",
    badge: "Natural language intelligence",
    headline: "Ask your supply chain anything. In plain English.",
    description: "An AI chatbot trained exclusively on your data. Your team queries live inventory, orders, forecasts, and supplier data in natural language - and gets direct, sourced answers in seconds, not reports.",
    capabilities: [
      { label: "Natural language queries", detail: "No dashboards to navigate - just ask and get the answer" },
      { label: "Live data sourcing", detail: "Every answer pulls from your real-time data, not cached summaries" },
      { label: "Reasoning transparency", detail: "Each response shows the underlying data point - no black box" },
      { label: "Multi-domain coverage", detail: "Inventory, orders, forecasts, suppliers - all queryable at once" },
      { label: "Your data only", detail: "AI trained exclusively on your data - never shared or cross-trained" },
    ],
    stat: { value: "< 30s", label: "Answer time for any supply chain query" },
    preview: "ai",
  },
];

// ─── Module preview card (light) ───────────────────────────────────────────
function ModulePreview({ type, accent }: { type: string; accent: string }) {
  const previewStyle = "rounded-xl border border-stone-100 bg-white p-4 shadow-sm";
  const rowStyle = "flex items-center gap-3 py-2 border-b border-stone-50 last:border-0 text-sm";

  const previews: Record<string, React.ReactNode> = {
    command: (
      <div className="flex flex-col gap-3">
        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2">
          {[["↓30%","Stockouts","vs last quarter"],["↑91%","OTD Rate","last 30 days"],["₹4.3L","Dead Stock","flagged today"]].map(([v,l,s])=>(
            <div key={l} className="rounded-lg border border-stone-100 bg-stone-50 p-3 text-center">
              <p className="font-mono text-lg font-bold leading-none" style={{ color: accent }}>{v}</p>
              <p className="text-[10px] font-semibold text-stone-600 mt-1">{l}</p>
              <p className="text-[9px] text-stone-400 mt-0.5">{s}</p>
            </div>
          ))}
        </div>
        {/* Live table */}
        <div className={previewStyle}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-stone-600">Live Inventory - All Locations</span>
            <span className="flex items-center gap-1.5 text-[9px] text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live
            </span>
          </div>
          {[["SKU-2041 · Alphonso Pulp","Delhi WH","342 units","⚠ 18 days"],
            ["SKU-0887 · Mango Drink","Mumbai WH","0 units","✕ Out"],
            ["SKU-3312 · Fruit Mix","Chennai WH","1,240 units","✓ OK"]].map(([n,l,q,s])=>(
            <div key={n} className={rowStyle}>
              <span className="flex-1 text-[11px] text-stone-600 font-medium truncate">{n}</span>
              <span className="text-[10px] text-stone-400 w-16 text-right">{l}</span>
              <span className="text-[10px] font-mono text-stone-500 w-16 text-right">{q}</span>
              <span className={`text-[10px] font-semibold w-14 text-right ${s.startsWith("⚠")?"text-amber-500":s.startsWith("✕")?"text-red-500":"text-emerald-600"}`}>{s}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    forecasting: (
      <div className="flex flex-col gap-3">
        <div className={previewStyle}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-stone-600">8-Week Demand Forecast · SKU-2041</span>
            <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: `${accent}15`, color: accent }}>91% accuracy</span>
          </div>
          <div className="flex items-end gap-1 h-14">
            {[55,68,52,85,78,92,66,84].map((h,i)=>(
              <div key={i} title={`Week ${i+1}`} className="flex-1 rounded-sm transition-all duration-300 cursor-pointer hover:opacity-80"
                style={{ height:`${h}%`, background: i===5?accent:`${accent}35` }} />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["W1","W2","W3","W4","W5","W6","W7","W8"].map(w=>(
              <span key={w} className="text-[8px] text-stone-400 flex-1 text-center">{w}</span>
            ))}
          </div>
        </div>
        <div className={previewStyle}>
          <p className="text-[11px] font-bold text-stone-600 mb-2">AI Procurement Recommendation</p>
          <div className="flex items-center justify-between py-1.5 border-b border-stone-50">
            <span className="text-[11px] text-stone-500">SKU-2041 reorder quantity</span>
            <span className="text-[11px] font-bold" style={{ color: accent }}>480 units</span>
          </div>
          <div className="flex items-center justify-between py-1.5 border-b border-stone-50">
            <span className="text-[11px] text-stone-500">Order by</span>
            <span className="text-[11px] font-bold text-stone-700">Friday this week</span>
          </div>
          <div className="flex items-center justify-between py-1.5">
            <span className="text-[11px] text-stone-500">Preferred supplier</span>
            <span className="text-[11px] font-bold" style={{ color: accent }}>Supplier A · 3-day lead</span>
          </div>
        </div>
      </div>
    ),
    inventory: (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2">
          {[["Dead Stock","₹4.3L","8 SKUs · 60+ day zero-move","red"],["FEFO Status","100%","0 violations today","green"]].map(([l,v,s,c])=>(
            <div key={l} className={`rounded-lg border p-3 ${c==="red"?"bg-red-50 border-red-100":"bg-emerald-50 border-emerald-100"}`}>
              <p className="text-[10px] font-semibold text-stone-500 mb-1">{l}</p>
              <p className="font-mono text-xl font-bold leading-none" style={{ color: c==="red"?"#ef4444":"#10b981" }}>{v}</p>
              <p className="text-[9px] text-stone-400 mt-1">{s}</p>
            </div>
          ))}
        </div>
        <div className={previewStyle}>
          <p className="text-[11px] font-bold text-stone-600 mb-2">Transfer Recommendations</p>
          {[["SKU-0887","Delhi → Mumbai","320 units","Expiry risk"],
            ["SKU-3312","Chennai → Hyd.","150 units","Demand gap"]].map(([s,r,q,reason])=>(
            <div key={s} className={rowStyle}>
              <span className="text-[11px] font-semibold text-stone-700">{s}</span>
              <span className="text-[11px] font-bold flex-1" style={{ color: accent }}>{r}</span>
              <span className="text-[10px] text-stone-400">{q}</span>
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-100">{reason}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    warehouse: (
      <div className="flex flex-col gap-3">
        <div className={previewStyle}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-stone-600">Batch Tracking Today</span>
            <span className="text-[9px] font-semibold text-emerald-600">All FEFO compliant</span>
          </div>
          {[["#B-4421","Alphonso Pulp","Exp Nov 15","Transfer due"],
            ["#B-4390","Mango Pulp","Exp Dec 02","On shelf"],
            ["#B-4302","Fruit Mix","Exp Jan 18","On shelf"]].map(([b,p,e,s])=>(
            <div key={b} className={rowStyle}>
              <span className="text-[10px] font-mono text-stone-400">{b}</span>
              <span className="flex-1 text-[11px] text-stone-600">{p}</span>
              <span className="text-[10px] text-stone-400">{e}</span>
              <span className={`text-[9px] font-semibold ${s==="Transfer due"?"text-amber-500":"text-emerald-600"}`}>{s}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-100">
          <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
          <p className="text-[11px] font-medium text-amber-700">Expiry Alert: Batch #B-4421 - 18 days remaining. Transfer recommended.</p>
        </div>
      </div>
    ),
    orders: (
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-3 gap-2">
          {[["94%","OTIF Rate","↑6% vs last month"],["12","Late Orders","↓4 vs last month"],["₹2.4Cr","In-Transit","On schedule"]].map(([v,l,s])=>(
            <div key={l} className="rounded-lg border border-stone-100 bg-stone-50 p-3 text-center">
              <p className="font-mono text-lg font-bold leading-none" style={{ color: accent }}>{v}</p>
              <p className="text-[10px] font-semibold text-stone-600 mt-1">{l}</p>
              <p className="text-[9px] text-stone-400 mt-0.5">{s}</p>
            </div>
          ))}
        </div>
        <div className={previewStyle}>
          <p className="text-[11px] font-bold text-stone-600 mb-2">Active Orders</p>
          {[["PO-4421","Supplier A","Due today","At risk"],
            ["PO-4390","Supplier B","Due +3 days","On track"],
            ["SO-2201","Customer C","Dispatched","In transit"]].map(([id,party,due,status])=>(
            <div key={id} className={rowStyle}>
              <span className="text-[10px] font-mono text-stone-400">{id}</span>
              <span className="flex-1 text-[11px] text-stone-600">{party}</span>
              <span className="text-[10px] text-stone-400">{due}</span>
              <span className={`text-[10px] font-semibold ${status==="At risk"?"text-red-500":status==="On track"?"text-emerald-600":"text-amber-500"}`}>{status}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    ai: (
      <div className={`${previewStyle} flex flex-col gap-0`}>
        <div className="flex items-center gap-2 pb-3 border-b border-stone-100 mb-3">
          <div className="w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-bold" style={{ background: `${accent}15`, color: accent }}>✦</div>
          <span className="text-[11px] font-bold text-stone-600">AI in Supply Chain </span>
          <span className="ml-auto flex items-center gap-1 text-[9px] font-semibold text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live on your data
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {[
            { user: true,  text: "Which SKUs are expiring in the next 30 days?" },
            { user: false, text: "8 batches across 3 warehouses. Largest: Batch #B-4421 (SKU-2041, 340 units, Delhi WH) - expires Nov 15. Transfer to Mumbai recommended." },
            { user: true,  text: "How much capital is locked in dead stock?" },
            { user: false, text: "₹4.3L across 8 SKUs - zero movement 60+ days. Highest: SKU-0887 (₹1.8L). Markdown plan available, estimated ₹3.2L recovery." },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.user ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] rounded-xl px-3 py-2 text-[11px] leading-relaxed ${
                m.user
                  ? "bg-stone-100 text-stone-700 rounded-br-sm"
                  : "text-stone-700 rounded-bl-sm border border-stone-100"
              }`} style={!m.user ? { background: `${accent}08` } : {}}>
                {m.text}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  };

  return <div className="w-full">{previews[type]}</div>;
}

// ═══════════════════════════════════════════════════════════════════
// INTEGRATIONS
// ═══════════════════════════════════════════════════════════════════
const INTEGRATIONS = [
  { name: "SAP", cat: "ERP" }, { name: "Oracle", cat: "ERP" },
  { name: "MS Dynamics", cat: "ERP" }, { name: "Tally Prime", cat: "ERP" },
  { name: "NetSuite", cat: "ERP" }, { name: "Shopify", cat: "E-commerce" },
  { name: "WooCommerce", cat: "E-commerce" }, { name: "Amazon", cat: "Marketplace" },
  { name: "Flipkart", cat: "Marketplace" }, { name: "PostgreSQL", cat: "Database" },
  { name: "MySQL", cat: "Database" }, { name: "MongoDB", cat: "Database" },
  { name: "LabWare LIMS", cat: "Pharma" }, { name: "CSV / Excel", cat: "Flat Files" },
  { name: "REST APIs", cat: "Custom" },
];

// ═══════════════════════════════════════════════════════════════════
// HOW IT WORKS
// ═══════════════════════════════════════════════════════════════════
const STEPS = [
  { n: "01", phase: "Day 0",    title: "Discovery Call",        body: "30 minutes. We understand your operations, existing systems, top pain points, and what success looks like for your team." },
  { n: "02", phase: "Week 1",   title: "Map Your Operation",    body: "We map your supply chain flows, data sources, integration points, and seasonal patterns. Zero disruption to running operations." },
  { n: "03", phase: "Week 2",   title: "Connect Your Systems",  body: "Read-only API or database connectors to your ERP, WMS, and other sources. Your data never leaves your infrastructure." },
  { n: "04", phase: "Week 3",   title: "Configure & Deploy",    body: "Platform configured to your workflows, SKU structure, and compliance requirements. Deployed on your servers or private cloud." },
  { n: "05", phase: "Ongoing",  title: "Optimise with AI",      body: "2-hour team walkthrough. AI models improve each data cycle. Monthly review sessions. You own the data and the results." },
];

// ═══════════════════════════════════════════════════════════════════
// COMPARISON
// ═══════════════════════════════════════════════════════════════════
const COMPARISON = [
  ["Replace your ERP?",             "Usually required - months of migration",   "Never. Connects to what you already have."],
  ["Demand forecasting",            "Category averages or manual",              "Per-SKU ML model trained on your data"],
  ["Multi-channel inventory sync",  "Manual daily reconciliation",              "Real-time unified sync - all channels"],
  ["Dead stock detection",          "Manual reports, monthly at best",          "AI-flagged daily with exact capital value"],
  ["Batch & lot traceability",      "Manual or basic ERP module",               "Automated end-to-end with CoA linkage"],
  ["AI chatbot on live data",       "Not available",                            "Natural language queries - live answers"],
  ["Seasonal AI planning",          "Last year's actuals, manual process",      "AI seasonal model per SKU, 6–8 wks ahead"],
  ["Supplier risk monitoring",      "Periodic manual review",                   "Continuous - OTD, lead time, risk scored"],
  ["Data stays on your servers",    "Varies - often SaaS hosted externally",    "Always. Zero external data transmission."],
  ["Time to go-live",               "3–12 months typical",                      "Under 5 working days standard"],
  ["ROI timeline",                  "12–18 months typical",                     "Positive ROI within 6 months typical"],
];

// ═══════════════════════════════════════════════════════════════════
// PAGE
// ═══════════════════════════════════════════════════════════════════
export default function ProductPage() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const mod = MODULES[activeIdx];

  return (
    <div className="min-h-screen bg-white">

      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, #a8a29e 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative max-w-6xl mx-auto px-6 md:px-12 pt-36 pb-20">
          <div style={{ opacity: mounted?1:0, transform: mounted?"translateY(0)":"translateY(18px)", transition: "opacity 0.7s ease-out, transform 0.7s ease-out" }}>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-7 rounded-full bg-orange-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500">The Platform</span>
            </div>

            <div className="grid md:grid-cols-[1fr_340px] gap-16 items-start">
              <div>
                <h1 className="font-display text-5xl font-extrabold text-stone-900 leading-[1.05] tracking-tight mb-5">
                  AI in supply chain.
                  <br />
                  <span className="text-orange-500">Deployed on your servers.</span>
                  <br />
                  <span className="text-stone-400 font-light">Connected to your ERP.</span>
                </h1>
                <p className="text-base text-stone-500 font-light leading-relaxed max-w-lg mb-8">
                  Six modules covering forecasting, inventory, orders, warehouse, and AI intelligence. Connects to what you already have - live in under 4 Weeks, no migration required.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/contact"
                    className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-md shadow-orange-200">
                    Book a free demo
                    <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                    </svg>
                  </Link>
                  <Link href="/case-studies"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-stone-200 text-stone-600 hover:border-orange-200 hover:text-orange-600 text-sm font-medium transition-all">
                    See case studies →
                  </Link>
                </div>
              </div>

              {/* Proof column */}
              <div className="hidden md:flex flex-col gap-0 divide-y divide-stone-100 border border-stone-100 rounded-2xl overflow-hidden bg-stone-50">
                {[["307%","Avg. 18-month ROI","vs. traditional ERP"],["91%","AI forecast accuracy","across deployments"],["< 4 Weeks","Typical go-live","no migration required"],["0","Data leaves your servers","always"]].map(([v,l,s])=>(
                  <div key={l} className="flex items-center gap-4 px-5 py-4">
                    <span className="font-mono text-xl font-bold text-orange-500 leading-none w-20 flex-shrink-0">{v}</span>
                    <div>
                      <p className="text-xs font-semibold text-stone-700">{l}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">{s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration strip */}
            <div className="mt-14 pt-10 border-t border-stone-100">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-5">
                Connects to your existing systems - no migration required
              </p>
              <div className="flex flex-wrap gap-2">
                {INTEGRATIONS.map(i => (
                  <span key={i.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-100 bg-stone-50 text-xs text-stone-600 font-medium hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-all cursor-default">
                    <span className="text-[9px] text-stone-300">{i.cat}</span>
                    {i.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PLATFORM MODULES (light) ──────────────────────────── */}
      <section className="bg-[#FAFAF9] py-24 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-6xl mx-auto">

          <Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <Eyebrow text="Platform Modules" />
                <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold text-stone-900 leading-tight tracking-tight">
                  Six modules.
                  <span className="text-stone-400 font-light"> One connected platform.</span>
                </h2>
              </div>
              <p className="text-sm text-stone-400 font-light max-w-xs leading-relaxed">
                Deploy all six or start with the modules most relevant to your operation. Each one pulls from the same data layer.
              </p>
            </div>
          </Reveal>

          {/* Module tabs row */}
          <Reveal delay={0.05}>
            <div className="flex flex-wrap gap-2 mb-8">
              {MODULES.map((m, i) => (
                <button
                  key={m.id}
                  onClick={() => setActiveIdx(i)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                    activeIdx === i
                      ? "bg-white shadow-sm border-stone-200 text-stone-900"
                      : "bg-transparent border-stone-100 text-stone-500 hover:border-stone-200 hover:text-stone-700"
                  }`}
                >
                  <span style={{ color: activeIdx === i ? m.accent : undefined }} className={activeIdx !== i ? "text-stone-300" : ""}>
                    {m.icon}
                  </span>
                  {m.title}
                  {activeIdx === i && (
                    <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.accent }} />
                  )}
                </button>
              ))}
            </div>
          </Reveal>

          {/* Active module detail */}
          <div
            key={mod.id}
            className="grid md:grid-cols-[1fr_1.15fr] gap-6 items-start"
            style={{ animation: "fadeUp 0.4s ease-out" }}
          >
            {/* Left: info */}
            <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm">
              {/* Header band */}
              <div className="px-7 pt-7 pb-6 border-b border-stone-50">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border"
                      style={{ background: mod.accentBg, borderColor: mod.accentBorder, color: mod.accent }}>
                      {mod.icon}
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-1.5 inline-block"
                        style={{ color: mod.accent, borderColor: mod.accentBorder, background: mod.accentBg }}>
                        {mod.badge}
                      </span>
                      <h3 className="text-xl font-extrabold text-stone-900 leading-tight">{mod.title}</h3>
                    </div>
                  </div>
                  {/* Stat badge */}
                  <div className="text-right flex-shrink-0 px-4 py-3 rounded-xl border"
                    style={{ background: mod.accentBg, borderColor: mod.accentBorder }}>
                    <p className="font-mono text-2xl font-bold leading-none" style={{ color: mod.accent }}>{mod.stat.value}</p>
                    <p className="text-[9px] text-stone-400 mt-1 max-w-[90px] leading-tight">{mod.stat.label}</p>
                  </div>
                </div>
                <p className="text-sm text-stone-500 font-light leading-relaxed">{mod.description}</p>
              </div>

              {/* Capabilities */}
              <div className="px-7 py-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400 mb-4">What it does</p>
                <div className="flex flex-col gap-3">
                  {mod.capabilities.map((c, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border"
                        style={{ background: mod.accentBg, borderColor: mod.accentBorder }}>
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: mod.accent }} />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-stone-800">{c.label}</span>
                        <span className="text-xs text-stone-400 font-light"> - {c.detail}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link href="/contact"
                  className="flex items-center gap-2 mt-6 text-sm font-semibold w-fit transition-all hover:gap-3"
                  style={{ color: mod.accent }}>
                  See this module in action
                  <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right: live preview */}
            <div className="bg-white rounded-2xl border border-stone-100 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400">Live data preview</p>
                <span className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Real-time
                </span>
              </div>
              <ModulePreview type={mod.preview} accent={mod.accent} />
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. HOW IT WORKS ────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Eyebrow text="How It Works" />
              <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-3">
                Discovery call to go-live.
                <span className="text-orange-500"> Under 5 working days.</span>
              </h2>
              <p className="text-sm text-stone-400 font-light max-w-md mx-auto">
                No months-long implementation. No IT department takeover. No migration away from your existing systems.
              </p>
            </div>
          </Reveal>

          {/* Steps */}
          <div className="relative flex flex-col md:flex-row gap-0">
            {/* Progress line desktop */}
            <div className="hidden md:block absolute left-0 right-0 top-[44px] h-px bg-stone-100" />
            <div className="hidden md:block absolute left-0 top-[44px] h-px bg-gradient-to-r from-orange-300 to-orange-100"
              style={{ width: "80%" }} />

            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09} className="flex-1 flex flex-col">
                <div className={`flex flex-col ${i < STEPS.length-1 ? "md:pr-6" : ""} md:items-start items-start gap-0 relative pb-8 md:pb-0`}>
                  {/* Mobile connector */}
                  {i < STEPS.length-1 && (
                    <div className="absolute left-[18px] top-[40px] bottom-0 w-px bg-stone-100 md:hidden" />
                  )}

                  <div className="flex items-center gap-3 mb-4 md:flex-col md:items-start md:gap-3">
                    {/* Dot */}
                    <div className="w-9 h-9 rounded-full border-2 border-orange-400 bg-white flex items-center justify-center flex-shrink-0 z-10 shadow-sm shadow-orange-100">
                      <span className="text-[10px] font-bold text-orange-500">{s.n}</span>
                    </div>
                    {/* Phase badge */}
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600">
                      {s.phase}
                    </span>
                  </div>

                  <div className="ml-12 md:ml-0">
                    <h3 className="text-sm font-bold text-stone-900 mb-1.5">{s.title}</h3>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. INTERACTIVE DEMO TEASER ─────────────────────────────── */}
      <section className="bg-[#FAFAF9] py-24 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-center">
              <div>
                <Eyebrow text="Live Demo" />
                <h2 className="font-display text-[clamp(24px,3vw,40px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-5">
                  We demo on
                  <span className="text-orange-500"> your data.</span>
                  <br />
                  <span className="text-stone-400 font-light">Not a generic walkthrough.</span>
                </h2>
                <p className="text-sm text-stone-500 font-light leading-relaxed mb-5">
                  Before you commit to anything, we connect to a read-only snapshot of your ERP and show you - inside the demo call - what your supply chain looks like through our platform. Your SKUs. Your suppliers. Your risk profile.
                </p>
                <div className="flex flex-col gap-2 mb-8">
                  {["What's at stockout risk in the next 2 weeks","Where capital is locked in dead stock right now","Which suppliers are showing delivery risk","What an AI procurement recommendation looks like on your SKUs"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      </div>
                      <p className="text-sm text-stone-600 font-light">{item}</p>
                    </div>
                  ))}
                </div>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-md shadow-orange-200">
                  Book a demo on your data
                  <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                  </svg>
                </Link>
              </div>

              {/* Demo preview card */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 bg-stone-50 border-b border-stone-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
                  <div className="flex-1 mx-3 bg-stone-100 rounded-md h-5 flex items-center px-2">
                    <span className="text-[9px] text-stone-400">app.innovaciotech.com / your-company</span>
                  </div>
                  <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live
                  </span>
                </div>
                {/* Dashboard mockup */}
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-stone-700">Your Supply Chain · Live Overview</p>
                    <span className="text-[9px] text-stone-400">Updated: just now</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[["280","Active SKUs"],["3","Warehouses"],["91%","OTD Rate"],["₹4.3L","Dead Stock"]].map(([v,l])=>(
                      <div key={l} className="rounded-lg bg-stone-50 border border-stone-100 p-3 text-center">
                        <p className="font-mono text-base font-bold text-stone-900">{v}</p>
                        <p className="text-[9px] text-stone-400 mt-0.5">{l}</p>
                      </div>
                    ))}
                  </div>
                  {/* Alert */}
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-orange-50 border border-orange-100">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-semibold text-orange-700">AI Alert - Stockout risk detected</p>
                      <p className="text-[10px] text-orange-600 font-light mt-0.5">SKU-2041 at 12% coverage. Reorder 480 units from Supplier A by Friday to avoid production stoppage.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-semibold text-emerald-700">AI Recommendation - Transfer opportunity</p>
                      <p className="text-[10px] text-emerald-600 font-light mt-0.5">Move 320 units SKU-0887 from Delhi to Mumbai - saves ₹1.2L in markdown. Expiry in 18 days.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-100">
                    <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 text-[11px] text-indigo-500 font-bold">✦</div>
                    <p className="text-[11px] text-stone-500 italic flex-1">Ask: "Which suppliers are at delivery risk this week?"</p>
                    <span className="text-[9px] text-stone-300">→</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. DATA PRIVACY ────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center gap-10">
              <div className="flex-1">
                <Eyebrow text="Data & Privacy" />
                <h2 className="font-display text-[clamp(22px,3vw,38px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-4">
                  Your data never leaves
                  <span className="text-orange-500"> your infrastructure.</span>
                </h2>
                <p className="text-sm text-stone-500 font-light leading-relaxed max-w-sm">
                  Deployed on your servers. Read-only access. Models trained on your data only - never shared with any other client.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {[
                  { icon: "🔒", title: "Your servers, always", body: "Platform deployed on your infrastructure. No external data transmission." },
                  { icon: "👁", title: "Read-only access", body: "We read to generate intelligence. We never write or modify your systems." },
                  { icon: "🧠", title: "Your data only", body: "AI models trained exclusively on your data. Never shared with anyone." },
                  { icon: "📋", title: "Full audit trail", body: "Every access, recommendation, and action logged with timestamps." },
                ].map((p, i) => (
                  <div key={i} className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                    <div className="text-xl mb-2">{p.icon}</div>
                    <p className="text-xs font-bold text-stone-800 mb-1">{p.title}</p>
                    <p className="text-[11px] text-stone-400 font-light leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. COMPARISON TABLE ────────────────────────────────────── */}
      <section className="bg-[#FAFAF9] py-24 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <Eyebrow text="Comparison" />
              <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-3">
                Traditional ERP vs.
                <span className="text-orange-500"> our platform.</span>
              </h2>
              <p className="text-sm text-stone-400 max-w-md mx-auto font-light">
                A direct comparison on the capabilities that actually determine supply chain performance.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-stone-100 bg-white shadow-sm">
              {/* Table header */}
              <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-stone-900">
                <div className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Capability</div>
                <div className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-white/35 border-l border-white/8">Traditional Approach</div>
                <div className="px-5 py-4 border-l border-white/8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Our Platform</span>
                </div>
              </div>
              {COMPARISON.map(([cap, trad, ours], i) => (
                <div key={cap} className={`grid grid-cols-[1.4fr_1fr_1fr] border-t border-stone-50 ${i%2===0?"bg-white":"bg-stone-50/50"}`}>
                  <div className="px-5 py-4 text-xs font-semibold text-stone-700">{cap}</div>
                  <div className="px-5 py-4 text-xs text-stone-400 font-light border-l border-stone-100">{trad}</div>
                  <div className="px-5 py-4 text-xs font-semibold text-orange-600 border-l border-stone-100">{ours}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. FINAL CTA ───────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">See it on your data</span>
            </div>

            <h2 className="font-display text-[clamp(30px,4.5vw,54px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-5">
              Your supply chain.
              <span className="text-orange-500"> Your data.</span>
              <br />
              <span className="text-stone-400 font-light text-[0.85em]">30 minutes.</span>
            </h2>

            <p className="text-base text-stone-500 font-light max-w-lg mx-auto leading-relaxed mb-10">
              We connect to a read-only snapshot of your ERP and show you - during the call - what's at risk, what's locked, and what the AI would recommend. Before you commit to anything.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Link href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-100">
                Book a free demo
                <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                </svg>
              </Link>
              <Link href="/case-studies"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-stone-200 text-stone-600 hover:border-orange-200 hover:text-orange-600 text-sm font-medium transition-all">
                Read case studies
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-stone-400 mb-8">
              {["Your data stays on your servers","Live in under 4 Weeks","No ERP replacement required"].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  {t}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-stone-400 border-t border-stone-100 pt-6">
              <a href="tel:+919007271601" className="hover:text-orange-500 transition-colors">+91 90072 71601</a>
              <span>·</span>
              <a href="mailto:hello@innovaciotech.com" className="hover:text-orange-500 transition-colors">hello@innovaciotech.com</a>
              <span>·</span>
              <a href="https://innovaciotech.com" className="hover:text-orange-500 transition-colors">innovaciotech.com</a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Fade-in keyframe */}
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

    </div>
  );
}