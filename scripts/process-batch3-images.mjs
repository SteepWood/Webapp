/**
 * Crop, compress, tag and install Batch 3 blog images.
 * Reads raw files from docs/blog/batch3/images/raw/{NNN}-{slug}-{slot}.*
 * Writes final JPEGs to public/blog/{slug}/{slot}.jpg
 */
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";
import { exiftool } from "exiftool-vendored";

const ROOT = process.cwd();
const RAW_DIR = path.join(ROOT, "docs", "blog", "batch3", "images", "raw");
const META_PATH = path.join(
  ROOT,
  "docs",
  "blog",
  "batch3",
  "images",
  "image-metadata.json",
);
const PUBLIC_BLOG = path.join(ROOT, "public", "blog");
const REPORT_PATH = path.join(
  ROOT,
  "docs",
  "blog",
  "batch3",
  "images",
  "phase2-process-report.json",
);

const meta = JSON.parse(readFileSync(META_PATH, "utf8"));

/** @param {string} slot */
function targetSpec(slot) {
  if (slot === "hero" || slot === "inline-wide") {
    return { outW: 1600, outH: 1000, maxKb: 400 };
  }
  if (slot === "og") {
    return { outW: 1200, outH: 630, maxKb: 250 };
  }
  return { outW: 1200, outH: 900, maxKb: 250 };
}

async function toFinalJpeg(inputBuf, outW, outH, maxKb) {
  let quality = 84;
  let out = await sharp(inputBuf, { failOn: "none" })
    .rotate()
    .resize(outW, outH, { fit: "cover", position: "centre" })
    .jpeg({
      quality,
      progressive: true,
      chromaSubsampling: "4:2:0",
      mozjpeg: true,
    })
    .toBuffer();

  while (out.length > maxKb * 1024 && quality > 60) {
    quality -= 4;
    out = await sharp(inputBuf, { failOn: "none" })
      .rotate()
      .resize(outW, outH, { fit: "cover", position: "centre" })
      .jpeg({
        quality,
        progressive: true,
        chromaSubsampling: "4:2:0",
        mozjpeg: true,
      })
      .toBuffer();
  }
  return { buf: out, quality };
}

async function writeTags(filePath, record) {
  await exiftool.write(filePath, {}, ["-all=", "-overwrite_original"]);
  await exiftool.write(
    filePath,
    {
      Title: record.title_attr,
      ImageDescription: record.description,
      Description: record.description,
      Caption: record.caption,
      "Caption-Abstract": record.caption,
      Artist: record.creator,
      Creator: record.creator,
      Credit: record.credit,
      Copyright: record.copyright,
      CopyrightNotice: record.copyright,
      Keywords: record.keywords,
      City: record.city,
      "Province-State": record.state,
      "Country-PrimaryLocationName": record.country,
      DigitalSourceType:
        "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia",
    },
    ["-overwrite_original"],
  );
}

function findRaw(n, slug, slot) {
  if (!existsSync(RAW_DIR)) return null;
  const candidates = [
    `${String(n).padStart(3, "0")}-${slug}-${slot}`,
    `${slug}-${slot}`,
  ];
  const files = readdirSync(RAW_DIR);
  for (const c of candidates) {
    const match = files.find(
      (f) =>
        f === `${c}.jpg` ||
        f === `${c}.jpeg` ||
        f === `${c}.png` ||
        f === `${c}.webp` ||
        f.startsWith(`${c}.`),
    );
    if (match) return path.join(RAW_DIR, match);
  }
  return null;
}

const only = process.argv
  .slice(2)
  .filter((a) => a.startsWith("--slug="))
  .map((a) => a.slice(7));

const report = [];

for (const record of meta) {
  if (only.length && !only.includes(record.slug)) continue;
  const rawPath = findRaw(record.n, record.slug, record.slot);
  if (!rawPath) {
    report.push({
      n: record.n,
      slug: record.slug,
      slot: record.slot,
      status: "missing-raw",
    });
    continue;
  }

  const spec = targetSpec(record.slot);
  const inputBuf = readFileSync(rawPath);
  const { buf: finalBuf, quality } = await toFinalJpeg(
    inputBuf,
    spec.outW,
    spec.outH,
    spec.maxKb,
  );

  const outDir = path.join(PUBLIC_BLOG, record.slug);
  mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, record.file);
  writeFileSync(outPath, finalBuf);

  try {
    await writeTags(outPath, record);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.warn(`tag failed ${record.slug}/${record.slot}:`, message);
  }

  const sizeKb = Math.round(finalBuf.length / 1024);
  const dim = await sharp(outPath).metadata();
  report.push({
    n: record.n,
    slug: record.slug,
    slot: record.slot,
    status: "ok",
    bytes: finalBuf.length,
    sizeKb,
    quality,
    width: dim.width,
    height: dim.height,
    raw: path.basename(rawPath),
  });
  console.log(
    `OK ${String(record.n).padStart(3, "0")} ${record.slug}/${record.slot} ${dim.width}x${dim.height} ${sizeKb}KB q${quality}`,
  );
}

writeFileSync(REPORT_PATH, JSON.stringify(report, null, 2));
await exiftool.end();

const ok = report.filter((r) => r.status === "ok").length;
const missing = report.filter((r) => r.status === "missing-raw").length;
console.log(
  `\nDone: ${ok} installed, ${missing} missing raw. Report: ${REPORT_PATH}`,
);
