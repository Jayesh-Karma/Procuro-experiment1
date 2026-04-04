"use client";
import { useEffect } from "react";

export default function GSAPProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let onLoad: (() => void) | null = null;
    (async () => {
      const { gsap }           = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.defaults({ scroller: window });

      onLoad = () => ScrollTrigger.refresh();
      window.addEventListener("load", onLoad);
    })();

    return () => {
      // Clean up all triggers on unmount (important for dev hot reload)
      import("gsap/ScrollTrigger")
        .then(({ ScrollTrigger }) => {
          try { ScrollTrigger.getAll().forEach((t) => t.kill()); } catch (e) {}
        })
        .catch(() => {});

      try { if (onLoad) window.removeEventListener("load", onLoad); } catch (e) {}
    };
  }, []);

  return <>{children}</>;
}