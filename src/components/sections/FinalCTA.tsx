import Link from "@/components/ui/link";

import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { BackgroundGradientAnimation } from "@/components/ui/aceternity/background-gradient-animation";
import { SectionShell } from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/navigation";

export function FinalCTA() {
  return (
    <SectionShell className="bg-ink-900 text-ink-100">
      <BackgroundGradientAnimation className="mx-auto max-w-3xl rounded-2xl px-4 py-2 text-center">
        <h2 className="mb-stack-sm font-serif text-h2 text-ink-50">
          Ready to start your project?
        </h2>
        <p className="mb-stack-lg text-body-lg text-ink-100/80">
          Free design consultation, fixed-price quote within 5 working days, no
          obligation.
        </p>
        <div className="flex flex-col justify-center gap-stack-sm sm:flex-row">
          <Button asChild size="xl">
            <Link href="/contact/">Get a Free Quote</Link>
          </Button>
          <Button asChild variant="outline" size="xl" className="border-ink-50 text-ink-50 hover:bg-ink-50 hover:text-ink-900">
            <TrackedPhoneLink href={PHONE_HREF} context="final-cta">
              Call us — {PHONE_DISPLAY}
            </TrackedPhoneLink>
          </Button>
        </div>
      </BackgroundGradientAnimation>
    </SectionShell>
  );
}
