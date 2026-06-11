import Link from "@/components/ui/link";

import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { QuotesTable } from "@/components/admin/QuotesTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { listAdminQuotes } from "@/lib/db/admin-crud";
import {
  QUOTE_STATUSES,
  type QuoteStatus,
} from "@/lib/validations/admin/quotes";

export const dynamic = "force-dynamic";

type QuotesPageProps = {
  searchParams: Promise<{
    status?: string;
    from?: string;
    to?: string;
  }>;
};

export default async function AdminQuotesPage({ searchParams }: QuotesPageProps) {
  const params = await searchParams;
  const status = QUOTE_STATUSES.includes(params.status as QuoteStatus)
    ? (params.status as QuoteStatus)
    : undefined;

  const quotes = await listAdminQuotes({
    status,
    from: params.from,
    to: params.to,
  });

  return (
    <div>
      <AdminPageHeader
        eyebrow="Quotes"
        title="Quote requests"
        description="Review and triage incoming quote enquiries."
      />

      <form
        method="get"
        className="mb-6 grid gap-4 rounded-lg border border-ink-700/10 bg-white p-4 md:grid-cols-4"
      >
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <select
            id="status"
            name="status"
            defaultValue={status ?? "all"}
            className="flex h-11 w-full rounded-md border border-ink-700/20 bg-transparent px-3 text-sm"
          >
            <option value="all">All statuses</option>
            {QUOTE_STATUSES.map((entry) => (
              <option key={entry} value={entry}>
                {entry}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="from">From</Label>
          <Input id="from" name="from" type="date" defaultValue={params.from} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="to">To</Label>
          <Input id="to" name="to" type="date" defaultValue={params.to} />
        </div>
        <div className="flex items-end gap-2">
          <Button type="submit">Apply filters</Button>
          <Button asChild variant="ghost">
            <Link href="/admin/quotes/">Reset</Link>
          </Button>
        </div>
      </form>

      <QuotesTable quotes={quotes} />
    </div>
  );
}
