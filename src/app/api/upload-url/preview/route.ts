import { NextResponse } from "next/server";
import { z } from "zod";

import { createSignedReadUrl } from "@/lib/supabase/storage";

const previewRequestSchema = z.object({
  path: z.string().min(1),
});

export async function POST(request: Request) {
  try {
    const body = previewRequestSchema.parse(await request.json());

    if (!body.path.startsWith("draft-")) {
      return NextResponse.json({ error: "Invalid file path." }, { status: 400 });
    }

    const previewUrl = await createSignedReadUrl(body.path);

    return NextResponse.json({ previewUrl });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid preview request." }, { status: 400 });
    }

    const message =
      error instanceof Error ? error.message : "Unable to create preview URL.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
