import { FAQAccordion } from "@/components/faq/FAQAccordion";
import type { FaqCategory } from "@/config/faq.config";

type SiteFaqSectionProps = {
  categories: FaqCategory[];
  title?: string;
  subtitle?: string;
  allowMultiple?: boolean;
  defaultOpenId?: string;
  className?: string;
  variant?: "default" | "plain";
};

export function SiteFaqSection({
  categories,
  title = "Frequently Asked Questions",
  subtitle,
  allowMultiple = true,
  defaultOpenId = "connect-instagram",
  className = "",
  variant = "default",
}: SiteFaqSectionProps) {
  const isPlain = variant === "plain";

  return (
    <section className={`py-16 sm:py-20 ${isPlain ? "bg-white" : "bg-gray-50"} ${className}`.trim()}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <h2
            className="text-2xl font-extrabold text-[#0a0a0a] sm:text-3xl"
            style={{ fontFamily: "var(--font-outfit, sans-serif)" }}
          >
            {title}
          </h2>
          {subtitle ? <p className="mx-auto mt-3 max-w-3xl text-sm text-gray-500 sm:text-base">{subtitle}</p> : null}
        </div>
        <FAQAccordion
          categories={categories}
          allowMultiple={allowMultiple}
          defaultOpenId={defaultOpenId}
        />
      </div>
    </section>
  );
}
