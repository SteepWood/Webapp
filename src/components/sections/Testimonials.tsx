import { SectionShell } from "@/components/sections/section-shell";
import {
  homepageHeadingClass,
  homepageInnerClass,
  homepageSectionClass,
} from "@/components/sections/homepageStyles";
import { Skeleton } from "@/components/ui/skeleton";
import { TestimonialGrid } from "@/components/testimonials/TestimonialGrid";
import { getFeaturedTestimonials } from "@/lib/db/testimonials";
import { env } from "@/env";
import { getAggregateRating } from "@/lib/testimonials/aggregateRating";
import { staticFeaturedTestimonials } from "@/lib/testimonials/staticTestimonials";
import { buildPageReviewStructuredData } from "@/lib/seo/aggregateRatingSchema";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

export function TestimonialsSkeleton() {
  return (
    <SectionShell>
      <Skeleton className="mb-8 h-10 w-64" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    </SectionShell>
  );
}

export async function Testimonials() {
  const [testimonialsResult, aggregateRatingResult] = await Promise.allSettled([
    getFeaturedTestimonials(6),
    getAggregateRating(),
  ]);

  const testimonials =
    testimonialsResult.status === "fulfilled" &&
    testimonialsResult.value.length > 0
      ? testimonialsResult.value
      : staticFeaturedTestimonials(6);

  const aggregateRating =
    aggregateRatingResult.status === "fulfilled"
      ? aggregateRatingResult.value
      : null;

  if (testimonials.length === 0) {
    return null;
  }

  const schemas = buildPageReviewStructuredData({
    entityId: `${SITE_URL}/#localbusiness`,
    entityName: "SteepWood",
    entityType: "LocalBusiness",
    pageUrl: `${SITE_URL}/`,
    aggregateRating,
    testimonials,
  });

  return (
    <section id="testimonials" className={homepageSectionClass}>
      <div className={homepageInnerClass}>
      {schemas.map((schema, index) => (
        <script
          key={`homepage-review-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <h2 className={`${homepageHeadingClass} mb-10`}>
        What our clients say
      </h2>
      {/* TODO: Show Google Verified review labels once the Google Business Profile is verified. (SW 2026-11-11) */}
      <TestimonialGrid
        testimonials={testimonials}
        showSourceBadge={false}
        snapOnPhone
      />
      </div>
    </section>
  );
}
