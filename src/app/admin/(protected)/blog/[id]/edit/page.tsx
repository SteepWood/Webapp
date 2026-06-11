import Link from "@/components/ui/link";
import { notFound } from "next/navigation";

import { BlogPostForm } from "@/components/admin/BlogPostForm";
import { toBlogFormStatus } from "@/lib/admin/blogStatus";
import { toDatetimeLocalValue } from "@/lib/admin/datetime";
import { getAdminBlogPostById } from "@/lib/db/admin-crud";

export const dynamic = "force-dynamic";

type BlogEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminBlogEditPage({ params }: BlogEditPageProps) {
  const { id } = await params;
  const post = await getAdminBlogPostById(id);

  if (!post) {
    notFound();
  }

  const tags = Array.isArray(post.tags) ? (post.tags as string[]) : [];

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
          Edit: {post.title}
        </h1>
      </div>

      <BlogPostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          coverImageUrl: post.coverImageUrl,
          coverImageAlt: post.coverImageAlt,
          authorName: post.authorName,
          category: post.category,
          tags,
          status: toBlogFormStatus(post),
          publishedAt: toDatetimeLocalValue(post.publishedAt),
        }}
      />
    </div>
  );
}
