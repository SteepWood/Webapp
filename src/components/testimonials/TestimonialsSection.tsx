import type { Testimonial } from "@prisma/client";

import { SectionShell, sectionHeadingClass } from "@/components/sections/section-shell";
import type { AggregateRatingStats } from "@/lib/testimonials/aggregateRating";
import { buildPageReviewStructuredData } from "@/lib/seo/aggregateRatingSchema";

import { TestimonialGrid } from "./TestimonialGrid";

type TestimonialsSectionProps = {
  title?: string;
  testimonials: Testimonial[];
  aggregateRating?: AggregateRatingStats | null;
  entityId: string;
  entityName: string;
  entityType?: "LocalBusiness" | "Service" | "HomeAndConstructionBusiness";
  pageUrl: string;
  className?: string;
};

export function TestimonialsSection({
  title = "What our clients say",
  testimonials,
  aggregateRating = null,
  entityId,
  entityName,
  entityType = "LocalBusiness",
  pageUrl,
  className,
}: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null;
  }

  const schemas = buildPageReviewStructuredData({
    entityId,
    entityName,
    entityType,
    pageUrl,
    aggregateRating,
    testimonials,
  });

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`${entityId}-review-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <SectionShell id="testimonials" className={className}>
        <h2 className={sectionHeadingClass}>{title}</h2>
        <TestimonialGrid testimonials={testimonials} />
      </SectionShell>
    </>
  );
}
