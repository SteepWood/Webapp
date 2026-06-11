import { z } from "zod";

const auPhoneRegex = /^(?:\+61|0)[2-478](?:[ -]?\d){8}$/;

export const CONTACT_SUBJECTS = [
  "General enquiry",
  "Press",
  "Supplier",
  "Careers",
  "Other",
] as const;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your name."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .optional()
    .refine(
      (value) => !value || auPhoneRegex.test(value.replace(/\s/g, "")),
      "Please enter a valid Australian phone number.",
    ),
  subject: z.enum(CONTACT_SUBJECTS, {
    required_error: "Please select a subject.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please provide at least 20 characters."),
  company: z.string().max(0, "Invalid submission."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
