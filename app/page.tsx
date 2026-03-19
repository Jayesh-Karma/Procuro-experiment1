import HeroSection from "@/components/Hero/HeroSection";
import Image from "next/image";
import { ReactLenis } from "lenis/react";
import Navbar from "@/components/Hero/Navbar";

export default function Home() {
  return (
    <>
    <ReactLenis root>

<Navbar />
    <div className=" min-h-screen overflow-hidden">
      <HeroSection />
    </div>
    </ReactLenis>
    </>
  );
}
