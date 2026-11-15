/**
 * Snapshot BlogPost.updatedAt, then after a blog seed restore untouched
 * posts and set edited / Batch 4 posts to the go-live timestamp.
 *
 * Usage:
 *   pnpm exec dotenv -e .env.local -- tsx scripts/apply-blog-datemodified.ts snapshot
 *   pnpm exec dotenv -e .env.local -- tsx scripts/apply-blog-datemodified.ts apply
 */
import { writeFileSync, readFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";

import { PrismaClient } from "@prisma/client";

import {
  BATCH2_BLOG_SLUGS,
  BATCH3_BLOG_SLUGS,
  BATCH4_BLOG_SLUGS,
} from "../src/lib/blog/launchPackShared";

const SNAPSHOT_PATH = path.join(os.tmpdir(), "steepwood-blog-updated-at.json");
const DATE_MODIFIED = new Date("2026-11-16T07:00:00+11:00");

const EDITED_SLUGS = [
  ...BATCH2_BLOG_SLUGS,
  ...BATCH3_BLOG_SLUGS,
  ...BATCH4_BLOG_SLUGS,
];

const prisma = new PrismaClient();
const mode = process.argv[2];

async function main() {
  if (mode === "snapshot") {
    const rows = await prisma.blogPost.findMany({
      select: { slug: true, updatedAt: true },
    });
    writeFileSync(
      SNAPSHOT_PATH,
      JSON.stringify(
        rows.map((row) => ({
          slug: row.slug,
          updatedAt: row.updatedAt.toISOString(),
        })),
      ),
    );
    console.log(`Snapshotted ${rows.length} posts to ${SNAPSHOT_PATH}`);
  } else if (mode === "apply") {
    const snapshot = JSON.parse(readFileSync(SNAPSHOT_PATH, "utf8")) as Array<{
      slug: string;
      updatedAt: string;
    }>;
    const edited = new Set<string>(EDITED_SLUGS);

    const bumped = await prisma.$executeRaw`
      UPDATE blog_posts
      SET updated_at = ${DATE_MODIFIED}
      WHERE slug = ANY(${EDITED_SLUGS})
    `;
    console.log(`Set dateModified on ${bumped} edited posts.`);

    let restored = 0;
    for (const row of snapshot) {
      if (edited.has(row.slug)) continue;
      await prisma.$executeRaw`
        UPDATE blog_posts
        SET updated_at = ${new Date(row.updatedAt)}
        WHERE slug = ${row.slug}
      `;
      restored += 1;
    }
    console.log(`Restored updatedAt on ${restored} untouched posts.`);

    const sample = await prisma.blogPost.findUnique({
      where: { slug: "childcare-centre-joinery-nsw" },
      select: { publishedAt: true, updatedAt: true },
    });
    const older = await prisma.blogPost.findUnique({
      where: { slug: "custom-kitchen-cost-nsw-2026" },
      select: { updatedAt: true },
    });
    console.log("batch4 sample", sample);
    console.log("batch1 sample", older);
  } else {
    throw new Error("Usage: snapshot | apply");
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
