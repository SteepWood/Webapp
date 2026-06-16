/** Site-wide workshop hero — replaces legacy hero-workshop.svg */
export const WORKSHOP_HERO_IMAGE = "/images/workshop-hero-main.jpg";

/** Materials & finishes section on service pillar pages */
export const MATERIALS_WORKSHOP_SAMPLES_IMAGE =
  "/images/materials-workshop-samples.jpg";

export const OG_DEFAULT_IMAGE = "/og-default.jpg";

export const WORKSHOP_GALLERY_IMAGES = [
  {
    src: "/images/workshop/assembly-bench.jpg",
    alt: "SteepWood workshop bench with timber components laid out for assembly",
    caption: "Assembly bench",
  },
  {
    src: "/images/workshop/panel-processing.jpg",
    alt: "CNC and panel processing area in the SteepWood Newcastle workshop",
    caption: "Panel processing",
  },
  {
    src: "/images/workshop/hand-finishing.jpg",
    alt: "Hand-finishing station for custom joinery doors and drawer fronts",
    caption: "Hand finishing",
  },
  {
    src: "/images/workshop/timber-storage.jpg",
    alt: "Timber storage racks in the SteepWood workshop",
    caption: "Timber storage",
  },
  {
    src: "/images/workshop/quality-inspection.jpg",
    alt: "Quality inspection area before joinery leaves the workshop",
    caption: "Quality inspection",
  },
  {
    src: "/images/workshop/dispatch-prep.jpg",
    alt: "Install team preparing cabinetry for delivery across NSW",
    caption: "Dispatch and install prep",
  },
] as const;

export function portfolioImagePath(slug: string, variant: string) {
  return `/images/portfolio/${slug}/${variant}.jpg`;
}

export function portfolioGalleryImages(
  slug: string,
  title: string,
  count = 5,
) {
  return Array.from({ length: count }, (_, index) => {
    const id = String(index + 1).padStart(2, "0");
    return {
      url: portfolioImagePath(slug, `g${id}`),
      alt: `${title} — gallery image ${index + 1}`,
    };
  });
}
