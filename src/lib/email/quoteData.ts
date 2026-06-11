import type { QuoteRequest } from "@prisma/client";

import { LOCATIONS } from "@/lib/services-locations/locations";
import { SERVICES } from "@/lib/services-locations/services";

export type QuoteDetails = {
  preferredContact?: string;
  timeframe?: string;
  propertyType?: string;
  locationSlug?: string;
  projectDescription?: string;
  consentMarketing?: boolean;
};

export type QuoteAttachmentMeta = {
  url: string;
  name: string;
  mimeType?: string;
  size?: number;
};

export type ParsedQuoteEmailData = {
  reference: string;
  firstName: string;
  greetingName: string;
  services: string;
  scope: string;
  suburb: string;
  locationName: string;
  propertyType: string;
  budgetRange: string;
  timeframe: string;
  preferredContact: string;
  marketingOptIn: boolean;
  projectDescription: string;
  attachments: QuoteAttachmentMeta[];
  adminUrl: string;
};

export function formatQuoteReference(id: string): string {
  return id.replace(/-/g, "").slice(0, 8).toUpperCase();
}

export function parseQuoteDetails(quote: QuoteRequest): QuoteDetails {
  if (!quote.bestTimeToCall) {
    return {};
  }

  try {
    return JSON.parse(quote.bestTimeToCall) as QuoteDetails;
  } catch {
    return { preferredContact: quote.bestTimeToCall };
  }
}

export function parseQuoteAttachments(quote: QuoteRequest): QuoteAttachmentMeta[] {
  if (!Array.isArray(quote.attachmentUrls)) {
    return [];
  }

  return quote.attachmentUrls as QuoteAttachmentMeta[];
}

function serviceLabels(projectType: string): string {
  return projectType
    .split(", ")
    .map(
      (slug) =>
        SERVICES.find((service) => service.slug === slug)?.shortTitle ?? slug,
    )
    .join(", ");
}

function locationLabel(details: QuoteDetails): string {
  if (!details.locationSlug) {
    return "";
  }

  return (
    LOCATIONS.find((location) => location.slug === details.locationSlug)?.name ??
    details.locationSlug
  );
}

export function buildQuoteEmailData(
  quote: QuoteRequest,
  siteUrl: string,
): ParsedQuoteEmailData {
  const details = parseQuoteDetails(quote);
  const attachments = parseQuoteAttachments(quote);
  const reference = formatQuoteReference(quote.id);
  const greetingName = quote.firstName.split(" ")[0] || quote.firstName;

  return {
    reference,
    firstName: quote.firstName,
    greetingName,
    services: serviceLabels(quote.projectType),
    scope: quote.projectScope ?? "—",
    suburb: quote.suburb,
    locationName: locationLabel(details),
    propertyType: details.propertyType ?? "—",
    budgetRange: quote.budgetRange ?? "—",
    timeframe: details.timeframe ?? "—",
    preferredContact: details.preferredContact ?? "—",
    marketingOptIn: Boolean(details.consentMarketing),
    projectDescription: details.projectDescription ?? "—",
    attachments,
    adminUrl: `${siteUrl}/admin/quotes/${quote.id}/`,
  };
}
