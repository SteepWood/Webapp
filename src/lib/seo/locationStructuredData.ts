import { env } from "@/env";
import { PHONE_SCHEMA } from "@/lib/navigation";
import { PHASE2_AREA_SERVED } from "@/lib/seo/areaServed";
import type { ResolvedLocation } from "@/lib/services-locations/types";
import { canonicalUrl } from "@/lib/seo/canonical";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
const BUSINESS_ID = `${SITE_URL}/#localbusiness`;

type FaqItem = {
  question: string;
  answer: string;
};

function locationWikipediaId(name: string): string | undefined {
  const match = PHASE2_AREA_SERVED.find(
    (entry) => entry.name.toLowerCase() === name.toLowerCase(),
  );

  return match?.["@id"];
}

export function locationHubStructuredData(
  location: ResolvedLocation,
  coveredSuburbs: string[],
) {
  const pageUrl = canonicalUrl(`/locations/${location.slug}/`);
  const wikiId = locationWikipediaId(location.name);

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${pageUrl}#service-area`,
    name: `SteepWood Custom Joinery — ${location.name}`,
    url: pageUrl,
    telephone: PHONE_SCHEMA,
    parentOrganization: { "@id": BUSINESS_ID },
    areaServed: [
      {
        "@type": "City",
        name: location.name,
        ...(wikiId ? { "@id": wikiId } : {}),
      },
      ...coveredSuburbs.map((suburb) => ({
        "@type": "Place",
        name: suburb,
      })),
    ],
  };
}

export function locationBreadcrumbStructuredData(location: ResolvedLocation) {
  const pageUrl = canonicalUrl(`/locations/${location.slug}/`);

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
        name: "Locations",
        item: `${SITE_URL}/locations/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: pageUrl,
      },
    ],
  };
}

export function locationFaqStructuredData(
  locationSlug: string,
  faqs: FaqItem[],
) {
  if (faqs.length === 0) {
    return null;
  }

  const pageUrl = canonicalUrl(`/locations/${locationSlug}/`);

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
