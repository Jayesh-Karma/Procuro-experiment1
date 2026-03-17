"use client";

import { motion } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import {
  Database,
  Cloud,
  BarChart3,
  Zap,
  Truck,
  ShoppingCart,
} from "lucide-react";

interface Integration {
  id: number;
  name: string;
  icon: any;
  description: string;
}

export function IntegrationSection() {
  const integrations: Integration[] = [
    {
      id: 1,
      name: "ERP Systems",
      icon: Database,
      description: "SAP, Oracle, NetSuite",
    },
    {
      id: 2,
      name: "Cloud Platforms",
      icon: Cloud,
      description: "AWS, Azure, GCP",
    },
    {
      id: 3,
      name: "Analytics",
      icon: BarChart3,
      description: "Tableau, Power BI",
    },
    {
      id: 4,
      name: "Automation",
      icon: Zap,
      description: "Zapier, Make",
    },
    {
      id: 5,
      name: "Logistics",
      icon: Truck,
      description: "FedEx, DHL APIs",
    },
    {
      id: 6,
      name: "Marketplaces",
      icon: ShoppingCart,
      description: "Alibaba, Global Sources",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Seamless Integrations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Procuro connects with your entire tech stack for unified
            procurement operations.
          </p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          {/* SVG Network diagram */}
          <div className="mb-16 relative">
            <svg
              viewBox="0 0 800 300"
              className="w-full h-auto"
              style={{ filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.1))" }}
            >
              {/* Center connection point */}
              <motion.circle
                cx="400"
                cy="150"
                r="30"
                fill="#f97316"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              />

              <motion.text
                x="400"
                y="155"
                textAnchor="middle"
                fill="white"
                fontSize="14"
                fontWeight="bold"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Procuro
              </motion.text>

              {/* Connecting lines */}
              {[0, 1, 2, 3, 4, 5].map((idx) => {
                const angle = (idx / 6) * Math.PI * 2;
                const x = 400 + Math.cos(angle) * 150;
                const y = 150 + Math.sin(angle) * 120;

                return (
                  <motion.line
                    key={`line-${idx}`}
                    x1="400"
                    y1="150"
                    x2={x}
                    y2={y}
                    stroke="#e5e7eb"
                    strokeWidth="2"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.8,
                      delay: idx * 0.1,
                    }}
                  />
                );
              })}

              {/* Integration nodes */}
              {integrations.map((integration, idx) => {
                const angle = (idx / 6) * Math.PI * 2;
                const x = 400 + Math.cos(angle) * 150;
                const y = 150 + Math.sin(angle) * 120;

                return (
                  <g key={`integration-${integration.id}`}>
                    <motion.circle
                      cx={x}
                      cy={y}
                      r="40"
                      fill="white"
                      stroke="#f97316"
                      strokeWidth="2"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                        delay: idx * 0.1 + 0.3,
                      }}
                    />
                  </g>
                );
              })}
            </svg>

            {/* Integration cards positioned around the diagram */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-12"
            >
              {integrations.map((integration) => {
                const Icon = integration.icon;
                return (
                  <motion.div
                    key={integration.id}
                    // variants={itemVariants}
                    whileHover={{ y: -8 }}
                    className="group relative bg-white rounded-2xl p-6 text-center cursor-pointer hover:shadow-soft-xl transition-all border border-gray-200 overflow-hidden"
                  >
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Border accent */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content */}
                    <div className="relative z-10">
                      <motion.div
                        className="w-12 h-12 mx-auto mb-4 bg-orange-100 rounded-lg flex items-center justify-center text-orange-600 group-hover:bg-orange-200 transition-colors duration-300 shadow-soft group-hover:shadow-soft-lg"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                        }}
                      >
                        <Icon size={24} />
                      </motion.div>
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-300">
                        {integration.name}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {integration.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Integration stats */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="relative bg-white rounded-2xl p-8 text-center shadow-soft hover:shadow-soft-xl transition-all border border-gray-200 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 mb-2">50+</p>
                <p className="text-gray-600 font-medium">Native Integrations</p>
              </div>
            </div>
            <div className="relative bg-white rounded-2xl p-8 text-center shadow-soft hover:shadow-soft-xl transition-all border border-gray-200 group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-orange-500 mb-2">100%</p>
                <p className="text-gray-600 font-medium">API Coverage</p>
              </div>
            </div>
            <div className="relative bg-white rounded-2xl p-8 text-center shadow-soft hover:shadow-soft-xl transition-all border border-gray-200 group overflow-hidden">
              <p className="text-4xl font-bold text-orange-600 mb-2">24/7</p>
              <p className="text-gray-600">Real-time Sync</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
