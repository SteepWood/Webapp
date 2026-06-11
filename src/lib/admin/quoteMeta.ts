import type { QuoteRequest } from "@prisma/client";

import type { QuoteDetails } from "@/lib/email/quoteData";

export type QuoteAdminMeta = QuoteDetails & {
  adminNotes?: string;
};

export function parseQuoteAdminMeta(quote: QuoteRequest): QuoteAdminMeta {
  if (!quote.bestTimeToCall) {
    return {};
  }

  try {
    return JSON.parse(quote.bestTimeToCall) as QuoteAdminMeta;
  } catch {
    return { preferredContact: quote.bestTimeToCall };
  }
}

export function mergeQuoteAdminMeta(
  quote: QuoteRequest,
  patch: Partial<QuoteAdminMeta>,
): string {
  const current = parseQuoteAdminMeta(quote);
  return JSON.stringify({ ...current, ...patch });
}
