/**
 * Audit Batch 2 internal links: forward Batch 2 links, unknown location hubs, MDX hazards.
 * Usage: pnpm exec tsx scripts/audit-batch2-blog-links.ts
 */
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

import { parse as parseYaml } from "yaml";

import {
  BATCH2_BLOG_SLUGS,
  LAUNCH_PACK_SLUGS,
} from "../src/lib/blog/launchPack";

const POSTS_DIR = path.join(
  process.cwd(),
  "docs",
  "steepwood-blog-batch2",
  "posts",
);

const LIVE_LOCATION_SLUGS = new Set([
  "newcastle",
  "sydney",
  "canberra",
  "melbourne",
  "central-coast",
  "hunter-valley",
  "gold-coast",
  "wollongong",
  "brisbane",
  "perth",
  "byron-bay",
  "port-macquarie",
  "coffs-harbour",
  "adelaide",
  "bathurst",
  "orange",
]);

const SERVICE_SLUGS = new Set([
  "custom-kitchen-joinery",
  "built-in-wardrobes",
  "office-fitout",
  "shopfitting",
  "custom-bathroom-vanity",
  "commercial-joinery",
  "custom-furniture",
  "home-office-joinery",
  "laundry-cabinets",
  "staircase-joinery",
]);

const ALLOWED_STATIC = new Set([
  "/quote",
  "/contact",
  "/about",
  "/portfolio",
  "/blog",
  "/locations",
  "/legal/privacy",
  "/legal/terms",
  "/legal/consumer-rights",
  "/search",
]);

type Frontmatter = {
  slug: string;
  date: string;
};

function extractLinks(markdown: string): string[] {
  const links: string[] = [];
  const pattern = /\]\((\/[^)#\s]+)(?:#[^)]*)?\)/g;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(markdown)) !== null) {
    links.push(match[1] ?? "");
  }

  return links;
}

function main() {
  const publishOrder = new Map<string, number>();
  BATCH2_BLOG_SLUGS.forEach((slug, index) => publishOrder.set(slug, index));

  const batch1 = new Set<string>(LAUNCH_PACK_SLUGS);
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const file of readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))) {
    const raw = readFileSync(path.join(POSTS_DIR, file), "utf8");
    const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
    if (!fmMatch) {
      errors.push(`${file}: missing frontmatter`);
      continue;
    }

    const data = parseYaml(fmMatch[1] ?? "") as Frontmatter;
    const slug = data.slug;
    const ownIndex = publishOrder.get(slug) ?? -1;
    const body = raw.slice(fmMatch[0].length);

    if (/<[0-9]/.test(body)) {
      errors.push(`${slug}: raw <digit MDX hazard`);
    }

    for (const href of extractLinks(body)) {
      const clean = href.replace(/\/$/, "");

      if (clean.startsWith("/blog/")) {
        const target = clean.slice("/blog/".length);
        if (batch1.has(target)) continue;
        const targetIndex = publishOrder.get(target);
        if (targetIndex === undefined) {
          errors.push(`${slug}: unknown blog link ${href}`);
        } else if (targetIndex >= ownIndex) {
          errors.push(
            `${slug}: forward/same-day Batch 2 link to ${target} (forbidden until day-31 backfill)`,
          );
        }
        continue;
      }

      if (clean.startsWith("/locations/")) {
        const loc = clean.slice("/locations/".length);
        if (!LIVE_LOCATION_SLUGS.has(loc)) {
          errors.push(`${slug}: non-live location hub ${href}`);
        }
        continue;
      }

      if (clean.startsWith("/portfolio/")) continue;

      const first = clean.slice(1).split("/")[0] ?? "";
      if (SERVICE_SLUGS.has(first)) continue;
      if (ALLOWED_STATIC.has(clean)) continue;

      if (clean.startsWith("/")) {
        warnings.push(`${slug}: uncommon internal link ${href}`);
      }
    }
  }

  console.log(`Checked ${BATCH2_BLOG_SLUGS.length} Batch 2 posts`);
  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const error of errors) console.log(`  - ${error}`);
  } else {
    console.log("No hard link errors.");
  }
  if (warnings.length) {
    console.log(`\nWARNINGS (${warnings.length}):`);
    for (const warning of warnings.slice(0, 40)) console.log(`  - ${warning}`);
  }

  if (errors.length) process.exit(1);
}

main();
