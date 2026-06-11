"use server";

import { revalidateAdminSection, revalidateBlogPaths } from "@/lib/admin/revalidate";
import { requireAdminAction } from "@/lib/auth/admin-action";
import { prisma } from "@/lib/db/prisma";
import { blogPostFormSchema } from "@/lib/validations/admin/blog";

import type { AdminMutationResult } from "./quotes";

function resolveBlogPublishState(input: {
  status: "draft" | "published" | "scheduled";
  publishedAt?: string;
}) {
  if (input.status === "draft") {
    return { isPublished: false, publishedAt: null as Date | null };
  }

  const publishedAt = input.publishedAt
    ? new Date(input.publishedAt)
    : new Date();

  if (input.status === "scheduled") {
    return { isPublished: false, publishedAt };
  }

  return { isPublished: true, publishedAt };
}

export async function saveBlogPost(
  input: unknown,
): Promise<AdminMutationResult & { id?: string }> {
  const auth = await requireAdminAction();
  if (!auth.ok) return auth;

  const parsed = blogPostFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid blog post data." };
  }

  const publishState = resolveBlogPublishState({
    status: parsed.data.status,
    publishedAt: parsed.data.publishedAt,
  });

  const data = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    excerpt: parsed.data.excerpt || null,
    content: parsed.data.content || null,
    coverImageUrl: parsed.data.coverImageUrl || null,
    coverImageAlt: parsed.data.coverImageAlt || null,
    authorName: parsed.data.authorName || null,
    category: parsed.data.category || null,
    tags: parsed.data.tags,
    ...publishState,
  };

  try {
    if (parsed.data.id) {
      const updated = await prisma.blogPost.update({
        where: { id: parsed.data.id },
        data,
      });

      revalidateAdminSection("blog");
      revalidateBlogPaths(updated.slug);
      return { ok: true, id: updated.id };
    }

    const created = await prisma.blogPost.create({ data });
    revalidateAdminSection("blog");
    revalidateBlogPaths(created.slug);
    return { ok: true, id: created.id };
  } catch (error) {
    console.error("[admin/blog] Save failed:", error);
    return { ok: false, error: "Could not save blog post." };
  }
}
