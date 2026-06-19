"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionShell, sectionHeadingClass } from "@/components/sections/section-shell";
import type { ServiceFaq } from "@/lib/services-locations/serviceContent";

export function ServicePillarFAQ({
  faqs,
  className,
}: {
  faqs: ServiceFaq[];
  className?: string;
}) {
  if (faqs.length === 0) {
    return null;
  }

  return (
    <SectionShell id="faq" className={className}>
      <h2 className={sectionHeadingClass}>
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
    </SectionShell>
  );
}
