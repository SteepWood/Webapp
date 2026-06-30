import type { Service } from "@/lib/seo-graph";
import { SERVICE_LABEL, SERVICE_PRIMARY_KEYWORD } from "@/lib/seo-graph";

type ServiceSchemaProps = {
  service: Service;
};

export function ServiceSchema({ service }: ServiceSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: SERVICE_LABEL[service],
    name: `${SERVICE_LABEL[service]} by SteepWood`,
    description: `${SERVICE_PRIMARY_KEYWORD[service]} designed, manufactured and installed by SteepWood from our Newcastle workshop.`,
    provider: { "@id": "https://steepwood.com.au/#business" },
    areaServed: { "@type": "Country", name: "Australia" },
    url: `https://steepwood.com.au/${service}/`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
