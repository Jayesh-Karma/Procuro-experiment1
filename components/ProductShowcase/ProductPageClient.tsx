"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { COMPARISON, Eyebrow, INTEGRATIONS, ModulePreview, MODULES, Reveal, STEPS } from "@/components/ProductShowcase/ProductPageComponents";
import { Brain, ChevronLeft, ChevronRight, Eye, Lock, Play, Receipt } from "lucide-react";

export default function ProductPageClient() {
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  const mod = MODULES[activeIdx];

  return (
    <div className="min-h-screen bg-white">
      {/* ── 1. HERO ──────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden">
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
          style={{ background: "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(249,115,22,0.06) 0%, transparent 70%)" }} />
        <div className="absolute inset-0 pointer-events-none opacity-[0.018]"
          style={{ backgroundImage: "radial-gradient(circle, #a8a29e 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        <div className="relative max-w-7xl mx-auto px-6 pt-18 pb-20">
          <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? "translateY(0)" : "translateY(18px)", transition: "opacity 0.7s ease-out, transform 0.7s ease-out" }}>

            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-7 rounded-full bg-orange-400" />
              <span className="text-[10px] font-bold uppercase font-space tracking-[0.22em] text-orange-500">The Platform</span>
            </div>

            <div className="grid md:grid-cols-[1fr_340px] gap-16 items-start">
              <div>
                <h1 className="font-display text-4xl md:text-5xl font-extrabold text-stone-900 leading-[1.05] tracking-tight mb-5">
                  AI in supply chain.
                  <br />
                  <span className="text-orange-500">Deployed on your servers.</span>
                  <br />
                  <span className="text-stone-400 font-light">Connected to your ERP.</span>
                </h1>
                <p className="text-xs md:text-base font-space text-stone-700 font-light leading-relaxed max-w-lg mb-8">
                  Six modules covering forecasting, inventory, orders, warehouse, and AI intelligence. Connects to what you already have - live in under 4 Weeks, no migration required.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href="/book-demo"
                    className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-md shadow-orange-200">
                    Book a free demo
                    <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                    </svg>
                  </Link>
                  <Link href="/demo"
                    className="flex items-center gap-2 px-6 py-3.5 rounded-xl border border-stone-200 text-stone-600 hover:border-orange-200 hover:text-orange-600 text-sm font-medium transition-all">
                    Try Demo <Play />
                  </Link>
                </div>
              </div>

              {/* Proof column */}
              <div className="hidden md:flex flex-col gap-0 divide-y divide-stone-100 border border-stone-100 rounded-2xl overflow-hidden bg-stone-50">
                {[["307%", "Avg. 18-month ROI", "vs. traditional ERP"], ["91%", "AI forecast accuracy", "across deployments"], ["< 4 Weeks", "Typical go-live", "no migration required"], ["0", "Data leaves your servers", "always"]].map(([v, l, s]) => (
                  <div key={l} className="flex items-center gap-4 px-5 py-4">
                    <span className="font-mono text-xl font-bold text-orange-500 leading-none w-20 flex-shrink-0">{v}</span>
                    <div>
                      <p className="text-xs font-semibold text-stone-700">{l}</p>
                      <p className="text-[10px] text-stone-400 mt-0.5">{s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Integration strip */}
            <div className="mt-14 pt-10 border-t border-stone-100">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400 mb-5">
                Connects to your existing systems - no migration required
              </p>
              <div className="flex flex-wrap gap-2 items-center justify-start">
                {INTEGRATIONS.map(i => (
                  <span key={i.name} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-100 bg-stone-50 text-xs text-stone-600 font-medium hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600 transition-all cursor-default">
                    <span className="text-[9px] text-stone-300">{i.cat}</span>
                    {i.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. PLATFORM MODULES (light) ──────────────────────────── */}
      <section className="bg-[#FAFAF9] py-16 sm:py-20 md:py-24 px-4 sm:px-6 md:px-12 border-t border-stone-100"> 
        <div className="max-w-6xl mx-auto"> 
          
          {/* Header */} 
          <Reveal> 
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12"> 
              <div className="max-w-xl"> 
                <Eyebrow text="Platform Modules" /> 
                <h2 className="font-display text-[clamp(24px,5vw,44px)] font-extrabold text-stone-900 leading-tight tracking-tight"> 
                  Six modules. 
                  <span className="text-stone-400 font-light"> One connected platform.</span> 
                </h2> 
              </div> 
              
              <p className="text-sm font-space text-stone-400 font-light max-w-full md:max-w-xs leading-relaxed"> 
                Deploy all six or start with the modules most relevant to your operation. Each one pulls from the same data layer. 
              </p> 
            </div> 
          </Reveal> 
          
          {/* Tabs */} 
          <Reveal delay={0.05} className="flex items-center mb-8"> 
            <span><ChevronLeft className="w-8 h-8 text-stone-200" /></span>
            <div className="flex gap-2 overflow-x-auto no-scrollbar"> 
              {MODULES.map((m, i) => (
                <button key={m.id} onClick={() => setActiveIdx(i)} className={`flex whitespace-nowrap text-xs sm:text-sm items-center gap-2 cursor-pointer px-3 sm:px-4 py-2.5 rounded-xl font-medium border transition-all duration-200 ${ activeIdx === i ? "bg-white shadow-sm border-stone-200 text-stone-900" : "bg-transparent border-stone-100 text-stone-500 hover:border-stone-200 hover:text-stone-700" }`} > 
                  <span style={{ color: activeIdx === i ? m.accent : undefined }} className={activeIdx !== i ? "text-stone-300" : ""} > 
                    {m.icon} 
                  </span> 
                  {m.title} {activeIdx === i && ( <span className="w-1.5 h-1.5 rounded-full" style={{ background: m.accent }} /> )} 
                </button> 
              ))} 
            </div> 
            <span><ChevronRight className="w-8 h-8 text-stone-200" /></span>
          </Reveal> 
          
          {/* Content */} 
          <div key={mod.id} className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-6 md:gap-8 items-start" style={{ animation: "fadeUp 0.4s ease-out" }} > 
            {/* LEFT */} 
            <div className="bg-white rounded-2xl border border-stone-100 overflow-hidden shadow-sm"> 
              {/* Header */} 
              <div className="px-5 sm:px-7 pt-6 sm:pt-7 pb-5 sm:pb-6 border-b border-stone-50"> 
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4"> 
                  <div className="flex items-center gap-3"> 
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center flex-shrink-0 border" style={{ background: mod.accentBg, borderColor: mod.accentBorder, color: mod.accent }} > 
                      {mod.icon} 
                    </div> 
                    <div> 
                      <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border mb-1.5 inline-block" style={{ color: mod.accent, borderColor: mod.accentBorder, background: mod.accentBg }} > 
                        {mod.badge} 
                      </span> 
                      
                      <h3 className="text-lg sm:text-xl font-extrabold text-stone-900 leading-tight"> 
                        {mod.title} 
                      </h3> 
                    </div> 
                  </div> 
                  
                  {/* Stat */} 
                  <div className="text-left sm:text-right flex-shrink-0 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border" style={{ background: mod.accentBg, borderColor: mod.accentBorder }} > 
                    <p className="font-mono text-xl sm:text-2xl font-bold leading-none" style={{ color: mod.accent }}> 
                      {mod.stat.value} 
                    </p> 
                    
                    <p className="text-[9px] text-stone-400 mt-1 max-w-[90px] leading-tight"> 
                      {mod.stat.label} 
                    </p> 
                  </div> 
                </div> 
                
                <p className="text-sm text-stone-500 font-light leading-relaxed"> {mod.description} </p> 
              </div> 
              
              {/* Capabilities */} 
              <div className="px-5 sm:px-7 py-5 sm:py-6"> 
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400 mb-4"> 
                  What it does 
                </p> 
                
                <div className="flex flex-col gap-3"> 
                  {mod.capabilities.map((c, i) => (
                    <div key={i} className="flex items-start gap-3"> 
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border" style={{ background: mod.accentBg, borderColor: mod.accentBorder }} > 
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: mod.accent }} />
                      </div> 
                      <div> 
                        <span className="text-xs font-semibold text-stone-800">{c.label}</span> 
                        <span className="text-xs text-stone-400 font-light"> - {c.detail}</span> 
                      </div> 
                    </div> 
                  ))} 
                </div> 
                
                <Link href="/contact" className="flex items-center gap-2 mt-6 text-sm font-semibold w-fit transition-all hover:gap-3" style={{ color: mod.accent }} > 
                  See this module in action 
                  <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2}> 
                    <line x1="2" y1="6" x2="10" y2="6" /> 
                    <polyline points="7 3 10 6 7 9" /> 
                  </svg> 
                </Link> 
              </div> 
            </div> 
            
            {/* RIGHT */} 
            <div className="bg-white rounded-2xl border border-stone-100 p-4 sm:p-6 shadow-sm"> 
              <div className="flex items-center justify-between mb-4 sm:mb-5"> 
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-stone-400"> 
                  Live data preview 
                </p> 
                <span className="flex items-center gap-1.5 text-[9px] font-semibold text-emerald-600"> 
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 
                  Real-time 
                </span> 
              </div> 
              
              <ModulePreview type={mod.preview} accent={mod.accent} /> 
            </div> 
          </div> 
        </div> 
      </section>
      
      {/* ── 3. HOW IT WORKS ────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-16">
              <Eyebrow text="How It Works" />
              <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-3">
                Discovery call to go-live.
                <span className="text-orange-500"> Under 4 Weeks.</span>
              </h2>
              <p className="text-sm text-stone-400 font-light max-w-md mx-auto">
                No months-long implementation. No IT department takeover. No migration away from your existing systems.
              </p>
            </div>
          </Reveal>

          {/* Steps */}
          <div className="relative flex flex-col md:flex-row gap-0">
            <div className="hidden md:block absolute left-0 right-0 top-[44px] h-px bg-stone-100" />
            <div className="hidden md:block absolute left-0 top-[44px] h-px bg-gradient-to-r from-orange-300 to-orange-100"
              style={{ width: "80%" }} />

            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.09} className="flex-1 flex flex-col">
                <div className={`flex flex-col ${i < STEPS.length - 1 ? "md:pr-6" : ""} md:items-start items-start gap-0 relative pb-8 md:pb-0`}>
                  {i < STEPS.length - 1 && (
                    <div className="absolute left-[18px] top-[40px] bottom-0 w-px bg-stone-100 md:hidden" />
                  )}

                  <div className="flex items-center gap-3 mb-4 md:flex-col md:items-start md:gap-3">
                    <div className="w-9 h-9 rounded-full border-2 border-orange-400 bg-white flex items-center justify-center flex-shrink-0 z-10 shadow-sm shadow-orange-100">
                      <span className="text-[10px] font-bold text-orange-500">{s.n}</span>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-orange-50 border border-orange-100 text-orange-600">
                      {s.phase}
                    </span>
                  </div>

                  <div className="ml-12 md:ml-0">
                    <h3 className="text-sm font-bold text-stone-900 mb-1.5">{s.title}</h3>
                    <p className="text-xs text-stone-400 font-light leading-relaxed">{s.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. INTERACTIVE DEMO TEASER ─────────────────────────────── */}
      <section className="bg-[#FAFAF9] py-24 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="grid md:grid-cols-[1fr_1.3fr] gap-12 items-center">
              <div>
                <Eyebrow text="Live Demo" />
                <h2 className="font-display text-[clamp(24px,3vw,40px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-5">
                  We demo on
                  <span className="text-orange-500"> your data.</span>
                  <br />
                  <span className="text-stone-400 font-light">Not a generic walkthrough.</span>
                </h2>
                <p className="text-sm text-stone-500 font-light leading-relaxed mb-5">
                  Before you commit to anything, we connect to a read-only snapshot of your ERP and show you - inside the demo call - what your supply chain looks like through our platform. Your SKUs. Your suppliers. Your risk profile.
                </p>
                <div className="flex flex-col gap-2 mb-8">
                  {["What's at stockout risk in the next 2 weeks", "Where capital is locked in dead stock right now", "Which suppliers are showing delivery risk", "What an AI procurement recommendation looks like on your SKUs"].map((item, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <div className="w-4 h-4 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
                      </div>
                      <p className="text-sm text-stone-600 font-light">{item}</p>
                    </div>
                  ))}
                </div>
                <Link href="/demo"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-md shadow-orange-200">
                  Try demo on your data
                  <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                  </svg>
                </Link>
              </div>

              {/* Demo preview card */}
              <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                <div className="flex items-center gap-1.5 px-4 py-3 bg-stone-50 border-b border-stone-100">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-200" />
                  <div className="flex-1 mx-3 bg-stone-100 rounded-md h-5 flex items-center px-2">
                    <span className="text-[9px] text-stone-400">supplychain.innovaciotech.com / your-company</span>
                  </div>
                  <span className="flex items-center gap-1 text-[9px] text-emerald-600 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />Live
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-stone-700">Your Supply Chain · Live Overview</p>
                    <span className="text-[9px] text-stone-400">Updated: just now</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[["280", "Active SKUs"], ["3", "Warehouses"], ["91%", "OTD Rate"], ["₹4.3L", "Dead Stock"]].map(([v, l]) => (
                      <div key={l} className="rounded-lg bg-stone-50 border border-stone-100 p-3 text-center">
                        <p className="font-mono text-base font-bold text-stone-900">{v}</p>
                        <p className="text-[9px] text-stone-400 mt-0.5">{l}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-orange-50 border border-orange-100">
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-semibold text-orange-700">AI Alert - Stockout risk detected</p>
                      <p className="text-[10px] text-orange-600 font-light mt-0.5">SKU-2041 at 12% coverage. Reorder 480 units from Supplier A by Friday to avoid production stoppage.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-emerald-50 border border-emerald-100">
                    <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[11px] font-semibold text-emerald-700">AI Recommendation - Transfer opportunity</p>
                      <p className="text-[10px] text-emerald-600 font-light mt-0.5">Move 320 units SKU-0887 from Delhi to Mumbai - saves ₹1.2L in markdown. Expiry in 18 days.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-stone-50 border border-stone-100">
                    <div className="w-6 h-6 rounded-lg bg-indigo-100 flex items-center justify-center flex-shrink-0 text-[11px] text-indigo-500 font-bold">✦</div>
                    <p className="text-[11px] text-stone-500 italic flex-1">Ask: "Which suppliers are at delivery risk this week?"</p>
                    <span className="text-[9px] text-stone-300">→</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 5. DATA PRIVACY ────────────────────────────────────────── */}
      <section className="bg-white py-20 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="flex flex-col md:flex-row md:items-center gap-10">
              <div className="flex-1">
                <Eyebrow text="Data & Privacy" />
                <h2 className="font-display text-[clamp(22px,3vw,38px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-4">
                  Your data never leaves
                  <span className="text-orange-500"> your infrastructure.</span>
                </h2>
                <p className="text-sm text-stone-500 font-light leading-relaxed max-w-sm">
                  Deployed on your servers. Read-only access. Models trained on your data only - never shared with any other client.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 flex-1">
                {[
                  { icon: <Lock />, title: "Your servers, always", body: "Platform deployed on your infrastructure. No external data transmission." },
                  { icon: <Eye />, title: "Read-only access", body: "We read to generate intelligence. We never write or modify your systems." },
                  { icon: <Brain />, title: "Your data only", body: "AI models trained exclusively on your data. Never shared with anyone." },
                  { icon: <Receipt />, title: "Full audit trail", body: "Every access, recommendation, and action logged with timestamps." },
                ].map((p, i) => (
                  <div key={i} className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                    <div className="text-xl text-orange-500 mb-2">{p.icon}</div>
                    <p className="text-xs font-bold text-stone-800 mb-1">{p.title}</p>
                    <p className="text-[11px] text-stone-400 font-light leading-relaxed">{p.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. COMPARISON TABLE ────────────────────────────────────── */}
      <section className="bg-[#FAFAF9] py-24 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <div className="text-center mb-12">
              <Eyebrow text="Comparison" />
              <h2 className="font-display text-[clamp(26px,3.5vw,44px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-3">
                Traditional ERP vs.
                <span className="text-orange-500"> our platform.</span>
              </h2>
              <p className="text-sm text-stone-400 max-w-md mx-auto font-light">
                A direct comparison on the capabilities that actually determine supply chain performance.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl overflow-hidden border border-stone-100 bg-white shadow-sm">
              <div className="grid grid-cols-[1.4fr_1fr_1fr] bg-stone-900">
                <div className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40">Capability</div>
                <div className="px-5 py-4 text-[10px] font-bold uppercase tracking-widest text-white/35 border-l border-white/8">Traditional Approach</div>
                <div className="px-5 py-4 border-l border-white/8">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-orange-400">Our Platform</span>
                </div>
              </div>
              {COMPARISON.map(([cap, trad, ours], i) => (
                <div key={cap} className={`grid grid-cols-[1.4fr_1fr_1fr] border-t border-stone-50 ${i % 2 === 0 ? "bg-white" : "bg-stone-50/50"}`}>
                  <div className="px-5 py-4 text-xs font-semibold text-stone-700">{cap}</div>
                  <div className="px-5 py-4 text-xs text-stone-400 font-light border-l border-stone-100">{trad}</div>
                  <div className="px-5 py-4 text-xs font-semibold text-orange-600 border-l border-stone-100">{ours}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. FINAL CTA ───────────────────────────────────────────── */}
      <section className="bg-white py-24 px-6 md:px-12 border-t border-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-100 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-orange-600">See it on your data</span>
            </div>

            <h2 className="font-display text-[clamp(30px,4.5vw,54px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-5">
              Your supply chain.
              <span className="text-orange-500"> Your data.</span>
              <br />
              <span className="text-stone-400 font-light text-[0.85em]">30 minutes.</span>
            </h2>

            <p className="text-base text-stone-500 font-light max-w-lg mx-auto leading-relaxed mb-10">
              We connect to a read-only snapshot of your ERP and show you - during the call - what's at risk, what's locked, and what the AI would recommend. Before you commit to anything.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Link href="/demo"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-orange-100">
                Try a Free Demo
                <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                </svg>
              </Link>
              <Link href="/contact"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-stone-200 text-stone-600 hover:border-orange-200 hover:text-orange-600 text-sm font-medium transition-all">
                Contact
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-stone-400 mb-8">
              {["Your data stays on your servers", "Live in under 4 Weeks", "No ERP replacement required"].map(t => (
                <div key={t} className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-emerald-400" />
                  {t}
                </div>
              ))}
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center md:gap-4 text-xs text-stone-400 border-t border-stone-100 pt-6">
              <a href="tel:+919007271601" className="hover:text-orange-500 transition-colors">+91 90072 71601</a>
              <span>·</span>
              <a href="mailto:hello@innovaciotech.com" className="hover:text-orange-500 transition-colors">hello@innovaciotech.com</a>
              <span>·</span>
              <a href="https://innovaciotech.com" className="hover:text-orange-500 transition-colors">innovaciotech.com</a>
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

