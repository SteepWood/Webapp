import { cn } from "@/lib/utils";

type AnswerFirstProps = {
  children: string;
  className?: string;
};

export function AnswerFirst({ children, className }: AnswerFirstProps) {
  const firstSentenceEnd = children.search(/[.!?](\s|$)/);
  const firstSentence =
    firstSentenceEnd >= 0
      ? children.slice(0, firstSentenceEnd + 1)
      : children;
  const remainder =
    firstSentenceEnd >= 0 ? children.slice(firstSentenceEnd + 1).trim() : "";

  return (
    <p className={cn("answer-first text-body leading-relaxed text-ink-800", className)}>
      <span className="font-medium text-ink-900">{firstSentence}</span>
      {remainder ? <> {remainder}</> : null}
    </p>
  );
}
