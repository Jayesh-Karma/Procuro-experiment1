"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { CASE_STUDIES, INDUSTRIES, CaseStudyCard, FeaturedCard, FilterTabs, ProofStrip } from "@/components/case-study/components";
import DownloadModal from "@/components/case-study/DownloadModal";

// ─── Data ────────────────────────────────────────────────────────────────────



// ─── Main page ────────────────────────────────────────────────────────────────
export default function CaseStudiesPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const filtered = activeFilter === "all"
    ? CASE_STUDIES
    : CASE_STUDIES.filter(c => c.industryId === activeFilter);

  // Featured = first of filtered set
  const featured = filtered[0];
  const rest = filtered.slice(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen bg-[#FAFAF9]">
        
      {/* Hero header */}
      <div className="bg-white border-b border-stone-100">
        <div className="max-w-6xl mx-auto px-6 md:px-12 pt-32 pb-14">
          <div
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
            }}
          >
            {/* Eyebrow */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-orange-400 rounded-full" />
              <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-orange-500">
                Case Studies
              </span>
            </div>

            {/* Headline */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="font-display text-[clamp(32px,5vw,56px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-3">
                  Real operations.
                  <br />
                  <span className="text-orange-500">Measurable results.</span>
                </h1>
                <p className="text-base text-stone-400 font-light max-w-lg leading-relaxed">
                  Every case study documents a supply chain problem that existed before deployment, the solution we built, and the outcome — with real numbers, not projections.
                </p>
              </div>

              {/* CTA */}
              <div className="flex-shrink-0">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-md shadow-orange-200"
                >
                  Book a demo
                  <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-14">

        {/* Proof strip */}
        <ProofStrip />

        {/* Filter + count row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
          <FilterTabs active={activeFilter} onChange={setActiveFilter} />
          <p className="text-xs text-stone-400 flex-shrink-0">
            {filtered.length} {filtered.length === 1 ? "study" : "studies"}
            {activeFilter !== "all" ? ` in ${INDUSTRIES.find(i=>i.id===activeFilter)?.label}` : " across all industries"}
          </p>
        </div>

        {/* Content area */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-stone-400 text-sm">No case studies found.</div>
        ) : (
          <div className="flex flex-col gap-12">

            {/* Featured wide card */}
            {featured && <FeaturedCard cs={featured} selectCaseStudy={(slug: any) => setSelectedCaseStudy(slug)} openModal={() => setModalOpen(true)} />}

            {/* Grid of remaining */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((cs, i) => (
                  <CaseStudyCard key={cs.slug} selectCaseStudy={(slug: any) => setSelectedCaseStudy(slug)} openModal={() => setModalOpen(true)}  cs={cs} index={i} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Bottom CTA band */}
        <div className="mt-20 rounded-2xl bg-white border border-stone-100 p-10 md:p-14 relative overflow-hidden"
          style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}>
          <div className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: "linear-gradient(90deg, transparent, #f97316 40%, #f97316 60%, transparent)" }} />
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div className="max-w-lg">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-3">
                Don't see your industry?
              </p>
              <h3 className="font-display text-[clamp(20px,2.5vw,32px)] font-extrabold text-stone-900 leading-tight mb-3">
                Every deployment is scoped to
                <span className="text-orange-500"> your specific operation.</span>
              </h3>
              <p className="text-sm text-stone-400 font-light leading-relaxed">
                We configure to your workflows, data structure, and compliance requirements — then demonstrate on your actual data in a 30-minute call.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Link href="/contact"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold transition-all hover:-translate-y-0.5 shadow-md shadow-orange-200">
                Book a discovery call
                <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
                </svg>
              </Link>
              <div className="flex items-center justify-center gap-3 text-[10px] text-stone-400">
                <a href="tel:+919007271601" className="hover:text-orange-500 transition-colors">+91 90072 71601</a>
                <span>·</span>
                <a href="mailto:hello@innovaciotech.com" className="hover:text-orange-500 transition-colors">hello@innovaciotech.com</a>
              </div>
            </div>
          </div>
        </div>

      </div>
      {
        modalOpen && <div className="mx-auto">
          <DownloadModal onClose={()=> setModalOpen(false)} selectedCasestudy={selectedCaseStudy} />
        </div> 
      }
    </div>
  );
}