import HeroSection from "@/components/Hero/HeroSection";
import Image from "next/image";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/Hero/Navbar";
import PainPointsSection from "@/components/FeatureSection/PainPointsSection";
import IndustrySection from "@/components/IndustryWiseUse/IndustryWise";
import ShowcaseSection from "@/components/ProductShowcase/ShowcaseSection";
import GSAPProvider from "@/components/ProductShowcase/GsapProvider";
import HowItWorksSection from "@/components/Works/HowItWorksSection";
import ReviewsSection from "@/components/Works/ReviewSection";
import Footer from "@/components/Hero/Footer";

export default function Home() {
  return (
    <>
    
    <div className=" min-h-screen overflow-hidden">
    <Navbar />
        <HeroSection />
        {/* <FeatureSection /> */}
        <PainPointsSection />
        <section id="products">
        <ShowcaseSection />
        </section>
        <IndustrySection />
        <HowItWorksSection />
        <ReviewsSection />
        <Footer />
        {/* <FloatingSection sparkles>
        </FloatingSection> */}
    </div>
    </>
  );
}
