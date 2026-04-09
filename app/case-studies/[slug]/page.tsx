"use client";
import { caseStudiesHtmlData } from "@/components/case-study/CaseStudyHtmlData";
import DownloadModal from "@/components/case-study/DownloadModal";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   ICONS (inline SVG — no extra deps)
───────────────────────────────────────────────────────────── */
const IconArrowLeft = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconDownload = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path d="M9 3v8M6 8l3 3 3-3M3 14h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconLayers = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M7 1L13 4.5L7 8L1 4.5L7 1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
    <path d="M1 7.5L7 11L13 7.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ─────────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────────── */
export default function Page() {
  const { slug } = useParams();
  const data: any = caseStudiesHtmlData.find((item) => item.slug === slug) || {};
  const [modalOpen, setModalOpen] = useState(false);

  const handleDownloadClick = () => {
    if(localStorage.getItem("filledForm") === "true"){
        window.open(`/case-studies/${slug}.pdf`, "_blank", "noopener,noreferrer");
        return;
    }

    setModalOpen(true);
  }

  return (
  <>
 <div className="font-sans text-[#0D0D0D] bg-white">

  {/* HERO */}
  <div className="relative min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-end overflow-hidden">

    {/* Background Effects */}
    <div className="absolute top-[150px] sm:top-[200px] -right-[80px] sm:-right-[100px] w-[280px] sm:w-[500px] h-[280px] sm:h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,92,26,0.2)_0%,transparent_65%)]" />
    <div className="absolute -bottom-[60px] sm:-bottom-[80px] left-[10%] w-[180px] sm:w-[300px] h-[180px] sm:h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,92,26,0.1)_0%,transparent_65%)]" />

    <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-16 py-12 sm:py-16 border-b border-stone-200">

      <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#888] hover:text-[#FF5C1A]">
        <IconArrowLeft /> Back to Case Studies
      </Link>

      <div className="mt-4">
        <span className="inline-flex items-center gap-2 bg-[rgba(255,92,26,0.15)] border border-[rgba(255,92,26,0.35)] text-[#FF5C1A] text-[10px] sm:text-xs font-semibold uppercase px-3 sm:px-4 py-1.5 rounded-full">
          <span className="w-[5px] h-[5px] rounded-full bg-[#FF5C1A] animate-pulse" />
          {data.industry || "Case Study"}
        </span>
      </div>

      <h1 className="text-[clamp(28px,6vw,60px)] font-extrabold leading-tight tracking-tight max-w-3xl mt-4">
        {data.title}
      </h1>

      <p className="text-sm sm:text-base lg:text-lg italic text-black/60 max-w-2xl mt-4 mb-8">
        {data.subtitle}
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 border-t border-black/10 pt-6">

        {data.industry && (
          <div className="sm:pr-8 sm:border-r border-black/10">
            <div className="text-[10px] uppercase text-black/50 mb-1">Industry</div>
            <div className="font-bold">{data.industry}</div>
          </div>
        )}

        <button
          onClick={handleDownloadClick}
          className="bg-[#FF5C1A] text-white px-5 py-3 text-sm rounded-lg flex items-center gap-2 hover:bg-orange-700 transition"
        >
          <IconDownload /> Get Full Case Study
        </button>

      </div>
    </div>
  </div>

  {/* BODY */}
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-16 pt-12 sm:pt-16">

    {/* META */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 bg-[#FAFAF8] border border-black/10 rounded-xl overflow-hidden mb-16">

      <div className="p-5 border-b sm:border-b-0 sm:border-r border-black/10">
        <div className="text-xs uppercase text-[#888] mb-2">Industry</div>
        <div className="font-bold">{data.industry}</div>
      </div>

      <div className="p-5 border-b lg:border-b-0 lg:border-r border-black/10">
        <div className="text-xs uppercase text-[#888] mb-2">Scope</div>
        <div className="font-bold">{data?.scope?.join(", ")}</div>
      </div>

      <div className="p-5">
        <div className="text-xs uppercase text-[#888] mb-2">Outcomes</div>
        <div className="font-bold">{data?.outcome}</div>
      </div>

    </div>

    {/* CHALLENGE */}
    {data.challenge && (
      <div className="mb-12 sm:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold text-[#FF5C1A]">01</span>
          <span className="w-5 h-[2px] bg-[#FF5C1A]" />
          <h2 className="text-xl sm:text-2xl font-extrabold">The Challenge</h2>
        </div>

        <p className="text-base sm:text-lg text-[#444] leading-relaxed">
          {data.challenge}
        </p>

        <div className="mt-5 p-5 bg-[#FFF1EB] border-l-4 border-[#FF5C1A] rounded-r-xl">
          <p className="italic text-sm sm:text-base">
            {data.challenge.split(".")[0]}
          </p>
        </div>
      </div>
    )}

    {/* SOLUTION */}
    {data.solution && (
      <div className="mb-12 sm:mb-16">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-bold text-[#FF5C1A]">02</span>
          <span className="w-5 h-[2px] bg-[#FF5C1A]" />
          <h2 className="text-xl sm:text-2xl font-extrabold">Our Solution</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {data.solution.map((item: any, i: number) => (
            <div key={i} className="flex gap-3 p-4 sm:p-5 bg-[#FAFAF8] border rounded-xl hover:bg-[#FFF1EB] transition">
              <div className="w-7 h-7 flex items-center justify-center bg-[#FF5C1A]/10 text-[#FF5C1A] rounded-md">
                <IconCheck />
              </div>
              <span className="text-sm text-[#444]">{item}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* IMPACT */}
    {data?.impact && (
      <div className="mb-12 sm:mb-16">
        <h2 className="text-xl sm:text-2xl font-bold mb-6">Impact</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {data.impact.map((item: any, i: number) => (
            <div key={i} className="p-5 sm:p-6 bg-black text-white rounded-xl">
              <div className="text-[#FF5C1A] mb-2">{i + 1}</div>
              <div className="font-bold">{item.title}</div>
              <div className="text-white/60 text-sm">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* CTA */}
    <div className="bg-black text-white p-6 sm:p-10 rounded-2xl flex flex-col lg:flex-row justify-between gap-8 mb-10">

      <div>
        <div className="text-[#FF5C1A] text-xs uppercase mb-2">✦ Full Deep-Dive</div>
        <h3 className="text-xl sm:text-2xl font-bold">Get the Complete Case Study</h3>
        <p className="text-white/60 text-sm">Download full PDF</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
        <button
          onClick={handleDownloadClick}
          className="bg-orange-500 px-6 py-3 text-sm rounded-lg flex items-center justify-center gap-2 hover:bg-orange-700 transition"
        >
          <IconDownload /> Download
        </button>

        <Link
          href="/contact"
          className="border border-white/40 text-center px-6 py-3 rounded-lg hover:border-orange-500 hover:text-orange-500 transition"
        >
          Contact
        </Link>
      </div>

    </div>

  </div>
</div>

     {
        modalOpen && <div className="mx-auto">
          <DownloadModal
              onClose={()=> setModalOpen(false)} 
              selectedCasestudy={String(slug)} 
          />
        </div> 
      }
</>

  );
}