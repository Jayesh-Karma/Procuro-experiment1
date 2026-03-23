import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GSAPProvider from "@/components/ProductShowcase/GsapProvider";
import ModalProvider from "@/components/Modal/ModalProvider";
import ReactLenis from "lenis/react";
import Navbar from "@/components/Hero/Navbar";
import Footer from "@/components/Hero/Footer";
import CalEmbed from "@/components/calendly/CadEmbed";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Innovacio",
  description: "A Upcoming AI-Powered Supply Chain Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    > 
      <body className="min-h-full flex flex-col">
        
    <ReactLenis root>
      <GSAPProvider>
        <ModalProvider>
          <Navbar />
          {children}
          <CalEmbed />
          <Footer />
        </ModalProvider>
      </GSAPProvider>
    </ReactLenis>
      </body>
    </html>
  );
}
