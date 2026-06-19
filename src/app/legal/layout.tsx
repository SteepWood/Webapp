import Link from "@/components/ui/link";

const LEGAL_PAGES = [
  { href: "/legal/privacy/", label: "Privacy Policy" },
  { href: "/legal/terms/", label: "Terms of Service" },
  { href: "/legal/consumer-rights/", label: "Australian Consumer Law" },
] as const;

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="px-container-x py-section-half">
      <div className="mx-auto flex max-w-5xl flex-col gap-10 lg:flex-row lg:gap-16">
        <aside className="shrink-0 lg:w-56">
          <nav aria-label="Legal documents" className="space-y-1">
            <p className="mb-stack-sm font-mono text-caption uppercase tracking-widest text-amber-600">
              Legal
            </p>
            <ul className="space-y-2">
              {LEGAL_PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="text-body-sm text-ink-800/80 transition-colors hover:text-amber-600"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        <div className="min-w-0 max-w-3xl flex-1">{children}</div>
      </div>
    </div>
  );
}
