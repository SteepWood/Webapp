import Link from "@/components/ui/link";
import { notFound } from "next/navigation";

import { TestimonialEditForm } from "@/components/admin/TestimonialEditForm";
import { getAdminTestimonialById } from "@/lib/db/admin-crud";

export const dynamic = "force-dynamic";

type TestimonialDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminTestimonialDetailPage({
  params,
}: TestimonialDetailPageProps) {
  const { id } = await params;
  const testimonial = await getAdminTestimonialById(id);

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/admin/testimonials/"
          className="text-body-sm text-amber-600 hover:underline"
        >
          ← Back to testimonials
        </Link>
        <h1 className="mt-4 font-serif text-display-3 text-ink-900">
          {testimonial.authorName}
        </h1>
      </div>

      <TestimonialEditForm testimonial={testimonial} />
    </div>
  );
}
