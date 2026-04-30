"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState(0);
  const [ready, setReady] = useState(false);
  const [countdown, setCountdown] = useState(3);

  const demoUrl =
    process.env.NEXT_PUBLIC_DEMO_URL ||
    "https://supplychain-version2.up.railway.app/";

  const steps = [
    "Initializing workspace...",
    "Loading dashboard modules...",
    "Syncing live data...",
    "Applying AI insights...",
    "Establishing session...",
  ];

  /* -------------------------
     FAST CONTROLLED LOADER (3.8s)
  --------------------------*/
  useEffect(() => {
    const totalDuration = 3800;
    const start = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - start;

      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      const stepIndex = Math.min(
        Math.floor((elapsed / totalDuration) * steps.length),
        steps.length - 1
      );

      setStep(stepIndex);

      if (newProgress >= 100) {
        clearInterval(interval);
        setReady(true);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  /* -------------------------
     REDIRECT COUNTDOWN (3s)
  --------------------------*/
  useEffect(() => {
    if (!ready) return;

    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          const elem = document.createElement('a');
          elem.href = demoUrl;
          elem.target = '_blank';
          elem.click();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [ready]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-[500px] h-[500px] bg-orange-500/20 blur-[120px] rounded-full bottom-[-100px] left-[-100px]" />
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-[120px] rounded-full bottom-[-100px] right-[-100px]" />

      {/* MAIN WRAPPER */}
      <div className="relative z-10 flex flex-col items-center gap-6 w-[75%] max-w-4xl">

        {/* IMAGE PANEL */}
        <div className="relative w-full h-[58vh] rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-xl">

          <img
            src="/demo-app.png"
            alt="Demo"
            className="w-full h-full object-cover transition-all duration-300"
            style={{
              filter: `blur(${(100 - progress) / 30}px)`,
            }}
          />

          {/* Soft overlay */}
          <div
            className="absolute inset-0 bg-white transition-opacity duration-300"
            style={{
              opacity: ready ? 0.15 : (100 - progress) / 100,
            }}
          />

          {/* Grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              opacity: 0.15,
            }}
          />
        </div>

        {/* TEXT PANEL */}
        <div className="text-center max-w-md">

          {!ready ? (
            <>
              <h1 className="text-gray-900 text-xl font-semibold mb-2">
                Preparing Your Demo Environment
              </h1>

              <p className="text-gray-500 text-sm mb-4 transition-all duration-300">
                {steps[step]}
              </p>

              <p className="text-xs text-gray-500">
                Initializing secure session...
              </p>
            </>
          ) : (
            <>
              <h1 className="text-gray-900 text-xl font-semibold mb-2">
                Redirecting to Application
              </h1>

              <p className="text-gray-600 text-sm mb-4">
                Your environment is ready. Launching secure session.
              </p>

              <div className="text-sm text-orange-500 font-semibold mb-2">
                Redirecting in {countdown}s
              </div>
            </>
          )}

          {/* PROGRESS BAR */}
          <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {Math.round(progress)}% completed
          </p>

          {/* FALLBACK BUTTON */}
          {ready && (
            <button
              onClick={() => (window.location.href = demoUrl)}
              className="mt-4 text-orange-500 text-sm hover:underline"
            >
              Click here if not redirected
            </button>
          )}
        </div>
      </div>
    </div>
  );
}