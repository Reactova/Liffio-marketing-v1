import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesPageContent from "@/components/features/FeaturesPageContent";
import { SiteFaqSection } from "@/components/faq/SiteFaqSection";
import { siteConfig } from "@/config/site.config";
import { getFaqCategories } from "@/config/faq.config";
import { getPricingContext } from "@/lib/pricing-region.server";

export const metadata: Metadata = {
  title: `Features — ${siteConfig.brand.name}`,
  description:
    "Eight Instagram DM automations in one dashboard: comment reply, story reply, live reply, DM flows, follow gates, re-engage, lead capture, and welcome messages.",
};

export default async function FeaturesPage() {
  const { region } = await getPricingContext();
  const faqCategories = getFaqCategories(region);

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <FeaturesPageContent />
        <SiteFaqSection categories={faqCategories} defaultOpenId="automation-types" />
      </main>
      <Footer />
    </>
  );
}
