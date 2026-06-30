import type { City } from "@/lib/seo-graph";
import { CITY_LABEL, CITY_STATE } from "@/lib/seo-graph";

type LocalBusinessSchemaProps = {
  city?: City;
};

export function LocalBusinessSchema({ city }: LocalBusinessSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://steepwood.com.au/#business",
    name: "SteepWood",
    legalName: "Pavit Cabinetry Pty Ltd",
    url: "https://steepwood.com.au/",
    telephone: "+61468387676",
    email: "hello@steepwood.com.au",
    foundingDate: "2014",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Newcastle",
      addressRegion: "NSW",
      addressCountry: "AU",
    },
    areaServed: city
      ? {
          "@type": "City",
          name: CITY_LABEL[city],
          addressRegion: CITY_STATE[city],
          addressCountry: "AU",
        }
      : { "@type": "Country", name: "Australia" },
    identifier: [
      { "@type": "PropertyValue", name: "ABN", value: "52 697 313 269" },
      {
        "@type": "PropertyValue",
        name: "NSW Carpentry Contractor Licence",
        value: "489553C",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
