import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error && error.message !== "Auth session missing!") {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }

    return NextResponse.json({
      ok: true,
      authenticated: Boolean(user),
      userId: user?.id ?? null,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Supabase auth check failed";

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
