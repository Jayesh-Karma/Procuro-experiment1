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
      "Raw material volatility, supplier dependencies, and production misalignment—solved with AI-driven planning, predictive maintenance, and real-time visibility.",
    image:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80&auto=format&fit=crop",
    accent: "orange",
    accentHex: "#f97316",
    stat: { value: "↓37%", label: "Downtime reduction" },

    subIndustries: [
      {
        id: "process-mfg",
        title: "General Manufacturing",
        image:
          "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&q=80&auto=format&fit=crop",
        problem: "Disconnected planning, logistics, and quality systems",
        caseStudySlug: "AI_Supply_Chain_Case_Study_IOP",
        stat: { value: "100%", label: "Operational visibility" },
        painSolutions: [
          {
            pain: "Data scattered across spreadsheets",
            solution: "Unified AI command center",
          },
          {
            pain: "Slow, reactive planning",
            solution: "Real-time predictive dashboards",
          },
        ],
      },

      {
        id: "electronics-mfg",
        title: "Electronics Manufacturing",
        image:
          "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80&auto=format&fit=crop",
        problem: "Unexpected machine failures disrupt production",
        caseStudySlug: "Electronics_AI_Case_Study_Innovacio",
        stat: { value: "94%", label: "Failure prediction" },
        painSolutions: [
          {
            pain: "Reactive maintenance causes downtime",
            solution: "AI-based predictive maintenance",
          },
        ],
      },

      {
        id: "fashion-mfg",
        title: "Fashion & Apparel",
        image:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80&auto=format&fit=crop",
        problem: "Stockouts and markdown losses from demand mismatch",
        caseStudySlug: "Fashion_Clothing_Accessories_AI_Case_Study_Innovacio",
        stat: { value: "£7B", label: "Return cost impact" },
        painSolutions: [
          {
            pain: "Unpredictable demand across SKUs",
            solution: "AI demand forecasting and assortment planning",
          },
        ],
      },

      {
        id: "beauty-mfg",
        title: "Beauty & Cosmetics",
        image:
          "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&q=80&auto=format&fit=crop",
        problem: "Fragmented production, quality, and demand systems",
        caseStudySlug: "Beauty_Products_AI_Case_Study_Innovacio",
        stat: { value: "SKU-level", label: "Forecasting" },
        painSolutions: [
          {
            pain: "Disconnected formulation and demand planning",
            solution: "Unified AI planning + quality layer",
          },
        ],
      },

      {
        id: "wellness-mfg",
        title: "Nutrition & Wellness",
        image:
          "https://images.unsplash.com/photo-1658387576587-059dc1748b59?q=80&w=1170&auto=format&fit=crop",
        problem: "Supplier and batch traceability gaps",
        caseStudySlug: "Nutrition_Wellness_AI_Case_Study_Innovacio",
        stat: { value: "Lot-level", label: "Traceability" },
        painSolutions: [
          {
            pain: "Manual supplier tracking",
            solution: "End-to-end batch traceability system",
          },
        ],
      },
    ],
  },

  {
    id: "automotive",
    title: "Automotive",
    short: "OEM & Supply Chain",
    description:
      "Complex supplier networks and zero-tolerance downtime—managed with predictive maintenance and supply chain intelligence.",
    image:
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80&auto=format&fit=crop",
    accent: "sky",
    accentHex: "#0ea5e9",
    stat: { value: "↓87%", label: "Downtime reduction" },

    subIndustries: [
      {
        id: "automotive-main",
        title: "Automotive Manufacturing",
        image:
          "https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80&auto=format&fit=crop",
        problem: "Production stops due to component or machine failure",
        caseStudySlug: "Automotive_AI_Case_Study",
        stat: { value: "87.56%", label: "Downtime reduction" },
        painSolutions: [
          {
            pain: "Unexpected line stoppages",
            solution: "AI digital twins + predictive maintenance",
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
      "Demand volatility and fulfillment pressure—solved with AI-powered forecasting and logistics orchestration.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80&auto=format&fit=crop",
    accent: "indigo",
    accentHex: "#6366f1",
    stat: { value: "+42.4%", label: "Fulfillment efficiency" },

    subIndustries: [
      {
        id: "ecommerce",
        title: "E-commerce & 3PL",
        image:
          "https://images.unsplash.com/photo-1553413077-190dd305871c?w=600&q=80&auto=format&fit=crop",
        problem: "Inefficient fulfillment and delivery delays",
        caseStudySlug: "Ecommerce_3PL_AI_Case_Study_Innovacio",
        stat: { value: "+42.4%", label: "Efficiency gain" },
        painSolutions: [
          {
            pain: "Warehouse and logistics not synchronized",
            solution: "AI-driven fulfillment orchestration",
          },
        ],
      },
    ],
  },

  {
    id: "fmcg",
    title: "FMCG",
    short: "Perishables & Fast Goods",
    description:
      "Expiry risk and demand variability—managed with AI forecasting, shelf-life tracking, and cold-chain visibility.",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80&auto=format&fit=crop",
    accent: "amber",
    accentHex: "#f59e0b",
    stat: { value: "↓30%", label: "Inventory waste" },

    subIndustries: [
      {
        id: "food",
        title: "Food & Perishables",
        image:
          "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&q=80&auto=format&fit=crop",
        problem: "Spoilage and demand mismatch",
        caseStudySlug: "AI_Powered_IOP_Food_Apparel_Textile_Case_Study_Updated",
        stat: { value: "-30%", label: "Waste reduction" },
        painSolutions: [
          {
            pain: "Short shelf life causes losses",
            solution: "AI freshness-aware forecasting",
          },
        ],
      },
    ],
  },

  {
    id: "pharma",
    title: "Pharma & Healthcare",
    short: "Regulated Supply Chains",
    description:
      "Strict compliance, traceability, and inventory precision—enabled through AI-powered control towers.",
    image:
      "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=1200&q=80&auto=format&fit=crop",
    accent: "violet",
    accentHex: "#8b5cf6",
    stat: { value: "↓95%", label: "Inventory errors" },

    subIndustries: [
      {
        id: "pharma",
        title: "Pharmaceutical Supply Chain",
        image:
          "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80&auto=format&fit=crop",
        problem: "Inventory errors and compliance delays",
        caseStudySlug: "AI_Pharmaceutical_Supply_Chain_Innovacio_Updated",
        stat: { value: "0.025‰", label: "Error rate" },
        painSolutions: [
          {
            pain: "Inaccurate inventory across systems",
            solution: "AI-powered unified control tower",
          },
        ],
      },

      {
        id: "healthcare",
        title: "Healthcare Operations",
        image:
          "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80&auto=format&fit=crop",
        problem: "Inventory errors affecting service delivery",
        caseStudySlug: "Healthcare_AI_Case_Study_Detailed",
        stat: { value: "95%+", label: "Error reduction" },
        painSolutions: [
          {
            pain: "Manual reconciliation processes",
            solution: "Automated inventory and supply chain control",
          },
        ],
      },
    ],
  },

  {
    id: "construction",
    title: "Construction Supply Chain",
    short: "Project-Based Materials",
    description:
      "Project-driven demand and supplier risk—optimized with AI forecasting, procurement intelligence, and delivery coordination.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=80&auto=format&fit=crop",
    accent: "yellow",
    accentHex: "#eab308",
    stat: { value: "0.93", label: "Forecast accuracy" },

    subIndustries: [
      {
        id: "lighting",
        title: "Lighting & Fixtures Distribution",
        image:
          "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80&auto=format&fit=crop",
        problem: "Delays due to missing or late fixtures",
        caseStudySlug: "Lighting_Fixtures_Distribution_AI_Case_Study_Innovacio",
        stat: { value: "0.93", label: "Forecast accuracy" },
        painSolutions: [
          {
            pain: "Project demand volatility",
            solution: "AI forecasting tied to project timelines",
          },
        ],
      },
    ],
  },
];
