import { cn } from "@/lib/utils";

type SectionRhythmOptions = {
  join?: boolean;
  endFlush?: boolean;
  tint?: "ink-50" | "ink-100" | "ink-100-30";
};

/** Compose join/flush/tint classes for consistent vertical rhythm between sections. */
export function sectionRhythm({
  join = false,
  endFlush = false,
  tint,
}: SectionRhythmOptions = {}) {
  return cn(
    tint === "ink-50" && "bg-ink-50",
    tint === "ink-100" && "bg-ink-100/40",
    tint === "ink-100-30" && "bg-ink-100/30",
    join && "section-join",
    endFlush && "section-end-flush",
  );
}

export const sectionHeadingClass =
  "mb-stack-md font-serif text-h2 text-ink-900";

/** Subheading rhythm for cards, FAQ blocks, and inline section titles. */
export const contentSubheadingClass =
  "mb-stack-sm font-serif text-h4 text-ink-900";

export function SectionShell({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-container-x py-section-half", className)}>
      <div className="mx-auto min-w-0 max-w-7xl">{children}</div>
    </section>
  );
}
