import Link from "@/components/ui/link";
import { SectionShell } from "@/components/sections/section-shell";
import type { AioFact } from "@/lib/aio/facts";

type FactsBlockProps = {
  title: string;
  facts: AioFact[];
  className?: string;
};

export function FactsBlock({ title, facts, className }: FactsBlockProps) {
  if (facts.length === 0) {
    return null;
  }

  const headingId = "facts-h2";

  return (
    <SectionShell className={className} aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="mb-stack-md font-serif text-h2 text-ink-900"
      >
        {title}
      </h2>
      <ul className="max-w-3xl list-disc space-y-3 pl-5 text-body leading-relaxed text-ink-800">
        {facts.map((fact) => (
          <li key={`${fact.text}-${fact.sourceUrl}`}>
            {fact.text}{" "}
            <Link
              href={fact.sourceUrl}
              className="font-medium text-amber-700 underline-offset-2 hover:underline"
              rel="noopener noreferrer"
              target="_blank"
            >
              {fact.sourceLabel}
            </Link>
            .
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
