import Link from "@/components/ui/link";

import { BlogPostForm } from "@/components/admin/BlogPostForm";

export const dynamic = "force-dynamic";

export default function AdminBlogNewPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/blog/"
          className="text-body-sm text-amber-600 hover:underline"
        >
          ← Back to blog
        </Link>
        <h1 className="mt-4 font-serif text-display-3 text-ink-900">
          New blog post
        </h1>
      </div>

      <BlogPostForm />
    </div>
  );
}
