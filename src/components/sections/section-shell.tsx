import { cn } from "@/lib/utils";

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
    <section id={id} className={cn("px-container-x py-section-y", className)}>
      <div className="mx-auto min-w-0 max-w-7xl">{children}</div>
    </section>
  );
}
