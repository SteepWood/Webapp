import { z } from "zod";

export const PROJECT_STATUSES = ["draft", "published"] as const;

export const galleryImageSchema = z.object({
  url: z.string().url(),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

export const projectFormSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  summary: z.string().max(500).optional(),
  description: z.string().optional(),
  serviceSlug: z.string().max(120).optional().or(z.literal("")),
  locationName: z.string().max(120).optional(),
  beforeImageUrl: z.string().url().optional().or(z.literal("")),
  afterImageUrl: z.string().url().optional().or(z.literal("")),
  galleryImages: z.array(galleryImageSchema).default([]),
  metaTitle: z.string().max(200).optional(),
  metaDescription: z.string().max(320).optional(),
  status: z.enum(PROJECT_STATUSES),
  displayOrder: z.number().int().min(0).default(0),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
