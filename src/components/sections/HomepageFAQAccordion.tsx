"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export function HomepageFAQAccordion({ faqs }: { faqs: FaqItem[] }) {
  return (
    <>
      <ScrollReveal>
        <h2 className="mb-stack-lg font-serif text-h2 text-ink-900">
          Frequently asked questions
        </h2>
      </ScrollReveal>
      <ScrollReveal delay={0.08}>
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
      </ScrollReveal>
    </>
  );
}
