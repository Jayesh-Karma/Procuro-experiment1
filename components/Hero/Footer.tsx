"use client";

import gsap from "gsap";
import { ArrowRight, Link2 } from "lucide-react";
import Link from "next/link";
import { useModal } from "@/components/Modal/ModalProvider";
import { useEffect, useRef, useState } from "react";

// ─── Links ────────────────────────────────────────────────────────────────
const PRODUCT_LINKS = [
  { label: "Command Center",     href: "#product"      },
  { label: "Demand Forecasting", href: "#product"      },
  { label: "Inventory & WMS",    href: "#product"      },
  { label: "AI Assistant",       href: "#product"      },
  { label: "Integrations",       href: "#product"      },
];

const INDUSTRIES_LINKS = [
  { label: "Manufacturing",      href: "#industries"   },
  { label: "Retail & E-commerce",href: "#industries"   },
  { label: "Pharma & Healthcare",href: "#industries"   },
  { label: "Food & Beverage",    href: "#industries"   },
  { label: "Automotive",         href: "#industries"   },
];

const COMPANY_LINKS = [
  { label: "How it Works",       href: "#how-it-works" },
  { label: "Customer Stories",   href: "#reviews"      },
  { label: "Privacy Policy",     href: "/privacy"      },
  { label: "Terms of Use",       href: "/terms"        },
  { label: "Contact Us",         href: "#contact"      },
];

// ─── Scroll reveal ─────────────────────────────────────────────────────────
function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, vis };
}

// ─── Spinning logo mark ────────────────────────────────────────────────────
function FooterLogoMark() {
  return (
    <div className="relative w-12 h-12 flex-shrink-0">
      <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full"
        style={{ animation: "footer-spin 10s linear infinite" }}>
        <circle cx="20" cy="20" r="17" fill="none"
          stroke="#fed7aa" strokeWidth="1.5"
          strokeDasharray="5 4" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-[5px] rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-300/40">
         <Link2 className=" -rotate-45" />
      </div>
    </div>
  );
}

