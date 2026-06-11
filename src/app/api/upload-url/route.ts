import { NextResponse } from "next/server";
import { z } from "zod";

import {
  buildDraftQuoteAttachmentPath,
  createSignedUploadUrl,
  QuoteAttachmentValidationError,
  validateQuoteAttachmentUploadRequest,
} from "@/lib/supabase/storage";

const uploadUrlRequestSchema = z.object({
  filename: z.string().min(1).max(255),
  mimeType: z.string().min(1),
  size: z.number().int().positive(),
  draftId: z.string().uuid(),
  currentFileCount: z.number().int().min(0).max(5),
});

export async function POST(request: Request) {
  try {
    const body = uploadUrlRequestSchema.parse(await request.json());

    validateQuoteAttachmentUploadRequest({
      mimeType: body.mimeType,
      size: body.size,
      currentFileCount: body.currentFileCount,
    });

    const path = buildDraftQuoteAttachmentPath(body.draftId, body.filename);
    const signedUpload = await createSignedUploadUrl(path);

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
