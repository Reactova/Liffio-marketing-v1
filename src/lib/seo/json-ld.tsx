import type { FaqCategory } from "@/config/faq.config";
import { SEO_KEYWORDS } from "@/config/seo.config";
import { SITE_URL, siteConfig } from "@/config/site.config";

function JsonLdScript({ data }: { data: object | object[] }) {
  const payload = Array.isArray(data) ? data : [data];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload.length === 1 ? payload[0] : payload) }}
    />
  );
}

export function OrganizationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: siteConfig.brand.name,
        url: SITE_URL,
        logo: `${SITE_URL}${siteConfig.brand.logoDark}`,
        description: siteConfig.brand.description,
        sameAs: [],
      }}
    />
  );
}

export function WebSiteJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: siteConfig.brand.name,
        url: SITE_URL,
        description:
          "Instagram auto DM tool with auto comment reply, comment-to-DM, and story reply automation.",
        inLanguage: "en",
      }}
    />
  );
}

export function SoftwareApplicationJsonLd() {
  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: siteConfig.brand.name,
        alternateName: [
          "Liffio Auto DM Tool",
          "Liffio Instagram Auto DM",
          "Liffio DM Automation",
        ],
        applicationCategory: "BusinessApplication",
        applicationSubCategory: "Social Media Automation",
        operatingSystem: "Web",
        url: SITE_URL,
        description:
          "Liffio is the best auto DM tool for Instagram. Send auto DMs from comments, stories, and messages with auto comment reply, keyword triggers, and DM automation — a modern ManyChat alternative.",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          description: "Free auto DM tool tier available — no credit card required",
        },
        featureList: [
          "Auto DM tool",
          "Auto DMs for Instagram",
          "Instagram auto DM",
          "Auto comment reply",
          "Auto comment tool",
          "Comment-to-DM automation",
          "Story reply automation",
          "DM automation tool",
          "Keyword triggers",
          "DM automation flows",
          "Instagram auto reply",
          "ManyChat alternative",
        ],
        keywords: SEO_KEYWORDS.slice(0, 20).join(", "),
      }}
    />
  );
}

export function FaqPageJsonLd({ categories }: { categories: FaqCategory[] }) {
  const mainEntity = categories.flatMap((category) =>
    category.items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  );

  if (mainEntity.length === 0) return null;

  return (
    <JsonLdScript
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity,
      }}
    />
  );
}
