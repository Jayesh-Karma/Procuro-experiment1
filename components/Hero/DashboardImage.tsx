export default function DashboardImage() {
  return (
    <div
      className="relative z-[2] my-14 w-full max-w-6xl mx-auto"
      style={{
        animation:
          "dashboardIn 0.9s 0.65s cubic-bezier(0.16,1,0.3,1) both",
      }}
    >
      {/* Glow Background */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[85%] h-[85%] bg-orange-500/20 blur-3xl rounded-full" />
      </div>

      {/* Dashboard Image */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_25px_80px_rgba(0,0,0,0.45)]">
        <img
          src="/iq-supplychain.png"
          alt="IQ Supply Chain Dashboard"
          className="w-full h-auto object-cover rounded-2xl transition-transform duration-700 "
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 pointer-events-none" />
      </div>

      {/* Bottom Ambient Glow */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4/5 h-24 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(249,115,22,0.22) 0%, transparent 75%)",
          filter: "blur(24px)",
        }}
      />

      {/* Floating Accent */}
      <div className="absolute -top-5 -right-5 w-24 h-24 bg-orange-400/20 rounded-full blur-2xl pointer-events-none" />
    </div>
  );
}