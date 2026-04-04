import HowItWorksSection from "@/components/Works/HowItWorksSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "How AI Supply Chain Deployment Works",
  description: "See how our AI platform connects to your systems and goes live quickly to improve supply chain performance."
}

export default function HowItWorksRoute() {
  return (
    <>
        <HowItWorksSection />
    </>
  );
}