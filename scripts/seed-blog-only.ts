/**
 * Upsert blog posts only. Does not reseed services, portfolio or testimonials.
 * Usage: pnpm exec dotenv -e .env.local -- tsx scripts/seed-blog-only.ts
 */
import { PrismaClient } from "@prisma/client";

import { seedBlogPosts } from "../prisma/seedBlog";

const prisma = new PrismaClient();

async function main() {
  await seedBlogPosts(prisma);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
