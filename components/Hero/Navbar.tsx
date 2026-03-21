"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/components/Modal/ModalProvider";

const LINKS = [
  { label: "Product",      href: "#product"      },
  { label: "Industries",   href: "/industries"   },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Contact",      href: "#contact"      },
];

function LogoMark() {
  return (
    <div className="relative w-8 h-8 flex-shrink-0">
      <svg viewBox="0 0 32 32" className="absolute inset-0 w-full h-full"
        style={{ animation: "nav-spin 9s linear infinite" }}>
        <circle cx="16" cy="16" r="13" fill="none"
          stroke="#fed7aa" strokeWidth="1.5"
          strokeDasharray="4 3.5" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-[5px] rounded-full bg-orange-500 flex items-center justify-center">
        <svg viewBox="0 0 14 14" fill="none" className="w-3.5 h-3.5 text-white"
          stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M5.5 7.5a2.5 2.5 0 003 0l1.5-1.5a2.5 2.5 0 00-3.5-3.5L5 4" />
          <path d="M8.5 6.5a2.5 2.5 0 00-3 0L4 8a2.5 2.5 0 003.5 3.5L9 10" />
        </svg>
      </div>
      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white animate-pulse" />
    </div>
  );
}

function ActiveIndicator({ containerRef, activeIdx }: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeIdx: number;
}) {
  const [style, setStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container || activeIdx < 0) {
      setStyle(s => ({ ...s, opacity: 0 }));
      return;
    }
    const links = container.querySelectorAll("[data-navlink]");
    const el = links[activeIdx] as HTMLElement;
    if (!el) return;
    const cRect = container.getBoundingClientRect();
    const eRect = el.getBoundingClientRect();
    setStyle({ left: eRect.left - cRect.left, width: eRect.width, opacity: 1 });
  }, [activeIdx, containerRef]);

  return (
    <div
      className="absolute bottom-0 h-[2.5px] rounded-full bg-orange-400 pointer-events-none"
      style={{
        left: style.left, width: style.width, opacity: style.opacity,
        transition: "left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.2s",
      }}
    />
  );
}

