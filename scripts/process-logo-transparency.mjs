import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const brandDir = join(__dirname, "..", "public", "brand");

const FILES = [
  "steepwood-logo.png",
  "steepwood-logo-trimmed.png",
  "steepwood-favicon.png",
  "steepwood-favicon-trimmed.png",
];

const WHITE_THRESHOLD = 245;

async function removeWhiteBackground(fileName) {
  const inputPath = join(brandDir, fileName);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    if (
      red >= WHITE_THRESHOLD &&
      green >= WHITE_THRESHOLD &&
      blue >= WHITE_THRESHOLD
    ) {
      data[i + 3] = 0;
    }
  }

  const output = await sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();

  writeFileSync(inputPath, output);
  console.log(`Processed ${fileName}`);
}

for (const fileName of FILES) {
  await removeWhiteBackground(fileName);
}

console.log("Logo transparency complete.");
