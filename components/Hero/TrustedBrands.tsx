"use client";
import Image from "next/image";

export default function TrustedBrands() {
  return (
    <>
      <style suppressHydrationWarning>{`
        @keyframes brandScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .brand-track {
          animation: brandScroll 28s linear infinite;
          display: flex; gap: 60px; width: max-content; align-items: center;
        }
        .brand-track:hover { animation-play-state: paused; }
        .brand-img {
          filter: grayscale(1) opacity(.5);
          transition: filter .3s, transform .3s;
          flex-shrink: 0;
        }
        .brand-img:hover { filter: grayscale(0) opacity(1); transform: scale(1.05); }
      `}</style>

      <section style={{
        padding: "80px 0",
        background: "#ffffff",
        borderTop: "1px solid rgba(0,0,0,.07)",
        borderBottom: "1px solid rgba(0,0,0,.07)",
        overflow: "hidden",
      }} >

        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <span style={{
            fontSize: "11px", fontWeight: 800, letterSpacing: ".14em",
            textTransform: "uppercase", color: "#ff6b1a",
            display: "block", marginBottom: "10px",
          }}>Our Clients</span>
          <h2 className=" font-space_grotesk text-3xl md:text-4xl font-bold mt-5">
            Brands Who <span style={{ color: "#ff6b1a" }}>Trust Us</span>
          </h2>
          <p style={{ fontSize: "14px", color: "#888"}} className="font-space_grotesk">
            We have been working with Fortune 500+ clients
          </p>
        </div>

        <div  className="pt-10"
        style={{ overflow: "hidden", 
          maskImage: "linear-gradient(90deg, transparent, #fff 12%, #fff 88%, transparent)", WebkitMaskImage: "linear-gradient(90deg, transparent, #fff 12%, #fff 88%, transparent)" }}
          >
          <div className="brand-track">
            {[...Array(10), ...Array(10)].map((_, index) => (
              <Image
                key={`brand-${index}`}
                src={`/img/trustedBrands/brand${(index % 10) + 1}.png`}
                alt={`Trusted brand ${(index % 10) + 1}`}
                width={120}
                height={60}
                style={{ height: "48px", width: "auto", objectFit: "contain" }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}