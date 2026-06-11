"use server";

import {
  revalidateAdminSection,
  revalidatePublicHomepage,
  revalidateLocationPaths,
  revalidateServicePaths,
} from "@/lib/admin/revalidate";
import { requireAdminAction } from "@/lib/auth/admin-action";
import { prisma } from "@/lib/db/prisma";
import {
  testimonialBulkActionSchema,
  updateTestimonialSchema,
} from "@/lib/validations/admin/testimonials";

import type { AdminMutationResult } from "./quotes";

function revalidateTestimonialPaths(serviceSlug?: string | null, locationSlug?: string | null) {
  revalidatePublicHomepage();

  if (serviceSlug) {
    revalidateServicePaths(serviceSlug);
  }

  if (locationSlug) {
    revalidateLocationPaths(locationSlug);
  }
}

export async function bulkUpdateTestimonials(
  input: unknown,
): Promise<AdminMutationResult> {
  const auth = await requireAdminAction();
  if (!auth.ok) return auth;

  const parsed = testimonialBulkActionSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid bulk action." };
  }

  const data =
    parsed.data.action === "verify"
      ? { isVerified: true, isPublished: true, isFeatured: false, source: null }
      : parsed.data.action === "feature"
        ? { isVerified: true, isPublished: true, isFeatured: true, source: null }
        : {
            isVerified: false,
            isPublished: false,
            isFeatured: false,
            source: "admin-rejected",
          };

  try {
    await prisma.testimonial.updateMany({
      where: { id: { in: parsed.data.ids } },
      data,
    });

    revalidateAdminSection("testimonials");
    revalidatePublicHomepage();
    return { ok: true };
  } catch (error) {
    console.error("[admin/testimonials] Bulk update failed:", error);
    return { ok: false, error: "Bulk action failed." };
  }
}

export async function updateTestimonial(
  input: unknown,
): Promise<AdminMutationResult> {
  const auth = await requireAdminAction();
  if (!auth.ok) return auth;

  const parsed = updateTestimonialSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid testimonial data." };
  }

  try {
    const updated = await prisma.testimonial.update({
      where: { id: parsed.data.id },
      data: {
        authorName: parsed.data.authorName,
        authorLocation: parsed.data.authorLocation || null,
        quote: parsed.data.quote,
        rating: parsed.data.rating,
        source: parsed.data.source || null,
        sourceUrl: parsed.data.sourceUrl || null,
        serviceSlug: parsed.data.serviceSlug || null,
        locationSlug: parsed.data.locationSlug || null,
        isVerified: parsed.data.isVerified,
        isFeatured: parsed.data.isFeatured,
        isPublished: parsed.data.isPublished,
      },
    });

    revalidateAdminSection("testimonials");
    revalidateTestimonialPaths(updated.serviceSlug, updated.locationSlug);
    return { ok: true };
  } catch (error) {
    console.error("[admin/testimonials] Update failed:", error);
    return { ok: false, error: "Could not save testimonial." };
  }
}
