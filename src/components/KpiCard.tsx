"use client";

import { motion } from "framer-motion";

interface KpiCardProps {
  label: string;
  value: string | number;
  unit?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export function KpiCard({
  label,
  value,
  unit = "",
  icon,
  delay = 0,
}: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className="group relative bg-white rounded-2xl p-8 shadow-soft hover:shadow-soft-xl transition-all duration-300 border border-gray-100 overflow-hidden"
    >
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          {icon && (
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: delay + 0.1 }}
              className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors duration-300"
            >
              {icon}
            </motion.div>
          )}
        </div>

        <motion.div
          className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2 }}
        >
          {value}
          {unit && <span className="text-2xl md:text-3xl ml-2">{unit}</span>}
        </motion.div>

        <p className="text-gray-600 font-medium text-lg">{label}</p>
      </div>

      {/* Border accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
