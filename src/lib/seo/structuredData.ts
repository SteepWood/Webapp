import { AIO_CANONICAL_DESCRIPTION } from "@/lib/aio/constants";
import { BUSINESS_LEGAL_NAME, BUSINESS_TRADING_NAME } from "@/lib/business";
import { env } from "@/env";
import { PHONE_SCHEMA } from "@/lib/navigation";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

const SOCIAL_URLS = [
  "https://www.instagram.com/steepwood/",
  "https://www.facebook.com/steepwood/",
  "https://www.houzz.com.au/professionals/cabinet-makers/steepwood",
] as const;

const AREA_SERVED = [
  {
    name: "Newcastle",
    "@id": "https://en.wikipedia.org/wiki/Newcastle,_New_South_Wales",
  },
  {
    name: "Sydney",
    "@id": "https://en.wikipedia.org/wiki/Sydney",
  },
  {
    name: "Central Coast",
    "@id": "https://en.wikipedia.org/wiki/Central_Coast_(New_South_Wales)",
  },
  {
    name: "Wollongong",
    "@id": "https://en.wikipedia.org/wiki/Wollongong",
  },
  {
    name: "Hunter Valley",
    "@id": "https://en.wikipedia.org/wiki/Hunter_Region",
  },
  {
    name: "Port Macquarie",
    "@id": "https://en.wikipedia.org/wiki/Port_Macquarie",
  },
  {
    name: "Coffs Harbour",
    "@id": "https://en.wikipedia.org/wiki/Coffs_Harbour",
  },
  {
    name: "Tamworth",
    "@id": "https://en.wikipedia.org/wiki/Tamworth,_New_South_Wales",
  },
  {
    name: "Armidale",
    "@id": "https://en.wikipedia.org/wiki/Armidale",
  },
  {
    name: "Byron Bay",
    "@id": "https://en.wikipedia.org/wiki/Byron_Bay,_New_South_Wales",
  },
  {
    name: "Melbourne",
    "@id": "https://en.wikipedia.org/wiki/Melbourne",
  },
  {
    name: "Brisbane",
    "@id": "https://en.wikipedia.org/wiki/Brisbane",
  },
  {
    name: "Perth",
    "@id": "https://en.wikipedia.org/wiki/Perth",
  },
  {
    name: "Adelaide",
    "@id": "https://en.wikipedia.org/wiki/Adelaide",
  },
  {
    name: "Canberra",
    "@id": "https://en.wikipedia.org/wiki/Canberra",
  },
  {
    name: "Gold Coast",
    "@id": "https://en.wikipedia.org/wiki/Gold_Coast,_Queensland",
  },
] as const;

export function rootStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": `${SITE_URL}/#localbusiness`,
        name: BUSINESS_TRADING_NAME,
        legalName: BUSINESS_LEGAL_NAME,
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
        areaServed: AREA_SERVED.map((city) => ({
          "@type": "City",
          name: city.name,
          "@id": city["@id"],
        })),
        sameAs: [...SOCIAL_URLS],
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: BUSINESS_LEGAL_NAME,
        alternateName: BUSINESS_TRADING_NAME,
        url: SITE_URL,
        description: AIO_CANONICAL_DESCRIPTION,
        logo: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo.png`,
          width: 512,
          height: 512,
        },
        sameAs: [...SOCIAL_URLS],
      },
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
            urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };
}
