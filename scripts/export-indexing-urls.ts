/**
 * Export every public URL for sitemap submission and Search Console indexing.
 * Run: pnpm seo:urls
 */
import { writeFileSync } from "node:fs";
import { join } from "node:path";

import { LAUNCH_PACK_SLUGS } from "../src/lib/blog/launchPack";
import { ALL_CITIES, ALL_SERVICES } from "../src/lib/seo-graph";

const BASE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://steepwood.com.au";

function canonicalPath(path: string): string {
  let normalised = path.trim();

  if (!normalised.startsWith("/")) {
    normalised = `/${normalised}`;
  }

  normalised = normalised.replace(/\/{2,}/g, "/");

  if (normalised !== "/" && !normalised.endsWith("/")) {
    normalised = `${normalised}/`;
  }

  return `${BASE}${normalised}`;
}

function buildUrlList(): string[] {
  const urls: string[] = [];

  const staticPaths = [
    "/",
    "/about/",
    "/contact/",
    "/quote/",
    "/portfolio/",
    "/blog/",
    "/search/",
    "/locations/",
    "/legal/privacy/",
    "/legal/terms/",
    "/legal/consumer-rights/",
  ];

  for (const path of staticPaths) {
    urls.push(canonicalPath(path));
  }

  for (const service of ALL_SERVICES) {
    urls.push(canonicalPath(`/${service}/`));
  }

  for (const city of ALL_CITIES) {
    urls.push(canonicalPath(`/locations/${city}/`));
  }

  for (const service of ALL_SERVICES) {
    for (const city of ALL_CITIES) {
      urls.push(canonicalPath(`/${service}/${city}/`));
    }
  }

  for (const slug of LAUNCH_PACK_SLUGS) {
    urls.push(canonicalPath(`/blog/${slug}/`));
  }

  return urls;
}

const urls = buildUrlList();
const outPath = join(process.cwd(), "scripts", "seo-indexing-urls.txt");

writeFileSync(outPath, `${urls.join("\n")}\n`, "utf8");

const comboCount = ALL_SERVICES.length * ALL_CITIES.length;

console.log(`Exported ${urls.length} URLs to scripts/seo-indexing-urls.txt`);
console.log(`  Static + hubs: ${urls.length - comboCount - LAUNCH_PACK_SLUGS.length}`);
console.log(`  Combo pages:   ${comboCount}`);
console.log(`  Blog posts:    ${LAUNCH_PACK_SLUGS.length}`);
console.log(`\nSubmit sitemap: ${BASE}/sitemap.xml`);
