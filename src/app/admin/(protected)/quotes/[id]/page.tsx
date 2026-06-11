import Link from "@/components/ui/link";
import { notFound } from "next/navigation";

import { QuoteDetailPanel } from "@/components/admin/QuoteDetailPanel";
import { Badge } from "@/components/ui/badge";
import { parseQuoteAdminMeta } from "@/lib/admin/quoteMeta";
import { getAdminQuoteById } from "@/lib/db/admin-crud";
import {
  buildQuoteEmailData,
  parseQuoteAttachments,
  parseQuoteDetails,
} from "@/lib/email/quoteData";

export const dynamic = "force-dynamic";

type QuoteDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminQuoteDetailPage({
  params,
}: QuoteDetailPageProps) {
  const { id } = await params;
  const quote = await getAdminQuoteById(id);

  if (!quote) {
    notFound();
  }

  const details = parseQuoteDetails(quote);
  const adminMeta = parseQuoteAdminMeta(quote);
  const attachments = parseQuoteAttachments(quote);
  const emailData = buildQuoteEmailData(quote, process.env.NEXT_PUBLIC_SITE_URL ?? "");

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/quotes/"
          className="text-body-sm text-amber-600 hover:underline"
        >
          ← Back to quotes
        </Link>
        <h1 className="mt-4 font-serif text-display-3 text-ink-900">
          Quote from {quote.firstName}
        </h1>
        <p className="mt-2 text-body-sm text-ink-800/70">
          Ref {emailData.reference} · received{" "}
          {quote.createdAt.toLocaleString("en-AU")}
        </p>
      </div>

      <QuoteDetailPanel
        quoteId={quote.id}
        status={quote.status}
        initialNotes={adminMeta.adminNotes ?? ""}
      />

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-lg border border-ink-700/10 bg-white p-6">
          <h2 className="font-serif text-h3 text-ink-900">Contact</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-ink-800/60">Name</dt>
              <dd>{quote.firstName}</dd>
            </div>
            <div>
              <dt className="text-ink-800/60">Email</dt>
              <dd>
                <a href={`mailto:${quote.email}`} className="text-amber-600">
                  {quote.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-800/60">Phone</dt>
              <dd>
                <a href={`tel:${quote.phone}`} className="text-amber-600">
                  {quote.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-ink-800/60">Preferred contact</dt>
              <dd>{details.preferredContact ?? "—"}</dd>
            </div>
          </dl>
        </section>

        <section className="rounded-lg border border-ink-700/10 bg-white p-6">
          <h2 className="font-serif text-h3 text-ink-900">Project</h2>
          <dl className="mt-4 space-y-3 text-sm">
            <div>
              <dt className="text-ink-800/60">Services</dt>
              <dd>{emailData.services}</dd>
            </div>
            <div>
              <dt className="text-ink-800/60">Scope</dt>
              <dd>{quote.projectScope ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-ink-800/60">Location</dt>
              <dd>{quote.suburb}</dd>
            </div>
            <div>
              <dt className="text-ink-800/60">Budget</dt>
              <dd>{quote.budgetRange ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-ink-800/60">Timeframe</dt>
              <dd>{details.timeframe ?? "—"}</dd>
            </div>
            <div>
              <dt className="text-ink-800/60">Property type</dt>
              <dd>{details.propertyType ?? "—"}</dd>
            </div>
          </dl>
        </section>
      </div>

      <section className="rounded-lg border border-ink-700/10 bg-white p-6">
        <h2 className="font-serif text-h3 text-ink-900">Description</h2>
        <p className="mt-4 whitespace-pre-wrap text-sm text-ink-800">
          {details.projectDescription ?? "No description provided."}
        </p>
      </section>

      <section className="rounded-lg border border-ink-700/10 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-serif text-h3 text-ink-900">Attachments</h2>
          <Badge variant="secondary">{attachments.length} files</Badge>
        </div>
        {attachments.length === 0 ? (
          <p className="mt-4 text-body-sm text-ink-800/70">No attachments.</p>
        ) : (
          <ul className="mt-4 space-y-2">
            {attachments.map((file) => (
              <li key={`${file.url}-${file.name}`}>
                <a
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 hover:underline"
                >
                  {file.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
