/**
 * Generate on-brand Phase 1 placeholder JPGs for Batch 3 only.
 * Does not touch Batch 1 or Batch 2 image folders.
 *
 * Usage: node scripts/generate-batch3-placeholders.mjs
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

const MANIFEST_PATH = path.join(
  ROOT,
  "docs",
  "blog",
  "batch3",
  "images",
  "blog-image-manifest.json",
);

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function wrap(text, max) {
  const out = [];
  let line = "";
  for (const word of String(text).split(/\s+/)) {
    if (`${line} ${word}`.trim().length > max) {
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

async function main() {
  if (!existsSync(MANIFEST_PATH)) {
    throw new Error(`Missing Batch 3 image manifest at ${MANIFEST_PATH}`);
  }

  const manifest = JSON.parse(await readFile(MANIFEST_PATH, "utf8"));
  let generated = 0;

  for (const [slug, slots] of Object.entries(manifest)) {
    const dir = path.join(ROOT, "public", "blog", slug);
    await mkdir(dir, { recursive: true });

    for (const s of SLOTS) {
      const subject = slots[s.name] ?? "Image pending";
      await sharp(
        Buffer.from(svg({ w: s.w, h: s.h, slot: s.name, slug, subject })),
      )
        .jpeg({ quality: 82, mozjpeg: true })
        .toFile(path.join(dir, `${s.name}.jpg`));
      generated += 1;
    }
    console.log("placeholders:", slug);
  }

  const copyPath = path.join(ROOT, "scripts", "blog-image-manifest-batch3.json");
  await writeFile(copyPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Wrote ${generated} files. Manifest copy: ${copyPath}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
