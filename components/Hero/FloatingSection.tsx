"use client";

import FloatingOrbs from "@/components/ui/FloatingOrbs";

interface Props {
  videoSrc?: string;
  sparkles?: boolean;
  children?: React.ReactNode;
}

export default function FloatingSection({ videoSrc, sparkles = false, children }: Props) {
  return (
    <section className="relative py-20 md:py-28">
      {/* Background layer (video or sparkles) */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {videoSrc ? (
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : null}

        {sparkles ? (
          <div className="absolute inset-0 opacity-60">
            <FloatingOrbs />
          </div>
        ) : null}

        {/* optional subtle dim to increase contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/8" />
      </div>

      {/* Floating white card that appears to float above the background */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 -mt-20 md:-mt-24">
        <div className="bg-white/95 rounded-2xl p-6 md:p-10 shadow-2xl backdrop-blur-sm border border-stone-100">
          {children}
        </div>
      </div>
    </section>
  );
}
