import { z } from "zod";

export const updateServiceLocationIntroSchema = z.object({
  serviceSlug: z.string().min(1),
  locationSlug: z.string().min(1),
  intro: z.string().max(4000).optional(),
  h1: z.string().max(200).optional(),
  bodyContent: z.string().max(12000).optional(),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(320).optional(),
  isPublished: z.boolean(),
});
