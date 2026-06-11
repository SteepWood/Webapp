"use server";

import {
  revalidateAdminSection,
  revalidateServiceLocationCombo,
} from "@/lib/admin/revalidate";
import { requireAdminAction } from "@/lib/auth/admin-action";
import { prisma } from "@/lib/db/prisma";
import { updateServiceLocationIntroSchema } from "@/lib/validations/admin/service-locations";

import type { AdminMutationResult } from "./quotes";

export async function updateServiceLocationIntro(
  input: unknown,
): Promise<AdminMutationResult> {
  const auth = await requireAdminAction();
  if (!auth.ok) return auth;

  const parsed = updateServiceLocationIntroSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid service location data." };
  }

  try {
    const service = await prisma.service.findUnique({
      where: { slug: parsed.data.serviceSlug },
      select: { id: true },
    });
    const location = await prisma.location.findUnique({
      where: { slug: parsed.data.locationSlug },
      select: { id: true },
    });

    if (!service || !location) {
      return { ok: false, error: "Service or location not found." };
    }

    await prisma.serviceLocation.upsert({
      where: {
        serviceId_locationId: {
          serviceId: service.id,
          locationId: location.id,
        },
      },
      create: {
        serviceId: service.id,
        locationId: location.id,
        intro: parsed.data.intro || null,
        h1: parsed.data.h1 || null,
        bodyContent: parsed.data.bodyContent || null,
        metaTitle: parsed.data.metaTitle || null,
        metaDescription: parsed.data.metaDescription || null,
        isPublished: parsed.data.isPublished,
      },
      update: {
        intro: parsed.data.intro || null,
        h1: parsed.data.h1 || null,
        bodyContent: parsed.data.bodyContent || null,
        metaTitle: parsed.data.metaTitle || null,
        metaDescription: parsed.data.metaDescription || null,
        isPublished: parsed.data.isPublished,
      },
    });

    revalidateAdminSection("services-locations");
    revalidateServiceLocationCombo(
      parsed.data.serviceSlug,
      parsed.data.locationSlug,
    );
    return { ok: true };
  } catch (error) {
    console.error("[admin/service-locations] Update failed:", error);
    return { ok: false, error: "Could not save custom intro." };
  }
}
