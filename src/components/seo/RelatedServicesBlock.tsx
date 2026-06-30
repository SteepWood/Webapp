import Link from "@/components/ui/link";

import type { Service } from "@/lib/seo-graph";
import { RELATED_SERVICES, SERVICE_LABEL } from "@/lib/seo-graph";
import { contentSubheadingClass } from "@/components/sections/section-shell";

type RelatedServicesBlockProps = {
  currentService: Service;
};

export function RelatedServicesBlock({ currentService }: RelatedServicesBlockProps) {
  const related = RELATED_SERVICES[currentService];

  return (
    <section className="related-services" aria-label="Related services">
      <h2 className={contentSubheadingClass}>Related joinery services</h2>
      <ul className="mt-stack-sm flex flex-col gap-2">
        {related.map((service) => (
          <li key={service}>
            <Link
              href={`/${service}/`}
              className="text-amber-700 underline-offset-4 hover:underline"
            >
              {SERVICE_LABEL[service]}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
