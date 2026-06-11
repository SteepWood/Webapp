import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { BlogPostsTable } from "@/components/admin/BlogPostsTable";
import { listAdminBlogPosts } from "@/lib/db/admin-crud";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  const posts = await listAdminBlogPosts();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Blog"
        title="Blog posts"
        description="Draft, schedule, and publish articles."
        actionHref="/admin/blog/new/"
        actionLabel="Write new post"
      />
      <BlogPostsTable posts={posts} />
    </div>
  );
}
