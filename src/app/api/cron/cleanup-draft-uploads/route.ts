import { NextResponse } from "next/server";

import { verifyCronRequest } from "@/lib/cron/auth";
import {
  QUOTE_ATTACHMENTS_BUCKET,
} from "@/lib/supabase/storage";
import { createServiceRoleClient } from "@/lib/supabase/service-role";

const DRAFT_PREFIX = "draft-";
const MAX_AGE_MS = 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const supabase = createServiceRoleClient();
    const cutoff = Date.now() - MAX_AGE_MS;
    let deleted = 0;

    const { data: topLevel, error: listError } = await supabase.storage
      .from(QUOTE_ATTACHMENTS_BUCKET)
      .list("", { limit: 200 });

    if (listError) {
      throw listError;
    }

    for (const folder of topLevel ?? []) {
      if (!folder.name.startsWith(DRAFT_PREFIX)) {
        continue;
      }

      const folderUpdated = folder.updated_at
        ? new Date(folder.updated_at).getTime()
        : 0;

      if (folderUpdated > cutoff) {
        continue;
      }

      const { data: files, error: filesError } = await supabase.storage
        .from(QUOTE_ATTACHMENTS_BUCKET)
        .list(folder.name, { limit: 100 });

      if (filesError) {
        console.error(
          `[cron/cleanup-draft-uploads] List failed for ${folder.name}:`,
          filesError,
        );
        continue;
      }

      const paths = (files ?? []).map((file) => `${folder.name}/${file.name}`);

      if (paths.length === 0) {
        continue;
      }

      const { error: removeError } = await supabase.storage
        .from(QUOTE_ATTACHMENTS_BUCKET)
        .remove(paths);

      if (removeError) {
        console.error(
          `[cron/cleanup-draft-uploads] Remove failed for ${folder.name}:`,
          removeError,
        );
        continue;
      }

      deleted += paths.length;
    }

    return NextResponse.json({ deleted });
  } catch (error) {
    console.error("[cron/cleanup-draft-uploads] Failed:", error);
    return NextResponse.json(
      { error: "Could not clean up draft uploads." },
      { status: 500 },
    );
  }
}
