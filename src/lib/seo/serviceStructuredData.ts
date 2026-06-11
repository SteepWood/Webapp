import { env } from "@/env";
import { LOCATIONS } from "@/lib/services-locations/locations";
import type { ResolvedService } from "@/lib/services-locations/types";
import { canonicalUrl } from "@/lib/seo/canonical";

import { schemaAreaServed } from "./areaServed";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
const BUSINESS_ID = `${SITE_URL}/#localbusiness`;

type FaqItem = {
  question: string;
  answer: string;
};

export function servicePillarStructuredData(service: ResolvedService) {
  const serviceUrl = canonicalUrl(`/${service.slug}/`);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${serviceUrl}#service`,
    serviceType: service.name,
    name: `${service.name} by SteepWood`,
    description: service.metaDescription,
    url: serviceUrl,
    provider: { "@id": BUSINESS_ID },
    areaServed: schemaAreaServed(),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} Locations`,
      itemListElement: LOCATIONS.map((location, index) => ({
        "@type": "Offer",
        position: index + 1,
        itemOffered: {
          "@type": "Service",
          name: `${service.name} in ${location.name}`,
          url: canonicalUrl(`/${service.slug}/${location.slug}/`),
        },
      })),
    },
  };
}

export function serviceBreadcrumbStructuredData(service: ResolvedService) {
  const serviceUrl = canonicalUrl(`/${service.slug}/`);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: service.name,
        item: serviceUrl,
      },
    ],
  };
}

export function serviceFaqStructuredData(
  serviceSlug: string,
  faqs: FaqItem[],
) {
  if (faqs.length === 0) {
    return null;
  }

  const pageUrl = canonicalUrl(`/${serviceSlug}/`);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
