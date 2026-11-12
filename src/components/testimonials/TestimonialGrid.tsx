import type { Testimonial } from "@prisma/client";

import { TestimonialCard } from "./TestimonialCard";

export function TestimonialGrid({
  testimonials,
  showSourceBadge = true,
  snapOnPhone = false,
}: {
  testimonials: Testimonial[];
  showSourceBadge?: boolean;
  snapOnPhone?: boolean;
}) {
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div>
      <div
        className={
          snapOnPhone
            ? "flex snap-x snap-mandatory gap-3 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] md:grid md:grid-cols-3 md:gap-6 md:overflow-visible [&::-webkit-scrollbar]:hidden"
            : "grid grid-cols-1 gap-6 md:grid-cols-3"
        }
      >
        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className={
              snapOnPhone
                ? "w-[88%] shrink-0 snap-start md:w-full md:shrink"
                : undefined
            }
          >
            <TestimonialCard
              testimonial={testimonial}
              showSourceBadge={showSourceBadge}
              quoteClassName={snapOnPhone ? "max-md:text-[15px]" : undefined}
            />
          </div>
        ))}
      </div>
      {snapOnPhone ? (
        <p className="mt-3 text-[13px] text-[#5c4a3c] md:hidden">
          Swipe to see more →
        </p>
      ) : null}
    </div>
  );
}
