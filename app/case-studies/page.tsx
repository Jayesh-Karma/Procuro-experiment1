"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// ─── Data ────────────────────────────────────────────────────────────────────
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

const CASE_STUDIES: CaseStudy[] = [
  // Manufacturing
  {
    slug: "automotive-manufacturing",
    title: "From 5 stoppages a quarter to zero",
    subTitle: "Tier-2 Automotive Component Supplier",
    industry: "Manufacturing",
    industryId: "manufacturing",
    image: "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=800&q=80&auto=format&fit=crop",
    stat: { value: "0", label: "Unplanned stoppages" },
    result: "Eliminated production line stoppages and cut emergency procurement spend by 22% in 90 days.",
    tags: ["Automotive Mfg", "Supplier Risk", "Procurement AI"],
    accentHex: "#f97316",
  },
  {
    slug: "electronics-manufacturing",
    title: "₹40L in spot market spend reduced to near zero",
    subTitle: "EMS & PCB Assembly Manufacturer",
    industry: "Manufacturing",
    industryId: "manufacturing",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&auto=format&fit=crop",
    stat: { value: "↓96%", label: "Emergency spend" },
    result: "Extended component planning horizon from 4 weeks to 26 weeks. BOM cascade analysis in 20 seconds.",
    tags: ["Electronics Mfg", "BOM Planning", "Long Lead Times"],
    accentHex: "#f97316",
  },
  {
    slug: "machinery-equipment",
    title: "₹1.8Cr dead stock. Zero emergency escalations.",
    subTitle: "Industrial Machinery OEM & Spare Parts",
    industry: "Manufacturing",
    industryId: "manufacturing",
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80&auto=format&fit=crop",
    stat: { value: "₹1.1Cr", label: "Capital recovered" },
    result: "Eliminated 23 quarterly spare part emergencies and recovered ₹1.1Cr in dead stock within 4 months.",
    tags: ["Machinery & Equipment", "Spare Parts", "Intermittent Demand"],
    accentHex: "#f97316",
  },
  {
    slug: "chemical-manufacturing",
    title: "Audit prep: 14 days → 8 minutes",
    subTitle: "Specialty Chemical & Coatings Manufacturer",
    industry: "Manufacturing",
    industryId: "manufacturing",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80&auto=format&fit=crop",
    stat: { value: "Day 58", label: "Probation lifted" },
    result: "Lifted customer probation 32 days early. Full lot traceability for any batch in 30 seconds.",
    tags: ["Chemical Mfg", "Batch Traceability", "Compliance"],
    accentHex: "#f97316",
  },
  // Retail
  {
    slug: "ecommerce-platform",
    title: "99.1% in-stock rate through peak season",
    subTitle: "Pure-Play E-commerce Brand",
    industry: "Retail & E-commerce",
    industryId: "retail",
    image: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&auto=format&fit=crop",
    stat: { value: "99.1%", label: "Peak in-stock rate" },
    result: "Zero stockouts during peak season for the first time. Multi-channel sync eliminated all overselling incidents.",
    tags: ["E-commerce", "Demand Forecasting", "Multi-Channel"],
    accentHex: "#6366f1",
  },
  {
    slug: "retail-chains",
    title: "24 stores. One AI plan. Each store finally right.",
    subTitle: "Multi-Store Retail Chain",
    industry: "Retail & E-commerce",
    industryId: "retail",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80&auto=format&fit=crop",
    stat: { value: "↑18%", label: "Store fill rate" },
    result: "Store-level AI forecasting replaced broken national averages. Dead stock recovered across 24 locations.",
    tags: ["Retail Chains", "Store Forecasting", "Inter-Store Transfers"],
    accentHex: "#6366f1",
  },
  {
    slug: "dtc-brands",
    title: "Zero stockouts in the last two campaigns",
    subTitle: "Direct-to-Consumer Fashion Brand",
    industry: "Retail & E-commerce",
    industryId: "retail",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80&auto=format&fit=crop",
    stat: { value: "↓28%", label: "Post-campaign overstock" },
    result: "Campaign-aware procurement model eliminated stockouts and post-campaign deep discounting simultaneously.",
    tags: ["DTC Brands", "Campaign Planning", "New SKU Forecasting"],
    accentHex: "#6366f1",
  },
  // FMCG
  {
    slug: "packaged-foods",
    title: "₹3M in seasonal write-offs — eliminated",
    subTitle: "Regional FMCG Distributor",
    industry: "FMCG",
    industryId: "fmcg",
    image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80&auto=format&fit=crop",
    stat: { value: "↑50%", label: "Seasonal accuracy" },
    result: "FEFO enforcement and AI seasonal planning ended 3 years of consistent overstock-driven write-offs.",
    tags: ["Packaged Foods", "FEFO", "Seasonal Planning"],
    accentHex: "#d97706",
  },
  {
    slug: "beverages",
    title: "First summer without a single emergency order",
    subTitle: "Regional Beverage Distributor",
    industry: "FMCG",
    industryId: "fmcg",
    image: "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800&q=80&auto=format&fit=crop",
    stat: { value: "↓67%", label: "Emergency procurement" },
    result: "Weather-signal integrated forecasting triggered pre-orders 8 weeks before the heat wave. No reactive buying.",
    tags: ["Beverages", "Weather Forecasting", "Seasonal Planning"],
    accentHex: "#d97706",
  },
  {
    slug: "personal-care",
    title: "New SKU launch accuracy: guesswork → data",
    subTitle: "Personal Care & Beauty Brand",
    industry: "FMCG",
    industryId: "fmcg",
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80&auto=format&fit=crop",
    stat: { value: "↓25%", label: "Launch overstock" },
    result: "Analogue forecasting for new SKUs and campaign cap model eliminated the stockout-overstock cycle.",
    tags: ["Personal Care", "New SKU Forecasting", "Campaign Planning"],
    accentHex: "#d97706",
  },
  {
    slug: "household-products",
    title: "200+ distributors. Finally visible in real time.",
    subTitle: "Household Products FMCG Company",
    industry: "FMCG",
    industryId: "fmcg",
    image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80&auto=format&fit=crop",
    stat: { value: "↑18%", label: "Distributor fill rate" },
    result: "Sell-out visibility across 200+ distributors replaced sell-in guesswork. Route gaps now detected in hours.",
    tags: ["Household Products", "Distributor Visibility", "Route-to-Market"],
    accentHex: "#d97706",
  },
  // Pharma
  {
    slug: "api-manufacturers",
    title: "Full lot traceability in 35 seconds. Auditor's words.",
    subTitle: "API Manufacturer",
    industry: "Pharma & Healthcare",
    industryId: "pharma",
    image: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80&auto=format&fit=crop",
    stat: { value: "8min", label: "Audit report (was 14 days)" },
    result: "End-to-end lot traceability to supplier CoA. Corrective action closed in 35 days. Documentation time ↓85%.",
    tags: ["API Manufacturing", "Lot Traceability", "Compliance"],
    accentHex: "#8b5cf6",
  },
  {
    slug: "formulation-companies",
    title: "500+ SKUs. Zero missed expiry alerts.",
    subTitle: "Pharmaceutical Formulation Company",
    industry: "Pharma & Healthcare",
    industryId: "pharma",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&q=80&auto=format&fit=crop",
    stat: { value: "2hrs", label: "Audit prep (was 2 weeks)" },
    result: "FEFO enforced at scale. Zero FEFO violations. Audit preparation reduced from 2 weeks to 2 hours.",
    tags: ["Formulation", "FEFO Enforcement", "Batch Compliance"],
    accentHex: "#8b5cf6",
  },
  {
    slug: "biotech-biologics",
    title: "₹2.4Cr in batch write-offs — prevented",
    subTitle: "Biopharmaceutical Distributor",
    industry: "Pharma & Healthcare",
    industryId: "pharma",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80&auto=format&fit=crop",
    stat: { value: "8min", label: "Cold chain breach detection" },
    result: "Real-time cold chain monitoring with 8-minute breach alerts. Zero undetected excursions in 6 months.",
    tags: ["Biotech & Biologics", "Cold Chain", "IoT Monitoring"],
    accentHex: "#8b5cf6",
  },
  // Automotive
  {
    slug: "oem-assembly",
    title: "Zero line stoppages. Six months running.",
    subTitle: "Automotive OEM & Assembly Plant",
    industry: "Automotive",
    industryId: "automotive",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop",
    stat: { value: "0", label: "Unplanned stoppages" },
    result: "Multi-tier Tier-2/3 supplier risk tracking made previously invisible delays visible — weeks before impact.",
    tags: ["OEM Assembly", "Supplier Risk", "JIT Planning"],
    accentHex: "#0ea5e9",
  },
  {
    slug: "tier1-suppliers",
    title: "Planning horizon: 48 hours → 6 weeks",
    subTitle: "Tier-1 Automotive Component Supplier",
    industry: "Automotive",
    industryId: "automotive",
    image: "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80&auto=format&fit=crop",
    stat: { value: "↓22%", label: "Emergency procurement" },
    result: "Independent demand model decoupled raw material planning from OEM call-off delays. First quarter without panic buying.",
    tags: ["Tier-1 Suppliers", "OEM Planning", "Safety Stock AI"],
    accentHex: "#0ea5e9",
  },
  {
    slug: "automotive-aftermarket",
    title: "10,000 spare parts. Finally planned correctly.",
    subTitle: "Automotive Aftermarket Distributor",
    industry: "Automotive",
    industryId: "automotive",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80&auto=format&fit=crop",
    stat: { value: "₹1.1Cr", label: "Dead stock recovered" },
    result: "Intermittent demand AI (Croston's method) eliminated 23 emergency escalations and freed ₹1.1Cr in dead stock.",
    tags: ["Aftermarket", "Spare Parts", "Intermittent Demand"],
    accentHex: "#0ea5e9",
  },
];

