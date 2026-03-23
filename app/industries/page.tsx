import type { Metadata } from "next";
import IndustriesPageV2 from "@/components/industries/IndustriesPageV2";
import Navbar from "@/components/Hero/Navbar";
import Footer from "@/components/Hero/Footer";

export const metadata: Metadata = {
  title: "Industries — Innovacio Technologies | AI Supply Chain Intelligence",
  description:
    "AI-powered supply chain intelligence for manufacturing, retail, FMCG, pharma, and automotive — built for your specific sub-industry, not a generic template.",
};

export default function IndustriesRoute() {
  return (
    <>
      <IndustriesPageV2 />
    </>
  );
}
