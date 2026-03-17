import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Procuro - AI-Powered Procurement Intelligence | Innovacio Technologies",
  description:
    "Predict. Plan. Procure — Intelligently. Procuro leverages advanced AI to revolutionize procurement with predictive intelligence, raw material insights, and smart recommendations.",
  keywords: [
    "procurement",
    "AI",
    "supply chain",
    "intelligent sourcing",
    "predictive analytics",
  ],
  authors: [{ name: "Innovacio Technologies" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Procuro - AI-Powered Procurement Intelligence",
    description:
      "Transform your procurement process with AI-driven insights and predictions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
