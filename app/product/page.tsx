import { Metadata } from "next";
import ProductPageClient from "@/components/ProductShowcase/ProductPageClient";

export const metadata: Metadata = {
  title: "Product - Innovacio IQ | AI Supply Chain Intelligence",
  description:
    "AI-powered supply chain intelligence for manufacturing, retail, FMCG, pharma, and automotive — built for your specific sub-industry, not a generic template.",
};

export default function ProductPage() {
  return <ProductPageClient />;
}