const INDUSTRIES = [
  { id: "all",           label: "All",              count: CASE_STUDIES.length },
  { id: "manufacturing", label: "Manufacturing",    count: CASE_STUDIES.filter(c=>c.industryId==="manufacturing").length },
  { id: "retail",        label: "Retail & E-commerce", count: CASE_STUDIES.filter(c=>c.industryId==="retail").length },
  { id: "fmcg",          label: "FMCG",             count: CASE_STUDIES.filter(c=>c.industryId==="fmcg").length },
  { id: "pharma",        label: "Pharma & Healthcare", count: CASE_STUDIES.filter(c=>c.industryId==="pharma").length },
  { id: "automotive",    label: "Automotive",       count: CASE_STUDIES.filter(c=>c.industryId==="automotive").length },
];

// ─── Scroll reveal hook ──────────────────────────────────────────────────────
function useInView(threshold = 0.1) {
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
function CaseStudyCard({ cs, index }: { cs: CaseStudy; index: number }) {
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
      <Link
        target="_blank"
        href={`/case-studies/${cs.slug}.pdf`}
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
function FeaturedCard({ cs }: { cs: CaseStudy }) {
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
      <Link
        target="_blank"
        href={`/case-studies/${cs.slug}.pdf`}
        className="group grid md:grid-cols-[1.4fr_1fr] bg-white border border-stone-100 rounded-2xl overflow-hidden hover:border-stone-200 hover:shadow-xl transition-all duration-300"
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
          <div className="flex items-center gap-2 text-sm font-semibold transition-all duration-200 group-hover:gap-3 w-fit"
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
function FilterTabs({
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
function ProofStrip() {
  const { ref, vis } = useInView(0.1);
  const stats = [
    { value: "17", label: "Case studies published" },
    { value: "5",  label: "Industries covered" },
    { value: "307%", label: "Average 18-month ROI" },
    { value: "< 5d", label: "Avg. time to go-live" },
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
            {featured && <FeaturedCard cs={featured} />}

            {/* Grid of remaining */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rest.map((cs, i) => (
                  <CaseStudyCard key={cs.slug} cs={cs} index={i} />
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
    </div>
  );
}