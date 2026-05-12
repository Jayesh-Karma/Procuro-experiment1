"use client";

import { ArrowRight, Hamburger, Link2, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useModal } from "@/components/Modal/ModalProvider";
import { usePathname } from "next/navigation";
import Image from "next/image";

const LINKS = [
  { label: "Product",      href: "/product"      },
  { label: "Case Studies",    href: "/case-studies"   },
  { label: "Industries",   href: "/industries"   },
  { label: "How it Works", href: "/how-it-works" },
  { label: "Contact",      href: "/contact"      },
];

function LogoMark() {
  return (
   <div className="relative w-12 h-12 flex-shrink-0">
      <svg viewBox="0 0 40 40" className="absolute inset-0 w-full h-full"
        style={{ animation: "footer-spin 10s linear infinite" }}>
        <circle cx="20" cy="20" r="17" fill="none"
          stroke="#fed7aa" strokeWidth="1.5"
          strokeDasharray="5 4" strokeLinecap="round" />
      </svg>
      <div className="absolute inset-[5px] rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-300/40">
         <Link2 className=" -rotate-45 text-white" />
      </div>
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
  const pathname = usePathname();

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
          className="w-full max-w-7xl"
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
                ? "px-4 md:px-6 h-14 rounded-2xl shadow-md "
                : "px-0 md:px-2 h-16 rounded-none shadow-none"
              }
            `}
            style={{
              background:     scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.80)",
              // backdropFilter: "blur(20px)",
            }}
          >
            {/* Logo */}
             <a href="/" className="flex items-center gap-3">
              <Image src="/Innovacio.png" alt="Logo" width={40} height={40} className="rounded-full" />
              <div className=" leading-none">
                <div className="font-display leading-none text-sm font-bold text-black uppercase tracking-wide">
                    Innovacio IQ
                </div>
                <div className="text-xs  leading-none text-orange-400 tracking-[0.14em] uppercase mt-0.5">
                AI in Supply Chain
                </div>
              </div>
            </a>
            
            {/* Desktop links */}
            <div ref={linksRef} className="hidden md:flex items-center gap-0.5 relative pb-[1px]">
       
              {LINKS.map((link, i) => (
                <Link
                  key={link.href}

                  href={link.href}
                  className={`
                    relative px-4 py-2 text-[13.5px] font-medium rounded-lg
                    transition-colors duration-200 cursor-pointer
                    ${pathname === link.href
                      ? "text-orange-500"
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

              <Link
                onMouseEnter={() => setCtaHover(true)}
                onMouseLeave={() => setCtaHover(false)}
                href={"/demo"}
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
                <span className="relative">See a demo</span>
                <svg viewBox="0 0 13 13" fill="none"
                  className="relative w-3 h-3 transition-transform duration-200"
                  style={{ transform: ctaHover ? "translateX(2px)" : "none" }}
                  stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="2" y1="6.5" x2="11" y2="6.5" />
                  <polyline points="7.5 3 11 6.5 7.5 10" />
                </svg>
              </Link>

              {/* <Link href={"/demo"} className="md:hidden px-4 py-2 rounded-xl bg-orange-500 text-white text-[13px] font-semibold shadow-md shadow-orange-200">
                Demo
              </Link> */}

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-stone-100 transition-colors"
                aria-label="Menu"
              >
               {
                !menuOpen ? <Menu size={20} /> : <X size={20} />
               }
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <div
            className="md:hidden mt-1.5 rounded-2xl bg-white border border-stone-200 shadow-md shadow-black/10 overflow-hidden"
            style={{
              maxHeight:  menuOpen ? "500px" : "0px",
              opacity:    menuOpen ? 1 : 0,
              transform:  menuOpen ? "scale(1) translateY(0)" : "scale(0.98) translateY(-6px)",
              transition: "max-height 0.3s ease, opacity 0.25s ease, transform 0.25s ease",
            }}
          >
            <div className="p-3 flex flex-col gap-1">
              {LINKS.map((link, i) => (
                <Link href={link.href} 
                  onClick={() => setMenuOpen(!menuOpen)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-left w-full
                    transition-colors duration-150
                    ${activeIdx === i
                      ? "bg-orange-50 text-orange-600 border border-orange-100"
                      : "text-stone-600 hover:bg-stone-50"
                    }
                  `}
                >
                  <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${pathname === link.href ? "bg-orange-400" : "bg-stone-200"}`} />
                  {link.label}
                </Link>
              ))}
              <div className="pt-2 mt-1 border-t border-stone-100">
                <button onClick={() => { modal.open("demo"); setMenuOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white text-sm font-semibold">
                  Try Free Demo
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