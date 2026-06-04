import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import PricingSection from "@/components/PricingSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import { getFaqCategories } from "@/config/faq.config";
import { getPricingContext } from "@/lib/pricing-region.server";
import {
  fetchMarketingPlansContext,
  buildCreatorsProgramFaqAnswer,
  buildFreePlanFaqAnswer,
  buildPlansOfferedFaqAnswer,
} from "@/lib/marketing-plans.server";

export default async function Home() {
  const { region, countryCode } = await getPricingContext();
  const { plans, businessPlanValue } = await fetchMarketingPlansContext(region);
  const faqCategories = getFaqCategories(region, {
    freePlanFaqAnswer: buildFreePlanFaqAnswer(region, plans),
    plansOfferedFaqAnswer: buildPlansOfferedFaqAnswer(region, plans),
    creatorsProgramFaqAnswer: buildCreatorsProgramFaqAnswer(businessPlanValue),
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <PricingSection plans={plans} region={region} countryCode={countryCode} />
        <FAQSection categories={faqCategories} />
      </main>
      <Footer />
    </>
  );
}
