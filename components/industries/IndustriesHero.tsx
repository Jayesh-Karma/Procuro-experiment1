"use client";

import { useEffect, useState } from "react";
import { useModal } from "@/components/Modal/ModalProvider";
import FloatingOrbs from "../ui/FloatingOrbs";
import { ArrowRight, Car, Factory, Hamburger, Pill, ShoppingCart } from "lucide-react";

export default function IndustriesHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);
  const modal = useModal();

  const stats = [
    { value: "5+",    label: "Industries served"         },
    { value: "< 5d",  label: "Average time to go-live"   },
    { value: "307%",  label: "Average 18-month ROI"       },
    { value: "91%",   label: "AI forecast accuracy"       },
  ];

  return (
    <section className="relative bg-white min-h-[72vh] flex flex-col items-center justify-center pt-28 pb-16 px-6 md:px-12 overflow-hidden">
      <FloatingOrbs />
      {/* Warm orange radial wash */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 100%)" }} />

      {/* Subtle dot grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{ backgroundImage: "radial-gradient(circle, #a8a29e 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

      {/* Faint grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(rgba(120,113,108,1) 1px,transparent 1px),linear-gradient(90deg,rgba(120,113,108,1) 1px,transparent 1px)",
          backgroundSize: "80px 80px",
        }} />

      <div
        className="relative z-10 max-w-3xl mx-auto text-center"
        style={{
          opacity:   mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          <span className="text-xs font-semibold text-orange-600 tracking-widest uppercase">Industries</span>
        </div>

        {/* Headline */}
        <h1 className="font-display text-[clamp(32px,5vw,60px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-5">
          AI in supply chains
          <br />
          <span className="text-orange-500">for every industry.</span>
        </h1>

        {/* Sub */}
        <p className="text-base md:text-lg text-stone-600 font-light leading-relaxed max-w-2xl mx-auto mb-10">
          From manufacturing to retail, we solve industry-specific supply chain challenges
          with data-driven intelligence, real-time visibility, and AI built on your data.
        </p>

        {/* CTAs */}
        <div className="flex items-center justify-center gap-3 mb-14">
          <button onClick={() => modal.open("demo")} className="px-7 py-3.5 flex items-center gap-2 cursor-pointer rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:-translate-y-0.5">
            Book a demo <ArrowRight className="w-4 h-4" />
          </button>
          <a href="#industries-grid"
            className="px-6 py-3.5 rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:border-orange-200 hover:text-orange-600 transition-all">
            Explore industries ↓
          </a>
        </div>

        {/* Stat strip */}
        <div className="flex items-stretch divide-x divide-stone-100 border border-stone-100 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm max-w-2xl mx-auto">
          {stats.map((s) => (
            <div key={s.label} className="flex-1 px-5 py-4 text-center">
              <p className="font-display text-2xl font-extrabold text-orange-500 leading-none">{s.value}</p>
              <p className="text-[10px] text-stone-400 mt-1.5 tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Industry emoji strip */}
      <div
        className="relative z-10 flex items-center justify-center gap-6 mt-12"
        style={{
          opacity:   mounted ? 1 : 0,
          transition: "opacity 0.7s 0.3s ease-out",
        }}
      >
        {[
          { e: <Factory className="text-orange-500" />, l: "Manufacturing" },
          { e:  <ShoppingCart className="text-indigo-500" />, l: "Retail" },
          { e: <Pill className="text-violet-500" />, l: "Pharma" },
          { e: <Hamburger className="text-green-500" />, l: "Food & Bev" },
          { e: <Car className="text-blue-500" />, l: "Automotive" },
        ].map((ind) => (
          <div key={ind.l} className="flex flex-col items-center gap-1.5 group cursor-default">
            <div className="w-12 h-12 rounded-2xl bg-stone-50 border border-stone-100 flex items-center justify-center text-2xl group-hover:border-orange-200 group-hover:bg-orange-50 transition-all duration-200 group-hover:scale-110">
              {ind.e}
            </div>
            <span className="text-[10px] text-stone-400 font-medium group-hover:text-orange-500 transition-colors">{ind.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
