import Link from "@/components/ui/link";

import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { SectionShell } from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type DarkCtaPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function DarkCtaPanel({ children, className }: DarkCtaPanelProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl rounded-lg border border-amber-400/40 bg-ink-800 px-6 py-12 text-center shadow-xl ring-1 ring-ink-50/15 sm:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
}

type DarkCtaSectionProps = {
  children: React.ReactNode;
  className?: string;
};

export function DarkCtaSection({ children, className }: DarkCtaSectionProps) {
  return (
    <SectionShell
      className={cn(
        "relative border-y border-ink-800 bg-gradient-to-b from-ink-950 via-ink-900 to-ink-950 text-ink-100",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-amber-400/45 to-transparent"
      />
      {children}
    </SectionShell>
  );
}

type PageClosingCtaProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  phoneContext?: string;
};

export function PageClosingCta({
  title,
  description,
  primaryLabel = "Get a Free Quote",
  primaryHref = "/contact/",
  phoneContext = "page-closing-cta",
}: PageClosingCtaProps) {
  return (
    <DarkCtaSection>
      <DarkCtaPanel>
        <h2 className="mb-stack-sm font-serif text-h2 text-ink-50">{title}</h2>
        <p className="mb-stack-lg text-body-lg text-ink-100/90">{description}</p>
        <div className="flex flex-col justify-center gap-stack-sm sm:flex-row">
          <Button asChild size="xl">
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="xl"
            className="border-ink-50/90 bg-transparent text-ink-50 hover:border-amber-100 hover:bg-ink-50 hover:text-ink-900"
          >
            <TrackedPhoneLink href={PHONE_HREF} context={phoneContext}>
              Call us — {PHONE_DISPLAY}
            </TrackedPhoneLink>
          </Button>
        </div>
      </DarkCtaPanel>
    </DarkCtaSection>
  );
}
