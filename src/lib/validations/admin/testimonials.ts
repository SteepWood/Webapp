import { z } from "zod";

export const testimonialBulkActionSchema = z.object({
  ids: z.array(z.string().uuid()).min(1),
  action: z.enum(["verify", "feature", "reject"]),
});

export const updateTestimonialSchema = z.object({
  id: z.string().uuid(),
  authorName: z.string().min(1).max(120),
  authorLocation: z.string().max(120).optional(),
  quote: z.string().min(1).max(2000),
  rating: z.number().int().min(1).max(5),
  source: z.string().max(80).optional(),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  serviceSlug: z.string().max(120).optional().or(z.literal("")),
  locationSlug: z.string().max(120).optional().or(z.literal("")),
  isVerified: z.boolean(),
  isFeatured: z.boolean(),
  isPublished: z.boolean(),
});
