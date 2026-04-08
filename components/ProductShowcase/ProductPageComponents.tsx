import { useEffect, useRef, useState } from "react";

export function useInView(t = 0.08) {
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

export function Reveal({ children, delay = 0, className = "" }: {
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
export function Eyebrow({ text }: { text: string }) {
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
export const MODULES = [
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
export function ModulePreview({ type, accent }: { type: string; accent: string }) {
  const previewStyle = "rounded-xl border border-stone-100 bg-white p-4 shadow-sm";
  const rowStyle = "flex flex-col sm:flex-row items-start sm:items-center gap-3 py-2 border-b border-stone-50 last:border-0 text-sm";

  const previews: Record<string, React.ReactNode> = {
    command: (
      <div className="flex flex-col gap-3">
        {/* KPI row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[["↓30%", "Stockouts", "vs last quarter"], ["↑91%", "OTD Rate", "last 30 days"], ["₹4.3L", "Dead Stock", "flagged today"]].map(([v, l, s]) => (
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
          {[["SKU-2041 · Alphonso Pulp", "California", "342 units", "⚠ 18 days"],
          ["SKU-0887 · Mango Drink", "Texas", "0 units", "✕ Out"],
          ["SKU-3312 · Fruit Mix", "Great Lakes States", "1,240 units", "✓ OK"]].map(([n, l, q, s]) => (
              <div key={n} className={rowStyle}>
              <span className="flex-1 text-[11px] text-stone-600 font-medium truncate">{n}</span>
              <span className="text-[10px] text-stone-400 sm:w-16 w-auto text-right">{l}</span>
              <span className="text-[10px] font-mono text-stone-500 sm:w-16 w-auto text-right">{q}</span>
              <span className={`text-[10px] font-semibold sm:w-14 w-auto text-right ${s.startsWith("⚠") ? "text-amber-500" : s.startsWith("✕") ? "text-red-500" : "text-emerald-600"}`}>{s}</span>
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
            {[55, 68, 52, 85, 78, 92, 66, 84].map((h, i) => (
              <div key={i} title={`Week ${i + 1}`} className="flex-1 rounded-sm transition-all duration-300 cursor-pointer hover:opacity-80"
                style={{ height: `${h}%`, background: i === 5 ? accent : `${accent}35` }} />
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"].map(w => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[["Dead Stock", "₹4.3L", "8 SKUs · 60+ day zero-move", "red"], ["FEFO Status", "100%", "0 violations today", "green"]].map(([l, v, s, c]) => (
            <div key={l} className={`rounded-lg border p-3 ${c === "red" ? "bg-red-50 border-red-100" : "bg-emerald-50 border-emerald-100"}`}>
              <p className="text-[10px] font-semibold text-stone-500 mb-1">{l}</p>
              <p className="font-mono text-xl font-bold leading-none" style={{ color: c === "red" ? "#ef4444" : "#10b981" }}>{v}</p>
              <p className="text-[9px] text-stone-400 mt-1">{s}</p>
            </div>
          ))}
        </div>
        <div className={previewStyle}>
          <p className="text-[11px] font-bold text-stone-600 mb-2">Transfer Recommendations</p>
          {[["SKU-0887", "California → Texas", "320 units", "Expiry risk"],
          ["SKU-3312", "Great Lakes States → New York.", "150 units", "Demand gap"]].map(([s, r, q, reason]) => (
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
          {[["#B-4421", "Alphonso Pulp", "Exp Nov 15", "Transfer due"],
          ["#B-4390", "Mango Pulp", "Exp Dec 02", "On shelf"],
          ["#B-4302", "Fruit Mix", "Exp Jan 18", "On shelf"]].map(([b, p, e, s]) => (
            <div key={b} className={rowStyle}>
              <span className="text-[10px] font-mono text-stone-400">{b}</span>
              <span className="flex-1 text-[11px] text-stone-600">{p}</span>
              <span className="text-[10px] text-stone-400">{e}</span>
              <span className={`text-[9px] font-semibold ${s === "Transfer due" ? "text-amber-500" : "text-emerald-600"}`}>{s}</span>
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {[["94%", "OTIF Rate", "↑6% vs last month"], ["12", "Late Orders", "↓4 vs last month"], ["₹2.4Cr", "In-Transit", "On schedule"]].map(([v, l, s]) => (
            <div key={l} className="rounded-lg border border-stone-100 bg-stone-50 p-3 text-center">
              <p className="font-mono text-lg font-bold leading-none" style={{ color: accent }}>{v}</p>
              <p className="text-[10px] font-semibold text-stone-600 mt-1">{l}</p>
              <p className="text-[9px] text-stone-400 mt-0.5">{s}</p>
            </div>
          ))}
        </div>
        <div className={previewStyle}>
          <p className="text-[11px] font-bold text-stone-600 mb-2">Active Orders</p>
          {[["PO-4421", "Supplier A", "Due today", "At risk"],
          ["PO-4390", "Supplier B", "Due +3 days", "On track"],
          ["SO-2201", "Customer C", "Dispatched", "In transit"]].map(([id, party, due, status]) => (
            <div key={id} className={rowStyle}>
              <span className="text-[10px] font-mono text-stone-400">{id}</span>
              <span className="flex-1 text-[11px] text-stone-600">{party}</span>
              <span className="text-[10px] text-stone-400">{due}</span>
              <span className={`text-[10px] font-semibold ${status === "At risk" ? "text-red-500" : status === "On track" ? "text-emerald-600" : "text-amber-500"}`}>{status}</span>
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
            { user: true, text: "Which SKUs are expiring in the next 30 days?" },
            { user: false, text: "8 batches across 3 warehouses. Largest: Batch #B-4421 (SKU-2041, 340 units, California WH) - expires Nov 15. Transfer to Texas recommended." },
            { user: true, text: "How much capital is locked in dead stock?" },
            { user: false, text: "₹4.3L across 8 SKUs - zero movement 60+ days. Highest: SKU-0887 (₹1.8L). Markdown plan available, estimated ₹3.2L recovery." },
          ].map((m, i) => (
            <div key={i} className={`flex ${m.user ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[88%] rounded-xl px-3 py-2 text-[11px] leading-relaxed ${m.user
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
export const INTEGRATIONS = [
  // ERP
  { name: "SAP", cat: "ERP" },
  { name: "Oracle", cat: "ERP" },
  { name: "MS Dynamics", cat: "ERP" },
  { name: "Tally Prime", cat: "ERP" },
  { name: "NetSuite", cat: "ERP" },
  { name: "Odoo", cat: "ERP" },
  { name: "Infor", cat: "ERP" },
  { name: "Epicor", cat: "ERP" },

  // E-commerce
  { name: "Shopify", cat: "E-commerce" },
  { name: "WooCommerce", cat: "E-commerce" },
  { name: "Magento", cat: "E-commerce" },
  { name: "BigCommerce", cat: "E-commerce" },

  { name: "eBay", cat: "Marketplace" },
  { name: "Etsy", cat: "Marketplace" },

  // CRM
  { name: "Salesforce", cat: "CRM" },
  { name: "HubSpot", cat: "CRM" },
  { name: "Zoho CRM", cat: "CRM" },
  { name: "Freshsales", cat: "CRM" },

  // Accounting
  { name: "QuickBooks", cat: "Accounting" },
  { name: "Xero", cat: "Accounting" },
  { name: "Zoho Books", cat: "Accounting" },

  // Database
  { name: "PostgreSQL", cat: "Database" },
  { name: "MySQL", cat: "Database" },
  { name: "MongoDB", cat: "Database" },
  { name: "Microsoft SQL Server", cat: "Database" },
  { name: "Oracle DB", cat: "Database" },


  // Cloud / Storage
  { name: "AWS", cat: "Cloud" },
  { name: "Google Cloud", cat: "Cloud" },
  { name: "Azure", cat: "Cloud" },

  // Pharma / LIMS
  { name: "LabWare LIMS", cat: "Pharma" },
  { name: "STARLIMS", cat: "Pharma" },

  // Flat Files / Custom
  { name: "CSV / Excel", cat: "Flat Files" },
  { name: "REST APIs", cat: "Custom" },
  { name: "SOAP APIs", cat: "Custom" }
];
// ═══════════════════════════════════════════════════════════════════
// HOW IT WORKS
// ═══════════════════════════════════════════════════════════════════
export const STEPS = [
  { n: "01", phase: "Day 0", title: "Discovery Call", body: "30 minutes. We understand your operations, existing systems, top pain points, and what success looks like for your team." },
  { n: "02", phase: "Week 1", title: "Map Your Operation", body: "We map your supply chain flows, data sources, integration points, and seasonal patterns. Zero disruption to running operations." },
  { n: "03", phase: "Week 2", title: "Connect Your Systems", body: "Read-only API or database connectors to your ERP, WMS, and other sources. Your data never leaves your infrastructure." },
  { n: "04", phase: "Week 3", title: "Configure & Deploy", body: "Platform configured to your workflows, SKU structure, and compliance requirements. Deployed on your servers or private cloud." },
  { n: "05", phase: "Ongoing", title: "Optimise with AI", body: "2-hour team walkthrough. AI models improve each data cycle. Monthly review sessions. You own the data and the results." },
];

// ═══════════════════════════════════════════════════════════════════
// COMPARISON
// ═══════════════════════════════════════════════════════════════════
export const COMPARISON = [
  ["Replace your ERP?", "Usually required - months of migration", "Never. Connects to what you already have."],
  ["Demand forecasting", "Category averages or manual", "Per-SKU ML model trained on your data"],
  ["Multi-channel inventory sync", "Manual daily reconciliation", "Real-time unified sync - all channels"],
  ["Dead stock detection", "Manual reports, monthly at best", "AI-flagged daily with exact capital value"],
  ["Batch & lot traceability", "Manual or basic ERP module", "Automated end-to-end with CoA linkage"],
  ["AI chatbot on live data", "Not available", "Natural language queries - live answers"],
  ["Seasonal AI planning", "Last year's actuals, manual process", "AI seasonal model per SKU, 6–8 wks ahead"],
  ["Supplier risk monitoring", "Periodic manual review", "Continuous - OTD, lead time, risk scored"],
  ["Data stays on your servers", "Varies - often SaaS hosted externally", "Always. Zero external data transmission."],
  ["Time to go-live", "3–12 months typical", "Under 4 Weeks standard"],
  ["ROI timeline", "12–18 months typical", "Positive ROI within 6 months typical"],
];
