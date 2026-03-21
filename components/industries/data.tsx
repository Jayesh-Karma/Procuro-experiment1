import { Car, Factory, Hamburger, Pill, ShoppingCart } from "lucide-react";
import React from "react";

export interface Outcome {
  value: string;
  label: string;
  direction: "up" | "down";
}

export interface Industry {
  id: string;
  emoji: React.ReactNode;  // Using ReactNode to allow for SVG icons instead of just strings
  label: string;
  tagline: string;
  problem: string;
  // Real photography from Unsplash (free to use)
  heroImage: string;        // full-width section background image
  cardImage: string;        // grid card thumbnail
  color: {
    text:   string;
    bg:     string;
    border: string;
    dot:    string;
    badge:  string;
    ring:   string;
    glow:   string;
    hex:    string;         // raw hex for inline styles
  };
  challenges: string[];
  solutions:  string[];
  outcomes:   Outcome[];
  ctaDemo:    string;       // "Book Manufacturing Demo"
  ctaCase:    string;       // "See Case Study"
  caseHref:   string;       // "/case-studies/manufacturing"
}

export const INDUSTRIES: Industry[] = [
  {
    id:      "manufacturing",
    emoji:   <Factory className="text-orange-500" />,
    label:   "Manufacturing",
    tagline: "From raw material to finished goods - with zero blind spots.",
    problem: "Raw material delays & production inefficiencies, cost overruns, and missed delivery deadlines",
    // Industrial factory floor / warehouse
    heroImage:  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80&auto=format&fit=crop",
    cardImage:  "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=800&q=80&auto=format&fit=crop",
    color: {
      text:   "text-orange-600",
      bg:     "bg-orange-50",
      border: "border-orange-200",
      dot:    "bg-orange-400",
      badge:  "bg-orange-500",
      ring:   "ring-orange-200",
      glow:   "rgba(249,115,22,0.12)",
      hex:    "#f97316",
    },
    challenges: [
      "Raw material shortages halt production without warning",
      "Single-supplier dependency creates unpredictable risk",
      "Procurement runs disconnected from production schedules",
      "No real-time visibility into warehouse stock vs. production needs",
      "Demand shifts leave excess inventory or critical gaps",
    ],
    solutions: [
      "Predict raw material needs weeks before shortages occur",
      "Multi-supplier performance tracking with risk scoring",
      "Procurement timelines synced directly with production plans",
      "Live inventory feed across all production locations",
      "AI demand forecasting aligned to production capacity",
    ],
    outcomes: [
      { value: "↓30%",  label: "stockout incidents",       direction: "down" },
      { value: "↓25%",  label: "inventory carrying costs", direction: "down" },
      { value: "↑20%",  label: "operational efficiency",   direction: "up"   },
      { value: "↓18%",  label: "procurement cycle time",   direction: "down" },
    ],
    ctaDemo:  "Book Manufacturing Demo",
    ctaCase:  "See Case Study",
    caseHref: "/case-studies/manufacturing",
  },
  {
    id:      "retail",
    emoji:   <ShoppingCart className="text-indigo-500" />,
    label:   "Retail & E-commerce",
    tagline: "Never lose a sale to a stockout or bleed margin on dead inventory.",
    problem: "Stockouts during demand spikes and slow-moving overstock",
    heroImage:  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80&auto=format&fit=crop",
    cardImage:  "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&auto=format&fit=crop",
    color: {
      text:   "text-indigo-600",
      bg:     "bg-indigo-50",
      border: "border-indigo-200",
      dot:    "bg-indigo-400",
      badge:  "bg-indigo-500",
      ring:   "ring-indigo-200",
      glow:   "rgba(99,102,241,0.12)",
      hex:    "#6366f1",
    },
    challenges: [
      "Stockouts during demand spikes send customers to competitors",
      "Overstock of slow-moving SKUs ties up capital for months",
      "Multi-channel inventory constantly goes out of sync",
      "Seasonal peaks are consistently under- or over-prepared for",
      "Dead stock accumulates silently across warehouse locations",
    ],
    solutions: [
      "Per-SKU demand forecasting catches spikes in advance",
      "Dead stock detection with markdown recommendations",
      "One real-time inventory view synced across every channel",
      "Seasonal planning module with pre-season procurement targets",
      "Overstock alerts with automatic reorder pausing logic",
    ],
    outcomes: [
      { value: "↓28%",  label: "stockout incidents",      direction: "down" },
      { value: "↑22%",  label: "order fulfillment rate",  direction: "up"   },
      { value: "↓18%",  label: "excess inventory",        direction: "down" },
      { value: "↑15%",  label: "sell-through rate",       direction: "up"   },
    ],
    ctaDemo:  "Book Retail Demo",
    ctaCase:  "See Case Study",
    caseHref: "/case-studies/retail",
  },
  {
    id:      "pharma",
    emoji:   <Pill className="text-violet-500" />,
    label:   "Pharma & Healthcare",
    tagline: "Full batch traceability and compliance - without the manual burden.",
    problem: "Expiry tracking, batch compliance and cold chain risks",
    heroImage:  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1200&q=80&auto=format&fit=crop",
    cardImage:  "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=800&q=80&auto=format&fit=crop",
    color: {
      text:   "text-violet-600",
      bg:     "bg-violet-50",
      border: "border-violet-200",
      dot:    "bg-violet-400",
      badge:  "bg-violet-500",
      ring:   "ring-violet-200",
      glow:   "rgba(139,92,246,0.12)",
      hex:    "#8b5cf6",
    },
    challenges: [
      "Batch and expiry tracking done manually - audit risk every quarter",
      "30% of worker time consumed by compliance documentation",
      "Cold chain breaks go undetected until product is compromised",
      "Lot traceability gaps create product recall exposure",
      "Demand variability leads to costly overstocking of regulated SKUs",
    ],
    solutions: [
      "Batch-level tracking with automated FEFO picking logic",
      "Auto-generated compliance reports - zero manual documentation",
      "Expiry alerts triggered weeks before breach",
      "End-to-end lot traceability from raw material to delivery",
      "AI demand forecasting calibrated to regulated SKU constraints",
    ],
    outcomes: [
      { value: "↓85%",  label: "documentation time",     direction: "down" },
      { value: "↑90%",  label: "shipping date accuracy", direction: "up"   },
      { value: "↓50%",  label: "forecast error rate",    direction: "down" },
      { value: "0",     label: "missed expiry alerts",   direction: "down" },
    ],
    ctaDemo:  "Book Pharma Demo",
    ctaCase:  "See Case Study",
    caseHref: "/case-studies/pharma",
  },
  {
    id:      "food",
    emoji:   <Hamburger className="text-emerald-500" />,
    label:   "Food & Beverage",
    tagline: "Cut waste, plan for seasons, and keep stock rotating correctly.",
    problem: "Spoilage, seasonal demand swings and inconsistent supply",
    heroImage:  "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80&auto=format&fit=crop",
    cardImage:  "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80&auto=format&fit=crop",
    color: {
      text:   "text-emerald-700",
      bg:     "bg-emerald-50",
      border: "border-emerald-200",
      dot:    "bg-emerald-400",
      badge:  "bg-emerald-600",
      ring:   "ring-emerald-200",
      glow:   "rgba(16,185,129,0.12)",
      hex:    "#10b981",
    },
    challenges: [
      "Spoilage from poor inventory rotation drains margins daily",
      "Seasonal swings cause overstock or sudden shortages each quarter",
      "30% of food is wasted in supply chains globally",
      "Vendor inconsistency disrupts production schedules",
      "No visibility into which SKUs are closest to expiry across sites",
    ],
    solutions: [
      "Consumption prediction models reduce waste before it accumulates",
      "Seasonal planning module adjusts procurement targets per period",
      "FEFO inventory rotation ensures oldest stock ships first",
      "Supplier performance scoring flags inconsistent vendors early",
      "Multi-warehouse expiry visibility with transfer recommendations",
    ],
    outcomes: [
      { value: "↓35%",  label: "food waste from expiry",     direction: "down" },
      { value: "↑50%",  label: "seasonal planning accuracy", direction: "up"   },
      { value: "↓28%",  label: "procurement overspend",      direction: "down" },
      { value: "↑20%",  label: "working capital efficiency", direction: "up"   },
    ],
    ctaDemo:  "Book F&B Demo",
    ctaCase:  "See Case Study",
    caseHref: "/case-studies/food-beverage",
  },
  {
    id:      "automotive",
    emoji:   <Car className="text-blue-500" />,
    label:   "Automotive",
    tagline: "One missing part shouldn't stop an entire production line.",
    problem: "Long supplier lead times and complex component dependencies",
    heroImage:  "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=1200&q=80&auto=format&fit=crop",
    cardImage:  "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop",
    color: {
      text:   "text-sky-600",
      bg:     "bg-sky-50",
      border: "border-sky-200",
      dot:    "bg-sky-400",
      badge:  "bg-sky-500",
      ring:   "ring-sky-200",
      glow:   "rgba(14,165,233,0.12)",
      hex:    "#0ea5e9",
    },
    challenges: [
      "Long supplier lead times make production stoppages hard to predict",
      "One missing component halts the entire assembly line",
      "No real-time visibility into Tier 2 and Tier 3 vendor risk",
      "JIT production leaves zero buffer when supply disrupts",
      "Tariff changes hit component costs overnight",
    ],
    solutions: [
      "Supplier risk tracking with lead time variance alerts",
      "Component-level inventory planning with dependency mapping",
      "Live supply visibility across every Tier-1 and Tier-2 vendor",
      "Safety stock AI adjusted to lead time volatility per part",
      "Alternative supplier suggestions when primary vendor delays",
    ],
    outcomes: [
      { value: "0",     label: "unplanned stoppages",        direction: "down" },
      { value: "↓34%",  label: "component stockout rate",    direction: "down" },
      { value: "↑25%",  label: "supplier lead compliance",   direction: "up"   },
      { value: "↓22%",  label: "emergency procurement",      direction: "down" },
    ],
    ctaDemo:  "Book Automotive Demo",
    ctaCase:  "See Case Study",
    caseHref: "/case-studies/automotive",
  },
];

