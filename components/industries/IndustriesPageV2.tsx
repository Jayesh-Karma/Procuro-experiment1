"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { INDUSTRIES, type Industry, type SubIndustry } from "./industries-data";
import DownloadModal from "../case-study/DownloadModal";

// ─── GSAP dynamic import ─────────────────────────────────────────────────────
async function gsap() {
  const g = await import("gsap");
  const { ScrollTrigger } = await import("gsap/ScrollTrigger");
  g.default.registerPlugin(ScrollTrigger);
  return { gsap: g.default, ScrollTrigger };
}

// ─── Utility ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

// ─── Sub-industry panel (slide-in drawer) ────────────────────────────────────
function SubIndustryCard({
  sub,
  accentHex,
  index,
  openModal,
  selectCaseStudy
}: {
  sub: SubIndustry;
  accentHex: string;
  index: number;
  openModal: (boolen: boolean) => void;
  selectCaseStudy: (slug: string) => void;
}) {
  const [hovered, setHovered] = useState(false);


  return (
    <div
      className="group relative shadow-sm hover:shadow-black/40 overflow-hidden rounded-xl border border-black/10 bg-black/[0.03] flex flex-col transition-all duration-500 h-full"
      style={{
        opacity: 1,
        transitionDelay: `${index * 60}ms`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-32 sm:h-36 md:h-36 overflow-hidden">
        <Image
          src={sub.image}
          alt={sub.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="400px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/30 to-transparent" />
        {/* Accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-300"
          style={{ background: accentHex, opacity: hovered ? 1 : 0.4 }}
        />
        <div
          className="absolute bottom-3 left-3 flex items-center gap-2 px-2.5 py-1.5 rounded-lg backdrop-blur-sm border border-white/10 bg-black/50"
        >
          <span className="font-mono text-base font-bold leading-none" style={{ color: accentHex }}>
            {sub.stat.value}
          </span>
          <span className="text-[10px] text-white/50 leading-tight">{sub.stat.label}</span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <h4 className="text-sm font-semibold text-black/90 mb-1 leading-snug">{sub.title}</h4>
          <p className="text-[11px] text-black/90 leading-relaxed font-light italic">
            "{sub.problem}"
          </p>
        </div>

        {/* Pain → Solution pairs */}
        <div className="flex flex-col gap-2 flex-1">
          {sub.painSolutions.map((ps, i) => (
            <div key={i} className="flex flex-col gap-0.5">
              <div className="flex items-start gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <div className="w-1 h-1 rounded-full bg-red-400" />
                </div>
                <p className="text-[11px] text-black/30 leading-snug">{ps.pain}</p>
              </div>
              <div className="flex items-start gap-1.5 ml-0">
                <div
                  className="w-3 h-3 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border"
                  style={{ background: `${accentHex}20`, borderColor: `${accentHex}50` }}
                >
                  <div className="w-1 h-1 rounded-full" style={{ background: accentHex }} />
                </div>
                <p className="text-[11px] text-black/80 leading-snug">{ps.solution}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href={`/case-studies/${sub?.caseStudySlug}`}
          
          className="flex items-center gap-1.5 text-[12px] font-semibold mt-1 group/link w-fit transition-all duration-200"
          style={{ color: accentHex }}
        >
          View Case Study
          <svg
            viewBox="0 0 10 10" fill="none"
            className="w-3 h-3 transition-transform duration-200 group-hover/link:translate-x-0.5"
            stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M2 8L8 2M8 2H4.5M8 2V5.5" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

// ─── Industry hero block (the big asymmetric industry card) ──────────────────
function IndustryBlock({
  industry,
  index,
  isActive,
  onActivate,
  openModal,
  selectCaseStudy
}: {
  industry: Industry;
  index: number;
  isActive: boolean;
  openModal: () => void;
  selectCaseStudy: (slug: any) => void;
  onActivate: (id: string | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);


  // Parallax on image
  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      if (!hovered) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 8;
      el.style.transform = `scale(1.08) translate(${x}px, ${y}px)`;
    };
    const onLeave = () => {
      el.style.transform = "scale(1.05) translate(0,0)";
    };
    const parent = ref.current;
    parent?.addEventListener("mousemove", onMove);
    parent?.addEventListener("mouseleave", onLeave);
    return () => {
      parent?.removeEventListener("mousemove", onMove);
      parent?.removeEventListener("mouseleave", onLeave);
    };
  }, [hovered]);

  // Different layout for even/odd
  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={() => onActivate(isActive ? null : industry.id)}
        className="relative z-0 w-full text-left group overflow-hidden rounded-2xl cursor-pointer focus:outline-none h-44 sm:h-52 md:h-[28vw] lg:h-[340px]"
      >
        {/* Background image */}
        <div ref={imgRef} className="absolute inset-0 transition-transform duration-700 z-0 pointer-events-none" style={{ transform: "scale(1.05)" }}>
          <Image
            src={industry.image}
            alt={industry.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={index < 2}
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at ${isEven ? "30% 70%" : "70% 70%"}, ${industry.accentHex}30 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Top accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] transition-all duration-300"
          style={{ background: industry.accentHex, opacity: isActive ? 1 : 0.5 }}
        />

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
          {/* Industry label */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className="text-[10px] font-bold uppercase tracking-[0.18em]"
              style={{ color: industry.accentHex }}
            >
              {industry.short}
            </span>
            <div className="h-px flex-1 max-w-8" style={{ background: `${industry.accentHex}50` }} />
          </div>

          <h2 className="font-display text-[clamp(24px,3vw,42px)] font-extrabold text-white leading-none tracking-tight mb-2">
            {industry.title}
          </h2>

          <p className="text-sm text-white/85 font-light max-w-sm leading-relaxed mb-4 line-clamp-2">
            {industry.description}
          </p>

          <div className="flex items-center justify-between">
            {/* Stat */}
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-bold" style={{ color: industry.accentHex }}>
                {industry.stat.value}
              </span>
              <span className="text-xs text-white/60">{industry.stat.label}</span>
            </div>

            {/* Toggle */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 text-xs font-medium"
              style={{
                background: isActive ? `${industry.accentHex}20` : "rgba(255,255,255,0.05)",
                borderColor: isActive ? `${industry.accentHex}60` : "rgba(255,255,255,0.1)",
                color: isActive ? industry.accentHex : "rgba(255,255,255,0.6)",
              }}
            >
              {isActive ? "Hide sub-industries" : `${industry.subIndustries.length} sub-industries`}
              <svg
                viewBox="0 0 12 12" fill="none" className="w-3 h-3 transition-transform duration-300"
                style={{ transform: isActive ? "rotate(180deg)" : "rotate(0deg)" }}
                stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
              >
                <polyline points="2 4 6 8 10 4" />
              </svg>
            </div>
          </div>
        </div>
      </button>

      {/* Sub-industry expansion panel */}
      <div
        className="overflow-hidden transition-all duration-500 ease-in-out relative z-10"
        style={{
          maxHeight: isActive ? "2000px" : "0px",
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="pt-5 pb-2">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ background: `${industry.accentHex}30` }} />
            <span className="text-[10px] font-semibold uppercase tracking-widest text-black/30">
              {industry.title} - Sub-industries
            </span>
            <div className="h-px flex-1" style={{ background: `${industry.accentHex}30` }} />
          </div>

          {/* Sub-industry grid - intentionally non-uniform widths */}
          <div
            className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 h-full items-stretch"
          >
            {industry.subIndustries.map((sub, i) => (
              <SubIndustryCard
                key={sub.id}
                sub={sub}
                accentHex={industry.accentHex}
                openModal={openModal}
                selectCaseStudy={selectCaseStudy}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Floating industry indicator (stays visible while scrolling) ─────────────
function IndustryNav({
  industries,
  activeId,
  onSelect,
}: {
  industries: Industry[];
  activeId: string | null;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="hidden xl:flex flex-col gap-1 fixed left-8 top-1/2 -translate-y-1/2 z-40">
      {industries.map((ind) => (
        <button
          key={ind.id}
          onClick={() => onSelect(activeId === ind.id ? null : ind.id)}
          className="group flex items-center gap-3 py-1.5 text-left transition-all duration-200"
        >
          <div
            className="w-1 rounded-full transition-all duration-300"
            style={{
              height: activeId === ind.id ? "24px" : "8px",
              background: activeId === ind.id ? ind.accentHex : "rgba(255,255,255,0.15)",
            }}
          />
          <span
            className="text-[10px] font-medium uppercase tracking-widest transition-all duration-200 opacity-0 group-hover:opacity-100"
            style={{ color: activeId === ind.id ? ind.accentHex : "rgba(255,255,255,0.4)" }}
          >
            {ind.title}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Page Hero ────────────────────────────────────────────────────────────────
function PageHero() {
  const { ref, vis } = useInView(0.1);

  return (
    <div ref={ref} className="mb-20 md:mb-28">
      <div
        className="transition-all duration-700"
        style={{
          opacity: vis ? 1 : 0,
          transform: vis ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-px w-10 bg-orange-500/60" />
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
            Industries
          </span>
        </div>

        {/* Headline - deliberately broken across lines for rhythm */}
        <h1 className="font-display text-[clamp(36px,5.5vw,72px)] font-extrabold text-black leading-[1.0] tracking-tight mb-6">
          Built for your
          <br />
          <span className="text-black/30">specific</span> industry.
          <br />
          <span className="text-orange-500">Your</span> problems.
        </h1>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 max-w-4xl">
          <p className="text-base text-black/95 font-light leading-relaxed max-w-lg">
            Generic supply chain software creates generic results. We build on top of them, with a unified dashboard and build AI models
            trained on your industry's specific demand patterns, compliance requirements,
            and operational constraints - so the intelligence is relevant from day one.
          </p>

          {/* Aggregate stats - not symmetrical */}
          <div className="flex items-center gap-6 flex-shrink-0">
            <div>
              <p className="font-mono text-3xl font-bold text-orange-400 leading-none">5+</p>
              <p className="text-[10px] text-black/35 mt-1">Industries</p>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div>
              <p className="font-mono text-3xl font-bold text-black/80 leading-none">20+</p>
              <p className="text-[10px] text-black/35 mt-1">Sub-industries</p>
            </div>
            <div className="w-px h-8 bg-black/10" />
            <div>
              <p className="font-mono text-3xl font-bold text-black/80 leading-none">307%</p>
              <p className="text-[10px] text-black/35 mt-1">Avg 18mo ROI</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function IndustriesPageV2() {
  const [activeIndustry, setActiveIndustry] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | undefined>(undefined);


  console.log("MODAL OPEN", modalOpen, selectedCaseStudy);

  // GSAP scroll reveals
  useEffect(() => {
    let cleanup: (() => void) | undefined;
    gsap().then(({ gsap: g, ScrollTrigger }) => {
      const ctx = g.context(() => {
        g.utils.toArray<HTMLElement>("[data-reveal]").forEach((el, i) => {
          g.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1, y: 0, duration: 0.7, delay: i * 0.04,
              ease: "power2.out",
              scrollTrigger: { trigger: el, start: "top 88%", toggleActions: "play none none none" },
            }
          );
        });

        // Subtle grain texture on scroll
        ScrollTrigger.refresh();
      });

      cleanup = () => ctx.revert();
    });
    return () => cleanup?.();
  }, []);

  const handleActivate = useCallback((id: string | null) => {
    setActiveIndustry(id);
    if (id) {
      setTimeout(() => {
        sectionRefs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen  bg-white relative">

      {/* Ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(249,115,22,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0 opacity-[0.2]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Floating side nav */}
      {/* <IndustryNav
        industries={INDUSTRIES}
        activeId={activeIndustry}
        onSelect={handleActivate}
      /> */}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl px-6 mx-auto  pt-32 pb-32">
        <PageHero />

        {/* Industries - asymmetric layout */}
        <div className="flex flex-col gap-6 justify-between">
          {INDUSTRIES.map((industry, index) => (
            <div
              key={industry.id}
              ref={(el) => { sectionRefs.current[industry.id] = el; }}
              data-reveal
            >
              <IndustryBlock
                industry={industry}
                selectCaseStudy={(slug: any) => setSelectedCaseStudy(slug)}
                openModal={() => setModalOpen(true)}
                index={index}
                isActive={activeIndustry === industry.id}
                onActivate={handleActivate}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          data-reveal
          className="mt-24 relative overflow-hidden rounded-2xl border border-white/5 p-10 md:p-14"
          style={{
            background:
              "linear-gradient(135deg, rgba(249,115,22,0.08) 0%, rgba(8,8,8,0) 50%, rgba(99,102,241,0.05) 100%)",
          }}
        >
          <div className="absolute inset-0 border border-orange-500/10 rounded-2xl pointer-events-none" />
          <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-lg">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                Don't see your sub-industry?
              </p>
              <h3 className="font-display text-[clamp(22px,3vw,36px)] font-extrabold text-black leading-tight tracking-tight mb-3">
                We configure to your
                <span className="text-orange-500"> specific operation.</span>
              </h3>
              <p className="text-sm text-black/80 font-light leading-relaxed">
                Every deployment is scoped to your exact workflows, data structure, and
                compliance requirements - not a generic template mapped to your business.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link
                href="/contact"
                className="group flex items-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-orange-500/20"
              >
                Book a discovery call
                <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                </svg>
              </Link>
              <Link
                href="/case-studies"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl border border-black/10 text-black/70 hover:text-black hover:border-black/20 text-sm font-medium transition-all duration-200"
              >
                Browse all case studies
              </Link>
            </div>
          </div>
        </div>

        {/* Contact strip */}
        <div className="mt-8 flex items-center justify-center gap-6 text-xs text-black/50">
          <a target="_blank" href="tel:+919007271601" className="hover:text-orange-400 transition-colors">+91 90072 71601</a>
          <span>·</span>
          <a target="_blank" href="mailto:hello@innovaciotech.com" className="hover:text-orange-400 transition-colors">hello@innovaciotech.com</a>
          <span>·</span>
          <a target="_blank" href="https://innovaciotech.com" className="hover:text-orange-400 transition-colors">innovaciotech.com</a>
        </div>
      </div>
            {
              modalOpen && <div className="mx-auto">
                <DownloadModal
                    onClose={()=> setModalOpen(false)} 
                    selectedCasestudy={selectedCaseStudy} 
                />
              </div> 
            }
    </div>
  );
}
