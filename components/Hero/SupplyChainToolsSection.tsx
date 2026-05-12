"use client";

import { useEffect, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// PAIN POINTS SECTION
// Mirrors the "Too Many Supply Chain Tools" screenshot layout exactly:
//   Left col tall card (radar) | Center col 2 stacked | Right col 2 stacked
// ═══════════════════════════════════════════════════════════════════════════════
export default function SupplyChainToolsSection() {
  const sectionRef = useRef<any>(null);
  const headRef    = useRef<any>(null);
  const gridRef    = useRef<any>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;
    (async () => {
      const gsapMod = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      const gsap = gsapMod.default;
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {

        // ── Header fade-up ─────────────────────────────────────────────────
        gsap.fromTo(headRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: headRef.current, start: "top 88%" } });

        // ── Cards stagger in ───────────────────────────────────────────────
        gsap.fromTo(
          gridRef.current?.querySelectorAll(".pain-card"),
          { opacity: 0, y: 36, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1,
            duration: 0.6, ease: "power2.out", stagger: 0.1,
            scrollTrigger: { trigger: gridRef.current, start: "top 80%" } }
        );

        // ── Radar rings expand ─────────────────────────────────────────────
        gsap.fromTo(
          sectionRef.current?.querySelectorAll(".rring"),
          { scale: 0.3, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.7, ease: "back.out(1.5)",
            stagger: 0.07,
            scrollTrigger: { trigger: sectionRef.current?.querySelector('.card-radar'), start: "top 82%" } }
        );

        // ── Orbit nodes pop ────────────────────────────────────────────────
        gsap.fromTo(
          sectionRef.current?.querySelectorAll(".orbit-node"),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)",
            stagger: 0.08,
            scrollTrigger: { trigger: sectionRef.current?.querySelector('.card-radar'), start: "top 78%" } }
        );

        // ── Flow paths draw ────────────────────────────────────────────────
        const paths = sectionRef.current?.querySelectorAll(".flow-line");
        paths?.forEach((p: any) => {
          const len = (p as SVGPathElement).getTotalLength?.() ?? 80;
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(p, { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut",
            scrollTrigger: { trigger: sectionRef.current?.querySelector('.card-flow'), start: "top 82%" } });
        });

        // ── Safe AI badges pop ─────────────────────────────────────────────
        gsap.fromTo(
          sectionRef.current?.querySelectorAll(".safe-badge"),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.35, ease: "back.out(2.2)", stagger: 0.07,
            scrollTrigger: { trigger: sectionRef.current?.querySelector('.card-safe'), start: "top 80%" } }
        );

        // ── Scenario badges slide in ───────────────────────────────────────
        gsap.fromTo(
          sectionRef.current?.querySelectorAll(".scenario-item"),
          { x: -18, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.1,
            scrollTrigger: { trigger: sectionRef.current?.querySelector('.card-scenario'), start: "top 80%" } }
        );

        // ── Terminal text type-in effect ───────────────────────────────────
        gsap.fromTo(
          sectionRef.current?.querySelectorAll('.terminal-text'),
          { opacity: 0, y: 8 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power2.out",
            scrollTrigger: { trigger: sectionRef.current?.querySelector('.card-roi'), start: "top 82%" } }
        );

      }, sectionRef.current ?? undefined);

      cleanup = () => ctx.revert();
    })();
    return () => cleanup?.();
  }, []);

  // ─── Shared card style ──────────────────────────────────────────────────────
  const card = [
    "pain-card",
    "bg-white rounded-2xl border border-stone-100",
    "p-6 flex flex-col",
    "shadow-sm hover:shadow-md hover:border-orange-100",
    "transition-all duration-300 ease-out",
  ].join(" ");

  // ─── Shared italic heading ──────────────────────────────────────────────────
  const cardHead = "font-display text-[19px] font-bold text-stone-900 font-space mb-2.5 leading-snug";
  const cardDesc = "text-[13px] text-stone-500 font-light font-space leading-relaxed";
  const hl       = "font-semibold text-orange-500"; // inline highlight

  // ─── Small icon wrapper ─────────────────────────────────────────────────────
  function IconBox({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
      <div className={`flex items-center justify-center rounded-lg border text-stone-400 md:text-stone-700 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <section ref={sectionRef} id="pain-points"
      className="relative bg-gray-50 rounded-xl  py-24 px-2 md:px-12 overflow-hidden">

      {/* Dot texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{ backgroundImage:"radial-gradient(circle,#a8a29e 1px,transparent 1px)", backgroundSize:"28px 28px" }} />

      {/* Warm top glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] pointer-events-none"
        style={{ background:"radial-gradient(ellipse,rgba(249,115,22,0.07) 0%,transparent 68%)" }} />

      <div className="relative max-w-6xl mx-auto">

        {/* ── HEADER ─────────────────────────────────────────────────────── */}
        <div ref={headRef} className="text-center mb-14">
          <h2 className="font-display text-3xl md:text-4xl font-extrabold text-stone-900
                         leading-[1.08] tracking-tight mb-4">
            Too Many Supply Chain Tools.
            <br />
            Not Enough <span className="italic text-orange-500">ROI</span>
          </h2>
          <p className="text-[14px] text-stone-400  md:text-stone-700 font-light  mx-auto leading-relaxed">
            Data is fragmented, answers aren't trusted, and decisions are still bottlenecked
            in supply chain operations.
          </p>
        </div>

        {/* ── GRID - mirrors screenshot: tall-left | 2-stack-center | 2-stack-right ── */}
        <div ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5">

          {/* ════════════════════════════════════════════════════════════════
              CARD 1  - No More Bottlenecks  (left col, spans 2 rows)
          ════════════════════════════════════════════════════════════════ */}
          <div className={`${card} card-radar md:row-span-2`}>

            <h3 className={`${cardHead} font-space`}>No More Bottlenecks</h3>
            <p className={cardDesc}>
              Teams ask live system questions in{" "}
              <span className={hl}>natural language</span>, with safe access
              controls and reliable answers.
            </p>

            {/* RADAR GRAPHIC */}
            <div className="flex-1 flex items-center justify-center py-6 mt-2">
              <div className="relative w-[200px] h-[200px]">

                {/* Concentric rings */}
                {[90,72,54,36,20].map((pct, i) => (
                  <div key={i} className="rring absolute rounded-full"
                    style={{
                      width:`${pct}%`, height:`${pct}%`,
                      top:"50%", left:"50%",
                      transform:"translate(-50%,-50%)",
                      border:`1.5px solid rgba(249,115,22,${0.06+i*0.04})`,
                    }} />
                ))}

                {/* Centre hub */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                                w-[52px] h-[52px] rounded-full bg-orange-500 z-10
                                flex items-center justify-center
                                shadow-lg shadow-orange-200">
                  <svg viewBox="0 0 20 20" fill="none" className="w-6 h-6 text-white"
                    stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10 3a7 7 0 100 14A7 7 0 0010 3z"/>
                    <path d="M10 7v3l2 2"/>
                  </svg>
                </div>

                {/* Orbit nodes - 4 positions */}
                {[
                  { angle:-42, r:42, title:"check" },
                  { angle:105, r:42, title:"bar"   },
                  { angle:220, r:42, title:"user"  },
                  { angle:50,  r:68, title:"grid"  },
                ].map((n, i) => {
                  const rad = n.angle * Math.PI / 180;
                  const cx  = 50 + n.r * Math.cos(rad);
                  const cy  = 50 + n.r * Math.sin(rad);
                  const svgProps = { viewBox:"0 0 14 14", fill:"none", className:"w-3.5 h-3.5",
                    stroke:"#f97316", strokeWidth:2, strokeLinecap:"round" as const };
                  const icons = [
                    <svg key="c" {...svgProps}><polyline points="2,7 5,11 12,3"/></svg>,
                    <svg key="b" {...svgProps}><rect x="1" y="8" width="3" height="5" rx="0.5"/><rect x="5.5" y="5" width="3" height="8" rx="0.5"/><rect x="10" y="2" width="3" height="11" rx="0.5"/></svg>,
                    <svg key="u" {...svgProps}><circle cx="7" cy="4.5" r="2.5"/><path d="M1 13c0-2.8 2.7-4.5 6-4.5s6 1.7 6 4.5"/></svg>,
                    <svg key="g" {...svgProps}><rect x="1.5" y="1.5" width="11" height="11" rx="2"/><line x1="1.5" y1="7" x2="12.5" y2="7"/><line x1="7" y1="1.5" x2="7" y2="12.5"/></svg>,
                  ];
                  return (
                    <div key={i} className="orbit-node absolute w-9 h-9 rounded-full
                                            bg-orange-50 border border-orange-200 shadow-sm
                                            flex items-center justify-center z-10"
                      style={{ left:`calc(${cx}% - 18px)`, top:`calc(${cy}% - 18px)` }}>
                      {icons[i]}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom trust pill */}
            <div className="flex items-center font-space gap-2 px-3 py-2 rounded-xl bg-orange-50 border border-orange-100">
              <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-[11px] font-semibold text-orange-700">
                Ask anything in natural language
              </span>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              CARD 2  - One Trusted View  (center-top)
          ════════════════════════════════════════════════════════════════ */}
          <div className={`${card} card-flow`}>
            <h3 className={cardHead}>One Trusted View</h3>
            <p className={cardDesc}>
              We connect ERP, 3PL, and BI data into a single governed{" "}
              <span className={hl}>source of truth</span>{" "}
              for inventory, demand, and POs
            </p>

            {/* FLOW GRAPHIC */}
            <div className="flex items-center gap-2 mt-4 flex-1 min-h-[120px]">

              {/* Source pills */}
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                {["ERP","3PL","TMS","BI"].map(s => (
                  <div key={s} className="w-[42px] h-7 rounded-lg border border-orange-200 bg-orange-50
                                          flex items-center justify-center">
                    <span className="text-[10px] font-bold text-orange-700">{s}</span>
                  </div>
                ))}
              </div>

              {/* SVG converge → hub → diverge */}
              <div className="relative flex-1 h-[110px]">
                <svg viewBox="0 0 160 110" className="absolute inset-0 w-full h-full"
                  preserveAspectRatio="xMidYMid meet">

                  {/* Converge lines */}
                  {[14,36,74,96].map((y, i) => (
                    <path key={i} className="flow-line"
                      d={`M0 ${y} C55 ${y} 55 55 80 55`}
                      fill="none" stroke="#fed7aa" strokeWidth="1.6" strokeLinecap="round"/>
                  ))}

                  {/* Diverge lines */}
                  {[9,27,55,83,101].map((y, i) => (
                    <path key={i} className="flow-line"
                      d={`M80 55 C105 55 105 ${y} 160 ${y}`}
                      fill="none" stroke="#fed7aa" strokeWidth="1.3" strokeLinecap="round"/>
                  ))}

                  {/* Hub */}
                  <circle cx="80" cy="55" r="14" fill="#f97316"/>
                  <circle cx="80" cy="55" r="6"  fill="white" opacity="0.85"/>
                </svg>
              </div>

              {/* Output icons */}
              <div className="flex flex-col gap-1.5 flex-shrink-0">
                {[
                  <svg key="db"  viewBox="0 0 14 14" fill="none" stroke="currentColor" className="w-3.5 h-3.5" strokeWidth={1.6} strokeLinecap="round"><ellipse cx="7" cy="3.5" rx="4" ry="1.5"/><path d="M3 3.5v7c0 .83 1.8 1.5 4 1.5s4-.67 4-1.5v-7"/><path d="M3 7c0 .83 1.8 1.5 4 1.5s4-.67 4-1.5"/></svg>,
                  <svg key="cl"  viewBox="0 0 14 14" fill="none" stroke="currentColor" className="w-3.5 h-3.5" strokeWidth={1.6} strokeLinecap="round"><circle cx="7" cy="7" r="5"/><line x1="7" y1="4.5" x2="7" y2="9.5"/><line x1="4.5" y1="7" x2="9.5" y2="7"/></svg>,
                  <svg key="gr"  viewBox="0 0 14 14" fill="none" stroke="currentColor" className="w-3.5 h-3.5" strokeWidth={1.6} strokeLinecap="round"><rect x="1.5" y="1.5" width="11" height="11" rx="2"/><line x1="1.5" y1="6" x2="12.5" y2="6"/><line x1="6" y1="1.5" x2="6" y2="12.5"/></svg>,
                  <svg key="ch"  viewBox="0 0 14 14" fill="none" stroke="currentColor" className="w-3.5 h-3.5" strokeWidth={1.6} strokeLinecap="round"><polyline points="1,11 4,6 7,8 10,3 13,5"/></svg>,
                  <svg key="cal" viewBox="0 0 14 14" fill="none" stroke="currentColor" className="w-3.5 h-3.5" strokeWidth={1.6} strokeLinecap="round"><rect x="1.5" y="2.5" width="11" height="9" rx="1.5"/><line x1="1.5" y1="5.5" x2="12.5" y2="5.5"/><line x1="4.5" y1="1" x2="4.5" y2="4"/><line x1="9.5" y1="1" x2="9.5" y2="4"/></svg>,
                ].map((icon, i) => (
                  <div key={i}
                    className="w-8 h-7 rounded-lg border border-stone-100 bg-stone-50
                               flex items-center justify-center text-stone-400  md:text-stone-700">
                    {icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              CARD 3  - Safe AI Outputs  (right-top)
          ════════════════════════════════════════════════════════════════ */}
          <div className={`${card} card-safe`}>
            <h3 className={cardHead}>Safe AI Outputs</h3>
            <p className={cardDesc}>
              LLMs are constrained with{" "}
              <span className={hl}>code</span>,{" "}
              <span className={hl}>evals</span>, and{" "}
              <span className={hl}>human checks</span>{" "}
              so results stay predictable, auditable, and inventory-safe.
            </p>

            {/* BADGE CLUSTER GRAPHIC */}
            <div className="relative  mt-4 flex-1 min-h-40">
              {/* Top pulse dot */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2
                              rounded-full bg-orange-400 animate-pulse" />

              {/* SVG connection lines */}
              <svg viewBox="0 0 260 96" className="absolute inset-0 w-full h-full opacity-25">
                <line x1="65"  y1="16" x2="130" y2="52" stroke="#f97316" strokeWidth="1.2"/>
                <line x1="195" y1="16" x2="130" y2="52" stroke="#f97316" strokeWidth="1.2"/>
                <line x1="52"  y1="82" x2="130" y2="52" stroke="#f97316" strokeWidth="1.2"/>
                <line x1="208" y1="82" x2="130" y2="52" stroke="#f97316" strokeWidth="1.2"/>
              </svg>

              {/* Positioned badges */}
              {[
                { label:"Trusted",           pos:"top-1 left-3",  primary:false },
                { label:"Governed",          pos:"top-1 right-3", primary:false },
                { label:"Deterministic AI",  pos:"top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", primary:true },
                { label:"Transparent",       pos:"bottom-0 left-3",  primary:false },
                { label:"Verifiable",        pos:"bottom-0 right-3", primary:false },
              ].map(b => (
                <div key={b.label}
                  className={`safe-badge absolute whitespace-nowrap ${b.pos} ${
                    b.primary
                      ? "px-3 py-1.5 rounded-full bg-orange-500 text-white text-[10px] font-bold shadow-md shadow-orange-200"
                      : "px-2.5 py-1 rounded-full border border-orange-200 bg-orange-50 text-orange-800 text-[9px] font-semibold"
                  }`}>
                  {b.label}
                </div>
              ))}
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              CARD 4  - ROI From Tools  (center-bottom)
          ════════════════════════════════════════════════════════════════ */}
          <div className={`${card} card-roi`}>
            <h3 className={cardHead}>ROI From Tools</h3>
            <p className={cardDesc}>
              We layer <span className={hl}>agents</span> on top of your data lake
              and SaaS stack to drive real decisions and workflows.
            </p>

            {/* TERMINAL MOCKUP */}
            <div className="mt-4 flex-1 rounded-xl border border-stone-200 bg-stone-50 overflow-hidden">
              {/* Browser bar */}
              <div className="flex items-center gap-1.5 px-3 py-2 bg-stone-100 border-b border-stone-200">
                <div className="w-2 h-2 rounded-full bg-red-300"/>
                <div className="w-2 h-2 rounded-full bg-amber-300"/>
                <div className="w-2 h-2 rounded-full bg-emerald-300"/>
                <span className="ml-2 text-[9px] text-stone-400  md:text-stone-700 font-mono tracking-wide flex-1">
                  deploy_agents.sh
                </span>
                {/* Run button */}
                <div className="w-6 h-6 rounded-md bg-orange-500 flex items-center justify-center flex-shrink-0">
                  <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="2,2 8,5 2,8"/>
                  </svg>
                </div>
              </div>

              {/* Code body */}
              <div className="terminal-text px-4 py-3 font-mono text-[11px] leading-relaxed">
                <span className="text-orange-500">Deploy </span>
                <span className="font-bold text-stone-800">AGENTS</span>
                <span className="text-stone-400  md:text-stone-700"> on top of existing</span>
                <br/>
                <span className="text-stone-400  md:text-stone-700">data lakes and SaaS tools</span>
                <span className="inline-block w-2 h-3.5 bg-orange-400 ml-0.5 align-middle
                                 animate-pulse" />
              </div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════════
              CARD 5  - Fast Scenarios  (right-bottom)
          ════════════════════════════════════════════════════════════════ */}
     <div className={`${card} card-scenario flex text-xs flex-col`}>
  <h3 className={cardHead}>Fast Scenarios</h3>

  <p className={cardDesc}>
    Instantly see how changes impact your{" "}
    <span className={hl}>inventory</span>,{" "}
    <span className={hl}>cost</span>, and{" "}
    <span className={hl}>service levels</span> - without spreadsheets.
  </p>

  {/* GRAPHIC */}
  <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">

    {/* BEFORE */}
    <div className="flex flex-col items-center text-center">
      <span className="text-xs text-stone-400  md:text-stone-700 mb-1">Before</span>

      <div className="bg-stone-50 border border-stone-200 rounded-lg px-3 py-2 text-xs">
        <div>Inventory: <b>$10M</b></div>
        <div>Service: <b>92%</b></div>
        <div>Cost: <b>$28M</b></div>
      </div>
    </div>

    {/* ARROW */}
    <div className="text-orange-500 font-bold text-lg">→</div>

    {/* AFTER */}
    <div className="flex flex-col items-center text-center">
      <span className="text-xs text-orange-500 font-semibold mb-1">
        After (Optimized)
      </span>

      <div className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 text-xs">
        <div>Inventory: <b>$8.5M</b></div>
        <div>Service: <b>98.4%</b></div>
        <div>Cost: <b>$24M</b></div>
      </div>
    </div>

  </div>

  {/* LABEL */}
  <div className="mt-4 text-center text-[11px] text-stone-500">
    Powered by deterministic models - fast, reliable, and repeatable
  </div>
</div>

        </div>{/* /grid */}
      </div>
    </section>
  );
}