"use client";

import FloatingOrbs from "@/components/ui/FloatingOrbs";
import MorphingText from "@/components/ui/MorphingText";
import { StatCard } from "@/components/ui/StatCard";
import DashboardMockup from "./DashboardMockup";
import { ArrowRight, Play, Sparkle } from "lucide-react";
import { useModal } from "@/components/Modal/ModalProvider";
import FloatingCardsForHero from "../ui/FloatingCardsForHero";
import { useRef } from "react";
import gsap from "gsap";
import ContactForm from "../calendly/ContactForm";
import SupplyChainToolsSection from "./SupplyChainToolsSection";
import ContactFormV2 from "../calendly/ContactFormV2";

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

  return (
    <section className="relative md:min-h-screen flex flex-col justify-center pt-20 md:pt-25   pb-20 px-6 md:px-12 overflow-hidden bg-white">
      {/* Floating orange orbs (hide on small screens) */}
        <FloatingOrbs />
        <FloatingCardsForHero />
        
      {/* Subtle noise grain overlay */}
      <div
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

      <div className=" relative z-[2] flex flex-col lg:flex-row items-start max-w-7xl justify-between mx-auto w-full">


      <div className="flex flex-col items-start w-full max-w-2xl">

        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 text-orange-600 text-xs font-semibold mb-8 tracking-wide"
          style={{
            animation: "fadeUp 0.5s 0.1s both",
          }}
        >
          <Sparkle className="w-4 h-4" />
          AI-Powered Supply Chain Intelligence
        </div>

        {/* Headline */}
        <h1
          className="font-display text-3xl md:text-7xl font-extrabold leading-[1.04] tracking-[-0.03em] text-stone-900 mb-5"
          style={{ animation: "fadeUp 0.8s 0.2s both" }}
        >
          Your supply chain,
          <br />
          <span className="text-orange-500 text-6xl">
            <MorphingText />
          </span>
        </h1>

        {/* Sub */}
        <p
          className="text-xs md:text-sm text-stone-500 font-light leading-[1.75] max-w-[560px]  text-justify mb-3"
          style={{ animation: "fadeUp 0.6s 0.32s both" }}
          >
          Unify your entire supply chain into one intelligent system. 
          <strong className="font-medium text-orange-500">

          </strong>
          From demand forecasting to procurement, inventory, warehouses, and logistics -
we turn your existing data into real-time insights, predictions, and automated decisions.
        </p>

       
       <ul
           className="text-xs md:text-sm text-stone-500 font-light leading-[1.75] max-w-[560px]  text-justify mb-3"
          style={{ animation: "fadeUp 0.6s 0.32s both" }}
       >
        <li className="flex items-center gap-2 hover:text-gray-900 transition-all ease-in-out duration-200">
          <ArrowRight className="" size={15} /> No need of changing Legacy/ existing system
        </li>
        <li className="flex items-center gap-2 hover:text-gray-900 transition-all ease-in-out duration-200">
          <ArrowRight className="" size={15} /> We build Custom AI layers (System) on top of exixsting / Legacy system and datalake
        </li>
        <li className="flex items-center gap-2 hover:text-gray-900 transition-all ease-in-out duration-200">
          <ArrowRight className="" size={15} /> We build custom ML Models on your proprietor  data
        </li>
        </ul>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row  items-start gap-3 mb-12 w-full justify-start"
          style={{ animation: "fadeUp 0.6s 0.42s both" }}
        >
          <button onMouseEnter={handleHover} onClick={() => modal.open("demo")} className="w-full flex items-center justify-center sm:w-auto px-8 cursor-pointer py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold shadow-lg shadow-orange-200 hover:shadow-orange-300 transition-all hover:-translate-y-0.5 active:translate-y-0">
            Get a demo <ArrowRight ref={iconRef} className="w-4 h-4 ml-2" />
          </button>
          <button className="w-full sm:w-auto px-6 py-2.5 cursor-pointer rounded-xl border border-stone-200 text-stone-600 text-sm font-medium hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50/50 transition-all flex items-center gap-2.5 justify-center group">
            <Play 
              className="w-7 h-7 rounded-full p-1 border border-stone-200 flex items-center justify-center text-[10px] text-stone-400 group-hover:border-orange-200 group-hover:text-orange-600 transation-all  ease-in-out duration-200"/>
            <span>See it in action</span>
          </button>
        </div>

        {/* Stats strip */}
        <div
          className="flex flex-col md:flex-row items-stretch divide-y md:divide-x divide-stone-100 border border-stone-200 rounded-2xl bg-white/70 backdrop-blur-sm shadow-md shadow-stone-100 mb-16 w-full max-w-2xl overflow-hidden"
          style={{ animation: "fadeUp 0.8s 0.52s both" }}
        >
          {STATS.map((s) => (
            <div key={s.label} className="flex-1 relative">
              <StatCard {...s} />
              {/* subtle orange underline on hover */}
            </div>
          ))}
        </div>
      </div>
        
      <div className="">
        {/* <ContactForm /> */}
        <ContactFormV2 />
        
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
