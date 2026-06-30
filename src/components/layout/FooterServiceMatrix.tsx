import Link from "@/components/ui/link";

import {
  ALL_CITIES,
  ALL_SERVICES,
  CITY_LABEL,
  SERVICE_LABEL,
} from "@/lib/seo-graph";

const matrixLinkClass =
  "text-xs text-ink-100/65 transition-colors duration-[var(--duration-fast)] hover:text-amber-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";

export function FooterServiceMatrix() {
  return (
    <details className="group mt-stack-lg border-t border-ink-700/40 pt-stack-lg">
      <summary className="cursor-pointer list-none font-serif text-h4 text-ink-50 marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="inline-flex items-center gap-2">
          Browse all service areas
          <span
            aria-hidden
            className="text-sm text-ink-100/50 transition-transform duration-[var(--duration-fast)] group-open:rotate-180"
          >
            ▾
          </span>
        </span>
        <span className="mt-1 block text-sm font-sans font-normal text-ink-100/60">
          {ALL_SERVICES.length} services across {ALL_CITIES.length} locations
        </span>
      </summary>

      <nav
        aria-label="All service and location pages"
        className="mt-stack-md grid grid-cols-1 gap-stack-lg sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
      >
        {ALL_SERVICES.map((service) => (
          <section key={service} aria-labelledby={`footer-matrix-${service}`}>
            <h5
              id={`footer-matrix-${service}`}
              className="mb-2 text-sm font-medium text-ink-100/90"
            >
              <Link href={`/${service}/`} className={matrixLinkClass}>
                {SERVICE_LABEL[service]}
              </Link>
            </h5>
            <ul className="flex flex-col gap-1">
              {ALL_CITIES.map((city) => (
                <li key={city}>
                  <Link
                    href={`/${service}/${city}/`}
                    className={matrixLinkClass}
                  >
                    {SERVICE_LABEL[service]} in {CITY_LABEL[city]}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </nav>
    </details>
  );
}
