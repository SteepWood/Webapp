import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

import { verifyCronRequest } from "@/lib/cron/auth";

const FRESHNESS_PATHS = [
  "/",
  "/about/",
  "/contact/",
  "/custom-kitchen-joinery/",
  "/locations/sydney/",
  "/locations/newcastle/",
] as const;

export async function GET(request: Request) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    for (const path of FRESHNESS_PATHS) {
      revalidatePath(path);
    }

    return NextResponse.json({
      revalidated: FRESHNESS_PATHS.length,
      refreshedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[cron/refresh-content] Failed:", error);
    return NextResponse.json(
      { error: "Could not refresh content." },
      { status: 500 },
    );
  }
}
