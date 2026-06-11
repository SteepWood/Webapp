import type { BlogPost } from "@prisma/client";

export type BlogAdminStatus = "draft" | "published" | "scheduled";

export function getBlogAdminStatus(post: BlogPost): BlogAdminStatus {
  if (!post.isPublished) {
    if (post.publishedAt && post.publishedAt > new Date()) {
      return "scheduled";
    }

    return "draft";
  }

  return "published";
}

export function toBlogFormStatus(post: BlogPost): BlogAdminStatus {
  return getBlogAdminStatus(post);
}
