import { randomUUID } from "node:crypto";

import { createServiceRoleClient } from "@/lib/supabase/service-role";

export const QUOTE_ATTACHMENTS_BUCKET = "quote-attachments";
export const CMS_MEDIA_BUCKET = "cms-media";

export const ALLOWED_CMS_IMAGE_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_CMS_IMAGE_BYTES = 10 * 1024 * 1024;

export const ALLOWED_QUOTE_ATTACHMENT_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
] as const;

export const MAX_QUOTE_ATTACHMENT_BYTES = 10 * 1024 * 1024;
export const MAX_QUOTE_ATTACHMENTS_PER_REQUEST = 5;

export type AllowedQuoteAttachmentMimeType =
  (typeof ALLOWED_QUOTE_ATTACHMENT_MIME_TYPES)[number];

export class QuoteAttachmentValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "QuoteAttachmentValidationError";
  }
}

export function validateQuoteAttachmentFile(file: File) {
  if (!ALLOWED_QUOTE_ATTACHMENT_MIME_TYPES.includes(file.type as AllowedQuoteAttachmentMimeType)) {
    throw new QuoteAttachmentValidationError(
      "Unsupported file type. Allowed types: JPEG, PNG, WebP, and PDF.",
    );
  }

  if (file.size > MAX_QUOTE_ATTACHMENT_BYTES) {
    throw new QuoteAttachmentValidationError(
      "File exceeds the 10 MB limit per attachment.",
    );
  }
}

export function validateQuoteAttachmentCount(count: number) {
  if (count > MAX_QUOTE_ATTACHMENTS_PER_REQUEST) {
    throw new QuoteAttachmentValidationError(
      "A maximum of 5 attachments is allowed per quote request.",
    );
  }
}

export function buildQuoteAttachmentPath(
  quoteRequestId: string,
  filename: string,
) {
  const sanitisedName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");

  return `${quoteRequestId}/${randomUUID()}-${sanitisedName}`;
}

export function buildDraftQuoteAttachmentPath(
  draftId: string,
  filename: string,
) {
  const sanitisedName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");

  return `draft-${draftId}/${randomUUID()}-${sanitisedName}`;
}

export function validateQuoteAttachmentUploadRequest(input: {
  mimeType: string;
  size: number;
  currentFileCount: number;
}) {
  if (
    !ALLOWED_QUOTE_ATTACHMENT_MIME_TYPES.includes(
      input.mimeType as AllowedQuoteAttachmentMimeType,
    )
  ) {
    throw new QuoteAttachmentValidationError(
      "Format not supported. Use JPG, PNG, WebP, or PDF.",
    );
  }

  if (input.size > MAX_QUOTE_ATTACHMENT_BYTES) {
    throw new QuoteAttachmentValidationError("File too large. Maximum size is 10 MB.");
  }

  if (input.currentFileCount >= MAX_QUOTE_ATTACHMENTS_PER_REQUEST) {
    throw new QuoteAttachmentValidationError(
      "A maximum of 5 attachments is allowed per quote request.",
    );
  }
}

export async function createSignedReadUrl(path: string, expiresIn = 60 * 60) {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase.storage
    .from(QUOTE_ATTACHMENTS_BUCKET)
    .createSignedUrl(path, expiresIn);

  if (error) {
    throw error;
  }

  return data.signedUrl;
}

export async function createSignedUploadUrl(
  path: string,
  bucket = QUOTE_ATTACHMENTS_BUCKET,
) {
  const supabase = createServiceRoleClient();

  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUploadUrl(path);

  if (error) {
    throw error;
  }

  return data;
}

export function buildCmsMediaPath(folder: string, filename: string) {
  const sanitisedName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  return `${folder}/${randomUUID()}-${sanitisedName}`;
}

export function validateCmsImageUpload(input: {
  mimeType: string;
  size: number;
}) {
  if (
    !ALLOWED_CMS_IMAGE_MIME_TYPES.includes(
      input.mimeType as (typeof ALLOWED_CMS_IMAGE_MIME_TYPES)[number],
    )
  ) {
    throw new QuoteAttachmentValidationError(
      "Unsupported image type. Use JPEG, PNG, or WebP.",
    );
  }

  if (input.size > MAX_CMS_IMAGE_BYTES) {
    throw new QuoteAttachmentValidationError("Image exceeds the 10 MB limit.");
  }
}

export function getPublicCmsMediaUrl(path: string, supabaseUrl: string) {
  const base = supabaseUrl.replace(/\/$/, "");
  return `${base}/storage/v1/object/public/${CMS_MEDIA_BUCKET}/${path}`;
}

export async function uploadQuoteAttachment(
  file: File,
  quoteRequestId: string,
) {
  validateQuoteAttachmentFile(file);

  const path = buildQuoteAttachmentPath(quoteRequestId, file.name);
  const supabase = createServiceRoleClient();

  const { error: uploadError } = await supabase.storage
    .from(QUOTE_ATTACHMENTS_BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data, error: signedUrlError } = await supabase.storage
    .from(QUOTE_ATTACHMENTS_BUCKET)
    .createSignedUrl(path, 60 * 60);

  if (signedUrlError) {
    throw signedUrlError;
  }

  return {
    path,
    signedUrl: data.signedUrl,
  };
}
