import type { Metadata } from "next";

import type {
  ResolvedLocation,
  ResolvedService,
  ResolvedServiceLocation,
} from "@/lib/services-locations/types";

import { canonicalUrl } from "./canonical";

const SITE_NAME = "SteepWood";

function clampTitle(title: string, max = 60): string {
  if (title.length <= max) {
    return title;
  }

  return title.slice(0, max).trimEnd();
}

function clampDescription(
  description: string,
  min = 150,
  max = 160,
): string {
  if (description.length >= min && description.length <= max) {
    return description;
  }

  if (description.length > max) {
    return description.slice(0, max - 1).trimEnd() + "…";
  }

  const suffix = " Free design consultation.";
  let result = description;

  while (result.length < min) {
    result += suffix;
  }

  return result.slice(0, max);
}

function clampComboDescription(description: string): string {
  return clampDescription(description, 130, 160);
}

function buildOpenGraph(params: {
  title: string;
  description: string;
  path: string;
}): NonNullable<Metadata["openGraph"]> {
  return {
    title: params.title,
    description: params.description,
    url: canonicalUrl(params.path),
    siteName: SITE_NAME,
    locale: "en_AU",
    type: "website",
  };
}

function buildTwitter(
  title: string,
  description: string,
): NonNullable<Metadata["twitter"]> {
  return {
    card: "summary_large_image",
    title,
    description,
  };
}

function buildMetadata(params: {
  title: string;
  description: string;
  path: string;
  clampDescriptionFn?: (value: string) => string;
}): Metadata {
  const title = clampTitle(params.title);
  const description = (params.clampDescriptionFn ?? clampDescription)(
    params.description,
  );
  const canonical = canonicalUrl(params.path);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "en-AU": canonical,
      },
    },
    openGraph: buildOpenGraph({
      title,
      description,
      path: params.path,
    }),
    twitter: buildTwitter(title, description),
  };
}

export function buildServiceMetadata(service: ResolvedService): Metadata {
  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}/`,
  });
}

export function buildLocationMetadata(location: ResolvedLocation): Metadata {
  return buildMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}/`,
  });
}

export function buildComboMetaTitle(
  service: ResolvedService,
  location: ResolvedLocation,
): string {
  return `${service.shortTitle} ${location.name} | SteepWood Joinery`;
}

export function buildComboMetaDescription(
  service: ResolvedService,
  location: ResolvedLocation,
): string {
  return `${service.shortTitle} in ${location.name} by SteepWood. Newcastle-crafted, 20+ years experience. Premium materials, fixed-price quote. Free design consultation.`;
}

export function buildComboH1(
  service: ResolvedService,
  location: ResolvedLocation,
): string {
  return `${service.name} in ${location.name} — Custom, Crafted, Delivered`;
}

export function buildServiceLocationMetadata(
  combo: ResolvedServiceLocation,
): Metadata {
  return buildMetadata({
    title: combo.metaTitle,
    description: combo.metaDescription,
    path: `/${combo.service.slug}/${combo.location.slug}/`,
    clampDescriptionFn: clampComboDescription,
  });
}
