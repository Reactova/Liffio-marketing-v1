import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AffiliateProgramContent from "@/components/AffiliateProgramContent";
import { SiteFaqSection } from "@/components/faq/SiteFaqSection";
import { siteConfig } from "@/config/site.config";
import { getAffiliateFaqCategories } from "@/config/faq.config";
import { getPricingContext } from "@/lib/pricing-region.server";

export const metadata: Metadata = {
  title: `Affiliate Program — ${siteConfig.brand.name}`,
  description: `Earn 25% / 10% / 10% commissions across 3 months per referral. 90-day attribution, on-demand payouts from $50.`,
};

export default async function AffiliatePage() {
  const { region } = await getPricingContext();
  const faqCategories = getAffiliateFaqCategories(region);

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <AffiliateProgramContent />
        <SiteFaqSection
          categories={faqCategories}
          defaultOpenId="affiliate-commission"
          subtitle="Plan pricing in these answers matches our live pricing page for your region."
        />
      </main>
      <Footer />
    </>
  );
}
