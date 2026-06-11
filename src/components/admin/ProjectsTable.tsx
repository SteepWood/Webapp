"use client";

import type { PortfolioProject } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "@/components/ui/link";

import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

const columns: ColumnDef<PortfolioProject>[] = [
  {
    header: "Title",
    accessorKey: "title",
  },
  {
    header: "Service",
    accessorKey: "serviceSlug",
    cell: ({ row }) => row.original.serviceSlug ?? "—",
  },
  {
    header: "Location",
    accessorKey: "locationName",
    cell: ({ row }) => row.original.locationName ?? "—",
  },
  {
    header: "Status",
    id: "status",
    cell: ({ row }) => (
      <Badge variant="secondary">
        {row.original.isPublished ? "published" : "draft"}
      </Badge>
    ),
  },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => (
      <Link
        href={`/admin/projects/${row.original.id}/edit/`}
        className="font-medium text-amber-600 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

export function ProjectsTable({ projects }: { projects: PortfolioProject[] }) {
  return (
    <DataTable columns={columns} data={projects} emptyMessage="No projects yet." />
  );
}
