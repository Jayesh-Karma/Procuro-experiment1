import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GSAPProvider from "@/components/ProductShowcase/GsapProvider";
import ModalProvider from "@/components/Modal/ModalProvider";
import ReactLenis from "lenis/react";
import Navbar from "@/components/Hero/Navbar";
import Footer from "@/components/Hero/Footer";
import CalEmbed from "@/components/calendly/CadEmbed";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Innovacio Technologies",
  description: "AI Supply Chain Intelligence",
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
    <head>
          <Script
          id="gtm-script"
          strategy="afterInteractive"
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
