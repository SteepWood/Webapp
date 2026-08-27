import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

/** Batch 2 publish order — must match BATCH2_BLOG_SLUGS in launchPack.ts */
const SLUGS = [
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

const POSTS_DIR = path.join(
  process.cwd(),
  "docs",
  "steepwood-blog-batch2",
  "posts",
);

/** 30 consecutive days: 25 Aug 2026 → 23 Sep 2026 (Australia/Sydney calendar dates). */
function scheduleDate(dayIndex) {
  const start = new Date(Date.UTC(2026, 7, 25)); // 2026-08-25
  start.setUTCDate(start.getUTCDate() + dayIndex);
  const year = start.getUTCFullYear();
  const month = String(start.getUTCMonth() + 1).padStart(2, "0");
  const day = String(start.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

for (let i = 0; i < SLUGS.length; i++) {
  const slug = SLUGS[i];
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  const date = scheduleDate(i);
  let content = readFileSync(filePath, "utf8");

  if (!content.match(/^date:\s/m)) {
    throw new Error(`Missing date frontmatter in ${slug}`);
  }

  content = content.replace(/^date:\s*"[^"]+"/m, `date: "${date}"`);
  writeFileSync(filePath, content, "utf8");
  console.log(`${slug} → ${date}`);
}

console.log(`\nUpdated ${SLUGS.length} Batch 2 posts (${scheduleDate(0)} … ${scheduleDate(29)}).`);
