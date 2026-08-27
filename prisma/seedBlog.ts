import type { PrismaClient } from "@prisma/client";

import {
  ALL_SEEDED_BLOG_SLUGS,
  RETIRED_BLOG_SLUGS,
  encodeFaqTag,
  encodeImageAltTag,
  encodeLocationFocusTags,
  loadLaunchPackPosts,
} from "../src/lib/blog/launchPack";
import { blogPostCoverPath } from "../src/lib/images";

const RELATED_TAG_PREFIX = "related:";

function encodeRelatedPostTags(slugs: string[]): string[] {
  return slugs.map((slug) => `${RELATED_TAG_PREFIX}${slug}`);
}

export async function seedBlogPosts(prisma: PrismaClient): Promise<void> {
  const posts = loadLaunchPackPosts();

  await prisma.blogPost.deleteMany({
    where: {
      slug: { in: [...RETIRED_BLOG_SLUGS] },
    },
  });

  for (const post of posts) {
    const faqTag = encodeFaqTag(post.faq);
    const imageAltTag = encodeImageAltTag(post.imageAlts);
    const tags = [
      ...post.tags,
      ...encodeRelatedPostTags(post.relatedPosts),
      ...encodeLocationFocusTags(post.locationFocus),
      imageAltTag,
      ...(faqTag ? [faqTag] : []),
    ];

    // Batch 2: staggered publish dates from frontmatter (25 Aug – 23 Sep 2026).
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        coverImageUrl: blogPostCoverPath(post.slug),
        coverImageAlt: post.coverImageAlt,
        authorName: post.authorName,
        category: post.category,
        tags,
        isPublished: true,
        publishedAt: post.publishedAt,
      },
      create: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        metaTitle: post.metaTitle,
        metaDescription: post.metaDescription,
        coverImageUrl: blogPostCoverPath(post.slug),
        coverImageAlt: post.coverImageAlt,
        authorName: post.authorName,
        category: post.category,
        tags,
        isPublished: true,
        publishedAt: post.publishedAt,
      },
    });
  }

  const unpublished = await prisma.blogPost.updateMany({
    where: {
      slug: { notIn: [...ALL_SEEDED_BLOG_SLUGS] },
      isPublished: true,
    },
    data: { isPublished: false },
  });

  if (unpublished.count > 0) {
    console.log(`  unpublished ${unpublished.count} legacy blog post(s)`);
  }

  console.log(`  upserted ${posts.length} blog post(s) — all published`);
}

export { RELATED_TAG_PREFIX };
