import { HomepageFAQAccordion } from "@/components/sections/HomepageFAQAccordion";
import { SectionShell } from "@/components/sections/section-shell";
import { homepageFaqStructuredData } from "@/lib/seo/homepageStructuredData";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function HomepageFAQ({ faqs }: { faqs: FaqItem[] }) {
  if (faqs.length === 0) {
    return null;
  }

  const faqJsonLd = homepageFaqStructuredData(
    faqs.map((faq) => ({ question: faq.question, answer: faq.answer })),
  );

  return (
    <SectionShell id="faq">
      {faqJsonLd ? (
        <script
          id="homepage-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <HomepageFAQAccordion faqs={faqs} />
    </SectionShell>
  );
}
