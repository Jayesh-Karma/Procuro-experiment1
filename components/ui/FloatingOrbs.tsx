"use client";

import { useEffect, useRef } from "react";

interface Orb {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  pulseSpeed: number;
  pulseOffset: number;
}

export default function FloatingOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const orbsRef = useRef<Orb[]>([]);
  const frameRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(false);
  const isRunningRef = useRef<boolean>(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const resize = () => {
      canvas.width = canvas.parentElement?.offsetWidth ?? window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight;
      initOrbs();
    };

    const initOrbs = () => {
      const isMobile = window.innerWidth < 768;
      const count = isMobile ? 6 : Math.min(Math.floor((canvas.width * canvas.height) / 70000), 10);
      orbsRef.current = Array.from({ length: Math.max(count, 4) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        opacity: Math.random() * 0.35 + 0.08,
        pulseSpeed: Math.random() * 0.015 + 0.005,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    };

    resize();

    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 200);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const draw = (timestamp: number) => {
      if (!isVisibleRef.current || document.hidden) {
        isRunningRef.current = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbsRef.current.forEach((orb) => {
        const pulsed = orb.opacity + Math.sin(timestamp * orb.pulseSpeed + orb.pulseOffset) * 0.12;
        const finalOpacity = Math.max(0.04, Math.min(0.5, pulsed));

        const grd = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.size * 6
        );
        grd.addColorStop(0, `rgba(249,115,22,${finalOpacity * 0.4})`);
        grd.addColorStop(0.5, `rgba(251,146,60,${finalOpacity * 0.1})`);
        grd.addColorStop(1, `rgba(249,115,22,0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size * 6, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${Math.min(0.7, finalOpacity * 1.8)})`;
        ctx.fill();

        orb.x += orb.speedX;
        orb.y += orb.speedY;
        if (orb.x < -20) orb.x = canvas.width + 20;
        if (orb.x > canvas.width + 20) orb.x = -20;
        if (orb.y < -20) orb.y = canvas.height + 20;
        if (orb.y > canvas.height + 20) orb.y = -20;
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    const startAnimation = () => {
      if (!isRunningRef.current && isVisibleRef.current && !document.hidden) {
        isRunningRef.current = true;
        frameRef.current = requestAnimationFrame(draw);
      }
    };

    const stopAnimation = () => {
      isRunningRef.current = false;
      cancelAnimationFrame(frameRef.current);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    const onVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else if (isVisibleRef.current) {
        startAnimation();
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      stopAnimation();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
