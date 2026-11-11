import { FaqDisclosure } from "@/components/faq/FaqDisclosure";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionShell } from "@/components/sections/section-shell";
import { homepageHeadingClass } from "@/components/sections/homepageStyles";
import { homepageFaqStructuredData } from "@/lib/seo/homepageStructuredData";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

function rewriteHomepageFaqAnswer(answer: string): string {
  return answer
    .replaceAll(
      "manufacturing in our Newcastle workshop",
      "manufacturing in-house",
    )
    .replaceAll(
      "quality-checked in our own workshop",
      "quality-checked in-house",
    )
    .replaceAll("Our workshop is in Newcastle", "We are based in Newcastle");
}

export function HomepageFAQ({
  faqs,
  embedded = false,
}: {
  faqs: FaqItem[];
  embedded?: boolean;
}) {
  if (faqs.length === 0) {
    return null;
  }

  const items = faqs.map((faq) => ({
    ...faq,
    answer: rewriteHomepageFaqAnswer(faq.answer),
  }));

  const faqJsonLd = homepageFaqStructuredData(
    items.map((faq) => ({ question: faq.question, answer: faq.answer })),
  );

  const content = (
    <>
      {faqJsonLd ? (
        <script
          id="homepage-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
      <ScrollReveal>
        <h2 className={`${homepageHeadingClass} mb-8`}>
          Frequently asked questions
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
        <FaqDisclosure items={items} className="max-w-none" />
      </ScrollReveal>
    </>
  );

  if (embedded) {
    return <div className="min-w-0">{content}</div>;
  }

  return (
    <SectionShell id="faq">
      {content}
    </SectionShell>
  );
}
