import Link from "@/components/ui/link";

export function LegalBreadcrumbs({ currentPage }: { currentPage: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-stack-lg">
      <ol className="flex flex-wrap items-center gap-2 text-body-sm text-ink-800/70">
        <li>
          <Link href="/" className="hover:text-amber-600">
            Home
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href="/legal/privacy/" className="hover:text-amber-600">
            Legal
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li className="font-medium text-ink-900">{currentPage}</li>
      </ol>
    </nav>
  );
}
