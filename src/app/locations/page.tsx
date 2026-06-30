import type { Metadata } from "next";
import Link from "@/components/ui/link";

import { SectionShell } from "@/components/sections/section-shell";
import { LOCATIONS } from "@/lib/services-locations/locations";
import { canonicalUrl } from "@/lib/seo/canonical";

export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Locations — SteepWood Custom Joinery Across Australia",
  description:
    "SteepWood delivers custom joinery to 16 cities across Australia. Find your nearest service area.",
  alternates: {
    canonical: canonicalUrl("/locations/"),
    languages: {
      "en-AU": canonicalUrl("/locations/"),
    },
  },
  openGraph: {
    title: "Locations — SteepWood Custom Joinery Across Australia",
    description:
      "SteepWood delivers custom joinery to 16 cities across Australia. Find your nearest service area.",
    url: canonicalUrl("/locations/"),
    siteName: "SteepWood",
    locale: "en_AU",
    type: "website",
  },
};

export default function LocationsIndexPage() {
  return (
    <SectionShell>
      <div className="mb-stack-lg max-w-3xl">
        <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
          Australia-wide
        </p>
        <h1 className="mb-stack-md font-serif text-display-2 text-ink-900">
          SteepWood Locations Across Australia
        </h1>
        <p className="text-body-lg text-ink-800">
          Every SteepWood project is designed and built in our workshop. We
          travel for free consultations across NSW and ACT, and deliver via
          dedicated furniture freight to QLD, VIC, WA, and SA.
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {LOCATIONS.map((location) => (
          <li key={location.slug}>
            <Link
              href={`/locations/${location.slug}/`}
              className="surface-card block rounded-lg p-5 transition-colors hover:border-amber-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
            >
              <h2 className="font-serif text-h4 text-ink-900">{location.name}</h2>
              <p className="mt-1 text-body-sm text-ink-800/70">
                {location.state} · {location.region}
              </p>
              <p className="mt-3 text-body-sm leading-relaxed text-ink-800/80">
                {location.areaDescription.slice(0, 140).trimEnd()}…
              </p>
              <span className="mt-4 inline-block text-sm font-medium text-amber-600">
                View location →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
