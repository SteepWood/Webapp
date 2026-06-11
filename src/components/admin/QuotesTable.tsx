"use client";

import type { QuoteRequest } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "@/components/ui/link";

import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/DataTable";

const columns: ColumnDef<QuoteRequest>[] = [
  {
    header: "Date",
    accessorKey: "createdAt",
    cell: ({ row }) =>
      new Date(row.original.createdAt).toLocaleDateString("en-AU", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    header: "Name",
    accessorKey: "firstName",
  },
  {
    header: "Services",
    accessorKey: "projectType",
    cell: ({ row }) => (
      <span className="line-clamp-2 max-w-xs">{row.original.projectType}</span>
    ),
  },
  {
    header: "Location",
    accessorKey: "suburb",
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <Badge variant="secondary">{row.original.status}</Badge>,
  },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => (
      <Link
        href={`/admin/quotes/${row.original.id}/`}
        className="font-medium text-amber-600 hover:underline"
      >
        View
      </Link>
    ),
  },
];

export function QuotesTable({ quotes }: { quotes: QuoteRequest[] }) {
  return <DataTable columns={columns} data={quotes} emptyMessage="No quotes found." />;
}
