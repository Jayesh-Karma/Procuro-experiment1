const LOGOS = [
  "MediCore Pharma",
  "FreshHarvest Co.",
  "AutoParts Group",
  "RetailMax",
  "ChemDist Ltd.",
  "BuildRight",
  "QuickFMCG",
  "NovaTex",
  "LogiPrime",
  "HealthStock",
];

export default function LogoStrip() {
  const doubled = [...LOGOS, ...LOGOS];
  return (
    <section className="py-14 border-t border-stone-100 overflow-hidden relative">
      {/* Edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <p className="text-center text-xs font-medium text-stone-400 tracking-[0.12em] uppercase mb-8">
        Trusted by operations teams across industries
      </p>

      <div
        className="flex items-center gap-0 w-max"
        style={{
          animation: "marquee 28s linear infinite",
        }}
      >
        {doubled.map((logo, i) => (
          <div
            key={i}
            className="flex items-center justify-center w-44 px-8 py-2 text-sm font-semibold text-stone-300 hover:text-stone-500 transition-colors cursor-default select-none font-display tracking-tight"
          >
            {logo}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}
