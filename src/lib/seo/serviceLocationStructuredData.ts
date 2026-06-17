import { env } from "@/env";
import { PHONE_SCHEMA } from "@/lib/navigation";
import { PHASE2_AREA_SERVED } from "@/lib/seo/areaServed";
import type { ResolvedServiceLocation } from "@/lib/services-locations/types";
import { canonicalUrl } from "@/lib/seo/canonical";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
const BUSINESS_ID = `${SITE_URL}/#localbusiness`;

type FaqItem = {
  question: string;
  answer: string;
};

type AggregateRating = {
  ratingValue: number;
  reviewCount: number;
};

function locationWikipediaId(name: string): string | undefined {
  const match = PHASE2_AREA_SERVED.find(
    (entry) => entry.name.toLowerCase() === name.toLowerCase(),
  );

  return match?.["@id"];
}

export function comboServiceStructuredData(combo: ResolvedServiceLocation) {
  const pageUrl = canonicalUrl(`/${combo.service.slug}/${combo.location.slug}/`);
  const wikiId = locationWikipediaId(combo.location.name);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    serviceType: combo.service.name,
    name: `${combo.service.name} in ${combo.location.name}`,
    description: combo.metaDescription,
    url: pageUrl,
    provider: { "@id": BUSINESS_ID },
    areaServed: {
      "@type": "City",
      name: combo.location.name,
      ...(wikiId ? { "@id": wikiId } : {}),
    },
  };
}

export function comboLocalBusinessStructuredData(combo: ResolvedServiceLocation) {
  const pageUrl = canonicalUrl(`/${combo.service.slug}/${combo.location.slug}/`);
  const wikiId = locationWikipediaId(combo.location.name);

  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "@id": `${pageUrl}#localbusiness`,
    name: `SteepWood Custom Joinery — ${combo.location.name}`,
    url: pageUrl,
    telephone: PHONE_SCHEMA,
    parentOrganization: { "@id": BUSINESS_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: combo.location.name,
      addressRegion: combo.location.state,
      addressCountry: "AU",
    },
    areaServed: {
      "@type": "City",
      name: combo.location.name,
      ...(wikiId ? { "@id": wikiId } : {}),
    },
  };
}

export function comboBreadcrumbStructuredData(combo: ResolvedServiceLocation) {
  const serviceUrl = canonicalUrl(`/${combo.service.slug}/`);
  const pageUrl = canonicalUrl(`/${combo.service.slug}/${combo.location.slug}/`);

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
        name: combo.service.name,
        item: serviceUrl,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: combo.location.name,
        item: pageUrl,
      },
    ],
  };
}

export function comboFaqStructuredData(
  serviceSlug: string,
  locationSlug: string,
  faqs: FaqItem[],
) {
  if (faqs.length === 0) {
    return null;
  }

  const pageUrl = canonicalUrl(`/${serviceSlug}/${locationSlug}/`);

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

export function comboAggregateRatingStructuredData(
  combo: ResolvedServiceLocation,
  stats: AggregateRating | null,
) {
  if (!stats) {
    return null;
  }

  const pageUrl = canonicalUrl(`/${combo.service.slug}/${combo.location.slug}/`);

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${pageUrl}#localbusiness`,
    name: `SteepWood Custom Joinery — ${combo.location.name}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.ratingValue,
      reviewCount: stats.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
