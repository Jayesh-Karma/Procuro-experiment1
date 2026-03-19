"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (window.scrollY / (h.scrollHeight - h.clientHeight)) * 100;
      setProgress(Math.min(100, pct));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-[9999] bg-transparent">
      <div
        className="h-full rounded-r-full transition-[width] duration-75"
        style={{
          width: `${progress}%`,
          background: "linear-gradient(90deg, #ea580c, #f97316, #fb923c)",
          boxShadow: "0 0 8px rgba(249,115,22,0.6)",
        }}
      />
    </div>
  );
}
