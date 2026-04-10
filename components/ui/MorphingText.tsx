"use client";

import { useEffect, useState } from "react";

const PHRASES = [
  "Finally Intelligent.",
  "Predicting Demand.",
  "Eliminating Stockouts.",
  "Fully Automated.",
  "Always Visible.",
];

export default function MorphingText() {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<"visible" | "exit" | "enter">("visible");

  useEffect(() => {
    const interval = setInterval(() => {
      setState("exit");
      setTimeout(() => {
        setIndex((i) => (i + 1) % PHRASES.length);
        setState("enter");
        requestAnimationFrame(() =>
          requestAnimationFrame(() => setState("visible"))
        );
      }, 350);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block transition-all font-space duration-300"
      style={{
        opacity: state === "visible" ? 1 : 0,
        transform:
          state === "exit"
            ? "translateY(-10px)"
            : state === "enter"
            ? "translateY(10px)"
            : "translateY(0)",
      }}
    >
      {PHRASES[index]}
    </span>
  );
}
