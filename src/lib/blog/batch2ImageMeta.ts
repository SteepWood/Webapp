import imageMetadataJson from "@/lib/blog/batch2-images/image-metadata.json";
import imageSchemaJson from "@/lib/blog/batch2-images/image-schema.json";

export type BlogImageSlot =
  | "hero"
  | "og"
  | "inline-01"
  | "inline-02"
  | "inline-wide";

export type BlogImageMetaRecord = {
  n: number;
  slug: string;
  slot: BlogImageSlot;
  file: string;
  path: string;
  url: string;
  page_url: string;
  width: number;
  height: number;
  alt: string;
  title_attr: string;
  caption: string;
  description: string;
  keywords: string[];
  creator: string;
  credit: string;
  copyright: string;
  rights_url: string;
  loading: "eager" | "lazy";
  fetchpriority?: "high" | "low" | "auto";
  sizes: string;
};

type BlogImageSchemaEntry = {
  image: Record<string, unknown>[];
  additionalImages: Record<string, unknown>[];
  openGraphImage: Record<string, unknown>;
};

const records = imageMetadataJson as BlogImageMetaRecord[];
const schemaBySlug = imageSchemaJson as Record<string, BlogImageSchemaEntry>;

const metaBySlugSlot = new Map<string, BlogImageMetaRecord>();

for (const record of records) {
  metaBySlugSlot.set(`${record.slug}:${record.slot}`, record);
}

export function getBlogImageMeta(
  slug: string,
  slot: BlogImageSlot,
): BlogImageMetaRecord | null {
  return metaBySlugSlot.get(`${slug}:${slot}`) ?? null;
}

export function getBlogImageAltsFromPack(slug: string): {
  hero: string;
  og: string;
  "inline-01": string;
  "inline-02": string;
  "inline-wide": string;
} | null {
  const hero = getBlogImageMeta(slug, "hero");
  if (!hero) {
    return null;
  }

  return {
    hero: hero.alt,
    og: getBlogImageMeta(slug, "og")?.alt ?? hero.alt,
    "inline-01": getBlogImageMeta(slug, "inline-01")?.alt ?? `${hero.alt} — detail`,
    "inline-02": getBlogImageMeta(slug, "inline-02")?.alt ?? `${hero.alt} — context`,
    "inline-wide":
      getBlogImageMeta(slug, "inline-wide")?.alt ?? `${hero.alt} — feature`,
  };
}

export function getBlogImageSchema(slug: string): BlogImageSchemaEntry | null {
  return schemaBySlug[slug] ?? null;
}