// ─── Link column ───────────────────────────────────────────────────────────
function LinkCol({ title, links }: { title: string; links: typeof PRODUCT_LINKS }) {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400">
        {title}
      </p>
      <div className="flex flex-col gap-2.5">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            className="text-sm text-stone-500 hover:text-orange-500 transition-colors duration-150 w-fit"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

// ─── Main footer ───────────────────────────────────────────────────────────
export default function Footer() {
  const { ref, vis } = useInView();
  const [email, setEmail] = useState("");
  const [sent,  setSent ] = useState(false);
  const modal = useModal();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSent(true); setEmail(""); }
  };

     const iconRef = useRef(null);
  const handleHover = () => {
  const el = iconRef.current;

  gsap.timeline()
    .to(el, {
      x: 8,
      opacity: 0,
      duration: 0.15,
      ease: "power2.out",
    })
    .set(el, {
      x: -8,
      opacity: 0,
    })
    .to(el, {
      x: 0,
      opacity: 1,
      duration: 0.25,
      ease: "power2.out",
    });
};



  return (
    <footer className="relative bg-stone-950 text-white overflow-hidden">

      {/* ── Background texture ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* ── Orange top glow ── */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(249,115,22,0.14) 0%, transparent 70%)" }}
      />

      {/* ── Top border accent ── */}
      <div className="absolute top-0 left-0 right-0 h-[1px]"
        style={{ background: "linear-gradient(90deg, transparent, rgba(249,115,22,0.5) 40%, rgba(249,115,22,0.5) 60%, transparent)" }}
      />

      <div
        ref={ref}
        className="relative max-w-7xl mx-auto px-6 md:px-12"
      >

        {/* ══ TOP BLOCK ══════════════════════════════════════════════════ */}
        <div
          className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_1fr] gap-12 pt-16 pb-14"
          style={{
            opacity:   vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
          }}
        >

          {/* Brand block */}
          <div className="flex flex-col gap-5 max-w-[300px]">
            <div className="flex items-center gap-3">
              <FooterLogoMark />
              <div className="leading-none">
                <div className="font-display text-[20px] font-bold text-white tracking-tight">
                    Innovacio
                </div>
                <div className="text-xs font-semibold text-orange-400 tracking-[0.14em] uppercase mt-0.5">
                AI in Supply Chain
                </div>
              </div>
            </div>

            <p className="text-sm text-stone-400 font-light leading-relaxed">
              The AI-powered supply chain platform that connects to your existing systems and helps you predict demand, eliminate stockouts, and reduce operational costs.
            </p>

            {/* Status indicator */}
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-stone-500">All systems operational</span>
            </div>

            <Link href={"https://innovaciotechnologies.com/"}  target="_blank" className=" font-bold tracking-wider whitespace-nowrap uppercase text-sm lg:text-lg hover:text-orange-500 duration-200 ease-in-out transition-all">
              Innovacio Technologies Pvt ltd.
            </Link>

            {/* Social proof numbers */}
            <div className="flex gap-5 pt-1">
              {[
                { value: "307%",  label: "Avg. ROI" },
                { value: "< 5d",  label: "To go-live" },
                { value: "4.9★",  label: "Rating" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-0.5">
                  <span className="font-display text-base font-extrabold text-white leading-none">
                    {s.value}
                  </span>
                  <span className="text-[9px] text-stone-500">{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <LinkCol title="Product"    links={PRODUCT_LINKS}    />
          <LinkCol title="Industries" links={INDUSTRIES_LINKS} />
          <LinkCol title="Company"    links={COMPANY_LINKS}    />
        </div>

        {/* ══ CTA STRIP ══════════════════════════════════════════════════ */}
        <div
          className="relative rounded-2xl overflow-hidden mb-10"
          style={{
            opacity:   vis ? 1 : 0,
            transform: vis ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.7s 0.15s ease-out, transform 0.7s 0.15s ease-out",
          }}
        >
          {/* CTA card bg */}
          <div className="absolute inset-0 bg-stone-900 border border-stone-800 rounded-2xl" />
          <div
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 60% 50%, rgba(249,115,22,0.1) 0%, transparent 65%)" }}
          />

          <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 px-7 py-6">
            <div>
              <p className="font-display text-base font-bold text-white mb-0.5">
                See it work on your data.
              </p>
              <p className="text-sm text-stone-400 font-light">
                30-minute demo. No commitment. No setup required.
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <button  onMouseEnter={handleHover} onClick={() => modal.open("demo")} className="group cursor-pointer relative overflow-hidden flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-all duration-200 shadow-lg shadow-orange-900/30 hover:-translate-y-px">
               
                Book a free demo
                <ArrowRight ref={iconRef} className="w-4 h-4 text-white" />
              </button>
                <button onClick={() => modal.open("contact")} className="text-sm text-stone-400 hover:text-white transition-colors duration-150">
                  or contact us
                </button>
            </div>
          </div>
        </div>

        {/* ══ DIVIDER + BOTTOM ═══════════════════════════════════════════ */}
        <div
          className="border-t border-stone-800/60 py-6"
          style={{
            opacity:   vis ? 1 : 0,
            transition: "opacity 0.7s 0.25s ease-out",
          }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Left — backed by + copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
              <p className="text-[11px] text-stone-600">
                © {new Date().getFullYear()} Innovacio Technologies Pvt. Ltd. All rights reserved.
              </p>
              <span className="hidden sm:block w-px h-3 bg-stone-700" />
              {/* Backed by badge */}
              <Link href={'https://www.innovaciotechnologies.com/'} target="_blank" className="flex items-center hover:shadow-sm hover:shadow-orange-300 duration-300 ease-in-out transition-all gap-2 px-3 py-1.5 rounded-full border border-stone-800 bg-stone-900/60">
                <div className="bg-white rounded-full overflow-hidden">
                <img src="./company_logo.png" alt="Innovacio" className="w-6 p-1 h-6 rounded-full" />
                </div>
                <span className="text-[10px] text-stone-500">
                  Backed by{" "}
                  <span className="text-stone-300 font-medium">Innovacio Technologies</span>
                </span>
              </Link>
            </div>

            {/* Right — legal links + theme */}
            {/* <div className="flex items-center gap-4">
              {["Privacy", "Terms", "Security"].map((l) => (
                <a
                  key={l}
                  href={`/${l.toLowerCase()}`}
                  className="text-[11px] text-stone-600 hover:text-stone-400 transition-colors"
                >
                  {l}
                </a>
              ))}
              <span className="w-px h-3 bg-stone-800" />
              
              <div className="flex items-center gap-1.5">
                <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3 text-emerald-500" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 1l4.5 2v3c0 2.8-2.1 4.5-4.5 5.1C1.5 10.5-.5 8.8-.5 6V3z" transform="translate(1,0)" />
                  <polyline points="3.5 6 5.5 8 9 4" />
                </svg>
                <span className="text-[10px] text-stone-600">Your data is safe</span>
              </div>
            </div> */}
          </div>
        </div>

      </div>

      <style>{`
        @keyframes footer-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </footer>
  );
}