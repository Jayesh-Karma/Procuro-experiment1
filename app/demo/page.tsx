"use client";

import { DatabaseIcon, Hourglass, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const STEPS = [
  "Initializing workspace...",
  "Loading dashboard modules...",
  "Syncing live data...",
  "Applying AI insights...",
  "Almost ready...",
];

const TOTAL_MS = 3800;
const AUTO_REDIRECT_DELAY = 2000;

export default function Page() {
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [ready, setReady] = useState(false);

  const demoUrl =
    process.env.NEXT_PUBLIC_DEMO_URL || "https://iq.innovaciotech.com/";

  const router = useRouter();

  const openDemo = () => {
    const a = document.createElement("a");
    a.href = demoUrl;
    a.target = "_blank";
    a.click();
    a.remove();
    router.push("/contact")

  };

  /* Loader */
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / TOTAL_MS) * 100, 100);
      const idx = Math.min(
        Math.floor((elapsed / TOTAL_MS) * STEPS.length),
        STEPS.length - 1
      );
      setProgress(pct);
      setStepIndex(idx);
      if (pct >= 100) {
        clearInterval(interval);
        setReady(true);
      }
    }, 50);
    return () => clearInterval(interval);
  }, []);

  /* Auto-redirect after ready */
  useEffect(() => {
    if (!ready) return;
    const t = setTimeout(openDemo, AUTO_REDIRECT_DELAY);
    return () => clearTimeout(t);
  }, [ready]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">

      <div className="w-full max-w-xl rounded-2xl border border-gray-200 overflow-hidden shadow-sm">

        {/* Preview panel */}
        <div className="relative h-64 bg-gray-50 overflow-hidden">
          <img
            src="/demo-app.png"
            alt="Demo application preview"
            className="w-full h-full object-cover"
            style={{ filter: `blur(${((100 - progress) / 100) * 6}px)` }}
          />

          {/* Subtle dark overlay that fades out */}
          <div
            className="absolute inset-0 bg-white transition-opacity duration-300"
            style={{ opacity: ready ? 0 : (100 - progress) / 200 }}
          />

          {/* Live badge — visible once ready */}
          {ready && (
            <span className="absolute top-3 left-3 bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
              Live
            </span>
          )}
        </div>

        {/* Body */}
        <div className="p-6">

          {/* Status row */}
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`w-2 h-2 rounded-full ${
                ready ? "bg-green-500" : "bg-green-500 animate-pulse"
              }`}
            />
            <span className="text-sm text-gray-500">
              {ready ? "Environment ready" : "Preparing your environment"}
            </span>
          </div>

          {!ready ? (
            <>
              <h1 className="text-lg font-semibold text-gray-900 mb-1">
                See it in action — your demo is loading
              </h1>
              <p className="text-sm text-gray-500 mb-5">
                A personalised session is being set up. This takes just a few seconds.
              </p>

              {/* Progress bar */}
              <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden mb-1.5">
                <div
                  className="h-full bg-green-600 rounded-full transition-all duration-100"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-5">
                <span>{STEPS[stepIndex]}</span>
                <span>{Math.round(progress)}%</span>
              </div>

              <button
                disabled
                className="w-full py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium opacity-40 cursor-not-allowed"
              >
                Launch demo
              </button>
            </>
          ) : (
            <>
              <h1 className="text-lg font-semibold text-gray-900 mb-1">
                Your demo is ready
              </h1>
              <p className="text-sm text-gray-500 mb-5">
                The environment is live. Explore all features with real data.
              </p>

              <button
                onClick={openDemo}
                className="w-full py-2.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm font-medium transition-colors"
              >
                Launch demo &rarr;
              </button>
            </>
          )}

          {/* Trust signals */}
          <div className="flex justify-center gap-6 mt-4">
            {[
              { icon: <Lock />, label: "Secure session" },
              { icon: <Hourglass />, label: "No sign-up needed" },
              { icon: <DatabaseIcon />, label: "Live data" },
            ].map(({ icon, label }) => (
              <span key={label} className="flex items-center gap-1 text-xs text-gray-400">
                <span className="text-xs">{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}