"use server";

import {
  revalidateAdminSection,
  revalidatePortfolioPaths,
} from "@/lib/admin/revalidate";
import { requireAdminAction } from "@/lib/auth/admin-action";
import { prisma } from "@/lib/db/prisma";
import { projectFormSchema } from "@/lib/validations/admin/projects";

import type { AdminMutationResult } from "./quotes";

export async function savePortfolioProject(
  input: unknown,
): Promise<AdminMutationResult & { id?: string }> {
  const auth = await requireAdminAction();
  if (!auth.ok) return auth;

  const parsed = projectFormSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid project data." };
  }

  const data = {
    title: parsed.data.title,
    slug: parsed.data.slug,
    summary: parsed.data.summary || null,
    description: parsed.data.description || null,
    serviceSlug: parsed.data.serviceSlug || null,
    locationName: parsed.data.locationName || null,
    beforeImageUrl: parsed.data.beforeImageUrl || null,
    afterImageUrl: parsed.data.afterImageUrl || null,
    galleryImages: parsed.data.galleryImages,
    metaTitle: parsed.data.metaTitle || null,
    metaDescription: parsed.data.metaDescription || null,
    isPublished: parsed.data.status === "published",
    displayOrder: parsed.data.displayOrder,
  };

  try {
    if (parsed.data.id) {
      const updated = await prisma.portfolioProject.update({
        where: { id: parsed.data.id },
        data,
      });

      revalidateAdminSection("projects");
      revalidatePortfolioPaths(updated.slug);
      return { ok: true, id: updated.id };
    }

    const created = await prisma.portfolioProject.create({ data });
    revalidateAdminSection("projects");
    revalidatePortfolioPaths(created.slug);
    return { ok: true, id: created.id };
  } catch (error) {
    console.error("[admin/projects] Save failed:", error);
    return { ok: false, error: "Could not save project." };
  }
}
