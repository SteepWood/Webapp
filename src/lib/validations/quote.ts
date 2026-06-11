import { z } from "zod";

import { LOCATIONS } from "@/lib/services-locations/locations";
import { SERVICES } from "@/lib/services-locations/services";

export const QUOTE_SERVICE_TYPES = SERVICES.map((service) => service.slug) as [
  (typeof SERVICES)[number]["slug"],
  ...(typeof SERVICES)[number]["slug"][],
];

export const PROJECT_SCOPES = [
  "single-room",
  "multi-room",
  "full-home",
  "commercial",
] as const;

export const BUDGET_RANGES = [
  "<10k",
  "10-25k",
  "25-50k",
  "50-100k",
  "100k+",
  "not-sure",
] as const;

export const TIMEFRAMES = [
  "asap",
  "1-3-months",
  "3-6-months",
  "6-12-months",
  "exploring",
] as const;

export const PROPERTY_TYPES = [
  "house",
  "apartment",
  "commercial-space",
  "new-build",
] as const;

export const PREFERRED_CONTACT_METHODS = ["email", "phone", "either"] as const;

export const LOCATION_SLUGS = LOCATIONS.map((location) => location.slug) as [
  (typeof LOCATIONS)[number]["slug"],
  ...(typeof LOCATIONS)[number]["slug"][],
];

const auPhoneRegex = /^(?:\+61|0)[2-478](?:[ -]?\d){8}$/;

export const quoteAttachmentSchema = z.object({
  /** Supabase Storage object path within the quote-attachments bucket */
  url: z.string().min(1),
  name: z.string().min(1),
  mimeType: z.string().min(1),
  size: z.number().positive(),
  previewUrl: z.string().url().optional(),
});

export const step1Schema = z.object({
  serviceTypes: z
    .array(z.enum(QUOTE_SERVICE_TYPES))
    .min(1, "Select at least one service."),
  projectScope: z.enum(PROJECT_SCOPES, {
    required_error: "Select a project scope.",
  }),
  budgetRange: z.enum(BUDGET_RANGES, {
    required_error: "Select a budget range.",
  }),
  timeframe: z.enum(TIMEFRAMES, {
    required_error: "Select a timeframe.",
  }),
});

export const step2Schema = z.object({
  locationSlug: z.enum(LOCATION_SLUGS, {
    required_error: "Select a location.",
  }),
  suburb: z.string().trim().min(2, "Enter your suburb or city."),
  propertyType: z.enum(PROPERTY_TYPES, {
    required_error: "Select a property type.",
  }),
  projectDescription: z
    .string()
    .trim()
    .min(30, "Please provide at least 30 characters.")
    .max(1500, "Description must be 1,500 characters or fewer."),
  attachments: z.array(quoteAttachmentSchema).max(5),
});

export const step3Schema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z
    .string()
    .trim()
    .refine(
      (value) => auPhoneRegex.test(value.replace(/\s/g, "")),
      "Enter a valid Australian phone number.",
    ),
  preferredContact: z.enum(PREFERRED_CONTACT_METHODS, {
    required_error: "Select a preferred contact method.",
  }),
  consentMarketing: z.boolean(),
  consentPrivacy: z.literal(true, {
    errorMap: () => ({ message: "You must accept the privacy policy." }),
  }),
});

export const quoteSchema = step1Schema.merge(step2Schema).merge(step3Schema);

export const quoteSubmitSchema = quoteSchema.merge(
  z.object({
    website: z.string().max(0, "Invalid submission."),
  }),
);

export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type QuoteFormData = z.infer<typeof quoteSchema>;
export type QuoteSubmitData = z.infer<typeof quoteSubmitSchema>;
export type QuoteAttachment = z.infer<typeof quoteAttachmentSchema>;
