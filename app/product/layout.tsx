import { Metadata } from "next"


export const metadata: Metadata = {
  title: "Supply Chain Intelligence Platform with Fast Deployment",
  description:
    "AI powered supply chain platform that connects to your existing ERP systems to predict demand, reduce stockouts, and improve inventory performance. Go live in under 4 weeks with measurable ROI.",
};

export default function Layout({children}: {children: React.ReactNode}) {
    return(
        <>
        {children}
        </>
    )
}