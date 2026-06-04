import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CreatorsProgramContent from "@/components/CreatorsProgramContent";
import { SiteFaqSection } from "@/components/faq/SiteFaqSection";
import { getFaqCategories } from "@/config/faq.config";
import { getBusinessPlanValueLabel } from "@/config/pricing.config";
import { getPricingContext } from "@/lib/pricing-region.server";

export async function generateMetadata(): Promise<Metadata> {
  const { region } = await getPricingContext();
  const value = getBusinessPlanValueLabel(region);
  return {
    title: "Creators Program — Liffio",
    description: `Apply to the Liffio Creators Program and get our full Business plan (${value} value) at no cost. For Instagram creators with 5K+ followers who drive comment engagement.`,
  };
}

export default async function CreatorsProgramPage() {
  const { region } = await getPricingContext();
  const faqCategories = getFaqCategories(region);
  const businessValue = getBusinessPlanValueLabel(region);

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
