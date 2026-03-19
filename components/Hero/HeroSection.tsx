"use client";

import FloatingOrbs from "@/components/ui/FloatingOrbs";
import MorphingText from "@/components/ui/MorphingText";
import { StatCard } from "@/components/ui/StatCard";
import DashboardMockup from "./DashboardMockup";
import { Play } from "lucide-react";
import FloatingCardsForHero from "../ui/FloatingCardsForHero";


const STATS = [
  { value: 35, suffix: "%", label: "forecast accuracy gain" },
  { value: 65, suffix: "%", label: "fewer stockouts" },
  { value: 307, suffix: "%", label: "ROI within 18 months" },
  { value: 80, suffix: "%", label: "reduction in manual ops" },
];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start pt-32 pb-20 px-6 md:px-12 overflow-hidden bg-white">
      {/* Floating orange orbs */}
      <FloatingOrbs />
      <FloatingCardsForHero />

      {/* Subtle noise grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Warm radial wash — very subtle */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none z-[1]"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(249,115,22,0.07) 0%, transparent 100%)",
        }}
      />

      {/* Content */}
      <div className="relative z-[2] flex flex-col items-center text-center max-w-4xl mx-auto">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-semibold mb-8 tracking-wide"
          style={{
            animation: "fadeUp 0.5s 0.1s both",
          }}
        >
          <span className="w-4 h-4 rounded-full bg-orange-500 flex items-center justify-center text-white text-[9px]">✦</span>
          AI-Powered Supply Chain Intelligence · 2026
        </div>

        {/* Headline */}
        <h1
          className="font-display text-[clamp(40px,6vw,72px)] font-extrabold leading-[1.04] tracking-[-0.03em] text-stone-900 mb-5"
          style={{ animation: "fadeUp 0.6s 0.2s both" }}
        >
          Your supply chain,
          <br />
          <span className="text-orange-500">
            <MorphingText />
          </span>
        </h1>

        {/* Sub */}
        <p
          className="text-[clamp(15px,1.8vw,18px)] text-stone-500 font-light leading-[1.75] max-w-[560px] mb-10"
          style={{ animation: "fadeUp 0.6s 0.32s both" }}
        >
          Connect your existing systems and let us do the rest {" "}
          <strong className="font-medium text-orange-500">
            Predict Demand, Eliminate Stockouts, Automate Procurement
          </strong>
          , and gain real-time visibility across every {" "}
          <strong className="font-medium text-orange-500">
            Warehouse, Order, and
            Shipment.
          </strong>
        </p>

        {/* CTAs */}
        <div
          className="flex items-center gap-3 mb-12"
          style={{ animation: "fadeUp 0.6s 0.42s both" }}
        >
          <button className="px-8 cursor-pointer py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:-translate-y-0.5 active:translate-y-0">
            Get a demo →
          </button>
          <button className="px-6 py-2.5 cursor-pointer rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/50 transition-all flex items-center gap-2.5 group">
        
              <Play 
            className="w-7 h-7 rounded-full p-1 border border-stone-200 flex items-center justify-center text-[10px] text-stone-400 group-hover:border-orange-200 group-hover:text-orange-600 transation-all  ease-in-out duration-200"/>
            See it in action
          </button>
        </div>

        {/* Stats strip */}
        <div
          className="flex items-stretch divide-x divide-stone-100 border border-stone-100 rounded-2xl bg-white/70 backdrop-blur-sm shadow-sm shadow-stone-100 mb-16 w-full max-w-2xl"
          style={{ animation: "fadeUp 0.6s 0.52s both" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex-1 relative">
              <StatCard {...s} />
              {/* subtle orange underline on hover */}
            </div>
          ))}
        </div>
      </div>

      {/* Dashboard */}
      <div
        className="relative z-[2] w-full max-w-5xl mx-auto"
        style={{ animation: "dashboardIn 0.9s 0.65s cubic-bezier(0.16,1,0.3,1) both" }}
      >
        <DashboardMockup />

        {/* Glow beneath dashboard */}
        <div
          className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-16 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse, rgba(249,115,22,0.12) 0%, transparent 70%)",
            filter: "blur(16px)",
          }}
        />
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[2] flex flex-col items-center gap-2 animate-bounce opacity-40">
        <span className="text-[10px] text-stone-400 tracking-widest uppercase">Scroll</span>
        <div className="w-4 h-4 border-r-[1.5px] border-b-[1.5px] border-stone-400 rotate-45" />
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes dashboardIn {
          from { opacity: 0; transform: translateY(32px) perspective(1000px) rotateX(5deg); }
          to   { opacity: 1; transform: translateY(0) perspective(1000px) rotateX(0deg); }
        }
      `}</style>
    </section>
  );
}
