"use client";

import type { Testimonial } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "@/components/ui/link";
import { useMemo, useState } from "react";

import { DataTable } from "@/components/admin/DataTable";
import { TestimonialBulkActions } from "@/components/admin/TestimonialBulkActions";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { getTestimonialAdminStatus } from "@/lib/admin/testimonialStatus";

export function TestimonialsTable({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const columns = useMemo<ColumnDef<Testimonial>[]>(
    () => [
      {
        id: "select",
        header: "",
        cell: ({ row }) => (
          <Checkbox
            checked={selectedIds.includes(row.original.id)}
            onCheckedChange={(checked) => {
              setSelectedIds((current) =>
                checked === true
                  ? [...current, row.original.id]
                  : current.filter((id) => id !== row.original.id),
              );
            }}
            aria-label={`Select ${row.original.authorName}`}
          />
        ),
      },
      {
        header: "Name",
        accessorKey: "authorName",
      },
      {
        header: "Suburb",
        accessorKey: "authorLocation",
        cell: ({ row }) => row.original.authorLocation ?? "—",
      },
      {
        header: "Rating",
        accessorKey: "rating",
      },
      {
        header: "Source",
        accessorKey: "source",
        cell: ({ row }) => row.original.source ?? "—",
      },
      {
        header: "Status",
        id: "status",
        cell: ({ row }) => (
          <Badge variant="secondary">
            {getTestimonialAdminStatus(row.original)}
          </Badge>
        ),
      },
      {
        header: "",
        id: "actions",
        cell: ({ row }) => (
          <Link
            href={`/admin/testimonials/${row.original.id}/`}
            className="font-medium text-amber-600 hover:underline"
          >
            Edit
          </Link>
        ),
      },
    ],
    [selectedIds],
  );

  return (
    <div className="space-y-4">
      <TestimonialBulkActions
        selectedIds={selectedIds}
        onClear={() => setSelectedIds([])}
      />
      <DataTable
        columns={columns}
        data={testimonials}
        emptyMessage="No testimonials found."
      />
    </div>
  );
}
