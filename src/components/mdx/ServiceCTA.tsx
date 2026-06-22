import Link from "@/components/ui/link";

import { Button } from "@/components/ui/button";
import { contentSubheadingClass } from "@/components/sections/section-shell";
import { SERVICES } from "@/lib/services-locations/services";

export function ServiceCTA({ service }: { service: string }) {
  const matched = SERVICES.find((entry) => entry.slug === service);

  if (!matched) {
    return null;
  }

  return (
    <div className="my-8 rounded-lg border border-amber-500/30 bg-amber-50/70 p-6 not-prose">
      <p className="mb-1 font-mono text-caption uppercase tracking-widest text-amber-700">
        SteepWood service
      </p>
      <h3 className={contentSubheadingClass}>{matched.name}</h3>
      <p className="mb-4 text-body text-ink-800/80">{matched.shortDescription}</p>
      <Button asChild>
        <Link href={`/${matched.slug}/`}>Explore {matched.shortTitle}</Link>
      </Button>
    </div>
  );
}
