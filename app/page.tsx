import dynamic from "next/dynamic";
import HeroSection from "@/components/Hero/HeroSection";
import PainPointsSection from "@/components/FeatureSection/PainPointsSection";

const ShowcaseSection = dynamic(
  () => import("@/components/ProductShowcase/ShowcaseSection")
);
const IndustrySection = dynamic(
  () => import("@/components/IndustryWiseUse/IndustryWise")
);
const HowItWorksSection = dynamic(
  () => import("@/components/Works/HowItWorksSection")
);
const ReviewsSection = dynamic(
  () => import("@/components/Works/ReviewSection")
);

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <HeroSection />
      <PainPointsSection />

      <section id="products">
        <ShowcaseSection />
      </section>

      <section id="industries">
        <IndustrySection />
        <HowItWorksSection />
      </section>

      <section id="reviews">
        <ReviewsSection />
      </section>
    </div>
  );
}
