import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sourceRoot = join(root, "docs", "pictures", "steepwood-p0-images");
const manifest = JSON.parse(
  readFileSync(join(sourceRoot, "manifest.json"), "utf8"),
);

const PORTFOLIO_PATTERN = /^project-(.+)-(after|before|g\d+)\.jpg$/;

function deploy(sourceRelative, deployTo) {
  const sourcePath = join(sourceRoot, sourceRelative.replace(/\//g, "\\"));
  const destPath = join(root, deployTo.replace(/\//g, "\\"));
  mkdirSync(dirname(destPath), { recursive: true });
  copyFileSync(sourcePath, destPath);
  return destPath.replace(root + "\\", "").replace(/\\/g, "/");
}

let count = 0;

for (const asset of manifest.assets) {
  if (asset.priority !== "P0") continue;
  if (asset.deployTo.startsWith("cms:")) continue;

  deploy(asset.source, asset.deployTo);
  count++;
}

for (const file of [
  "project-floating-vanity-byron-bay-after.jpg",
  "project-floating-vanity-byron-bay-before.jpg",
  "project-floating-vanity-byron-bay-g01.jpg",
  "project-floating-vanity-byron-bay-g02.jpg",
  "project-floating-vanity-byron-bay-g03.jpg",
  "project-floating-vanity-byron-bay-g04.jpg",
  "project-floating-vanity-byron-bay-g05.jpg",
  "project-hamptons-kitchen-newcastle-after.jpg",
  "project-hamptons-kitchen-newcastle-before.jpg",
  "project-hamptons-kitchen-newcastle-g01.jpg",
  "project-hamptons-kitchen-newcastle-g02.jpg",
  "project-hamptons-kitchen-newcastle-g03.jpg",
  "project-hamptons-kitchen-newcastle-g04.jpg",
  "project-hamptons-kitchen-newcastle-g05.jpg",
  "project-walk-in-robe-sydney-after.jpg",
  "project-walk-in-robe-sydney-before.jpg",
  "project-walk-in-robe-sydney-g01.jpg",
  "project-walk-in-robe-sydney-g02.jpg",
  "project-walk-in-robe-sydney-g03.jpg",
  "project-walk-in-robe-sydney-g04.jpg",
  "project-walk-in-robe-sydney-g05.jpg",
]) {
  const match = file.match(PORTFOLIO_PATTERN);
  if (!match) continue;

  const [, slug, variant] = match;
  deploy(`04-portfolio/${file}`, `public/images/portfolio/${slug}/${variant}.jpg`);
  count++;
}

console.log(`Deployed ${count} P0 images to public/`);
