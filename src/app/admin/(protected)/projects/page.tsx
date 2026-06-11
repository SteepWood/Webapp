import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProjectsTable } from "@/components/admin/ProjectsTable";
import { listAdminProjects } from "@/lib/db/admin-crud";

export const dynamic = "force-dynamic";

export default async function AdminProjectsPage() {
  const projects = await listAdminProjects();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Portfolio"
        title="Projects"
        description="Manage portfolio case studies and galleries."
        actionHref="/admin/projects/new/"
        actionLabel="Add new project"
      />
      <ProjectsTable projects={projects} />
    </div>
  );
}
