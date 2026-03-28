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
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight;
      initOrbs();
    };

    const initOrbs = () => {
      const count = Math.floor((canvas.width * canvas.height) / 48000);
      orbsRef.current = Array.from({ length: Math.max(count, 12) }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3.5 + 1.2,
        speedX: (Math.random() - 0.5) * 0.28,
        speedY: (Math.random() - 0.5) * 0.28,
        opacity: Math.random() * 0.45 + 0.08,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        pulseOffset: Math.random() * Math.PI * 2,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp: number) => {
      timeRef.current = timestamp;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbsRef.current.forEach((orb) => {
        // Pulse opacity
        const pulsed =
          orb.opacity +
          Math.sin(timestamp * orb.pulseSpeed + orb.pulseOffset) * 0.15;
        const finalOpacity = Math.max(0.04, Math.min(0.6, pulsed));

        // Glow — larger soft circle behind
        const grd = ctx.createRadialGradient(
          orb.x, orb.y, 0,
          orb.x, orb.y, orb.size * 7
        );
        grd.addColorStop(0, `rgba(249,115,22,${finalOpacity * 0.5})`);
        grd.addColorStop(0.4, `rgba(251,146,60,${finalOpacity * 0.15})`);
        grd.addColorStop(1, `rgba(249,115,22,0)`);
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size * 7, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${Math.min(0.75, finalOpacity * 2)})`;
        ctx.fill();

        // Move
        orb.x += orb.speedX;
        orb.y += orb.speedY;
        if (orb.x < -20) orb.x = canvas.width + 20;
        if (orb.x > canvas.width + 20) orb.x = -20;
        if (orb.y < -20) orb.y = canvas.height + 20;
        if (orb.y > canvas.height + 20) orb.y = -20;
      });

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
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
