import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const brandDir = join(__dirname, "..", "public", "brand");
const appDir = join(__dirname, "..", "src", "app");
const docsDir = join(__dirname, "..", "docs");
const desktopDir = join(__dirname, "..", "..");
const assetsDir =
  "C:/Users/afzal/.cursor/projects/c-Users-afzal-OneDrive-Desktop-STEEPwood-Logo-steepwood-webapp/assets";

const WORDMARK_CANDIDATES = [
  join(docsDir, "steepwood_FINAL_black - Edited.png"),
  join(desktopDir, "steepwood_FINAL_black.png"),
  join(
    assetsDir,
    "c__Users_afzal_AppData_Roaming_Cursor_User_workspaceStorage_cd9c905b740818b165f7578538729800_images_steepwood_FINAL_black-8f2a5b34-e82a-49f5-87f5-3b78cdf1b549.png",
  ),
  join(
    assetsDir,
    "c__Users_afzal_AppData_Roaming_Cursor_User_workspaceStorage_cd9c905b740818b165f7578538729800_images_steepwood_FINAL_black_-_Edited-f6bef355-635a-4319-b059-58929225374e.png",
  ),
];

const MARK_CANDIDATES = [
  join(desktopDir, "steepwood_favicon_FINAL_v2.png"),
  join(assetsDir, "c__Users_afzal_AppData_Roaming_Cursor_User_workspaceStorage_cd9c905b740818b165f7578538729800_images_steepwood_favicon_FINAL_v2-2d2a9df7-6c4f-4609-b27b-35b8c48339b5.png"),
];

const LIGHT_BG_THRESHOLD = 235;

function readSource(filePath) {
  return readFileSync(filePath);
}

async function hasTransparentBackground(buffer) {
  const { data, info } = await sharp(buffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let transparent = 0;
  let opaque = 0;

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) {
      transparent++;
    } else {
      opaque++;
    }
  }

  const total = info.width * info.height;
  return transparent / total > 0.5 && opaque > 1000;
}

async function isUsableWordmark(buffer) {
  if (await hasTransparentBackground(buffer)) {
    return true;
  }

  const stats = await sharp(buffer).stats();
  const mean =
    (stats.channels[0].mean +
      stats.channels[1].mean +
      stats.channels[2].mean) /
    3;
  return mean > 80;
}

async function prepareWordmark(buffer) {
  if (await hasTransparentBackground(buffer)) {
    return sharp(buffer)
      .ensureAlpha()
      .png({ compressionLevel: 9, adaptiveFiltering: true });
  }

  return removeLightBackground(buffer);
}

async function pickWordmarkSource() {
  for (const filePath of WORDMARK_CANDIDATES) {
    try {
      const buffer = readSource(filePath);
      if (await isUsableWordmark(buffer)) {
        console.log(`Using wordmark source: ${filePath}`);
        return buffer;
      }
      console.warn(`Skipping unusable wordmark source: ${filePath}`);
    } catch {
      console.warn(`Skipping missing wordmark source: ${filePath}`);
    }
  }

  throw new Error("No usable wordmark source found.");
}

async function pickMarkSource() {
  for (const filePath of MARK_CANDIDATES) {
    try {
      const buffer = readSource(filePath);
      console.log(`Using mark source: ${filePath}`);
      return buffer;
    } catch {
      console.warn(`Skipping missing mark source: ${filePath}`);
    }
  }

  throw new Error("No mark source found.");
}

async function removeLightBackground(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    if (
      red >= LIGHT_BG_THRESHOLD &&
      green >= LIGHT_BG_THRESHOLD &&
      blue >= LIGHT_BG_THRESHOLD
    ) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  }).png({ compressionLevel: 9, adaptiveFiltering: true });
}

async function removeCreamBackground(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    const red = data[i];
    const green = data[i + 1];
    const blue = data[i + 2];

    const isCream =
      red >= 230 &&
      green >= 225 &&
      blue >= 215 &&
      Math.abs(red - green) < 25 &&
      Math.abs(green - blue) < 30;

    if (isCream) {
      data[i + 3] = 0;
    }
  }

  return sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  }).png({ compressionLevel: 9, adaptiveFiltering: true });
}

async function createDarkVariant(inputBuffer) {
  const { data, info } = await sharp(inputBuffer)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] > 0) {
      data[i] = 255;
      data[i + 1] = 255;
      data[i + 2] = 255;
    }
  }

  return sharp(data, {
    raw: {
      width: info.width,
      height: info.height,
      channels: 4,
    },
  }).png({ compressionLevel: 9, adaptiveFiltering: true });
}

async function createInvertedVariant(inputBuffer) {
  return sharp(inputBuffer)
    .ensureAlpha()
    .negate({ alpha: false })
    .png({ compressionLevel: 9, adaptiveFiltering: true });
}

async function trimTransparent(input) {
  const buffer = Buffer.isBuffer(input) ? input : await input.toBuffer();
  return sharp(buffer).trim({ threshold: 12 }).png();
}

async function writeBrandAsset(input, outputName) {
  const trimmed = await trimTransparent(input);
  const meta = await trimmed.metadata();
  writeFileSync(join(brandDir, outputName), await trimmed.toBuffer());
  return meta;
}

mkdirSync(brandDir, { recursive: true });

const wordmarkBuffer = await pickWordmarkSource();
const markBuffer = await pickMarkSource();

const wordmarkLight = await prepareWordmark(wordmarkBuffer);
const markLight = await removeCreamBackground(markBuffer);

const wordmarkMeta = await writeBrandAsset(
  wordmarkLight,
  "steepwood-logo-trimmed.png",
);
const markMeta = await writeBrandAsset(markLight, "steepwood-favicon-trimmed.png");

await writeBrandAsset(
  await createDarkVariant(await wordmarkLight.toBuffer()),
  "steepwood-logo-dark.png",
);
await writeBrandAsset(
  await createInvertedVariant(await markLight.toBuffer()),
  "steepwood-favicon-dark.png",
);

writeFileSync(
  join(brandDir, "steepwood-logo.png"),
  await wordmarkLight.png().toBuffer(),
);
writeFileSync(
  join(brandDir, "steepwood-favicon.png"),
  await markLight.png().toBuffer(),
);

const iconBuffer = await sharp(await markLight.toBuffer())
  .resize(512, 512, {
    fit: "contain",
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })
  .png()
  .toBuffer();

writeFileSync(join(appDir, "icon.png"), iconBuffer);
writeFileSync(
  join(appDir, "apple-icon.png"),
  await sharp(iconBuffer)
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
      wordmark: { width: wordmarkMeta.width, height: wordmarkMeta.height },
      mark: { width: markMeta.width, height: markMeta.height },
    },
    null,
    2,
  ),
);
console.log("Brand logo import complete.");
