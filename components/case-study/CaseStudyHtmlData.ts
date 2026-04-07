export const caseStudiesHtmlData = [
    {
        slug: "AI_Supply_Chain_Case_Study_IOP",
        title: "AI-Powered Integrated Operations Platform (IOP)",
        subtitle:
            "Real-time supply chain visibility, forecasting, and connected operations",

        industry: "Manufacturing / Supply Chain",
        scope: ["Planning", "Logistics", "Quality", "Reporting"],
        outcome: "One connected command center",

        heroImage: "/case-study-bg.png",

        challenge:
            "Legacy Excel sheets and manual coordination caused inconsistent data, lack of real-time visibility, and slow decision-making across departments.",

        solution: [
            "Central AI-powered command center with unified SKU data and live alerts",
            "Forecasting modules for sales, procurement, and revenue planning",
            "Logistics layer with shipment, truck, and PO tracking",
            "Integrated quality management workflow to reduce scrap",
            "Connected all departments into a single real-time system",
        ],

        impact: [
            {
                title: "Operational Clarity",
                desc: "Replaced spreadsheets with live dashboards and centralized control",
            },
            {
                title: "Faster Planning",
                desc: "Improved forecasting and resource planning visibility",
            },
            {
                title: "Better Logistics Control",
                desc: "End-to-end tracking of shipments and operations",
            },
            {
                title: "Quality Improvement",
                desc: "Reduced scrap with proactive quality insights",
            },
        ],

        techStack: [
            { layer: "Frontend", tech: "React.js / Next.js dashboards" },
            { layer: "Backend", tech: "API-driven architecture" },
            { layer: "Data", tech: "SQL / NoSQL databases" },
            { layer: "AI", tech: "Predictive forecasting models" },
            { layer: "Integration", tech: "Syspro + enterprise systems" },
            { layer: "Infrastructure", tech: "Cloud scalable deployment" },
        ],
    },
    {
        slug: "AI_Pharmaceutical_Supply_Chain_Innovacio_Updated",
        title: "AI-Powered Pharma Supply Chain Command Center",
        subtitle:
            "Unified visibility, demand forecasting, and compliance-driven operations across pharma networks",

        industry: "Pharmaceutical / Healthcare Supply Chain",
        scope: [
            "Inventory Management",
            "Demand Forecasting",
            "Procurement",
            "Quality & Compliance",
            "Distribution",
        ],
        outcome: "42% improvement in supply chain efficiency",

        heroImage: "/case-study-bg.png",

        challenge:
            "Pharma operations struggled with fragmented systems across ERP, pharmacy, warehouse, and finance, leading to stock imbalances, inaccurate inventory, slow reconciliation, and poor demand visibility. Strict regulatory requirements further limited automation and increased manual workload.",

        solution: [
            "Built a unified AI-powered command center integrating ERP, pharmacy, warehouse, and finance systems",
            "Implemented AI + Vendor Managed Inventory (VMI) for automated purchasing and stock optimization",
            "Deployed demand forecasting models using neural networks for accurate planning",
            "Enabled real-time dashboards for inventory, replenishment, and delivery tracking",
            "Integrated quality and compliance workflows with traceability and audit readiness",
        ],

        impact: [
            {
                title: "Inventory Accuracy Boost",
                desc: "Reduced inventory error rate from 0.425‰ to 0.025‰",
            },
            {
                title: "Operational Efficiency",
                desc: "Improved overall supply chain efficiency by 42.4%",
            },
            {
                title: "Faster Procurement",
                desc: "Reduced purchase processing time by over 75%",
            },
            {
                title: "Better Demand Planning",
                desc: "Increased purchasing plan accuracy from 88.1% to 98.6%",
            },
            {
                title: "Reduced Delivery Time",
                desc: "Cut drug delivery timelines by nearly 47%",
            },
            {
                title: "Higher Satisfaction",
                desc: "Improved patient satisfaction through better availability",
            },
        ],

        techStack: [
            { layer: "Frontend", tech: "Dashboard-based UI for operations & monitoring" },
            { layer: "Backend", tech: "Integrated API layer across ERP, WMS, and finance systems" },
            { layer: "Data", tech: "Unified data model from MES, ERP, QMS, LIMS, and warehouse systems" },
            { layer: "AI", tech: "Demand forecasting (GR_NN), inventory optimization, predictive analytics" },
            { layer: "Integration", tech: "ERP, pharmacy systems, warehouse & logistics platforms" },
            { layer: "Compliance", tech: "CGMP-aligned workflows with audit trails and traceability" },
        ],

    },
    {
        slug: "AI_IOP_Food_Supply_Chain",
        title: "AI-Driven Integrated Operations Platform for Food Supply Chain",
        subtitle:
            "Freshness-aware forecasting, cold-chain visibility, and real-time quality control",

        industry: "Food Manufacturing & Distribution",
        scope: [
            "Demand Planning",
            "Inventory & Shelf-life",
            "Cold-chain Logistics",
            "Quality & Traceability",
        ],
        outcome: "Reduced waste and improved freshness-driven planning",

        heroImage: "/case-study-bg.png",

        challenge:
            "Fragmented systems across procurement, production, quality, and logistics created poor visibility into inventory freshness, cold-chain status, and demand variability, leading to waste, delays, and reactive decision-making.",

        solution: [
            "AI-powered demand forecasting combining sales, promotions, weather, and spoilage signals",
            "Shelf-life aware inventory tracking with lot and expiry management",
            "Real-time cold-chain monitoring with shipment and temperature tracking",
            "Integrated quality and traceability workflows for rapid recall and compliance",
            "Aligned procurement and production planning using unified demand signals",
            "Connected all departments into a single live operational dashboard",
        ],

        impact: [
            {
                title: "Reduced Waste",
                desc: "Minimized spoilage through proactive expiry and inventory control",
            },
            {
                title: "Better Planning",
                desc: "Improved demand and production alignment for perishable goods",
            },
            {
                title: "Faster Logistics Response",
                desc: "Enabled early intervention in cold-chain shipment disruptions",
            },
            {
                title: "Stronger Traceability",
                desc: "Improved batch tracking and faster recall readiness",
            },
            {
                title: "Operational Efficiency",
                desc: "Shifted from reactive workflows to predictive decision-making",
            },
        ],

        techStack: [
            { layer: "Frontend", tech: "React.js / Next.js dashboards" },
            { layer: "Backend", tech: "API-driven workflow orchestration" },
            { layer: "AI", tech: "Demand forecasting, spoilage prediction, replenishment intelligence" },
            { layer: "Data", tech: "Centralized data pipelines from ERP, QA, and logistics systems" },
            { layer: "Integration", tech: "ERP, WMS, temperature telemetry, supplier feeds" },
            { layer: "Infrastructure", tech: "Cloud-based scalable deployment" },
        ],

        pdf: "/case-study-food.pdf",
    },

    // ─────────────────────────────────────────────
    // 👕 APPAREL / TEXTILE CASE STUDY
    // ─────────────────────────────────────────────
    {
        slug: "AI_Powered_IOP_Food_Apparel_Textile_Case_Study_Updated",
        title: "AI-Driven Integrated Operations Platform for Apparel & Textile",
        subtitle:
            "Trend-driven planning, production visibility, and real-time quality control",

        industry: "Apparel & Textile Manufacturing",
        scope: [
            "Trend Forecasting",
            "Sourcing & Fabric Planning",
            "Production Scheduling",
            "Quality Control",
            "Order Fulfillment",
        ],
        outcome: "Faster response to trends with reduced scrap and delays",

        heroImage: "/case-study-bg.png",

        challenge:
            "Disconnected systems across style planning, sourcing, production, and logistics made it difficult to respond to fast-changing trends, material shortages, and quality issues, resulting in delays, rework, and excess inventory.",

        solution: [
            "AI-powered trend and demand forecasting using POS, online signals, and seasonal patterns",
            "Fabric and trim planning based on forecasted demand and production needs",
            "Production scheduling dashboards for line utilization and order prioritization",
            "Early-stage visual quality detection for defects and inconsistencies",
            "Shipment tracking with real-time logistics and delivery visibility",
            "Unified dashboard connecting commercial, sourcing, production, and logistics teams",
        ],

        impact: [
            {
                title: "Better Demand Alignment",
                desc: "Improved style and assortment planning based on real-time trends",
            },
            {
                title: "Reduced Rework",
                desc: "Lowered scrap through early detection of quality issues",
            },
            {
                title: "Improved Visibility",
                desc: "Real-time insights into material shortages and order delays",
            },
            {
                title: "Faster Response",
                desc: "Adapted quickly to trend shifts and supplier disruptions",
            },
            {
                title: "Operational Agility",
                desc: "Enabled data-driven decisions across departments",
            },
        ],

        techStack: [
            { layer: "Frontend", tech: "React.js / Next.js dashboards" },
            { layer: "Backend", tech: "API-driven workflow orchestration" },
            { layer: "AI", tech: "Trend forecasting, assortment optimization, defect detection" },
            { layer: "Data", tech: "Centralized pipelines from sales, sourcing, and production systems" },
            { layer: "Integration", tech: "ERP, PLM, WMS, supplier systems, logistics feeds" },
            { layer: "Infrastructure", tech: "Cloud-based scalable deployment" },
        ],

        pdf: "/case-study-apparel.pdf",
    },

    {
        slug: "Automotive_AI_Case_Study",
        title: "AI-Powered Automotive Manufacturing & Supply Chain Platform",
        subtitle:
            "Predictive maintenance, demand forecasting, and intelligent production control across automotive operations",

        industry: "Automotive Manufacturing & Supply Chain",
        scope: [
            "Production",
            "Maintenance",
            "Planning",
            "Inventory",
            "Quality",
        ],
        outcome: "Improved uptime, forecasting accuracy, and defect reduction",

        heroImage: "/case-study-bg.png",

        challenge:
            "Automotive operations suffered from disconnected sensor data, fragmented planning systems, and manual quality inspection processes, leading to unplanned downtime, inaccurate forecasts, and production inefficiencies across manufacturing and supply chain networks.",

        solution: [
            "AI-powered predictive maintenance using sensor, SCADA, and downtime data to prevent equipment failures",
            "Digital twin integration for real-time production monitoring and simulation-based optimization",
            "Advanced demand forecasting models combining sales, macro factors, and seasonality signals",
            "Spare parts forecasting using intermittent-demand AI models to reduce stockouts and overstock",
            "Computer vision-based quality inspection for defect detection with high accuracy",
            "Unified dashboard integrating MES, ERP, maintenance, and quality data into one decision layer",
        ],

        impact: [
            {
                title: "Higher Production Uptime",
                desc: "Reduced unplanned downtime and improved production-line efficiency using predictive maintenance and digital twins",
            },
            {
                title: "Better Demand Planning",
                desc: "Improved forecast accuracy with machine learning models, enabling optimized production and inventory decisions",
            },
            {
                title: "Optimized Spare Parts Inventory",
                desc: "Reduced stockouts and excess inventory through AI-based intermittent demand forecasting",
            },
            {
                title: "Improved Quality Control",
                desc: "Achieved high defect detection accuracy using computer vision, reducing rework and warranty risks",
            },
        ],

        techStack: [
            { layer: "Frontend", tech: "React / Next.js dashboards" },
            { layer: "Backend", tech: "API-driven orchestration layer" },
            { layer: "AI", tech: "Predictive maintenance, forecasting, and computer vision models" },
            { layer: "Data", tech: "MES, SCADA, ERP, WMS integrated data pipelines" },
            { layer: "Integration", tech: "Sensors, PLCs, quality systems, and dealer/order systems" },
            { layer: "Infrastructure", tech: "Cloud-based scalable deployment with monitoring" },
        ],

        pdf: "/case-study.pdf",
    },

    {
        slug: "Beauty_Products_AI_Case_Study_Innovacio",
        title: "AI-Powered Beauty Manufacturing & Supply Chain Platform",
        subtitle:
            "Demand forecasting, formulation intelligence, and quality control for plant-based beauty operations",

        industry: "Beauty / Cosmetics Manufacturing",
        scope: [
            "Demand Planning",
            "Formulation",
            "Production",
            "Quality",
            "Traceability",
        ],
        outcome: "Smarter planning, faster formulation, and improved product quality",

        heroImage: "/case-study-bg.png",

        challenge:
            "The manufacturer faced fragmented systems across demand planning, formulation, sourcing, and quality control. High SKU variety, trend-driven demand, ingredient sensitivity, and manual inspection processes led to inaccurate forecasts, slow product development, quality inconsistencies, and limited traceability.",

        solution: [
            "AI-powered demand forecasting combining SKU sales, promotions, sentiment, and channel data",
            "Formulation intelligence system linking lab data, supplier inputs, and product performance",
            "Predictive maintenance for mixers, fillers, and packaging lines using sensor and downtime data",
            "Computer vision-based packaging inspection for labels, fill levels, and defects",
            "End-to-end traceability linking raw materials, suppliers, and finished batches",
            "Unified operational dashboard integrating ERP, MES, WMS, QMS, and channel data",
        ],

        impact: [
            {
                title: "Improved Demand Accuracy",
                desc: "Better SKU-level forecasting reduced stockouts and excess inventory across channels",
            },
            {
                title: "Faster Product Development",
                desc: "Reduced trial-and-error in formulation with AI-driven ingredient selection and performance prediction",
            },
            {
                title: "Higher Production Reliability",
                desc: "Minimized downtime and production disruptions using predictive maintenance insights",
            },
            {
                title: "Better Quality & Traceability",
                desc: "Reduced defects and improved compliance with automated inspection and full batch traceability",
            },
        ],

        techStack: [
            { layer: "Frontend", tech: "React / Next.js dashboards" },
            { layer: "Backend", tech: "API-driven workflow orchestration" },
            { layer: "AI", tech: "Forecasting, formulation intelligence, anomaly detection, and computer vision" },
            { layer: "Data", tech: "ERP, MES, WMS, QMS, lab, and channel data pipelines" },
            { layer: "Integration", tech: "Supplier systems, e-commerce platforms, and production sensors" },
            { layer: "Infrastructure", tech: "Cloud-based scalable deployment with governance layer" },
        ],

        pdf: "/case-study.pdf",
    },

    {
        slug: "Ecommerce_3PL_AI_Case_Study_Innovacio",
        title: "AI-Powered E-commerce 3PL Fulfillment Control Tower",
        subtitle:
            "Synchronized warehousing, transportation, and cost-to-serve intelligence across nationwide fulfillment",

        industry: "E-commerce / 3PL / Logistics",
        scope: [
            "Order Management",
            "Warehouse Operations",
            "Transportation",
            "Labor Planning",
            "Returns Management",
        ],
        outcome: "One unified fulfillment control tower",

        heroImage: "/case-study-bg.png",

        challenge:
            "Disconnected OMS, WMS, TMS, and carrier systems led to poor visibility, manual reconciliation, inefficient picking and dispatch coordination, inaccurate demand planning, and hidden cost-to-serve across fulfillment operations.",

        solution: [
            "AI-powered fulfillment command center unifying OMS, WMS, TMS, ERP, and carrier data",
            "Order-risk scoring and exception routing for proactive SLA management",
            "Demand forecasting and labor planning at granular (site/time/channel) level",
            "Synchronized picking, packing, and dispatch aligned with carrier schedules",
            "Inventory allocation and replenishment intelligence across fulfillment nodes",
            "Cost-to-serve analytics with path-level profitability insights",
            "Returns intelligence and automated triage workflows",
            "Role-based dashboards for operations, planning, and leadership teams",
        ],

        impact: [
            {
                title: "End-to-End Visibility",
                desc: "Single view of orders, inventory, labor, and transportation across the network",
            },
            {
                title: "Improved SLA Performance",
                desc: "Reduced delays through proactive order-risk detection and intervention",
            },
            {
                title: "Optimized Labor & Capacity",
                desc: "Better workforce planning aligned with real-time demand fluctuations",
            },
            {
                title: "Lower Fulfillment Costs",
                desc: "Reduced inefficiencies via synchronized picking and delivery (~1.8% cost improvement)",
            },
            {
                title: "Better Margin Control",
                desc: "Cost-to-serve visibility enabled smarter routing and customer profitability decisions",
            },
            {
                title: "Efficient Returns Handling",
                desc: "Automated classification and recovery improved reverse logistics efficiency",
            },
        ],

        techStack: [
            { layer: "Frontend", tech: "React.js / Next.js dashboards" },
            { layer: "Backend", tech: "API-driven orchestration layer" },
            { layer: "AI", tech: "Demand forecasting, ETA prediction, order-risk scoring, cost-to-serve models" },
            { layer: "Data", tech: "Centralized data warehouse (OMS, WMS, TMS, ERP integration)" },
            { layer: "Integration", tech: "Carrier APIs, marketplace feeds, labor systems" },
            { layer: "Infrastructure", tech: "Cloud-based scalable deployment" },
        ],

        pdf: "/case-study.pdf",
    },

    {
        slug: "Electronics_AI_Case_Study_Innovacio",
        title: "AI-Powered Electronics Manufacturing & Supply Chain Platform",
        subtitle:
            "Predictive maintenance, demand planning, supplier intelligence, and real-time quality control in one system",

        industry: "Electronics Manufacturing / Semiconductor Supply Chain",
        scope: [
            "Production",
            "Planning",
            "Supplier Management",
            "Inventory",
            "Quality Inspection",
        ],
        outcome: "One unified operational control layer",

        heroImage: "/case-study-bg.png",

        challenge:
            "Short product life cycles, complex BOMs, volatile demand, and multi-tier supplier dependencies created frequent shortages, excess inventory, production downtime, and undetected quality defects across the electronics supply chain.",

        solution: [
            "AI-powered command center integrating MES, ERP, WMS, QMS, and supplier data",
            "Predictive maintenance using sensor data, anomaly detection, and edge analytics",
            "Demand forecasting cockpit combining sales, seasonality, and product lifecycle signals",
            "Supplier lead-time prediction and risk scoring for proactive procurement planning",
            "Dynamic inventory and safety stock optimization based on confidence bands",
            "Computer vision-based PCB and assembly defect detection",
            "Closed-loop quality feedback into production and supplier workflows",
            "Role-based dashboards for planners, engineers, and quality teams",
        ],

        impact: [
            {
                title: "Reduced Downtime",
                desc: "37% reduction in unplanned downtime through predictive maintenance",
            },
            {
                title: "Improved Equipment Efficiency",
                desc: "Up to 15% increase in OEE with early failure detection",
            },
            {
                title: "Better Demand Planning",
                desc: "Improved forecast accuracy using AI models like XGBoost and rapid baseline tools",
            },
            {
                title: "Stronger Supplier Reliability",
                desc: "Lead-time prediction and risk scoring reduced supply uncertainty",
            },
            {
                title: "Optimized Inventory",
                desc: "Dynamic safety stock reduced both shortages and excess inventory",
            },
            {
                title: "Higher Quality Control",
                desc: "Up to 97% defect detection accuracy using AI-powered visual inspection",
            },
        ],

        techStack: [
            { layer: "Frontend", tech: "React.js / Next.js dashboards" },
            { layer: "Backend", tech: "API-driven architecture with workflow orchestration" },
            { layer: "AI", tech: "Predictive maintenance, forecasting (XGBoost/Prophet), lead-time prediction, computer vision" },
            { layer: "Data", tech: "Unified data layer (MES, ERP, WMS, QMS, supplier systems)" },
            { layer: "Integration", tech: "PLCs, IoT sensors, supplier portals, inspection systems" },
            { layer: "Infrastructure", tech: "Cloud + edge computing for real-time processing" },
        ],

        pdf: "/case-study.pdf",
    },

    {
        slug: "Fashion_Clothing_Accessories_AI_Case_Study_Innovacio",
        title: "AI-Powered Sustainable Fashion Supply Chain Platform",
        subtitle:
            "Demand forecasting, inventory optimization, supplier traceability, and reverse logistics intelligence in one system",

        industry: "Sustainable Fashion / Apparel & Accessories",
        scope: [
            "Demand Planning",
            "Inventory Management",
            "Procurement",
            "Supplier Traceability",
            "Reverse Logistics",
            "Sustainability Reporting",
        ],
        outcome: "Unified AI-driven planning, sourcing, and sustainability control layer",

        heroImage: "/case-study-bg.png",

        challenge:
            "Short product life cycles, high SKU fragmentation (style-color-size), volatile demand, multi-tier supplier dependencies, and high return rates led to stock imbalances, markdown losses, poor traceability, and increased environmental impact across the fashion supply chain.",

        solution: [
            "AI-powered control tower integrating ERP, OMS, WMS, PIM, supplier, and returns data",
            "SKU-level demand forecasting using historical data, seasonality, and product attributes",
            "New-product demand prediction using transfer learning and censored-demand models",
            "Inventory risk engine with stockout prediction and inter-channel rebalancing recommendations",
            "Supplier intelligence dashboard with lead-time prediction, compliance tracking, and sustainability scoring",
            "Digital traceability layer mapping batches to facilities, processes, and emissions data",
            "Reverse logistics intelligence for return classification, recovery routing, and cost optimization",
            "Closed-loop feedback connecting returns, demand planning, and procurement decisions",
            "Role-based dashboards for merchandising, sourcing, operations, and sustainability teams",
        ],

        impact: [
            {
                title: "Reduced Stockouts",
                desc: "Proactive SKU-level stockout risk prediction improved product availability across channels",
            },
            {
                title: "Lower Inventory Waste",
                desc: "Early identification of slow movers reduced excess stock and markdown losses",
            },
            {
                title: "Improved Demand Planning",
                desc: "AI-driven forecasting improved accuracy for seasonal collections and new product launches",
            },
            {
                title: "Stronger Supplier Transparency",
                desc: "Supplier scorecards and traceability improved sourcing reliability and compliance",
            },
            {
                title: "Optimized Procurement Decisions",
                desc: "Lead-time prediction and supplier performance insights reduced delays and expedites",
            },
            {
                title: "Reduced Return Costs",
                desc: "Return-risk modeling and routing optimization lowered reverse logistics expenses",
            },
            {
                title: "Enhanced Sustainability",
                desc: "Traceability and returns optimization reduced emissions and improved reporting accuracy",
            },
        ],

        techStack: [
            { layer: "Frontend", tech: "React.js / Next.js role-based dashboards" },
            { layer: "Backend", tech: "API-driven architecture with workflow orchestration" },
            {
                layer: "AI",
                tech: "Demand forecasting, stockout prediction, supplier scoring, return classification, transfer learning models",
            },
            {
                layer: "Data",
                tech: "Unified data layer (ERP, OMS, WMS, PIM, supplier systems, returns and logistics data)",
            },
            {
                layer: "Integration",
                tech: "E-commerce platforms, supplier systems, logistics providers, sustainability data sources",
            },
            {
                layer: "Infrastructure",
                tech: "Cloud-based data platform with real-time analytics and scalable processing",
            },
        ],

        pdf: "/case-study.pdf",
    },

    {
        slug: "Healthcare_AI_Case_Study_Detailed",
        title: "AI-Powered Healthcare Operations & Supply Chain Platform",
        subtitle:
            "Bed forecasting, pharmacy intelligence, equipment uptime, and quality workflows in one system",

        industry: "Healthcare Operations / Hospital Supply Chain",
        scope: [
            "Patient Flow & Capacity Planning",
            "Pharmacy & Inventory Management",
            "Biomedical Equipment",
            "Procurement",
            "Quality & Compliance",
        ],
        outcome: "Unified AI-driven healthcare operations and supply chain control layer",

        heroImage: "/case-study-bg.png",

        challenge:
            "Highly variable patient demand, critical inventory dependencies, equipment downtime risks, and fragmented healthcare systems led to bed shortages, stock-outs, inefficient workflows, and delayed clinical operations across the network.",

        solution: [
            "AI-powered command center integrating EHR, HIS, ERP, WMS, IoMT, and quality systems",
            "Bed demand forecasting and capacity planning using admissions, discharge, and LOS data",
            "Pharmacy inventory optimization with AI + VMI-based replenishment and reconciliation",
            "Real-time stock visibility with inter-unit transfer and shortage alerts",
            "Predictive maintenance for critical medical equipment using IoMT telemetry and anomaly detection",
            "Equipment health scoring and failure prediction with early intervention alerts",
            "Quality and compliance automation with exception classification and workflow triage",
            "Role-based dashboards for operations, pharmacy, biomedical, and quality teams",
            "Closed-loop workflows connecting forecasting, inventory, maintenance, and compliance actions",
        ],

        impact: [
            {
                title: "Improved Bed Planning",
                desc: "Accurate forecasting reduced patient bottlenecks and improved staffing readiness",
            },
            {
                title: "Reduced Inventory Errors",
                desc: "Inventory error rate reduced by over 95% through automated reconciliation",
            },
            {
                title: "Higher Supply Chain Efficiency",
                desc: "Up to 42.4% improvement in pharmacy supply chain efficiency",
            },
            {
                title: "Lower Stock-Out Risk",
                desc: "AI-driven replenishment reduced shortages of critical medicines",
            },
            {
                title: "Reduced Equipment Downtime",
                desc: "Predictive maintenance enabled early fault detection and minimized disruptions",
            },
            {
                title: "Faster Quality Workflows",
                desc: "Automated triage and monitoring reduced audit and review cycle time",
            },
            {
                title: "Better Patient Experience",
                desc: "Reduced waiting times and improved service continuity across departments",
            },
        ],

        techStack: [
            { layer: "Frontend", tech: "React.js / Next.js healthcare dashboards" },
            {
                layer: "Backend",
                tech: "API-driven architecture with workflow orchestration and healthcare integrations",
            },
            {
                layer: "AI",
                tech: "Demand forecasting (RF/XGBoost), inventory optimization, predictive maintenance, anomaly detection, workflow classification",
            },
            {
                layer: "Data",
                tech: "Unified data layer (EHR, HIS, ERP, WMS, pharmacy systems, IoMT telemetry)",
            },
            {
                layer: "Integration",
                tech: "Hospital systems, medical devices (IoMT), pharmacy systems, compliance platforms",
            },
            {
                layer: "Infrastructure",
                tech: "Cloud-based platform with real-time analytics and secure healthcare data processing",
            },
        ],

        pdf: "/case-study.pdf",
    },

    {
    slug: "Lighting_Fixtures_Distribution_AI_Case_Study_Innovacio",
    title: "AI-Powered Lighting & Fixtures Distribution Platform",
    subtitle:
      "Project-driven procurement, demand forecasting, supplier intelligence, and jobsite delivery coordination in one system",

    industry: "Lighting & Fixtures Distribution / Construction Supply Chain",
    scope: [
      "Project Procurement",
      "Demand Planning",
      "Inventory Management",
      "Supplier Management",
      "Warehouse & Delivery Coordination",
    ],
    outcome: "One unified project-driven supply chain control tower",

    heroImage: "/case-study-bg.png",

    challenge:
      "Project-based demand volatility, specification-sensitive fixtures, fragmented submittal and procurement workflows, supplier lead-time uncertainty, and poor jobsite coordination led to delays, overstocking, missing materials, and costly project disruptions.",

    solution: [
      "AI-powered control tower integrating submittals, quotations, inventory, suppliers, and project milestones",
      "Automated fixture specification extraction and submittal status tracking",
      "ML-based demand forecasting using project pipeline, historical orders, and phase changes",
      "Inventory optimization with SKU-level tracking, safety stock tuning, and stock-risk alerts",
      "Supplier lead-time prediction, ETA forecasting, and risk scoring",
      "Project prioritization based on schedule risk and long-lead item visibility",
      "Warehouse kitting and project-based material reservation system",
      "Jobsite delivery coordination aligned with installation schedules and readiness",
      "Exception alerts for delays, missing components, and substitution risks",
      "Role-based dashboards for procurement, project managers, warehouse, and field teams",
    ],

    impact: [
      {
        title: "Improved Project Visibility",
        desc: "Unified dashboard reduced fragmented tracking across submittals, suppliers, and project timelines",
      },
      {
        title: "Better Forecast Accuracy",
        desc: "ML models (Neural Networks R² up to 0.93) improved demand planning for project-driven materials",
      },
      {
        title: "Reduced Stock Risks",
        desc: "AI-driven inventory planning minimized both stockouts and excess inventory",
      },
      {
        title: "Stronger Supplier Reliability",
        desc: "Lead-time prediction and supplier scoring enabled proactive sourcing decisions",
      },
      {
        title: "Fewer Project Delays",
        desc: "Early risk detection and milestone alignment reduced late deliveries and installation disruptions",
      },
      {
        title: "Optimized Warehouse Operations",
        desc: "Kitting and delivery coordination improved material flow and reduced handling inefficiencies",
      },
    ],

    techStack: [
      { layer: "Frontend", tech: "React.js / Next.js role-based dashboards" },
      { layer: "Backend", tech: "API-driven workflow orchestration and project tracking engine" },
      { layer: "AI", tech: "Demand forecasting (ML models), supplier risk scoring, ETA prediction, document classification" },
      { layer: "Data", tech: "Unified data layer (ERP, project schedules, supplier records, inventory systems)" },
      { layer: "Integration", tech: "Supplier systems, procurement tools, warehouse systems, project management platforms" },
      { layer: "Infrastructure", tech: "Cloud-based architecture with real-time data synchronization" },
    ],

    pdf: "/case-study.pdf",
  },

    {
    slug: "Nutrition_Wellness_AI_Case_Study_Innovacio",
    title: "AI-Powered Nutrition, Health & Wellness Manufacturing Platform",
    subtitle:
      "Supplier traceability, demand forecasting, expiry-aware inventory, and quality control in one unified system",

    industry: "Nutrition / Dietary Supplements / Health & Wellness Manufacturing",
    scope: [
      "Supplier Management",
      "Demand Planning",
      "Inventory Optimization",
      "Quality Control",
      "Compliance & Traceability",
    ],
    outcome: "One unified AI-driven control layer for traceability, planning, and quality",

    heroImage: "/case-study-bg.png",

    challenge:
      "Disconnected procurement, supplier qualification, inventory, and batch management systems led to poor lot traceability, slow sourcing decisions, inventory mismatches, expiry risks, and heavy manual workload across operations and quality teams.",

    solution: [
      "AI-powered control tower integrating supplier data, purchase orders, inventory, batch records, and sales signals",
      "Supplier intelligence dashboard with risk scoring based on delivery, quality, and compliance metrics",
      "Automated traceability linking supplier lots to finished batches for faster genealogy tracking",
      "Demand forecasting engine combining sales, promotions, seasonality, and channel mix",
      "Expiry-aware inventory planning with dynamic replenishment and write-off risk alerts",
      "SKU segmentation into fast movers, seasonal, and long-tail items for better planning decisions",
      "Quality dashboard with AI-driven batch review, deviation detection, and packaging validation",
      "Real-time alerts for missing certificates, inconsistent lot data, and supplier performance issues",
      "Quarantine and exception workflows integrated across procurement and quality teams",
      "Role-based dashboards for procurement, operations, quality, and compliance teams",
    ],

    impact: [
      {
        title: "Improved Supplier Reliability",
        desc: "AI-driven supplier scoring enabled faster and more informed sourcing decisions",
      },
      {
        title: "Faster Traceability & Recall Response",
        desc: "End-to-end lot genealogy reduced traceability time and improved compliance readiness",
      },
      {
        title: "Reduced Inventory Waste",
        desc: "Expiry-aware planning minimized write-offs and excess stock",
      },
      {
        title: "Better Demand Planning",
        desc: "Multi-horizon forecasting improved service levels and reduced stock mismatches",
      },
      {
        title: "Enhanced Quality Control",
        desc: "Automated batch review and deviation detection reduced manual workload and errors",
      },
      {
        title: "Stronger Compliance & Audit Readiness",
        desc: "Integrated data and traceability improved adherence to cGMP and regulatory requirements",
      },
    ],

    techStack: [
      { layer: "Frontend", tech: "React.js / Next.js role-based dashboards" },
      { layer: "Backend", tech: "API-driven architecture with workflow orchestration and traceability engine" },
      { layer: "AI", tech: "Demand forecasting, supplier risk scoring, anomaly detection, expiry-aware inventory optimization" },
      { layer: "Data", tech: "Unified data layer (ERP, WMS, QMS, supplier records, sales data)" },
      { layer: "Integration", tech: "Supplier systems, quality systems, inventory platforms, compliance records" },
      { layer: "Infrastructure", tech: "Cloud-based platform with real-time data processing and monitoring" },
    ],

    pdf: "/case-study.pdf",
  },

];
