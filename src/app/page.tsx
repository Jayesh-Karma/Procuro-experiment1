import {
  HeroSection,
  ProblemSolutionSection,
  PredictiveIntelligenceSection,
  RawMaterialIntelligenceSection,
  SmartRecommendationsSection,
  IntegrationSection,
  KpiSection,
  CtaSection,
  ChatbotPanel,
} from "@/components";

export default function Home() {
  return (
    <main className="w-full overflow-x-hidden bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-40  bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-soft-lg hover:shadow-soft-xl transition-shadow duration-300">
              P
            </div>
            <span className="font-bold text-xl text-gray-900 hidden sm:inline">
              Procuro
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors text-sm hidden md:inline font-medium">
              Platform
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors text-sm hidden md:inline font-medium">
              Pricing
            </a>
            <a href="#" className="text-gray-600 hover:text-orange-600 transition-colors text-sm hidden md:inline font-medium">
              Docs
            </a>
            <button className="px-6 py-2 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-lg font-medium hover:from-orange-700 hover:to-orange-600 transition-all shadow-soft hover:shadow-soft-lg text-sm">
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <HeroSection />

      {/* Problem Solution Section */}
      <ProblemSolutionSection />

      {/* Predictive Intelligence Section */}
      <PredictiveIntelligenceSection />

      {/* Raw Material Intelligence Section */}
      <RawMaterialIntelligenceSection />

      {/* Smart Recommendations Section */}
      <SmartRecommendationsSection />

      {/* Integration Section */}
      <IntegrationSection />

      {/* KPI Section */}
      <KpiSection />

      {/* CTA/Footer Section */}
      <CtaSection />

      {/* Chatbot Panel */}
      <ChatbotPanel />
    </main>
  );
}
