import Link from "@/components/ui/link";
import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/admin/ProjectForm";
import { getAdminProjectById } from "@/lib/db/admin-crud";

export const dynamic = "force-dynamic";

type ProjectEditPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminProjectEditPage({
  params,
}: ProjectEditPageProps) {
  const { id } = await params;
  const project = await getAdminProjectById(id);

  if (!project) {
    notFound();
  }

  const galleryImages = Array.isArray(project.galleryImages)
    ? (project.galleryImages as Array<{
        url: string;
        alt?: string;
        caption?: string;
      }>)
    : [];

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/projects/"
          className="text-body-sm text-amber-600 hover:underline"
        >
          ← Back to projects
        </Link>
        <h1 className="mt-4 font-serif text-display-3 text-ink-900">
          Edit: {project.title}
        </h1>
      </div>

      <ProjectForm
        initial={{
          id: project.id,
          title: project.title,
          slug: project.slug,
          summary: project.summary,
          description: project.description,
          serviceSlug: project.serviceSlug,
          locationName: project.locationName,
          beforeImageUrl: project.beforeImageUrl,
          afterImageUrl: project.afterImageUrl,
          galleryImages,
          metaTitle: project.metaTitle,
          metaDescription: project.metaDescription,
          status: project.isPublished ? "published" : "draft",
          displayOrder: project.displayOrder,
        }}
      />
    </div>
  );
}
