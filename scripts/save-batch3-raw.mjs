/**
 * Copy a generated asset into the Batch 3 raw staging folder.
 * Usage: node scripts/save-batch3-raw.mjs <n> <slug> <slot> <sourcePath>
 */
import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const [n, slug, slot, sourcePath] = process.argv.slice(2);
if (!n || !slug || !slot || !sourcePath) {
  console.error(
    "Usage: node scripts/save-batch3-raw.mjs <n> <slug> <slot> <sourcePath>",
  );
  process.exit(1);
}
if (!existsSync(sourcePath)) {
  console.error("Source missing:", sourcePath);
  process.exit(1);
}

const rawDir = path.join(
  process.cwd(),
  "docs",
  "blog",
  "batch3",
  "images",
  "raw",
);
mkdirSync(rawDir, { recursive: true });
const ext = path.extname(sourcePath) || ".jpg";
const dest = path.join(
  rawDir,
  `${String(n).padStart(3, "0")}-${slug}-${slot}${ext}`,
);
copyFileSync(sourcePath, dest);
console.log(dest);
