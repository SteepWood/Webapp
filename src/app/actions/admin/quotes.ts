"use server";

import { mergeQuoteAdminMeta } from "@/lib/admin/quoteMeta";
import { revalidateAdminSection } from "@/lib/admin/revalidate";
import { requireAdminAction } from "@/lib/auth/admin-action";
import { prisma } from "@/lib/db/prisma";
import { sendQuoteContactedEmail } from "@/lib/email/quoteContacted";
import {
  markQuoteContactedSchema,
  updateQuoteNotesSchema,
  updateQuoteStatusSchema,
} from "@/lib/validations/admin/quotes";

export type AdminMutationResult =
  | { ok: true }
  | { ok: false; error: string };

export async function updateQuoteStatus(
  input: unknown,
): Promise<AdminMutationResult> {
  const auth = await requireAdminAction();
  if (!auth.ok) return auth;

  const parsed = updateQuoteStatusSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid status update." };
  }

  try {
    await prisma.quoteRequest.update({
      where: { id: parsed.data.id },
      data: { status: parsed.data.status },
    });

    revalidateAdminSection("quotes");
    return { ok: true };
  } catch (error) {
    console.error("[admin/quotes] Status update failed:", error);
    return { ok: false, error: "Could not update quote status." };
  }
}

export async function updateQuoteNotes(
  input: unknown,
): Promise<AdminMutationResult> {
  const auth = await requireAdminAction();
  if (!auth.ok) return auth;

  const parsed = updateQuoteNotesSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid notes." };
  }

  try {
    const quote = await prisma.quoteRequest.findUnique({
      where: { id: parsed.data.id },
    });

    if (!quote) {
      return { ok: false, error: "Quote not found." };
    }

    await prisma.quoteRequest.update({
      where: { id: parsed.data.id },
      data: {
        bestTimeToCall: mergeQuoteAdminMeta(quote, {
          adminNotes: parsed.data.adminNotes,
        }),
      },
    });

    revalidateAdminSection("quotes");
    return { ok: true };
  } catch (error) {
    console.error("[admin/quotes] Notes update failed:", error);
    return { ok: false, error: "Could not save notes." };
  }
}

export async function markQuoteContacted(
  input: unknown,
): Promise<AdminMutationResult> {
  const auth = await requireAdminAction();
  if (!auth.ok) return auth;

  const parsed = markQuoteContactedSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid request." };
  }

  try {
    const quote = await prisma.quoteRequest.update({
      where: { id: parsed.data.id },
      data: { status: "contacted" },
    });

    await sendQuoteContactedEmail(quote);
    revalidateAdminSection("quotes");
    return { ok: true };
  } catch (error) {
    console.error("[admin/quotes] Mark contacted failed:", error);
    return { ok: false, error: "Could not mark quote as contacted." };
  }
}
