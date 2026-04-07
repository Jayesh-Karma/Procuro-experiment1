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
    <div className="relative min-h-[72vh] flex flex-col justify-end overflow-hidden text-black">

      {/* <div className="absolute inset-0 bg-[linear-gradient(135deg,#0D0D0D_0%,#1a1a2e_50%,#0D0D0D_100%)]" /> */}

        

      <div className="absolute top-[200px] -right-[100px] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,92,26,0.2)_0%,transparent_65%)]" />
      <div className="absolute -bottom-[80px] left-[10%] w-[300px] h-[300px] rounded-full bg-[radial-gradient(circle,rgba(255,92,26,0.1)_0%,transparent_65%)]" />

      {/* <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(13,13,13,0.98)_0%,rgba(13,13,13,0.5)_50%,rgba(13,13,13,0.25)_100%)]" /> */}

      <div className="relative z-10 max-w-7xl border-b border-stone-200 mx-auto  py-16 w-full">

        <Link href="/case-studies" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#888] hover:text-[#FF5C1A] py-2">
          <IconArrowLeft /> Back to Case Studies
        </Link>

        <div className="mt-5 font-space">
          <span className="inline-flex items-center gap-2 bg-[rgba(255,92,26,0.15)] border border-[rgba(255,92,26,0.35)] text-[#FF5C1A] text-[11.5px] font-semibold tracking-[0.07em] uppercase px-4 py-1.5 rounded-full">
            <span className="w-[5px] h-[5px] rounded-full bg-[#FF5C1A] animate-pulse" />
            {data.industry || "Case Study"}
          </span>
        </div>

        <h1 className="text-[clamp(36px,5vw,62px)] font-space font-extrabold text-black leading-[1.05] tracking-[-0.03em] max-w-[800px] mt-4">
          {data.title}
        </h1>

        <p className="text-[clamp(16px,1.6vw,19px)] italic font-space text-black/60 max-w-[640px] leading-[1.65] mt-4 mb-10">
          {data.subtitle}
        </p>

        <div className="flex flex-wrap border-t border-white/10 pt-8">
          {data.industry && (
            <div className="pr-10 mr-10 border-r border-white/10">
              <div className="text-[11px] uppercase tracking-widest text-black/50 mb-1">Industry</div>
              <div className="text-black font-bold">{data.industry}</div>
            </div>
          )}

             <button onClick={handleDownloadClick} 
          className="bg-[#FF5C1A] text-white px-6 py-3 cursor-pointer hover:bg-orange-700 duration-300 ease-in-out transition-all  rounded-lg flex items-center gap-2">
            <IconDownload /> Get Full Case Study
          </button>
        </div>

      </div>
    </div>

    {/* BODY */}
    <div className="max-w-7xl mx-auto px-16 pt-16">

      {/* META */}
      <div className="grid grid-cols-3 bg-[#FAFAF8] font-space border border-black/10 rounded-xl overflow-hidden mb-20">
        <div className="p-6 border-r border-black/10">
          <div className="text-[11px] uppercase text-[#888] mb-2">Industry</div>
          <div className="font-bold">{data.industry}</div>
        </div>
        <div className="p-6 border-r border-black/10">
          <div className="text-[11px] uppercase text-[#888] mb-2">Scope</div>
          <div className="font-bold">{data?.scope?.join(", ")}</div>
        </div>
        <div className="p-6 border-r border-black/10">
          <div className="text-[11px] uppercase text-[#888] mb-2">Out Comes</div>
          <div className="font-bold">{data?.outcome}</div>
        </div>
      </div>

      {/* CHALLENGE */}
      {data.challenge && (
        <div className="mb-16  font-space">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[11px] font-extrabold text-[#FF5C1A]">01</span>
            <span className="w-5 h-[2px] bg-[#FF5C1A]" />
            <h2 className="text-2xl font-extrabold">The Challenge</h2>
          </div>

          <p className="text-[18px] leading-[1.85] text-[#444]">{data.challenge}</p>

          <div className="mt-6 p-6 bg-[#FFF1EB] border-l-4 border-[#FF5C1A] rounded-r-xl">
            <p className="italic">{data.challenge.split(".")[0]}</p>
          </div>
        </div>
      )}

      {/* SOLUTION */}
      {data.solution && (
        <div className="mb-16 font-space">
          <div className="flex items-center gap-3 mb-8">
            <span className="text-[11px] font-extrabold text-[#FF5C1A]">02</span>
            <span className="w-5 h-[2px] bg-[#FF5C1A]" />
            <h2 className="text-2xl font-extrabold">Our Solution</h2>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {data.solution.map((item: any, i: number) => (
              <div key={i} className="flex gap-3 p-5 bg-[#FAFAF8] border border-black/10 rounded-xl hover:bg-[#FFF1EB]">
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
        <div className="mb-16 font-space">
          <h2 className="text-2xl font-bold mb-8">Impact</h2>

          <div className="grid md:grid-cols-3 gap-5">
            {data.impact.map((item: any, i: number) => (
              <div key={i} className="relative p-6 bg-black text-white rounded-xl">
                <div className="text-[#FF5C1A] mb-2">{i + 1}</div>
                <div className="font-bold">{item.title}</div>
                <div className="text-white/60 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="bg-black text-white p-12 mb-10 font-space rounded-2xl flex flex-wrap justify-between gap-10">
        <div>
          <div className="text-[#FF5C1A] text-xs uppercase mb-2">✦ Full Deep-Dive</div>
          <h3 className="text-2xl font-bold">Get the Complete Case Study</h3>
          <p className="text-white/60">Download full PDF</p>
        </div>

        <div className="flex gap-3 items-center flex-col md:flex-row">
          <button onClick={handleDownloadClick} 
          className="bg-[#FF5C1A] px-6 py-3 cursor-pointer hover:bg-orange-700 duration-300 ease-in-out transition-all  rounded-lg flex items-center gap-2">
            <IconDownload /> Download
          </button>

          <Link href="/contact" className="border w-full md:w-auto text-center ease-in-out duration-300 border-white/40 hover:border-orange-500 hover:text-orange-500 px-6 py-3 rounded-lg">
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