import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Regenerates public/sitemap-images.xml for Batch 2 posts.
 * Page <loc> values use trailing slashes to match next.config trailingSlash.
 */

const SLUG_ORDER = [
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

const SLOT_ORDER = ["hero", "inline-01", "inline-02", "inline-wide", "og"];

const ROOT = process.cwd();
const META_PATH = path.join(
  ROOT,
  "src",
  "lib",
  "blog",
  "batch2-images",
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

function scheduleDate(dayIndex) {
  const start = new Date(Date.UTC(2026, 6, 25)); // 2026-07-25
  start.setUTCDate(start.getUTCDate() + dayIndex);
  const year = start.getUTCFullYear();
  const month = String(start.getUTCMonth() + 1).padStart(2, "0");
  const day = String(start.getUTCDate()).padStart(2, "0");
  // 07:00 Australia/Sydney (AEST, UTC+10)
  return new Date(`${year}-${month}-${day}T07:00:00+10:00`).toISOString();
}

const records = JSON.parse(readFileSync(META_PATH, "utf8"));
const bySlug = new Map();

for (const record of records) {
  if (!bySlug.has(record.slug)) {
    bySlug.set(record.slug, new Map());
  }
  bySlug.get(record.slug).set(record.slot, record);
}

const chunks = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
  `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
];

for (let i = 0; i < SLUG_ORDER.length; i++) {
  const slug = SLUG_ORDER[i];
  const slots = bySlug.get(slug);
  if (!slots) {
    throw new Error(`Missing image metadata for ${slug}`);
  }

  const lastmod = scheduleDate(i);
  chunks.push(`  <url>`);
  chunks.push(`    <loc>https://steepwood.com.au/blog/${slug}/</loc>`);
  chunks.push(`    <lastmod>${lastmod}</lastmod>`);

  for (const slot of SLOT_ORDER) {
    const record = slots.get(slot);
    if (!record) {
      throw new Error(`Missing slot ${slot} for ${slug}`);
    }
    chunks.push(`    <image:image>`);
    chunks.push(`      <image:loc>${escapeXml(record.url)}</image:loc>`);
    chunks.push(
      `      <image:title>${escapeXml(record.alt)}</image:title>`,
    );
    chunks.push(
      `      <image:caption>${escapeXml(record.caption)}</image:caption>`,
    );
    chunks.push(`    </image:image>`);
  }

  chunks.push(`  </url>`);
}

chunks.push(`</urlset>`);
chunks.push(``);

writeFileSync(OUT_PATH, chunks.join("\n"), "utf8");
console.log(`Wrote ${OUT_PATH} (${SLUG_ORDER.length} posts, trailing-slash locs + lastmod).`);
