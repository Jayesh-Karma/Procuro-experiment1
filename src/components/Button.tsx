"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  className?: string;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
}

const baseStyles =
  "inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-soft hover:shadow-soft-lg";

const variants = {
  primary:
    "bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:from-orange-700 hover:to-orange-600 active:scale-95",
  secondary:
    "bg-gradient-to-r from-amber-400 to-amber-300 text-gray-900 hover:from-amber-500 hover:to-amber-400 font-semibold active:scale-95",
  outline:
    "border-2 border-orange-600 text-orange-600 hover:bg-orange-50 active:scale-95",
};

const sizes = {
  sm: "px-4 py-2 text-sm gap-2",
  md: "px-6 py-3 text-base gap-2",
  lg: "px-8 py-4 text-lg gap-3",
};

export function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  type = "button",
}: ButtonProps) {
  const buttonClass = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="w-full h-full flex items-center justify-center"
    >
      {children}
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className={buttonClass}>
        {content}
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={buttonClass}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}
