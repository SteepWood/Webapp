import Link from "@/components/ui/link";

import { SectionShell } from "@/components/sections/section-shell";
import { Button } from "@/components/ui/button";

export function AboutCTA() {
  return (
    <SectionShell>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="mb-stack-sm font-serif text-h2 text-ink-900">
          Want to see what we can craft for you?
        </h2>
        <p className="mb-stack-lg text-body-lg text-ink-800">
          Book a free design consultation or browse recent projects from our
          Newcastle workshop.
        </p>
        <div className="flex flex-col justify-center gap-stack-sm sm:flex-row">
          <Button asChild size="xl">
            <Link href="/quote/">Get a Free Measure &amp; Quote</Link>
          </Button>
          <Button asChild variant="outline" size="xl">
            <Link href="/portfolio/">View Our Work</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
