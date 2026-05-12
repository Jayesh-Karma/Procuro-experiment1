"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now: number) => {
            const p = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - p, 4);
            setValue(Math.round(ease * target));
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, ref };
}

interface StatCardProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

export function StatCard({ value, suffix = "%", prefix = "", label }: StatCardProps) {
  const { value: count, ref } = useCountUp(value);
  return (
    <div ref={ref} className="text-center px-6 py-5 relative">
      <span className="block font-display text-3xl font-extrabold text-orange-500 leading-none tracking-tight">
        {prefix}{count}{suffix}
      </span>
      <span className="block text-xs text-stone-400  md:text-stone-700 mt-1.5 font-normal tracking-wide">
        {label}
      </span>
    </div>
  );
}
