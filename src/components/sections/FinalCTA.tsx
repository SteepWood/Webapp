"use client";

import Link from "@/components/ui/link";

import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import {
  DarkCtaPanel,
  DarkCtaSection,
} from "@/components/sections/dark-cta-section";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/navigation";

export function FinalCTA() {
  return (
    <DarkCtaSection>
      <ScrollReveal>
        <DarkCtaPanel>
          <h2 className="mb-stack-sm font-serif text-h2 text-ink-50">
            Ready to start your project?
          </h2>
          <p className="mb-stack-lg text-body-lg text-ink-100/90">
            Free design consultation, fixed-price quote within 5 working days, no
            obligation.
          </p>
          <div className="flex flex-col justify-center gap-stack-sm sm:flex-row">
            <Button asChild size="xl">
              <Link href="/contact/">Get a Free Quote</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="border-ink-50/90 bg-transparent text-ink-50 hover:border-amber-100 hover:bg-ink-50 hover:text-ink-900"
            >
              <TrackedPhoneLink href={PHONE_HREF} context="final-cta">
                Call us — {PHONE_DISPLAY}
              </TrackedPhoneLink>
            </Button>
          </div>
        </DarkCtaPanel>
      </ScrollReveal>
    </DarkCtaSection>
  );
}
