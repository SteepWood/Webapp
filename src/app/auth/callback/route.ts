import { NextResponse } from "next/server";

import { isAllowedAdminEmail } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = requestUrl.searchParams.get("next") ?? "/admin/";
  const origin = requestUrl.origin;

  const safeNext = next.startsWith("/") ? next : "/admin/";

  if (!code) {
    return NextResponse.redirect(
      `${origin}/admin/login/?error=missing_code`,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    console.error("[auth/callback] Session exchange failed:", error);
    return NextResponse.redirect(`${origin}/admin/login/?error=auth_failed`);
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAllowedAdminEmail(user?.email)) {
    await supabase.auth.signOut();
    return NextResponse.redirect(
      `${origin}/admin/login/?error=unauthorized`,
    );
  }

  return NextResponse.redirect(`${origin}${safeNext}`);
}
