import { rootStructuredData } from "@/lib/seo/structuredData";
import { getAggregateRating } from "@/lib/testimonials/aggregateRating";

export async function RootStructuredDataScript() {
  const aggregateRating = await getAggregateRating();

  return (
    <script
      id="root-jsonld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(rootStructuredData(aggregateRating)),
      }}
    />
  );
}
