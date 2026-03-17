"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { AlertCircle } from "lucide-react";

interface Material {
  id: number;
  name: string;
  usage: number;
  capacity: number;
  status: "critical" | "warning" | "normal";
  trend: number;
}

export function RawMaterialIntelligenceSection() {
  const materials: Material[] = [
    { id: 1, name: "Steel Alloy A1", usage: 78, capacity: 100, status: "critical", trend: -12 },
    { id: 2, name: "Copper Wire", usage: 45, capacity: 100, status: "normal", trend: 5 },
    { id: 3, name: "Aluminum Ingots", usage: 62, capacity: 100, status: "warning", trend: -8 },
    { id: 4, name: "Carbon Fiber", usage: 88, capacity: 100, status: "critical", trend: -15 },
    { id: 5, name: "Silicon Wafers", usage: 35, capacity: 100, status: "normal", trend: 3 },
    { id: 6, name: "Rare Earth Elements", usage: 92, capacity: 100, status: "critical", trend: -20 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical":
        return "bg-red-500";
      case "warning":
        return "bg-yellow-500";
      default:
        return "bg-green-500";
    }
  };

  const getBarColor = (status: string) => {
    switch (status) {
      case "critical":
        return "from-red-400 to-red-600";
      case "warning":
        return "from-yellow-400 to-yellow-600";
      default:
        return "from-green-400 to-green-600";
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Raw Material Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real-time inventory tracking with predictive alerts to prevent
            shortages and optimize stock levels.
          </p>
        </AnimatedSection>

        <div className="max-w-4xl mx-auto space-y-6">
          {materials.map((material, idx) => (
            <motion.div
              key={material.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: 0.6,
                delay: idx * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="group relative bg-white rounded-2xl p-6 hover:shadow-soft-xl transition-all border border-gray-200 overflow-hidden"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Border accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Content */}
              {/* <div className="relative z-10"> */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-gray-900">
                      {material.name}
                    </h3>
                    {material.status === "critical" && (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                        }}
                      >
                        <AlertCircle size={16} className="text-red-500" />
                      </motion.div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {material.usage} / {material.capacity} units
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <span
                      className={`text-sm font-semibold ${
                        material.trend > 0 ? "text-red-600" : "text-green-600"
                      }`}
                    >
                      {material.trend > 0 ? "↑" : "↓"}
                    </span>
                    <span className="text-sm text-gray-600">
                      {Math.abs(material.trend)}% this week
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress bar with animation */}
              <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${material.usage}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: idx * 0.1 + 0.2,
                    ease: "easeInOut",
                  }}
                  className={`h-full bg-gradient-to-r ${getBarColor(
                    material.status
                  )} rounded-full`}
                />
              </div>

              {/* Status badge */}
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">
                  {Math.round((material.usage / material.capacity) * 100)}% capacity
                </span>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: idx * 0.1 + 0.3,
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium text-white shadow-soft-lg ${getStatusColor(
                    material.status
                  )}`}
                >
                  {material.status.charAt(0).toUpperCase() +
                    material.status.slice(1)}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Alert section */}
        <AnimatedSection delay={0.5}>
          <motion.div
            className="mt-16 bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-8 border-2 border-red-200"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="flex items-start gap-4">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex-shrink-0"
              >
                <AlertCircle className="text-red-600" size={28} />
              </motion.div>
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-2">
                  Critical Alert: Steel Alloy A1
                </h4>
                <p className="text-gray-700 mb-4">
                  Current inventory will deplete in 3 days. Recommended action:
                  Place emergency order by end of business today to avoid
                  production delays.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  Create Purchase Order
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
