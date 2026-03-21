"use client";

import Image from "next/image";
import { INDUSTRIES } from "./data";

export default function IndustryGrid() {
  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="industries-grid" className="relative bg-[#fafaf9] py-20 px-6 md:px-12">
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: "radial-gradient(circle, #a8a29e 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold text-stone-400 uppercase tracking-[0.14em] mb-3">
            Find your industry
          </p>
          <h2 className="font-display text-[clamp(24px,3.5vw,38px)] font-extrabold text-stone-900 tracking-tight">
            Select your industry to see
            <span className="text-orange-500"> your exact use case.</span>
          </h2>
        </div>

        {/* Grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INDUSTRIES.map((ind) => {
            const a = ind.color;
            return (
              <div
                key={ind.id}
                className="group bg-white rounded-2xl border border-stone-100 overflow-hidden hover:border-stone-200 hover:shadow-xl transition-all duration-300 ease-out hover:-translate-y-1 flex flex-col"
                style={{ boxShadow: `0 2px 16px ${a.glow}` }}
              >
                {/* Image */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={ind.cardImage}
                    alt={ind.label}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  {/* Industry label on image */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{ind.emoji}</span>
                      <span className="text-white font-display font-bold text-base leading-tight">
                        {ind.label}
                      </span>
                    </div>
                  </div>

                  {/* Color top accent */}
                  <div
                    className="absolute top-0 left-0 right-0 h-[3px]"
                    style={{ background: a.hex }}
                  />
                </div>

                {/* Body */}
                <div className="flex flex-col flex-1 p-5">
                  <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-wide mb-2">
                    Key challenge
                  </p>
                  <p className="text-sm text-stone-600 font-light leading-relaxed flex-1 mb-5">
                    {ind.problem}
                  </p>

                  {/* Dual CTA */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollTo(`industry-${ind.id}`)}
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5`}
                      style={{ background: a.hex }}
                    >
                      Explore
                      <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <line x1="2" y1="5" x2="8" y2="5" /><polyline points="5.5 2.5 8 5 5.5 7.5" />
                      </svg>
                    </button>
                    <a
                      href={ind.caseHref}
                      target="_blank"
                      className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-[12px] font-semibold border transition-all duration-200 hover:-translate-y-0.5 ${a.text} ${a.bg} ${a.border}`}
                    >
                      Case study
                      <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 8L8 2M8 2H4.5M8 2V5.5" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
