import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorsProgramContent from "@/components/CreatorsProgramContent";
import { SiteFaqSection } from "@/components/faq/SiteFaqSection";
import { getFaqCategories } from "@/config/faq.config";
import { getPricingContext } from "@/lib/pricing-region.server";
import {
  fetchMarketingPlansContext,
  buildCreatorsProgramFaqAnswer,
  buildFreePlanFaqAnswer,
  buildPlansOfferedFaqAnswer,
} from "@/lib/marketing-plans.server";

export async function generateMetadata(): Promise<Metadata> {
  const { region } = await getPricingContext();
  const { businessPlanValue: value } = await fetchMarketingPlansContext(region);
  return {
    title: "Creators Program — Liffio",
    description: `Apply to the Liffio Creators Program and get our full Business plan (${value} value) at no cost. For Instagram creators with 5K+ followers who drive comment engagement.`,
  };
}

export default async function CreatorsProgramPage() {
  const { region } = await getPricingContext();
  const { plans, businessPlanValue: businessValue } = await fetchMarketingPlansContext(region);
  const faqCategories = getFaqCategories(region, {
    freePlanFaqAnswer: buildFreePlanFaqAnswer(region, plans),
    plansOfferedFaqAnswer: buildPlansOfferedFaqAnswer(region, plans),
    creatorsProgramFaqAnswer: buildCreatorsProgramFaqAnswer(businessValue),
  });

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <CreatorsProgramContent businessPlanValue={businessValue} />
        <SiteFaqSection categories={faqCategories} defaultOpenId="creators-program" />
      </main>
      <Footer />
    </>
  );
}
