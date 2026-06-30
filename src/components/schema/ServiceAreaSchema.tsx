import type { City, Service } from "@/lib/seo-graph";
import {
  CITY_LABEL,
  CITY_STATE,
  SERVICE_LABEL,
  SERVICE_PRIMARY_KEYWORD,
} from "@/lib/seo-graph";

type ServiceAreaSchemaProps = {
  service: Service;
  city: City;
};

export function ServiceAreaSchema({ service, city }: ServiceAreaSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: SERVICE_LABEL[service],
    name: `${SERVICE_LABEL[service]} in ${CITY_LABEL[city]}`,
    description: `${SERVICE_PRIMARY_KEYWORD[service]} delivered to ${CITY_LABEL[city]} ${CITY_STATE[city]} by SteepWood.`,
    provider: { "@id": "https://steepwood.com.au/#business" },
    areaServed: {
      "@type": "City",
      name: CITY_LABEL[city],
      addressRegion: CITY_STATE[city],
      addressCountry: "AU",
    },
    url: `https://steepwood.com.au/${service}/${city}/`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
