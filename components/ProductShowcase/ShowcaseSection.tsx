"use client";

import { ArrowRight, Factory, Truck } from "lucide-react";
import Link from "next/link";
import { RefObject, MutableRefObject, useEffect, useRef, useState } from "react";
import { A, MODULES, VISUALS } from "./Components";


export function useShowcaseScroll({
  sectionRef,
  stickyRef,
  onChange,
  progressRefs,
  modulesLength,
}: {
  sectionRef: MutableRefObject<HTMLDivElement | null> | RefObject<HTMLDivElement | null>;
  stickyRef: MutableRefObject<HTMLDivElement | null> | RefObject<HTMLDivElement | null>;
  onChange: (index: number) => void;
  progressRefs: MutableRefObject<(HTMLDivElement | null)[]> | RefObject<(HTMLDivElement | null)[]>;
  modulesLength: number;
}) {
  useEffect(() => {
    let ctx: any;
    let isMounted = true;

    const init = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      if (!isMounted) return;

      gsap.registerPlugin(ScrollTrigger);

      const scrollPerModule = window.innerHeight * 2;
      const totalScroll = modulesLength * scrollPerModule;

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          id: "showcase-pin",
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalScroll}`,
          pin: stickyRef.current,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        });

        for (let i = 0; i < modulesLength; i++) {
          const start = i * scrollPerModule;
          const end = (i + 1) * scrollPerModule;

          ScrollTrigger.create({
            id: `showcase-module-${i}`,
            trigger: sectionRef.current,
            start: `top+=${start} top`,
            end: `top+=${end} top`,
            onEnter: () => onChange(i),
            onEnterBack: () => onChange(i),
          });

          ScrollTrigger.create({
            id: `showcase-progress-${i}`,
            trigger: sectionRef.current,
            start: `top+=${start} top`,
            end: `top+=${end} top`,
            onUpdate: (self) => {
              const el = progressRefs.current?.[i];
              if (el) {
                gsap.set(el, { scaleX: self.progress });
              }
            }
          });
        }

        setTimeout(() => ScrollTrigger.refresh(), 300);
      });
    };
  
    init();

    return () => {
      isMounted = false;
      try {
        if (ctx && typeof ctx.revert === "function") ctx.revert();
      } catch (e) {}

      import("gsap/ScrollTrigger")
        .then(({ ScrollTrigger }) => {
          try {
            ScrollTrigger.getAll().forEach((t) => {
              if (t.vars?.id?.includes("showcase")) t.kill();
            });
          } catch (e) {}
        })
        .catch(() => {});
    };

  }, [modulesLength])
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

  // animation timeline ref and animateIn implementation
  const animRef = useRef<any>(null);

  const animateIn = async (i: number) => {
    try {
      const { gsap } = await import("gsap");

      if (animRef.current) {
        try {
          animRef.current.kill();
        } catch (e) {}
        animRef.current = null;
      }

      const tagEl = tagRef.current;
      const numberEl = numberRef.current;
      const titleEl = titleRef.current;
      const descEl = descRef.current;
      const pointsEl = pointsRef.current;
      const visualEl = visualRef.current;

      const tl = gsap.timeline();

      tl.set([tagEl, numberEl, titleEl, descEl, pointsEl, visualEl], { clearProps: "all" });

      if (numberEl) tl.fromTo(numberEl, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, ease: "power2.out" });
      if (tagEl) tl.fromTo(tagEl, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35 }, "<");
      if (titleEl) tl.fromTo(titleEl, { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45 }, "<0.05");
      if (descEl) tl.fromTo(descEl, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.35 }, "<0.05");
      if (pointsEl) tl.fromTo(pointsEl, { y: 8, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.45, stagger: 0.06 }, "<0.05");
      if (visualEl) tl.fromTo(visualEl, { scale: 0.985, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.6, ease: "power2.out" }, "<0");

      animRef.current = tl;
    } catch (e) {
      console.error(e);
      
    }
  };


  useShowcaseScroll({
    sectionRef: sectionRef,
    stickyRef: stickyRef,
    progressRefs,
    modulesLength: MODULES.length,
    onChange: (i) => {
      setActive(i);
      animateIn(i);
    },
  });

  
  const mod = MODULES[active];
  const a   = A[mod.accent];


  return (
    <>
         <div
        ref={sectionRef}
        // style={{ height: `${MODULES.length * SCROLL_PER_MODULE}vh` }}
        className="relative"
      >
        <div
          ref={stickyRef}
          className="h-screen w-full bg-white flex flex-col overflow-hidden"
          style={{ position: "sticky", top: 0 }}
        >
          {/* ── Top header ── */}
          <div className="flex-shrink-0 pt-4 pb-4 px-8 md:px-16 border-b border-stone-100">
            <div className=" mx-auto flex flex-col gap-2">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 mb-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                  <span className="text-[10px] font-semibold text-orange-600 tracking-widest uppercase">Product</span>
                </div>
                <div className="flex items-center justify-between">

                <h2 className="font-display text-[clamp(22px,3vw,38px)] font-extrabold text-stone-900 leading-tight tracking-tight">
                  Your entire supply chain.{" "}
                  <span className="text-orange-500">Visualized & controlled.</span>
                </h2>

              <Link 
              href={"/product"}
              className=" bg-orange-500 flex items-center gap-2 group text-white text-sm px-4 py-1.5 font-semibold rounded-lg hover:bg-orange-600 transition-all ease-in-out duration-300" 
              >
                See Full product
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all duration-300" />
              </Link>
                </div>
              </div>

              <div className="w-full">

              
              {/* Module nav pills */}
              <div className="hidden md:flex items-center gap-2 flex-shrink-0">
                {MODULES.map((m, i) => (
                  <div key={m.id} className="flex flex-col items-center gap-1.5">
                    <button
                      // onClick={async () => {
                      //   const { gsap } = await import("gsap");
                      //   const { ScrollTrigger } = await import("gsap/ScrollTrigger");
                      //   gsap.registerPlugin(ScrollTrigger);
                      //   // Jump scroll to this module's position
                      //   const top = sectionRef.current!.getBoundingClientRect().top
                      //     + window.scrollY + i * window.innerHeight * 2;
                      //   window.scrollTo({ top, behavior: "smooth" });
                      // }}
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
          </div>

          {/* ── Main content ── */}
          <div className="flex-1 overflow-hidden px-8 md:px-16 py-4">
            <div className="max-w-6xl mx-auto h-full grid md:grid-cols-[1fr_1.15fr] gap-10 lg:gap-16 items-start">

              {/* Left — text */}
              <div className="flex flex-col justify-center h-full">

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