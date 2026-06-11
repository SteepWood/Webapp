import Link from "@/components/ui/link";

import { Button } from "@/components/ui/button";

type AdminPageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actionHref?: string;
  actionLabel?: string;
};

export function AdminPageHeader({
  eyebrow = "Admin",
  title,
  description,
  actionHref,
  actionLabel,
}: AdminPageHeaderProps) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="font-mono text-caption uppercase tracking-widest text-amber-600">
          {eyebrow}
        </p>
        <h1 className="mt-2 font-serif text-display-3 text-ink-900">{title}</h1>
        {description ? (
          <p className="mt-2 text-body-sm text-ink-800/70">{description}</p>
        ) : null}
      </div>

      {actionHref && actionLabel ? (
        <Button asChild>
          <Link href={actionHref}>{actionLabel}</Link>
        </Button>
      ) : null}
    </div>
  );
}
