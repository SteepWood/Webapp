import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const brandDir = join(__dirname, "..", "public", "brand");

const PAIRS = [
  ["steepwood-logo-trimmed.png", "steepwood-logo-dark.png"],
  ["steepwood-favicon-trimmed.png", "steepwood-favicon-dark.png"],
];

async function createLightVariant(inputName, outputName) {
  const inputPath = join(brandDir, inputName);
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const alpha = data[i + 3];
    if (alpha > 0) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
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

  writeFileSync(join(brandDir, outputName), output);
  console.log(`Created ${outputName}`);
}

for (const [input, output] of PAIRS) {
  await createLightVariant(input, output);
}

console.log("Dark-surface logo variants complete.");