export const CASE_STUDIES = [
  {
    industry:   "Manufacturing",
    company:    "Sterling AutoParts",
    emoji:      <Factory className="text-orange-500" />,
    image:      "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=600&q=80&auto=format&fit=crop",
    problem:    "Raw material shortages halting production 4–5 times per quarter, each stoppage costing hours of downtime.",
    result:     "0 unplanned stoppages over 4 months. Procurement lead time cut by 34%.",
    metric:     "↓34%",
    metricLabel:"procurement lead time",
    color:      { text: "text-orange-600", bg: "bg-orange-50", border: "border-orange-100", hex: "#f97316" },
  },
  {
    industry:   "Food & Beverage",
    company:    "FreshHarvest Foods",
    emoji:      <Hamburger className="text-emerald-500" />,
    image:      "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80&auto=format&fit=crop",
    problem:    "Seasonal overstock causing ₹3M+ in write-offs annually. Manual inventory tracking across 3 warehouses.",
    result:     "₹3M in recovered inventory value in 6 months. 85% reduction in manual reporting time.",
    metric:     "₹3M",
    metricLabel:"inventory recovered",
    color:      { text: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100", hex: "#10b981" },
  },
  {
    industry:   "Pharma & Healthcare",
    company:    "MediCore Pharma",
    emoji:      <Pill className="text-violet-500" />,
    image:      "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=600&q=80&auto=format&fit=crop",
    problem:    "Batch documentation consuming 30% of team time. Compliance audit prep taking 2 weeks each cycle.",
    result:     "85% reduction in documentation time. Compliance audit prep cut from 2 weeks to 2 days.",
    metric:     "↓85%",
    metricLabel:"documentation time",
    color:      { text: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100", hex: "#8b5cf6" },
  },
];
