"use client";

import { useEffect, useState } from "react";

const CalEmbed = () => {
  const [hovered, setHovered] = useState(false);
  const [pulse, setPulse] = useState(true);

  useEffect(() => {
    // Stop pulse after 4 seconds so it doesn't distract forever
    const t = setTimeout(() => setPulse(false), 4000);
    return () => clearTimeout(t);
  }, []);

  const openCal = async () => {
    try {
      const { getCalApi } = await import("@calcom/embed-react");
      const cal = await getCalApi();
      cal("ui", {
        styles: { branding: { brandColor: "#ed8936" } },
        theme: "auto",
        hideEventTypeDetails: false,
      });
      cal("modal", {
        calLink: "raushan",
        config: {
          name: "",
          email: "",
        },
      });
    } catch {
      window.location.href = "/book-demo";
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    // Preload cal bundle on hover for instant open
    import("@calcom/embed-react").catch(() => {});
  };

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3"
      style={{ fontFamily: "inherit" }}
    >
      {/* Tooltip label — shows on hover */}
      <div
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0) scale(1)" : "translateY(6px) scale(0.95)",
          transition: "opacity 0.2s ease, transform 0.2s ease",
          pointerEvents: "none",
        }}
        className="flex items-center gap-2 bg-stone-900 text-white text-xs font-medium px-3.5 py-2 rounded-full shadow-lg whitespace-nowrap"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Slots available today
      </div>

      {/* The button */}
      <button
        onClick={openCal}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
        aria-label="Book a free consultation"
        style={{
          background: hovered
            ? "linear-gradient(135deg, #f97316 0%, #ea580c 100%)"
            : "linear-gradient(135deg, #ed8936 0%, #f97316 100%)",
          boxShadow: hovered
            ? "0 8px 32px rgba(237,137,54,0.55), 0 2px 8px rgba(0,0,0,0.12)"
            : "0 4px 20px rgba(237,137,54,0.40), 0 2px 8px rgba(0,0,0,0.10)",
          transform: hovered ? "translateY(-2px) scale(1.02)" : "translateY(0) scale(1)",
          transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
        }}
        className="relative cursor-pointer flex items-center gap-3 pl-4 pr-5 py-3.5 rounded-2xl text-white overflow-hidden group"
      >
        {/* Shimmer sweep on hover */}
        <span
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.18) 50%, transparent 65%)",
            transform: hovered ? "translateX(200%)" : "translateX(-200%)",
            transition: "transform 0.55s ease",
          }}
        />

        {/* Calendar icon */}
        <span className="relative flex-shrink-0 w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
          <svg
            viewBox="0 0 20 20"
            fill="none"
            className="w-4.5 h-4.5"
            stroke="white"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="4" width="16" height="14" rx="2" />
            <line x1="2" y1="9" x2="18" y2="9" />
            <line x1="6" y1="2" x2="6" y2="6" />
            <line x1="14" y1="2" x2="14" y2="6" />
            <circle cx="7" cy="13" r="0.8" fill="white" stroke="none" />
            <circle cx="10" cy="13" r="0.8" fill="white" stroke="none" />
            <circle cx="13" cy="13" r="0.8" fill="white" stroke="none" />
          </svg>
        </span>

        {/* Text */}
        <span className="relative flex flex-col items-start leading-tight">
          <span className="text-[11px] font-semibold text-white/75 tracking-wide uppercase">
            Free consultation
          </span>
          <span className="text-sm font-bold text-white tracking-tight">
            Book a demo →
          </span>
        </span>

        {/* Pulse ring */}
        {pulse && (
          <span
            className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400"
            style={{ animation: "ping 1.2s cubic-bezier(0,0,0.2,1) infinite" }}
          />
        )}
        {pulse && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400" />
        )}
      </button>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default CalEmbed;