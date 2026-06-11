import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import * as cheerio from "cheerio";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const urlsPath = join(__dirname, "seo-sample-urls.json");
const snapshotsDir = join(root, "snapshots");
const prePath = join(snapshotsDir, "headings-pre.json");
const postPath = join(snapshotsDir, "headings-post.json");

const baseUrl = (
  process.env.SNAPSHOT_BASE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

const mode = process.argv[2] ?? "compare";
const paths = JSON.parse(readFileSync(urlsPath, "utf8"));

function extractHeadings(html, path) {
  const $ = cheerio.load(html);

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

  return { path, headings };
}

async function captureAll() {
  const results = [];

  for (const path of paths) {
    const response = await fetch(`${baseUrl}${path}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${path}: HTTP ${response.status}`);
    }
    const html = await response.text();
    results.push(extractHeadings(html, path));
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
      diffs.push({ path: a.path });
    }
  }

  return diffs;
}

mkdirSync(snapshotsDir, { recursive: true });

const snapshot = await captureAll();

if (mode === "pre" || !existsSync(prePath)) {
  writeFileSync(prePath, stableStringify(snapshot));
  console.log(
    `Wrote pre-upgrade headings (${snapshot.length} URLs) → snapshots/headings-pre.json`,
  );
  process.exit(0);
}

if (mode === "post") {
  writeFileSync(postPath, stableStringify(snapshot));
  console.log(
    `Wrote post-upgrade headings (${snapshot.length} URLs) → snapshots/headings-post.json`,
  );
  process.exit(0);
}

const before = JSON.parse(readFileSync(prePath, "utf8"));
writeFileSync(postPath, stableStringify(snapshot));
const diffs = diffSnapshots(before, snapshot);

if (diffs.length === 0) {
  console.log("ZERO DIFF — heading map matches pre-upgrade baseline.");
  process.exit(0);
}

console.error(`HEADING DIFF detected on ${diffs.length} URL(s):`);
for (const diff of diffs) {
  console.error(`- ${diff.path}`);
}
process.exit(1);
