import type { Metadata } from "next";
import IndustriesPageV2 from "@/components/industries/IndustriesPageV2";
import Navbar from "@/components/Hero/Navbar";
import Footer from "@/components/Hero/Footer";

export const metadata: Metadata = {
  title: "AI Supply Chain Solutions for Manufacturing, Retail, FMCG, Pharma, and Automotive",
  description:
    "Explore industry specific AI Supply Chain Solutions for Manufacturing, Retail, FMCG, Pharma, and Automotive Businesses. Improve forecasting, reduce stockouts, and optimize operations with fast deployment.",
};


export default function IndustriesRoute() {
  return (
    <>
      <IndustriesPageV2 />
    </>
  );
}
