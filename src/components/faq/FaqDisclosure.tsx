import { ChevronDownIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export type FaqDisclosureItem = {
  id: string;
  question: string;
  answer: string;
};

export function FaqDisclosure({
  items,
  className,
}: {
  items: FaqDisclosureItem[];
  className?: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={cn("max-w-3xl divide-y border-b", className)}>
      {items.map((item) => (
        <details
          key={item.id}
          className="group border-t border-ink-700/10"
        >
          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-md py-4 text-left font-medium text-ink-900 outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 [&::-webkit-details-marker]:hidden">
            <span>{item.question}</span>
            <ChevronDownIcon
              aria-hidden
              className="pointer-events-none size-4 shrink-0 translate-y-1 text-ink-800/60 transition-transform duration-200 group-open:rotate-180"
            />
          </summary>
          <div className="pb-4 text-body leading-relaxed text-ink-800/80">
            {item.answer}
          </div>
        </details>
      ))}
    </div>
  );
}
