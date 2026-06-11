import { z } from "zod";

export const QUOTE_STATUSES = [
  "new",
  "contacted",
  "quoted",
  "won",
  "lost",
] as const;

export const quoteStatusSchema = z.enum(QUOTE_STATUSES);

export const updateQuoteStatusSchema = z.object({
  id: z.string().uuid(),
  status: quoteStatusSchema,
});

export const updateQuoteNotesSchema = z.object({
  id: z.string().uuid(),
  adminNotes: z.string().max(5000),
});

export const markQuoteContactedSchema = z.object({
  id: z.string().uuid(),
});

export type QuoteStatus = (typeof QUOTE_STATUSES)[number];
