"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Solutions", href: "#solutions" },
  { label: "Industries", href: "#industries" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-12 h-16 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-stone-100 shadow-sm shadow-stone-100/60"
          : "bg-transparent"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 bg-orange-500/80  px-2 py-1 rounded-lg">
        {/* <div className="relative">
          <div className="w-7 h-7 rounded-lg bg-orange-500 flex items-center justify-center shadow-md shadow-orange-200">
            <span className="text-white text-sm font-bold font-display">O</span>
          </div>
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-400 ring-2 ring-white animate-pulse" />
        </div> */}
        <span className="font-display text-lg font-bold font-sans text-white tracking-tight">
          Innovacio's IOP
        </span>
      </div>

      {/* Links */}
      <div className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((l) => (
          <Link
            key={l.label}
            href={l.href}
            className="text-sm text-stone-500 hover:text-stone-900 transition-colors font-normal"
          >
            {l.label}
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="flex items-center gap-3">
        
        <button className="text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 transition-all px-5 py-2.5 rounded-xl shadow-md shadow-orange-200 hover:shadow-orange-300 hover:-translate-y-px active:translate-y-0">
          Get a demo
        </button>
      </div>
    </nav>
  );
}
