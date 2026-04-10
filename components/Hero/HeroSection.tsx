"use client";

import FloatingOrbs from "@/components/ui/FloatingOrbs";
import MorphingText from "@/components/ui/MorphingText";
import { StatCard } from "@/components/ui/StatCard";
import DashboardMockup from "./DashboardMockup";
import { ArrowRight, Play, Sparkle, Star } from "lucide-react";
import { useModal } from "@/components/Modal/ModalProvider";
import FloatingCardsForHero from "../ui/FloatingCardsForHero";
import { useRef } from "react";
import gsap from "gsap";
import ContactForm from "../calendly/ContactForm";
import SupplyChainToolsSection from "./SupplyChainToolsSection";
import ContactFormV2 from "../calendly/ContactFormV2";
import HorizontalContactForm from "../calendly/HorizontalContactForm";
import Link from "next/link";

const STATS = [
  { value: 35, suffix: "%", label: "forecast accuracy gain" },
  { value: 65, suffix: "%", label: "fewer stockouts" },
  { value: 307, suffix: "%", label: "ROI within 18 months" },
  { value: 80, suffix: "%", label: "reduction in manual ops" },
];


export default function HeroSection() {



  const iconRef = useRef(null);
  const handleHover = () => {
    const el = iconRef.current;

    gsap.timeline()
      .to(el, {
        x: 8,
        opacity: 0,
        duration: 0.30,
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
  const modal = useModal();

  const svg = `
<svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
  <filter id="n">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch"/>
  </filter>
  <rect width="100%" height="100%" filter="url(#n)"/>
</svg>
`;


const encoded = btoa(svg);

  return (
    <section className="relative md:min-h-screen flex flex-col justify-center pt-20 md:pt-25   pb-20 px-6 md:px-12 overflow-hidden bg-white">
      {/* Floating orange orbs (hide on small screens) */}
      <FloatingOrbs />
      <FloatingCardsForHero />

      {/* Subtle noise grain overlay */}
<div
  style={{
    backgroundImage: `url("data:image/svg+xml;base64,${encoded}")`,
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

   <div className="min-h-screen flex items-center justify-center px-4">
  <div className="relative z-[2] flex flex-col items-center justify-center max-w-6xl mx-auto w-full text-center">

    <div className="flex flex-col items-center justify-center w-full max-w-5xl">

      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-semibold mb-2 tracking-wide">
        <Sparkle className="w-4 h-4" />
        AI-Powered Supply Chain Intelligence
      </div>

      {/* Headline */}
      <h1 className="font-display text-center text-4xl md:text-7xl font-extrabold leading-[1.04] tracking-[-0.03em] text-stone-900 mb-6">
        Your supply chain,
        <br />
        <span className="text-orange-500 text-4xl whitespace-nowrap md:text-7xl">
          <MorphingText />
        </span>
      </h1>

      {/* Sub */}
      <p className="text-xs md:text-sm max-w-4xl font-medium font-space text-stone-800 leading-[1.75] mb-5">
        Unify your entire supply chain into one intelligent system.
        From demand forecasting to procurement, inventory, warehouses, and logistics -
        we turn your existing data into real-time insights, predictions, and automated decisions.
      </p>

      {/* List */}
      <ul className="text-xs select-none font-space flex flex-col md:flex-row items-start md:items-center gap-1 md:gap-5  md:text-sm text-stone-800 font-medium mb-8">
        <li className="flex items-center hover:translate-x-1 transition-all duration-300 hover:text-black justify-center gap-2">
          <ArrowRight size={15} /> 
          No need of changing Legacy system
        </li>
        <li className="flex items-center justify-center gap-2 hover:translate-x-1 transition-all duration-300 hover:text-black">
          <ArrowRight size={15} /> Custom AI layer on top of existing systems
        </li>
        <li className="flex items-center justify-center gap-2 hover:translate-x-1 transition-all duration-300 hover:text-black">
          <ArrowRight size={15} /> Custom ML models on your data
        </li>
      </ul>

      {/* CTA */}
      <div className="flex font-space flex-col sm:flex-row items-center justify-center gap-3 mb-14 w-full">
        <Link 
          href={"/book-demo"}
          className="w-full sm:w-auto  px-8 py-3.5 rounded-xl group bg-orange-500 hover:bg-orange-600 transition-all ease-in-out duration-300 text-white text-sm font-semibold flex items-center justify-center gap-2">
          Get a demo <ArrowRight className="-rotate-45 group-hover:rotate-0 transition-all ease-in-out duration-300" />
        </Link>
        <Link href={"/contact"} className="w-full sm:w-auto px-6 py-2.5 hover:shadow-sm transition-all ease-in-out duration-300 group rounded-xl border border-stone-200 text-stone-600 text-sm font-medium flex items-center gap-2 justify-center">
          See it in action
          <Play className="w-6 h-6 group-hover:translate-x-1 transition-all ease-in-out duration-300" />
        </Link>
      </div>

      {/* Stats */}
      {/* 
        {STATS.map((s) => (
          <div key={s.label} className="flex-1">
          <StatCard {...s} />
          </div>
          ))}
          </div> */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl border border-stone-200 rounded-2xl overflow-hidden mb-16">
      <HorizontalContactForm />
    </div>
    
    </div>

    {/* Form */}

  </div>
</div>


      <SupplyChainToolsSection />



      <div
        className="relative z-[2] my-10 w-full max-w-5xl mx-auto"
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
