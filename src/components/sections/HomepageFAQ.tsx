"use client";

import Script from "next/script";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
      <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
        Frequently asked questions
      </h2>
      <Accordion type="single" collapsible className="max-w-3xl">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger className="text-left font-medium text-ink-900">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-body leading-relaxed text-ink-800/80">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      {faqJsonLd ? (
        <Script
          id="homepage-faq-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      ) : null}
    </SectionShell>
  );
}
