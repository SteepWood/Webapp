import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/**
 * Regenerates public/sitemap-images.xml for Batch 1, Batch 2, Batch 3 and Batch 4 posts.
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

const BATCH4_SLUGS = [
  "office-fitout-parramatta",
  "kitchen-installation-lake-macquarie",
  "shop-fitout-maitland",
  "deck-builders-lake-macquarie",
  "restaurant-fitout-newcastle",
  "home-office-joinery-north-shore-sydney",
  "pharmacy-fitout-nsw",
  "warehouse-office-fitout-western-sydney",
  "kitchen-installation-maitland-hunter-valley",
  "childcare-centre-joinery-nsw",
];

const BATCH1_SLUGS = [
  "custom-kitchen-cost-nsw-2026",
  "flat-pack-vs-custom-kitchen-australia",
  "2pac-laminate-timber-veneer-kitchen-finishes-nsw",
  "walk-in-robe-built-in-wardrobe-cost-guide-nsw",
  "questions-to-ask-custom-joiner-australia",
  "benchtop-guide-engineered-stone-ban-nsw",
];

// Name fix and Batch 4 go-live edited Batch 2, 3 and 4 on this day.
const NAME_FIX_DATE = "2026-11-16";

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
const BATCH4_META = path.join(
  ROOT,
  "docs",
  "blog",
  "batch4",
  "images",
  "image-metadata.json",
);
const OUT_PATH = path.join(ROOT, "public", "sitemap-images.xml");
const BATCH1_POSTS_DIR = path.join(
  ROOT,
  "docs",
  "steepwood-blog-launch-pack",
  "steepwood-blog-pack",
  "posts",
);

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function batch1Slots(slug) {
  const raw = readFileSync(path.join(BATCH1_POSTS_DIR, `${slug}.md`), "utf8");
  const altMatch = raw.match(/hero:\s*\n\s+src:[^\n]+\n\s+alt:\s*"([^"]+)"/);
  const dateMatch = raw.match(/^date:\s*"(\d{4}-\d{2}-\d{2})"/m);
  if (!altMatch?.[1] || !dateMatch?.[1]) {
    throw new Error(`Missing hero alt or date for Batch 1 post ${slug}.`);
  }
  const alt = altMatch[1].trim();
  const labels = {
    hero: alt,
    og: alt,
    "inline-01": `${alt} — detail`,
    "inline-02": `${alt} — context`,
    "inline-wide": `${alt} — feature`,
  };
  const slots = new Map();
  for (const slot of SLOT_ORDER) {
    slots.set(slot, {
      url: `https://steepwood.com.au/blog/${slug}/${slot}.jpg`,
      alt: labels[slot],
      caption: labels[slot],
    });
  }
  return { slots, lastmod: dateMatch[1] };
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
  const lastmod = String(lastmodIso).slice(0, 10);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(lastmod)) {
    throw new Error(`Invalid lastmod for ${slug}: ${lastmodIso}`);
  }
  chunks.push(`    <lastmod>${lastmod}</lastmod>`);

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
const batch4 = indexBySlug(JSON.parse(readFileSync(BATCH4_META, "utf8")));

const chunks = [
  `<?xml version="1.0" encoding="UTF-8"?>`,
  `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"`,
  `        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">`,
];

for (const slug of BATCH1_SLUGS) {
  const batch1 = batch1Slots(slug);
  appendPost(chunks, slug, batch1.slots, batch1.lastmod);
}

for (const slug of BATCH2_SLUGS) {
  appendPost(chunks, slug, batch2.get(slug), NAME_FIX_DATE);
}

for (const slug of BATCH3_SLUGS) {
  appendPost(chunks, slug, batch3.get(slug), NAME_FIX_DATE);
}

for (const slug of BATCH4_SLUGS) {
  appendPost(chunks, slug, batch4.get(slug), NAME_FIX_DATE);
}

chunks.push(`</urlset>`);
chunks.push(``);

writeFileSync(OUT_PATH, chunks.join("\n"), "utf8");
console.log(
  `Wrote ${OUT_PATH} (${BATCH1_SLUGS.length + BATCH2_SLUGS.length + BATCH3_SLUGS.length + BATCH4_SLUGS.length} posts, trailing-slash locs + lastmod).`,
);
