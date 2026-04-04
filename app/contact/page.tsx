import ContactPage from "@/components/calendly/ContactPage";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Contact - Innovacio Technologies | AI Supply Chain Intelligence",
  description:
    "AI-powered supply chain intelligence for manufacturing, retail, FMCG, pharma, and automotive, built for your specific sub-industry, not a generic template.",
};


export default function Page() {
  return(<ContactPage />)  
}
