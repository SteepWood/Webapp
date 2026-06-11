import { revalidatePath } from "next/cache";

export function revalidatePublicHomepage() {
  revalidatePath("/");
}

export function revalidateBlogPaths(slug?: string) {
  revalidatePath("/blog/");

  if (slug) {
    revalidatePath(`/blog/${slug}/`);
  }
}

export function revalidatePortfolioPaths(slug?: string) {
  revalidatePath("/portfolio/");

  if (slug) {
    revalidatePath(`/portfolio/${slug}/`);
  }
}

export function revalidateServiceLocationCombo(
  serviceSlug: string,
  locationSlug: string,
) {
  revalidatePath(`/${serviceSlug}/${locationSlug}/`);
}

export function revalidateServicePaths(serviceSlug: string) {
  revalidatePath(`/${serviceSlug}/`);
}

export function revalidateLocationPaths(locationSlug: string) {
  revalidatePath(`/locations/${locationSlug}/`);
}

export function revalidateAdminSection(section: string) {
  revalidatePath(`/admin/${section}/`);
  revalidatePath("/admin/");
}
