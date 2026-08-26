/**
 * Import SteepWood logo pack from docs/brand/logo-pack-temp into public/brand.
 * Usage: node scripts/import-logo-pack.mjs
 */
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const packDir = join(root, "docs", "brand", "logo-pack-temp");
const brandDir = join(root, "public", "brand");
const appDir = join(root, "src", "app");
const publicDir = join(root, "public");

mkdirSync(brandDir, { recursive: true });

async function trimPng(inputPath) {
  return sharp(readFileSync(inputPath))
    .ensureAlpha()
    .trim({ threshold: 10 })
    .png({ compressionLevel: 9, adaptiveFiltering: true });
}

async function writeTrimmed(inputPath, outputPath) {
  const pipeline = await trimPng(inputPath);
  const buffer = await pipeline.toBuffer();
  const meta = await sharp(buffer).metadata();
  writeFileSync(outputPath, buffer);
  return { width: meta.width, height: meta.height, bytes: buffer.length };
}

const wordmarkLight = await writeTrimmed(
  join(packDir, "steepwood-logo-transparent.png"),
  join(brandDir, "steepwood-logo-trimmed.png"),
);

const wordmarkDark = await writeTrimmed(
  join(packDir, "steepwood-logo-white-reversed.png"),
  join(brandDir, "steepwood-logo-dark.png"),
);

const markLight = await writeTrimmed(
  join(packDir, "steepwood-icon-only.png"),
  join(brandDir, "steepwood-favicon-trimmed.png"),
);

// Light icon on dark surfaces: lift brightness while keeping wood character.
const markDarkBuffer = await sharp(readFileSync(join(packDir, "steepwood-icon-only.png")))
  .ensureAlpha()
  .modulate({ brightness: 1.35, saturation: 0.85 })
  .trim({ threshold: 10 })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toBuffer();
writeFileSync(join(brandDir, "steepwood-favicon-dark.png"), markDarkBuffer);
const markDarkMeta = await sharp(markDarkBuffer).metadata();

copyFileSync(
  join(brandDir, "steepwood-logo-trimmed.png"),
  join(brandDir, "steepwood-logo.png"),
);
copyFileSync(
  join(brandDir, "steepwood-favicon-trimmed.png"),
  join(brandDir, "steepwood-favicon.png"),
);

// Schema / OG fallback logo (full stacked mark on transparent).
copyFileSync(
  join(brandDir, "steepwood-logo-trimmed.png"),
  join(publicDir, "logo.png"),
);

const faviconSource = readFileSync(join(brandDir, "steepwood-favicon-trimmed.png"));
const appIcon = await sharp(faviconSource)
  .resize(512, 512, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

writeFileSync(join(appDir, "icon.png"), appIcon);
writeFileSync(
  join(appDir, "apple-icon.png"),
  await sharp(faviconSource)
    .resize(180, 180, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer(),
);

console.log(
  JSON.stringify(
    {
      wordmarkLight,
      wordmarkDark,
      markLight,
      markDark: {
        width: markDarkMeta.width,
        height: markDarkMeta.height,
        bytes: markDarkBuffer.length,
      },
    },
    null,
    2,
  ),
);
console.log("Logo pack import complete.");
