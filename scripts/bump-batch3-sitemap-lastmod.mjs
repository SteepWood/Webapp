/**
 * Bump Batch 3 BlogPost.updatedAt to dateModified so /sitemap.xml lastmod
 * reflects go-live (not the back-dated publishedAt).
 */
import { PrismaClient } from "@prisma/client";

const DATE_MODIFIED = new Date("2026-11-06T07:00:00+11:00");

const BATCH3_SLUGS = [
  "office-fitout-newcastle-guide",
  "kitchen-installation-cost-nsw",
  "shop-fitout-newcastle-guide",
  "decking-cost-newcastle",
  "home-office-joinery-newcastle",
  "commercial-joinery-newcastle-guide",
  "office-fitout-central-coast-guide",
  "kitchen-installation-newcastle",
  "composite-vs-timber-decking-central-coast",
  "shop-fitout-central-coast",
  "cafe-fitout-cost-nsw",
  "built-in-desk-study-nook-sydney",
  "kitchen-installation-central-coast",
  "office-fitout-timeline-nsw",
  "retail-shop-fitout-sydney",
  "deck-builders-sydney-cost",
  "medical-clinic-fitout-joinery-nsw",
  "commercial-joinery-sydney-builders",
  "kitchen-installation-sydney",
  "home-office-joinery-central-coast",
  "office-kitchenette-breakout-joinery",
  "shop-counter-display-joinery",
  "spotted-gum-merbau-blackbutt-decking-nsw",
  "salon-barber-shop-fitout-nsw",
  "kitchen-installation-process-day-by-day",
  "compact-laminate-commercial-joinery",
  "home-office-built-ins-hybrid-work-nsw",
  "office-fitout-sydney-small-business",
  "commercial-joinery-central-coast",
  "christmas-shutdown-fitout-planning-nsw",
];

const prisma = new PrismaClient();

const result = await prisma.blogPost.updateMany({
  where: { slug: { in: BATCH3_SLUGS } },
  data: { updatedAt: DATE_MODIFIED },
});

console.log(
  `Updated updatedAt to ${DATE_MODIFIED.toISOString()} for ${result.count} Batch 3 posts.`,
);

await prisma.$disconnect();
