"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { KpiCard } from "./KpiCard";
import {
  TrendingUp,
  Clock,
  Users,
  Zap,
  Shield,
  Target,
} from "lucide-react";

export function KpiSection() {
  const kpis = [
    {
      label: "Cost Reduction",
      value: 30,
      unit: "%",
      icon: <TrendingUp size={24} />,
    },
    {
      label: "Time Saved",
      value: 45,
      unit: "hrs/mo",
      icon: <Clock size={24} />,
    },
    {
      label: "Active Users",
      value: "10,000",
      unit: "+",
      icon: <Users size={24} />,
    },
    {
      label: "Uptime SLA",
      value: 99.9,
      unit: "%",
      icon: <Zap size={24} />,
    },
    {
      label: "Data Security",
      value: "SOC 2",
      unit: " Type II",
      icon: <Shield size={24} />,
    },
    {
      label: "Accuracy Rate",
      value: 94.2,
      unit: "%",
      icon: <Target size={24} />,
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-orange-100 via-white to-orange-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Proven Results & Impact
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Trusted by enterprises worldwide. Here's what we deliver.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {kpis.map((kpi, idx) => (
            <KpiCard
              key={idx}
              label={kpi.label}
              value={kpi.value}
              unit={kpi.unit}
              icon={kpi.icon}
              delay={idx * 0.1}
            />
          ))}
        </div>

        {/* Testimonial */}
        <AnimatedSection delay={0.6} className="mt-16">
          <motion.div
            className="bg-white rounded-3xl p-8 md:p-12 shadow-soft-xl border border-gray-200 max-w-3xl mx-auto overflow-hidden group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                >
                  <span className="text-2xl text-amber-400">★</span>
                </motion.div>
              ))}
            </div>
            <p className="text-xl text-gray-900 mb-6 leading-relaxed">
              "Procuro has transformed our procurement operations. We've reduced
              costs by 32% and cut sourcing time by half. The AI insights are
              incredibly accurate and the platform is a joy to use."
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600" />
              <div>
                <p className="font-bold text-gray-900">Sarah Johnson</p>
                <p className="text-sm text-gray-600">
                  VP of Procurement, TechCorp Industries
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}
