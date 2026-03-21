import IndustriesHero from "@/components/industries/IndustriesHero";
import IndustryGrid from "@/components/industries/IndustryGrid";
import IndustryBlock from "@/components/industries/IndustryBlock";
import CaseStudiesPreview from "@/components/industries/CaseStudiesPreview";
import IndustriesCTA from "@/components/industries/IndustriesCTA";

import { INDUSTRIES } from "@/components/industries/data";
import type { Metadata } from "next";
import Navbar from "@/components/Hero/Navbar";
import Footer from "@/components/Hero/Footer";

export const metadata: Metadata = {
  title: "Industries - Our Product | AI Supply Chain Intelligence",
  description:
    "See how we solves supply chain challenges across manufacturing, retail, pharma, food & beverage, and automotive industries.",
};

export default function IndustriesPage() {
  return (
    <main className="bg-white min-h-screen">
      <Navbar />
      <IndustriesHero />
      <IndustryGrid />

      {/* All 5 industry deep dives */}
      {INDUSTRIES.map((industry, i) => (
        <IndustryBlock key={industry.id} industry={industry} index={i} />
      ))}

      <CaseStudiesPreview />
      <IndustriesCTA />
      <Footer />
    </main>
  );
}
