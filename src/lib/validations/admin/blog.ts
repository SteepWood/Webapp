import { z } from "zod";

export const BLOG_STATUSES = ["draft", "published", "scheduled"] as const;

export const blogPostFormSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200),
  excerpt: z.string().max(500).optional(),
  content: z.string().optional(),
  coverImageUrl: z.string().url().optional().or(z.literal("")),
  coverImageAlt: z.string().max(200).optional(),
  authorName: z.string().max(120).optional(),
  category: z.string().max(80).optional(),
  tags: z.array(z.string()).default([]),
  status: z.enum(BLOG_STATUSES),
  publishedAt: z.string().optional(),
});

export type BlogPostFormValues = z.infer<typeof blogPostFormSchema>;
