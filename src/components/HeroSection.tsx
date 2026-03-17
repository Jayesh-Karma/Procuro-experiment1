"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { Button } from "./Button";
import { FloatingCard } from "./FloatingCard";
import { ParallaxWrapper } from "./ParallaxWrapper";
import { ArrowRight } from "lucide-react";

export function HeroSection() {
  // Mouse parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [6, -6]);
  const rotateY = useTransform(mouseX, [-300, 300], [-6, 6]);

  return (
    <section
      onMouseMove={(e) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      }}
      className="relative min-h-screen bg-gradient-to-br from-white via-orange-50/40 to-white overflow-hidden pt-10 pb-20"
    >
      {/* Background Orbs (more subtle & slower) */}
      <motion.div
        className="absolute top-32 right-20 w-96 h-96 bg-orange-300 rounded-full blur-3xl opacity-10"
        animate={{ scale: [1, 1.08, 1], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-amber-300 rounded-full blur-3xl opacity-10"
        animate={{ scale: [1, 1.1, 1], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[80vh]">

          {/* LEFT */}
          <div className="space-y-8">
            
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
            >
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-orange-700">
                AI Procurement Intelligence
              </span>
            </motion.div>

            {/* HEADLINE */}
            <div className="space-y-2">
              {["Predict.", "Plan.", "Procure Intelligently."].map((text, i) => (
                <motion.h1
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1 }}
                  className={`text-5xl md:text-6xl font-bold tracking-tight ${
                    i === 2
                      ? "bg-gradient-to-r from-orange-600 to-amber-500 text-transparent bg-clip-text"
                      : "text-gray-900"
                  }`}
                >
                  {text}
                </motion.h1>
              ))}
            </div>

            {/* DESCRIPTION */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600 max-w-xl leading-relaxed"
            >
              Procuro connects to your systems and predicts demand, optimizes raw material planning, and delivers intelligent procurement recommendations in real time.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex gap-4"
            >
              <Button size="lg">
                Request Demo
                <ArrowRight className="ml-2" size={18} />
              </Button>
              <Button size="lg" variant="outline">
                Explore Platform
              </Button>
            </motion.div>

            {/* STATS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex gap-10 pt-6 border-t border-gray-200"
            >
              {[
                { value: "30%", label: "Cost Reduction" },
                { value: "94%", label: "Prediction Accuracy" },
                { value: "99.9%", label: "System Reliability" },
              ].map((item, i) => (
                <div key={i}>
                  <p className="text-2xl font-bold text-orange-600">{item.value}</p>
                  <p className="text-sm text-gray-600">{item.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT SIDE (REAL ANTIGRAVITY) */}
          <motion.div
            style={{ rotateX, rotateY }}
            className="relative hidden lg:block h-[520px]"
          >
            {/* Center main card */}
            <FloatingCard className="absolute top-24 left-1/2 -translate-x-1/2 w-72">
              <div className="bg-white rounded-2xl p-6 shadow-xl border">
                <p className="text-sm text-gray-500 mb-2">Steel Inventory</p>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-orange-500"
                    initial={{ width: "20%" }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 2 }}
                  />
                </div>
                <p className="text-sm text-gray-600">12 days remaining</p>
              </div>
            </FloatingCard>

            {/* Floating Insight */}
            <FloatingCard delay={0.3} className="absolute top-0 right-10 w-60">
              <div className="bg-white rounded-xl p-5 shadow-lg border">
                <p className="text-sm font-medium text-gray-800">
                  ⚠️ Shortage Predicted
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Order 2.4 tons within 5 days
                </p>
              </div>
            </FloatingCard>

            {/* Floating Graph */}
            <FloatingCard delay={0.6} className="absolute bottom-0 left-10 w-64">
              <div className="bg-white rounded-xl p-5 shadow-lg border">
                <p className="text-sm text-gray-500 mb-2">Demand Forecast</p>
                <motion.div
                  className="h-16 w-full bg-gradient-to-r from-orange-400 to-orange-200 rounded-md"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </FloatingCard>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
