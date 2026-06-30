import Link from "@/components/ui/link";

import type { City } from "@/lib/seo-graph";
import { ALL_SERVICES, CITY_LABEL, SERVICE_LABEL } from "@/lib/seo-graph";
import { contentSubheadingClass } from "@/components/sections/section-shell";

type CityServiceGridProps = {
  city: City;
};

export function CityServiceGrid({ city }: CityServiceGridProps) {
  const cityLabel = CITY_LABEL[city];

  return (
    <section
      className="city-service-grid"
      aria-label={`All services in ${cityLabel}`}
    >
      <h2 className={contentSubheadingClass}>
        All SteepWood services in {cityLabel}
      </h2>
      <ul className="mt-stack-md grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {ALL_SERVICES.map((service) => (
          <li key={service}>
            <Link
              href={`/${service}/${city}/`}
              className="text-amber-700 underline-offset-4 hover:underline"
            >
              {SERVICE_LABEL[service]} in {cityLabel}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
