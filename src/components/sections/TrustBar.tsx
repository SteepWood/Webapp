import Link from "@/components/ui/link";

import { getAggregateRating } from "@/lib/testimonials/aggregateRating";

const PROOF_STATS = [
  { value: "2014", label: "Building joinery in Newcastle" },
  { value: "Free", label: "Design consultation" },
  { value: "5 days", label: "Fixed-price quote after measure" },
  { value: "In-house", label: "Designed, made and installed" },
] as const;

export async function TrustBar() {
  const aggregateRating = await getAggregateRating();

  return (
    <section
      className="border-b border-[#e4d9ca] bg-[#f1eae0]"
      aria-label="SteepWood at a glance"
    >
      {/* TODO: Show the Google rating strip again once the Google Business Profile is verified. (SW 2026-11-11) */}
      <div hidden>
        {aggregateRating ? (
          <Link href="/#testimonials">
            <span aria-hidden>★★★★★</span>
            <span>
              {aggregateRating.ratingValue} on Google · Read{" "}
              {aggregateRating.reviewCount} Reviews
            </span>
          </Link>
        ) : (
          <p>Trusted custom joinery across Australia</p>
        )}
      </div>

      <ul className="mx-auto grid max-w-7xl grid-cols-2 px-container-x lg:grid-cols-4">
        {PROOF_STATS.map((stat) => (
          <li
            key={stat.value}
            className="border-[#dccbb6] border-r border-b px-5 py-8 even:border-r-0 lg:border-b-0 lg:px-8 lg:even:border-r lg:last:border-r-0"
          >
            <p className="font-serif text-4xl leading-none text-amber-500 lg:text-5xl">
              {stat.value}
            </p>
            <p className="mt-3 max-w-[14rem] text-sm leading-snug text-[#5c4a3c]">
              {stat.label}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
