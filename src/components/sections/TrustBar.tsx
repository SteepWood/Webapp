import Link from "@/components/ui/link";

import { SectionShell } from "@/components/sections/section-shell";
import { TrustBarMotion } from "@/components/sections/TrustBarMotion";
import { getAggregateRating } from "@/lib/testimonials/aggregateRating";

export async function TrustBar() {
  const aggregateRating = await getAggregateRating();

  return (
    <SectionShell className="surface-panel border-y border-ink-700/15 py-8">
      <TrustBarMotion>
      <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
        {aggregateRating ? (
          <Link
            href="/#testimonials"
            className="flex items-center gap-3 rounded-md text-ink-900 transition-colors hover:text-amber-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
          >
            <span className="text-amber-600" aria-hidden>
              ★★★★★
            </span>
            <span className="text-sm font-medium">
              {aggregateRating.ratingValue} on Google ·{" "}
              <span className="underline-offset-4 hover:underline">
                Read {aggregateRating.reviewCount} Reviews
              </span>
            </span>
          </Link>
        ) : (
          <p className="text-sm font-medium text-ink-900">
            Trusted custom joinery across Australia
          </p>
        )}
      </div>
      </TrustBarMotion>
    </SectionShell>
  );
}
