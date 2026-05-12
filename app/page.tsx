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
import CTASection from "@/components/calendly/CTASection";

export default function Home() {
  return (
    <>
    
    <div className=" min-h-screen overflow-hidden">

        <HeroSection />
        {/* <FeatureSection /> */}
        <PainPointsSection />

        {/* <div className="max-w-6xl  w-full h-full mx-auto flex items-center justify-between">
        <CTASection />
        </div> */}
        
        <section id="products">
        <ShowcaseSection />
        </section>
        <section>
        <IndustrySection />
        <HowItWorksSection />
        </section>


        <section id="reviews">
        <ReviewsSection />
        </section>

        {/* <FloatingSection sparkles>
        </FloatingSection> */}
    </div>
    </>
  );
}
