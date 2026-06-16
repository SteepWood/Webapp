/**
 * Uploads manifest cms: assets to Supabase cms-media bucket.
 * Requires .env.local with SUPABASE_SERVICE_ROLE_KEY and NEXT_PUBLIC_SUPABASE_URL.
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnvFile(path) {
  if (!existsSync(path)) return;

  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    value = value.replace(/^["']|["']$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(join(root, ".env.local"));

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local",
  );
  process.exit(1);
}

const manifest = JSON.parse(
  readFileSync(join(root, "docs", "pictures", "manifest.json"), "utf8"),
);

const SOURCE_ROOT = join(root, "docs", "pictures", "steepwood-p0-images");
const CMS_BUCKET = "cms-media";
const PORTFOLIO_PATTERN = /^project-(.+)-(after|before|g\d+)\.jpg$/;

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

async function ensureCmsBucket() {
  const { data: buckets, error: listError } = await supabase.storage.listBuckets();
  if (listError) {
    throw new Error(`Could not list storage buckets: ${listError.message}`);
  }

  if (buckets?.some((bucket) => bucket.name === CMS_BUCKET)) {
    return;
  }

  const { error: createError } = await supabase.storage.createBucket(CMS_BUCKET, {
    public: true,
    fileSizeLimit: 10 * 1024 * 1024,
    allowedMimeTypes: ["image/jpeg", "image/png", "image/webp"],
  });

  if (createError) {
    throw new Error(
      `Bucket "${CMS_BUCKET}" not found and could not be created: ${createError.message}`,
    );
  }

  console.log(`Created Supabase bucket: ${CMS_BUCKET}`);
}

async function uploadJpeg(storagePath, filePath) {
  const body = readFileSync(filePath);
  const { error } = await supabase.storage.from(CMS_BUCKET).upload(storagePath, body, {
    contentType: "image/jpeg",
    upsert: true,
  });

  if (error) {
    throw new Error(`${storagePath}: ${error.message}`);
  }

  const publicUrl = `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${CMS_BUCKET}/${storagePath}`;
  return publicUrl;
}

let uploaded = 0;

await ensureCmsBucket();

for (const asset of manifest.assets) {
  if (!asset.deployTo?.startsWith("cms:")) continue;

  const sourcePath = join(SOURCE_ROOT, asset.source.replace(/\//g, "\\"));
  if (!existsSync(sourcePath)) {
    console.warn(`Skip missing source: ${asset.source}`);
    continue;
  }

  const storagePath = asset.deployTo.replace(/^cms:/, "");
  const url = await uploadJpeg(storagePath, sourcePath);
  console.log(`✓ ${storagePath}`);
  console.log(`  ${url}`);
  uploaded++;
}

const { projects, countPerProject } = manifest.portfolioGalleryPattern;

for (const slug of projects) {
  for (let index = 1; index <= countPerProject; index += 1) {
    const id = String(index).padStart(2, "0");
    const file = `project-${slug}-g${id}.jpg`;
    const sourcePath = join(SOURCE_ROOT, "04-portfolio", file);
    if (!existsSync(sourcePath)) {
      console.warn(`Skip missing gallery source: 04-portfolio/${file}`);
      continue;
    }

    const storagePath = `portfolio/${slug}/gallery/g${id}.jpg`;
    const url = await uploadJpeg(storagePath, sourcePath);
    console.log(`✓ ${storagePath}`);
    console.log(`  ${url}`);
    uploaded++;
  }
}

console.log(`\nUploaded ${uploaded} image(s) to Supabase ${CMS_BUCKET}`);
