"use client";

import { useEffect, useRef } from "react";

// ─── Tiny canvas helpers ──────────────────────────────────────────────────

function rr(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number,
  stroke = false
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  stroke ? ctx.stroke() : ctx.fill();
}

function t(
  ctx: CanvasRenderingContext2D,
  str: string,
  x: number, y: number,
  size: number,
  weight: string,
  color: string,
  align: CanvasTextAlign = "left"
) {
  ctx.font = `${weight} ${size}px 'DM Sans', system-ui, sans-serif`;
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.fillText(str, x, y);
  ctx.textAlign = "left";
}

function circle(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  r: number, color: string
) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
}

// ─── Card base (white, clean border, left accent strip) ───────────────────

function cardBase(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  accent: string
) {
  // shadow
  ctx.shadowColor = "rgba(0,0,0,0.08)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 8;
  ctx.fillStyle = "rgba(255,255,255,0.96)";
  rr(ctx, 0, 0, w, h, 12);
  ctx.shadowColor = "transparent";
  ctx.shadowBlur = 0;
  ctx.shadowOffsetY = 0;

  // border
  ctx.strokeStyle = "rgba(0,0,0,0.07)";
  ctx.lineWidth = 0.8;
  rr(ctx, 0, 0, w, h, 12, true);

  // left accent strip
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect(0, 10, 3.5, h - 20, 2);
  ctx.fill();

  // header divider
  ctx.strokeStyle = "rgba(0,0,0,0.05)";
  ctx.lineWidth = 0.5;
  ctx.beginPath();
  ctx.moveTo(4, 30);
  ctx.lineTo(w, 30);
  ctx.stroke();
}

// ─── Card drawers ─────────────────────────────────────────────────────────

function drawStockoutCard(
  ctx: CanvasRenderingContext2D,
  w: number, h: number
) {
  cardBase(ctx, w, h, "rgba(239,68,68,0.7)");

  // header
  circle(ctx, 16, 15, 3.5, "rgba(239,68,68,0.65)");
  t(ctx, "Stockout Risk", 28, 16, 10, "600", "rgba(20,15,15,0.72)");
  t(ctx, "3 SKUs critical", w - 10, 16, 9, "500", "rgba(200,50,50,0.55)", "right");

  // rows
  const rows = [
    { sku: "SKU-2041", loc: "Delhi WH",   pct: 4  },
    { sku: "SKU-0887", loc: "Mumbai WH",  pct: 9  },
    { sku: "SKU-1134", loc: "Pune WH",    pct: 2  },
  ];
  rows.forEach((row, i) => {
    const y = 42 + i * 19;
    t(ctx, row.sku, 12, y, 9, "600", "rgba(30,20,20,0.6)");
    t(ctx, row.loc, 72, y, 9, "400", "rgba(120,110,105,0.5)");
    // track
    ctx.fillStyle = "rgba(0,0,0,0.06)";
    rr(ctx, 138, y - 6, 54, 5, 2);
    // fill
    ctx.fillStyle = "rgba(239,68,68,0.45)";
    rr(ctx, 138, y - 6, Math.max(4, 54 * (row.pct / 100)), 5, 2);
    t(ctx, row.pct + "%", w - 8, y, 8, "600", "rgba(200,50,50,0.6)", "right");
  });
}

