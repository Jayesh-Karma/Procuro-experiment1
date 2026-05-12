"use client";

import gsap from "gsap";
import { useEffect, useState, useRef } from "react";

const INVENTORY_VALUES = ["94.2%", "94.7%", "95.1%", "94.8%", "95.3%"];
const STOCKOUT_VALUES = ["3", "3", "2", "3", "2"];

const ALERTS = [
  { color: "bg-orange-400", text: "Low stock: SKU-2041 · Delhi WH", time: "2m ago" },
  { color: "bg-emerald-400", text: "Auto-reorder placed: 240 units", time: "5m ago" },
  { color: "bg-red-400", text: "Overstock: SKU-0887 · Mumbai WH", time: "12m ago" },
];

const BAR_HEIGHTS = [45, 60, 50, 75, 65, 90];

function useCycle<T>(values: T[], interval: number): T {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % values.length), interval);
    return () => clearInterval(t);
  }, [values.length, interval]);
  return values[idx];
}


export default function DashboardMockup() {
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const inventory = useCycle(INVENTORY_VALUES, 4000);
  const stockouts = useCycle(STOCKOUT_VALUES, 5500);

  const dashboardRef = useRef<HTMLDivElement>(null);
const leftCardsRef = useRef<HTMLDivElement>(null);
const rightCardsRef = useRef<HTMLDivElement>(null);
const bottomRef = useRef<HTMLDivElement>(null);



useEffect(() => {
  let ctx: any;
  let mounted = true;

  (async () => {
    const { ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);

    if (!mounted) return;

    ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: dashboardRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // whole mockup fade + slight scale
      tl.from(dashboardRef.current, {
        opacity: 0,
        scale: 0.96,
        duration: 0.7,
        ease: "power3.out",
      });

      // left cards come from left
      tl.from(leftCardsRef.current?.children || [], {
        x: -40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      }, "-=0.4");

      // right cards come from right
      tl.from(rightCardsRef.current?.children || [], {
        x: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      }, "-=0.5");

      // bottom cards slightly from bottom
      tl.from(bottomRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
      }, "-=0.4");
    });
  })();

  return () => {
    mounted = false;
    try { ctx?.revert?.(); } catch (e) {}
    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      try { ScrollTrigger.getAll().forEach((t) => t.kill()); } catch (e) {}
    }).catch(() => {});
  };
}, []);



  // 3D tilt on mouse
  useEffect(() => {
    const wrap = wrapRef.current;
    const card = cardRef.current;
    if (!wrap || !card) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const rx = ((e.clientY - cy) / r.height) * 6;
      const ry = -((e.clientX - cx) / r.width) * 6;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.012)`;
    };
    const onLeave = () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    };

    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full max-w-4xl mx-auto">
      <div
        ref={(el) => {
          cardRef.current = el;
          dashboardRef.current = el;
        }}
        className="rounded-2xl border border-stone-200 bg-white shadow-2xl shadow-stone-200/60 overflow-hidden transition-transform duration-200 ease-out"
        style={{ willChange: "transform" }}
      >
        {/* Top bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-stone-50 border-b border-stone-100">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-amber-400" />
          <div className="w-3 h-3 rounded-full bg-emerald-400" />
          <span className="flex-1 text-center text-xs text-stone-600 font-normal">
            Command Center - Your Single Source of Truth
          </span>
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-500">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Live
          </span>
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4">

          {/* Inventory health */}
          <div ref={leftCardsRef} className="rounded-xl border border-stone-100 bg-stone-50/60 p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-orange-50 rounded-bl-2xl opacity-60" />
            <p className="text-[10px] font-semibold text-stone-400  md:text-stone-700 uppercase tracking-wider mb-1">
              Inventory Health
            </p>
            <p className="font-display text-2xl font-extrabold text-stone-800 leading-none transition-all duration-300">
              {inventory}
            </p>
            <p className="text-[11px] text-stone-400  md:text-stone-700 mt-0.5">Across 6 warehouses</p>
            <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              ↑ +2.1% vs last week
            </span>
            {/* Mini bars */}
            <div className="flex items-end gap-0.5 h-7 mt-3">
              {BAR_HEIGHTS.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-sm transition-all duration-500 ${i === 5 ? "bg-orange-400" : "bg-orange-100"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          {/* Stockout risk */}
          <div ref={leftCardsRef} className="rounded-xl border border-stone-100 bg-stone-50/60 p-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-16 h-16 bg-red-50 rounded-bl-2xl opacity-60" />
            <p className="text-[10px] font-semibold text-stone-400  md:text-stone-700 uppercase tracking-wider mb-1">
              Stockout Risk SKUs
            </p>
            <p className="font-display text-2xl font-extrabold text-stone-800 leading-none transition-all duration-300">
              {stockouts}
            </p>
            <p className="text-[11px] text-stone-400  md:text-stone-700 mt-0.5">of 1,284 tracked items</p>
            <span className="inline-flex items-center gap-1 mt-2 text-[10px] font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded-full">
              ↓ −18 from last month
            </span>
            <div className="flex items-end gap-0.5 h-7 mt-3">
              {[80, 65, 45, 30, 15, 8].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-red-200 transition-all duration-500"
                  style={{ height: `${h}%`, opacity: 1 - i * 0.12 }}
                />
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div ref={rightCardsRef} className="rounded-xl border border-stone-100 bg-stone-50/60 p-4">
            <p className="text-[10px] font-semibold text-stone-400  md:text-stone-700 uppercase tracking-wider mb-2.5">
              Active Alerts
            </p>
            <div className="flex flex-col gap-2">
              {ALERTS.map((a, i) => (
                <div key={i} className="flex items-center gap-2 bg-white rounded-lg px-2.5 py-2 border border-stone-100">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${a.color}`} />
                  <p className="text-[10px] text-stone-600 flex-1 leading-tight">{a.text}</p>
                  <span className="text-[9px] text-stone-300">{a.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Demand forecast — wide */}
          <div ref={rightCardsRef} className="md:col-span-2 col-span-1 rounded-xl border border-stone-100 bg-stone-50/60 p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-[10px] font-semibold text-stone-400  md:text-stone-700 uppercase tracking-wider mb-1">
                  Demand Forecast · Next 30 days
                </p>
                <p className="font-display text-lg font-bold text-stone-800 leading-tight">
                  ↑ 23% surge predicted
                </p>
                <p className="text-[11px] text-stone-400  md:text-stone-700 mt-0.5">Q4 seasonal peak · Manufacturing</p>
              </div>
              <span className="text-[10px] font-semibold text-orange-600 bg-orange-50 border border-orange-100 px-2 py-1 rounded-full">
                AI Confidence: 91%
              </span>
            </div>
            {/* SVG sparkline */}
            <svg viewBox="0 0 400 52" className="w-full h-12 mt-1" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(249,115,22,0.18)" />
                  <stop offset="100%" stopColor="rgba(249,115,22,0)" />
                </linearGradient>
              </defs>
              <path
                d="M0,48 L44,42 L88,44 L132,36 L176,30 L220,24 L264,17 L308,12 L352,8 L400,4"
                fill="url(#fg)"
                stroke="none"
              />
              <path
                d="M0,48 L44,42 L88,44 L132,36 L176,30 L220,24 L264,17 L308,12 L352,8 L400,4"
                fill="none"
                stroke="#f97316"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M264,17 L308,12 L352,8 L400,4"
                fill="none"
                stroke="#fb923c"
                strokeWidth="1.5"
                strokeDasharray="4,3"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* AI recommendation */}
          <div ref={bottomRef} className="rounded-xl border border-orange-100 bg-orange-50/40 p-4">
            <p className="text-[10px] font-semibold text-orange-500 uppercase tracking-wider mb-2">
              ✦ AI Recommendation
            </p>
            <p className="text-[11px] text-stone-600 leading-relaxed">
              Purchase{" "}
              <span className="font-semibold text-orange-600">480 units</span> of
              Raw Mat. #R-204 from{" "}
              <span className="font-semibold text-stone-800">Supplier A</span> by
              Nov 15 to avoid stockout risk.
            </p>
            <button className="mt-3 w-full text-[11px] font-semibold text-orange-600 border border-orange-200 bg-white rounded-lg py-1.5 hover:bg-orange-50 transition-colors cursor-pointer">
              ✓ Approve Recommendation
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
