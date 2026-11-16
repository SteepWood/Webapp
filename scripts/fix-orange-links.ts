/**
 * Fix internal links that 404: Orange uses the `orange` slug, and leftover
 * `%s` placeholders are plain prices with no destination.
 */
import { PrismaClient } from "@prisma/client";

const REPLACEMENTS: Array<[string, string]> = [
  ["/home-office-joinery/orange-nsw", "/home-office-joinery/orange"],
  ["/staircase-joinery/orange-nsw", "/staircase-joinery/orange"],
];

function replacePaths(value: string): string {
  let next = value;
  for (const [from, to] of REPLACEMENTS) {
    next = next.replaceAll(from, to);
  }
  return next
    .replaceAll("[$45,000](%s)", "$45,000")
    .replaceAll("[$18,000 to $40,000 or more](%s)", "$18,000 to $40,000 or more");
}

const prisma = new PrismaClient();

async function main() {
  const posts = await prisma.blogPost.findMany({
    where: {
      OR: [
        { content: { contains: "orange-nsw" } },
        { excerpt: { contains: "orange-nsw" } },
        { content: { contains: "](%s)" } },
      ],
    },
    select: { id: true, slug: true, content: true, excerpt: true },
  });

  let updated = 0;
  for (const post of posts) {
    const content = post.content ? replacePaths(post.content) : post.content;
    const excerpt = post.excerpt ? replacePaths(post.excerpt) : post.excerpt;
    if (content === post.content && excerpt === post.excerpt) continue;
    await prisma.blogPost.update({
      where: { id: post.id },
      data: {
        ...(content !== post.content ? { content } : {}),
        ...(excerpt !== post.excerpt ? { excerpt } : {}),
      },
    });
    updated += 1;
    console.log(`Updated ${post.slug}`);
  }

  console.log(`Posts updated: ${updated} (matched ${posts.length}).`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
