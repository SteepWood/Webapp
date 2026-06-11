import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "tip";

const VARIANT_STYLES: Record<CalloutVariant, string> = {
  info: "border-amber-500/40 bg-amber-50 text-ink-900",
  warning: "border-error/30 bg-error/5 text-ink-900",
  tip: "border-ink-700/20 bg-ink-50 text-ink-900",
};

const VARIANT_LABELS: Record<CalloutVariant, string> = {
  info: "Note",
  warning: "Important",
  tip: "Tip",
};

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <aside
      className={cn(
        "my-6 rounded-lg border-l-4 px-5 py-4 not-prose",
        VARIANT_STYLES[variant],
      )}
    >
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-ink-800/80">
        {title ?? VARIANT_LABELS[variant]}
      </p>
      <div className="text-body text-ink-800/90">{children}</div>
    </aside>
  );
}
