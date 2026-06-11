import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import {
  buildQuoteAttachmentPath,
  createSignedUploadUrl,
} from "@/lib/supabase/storage";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const supabase = await createClient();
    const { count, error: countError } = await supabase
      .from("services")
      .select("id", { count: "exact", head: true });

    if (countError) {
      return NextResponse.json(
        { ok: false, error: countError.message },
        { status: 500 },
      );
    }

    const testPath = buildQuoteAttachmentPath(
      "health-check",
      "sample-attachment.pdf",
    );
    const signedUpload = await createSignedUploadUrl(testPath);

    return NextResponse.json({
      ok: true,
      typedQueryWorks: true,
      serviceCount: count ?? 0,
      signedUploadPath: testPath,
      signedUploadUrl: signedUpload.signedUrl,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Storage health check failed";

    return NextResponse.json(
      {
        ok: false,
        error: message,
        hint: "Ensure SUPABASE_SERVICE_ROLE_KEY is set in .env.local",
      },
      { status: 500 },
    );
  }
}
