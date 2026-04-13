"use client";

import { Baby, BotIcon, Calendar, Check, Cookie, Globe, HardDriveUpload, Info, Link, Lock, RefreshCcw, Scale, Settings } from "lucide-react";
import { useRef } from "react";

const sections = [
  {
    id: "information",
    title: "Information We Collect",
    icon: <Info className="text-orange-500" />,
    subsections: [
      {
        heading: "Personal Information",
        body: "When you contact us, book a consultation, request a demo, submit forms, or communicate via chatbot or email, we may collect: full name, email address, phone number, company name, job title, business requirements, and country / location.",
      },
      {
        heading: "Automatically Collected Information",
        body: "When you visit our website, we may automatically collect: IP address, device information, browser type, operating system, pages visited, time spent on pages, referral source, and session behavior. This helps us improve website performance and user experience.",
      },
    ],
  },
  {
    id: "usage",
    title: "How We Use Your Information",
    icon: <Settings className="text-orange-500" />,
    subsections: [
      {
        heading: "Purposes",
        body: "We use collected information to provide AI and software services, respond to inquiries, deliver consultations and demos, improve our products and services, enhance website functionality, send service-related communications, provide customer support, maintain platform security, analyze website performance, and comply with legal obligations.",
      },
      {
        heading: "We do not sell personal data.",
        body: "",
      },
    ],
  },
  {
    id: "gdpr",
    title: "Legal Basis for Processing (GDPR)",
    icon: <Scale className="text-orange-500" />,
    subsections: [
      {
        heading: "Lawful Bases",
        body: "If you are located in the European Economic Area (EEA), we process your data under: Consent (e.g., you submit a contact form), Contract Performance (e.g., you request development services), Legitimate Business Interests (e.g., we analyze website performance), and Legal Compliance (e.g., we comply with regulatory requirements).",
      },
    ],
  },
  {
    id: "cookies",
    title: "Cookies Policy",
    icon: <Cookie className="text-orange-500" />,
    subsections: [
      {
        heading: "Essential Cookies (Always Active)",
        body: "Required for the website to function - security cookies, session cookies, load balancing cookies, and form submission cookies. These cannot be disabled.",
      },
      {
        heading: "Analytics Cookies (Optional)",
        body: "Used to understand website usage via Google Analytics, traffic monitoring, performance tracking, and user behavior analysis. Help us improve performance, optimize user experience, and measure engagement.",
      },
      {
        heading: "Marketing Cookies (Requires Consent)",
        body: "Used to deliver relevant marketing - Google Ads tracking, Meta Pixel, retargeting cookies, and campaign measurement. These are optional and require your explicit consent.",
      },
    ],
  },
  {
    id: "sharing",
    title: "Data Sharing & Third Parties",
    icon: <HardDriveUpload className="text-orange-500"/>,
    subsections: [
      {
        heading: "Trusted Partners Only",
        body: "We may share data with cloud hosting providers, analytics services, CRM systems, payment processors, email services, security monitoring providers, and legal authorities - only when necessary. These partners are contractually obligated to protect your data. We do not sell personal information.",
      },
    ],
  },
  {
    id: "transfers",
    title: "International Data Transfers",
    icon: <Globe className="text-orange-500"/>,
    subsections: [
      {
        heading: "Global Operations",
        body: "Our services operate globally. Your data may be transferred to India, the United States, the European Union, or other countries. We ensure compliance through Standard Contractual Clauses (SCC), GDPR safeguards, secure infrastructure, and data protection compliance.",
      },
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    icon: <Calendar className="text-orange-500" />,
    subsections: [
      {
        heading: "Retention Periods",
        body: "Customer inquiries: up to 24 months. Client project data: duration of contract. Legal records: as required by law. Analytics data: up to 26 months. After these periods, data is securely deleted.",
      },
    ],
  },
  {
    id: "security",
    title: "Data Security",
    icon: <Lock className="text-orange-500" />,
    subsections: [
      {
        heading: "Security Controls",
        body: "We implement SSL encryption, secure servers, access control systems, firewall protection, data encryption, monitoring and logging, and secure cloud infrastructure. We continuously review and improve our security practices.",
      },
    ],
  },
  {
    id: "rights",
    title: "Your Rights Under GDPR",
    icon: <Check className="text-orange-500" /> ,
    subsections: [
      {
        heading: "EU Data Subject Rights",
        body: "If you are located in the European Union, you have the right to: access your personal data, rectify inaccurate information, request erasure, restrict processing, data portability, object to processing, withdraw consent, and lodge a complaint. You may exercise your rights by contacting us.",
      },
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    icon: <Baby className="text-orange-500" />,
    subsections: [
      {
        heading: "Age Restriction",
        body: "Our services are intended for businesses and professionals. We do not knowingly collect data from individuals under 16 years old. If such data is discovered, it will be deleted immediately.",
      },
    ],
  },
  {
    id: "ai",
    title: "AI & Automated Processing",
    icon: <BotIcon className="text-orange-500" />,
    subsections: [
      {
        heading: "AI Technologies",
        body: "Our services may use artificial intelligence and automation to analyze user behavior, process data inputs, generate insights, automate workflows, and improve decision-making. We ensure human oversight, secure data processing, responsible AI usage, and compliance with applicable laws.",
      },
    ],
  },
  {
    id: "updates",
    title: "Updates to This Policy",
    icon: <RefreshCcw className="text-orange-500" />,
    subsections: [
      {
        heading: "Policy Changes",
        body: "We may update this Privacy Policy periodically due to legal updates, technology changes, service improvements, or regulatory requirements. The latest version will always be available on this page.",
      },
    ],
  },
];


export default function Page() {
  const containerRef = useRef(null);

  return (
    <div className="min-h-screen bg-gray-50 font-sans" ref={containerRef}>
      {/* Progress bar */}
      <div
        style={{ transformOrigin: "left" }}
        className="fixed top-0 left-0 right-0 h-1 bg-orange-500 z-50"
      />

      {/* Hero */}
      <div className="relative overflow-hidden mt-10 bg-white border-b border-gray-100">
        {/* Decorative background blobs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-100 rounded-full opacity-40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 bg-orange-50 rounded-full opacity-60 blur-2xl pointer-events-none" />

        <div className="relative max-w-6xl font-space_grotesk mx-auto px-6 pt-20 pb-16">
          <div
            className="text-center"
          >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 text-orange-600 text-sm font-medium rounded-full border border-orange-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                Last Updated: April 2026
              </span>
           
            <h1
              className="text-5xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight mb-5"
            >
              Privacy{" "}
              <span className="text-orange-500 relative">
                Policy
                <span
                  className="absolute left-0 -bottom-1 w-full h-1 bg-orange-300 rounded-full origin-left block"
                />
              </span>
            </h1>

            <p
              className="text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
            >
              Innovacio Technologies respects your privacy and is committed to
              protecting your personal data in accordance with GDPR, and global data
              protection regulations.
            </p>

            <div
              className="mt-8 flex flex-wrap justify-center gap-3"
            >
              {["GDPR Compliant", "IT Act 2000", "SSL Secured", "No Data Sales"].map(
                (badge) => (
                  <span
                    key={badge}
                    className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full border border-orange-100 uppercase tracking-widest"
                  >
                    {badge}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>


      {/* Main Content */}
      <main className="max-w-6xl font-space_grotesk mx-auto px-6 py-12 space-y-6">
        {sections.map((section, i) => (
          <div
            key={i}
            id={section.id}
            className="bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden"
          >
            {/* Section Header */}
            <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-50">
              <span className="text-2xl">{section.icon}</span>
              <h2 className="text-lg font-bold text-gray-900">
                {section.title}
              </h2>
              <span className="ml-auto w-1.5 h-8 rounded-full bg-orange-500 opacity-80" />
            </div>

            {/* Subsections */}
            <div className="divide-y divide-gray-50">
              {section.subsections.map((sub, j) => (
                <div
                  key={j}
                  className="px-6 py-5"
                >
                  {sub.heading && (
                    <h3 className="text-sm font-bold text-orange-600 uppercase tracking-widest mb-2">
                      {sub.heading}
                    </h3>
                  )}
                  {sub.body && (
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {sub.body}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Third Party Links */}
        <div
          className="bg-orange-50 rounded-2xl border border-orange-100 p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl"><Link className="text-orange-500"/></span>
            <h2 className="text-lg font-bold text-gray-900">
              Third-Party Links
            </h2>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            Our website may contain links to third-party websites including
            external tools, partner platforms, and client websites. We are not
            responsible for their privacy practices and recommend reviewing their
            individual privacy policies.
          </p>
        </div>
      </main>

    </div>
 
  );
}