function drawForecastCard(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  timestamp: number
) {
  cardBase(ctx, w, h, "rgba(249,115,22,0.65)");

  // header
  circle(ctx, 16, 15, 3.5, "rgba(249,115,22,0.6)");
  t(ctx, "Demand Forecast", 28, 16, 10, "600", "rgba(20,15,10,0.72)");
  t(ctx, "Next 30 days", w - 10, 16, 9, "400", "rgba(130,80,20,0.45)", "right");

  // headline
  t(ctx, "↑ 23% surge predicted", 12, 42, 11, "700", "rgba(25,18,10,0.68)");
  t(ctx, "Q4 seasonal · Manufacturing", 12, 54, 9, "400", "rgba(120,110,100,0.45)");

  // confidence badge
  ctx.fillStyle = "rgba(249,115,22,0.08)";
  rr(ctx, w - 62, 36, 54, 16, 8);
  ctx.strokeStyle = "rgba(249,115,22,0.2)";
  ctx.lineWidth = 0.6;
  rr(ctx, w - 62, 36, 54, 16, 8, true);
  t(ctx, "91% conf.", w - 35, 47, 8, "600", "rgba(180,80,10,0.65)", "center");

  // animated sparkline
  const sx = 12, sy = h - 10, sw = w - 24, sh = 32;
  const pts: number[] = [];
  for (let i = 0; i < 10; i++) {
    pts.push(0.25 + (i / 9) * 0.65 + Math.sin(timestamp * 0.0008 + i * 0.85) * 0.04);
  }

  // fill
  ctx.beginPath();
  pts.forEach((p, i) => {
    const px = sx + (i / (pts.length - 1)) * sw;
    const py = sy - p * sh;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.lineTo(sx + sw, sy);
  ctx.lineTo(sx, sy);
  ctx.closePath();
  ctx.fillStyle = "rgba(249,115,22,0.07)";
  ctx.fill();

  // line
  ctx.beginPath();
  pts.forEach((p, i) => {
    const px = sx + (i / (pts.length - 1)) * sw;
    const py = sy - p * sh;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.strokeStyle = "rgba(249,115,22,0.5)";
  ctx.lineWidth = 1.5;
  ctx.lineJoin = "round";
  ctx.stroke();

  // end dot
  const lastX = sx + sw;
  const lastY = sy - pts[pts.length - 1] * sh;
  circle(ctx, lastX, lastY, 3, "rgba(249,115,22,0.7)");
}

function drawInventoryCard(
  ctx: CanvasRenderingContext2D,
  w: number, h: number
) {
  cardBase(ctx, w, h, "rgba(99,102,241,0.65)");

  // header
  circle(ctx, 16, 15, 3.5, "rgba(99,102,241,0.55)");
  t(ctx, "Inventory Health", 28, 16, 10, "600", "rgba(18,15,25,0.7)");

  // big number
  t(ctx, "94.7%", 12, 48, 22, "800", "rgba(18,15,25,0.72)");

  // trend badge
  ctx.fillStyle = "rgba(34,197,94,0.1)";
  rr(ctx, w - 80, 34, 72, 16, 8);
  t(ctx, "↑ +2.1% this week", w - 44, 45, 8, "600", "rgba(22,140,70,0.7)", "center");

  // sub label
  t(ctx, "6 warehouses · 1,284 SKUs", 12, 62, 9, "400", "rgba(120,110,105,0.45)");

  // sparkline
  const pts = [0.52, 0.60, 0.56, 0.70, 0.76, 0.79, 0.86, 0.90, 0.947];
  const sx = 12, sy = h - 8, sw = w - 24, sh = 12;
  ctx.beginPath();
  pts.forEach((p, i) => {
    const px = sx + (i / (pts.length - 1)) * sw;
    const py = sy - p * sh;
    i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
  });
  ctx.strokeStyle = "rgba(99,102,241,0.35)";
  ctx.lineWidth = 1.3;
  ctx.lineJoin = "round";
  ctx.stroke();

  // end dot
  const lx = sx + sw;
  const ly = sy - pts[pts.length - 1] * sh;
  circle(ctx, lx, ly, 2.5, "rgba(99,102,241,0.6)");
}

function drawAlertsCard(
  ctx: CanvasRenderingContext2D,
  w: number, h: number,
  timestamp: number
) {
  cardBase(ctx, w, h, "rgba(22,163,74,0.65)");

  // header
  // pulsing dot
  const pulse = 0.5 + 0.5 * Math.sin(timestamp * 0.004);
  circle(ctx, 16, 15, 3.5 + pulse * 1.2, `rgba(22,163,74,${0.2 * pulse})`);
  circle(ctx, 16, 15, 3.5, "rgba(22,163,74,0.7)");
  t(ctx, "Active Alerts", 28, 16, 10, "600", "rgba(15,20,15,0.72)");

  // count badge
  ctx.fillStyle = "rgba(239,68,68,0.12)";
  rr(ctx, w - 30, 6, 22, 16, 8);
  t(ctx, "4", w - 19, 17, 9, "700", "rgba(200,50,50,0.7)", "center");

  // alert rows
  const alerts = [
    { color: "rgba(249,115,22,0.7)",  msg: "Low stock: Raw Mat. #R-204"    },
    { color: "rgba(239,68,68,0.65)",  msg: "Overstock: SKU-0012 +340%"     },
    { color: "rgba(34,197,94,0.65)",  msg: "Auto-reorder: 480 units placed" },
  ];
  alerts.forEach((a, i) => {
    const y = 40 + i * 17;

    // row bg
    ctx.fillStyle = i % 2 === 0 ? "rgba(0,0,0,0.018)" : "transparent";
    rr(ctx, 8, y - 9, w - 16, 14, 4);

    circle(ctx, 18, y, 3, a.color);
    t(ctx, a.msg, 28, y + 1, 9, "400", "rgba(30,25,20,0.58)");
  });
}

// ─── Card definitions — position + size + which drawer ───────────────────

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

interface CardDef {
  // position as fraction of canvas (0–1), anchored to nearest corner
  anchorX: number; // 0 = left edge, 1 = right edge
  anchorY: number; // 0 = top edge, 1 = bottom edge
  offsetX: number; // px offset from anchor
  offsetY: number; // px offset from anchor
  width: number;
  height: number;
  floatAmp: number;    // float amplitude px
  floatSpeed: number;  // float speed multiplier
  floatPhase: number;  // phase offset so cards don't sync
  draw: DrawFn;
}

const CARDS: CardDef[] = [
  {
    // Top-right
    anchorX: 1, anchorY: 0,
    offsetX: -220, offsetY: 100,
    width: 220, height: 100,
    floatAmp: 7, floatSpeed: 0.9, floatPhase: 0,
    draw: (ctx, w, h, ts) => drawForecastCard(ctx, w, h, ts),
  },
  {
    anchorX: 1, anchorY: 0,
    offsetX: -650, offsetY: 250,
    width: 215, height: 90,
    floatAmp: 9, floatSpeed: 0.65, floatPhase: 0.8,
    draw: (ctx, w, h, ts) => drawAlertsCard(ctx, w, h, ts),
  },
  {
    // Left-center
    anchorX: 1, anchorY: 0,
    offsetX: -200, offsetY: 500,
    width: 210, height: 100,
    floatAmp: 8, floatSpeed: 0.75, floatPhase: 1.4,
    draw: (ctx, w, h) => drawStockoutCard(ctx, w, h),
  },
  {
    // Bottom-right
    anchorX: 1, anchorY: 1,
    offsetX: -250, offsetY: -130,
    width: 210, height: 88,
    floatAmp: 6, floatSpeed: 1.05, floatPhase: 2.8,
    draw: (ctx, w, h) => drawInventoryCard(ctx, w, h),
  },
  {
    // Bottom-left
    anchorX: 0, anchorY: 1,
    offsetX: 36, offsetY: -150,
    width: 215, height: 90,
    floatAmp: 9, floatSpeed: 0.65, floatPhase: 0.8,
    draw: (ctx, w, h, ts) => drawAlertsCard(ctx, w, h, ts),
  },
];

// ─── Component ────────────────────────────────────────────────────────────

export default function FloatingCardsForHero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef  = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.parentElement?.offsetWidth  ?? window.innerWidth;
      canvas.height = canvas.parentElement?.offsetHeight ?? window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (timestamp: number) => {
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      CARDS.forEach((card) => {
        // Resolve anchor position
        const baseX = card.anchorX * W + card.offsetX;
        const baseY = card.anchorY * H + card.offsetY;

        // Float offset — gentle sine on Y, tiny cosine on X
        const floatY = Math.sin(timestamp * 0.001 * card.floatSpeed + card.floatPhase) * card.floatAmp;
        const floatX = Math.cos(timestamp * 0.0007 * card.floatSpeed + card.floatPhase) * (card.floatAmp * 0.35);

        const x = baseX + floatX;
        const y = baseY + floatY;

        // Draw card
        ctx.save();
        ctx.translate(x, y);
        card.draw(ctx, card.width, card.height, timestamp);
        ctx.restore();
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
      className="absolute hidden md:block inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}