"use client";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ServicesBentoGrid } from "@/components/sections/ServicesBentoGrid";
import { SectionShell } from "@/components/sections/section-shell";
import type { HomepageService } from "@/lib/db/homepage-page";

export function ServicesOverview({
  services,
}: {
  services: HomepageService[];
}) {
  return (
    <SectionShell id="services">
      <ScrollReveal className="mb-stack-lg max-w-3xl">
        <h2 className="mb-stack-sm font-serif text-h2 text-ink-900">
          Ten services. One commitment to craft.
        </h2>
        <p className="text-body-lg text-ink-800">
          From custom kitchens to commercial fitouts, we design and manufacture
          every piece in our Newcastle workshop.
        </p>
      </ScrollReveal>

      <ServicesBentoGrid services={services} />
    </SectionShell>
  );
}
