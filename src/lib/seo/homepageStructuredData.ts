import { env } from "@/env";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

type FaqItem = {
  question: string;
  answer: string;
};

type AggregateRating = {
  ratingValue: number;
  reviewCount: number;
};

export function homepageFaqStructuredData(faqs: FaqItem[]) {
  if (faqs.length === 0) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
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

export function homepageAggregateRatingStructuredData(
  stats: AggregateRating | null,
) {
  if (!stats) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#localbusiness`,
    name: "SteepWood",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: stats.ratingValue,
      reviewCount: stats.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
  };
}
