import { NextResponse } from "next/server";
import { z } from "zod";

import { getAdminUser } from "@/lib/auth/admin";
import {
  buildCmsMediaPath,
  CMS_MEDIA_BUCKET,
  createSignedUploadUrl,
  QuoteAttachmentValidationError,
  validateCmsImageUpload,
} from "@/lib/supabase/storage";

const uploadUrlRequestSchema = z.object({
  filename: z.string().min(1).max(255),
  mimeType: z.string().min(1),
  size: z.number().int().positive(),
  folder: z.enum(["blog", "portfolio"]),
});

export async function POST(request: Request) {
  const user = await getAdminUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = uploadUrlRequestSchema.parse(await request.json());
    validateCmsImageUpload({ mimeType: body.mimeType, size: body.size });

    const path = buildCmsMediaPath(body.folder, body.filename);
    const signedUpload = await createSignedUploadUrl(path, CMS_MEDIA_BUCKET);

    return NextResponse.json({
      path,
      signedUrl: signedUpload.signedUrl,
      token: signedUpload.token,
    });
  } catch (error) {
    if (error instanceof QuoteAttachmentValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid upload request." },
        { status: 400 },
      );
    }

    const message =
      error instanceof Error ? error.message : "Unable to create upload URL.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
