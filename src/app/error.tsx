"use client";

import Link from "@/components/ui/link";
import { useEffect } from "react";

import { TrackedPhoneLink } from "@/components/analytics/TrackedPhoneLink";
import { SectionShell } from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";
import { PHONE_DISPLAY, PHONE_HREF } from "@/lib/navigation";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("[app/error]", error);
  }, [error]);

  return (
    <SectionShell>
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-mono text-caption uppercase tracking-widest text-amber-600">
          Something went wrong
        </p>
        <h1 className="mt-4 font-serif text-display-2 text-ink-900">
          Something went wrong on our end
        </h1>
        <p className="mt-4 text-body-lg text-ink-800/80">
          Please try again. If the problem persists, call us during business
          hours and we&apos;ll help straight away.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button type="button" size="lg" onClick={reset}>
            Reload page
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">Go home</Link>
          </Button>
        </div>
        <p className="mt-8 text-body-sm text-ink-800/70">
          <TrackedPhoneLink href={PHONE_HREF} context="error-page">
            {PHONE_DISPLAY}
          </TrackedPhoneLink>
        </p>
      </div>
    </SectionShell>
  );
}
