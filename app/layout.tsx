import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import ModalProvider from "@/components/Modal/ModalProvider";
import ReactLenis from "lenis/react";
import Navbar from "@/components/Hero/Navbar";
import Footer from "@/components/Hero/Footer";
import CalEmbed from "@/components/calendly/CadEmbed";
import Script from "next/script";
import CookieConsent from "@/components/cookie/cookieBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const space = Space_Grotesk({
  variable: "--font-space_grotesk",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Supply Chain Intelligence Platform Powered by AI",
  description: "AI powered supply chain platform that connects to your existing systems to improve forecasting, eliminate stockouts, and reduce operational costs.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${space.variable} h-full antialiased`}
    > 
    <head>
      <link rel="preconnect" href="https://images.unsplash.com" />
      <link rel="dns-prefetch" href="https://images.unsplash.com" />
      <Script
        id="gtm-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-P8S7PZV');
          `,
        }}
      />
    </head>
    
      <body className="min-h-full flex flex-col">
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-P8S7PZV" height="0" width="0" style={{display:"none" ,visibility:"hidden"}}></iframe>
          </noscript> 
        
    {/* <ReactLenis root> */}
      <ModalProvider>
        <Navbar />
        {children}
        <CookieConsent />
        <CalEmbed />
        <Footer />
      </ModalProvider>
    {/* </ReactLenis> */}
      </body>
    </html>
  );
}
