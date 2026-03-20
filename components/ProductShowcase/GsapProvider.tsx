"use client";
import { useEffect } from "react";

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () => {
      const { gsap }           = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.defaults({ scroller: window });

      window.addEventListener("load", () => ScrollTrigger.refresh());
    })();

    return () => {
      // Clean up all triggers on unmount (important for dev hot reload)
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        ScrollTrigger.getAll().forEach((t) => t.kill());
      });
    };
  }, []);

  return <>{children}</>;
}