import { z } from "zod";

export const newsletterFormSchema = z.object({
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  company: z.string().max(0, "Invalid submission."),
});

export type NewsletterFormValues = z.infer<typeof newsletterFormSchema>;
