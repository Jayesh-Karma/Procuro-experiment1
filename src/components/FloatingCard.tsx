"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { ReactNode } from "react";

interface FloatingCardProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  rotation?: number;
}

export function FloatingCard({
  children,
  delay = 0,
  className = "",
  rotation = 3,
}: FloatingCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [rotation, -rotation]);
  const rotateY = useTransform(mouseX, [-300, 300], [-rotation, rotation]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        perspective: "1000px",
      }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="h-full"
      >
        <div className="relative bg-white rounded-2xl p-8 shadow-soft-lg hover:shadow-soft-xl transition-all duration-300 border border-gray-100 h-full overflow-hidden group">
          {/* Gradient background overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>

          {/* Border accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-600 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </motion.div>
    </motion.div>
  );
}
         