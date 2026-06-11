import { env } from "@/env";

export function canonicalUrl(path: string): string {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  let normalised = path.trim();

  if (!normalised.startsWith("/")) {
    normalised = `/${normalised}`;
  }

  normalised = normalised.replace(/\/{2,}/g, "/");

  if (normalised !== "/" && !normalised.endsWith("/")) {
    normalised = `${normalised}/`;
  }

  return `${base}${normalised}`;
}
