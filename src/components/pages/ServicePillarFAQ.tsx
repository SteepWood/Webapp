import { FaqDisclosure } from "@/components/faq/FaqDisclosure";
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
      <FaqDisclosure items={faqs} />
    </SectionShell>
  );
}
