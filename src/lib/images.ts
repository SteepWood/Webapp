/** Site-wide workshop hero — replaces legacy hero-workshop.svg */
export const WORKSHOP_HERO_IMAGE = "/images/workshop-hero-main.jpg";

/** Blog index (`/blog/`) — distinct from homepage workshop hero */
export const BLOG_INDEX_HERO_IMAGE = "/images/blog/blog-index-hero.jpg";

export const LAUNCH_PACK_BLOG_SLUGS = [
  "custom-kitchen-cost-nsw-2026",
  "flat-pack-vs-custom-kitchen-australia",
  "2pac-laminate-timber-veneer-kitchen-finishes-nsw",
  "walk-in-robe-built-in-wardrobe-cost-guide-nsw",
  "questions-to-ask-custom-joiner-australia",
  "benchtop-guide-engineered-stone-ban-nsw",
] as const;

export type BlogInlineImageVariant = "inline-01" | "inline-02" | "inline-wide";

export function blogPostCoverPath(slug: string) {
  return `/blog/${slug}/hero.jpg`;
}

export function blogPostOgPath(slug: string) {
  return `/blog/${slug}/og.jpg`;
}

export function blogPostInlinePath(slug: string, variant: BlogInlineImageVariant) {
  return `/blog/${slug}/${variant}.jpg`;
}

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

/** Bump when portfolio JPGs in public/images/portfolio/ are replaced. */
const PORTFOLIO_IMAGE_CACHE_VERSION = "20250619";

export function portfolioImagePath(slug: string, variant: string) {
  return `/images/portfolio/${slug}/${variant}.jpg?v=${PORTFOLIO_IMAGE_CACHE_VERSION}`;
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
