"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedSection } from "./AnimatedSection";
import { useRef } from "react";

export function PredictiveIntelligenceSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const dataPoints = [
    { month: "Jan", actual: 4000, predicted: 4200 },
    { month: "Feb", actual: 3000, predicted: 3100 },
    { month: "Mar", actual: 2000, predicted: 2300 },
    { month: "Apr", actual: 2780, predicted: 2800 },
    { month: "May", actual: 1890, predicted: 2100 },
    { month: "Jun", actual: 2390, predicted: 2450 },
    { month: "Jul", actual: 3490, predicted: 3500 },
  ];

  const maxValue = 5000;
  const chartHeight = 200;

  return (
    <section ref={ref} className="py-24 bg-gradient-to-br from-white to-orange-50">
      <div className="container mx-auto px-4">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Predictive Intelligence
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our AI analyzes historical data and market trends to forecast
            procurement needs with remarkable accuracy.
          </p>
        </AnimatedSection>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl p-8 md:p-12 shadow-soft-xl border border-gray-200 overflow-hidden group"
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                12-Month Demand Forecast
              </h3>
              <p className="text-gray-600">
                Predicted vs. Actual procurement volumes
              </p>
            </div>

            {/* Chart SVG */}
            <svg
              viewBox="0 0 800 300"
              className="w-full h-auto"
              ref={ref}
            >
              {/* Grid lines */}
              {[0, 1, 2, 3, 4].map((i) => (
                <line
                  key={`grid-${i}`}
                  x1="60"
                  y1={50 + i * 40}
                  x2="780"
                  y2={50 + i * 40}
                  stroke="#e5e7eb"
                  strokeDasharray="5,5"
                />
              ))}

              {/* Axes */}
              <line x1="60" y1="50" x2="60" y2="250" stroke="#9ca3af" strokeWidth="2" />
              <line x1="60" y1="250" x2="780" y2="250" stroke="#9ca3af" strokeWidth="2" />

              {/* Y-axis labels */}
              {[0, 1, 2, 3, 4].map((i) => (
                <text
                  key={`y-label-${i}`}
                  x="40"
                  y={250 - i * 40 + 5}
                  textAnchor="end"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {((4 - i) * 1000).toLocaleString()}
                </text>
              ))}

              {/* X-axis labels - months */}
              {dataPoints.map((point, idx) => (
                <text
                  key={`x-label-${idx}`}
                  x={75 + idx * 100}
                  y="280"
                  textAnchor="middle"
                  fontSize="12"
                  fill="#6b7280"
                >
                  {point.month}
                </text>
              ))}

              {/* Actual line (smooth curve) */}
              <motion.polyline
                points={dataPoints
                  .map(
                    (point, idx) =>
                      `${75 + idx * 100},${250 - (point.actual / maxValue) * 200}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#f97316"
                strokeWidth="3"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />

              {/* Predicted line (dashed) */}
              <motion.polyline
                points={dataPoints
                  .map(
                    (point, idx) =>
                      `${75 + idx * 100},${250 - (point.predicted / maxValue) * 200}`
                  )
                  .join(" ")}
                fill="none"
                stroke="#fbbf24"
                strokeWidth="3"
                strokeDasharray="5,5"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2, ease: "easeInOut" }}
              />

              {/* Data points for actual */}
              {dataPoints.map((point, idx) => (
                <motion.circle
                  key={`actual-point-${idx}`}
                  cx={75 + idx * 100}
                  cy={250 - (point.actual / maxValue) * 200}
                  r="5"
                  fill="#f97316"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ r: 8, fill: "#ea580c" }}
                />
              ))}

              {/* Data points for predicted */}
              {dataPoints.map((point, idx) => (
                <motion.circle
                  key={`predicted-point-${idx}`}
                  cx={75 + idx * 100}
                  cy={250 - (point.predicted / maxValue) * 200}
                  r="5"
                  fill="#fbbf24"
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 + 0.1 }}
                  whileHover={{ r: 8, fill: "#f59e0b" }}
                />
              ))}

              {/* Legend */}
              <g>
                <line x1="550" y1="20" x2="580" y2="20" stroke="#f97316" strokeWidth="2" />
                <text x="590" y="25" fontSize="14" fill="#1f2937" fontWeight="500">
                  Actual
                </text>

                <line
                  x1="550"
                  y1="45"
                  x2="580"
                  y2="45"
                  stroke="#fbbf24"
                  strokeWidth="2"
                  strokeDasharray="5,5"
                />
                <text x="590" y="50" fontSize="14" fill="#1f2937" fontWeight="500">
                  Predicted
                </text>
              </g>
            </svg>

            {/* Key metrics */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <p className="text-gray-600 text-sm mb-2">Forecast Accuracy</p>
                <p className="text-3xl font-bold text-orange-600">94.2%</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className="text-gray-600 text-sm mb-2">Data Points Analyzed</p>
                <p className="text-3xl font-bold text-orange-600">2.5M+</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-gray-600 text-sm mb-2">Update Frequency</p>
                <p className="text-3xl font-bold text-orange-600">Real-time</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
