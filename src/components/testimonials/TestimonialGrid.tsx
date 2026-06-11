import type { Testimonial } from "@prisma/client";

import { TestimonialCard } from "./TestimonialCard";

export function TestimonialGrid({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
    </div>
  );
}
