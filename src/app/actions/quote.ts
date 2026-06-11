"use server";

import { prisma } from "@/lib/db/prisma";
import {
  sendQuoteAutoReply,
  sendQuoteNotification,
} from "@/lib/email/quoteNotifications";
import { LOCATIONS } from "@/lib/services-locations/locations";
import {
  quoteSubmitSchema,
  type QuoteSubmitData,
} from "@/lib/validations/quote";

export type SubmitQuoteResult =
  | { ok: true; quoteId: string }
  | { ok: false; error: "spam" | "validation" | "server"; message?: string };

function mapQuoteToDb(data: QuoteSubmitData) {
  const location = LOCATIONS.find((entry) => entry.slug === data.locationSlug);

  return {
    projectType: data.serviceTypes.join(", "),
    projectScope: data.projectScope,
    suburb: location ? `${data.suburb}, ${location.name}` : data.suburb,
    budgetRange: data.budgetRange,
    firstName: data.fullName,
    phone: data.phone.replace(/\s/g, ""),
    email: data.email.trim().toLowerCase(),
    bestTimeToCall: JSON.stringify({
      preferredContact: data.preferredContact,
      timeframe: data.timeframe,
      propertyType: data.propertyType,
      locationSlug: data.locationSlug,
      projectDescription: data.projectDescription,
      consentMarketing: data.consentMarketing,
    }),
    attachmentUrls: data.attachments.map((file) => ({
      url: file.url,
      name: file.name,
      mimeType: file.mimeType,
      size: file.size,
    })),
    status: "new",
  };
}

export async function submitQuote(input: unknown): Promise<SubmitQuoteResult> {
  const parsed = quoteSubmitSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "validation", message: "Please check the form and try again." };
  }

  if (parsed.data.website) {
    return { ok: false, error: "spam" };
  }

  try {
    const quote = await prisma.quoteRequest.create({
      data: mapQuoteToDb(parsed.data),
    });

    await Promise.all([
      sendQuoteNotification(quote),
      sendQuoteAutoReply(quote),
    ]);

    return { ok: true, quoteId: quote.id };
  } catch (error) {
    console.error("[quote] Submission failed:", error);
    return {
      ok: false,
      error: "server",
      message:
        "We could not save your quote request right now. Please call us instead.",
    };
  }
}