export default function Navbar() {
  const [scrolled,  setScrolled ] = useState(false);
  const [progress,  setProgress ] = useState(0);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [menuOpen,  setMenuOpen ] = useState(false);
  const [mounted,   setMounted  ] = useState(false);
  const [ctaHover,  setCtaHover ] = useState(false);
  const [hidden,    setHidden   ] = useState(false);
  const linksRef    = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const doc       = document.documentElement;
      const currentY  = window.scrollY;
      const maxScroll = doc.scrollHeight - doc.clientHeight;

      // Progress — standalone calculation, nothing can interfere
      setProgress(maxScroll > 0 ? (currentY / maxScroll) * 100 : 0);

      // Hide / show
      if (currentY > lastScrollY.current && currentY > 80) {
        setHidden(true);
        setMenuOpen(false);
      } else {
        setHidden(false);
      }
      lastScrollY.current = currentY;

      setScrolled(currentY > 20);

      // Active section
      let found = -1;
      LINKS.forEach(({ href }, i) => {
        const el = document.getElementById(href.replace("#", ""));
        if (el && el.getBoundingClientRect().top <= 90) found = i;
      });
      setActiveIdx(found);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount (handles page refresh mid-scroll)
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };
  const modal = useModal();

  return (
    <>
 
      <div
        aria-hidden="true"
        style={{
          position:      "fixed",
          top:           0,
          left:          0,
          right:         0,
          height:        "2px",
          zIndex:        99999,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            height:       "100%",
            width:        `${progress}%`,
            background:   "linear-gradient(90deg, #ea580c, #f97316, #fb923c)",
            boxShadow:    "0 0 8px rgba(249,115,22,0.5)",
            borderRadius: "0 2px 2px 0",
            transition:   "width 0.08s linear",
            willChange:   "width",
          }}
        />
      </div>

      {/* ── HEADER ─────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 md:px-8"
        style={{
          paddingTop: scrolled ? "10px" : "0px",
          transition: "padding-top 0.4s ease",
        }}
      >
        <nav
          className="w-full max-w-5xl"
          style={{
            opacity:    mounted ? 1 : 0,
            transform:  mounted
              ? hidden ? "translateY(-110%)" : "translateY(0)"
              : "translateY(-16px)",
            transition: "opacity 0.5s ease-out, transform 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <div
            className={`
              relative flex items-center justify-between transition-all duration-500
              ${scrolled
                ? "px-4 md:px-6 h-14 rounded-2xl border border-stone-200/90 shadow-xl shadow-stone-100/70"
                : "px-0 md:px-2 h-16 rounded-none border-b border-stone-100"
              }
            `}
            style={{
              background:     scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.80)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 select-none">
              <LogoMark />
              <div className="leading-none">
                <div className="font-display text-lg font-extrabold text-stone-900 tracking-tight">
                  Innovacio
                </div>
                <div className="text-[10px] font-semibold text-orange-500 tracking-[0.15em] uppercase mt-0.5">
                  AI in Supply Chain
                </div>
              </div>
            </a>

            {/* Desktop links */}
            <div ref={linksRef} className="hidden md:flex items-center gap-0.5 relative pb-[1px]">
              <ActiveIndicator containerRef={linksRef} activeIdx={activeIdx} />
              {LINKS.map((link, i) => (
                <Link
                  key={link.href}

                  href={link.href}
                  className={`
                    relative px-4 py-2 text-[13.5px] font-medium rounded-lg
                    transition-colors duration-200 cursor-pointer
                    ${activeIdx === i
                      ? "text-stone-900"
                      : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
                    }
                  `}
                >
                  {link.label}
                </ Link>
              ))}
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2.5">
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-50 border border-stone-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-medium text-stone-500 whitespace-nowrap">
                  Your data stays on your servers
                </span>
              </div>

              <button
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => setCtaHover(false)}
                onClick={() => modal.open("demo")}
                className="relative hidden md:flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-semibold overflow-hidden transition-all duration-200 shadow-md shadow-orange-200 hover:shadow-lg hover:shadow-orange-300 hover:-translate-y-px active:translate-y-0"
              >
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(105deg,transparent 35%,rgba(255,255,255,0.22) 50%,transparent 65%)",
                    transform:  ctaHover ? "translateX(200%)" : "translateX(-200%)",
                    transition: "transform 0.55s ease",
                  }}
                />
                <span className="relative">Book a demo</span>
                <svg viewBox="0 0 13 13" fill="none"
                  className="relative w-3 h-3 transition-transform duration-200"
                  style={{ transform: ctaHover ? "translateX(2px)" : "none" }}
                  stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6.5" x2="11" y2="6.5" />
                  <polyline points="7.5 3 11 6.5 7.5 10" />
                </svg>
              </button>

              <button onClick={() => modal.open("demo")} className="md:hidden px-4 py-2 rounded-xl bg-orange-500 text-white text-[13px] font-semibold shadow-md shadow-orange-200">
                Demo
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                aria-label="Menu"
              >
                {[0, 1, 2].map((i) => (
                  <span key={i}
                    className="block h-[1.5px] bg-stone-700 rounded-full transition-all duration-300 origin-center"
                    style={{
                      width:   i === 1 && menuOpen ? "0px" : i === 1 ? "14px" : "18px",
                      opacity: i === 1 && menuOpen ? 0 : 1,
                      transform: menuOpen
                        ? i === 0 ? "rotate(45deg) translate(2px, 3px)"
                        : i === 2 ? "rotate(-45deg) translate(2px, -3px)"
                        : "none"
                        : "none",
                    }}
                  />
                ))}
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <div
            className="md:hidden mt-1.5 rounded-2xl bg-white border border-stone-200 shadow-xl shadow-stone-100/60 overflow-hidden"
            style={{
              maxHeight:  menuOpen ? "300px" : "0px",
              opacity:    menuOpen ? 1 : 0,
              transform:  menuOpen ? "scale(1) translateY(0)" : "scale(0.98) translateY(-6px)",
              transition: "max-height 0.3s ease, opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            <div className="p-3 flex flex-col gap-1">
              {LINKS.map((link, i) => (
                <button key={link.href} onClick={() => go(link.href)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left w-full
                    transition-colors duration-150
                    ${activeIdx === i
                      ? "bg-orange-50 text-orange-600 border border-orange-100"
                      : "text-stone-600 hover:bg-stone-50"
                    }
                  `}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeIdx === i ? "bg-orange-400" : "bg-stone-200"}`} />
                  {link.label}
                </button>
              ))}
              <div className="pt-2 mt-1 border-t border-stone-100">
                <button onClick={() => { modal.open("demo"); setMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold">
                  Book a demo
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <style>{`
        @keyframes nav-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}