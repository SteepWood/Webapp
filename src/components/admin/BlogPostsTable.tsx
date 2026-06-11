"use client";

import type { BlogPost } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "@/components/ui/link";

import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { getBlogAdminStatus } from "@/lib/admin/blogStatus";

const columns: ColumnDef<BlogPost>[] = [
  {
    header: "Title",
    accessorKey: "title",
    cell: ({ row }) => (
      <span className="line-clamp-2 max-w-md">{row.original.title}</span>
    ),
  },
  {
    header: "Status",
    id: "status",
    cell: ({ row }) => (
      <Badge variant="secondary">{getBlogAdminStatus(row.original)}</Badge>
    ),
  },
  {
    header: "Published",
    accessorKey: "publishedAt",
    cell: ({ row }) =>
      row.original.publishedAt
        ? new Date(row.original.publishedAt).toLocaleDateString("en-AU")
        : "—",
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => row.original.category ?? "—",
  },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => (
      <Link
        href={`/admin/blog/${row.original.id}/edit/`}
        className="font-medium text-amber-600 hover:underline"
      >
        Edit
      </Link>
    ),
  },
];

export function BlogPostsTable({ posts }: { posts: BlogPost[] }) {
  return <DataTable columns={columns} data={posts} emptyMessage="No blog posts yet." />;
}
