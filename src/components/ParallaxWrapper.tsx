"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

interface ParallaxWrapperProps {
  children: ReactNode;
  offset?: number;
  className?: string;
}

export function ParallaxWrapper({
  children,
  offset = 50,
  className = "",
}: ParallaxWrapperProps) {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, (latest) => latest * 0.5 - offset);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
