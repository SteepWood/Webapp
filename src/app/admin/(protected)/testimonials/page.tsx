import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { TestimonialsTable } from "@/components/admin/TestimonialsTable";
import { listAdminTestimonials } from "@/lib/db/admin-crud";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  const testimonials = await listAdminTestimonials();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Testimonials"
        title="Testimonials"
        description="Verify, feature, or reject customer reviews."
      />
      <TestimonialsTable testimonials={testimonials} />
    </div>
  );
}
