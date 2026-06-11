import type { Testimonial } from "@prisma/client";

export type TestimonialAdminStatus =
  | "pending"
  | "verified"
  | "featured"
  | "rejected";

export function getTestimonialAdminStatus(
  testimonial: Testimonial,
): TestimonialAdminStatus {
  if (testimonial.source === "admin-rejected") {
    return "rejected";
  }

  if (testimonial.isFeatured) {
    return "featured";
  }

  if (testimonial.isVerified) {
    return "verified";
  }

  return "pending";
}
