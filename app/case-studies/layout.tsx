import { Metadata } from "next"


export const metadata: Metadata = {
  title: "AI Supply Chain Case Studies for Manufacturing, Retail, FMCG, Pharma, and Automotive",
  description:
    "Explore real supply chain case studies showing how companies reduced stockouts, improved forecasting, and recovered working capital using AI powered inventory and demand planning solutions.",
};

export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <>
        {children}
        </>
    )
}