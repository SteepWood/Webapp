import { AIO_CANONICAL_DESCRIPTION } from "@/lib/aio/constants";
import { founderPersonStructuredData } from "@/lib/aio/schema";
import {
  ABN_DISPLAY,
  BUSINESS_LEGAL_NAME,
  BUSINESS_TRADING_NAME,
  CARPENTRY_LICENCE_DISPLAY,
  FOUNDING_YEAR,
} from "@/lib/business";
import { env } from "@/env";
import { GOOGLE_BUSINESS_PROFILE_URL, PHONE_SCHEMA } from "@/lib/navigation";
import { SERVICES } from "@/lib/services-locations/services";
import { schemaAreaServed } from "@/lib/seo/areaServed";
import type { AggregateRatingStats } from "@/lib/testimonials/aggregateRating";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

function buildOfferCatalog() {
  return {
    "@type": "OfferCatalog" as const,
    name: "Custom Joinery Services",
    itemListElement: SERVICES.map((service, index) => ({
      "@type": "Offer" as const,
      position: index + 1,
      itemOffered: {
        "@type": "Service" as const,
        name: service.name,
        url: `${SITE_URL}/${service.slug}/`,
      },
    })),
  };
}

export function rootStructuredData(
  aggregateRating: AggregateRatingStats | null = null,
) {
  const localBusiness: Record<string, unknown> = {
    "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
    "@id": `${SITE_URL}/#localbusiness`,
    name: BUSINESS_TRADING_NAME,
    legalName: BUSINESS_LEGAL_NAME,
    alternateName: BUSINESS_TRADING_NAME,
    description: AIO_CANONICAL_DESCRIPTION,
    foundingDate: String(FOUNDING_YEAR),
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/og-default.jpg`,
    telephone: PHONE_SCHEMA,
    email: "hello@steepwood.com.au",
    priceRange: "$$$",
    sameAs: [GOOGLE_BUSINESS_PROFILE_URL],
    identifier: [
      {
        "@type": "PropertyValue",
        propertyID: "ABN",
        value: ABN_DISPLAY,
      },
      {
        "@type": "PropertyValue",
        propertyID: "NSW Carpentry Contractor Licence",
        value: CARPENTRY_LICENCE_DISPLAY.replace(
          "NSW Carpentry Contractor Licence ",
          "",
        ),
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Newcastle",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -32.9283,
      longitude: 151.7817,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "07:00",
        closes: "17:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
        description: "By appointment",
      },
    ],
    areaServed: schemaAreaServed(),
    hasOfferCatalog: buildOfferCatalog(),
  };

  if (aggregateRating) {
    localBusiness.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue,
      reviewCount: aggregateRating.reviewCount,
      bestRating: aggregateRating.bestRating,
      worstRating: aggregateRating.worstRating,
    };
  }

  return {
    "@context": "https://schema.org",
    "@graph": [
      localBusiness,
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BUSINESS_LEGAL_NAME,
        alternateName: BUSINESS_TRADING_NAME,
        foundingDate: String(FOUNDING_YEAR),
        url: SITE_URL,
        description: AIO_CANONICAL_DESCRIPTION,
        founder: { "@id": `${SITE_URL}/#founder` },
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
      },
      founderPersonStructuredData(),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: BUSINESS_TRADING_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
        inLanguage: "en-AU",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${SITE_URL}/search/?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}
