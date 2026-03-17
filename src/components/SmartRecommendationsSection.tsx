"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { TrendingUp, Award, Zap } from "lucide-react";

interface Recommendation {
  id: number;
  supplier: string;
  item: string;
  savings: number;
  leadTime: string;
  quality: number;
  riskLevel: "low" | "medium" | "high";
}

export function SmartRecommendationsSection() {
  const recommendations: Recommendation[] = [
    {
      id: 1,
      supplier: "Global Steel Industries",
      item: "Steel Alloy A1",
      savings: 15,
      leadTime: "5 days",
      quality: 9.2,
      riskLevel: "low",
    },
    {
      id: 2,
      supplier: "Copper Innovations Ltd",
      item: "Copper Wire (10mm)",
      savings: 22,
      leadTime: "7 days",
      quality: 8.8,
      riskLevel: "low",
    },
    {
      id: 3,
      supplier: "Premium Aluminum Co",
      item: "Aluminum Ingots",
      savings: 18,
      leadTime: "3 days",
      quality: 9.5,
      riskLevel: "low",
    },
    {
      id: 4,
      supplier: "Carbon Tech Solutions",
      item: "Carbon Fiber Sheets",
      savings: 28,
      leadTime: "4 days",
      quality: 9.3,
      riskLevel: "medium",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="py-24 bg-gradient-to-b from-orange-50 to-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Smart Procurement Recommendations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            AI-curated supplier options ranked by price, quality, delivery time,
            and risk assessment.
          </p>
        </AnimatedSection>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto"
        >
          {recommendations.map((rec, idx) => (
            <motion.div
              key={rec.id}
              // variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="group relative bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-xl transition-all border border-gray-100 overflow-hidden"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Border accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg group-hover:text-orange-600 transition-colors">
                      {rec.supplier}
                    </h3>
                    <p className="text-sm text-gray-600 mt-1">{rec.item}</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-soft-lg group-hover:shadow-soft-xl transition-shadow"
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                    }}
                  >
                    {rec.savings}%
                  </motion.div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-3 mb-4 bg-gray-50 rounded-lg p-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Lead Time</p>
                    <p className="font-semibold text-gray-900">{rec.leadTime}</p>
                  </div>
                  <div className="text-center border-l border-r border-gray-200">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Quality</p>
                    <p className="font-semibold text-gray-900">{rec.quality}/10</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 mb-1 font-medium">Risk</p>
                    <p
                      className={`font-semibold ${
                        rec.riskLevel === "low"
                          ? "text-green-600"
                          : rec.riskLevel === "medium"
                            ? "text-yellow-600"
                            : "text-red-600"
                      }`}
                    >
                      {rec.riskLevel.charAt(0).toUpperCase() +
                        rec.riskLevel.slice(1)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quality bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-gray-600">
                    Quality Score
                  </span>
                  <Award size={14} className="text-amber-500" />
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(rec.quality / 10) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: idx * 0.2 }}
                    className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 bg-orange-600 text-white py-2 rounded-lg font-medium text-sm hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
                >
                  <TrendingUp size={16} />
                  Select Supplier
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-1 border-2 border-orange-600 text-orange-600 py-2 rounded-lg font-medium text-sm hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Zap size={16} />
                  Compare
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary */}
        <AnimatedSection delay={0.4} className="mt-16">
          <motion.div
            className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-2xl p-8 border-2 border-orange-200"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Combined Savings Potential
              </h4>
              <p className="text-4xl font-bold text-orange-600 mb-2">
                $125,400
              </p>
              <p className="text-gray-700">
                By implementing these recommendations across all procurement
                categories this quarter
              </p>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
