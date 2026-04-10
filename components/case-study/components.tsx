import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

interface CaseStudy {
  slug: string;
  title: string;
  subTitle: string;
  industry: string;
  industryId: string;
  image: string;
  stat: { value: string; label: string };
  result: string;           // one sharp result sentence
  tags: string[];
  accentHex: string;
}



export const CASE_STUDIES: CaseStudy[] = [
  // Manufacturing
{
  slug: "AI_Supply_Chain_Case_Study_IOP",
  title: "End-to-end supply chain visibility with AI command center",
  subTitle: "AI-Powered Integrated Operations Platform (IOP) For a large manufacturing company",
  industry: "Manufacturing / Supply Chain",
  industryId: "manufacturing",
  image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&q=80&auto=format&fit=crop",
  stat: { value: "1", label: "Unified system across planning, logistics, and quality" },
  result: "Eliminated manual spreadsheets by connecting forecasting, logistics tracking, and quality workflows into a single real-time platform, enabling faster planning, proactive decision-making, and improved shipment and quality control.",
  tags: ["Manufacturing", "Supply Chain", "Logistics", "Quality Management"],
  accentHex: "#f97316",
},
 {
  slug: "Electronics_AI_Case_Study_Innovacio",
  title: "From reactive fixes to 94% failure prediction",
  subTitle: "Electronics Manufacturing Supply Chain",
  industry: "Manufacturing",
  industryId: "manufacturing",
  image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80&auto=format&fit=crop",
  stat: { value: "37%", label: "Downtime reduction" },
  result: "Achieved 94.3% failure prediction accuracy, reduced downtime by 37%, and improved OEE by 15% using AI-driven maintenance.",
  tags: ["Electronics", "Predictive Maintenance", "AI Supply Chain"],
  accentHex: "#f97316",
},
{
  slug: "Fashion_Clothing_Accessories_AI_Case_Study_Innovacio",
  title: "From stockouts and markdowns to balanced inventory",
  subTitle: "Sustainable Fashion & Accessories Manufacturing",
  industry: "Manufacturing",
  industryId: "manufacturing",
  image: "https://images.unsplash.com/photo-1675176785803-bffbbb0cd2f4?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  stat: { value: "£7B", label: "Return cost impact" },
  result: "Reduced stockouts, excess inventory, and return-driven losses using AI-powered demand forecasting, inventory optimization, and reverse logistics.",
  tags: ["Fashion Retail", "Inventory AI", "Sustainability", "Supply Chain"],
  accentHex: "#f97316",
},
{
  slug: "Beauty_Products_AI_Case_Study_Innovacio",
  title: "From fragmented operations to one AI-driven control layer",
  subTitle: "Beauty Products Manufacturing and Supply Chain",
  industry: "Manufacturing",
  industryId: "manufacturing",
  image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&auto=format&fit=crop",
  stat: { value: "SKU-level", label: "Demand forecasting" },
  result: "Unified forecasting, formulation, quality, and traceability into one AI layer—reducing stockouts, defects, and production inefficiencies.",
  tags: ["Beauty", "Demand Planning", "Quality AI"],
  accentHex: "#fb923c",
},
{
  slug: "Nutrition_Wellness_AI_Case_Study_Innovacio",
  title: "From fragmented supplier data to full traceability",
  subTitle: "Nutrition & Wellness Manufacturing",
  industry: "Manufacturing",
  industryId: "manufacturing",
  image: "https://images.unsplash.com/photo-1658387576587-059dc1748b59?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  stat: { value: "Lot-level", label: "Traceability" },
  result: "Connected suppliers, batches, and inventory into one AI system—improving recall readiness, sourcing decisions, and compliance visibility.",
  tags: ["Wellness", "Traceability", "Supplier Risk"],
  accentHex: "#f97316",
},
{
  slug: "Polyurethane_AI_Case_Study_Innovacio",
  title: "Reduced waste and improved batch quality through AI-driven supply chain control",
  subTitle: "AI-Powered Sustainable Polyurethane Manufacturing Control Tower",
  industry: "Chemical Manufacturing",
  industryId: "manufacturing",
  image: "https://images.unsplash.com/photo-1584677123777-742161156eb7?q=80&w=870&auto=format&fit=crop",
  stat: { value: "-25%", label: "Reduction in material waste and expiry risk" },
  result:
    "AI-powered control tower unified procurement, inventory, formulation, production, and sustainability data to reduce waste, improve batch consistency, enhance supplier reliability, and strengthen ESG compliance across polyurethane manufacturing operations.",
  tags: ["Chemical Manufacturing", "Supply Chain AI", "Sustainability"],
  accentHex: "#f97316",
},
{
  slug: "Automotive_AI_Case_Study",
  title: "From line disruptions to 87% less downtime",
  subTitle: "Automotive Manufacturing & Supply Chain",
  industry: "Automotive",
  industryId: "automotive",
  image: "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80&auto=format&fit=crop",
  stat: { value: "87.56%", label: "Downtime reduction" },
  result: "Improved production efficiency and reduced unplanned downtime using AI-powered digital twins and predictive maintenance.",
  tags: ["Automotive", "Predictive Maintenance", "Digital Twin"],
  accentHex: "#0ea5e9",
},
{
  slug: "Healthcare_AI_Case_Study_Detailed",
  title: "From inventory errors to 95%+ accuracy improvement",
  subTitle: "AI in Healthcare Operations and Supply Chain",
  industry: "Pharma & Healthcare",
  industryId: "pharma",
  image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80&auto=format&fit=crop",
  stat: { value: "95%+", label: "Error reduction" },
  result: "Reduced pharmacy inventory errors by over 95% and improved supply chain efficiency by 42% using AI-driven control systems.",
  tags: ["Healthcare", "Pharmacy AI", "Inventory Control"],
  accentHex: "#8b5cf6",
},
{
  slug: "AI_Pharmaceutical_Supply_Chain_Innovacio_Updated",
  title: "95%+ reduction in inventory error rate",
  subTitle: "AI in Pharmaceutical Supply Chain and Operations",
  industry: "Pharma & Healthcare",
  industryId: "pharma",
  image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80&auto=format&fit=crop",
  stat: { value: "0.025‰", label: "Inventory error rate (from 0.425‰)" },
  result: "AI-powered command center unified pharmacy, ERP, and warehouse data to drastically reduce inventory errors, improve purchasing accuracy, and increase supply-chain efficiency by over 40%.",
  tags: ["Pharma", "Inventory Optimization", "AI Forecasting"],
  accentHex: "#8b5cf6",
},
{
  slug: "Ecommerce_3PL_AI_Case_Study_Innovacio",
  title: "42.4% improvement in supply-chain efficiency",
  subTitle: "AI in E-commerce 3PL and Nationwide Fulfillment",
  industry: "Retail & E-commerce",
  industryId: "retail",
  image: "https://images.unsplash.com/photo-1553413077-190dd305871c?w=800&q=80&auto=format&fit=crop",
  stat: { value: "+42.4%", label: "Fulfillment efficiency gain" },
  result: "AI-powered synchronization of warehouse operations, demand forecasting, and dispatch reduced delays, improved SLA adherence, and significantly increased throughput across the fulfillment network.",
  tags: ["E-commerce", "3PL", "Fulfillment Optimization"],
  accentHex: "#6366f1",
},
{
  slug: "Seasonal_Decor_AI_Case_Study_Innovacio",
  title: "Reduced stockouts and excess inventory through AI-driven seasonal planning",
  subTitle: "AI-Powered Seasonal Décor Supply Chain Control Tower",
  industry: "Retail & Supply Chain",
  industryId: "retail",
  image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?q=80&w=1170&auto=format&fit=crop",
  stat: { value: "-35%", label: "Reduction in excess and aged inventory" },
  result:
    "AI-powered control tower unified demand forecasting, procurement, inventory aging, and warehouse execution to improve peak-season readiness, reduce stockouts, minimize post-season markdowns, and optimize fulfillment performance.",
  tags: ["Seasonal Retail", "Demand Forecasting", "Inventory Optimization"],
  accentHex: "#6366f1",
},
{
  slug: "Educational_Development_AI_Case_Study_Innovacio",
  title: "Reduced noncurrent inventory and improved retail replenishment through AI",
  subTitle: "AI-Powered Educational Publishing Supply Chain Control Tower",
  industry: "Publishing & Retail",
  industryId: "retail",
  image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=1170&auto=format&fit=crop",
  stat: { value: "$15M+", label: "Noncurrent inventory risk addressed" },
  result:
    "AI-powered control tower unified POS, supplier, and inventory data to improve demand forecasting, optimize procurement, enhance retailer replenishment, and reduce noncurrent inventory exposure across a large multi-title retail network.",
  tags: ["Retail Supply Chain", "Demand Forecasting", "Inventory Optimization"],
  accentHex: "#6366f1",
},
{
  slug: "AI_Powered_IOP_Food_Apparel_Textile_Case_Study_Updated",
  title: "Significant reduction in waste through AI-driven freshness control",
  subTitle: "AI-Powered Integrated Operations Platform for Food, Apparel, and Textile ",
  industry: "FMCG", 
  industryId: "fmcg",
  image: "https://images.unsplash.com/photo-1651525670033-279c26cc2347?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  stat: { value: "-30%", label: "Reduction in inventory waste" },
  result: "AI-powered forecasting, shelf-life tracking, and cold-chain visibility enabled early intervention on expiry risk, reduced spoilage, and improved planning accuracy across procurement and distribution.",
  tags: ["Food Supply Chain", "Forecasting", "Cold Chain"],
  accentHex: "#d97706",
},
{
  slug: "ColdChain_Perishable_3PL_AI_Case_Study_Innovacio",
  title: "Reduced spoilage and logistics costs through AI-driven cold-chain control",
  subTitle: "AI-Powered Cold Chain Fulfillment & Perishable 3PL Control Tower",
  industry: "FMCG",
  industryId: "fmcg",
  image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1170&auto=format&fit=crop",
  stat: { value: "-26%", label: "Reduction in cold-chain operating costs" },
  result:
    "AI-powered control tower unified demand, inventory, shelf-life, and sensor data to enable segment-level forecasting, reduce spoilage risk, improve delivery reliability, and optimize transport and procurement decisions across the cold-chain network.",
  tags: ["Cold Chain", "Perishable Logistics", "AI Forecasting"],
  accentHex: "#d97706",
},
{
  slug: "Lighting_Fixtures_Distribution_AI_Case_Study_Innovacio",
  title: "0.93 R² demand forecasting accuracy for project-based inventory",
  subTitle: "AI in Lighting & Fixtures Distribution for Construction Projects",
  industry: "Construction Supply Chain",
  industryId: "construction",
  image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format&fit=crop",
  stat: { value: "0.93", label: "Forecast accuracy (R²)" },
  result: "Improved project-based demand planning with AI forecasting, reducing stockouts, overstock, and expediting while aligning procurement with construction timelines.",
  tags: ["Construction", "Demand Forecasting", "Inventory Planning", "Supply Chain"],
  accentHex: "#008000 ",
},
];

