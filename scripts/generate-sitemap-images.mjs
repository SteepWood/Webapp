import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Regenerates public/sitemap-images.xml for Batch 2 + Batch 3 posts.
 * Page <loc> values use trailing slashes to match next.config trailingSlash.
 */

const BATCH2_SLUGS = [
  "laundry-joinery-cost-nsw",
  "kitchen-renovation-timeline-lead-times-nsw",
  "porcelain-sintered-stone-benchtop-cost-nsw",
  "butlers-pantry-cost-nsw",
  "cabinetry-cost-per-linear-metre-nsw",
  "blum-hardware-cost-australia",
  "floating-vanity-vs-floor-mounted-cost-nsw",
  "timber-staircase-cost-nsw",
  "kitchen-island-cost-nsw",
  "joinery-timber-species-guide-nsw",
  "hamptons-kitchen-cost-nsw",
  "home-office-joinery-cost-nsw",
  "custom-timber-furniture-cost-australia",
  "reception-desk-cost-australia",
  "office-fitout-joinery-cost-nsw",
  "shopfitting-cost-by-format-nsw",
  "cabinetmaker-hourly-rate-vs-charge-out-nsw",
  "why-custom-joinery-quotes-differ-australia",
  "nsw-building-licence-hbcf-warranty-guide",
  "joinery-cost-guide-newcastle-hunter",
  "joinery-cost-guide-central-coast",
  "joinery-cost-guide-wollongong-illawarra",
  "joinery-cost-guide-northern-beaches",
  "joinery-cost-guide-eastern-suburbs-sydney",
  "joinery-cost-guide-north-shore-sydney",
  "joinery-cost-guide-inner-west-sydney",
  "apartment-terrace-joinery-sydney",
  "southern-highlands-hunter-valley-joinery-guide",
  "regional-nsw-joinery-guide",
  "new-home-joinery-growth-corridors-nsw",
];

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

// dateModified for every Batch 3 post (Publish All Now + Phase 2 image go-live).
const BATCH3_DATE_MODIFIED = "2026-11-06T07:00:00+11:00";

const SLOT_ORDER = ["hero", "inline-01", "inline-02", "inline-wide", "og"];

const ROOT = process.cwd();
const BATCH2_META = path.join(
  ROOT,
  "src",
  "lib",
  "blog",
  "batch2-images",
  "image-metadata.json",
);
const BATCH3_META = path.join(
  ROOT,
  "docs",
  "blog",
  "batch3",
  "images",
  "image-metadata.json",
);
const OUT_PATH = path.join(ROOT, "public", "sitemap-images.xml");

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function batch2ScheduleDate(dayIndex) {
  const start = new Date(Date.UTC(2026, 6, 25)); // 2026-07-25
  start.setUTCDate(start.getUTCDate() + dayIndex);
  const year = start.getUTCFullYear();
  const month = String(start.getUTCMonth() + 1).padStart(2, "0");
  const day = String(start.getUTCDate()).padStart(2, "0");
  return new Date(`${year}-${month}-${day}T07:00:00+10:00`).toISOString();
}

function indexBySlug(records) {
  const bySlug = new Map();
  for (const record of records) {
    if (!bySlug.has(record.slug)) {
      bySlug.set(record.slug, new Map());
    }
    bySlug.get(record.slug).set(record.slot, record);
  }
  return bySlug;
}

function appendPost(chunks, slug, slots, lastmodIso) {
  if (!slots) {
    throw new Error(`Missing image metadata for ${slug}`);
  }
  chunks.push(`  <url>`);
  chunks.push(`    <loc>https://steepwood.com.au/blog/${slug}/</loc>`);
  chunks.push(`    <lastmod>${new Date(lastmodIso).toISOString()}</lastmod>`);

  for (const slot of SLOT_ORDER) {
    const record = slots.get(slot);
    if (!record) {
      throw new Error(`Missing slot ${slot} for ${slug}`);
    }
    chunks.push(`    <image:image>`);
    chunks.push(`      <image:loc>${escapeXml(record.url)}</image:loc>`);
    chunks.push(`      <image:title>${escapeXml(record.alt)}</image:title>`);
    chunks.push(
      `      <image:caption>${escapeXml(record.caption)}</image:caption>`,
    );
    chunks.push(`    </image:image>`);
  }

  chunks.push(`  </url>`);
}

const batch2 = indexBySlug(JSON.parse(readFileSync(BATCH2_META, "utf8")));
const batch3 = indexBySlug(JSON.parse(readFileSync(BATCH3_META, "utf8")));

const chunks = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
  `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
];

for (let i = 0; i < BATCH2_SLUGS.length; i++) {
  appendPost(chunks, BATCH2_SLUGS[i], batch2.get(BATCH2_SLUGS[i]), batch2ScheduleDate(i));
}

for (const slug of BATCH3_SLUGS) {
  appendPost(chunks, slug, batch3.get(slug), BATCH3_DATE_MODIFIED);
}

chunks.push(`</urlset>`);
chunks.push(``);

writeFileSync(OUT_PATH, chunks.join("\n"), "utf8");
console.log(
  `Wrote ${OUT_PATH} (${BATCH2_SLUGS.length + BATCH3_SLUGS.length} posts, trailing-slash locs + lastmod).`,
);
