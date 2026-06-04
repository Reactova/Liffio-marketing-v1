import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FeaturesPageContent from "@/components/features/FeaturesPageContent";
import { SiteFaqSection } from "@/components/faq/SiteFaqSection";
import { pageSeo } from "@/config/seo.config";
import { getFaqCategories } from "@/config/faq.config";
import { FaqPageJsonLd } from "@/lib/seo/json-ld";
import { getPricingContext } from "@/lib/pricing-region.server";

export const metadata = pageSeo.features;

export default async function FeaturesPage() {
  const { region } = await getPricingContext();
  const faqCategories = getFaqCategories(region);

  return (
    <>
      <FaqPageJsonLd categories={faqCategories} />
      <Navbar />
      <main id="main-content" className="flex-1">
        <FeaturesPageContent />
        <SiteFaqSection categories={faqCategories} defaultOpenId="automation-types" />
      </main>
      <Footer />
    </>
  );
}