export const INDUSTRIES = [
  { id: "all",           label: "All",              count: CASE_STUDIES.length },
  { id: "manufacturing", label: "Manufacturing",    count: CASE_STUDIES.filter(c=>c.industryId==="manufacturing").length },
  { id: "retail",        label: "Retail & E-commerce", count: CASE_STUDIES.filter(c=>c.industryId==="retail").length },
  { id: "fmcg",          label: "FMCG",             count: CASE_STUDIES.filter(c=>c.industryId==="fmcg").length },
  { id: "pharma",        label: "Pharma & Healthcare", count: CASE_STUDIES.filter(c=>c.industryId==="pharma").length },
  { id: "automotive",    label: "Automotive",       count: CASE_STUDIES.filter(c=>c.industryId==="automotive").length },
  { id: "construction",    label: "Construction",       count: CASE_STUDIES.filter(c=>c.industryId==="construction").length },
];

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
export function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, vis };
}

// ─── Single case study card ───────────────────────────────────────────────────
export function CaseStudyCard({ cs, index, selectCaseStudy, openModal }: 
  { 
    cs: CaseStudy; 
    index: number; 
    selectCaseStudy: (slug: string) => void; 
    openModal: () => void; 
  }){
  
  
    const { ref, vis } = useInView(0.08);

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.55s ${(index % 3) * 0.08}s ease-out, transform 0.55s ${(index % 3) * 0.08}s ease-out`,
      }}
    >
      <Link href={`/case-studies/${cs.slug}`}
        className="group flex flex-col bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-stone-200 hover:shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 h-full"
        style={{ boxShadow: `0 1px 8px rgba(0,0,0,0.04)` }}
      >
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <Image
            src={cs.image}
            alt={cs.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Dark gradient at bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: cs.accentHex }} />
          {/* Industry badge */}
          <div className="absolute top-3 left-3">
            <span
              className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-white/90 backdrop-blur-sm"
              style={{ color: cs.accentHex, borderColor: `${cs.accentHex}30` }}
            >
              {cs.industry}
            </span>
          </div>
          {/* Stat overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="font-mono text-2xl font-bold text-white leading-none" style={{ textShadow: "0 1px 4px rgba(0,0,0,0.4)" }}>
                {cs.stat.value}
              </span>
              <span className="text-[10px] text-white/70 leading-tight">{cs.stat.label}</span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="flex flex-col flex-1 p-5">
          {/* Subtitle */}
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-400 mb-2">
            {cs.subTitle}
          </p>
          {/* Title */}
          <h3 className="text-[15px] font-bold text-stone-900 leading-snug mb-3 group-hover:text-orange-600 transition-colors duration-200">
            {cs.title}
          </h3>
          {/* Result */}
          <p className="text-xs text-stone-500 font-light leading-relaxed flex-1 mb-4">
            {cs.result}
          </p>
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {cs.tags.map(t => (
              <span key={t} className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-stone-50 border border-stone-100 text-stone-500">
                {t}
              </span>
            ))}
          </div>
          {/* CTA */}
          <div
            className="flex items-center gap-1.5 text-[11px] font-semibold transition-all duration-200 group-hover:gap-2.5 w-fit"
            style={{ color: cs.accentHex }}
          >
            Read case study
            <svg viewBox="0 0 10 10" fill="none" className="w-3 h-3" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="5" x2="8" y2="5" /><polyline points="5.5 2.5 8 5 5.5 7.5" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ─── Featured case study (wide card) ─────────────────────────────────────────
export function FeaturedCard({ cs, openModal, selectCaseStudy }: 
  { cs: CaseStudy; 
    openModal: (open: boolean) => void,
    selectCaseStudy: any;
  }) {

  const { ref, vis } = useInView(0.08);

  return (
    <div
      ref={ref}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(20px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      <Link href={`/case-studies/${cs.slug}`}
        className="group grid md:grid-cols-[1.4fr_1fr] cursor-pointer text-left bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-stone-200 hover:shadow-xl transition-all duration-300"
        style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
      >
        {/* Image */}
        <div className="relative h-72 md:h-auto overflow-hidden">
          <Image src={cs.image} alt={cs.title} fill
            className="object-cover transition-transform duration-600 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 60vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-white/20 md:bg-gradient-to-r md:from-transparent md:to-white/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: cs.accentHex }} />
          <div className="absolute top-4 left-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border bg-white/90 backdrop-blur-sm"
              style={{ color: cs.accentHex, borderColor: `${cs.accentHex}30` }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: cs.accentHex }} />
              {cs.industry}
            </span>
          </div>
          {/* Big stat on image */}
          <div className="absolute bottom-4 left-4">
            <p className="font-mono text-4xl font-bold text-white leading-none drop-shadow-lg">{cs.stat.value}</p>
            <p className="text-xs text-white/70 mt-1">{cs.stat.label}</p>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col p-8 justify-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-400 mb-3">{cs.subTitle}</p>
          <h3 className="font-display text-[clamp(18px,2vw,26px)] font-extrabold text-stone-900 leading-tight tracking-tight mb-4 group-hover:text-orange-600 transition-colors duration-200">
            {cs.title}
          </h3>
          <p className="text-sm text-stone-500 font-light leading-relaxed mb-6">{cs.result}</p>
          <div className="flex flex-wrap gap-1.5 mb-6">
            {cs.tags.map(t => (
              <span key={t} className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-stone-50 border border-stone-100 text-stone-500">{t}</span>
            ))}
          </div>
          <div 
          className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3 w-fit"
            style={{ color: cs.accentHex }}>
            Read full case study
            <svg viewBox="0 0 12 12" fill="none" className="w-3.5 h-3.5" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <line x1="2" y1="6" x2="10" y2="6" /><polyline points="7 3 10 6 7 9" />
            </svg>
          </div>
        </div>
      </Link>
    </div>
  );
}

// ─── Industry filter tabs ─────────────────────────────────────────────────────
export function FilterTabs({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex items-center gap-1 flex-wrap">
      {INDUSTRIES.map(ind => (
        <button
          key={ind.id}
          onClick={() => onChange(ind.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 ${
            active === ind.id
              ? "bg-stone-900 text-white shadow-sm"
              : "bg-white border border-stone-200 text-stone-500 hover:border-stone-300 hover:text-stone-800"
          }`}
        >
          {ind.label}
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${
            active === ind.id ? "bg-white/20 text-white" : "bg-stone-100 text-stone-400"
          }`}>
            {ind.count}
          </span>
        </button>
      ))}
    </div>
  );
}

// ─── Aggregate proof strip ────────────────────────────────────────────────────
export function ProofStrip() {
  const { ref, vis } = useInView(0.1);
  const stats = [
    { value: "15", label: "Case studies published" },
    { value: "6",  label: "Industries covered" },
    { value: "307%", label: "Average 18-month ROI" },
    { value: "< 4 Weeks", label: "Avg. time to go-live" },
  ];
  
  return (
    <div
      ref={ref}
      className="grid grid-cols-2 md:grid-cols-4 divide-x divide-stone-100 border border-stone-100 rounded-2xl bg-white mb-16 overflow-hidden"
      style={{ boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
    >
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="flex flex-col items-center py-6 px-5 text-center"
          style={{
            opacity: vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(12px)",
            transition: `opacity 0.55s ${i * 0.08}s ease-out, transform 0.55s ${i * 0.08}s ease-out`,
          }}
        >
          <p className="font-display text-2xl font-extrabold text-orange-500 leading-none mb-1.5">{s.value}</p>
          <p className="text-[10px] text-stone-400 uppercase tracking-wide font-medium">{s.label}</p>
        </div>
      ))}
    </div>
  );
}