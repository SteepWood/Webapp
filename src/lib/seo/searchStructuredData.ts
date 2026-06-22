import { env } from "@/env";
import { canonicalUrl } from "@/lib/seo/canonical";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

export function searchPageStructuredData() {
  const pageUrl = canonicalUrl("/search/");

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "Search SteepWood",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en-AU",
    },
    {
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
          name: "Search",
          item: pageUrl,
        },
      ],
    },
  ] as const;
}
