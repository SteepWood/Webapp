import type { PortfolioProject } from "@prisma/client";

import { env } from "@/env";
import {
  getProjectGalleryImages,
  getProjectHeroImage,
  getServiceLabel,
} from "@/lib/portfolio/utils";

const SITE_URL = env.NEXT_PUBLIC_SITE_URL;

export function projectBreadcrumbStructuredData(project: PortfolioProject) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${SITE_URL}/`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: `${SITE_URL}/portfolio/`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: project.title,
        item: `${SITE_URL}/portfolio/${project.slug}/`,
      },
    ],
  };
}

export function projectImageGalleryStructuredData(project: PortfolioProject) {
  const hero = getProjectHeroImage(project);
  const gallery = getProjectGalleryImages(project);
  const images = gallery.length > 0 ? gallery : hero ? [hero] : [];

  return {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: project.title,
    description: project.summary ?? project.description ?? undefined,
    about: getServiceLabel(project.serviceSlug),
    image: images.map((image) => ({
      "@type": "ImageObject",
      contentUrl: image.url.startsWith("http")
        ? image.url
        : `${SITE_URL}${image.url}`,
      name: image.alt || project.title,
      width: image.width,
      height: image.height,
    })),
    url: `${SITE_URL}/portfolio/${project.slug}/`,
  };
}
