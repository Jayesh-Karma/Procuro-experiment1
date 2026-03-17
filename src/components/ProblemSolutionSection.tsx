"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { TrendingDown, AlertCircle, Clock, DollarSign } from "lucide-react";

export function ProblemSolutionSection() {
  const problems = [
    {
      id: 1,
      icon: AlertCircle,
      title: "Unpredictable Costs",
      description: "Manual processes lead to unexpected price fluctuations",
    },
    {
      id: 2,
      icon: TrendingDown,
      title: "Supply Chain Risks",
      description: "Limited visibility into supplier capabilities",
    },
    {
      id: 3,
      icon: Clock,
      title: "Time Wasted",
      description: "Days spent on manual sourcing and negotiations",
    },
    {
      id: 4,
      icon: DollarSign,
      title: "Inefficient Spending",
      description: "Missed opportunities for cost optimization",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            The Procurement Challenge
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Traditional procurement methods are slow, costly, and unpredictable.
            It's time for intelligent automation.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {/* Problems */}
          <AnimatedSection>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Current Pain Points
            </h3>
            <div className="space-y-6">
              {problems.map((problem, idx) => {
                const Icon = problem.icon;
                return (
                  <motion.div
                    key={problem.id}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: idx * 0.1,
                      ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                    className="group flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-soft-lg transition-all border border-transparent hover:border-gray-200 duration-300"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors duration-300 shadow-soft group-hover:shadow-soft-lg">
                      <Icon className="text-red-600 group-hover:scale-110 transition-transform duration-300" size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors duration-300">
                        {problem.title}
                      </h4>
                      <p className="text-gray-600 text-sm mt-1">
                        {problem.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Solutions */}
          <AnimatedSection delay={0.2}>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Procuro Solutions
            </h3>
            <div className="space-y-6">
              {problems.map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: idx * 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="group flex gap-4 p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-soft-lg transition-all border border-transparent hover:border-gray-200 duration-300"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors duration-300 shadow-soft group-hover:shadow-soft-lg">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: idx * 0.1,
                      }}
                      className="text-green-600 text-lg font-bold group-hover:scale-125 transition-transform duration-300"
                    >
                      ✓
                    </motion.div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-green-600 transition-colors duration-300">
                      {[
                        "Predictive Cost Planning",
                        "Real-time Supplier Analytics",
                        "Automated Smart Sourcing",
                        "Intelligent Optimization",
                      ][idx]}
                    </h4>
                    <p className="text-gray-600 text-sm mt-1">
                      {[
                        "Forecast and optimize costs with AI insights",
                        "Monitor and analyze supplier performance",
                        "Find best suppliers in minutes, not days",
                        "Maximize savings at every step",
                      ][idx]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
