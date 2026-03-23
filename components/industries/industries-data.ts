// ─── Types ──────────────────────────────────────────────────────────────────
export interface PainSolution {
  pain: string;
  solution: string;
}

export interface SubIndustry {
  id: string;
  title: string;
  image: string;        // Unsplash URL
  problem: string;      // 1-line problem statement
  painSolutions: PainSolution[];
  caseStudySlug: string;
  stat: { value: string; label: string };
}

export interface Industry {
  id: string;
  title: string;
  short: string;        // short descriptor under title
  description: string;
  image: string;        // hero background image
  accent: string;       // Tailwind color name for accents
  accentHex: string;    // raw hex for inline styles
  stat: { value: string; label: string };
  subIndustries: SubIndustry[];
}

// ─── Data ───────────────────────────────────────────────────────────────────
export const INDUSTRIES: Industry[] = [
  {
    id: "manufacturing",
    title: "Manufacturing",
    short: "Industrial & Process",
    description:
      "Raw material volatility, multi-tier supplier dependencies, and production schedule misalignment - solved with AI-driven planning and real-time visibility.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80&auto=format&fit=crop",
    accent: "orange",
    accentHex: "#f97316",
    stat: { value: "↓30%", label: "Stockout incidents" },
    subIndustries: [
      {
        id: "automotive-mfg",
        title: "Automotive Manufacturing",
        image:
          "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80&auto=format&fit=crop",
        problem: "One missing component stops the entire assembly line",
        caseStudySlug: "automotive-manufacturing",
        stat: { value: "0", label: "Unplanned stoppages" },
        painSolutions: [
          {
            pain: "Tier-2/3 supplier delays invisible until production halts",
            solution: "Real-time multi-tier supplier risk tracking with automated alerts",
          },
          {
            pain: "JIT schedules leave zero buffer when supply disrupts",
            solution: "AI safety stock calibrated to lead time volatility per component",
          },
          {
            pain: "Emergency procurement spend spikes every quarter",
            solution: "Predictive reorder triggers eliminate reactive buying",
          },
        ],
      },
      {
        id: "electronics-mfg",
        title: "Electronics Manufacturing",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop",
        problem: "Component lead times of 20+ weeks make demand planning nearly impossible",
        caseStudySlug: "electronics-manufacturing",
        stat: { value: "↓34%", label: "Component stockouts" },
        painSolutions: [
          {
            pain: "Long lead times for ICs and rare components create planning blind spots",
            solution: "AI forecasting extends demand visibility to match component lead times",
          },
          {
            pain: "BOM complexity means one shortage cascades across multiple SKUs",
            solution: "Component dependency mapping flags multi-SKU exposure before shortage",
          },
          {
            pain: "Rapid product obsolescence leaves excess component inventory",
            solution: "Dead stock detection with EOL signal integration",
          },
        ],
      },
      {
        id: "machinery-mfg",
        title: "Machinery & Equipment",
        image:
          "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=600&q=80&auto=format&fit=crop",
        problem: "Spare part forecasting is guesswork - until the machine stops",
        caseStudySlug: "machinery-equipment",
        stat: { value: "↓25%", label: "Inventory carrying cost" },
        painSolutions: [
          {
            pain: "MRO inventory managed by gut feel - overstock on some, zero on critical parts",
            solution: "AI MRO demand model trained on maintenance history and machine age",
          },
          {
            pain: "Long-tail SKU proliferation makes stock planning unmanageable",
            solution: "Automated ABC-XYZ classification with dynamic reorder policies",
          },
        ],
      },
      {
        id: "chemical-mfg",
        title: "Chemical Manufacturing",
        image:
          "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80&auto=format&fit=crop",
        problem: "Batch expiry and hazmat compliance creates costly write-off cycles",
        caseStudySlug: "chemical-manufacturing",
        stat: { value: "↓85%", label: "Documentation time" },
        painSolutions: [
          {
            pain: "Batch expiry tracking done manually - audit risk every quarter",
            solution: "Automated FEFO enforcement with full batch traceability",
          },
          {
            pain: "Regulatory documentation consumes 30% of ops team time",
            solution: "Auto-generated compliance reports, audit-ready in one click",
          },
        ],
      },
    ],
  },

  {
    id: "retail",
    title: "Retail & E-commerce",
    short: "Omnichannel Commerce",
    description:
      "Multi-channel inventory chaos, stockouts during peak demand, and dead stock accumulation - AI-powered unified visibility solves all three simultaneously.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80&auto=format&fit=crop",
    accent: "indigo",
    accentHex: "#6366f1",
    stat: { value: "↑22%", label: "Order fill rate" },
    subIndustries: [
      {
        id: "ecommerce",
        title: "Pure-Play E-commerce",
        image:
          "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=600&q=80&auto=format&fit=crop",
        problem: "Stockouts during sales events cost 7.4% of annual revenue",
        caseStudySlug: "ecommerce-platform",
        stat: { value: "↓28%", label: "Stockout incidents" },
        painSolutions: [
          {
            pain: "Flash sales and promotions drain stock faster than procurement can respond",
            solution: "Per-SKU demand forecasting flags peaks 3–6 weeks in advance",
          },
          {
            pain: "Marketplace, D2C, and app inventory permanently out of sync",
            solution: "Real-time multi-channel sync with oversell prevention",
          },
        ],
      },
      {
        id: "retail-chains",
        title: "Retail Chains & Multi-store",
        image:
          "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=600&q=80&auto=format&fit=crop",
        problem: "Store-level demand variation makes central planning ineffective",
        caseStudySlug: "retail-chains",
        stat: { value: "99.1%", label: "Peak season in-stock rate" },
        painSolutions: [
          {
            pain: "Central planners can't account for hyper-local demand patterns",
            solution: "Store-level AI forecasts with regional seasonal adjustment",
          },
          {
            pain: "Dead stock at slow stores, stockouts at fast stores - simultaneously",
            solution: "AI-driven inter-store transfer recommendations before write-off",
          },
        ],
      },
      {
        id: "dtc",
        title: "Direct-to-Consumer Brands",
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&auto=format&fit=crop",
        problem: "Seasonal campaigns create demand spikes with no buffer time",
        caseStudySlug: "dtc-brands",
        stat: { value: "↑15%", label: "Sell-through rate" },
        painSolutions: [
          {
            pain: "Marketing-driven demand spikes invisible to procurement team",
            solution: "Campaign calendar integration feeds demand model in advance",
          },
          {
            pain: "Overstock post-campaign requires deep discounting to clear",
            solution: "Pre-campaign procurement caps tied to forecast confidence bands",
          },
        ],
      },
    ],
  },

  {
    id: "fmcg",
    title: "FMCG",
    short: "Fast-Moving Consumer Goods",
    description:
      "Wafer-thin margins demand precision - in seasonal planning, route-to-market execution, and distributor inventory visibility that most FMCG operations still lack.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80&auto=format&fit=crop",
    accent: "amber",
    accentHex: "#f59e0b",
    stat: { value: "↓35%", label: "Food waste from expiry" },
    subIndustries: [
      {
        id: "packaged-foods",
        title: "Packaged Foods",
        image:
          "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80&auto=format&fit=crop",
        problem: "Seasonal demand swings cause overstock or stockouts every quarter",
        caseStudySlug: "packaged-foods",
        stat: { value: "↑50%", label: "Seasonal plan accuracy" },
        painSolutions: [
          {
            pain: "Festive season procurement planned from last year's actuals - always wrong",
            solution: "ML seasonal forecast per SKU, 6–8 weeks ahead of each peak",
          },
          {
            pain: "FEFO rotation inconsistent across warehouse shifts",
            solution: "System-enforced FEFO picking - oldest expiry dispatched first, automatically",
          },
        ],
      },
      {
        id: "beverages",
        title: "Beverages",
        image:
          "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=600&q=80&auto=format&fit=crop",
        problem: "Summer demand spikes deplete stock within days of peak onset",
        caseStudySlug: "beverages",
        stat: { value: "↓28%", label: "Procurement overspend" },
        painSolutions: [
          {
            pain: "Temperature-driven demand spikes arrive faster than procurement can act",
            solution: "Weather-signal integrated demand forecasting triggers pre-orders",
          },
          {
            pain: "SKU proliferation (variants, packs, sizes) makes planning unmanageable",
            solution: "Per-SKU per-channel forecasting at scale - automated daily",
          },
        ],
      },
      {
        id: "personal-care",
        title: "Personal Care & Beauty",
        image:
          "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=600&q=80&auto=format&fit=crop",
        problem: "New product launches create demand uncertainty with no history",
        caseStudySlug: "personal-care",
        stat: { value: "↓20%", label: "Inventory carrying cost" },
        painSolutions: [
          {
            pain: "New SKU launches have zero historical data for forecasting",
            solution: "Analogue forecasting maps new SKU to most similar existing product",
          },
          {
            pain: "Promotions cause demand spikes that clear safety stock instantly",
            solution: "Promotion-aware replenishment model adjusts reorder triggers pre-campaign",
          },
        ],
      },
      {
        id: "household",
        title: "Household Products",
        image:
          "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=600&q=80&auto=format&fit=crop",
        problem: "Distributor inventory visibility gaps cause phantom stockouts",
        caseStudySlug: "household-products",
        stat: { value: "↑18%", label: "Distributor fill rate" },
        painSolutions: [
          {
            pain: "No visibility into how much stock is sitting at distributor level",
            solution: "Distributor inventory integration gives real sell-out vs. sell-in view",
          },
          {
            pain: "Route-to-market gaps discovered only at month-end review",
            solution: "Real-time route performance monitoring with stock coverage alerts",
          },
        ],
      },
    ],
  },

  {
    id: "pharma",
    title: "Pharma & Healthcare",
    short: "Regulated & Life Sciences",
    description:
      "Batch traceability, compliance reporting, cold chain integrity, and expiry management - AI-automated so your team spends time on outcomes, not documentation.",
    image:
      "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=1200&q=80&auto=format&fit=crop",
    accent: "violet",
    accentHex: "#8b5cf6",
    stat: { value: "↓85%", label: "Documentation time" },
    subIndustries: [
      {
        id: "api-manufacturers",
        title: "API Manufacturers",
        image:
          "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80&auto=format&fit=crop",
        problem: "Raw material lot traceability gaps create regulatory exposure at any audit",
        caseStudySlug: "api-manufacturers",
        stat: { value: "2hrs", label: "Audit prep (was 2 weeks)" },
        painSolutions: [
          {
            pain: "Manual lot traceability from raw material to finished API batch",
            solution: "End-to-end automated lot traceability - raw to finished goods, searchable in seconds",
          },
          {
            pain: "Compliance documentation consumes 30% of team time",
            solution: "Auto-generated batch records and compliance reports, audit-ready on demand",
          },
        ],
      },
      {
        id: "formulation",
        title: "Formulation Companies",
        image:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80&auto=format&fit=crop",
        problem: "Expiry management across 500+ SKUs is a daily compliance risk",
        caseStudySlug: "formulation-companies",
        stat: { value: "0", label: "Missed expiry alerts" },
        painSolutions: [
          {
            pain: "FEFO rotation inconsistently applied - older batches bypassed in dispatch",
            solution: "System-enforced FEFO with automated picking rules per batch",
          },
          {
            pain: "Near-expiry stock discovered only during physical audit",
            solution: "30/60/90-day expiry alerts fire automatically to relevant team members",
          },
        ],
      },
      {
        id: "biotech",
        title: "Biotech & Biologics",
        image:
          "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=600&q=80&auto=format&fit=crop",
        problem: "Cold chain temperature excursions discovered at delivery - too late to act",
        caseStudySlug: "biotech-biologics",
        stat: { value: "8min", label: "Avg breach detection time" },
        painSolutions: [
          {
            pain: "Temperature excursions only visible at delivery point inspection",
            solution: "Real-time IoT cold chain monitoring - breach alerts fire within minutes",
          },
          {
            pain: "High-value batch write-offs with no early warning system",
            solution: "Predictive cold chain risk scoring by route, vendor, and season",
          },
        ],
      },
    ],
  },

  {
    id: "automotive",
    title: "Automotive",
    short: "OEM, Tier-1 & Aftermarket",
    description:
      "Complex supplier networks, component dependency risk, and JIT pressure - our platform gives automotive operations the visibility to act before the line stops.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop",
    accent: "sky",
    accentHex: "#0ea5e9",
    stat: { value: "↓34%", label: "Emergency procurement" },
    subIndustries: [
      {
        id: "oem",
        title: "OEM & Assembly",
        image:
          "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=600&q=80&auto=format&fit=crop",
        problem: "A single late component stops an entire assembly shift",
        caseStudySlug: "oem-assembly",
        stat: { value: "0", label: "Unplanned line stoppages" },
        painSolutions: [
          {
            pain: "Tier-2/3 supplier delays are invisible until they reach the line",
            solution: "Multi-tier supplier network visibility with delay propagation alerts",
          },
          {
            pain: "JIT leaves no buffer - any disruption becomes an emergency",
            solution: "Dynamic safety stock recommendations adjusted for supplier volatility",
          },
        ],
      },
      {
        id: "tier1",
        title: "Component Suppliers",
        image:
          "https://images.unsplash.com/photo-1565688534245-05d6b5be184a?w=600&q=80&auto=format&fit=crop",
        problem: "OEM demand signals arrive late, forcing reactive procurement",
        caseStudySlug: "tier1-suppliers",
        stat: { value: "↑25%", label: "Supplier compliance rate" },
        painSolutions: [
          {
            pain: "OEM schedule changes arrive 24–48 hours before production - no planning time",
            solution: "AI forecasting extends horizon beyond OEM signals using market data",
          },
          {
            pain: "Raw material procurement depends entirely on OEM call-off accuracy",
            solution: "Independent demand model decouples raw material planning from OEM delays",
          },
        ],
      },
      {
        id: "aftermarket",
        title: "Aftermarket & Spare Parts",
        image:
          "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=600&q=80&auto=format&fit=crop",
        problem: "10,000+ SKUs with intermittent demand - impossible to plan manually",
        caseStudySlug: "automotive-aftermarket",
        stat: { value: "↓22%", label: "Inventory carrying cost" },
        painSolutions: [
          {
            pain: "Slow-moving parts overstocked, fast-movers perpetually understocked",
            solution: "Intermittent demand AI model handles low-frequency SKUs accurately",
          },
          {
            pain: "Long-tail SKU obsolescence creates mounting dead stock",
            solution: "AI flags obsolescence risk per part using vehicle age distribution data",
          },
        ],
      },
    ],
  },
];
