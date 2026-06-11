import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import * as cheerio from "cheerio";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const urlsPath = join(__dirname, "seo-sample-urls.json");
const snapshotsDir = join(root, "snapshots");
const prePath = join(snapshotsDir, "seo-pre.json");
const postPath = join(snapshotsDir, "seo-post.json");

const baseUrl = (
  process.env.SNAPSHOT_BASE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

const mode = process.argv[2] ?? "compare";
const paths = JSON.parse(readFileSync(urlsPath, "utf8"));

function extractSeo(html, path) {
  const $ = cheerio.load(html);

  const title = $("title").first().text().trim();
  const metas = $("meta")
    .toArray()
    .map((el) => {
      const name = $(el).attr("name");
      const property = $(el).attr("property");
      const content = $(el).attr("content") ?? "";
      const key = name ?? property ?? "";
      return key ? { key, content } : null;
    })
    .filter(Boolean)
    .sort((a, b) => a.key.localeCompare(b.key));

  const links = $('link[rel="canonical"], link[rel="alternate"]')
    .toArray()
    .map((el) => ({
      rel: $(el).attr("rel") ?? "",
      href: $(el).attr("href") ?? "",
      hreflang: $(el).attr("hreflang") ?? "",
    }))
    .sort((a, b) => `${a.rel}:${a.href}`.localeCompare(`${b.rel}:${b.href}`));

  const jsonLd = $('script[type="application/ld+json"]')
    .toArray()
    .map((el) => $(el).html()?.trim() ?? "")
    .filter(Boolean);

  const headings = ["h1", "h2", "h3"]
    .flatMap((tag) =>
      $(tag)
        .toArray()
        .map((el) => ({
          tag,
          text: $(el).text().replace(/\s+/g, " ").trim(),
        })),
    )
    .filter((item) => item.text.length > 0);

  return { path, title, metas, links, jsonLd, headings };
}

async function captureAll() {
  const results = [];

  for (const path of paths) {
    const response = await fetch(`${baseUrl}${path}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: HTTP ${response.status}`);
    }
    const html = await response.text();
    results.push(extractSeo(html, path));
  }

  return results;
}

function stableStringify(value) {
  return JSON.stringify(value, null, 2);
}

function diffSnapshots(before, after) {
  const diffs = [];

  for (let i = 0; i < before.length; i += 1) {
    const a = before[i];
    const b = after[i];

    if (stableStringify(a) !== stableStringify(b)) {
      diffs.push({ path: a.path, before: a, after: b });
    }
  }

  return diffs;
}

mkdirSync(snapshotsDir, { recursive: true });

const snapshot = await captureAll();

if (mode === "pre" || !existsSync(prePath)) {
  writeFileSync(prePath, stableStringify(snapshot));
  console.log(`Wrote pre-upgrade snapshot (${snapshot.length} URLs) → snapshots/seo-pre.json`);
  process.exit(0);
}

if (mode === "post") {
  writeFileSync(postPath, stableStringify(snapshot));
  console.log(`Wrote post-upgrade snapshot (${snapshot.length} URLs) → snapshots/seo-post.json`);
  process.exit(0);
}

const before = JSON.parse(readFileSync(prePath, "utf8"));
writeFileSync(postPath, stableStringify(snapshot));
const diffs = diffSnapshots(before, snapshot);

if (diffs.length === 0) {
  console.log("ZERO DIFF — SEO snapshot matches pre-upgrade baseline.");
  process.exit(0);
}

console.error(`SEO DIFF detected on ${diffs.length} URL(s):`);
for (const diff of diffs) {
  console.error(`- ${diff.path}`);
}
process.exit(1);
