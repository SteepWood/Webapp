import type { Metadata } from "next";

import type {
  ResolvedLocation,
  ResolvedService,
  ResolvedServiceLocation,
} from "@/lib/services-locations/types";
import {
  isCity,
  isService,
  CITY_LABEL,
  CITY_STATE,
  NEARBY_CITIES,
  SERVICE_LABEL,
  SERVICE_SECONDARY_KEYWORDS,
} from "@/lib/seo-graph";

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
  if (isService(service.slug)) {
    const label = SERVICE_LABEL[service.slug];
    const secondary = SERVICE_SECONDARY_KEYWORDS[service.slug];
    return buildMetadata({
      title: `${label} Australia — SteepWood Custom Cabinetry Since 2014`,
      description: `${label} designed and built by SteepWood. ${secondary[0]}, ${secondary[1]} and ${secondary[2]} delivered nationally from our workshop. NSW Licence 489553C.`,
      path: `/${service.slug}/`,
    });
  }

  return buildMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/${service.slug}/`,
  });
}

export function buildLocationMetadata(location: ResolvedLocation): Metadata {
  if (isCity(location.slug)) {
    const label = CITY_LABEL[location.slug];
    const state = CITY_STATE[location.slug];
    return buildMetadata({
      title: `Custom Joinery ${label} — Cabinet Maker ${label} ${state} | SteepWood`,
      description: `Custom joinery and cabinetry in ${label} ${state}. Custom kitchens, built-in wardrobes, vanities and commercial fit-outs delivered to ${label}. NSW Licence 489553C.`,
      path: `/locations/${location.slug}/`,
    });
  }

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
  if (isService(service.slug) && isCity(location.slug)) {
    return `${SERVICE_LABEL[service.slug]} ${CITY_LABEL[location.slug]} ${CITY_STATE[location.slug]} — SteepWood Cabinet Maker`;
  }

  return `${service.shortTitle} ${location.name} — SteepWood`;
}

export function buildComboMetaDescription(
  service: ResolvedService,
  location: ResolvedLocation,
): string {
  if (isService(service.slug) && isCity(location.slug)) {
    const secondary = SERVICE_SECONDARY_KEYWORDS[service.slug];
    const cityLbl = CITY_LABEL[location.slug];
    const state = CITY_STATE[location.slug];
    return `${SERVICE_LABEL[service.slug]} in ${cityLbl} ${state}. ${secondary[0]} and ${secondary[1]} designed, built and installed by SteepWood. Free ${cityLbl} consult.`;
  }

  return `${service.shortTitle} in ${location.name} by SteepWood. Premium materials, fixed-price quote. Free design consultation.`;
}

export function buildComboH1(
  service: ResolvedService,
  location: ResolvedLocation,
): string {
  if (isService(service.slug) && isCity(location.slug)) {
    const svcLabel = SERVICE_LABEL[service.slug];
    const cityLbl = CITY_LABEL[location.slug];
    const state = CITY_STATE[location.slug];
    return `${svcLabel} ${cityLbl} — SteepWood Custom Cabinetmakers in ${cityLbl} ${state}`;
  }

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
