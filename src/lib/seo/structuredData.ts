import { AIO_CANONICAL_DESCRIPTION } from "@/lib/aio/constants";
import { founderPersonStructuredData } from "@/lib/aio/schema";
import {
  BUSINESS_LEGAL_NAME,
  BUSINESS_TRADING_NAME,
  FOUNDING_YEAR,
} from "@/lib/business";
import { env } from "@/env";
import { PHONE_SCHEMA } from "@/lib/navigation";
import { schemaAreaServed } from "@/lib/seo/areaServed";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

export function rootStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: BUSINESS_TRADING_NAME,
        legalName: BUSINESS_LEGAL_NAME,
        foundingDate: String(FOUNDING_YEAR),
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
        image: `${SITE_URL}/og-default.jpg`,
        telephone: PHONE_SCHEMA,
        email: "hello@steepwood.com.au",
        priceRange: "$$$",
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
      },
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
