/**
 * Generate on-brand Phase 1 placeholder JPGs for Batch 1 + Batch 2 blog posts.
 * Phase 2 swaps pixels only — filenames and dimensions stay identical.
 *
 * Usage: node scripts/generate-blog-placeholders.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

const SLOTS = [
  { name: "hero", w: 1600, h: 1000 },
  { name: "og", w: 1200, h: 630 },
  { name: "inline-01", w: 1200, h: 900 },
  { name: "inline-02", w: 1200, h: 900 },
  { name: "inline-wide", w: 1600, h: 1000 },
];

const LINEN = "#F7F1E8";
const INK = "#1F1610";

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

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text, max) {
  const out = [];
  let line = "";
  for (const word of String(text).split(/\s+/)) {
    if ((`${line} ${word}`).trim().length > max) {
      out.push(line.trim());
      line = word;
    } else {
      line = `${line} ${word}`.trim();
    }
  }
  if (line.trim()) out.push(line.trim());
  return out.slice(0, 5);
}

function svg({ w, h, slot, slug, subject }) {
  const wrapped = wrap(subject, 46);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${LINEN}"/>
    <rect x="48" y="48" width="${w - 96}" height="${h - 96}" fill="none"
          stroke="${INK}" stroke-opacity="0.14" stroke-width="2"/>
    <text x="80" y="140" font-family="IBM Plex Mono, monospace" font-size="26"
          letter-spacing="3" fill="${INK}" fill-opacity="0.55">
      ${esc(slot.toUpperCase())} · ${w}×${h}
    </text>
    <line x1="80" y1="176" x2="${w - 80}" y2="176" stroke="${INK}" stroke-opacity="0.14" stroke-width="2"/>
    ${wrapped
      .map(
        (line, i) =>
          `<text x="80" y="${252 + i * 58}" font-family="Georgia, serif" font-size="42" fill="${INK}">${esc(line)}</text>`,
      )
      .join("\n")}
    <text x="80" y="${h - 80}" font-family="IBM Plex Mono, monospace" font-size="22"
          letter-spacing="2" fill="${INK}" fill-opacity="0.45">
      ${esc(slug)} · PHASE 1 PLACEHOLDER
    </text>
  </svg>`;
}

function parseResearchAlts(raw) {
  const alts = {};
  const patterns = [
    ["hero", /\*\*hero:\*\*\s*(.+)/i],
    ["og", /\*\*og:\*\*\s*(.+)/i],
    ["inline-01", /\*\*inline-01:\*\*\s*(.+)/i],
    ["inline-02", /\*\*inline-02:\*\*\s*(.+)/i],
    ["inline-wide", /\*\*inline-wide:\*\*\s*(.+)/i],
  ];
  for (const [key, pattern] of patterns) {
    const match = raw.match(pattern);
    if (match?.[1]) alts[key] = match[1].trim();
  }
  return alts;
}

async function buildManifest() {
  const manifest = {};
  const researchDir = path.join(ROOT, "docs", "steepwood-blog-batch2", "research");

  for (const slug of BATCH2_SLUGS) {
    const researchPath = path.join(researchDir, `RESEARCH-${slug}.md`);
    let alts = {};
    if (existsSync(researchPath)) {
      alts = parseResearchAlts(await readFile(researchPath, "utf8"));
    }
    const fallback = `SteepWood joinery article — ${slug}`;
    manifest[slug] = {
      hero: alts.hero ?? fallback,
      og: alts.og ?? alts.hero ?? fallback,
      "inline-01": alts["inline-01"] ?? `${fallback} — detail`,
      "inline-02": alts["inline-02"] ?? `${fallback} — context`,
      "inline-wide": alts["inline-wide"] ?? `${fallback} — feature`,
    };
  }

  const manifestPath = path.join(ROOT, "scripts", "blog-image-manifest.json");
  await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  return { manifest, manifestPath };
}

async function main() {
  const { manifest, manifestPath } = await buildManifest();
  let generated = 0;

  for (const [slug, slots] of Object.entries(manifest)) {
    const dir = path.join(ROOT, "public", "blog", slug);
    await mkdir(dir, { recursive: true });

    for (const s of SLOTS) {
      const subject = slots[s.name] ?? "Image pending";
      await sharp(Buffer.from(svg({ w: s.w, h: s.h, slot: s.name, slug, subject })))
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(dir, `${s.name}.jpg`));
      generated += 1;
    }
    console.log("placeholders:", slug);
  }

  console.log(`Wrote ${generated} files. Manifest: ${manifestPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
