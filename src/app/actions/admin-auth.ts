"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { env } from "@/env";
import { isAllowedAdminEmail } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export type AdminAuthState =
  | { ok: true }
  | { ok: false; error: string };

/**
 * Prefer the live request host so production magic links never point at localhost
 * when NEXT_PUBLIC_SITE_URL is still set to a local dev URL.
 */
async function resolveAuthSiteUrl(): Promise<string> {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const proto = headerStore.get("x-forwarded-proto") ?? "https";

  if (host && !host.includes("localhost") && !host.startsWith("127.0.0.1")) {
    return `${proto}://${host}`;
  }

  return env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
}

export async function sendAdminMagicLink(
  input: unknown,
): Promise<AdminAuthState> {
  const email =
    typeof input === "object" &&
    input !== null &&
    "email" in input &&
    typeof input.email === "string"
      ? input.email.trim().toLowerCase()
      : "";

  if (!email || !email.includes("@")) {
    return { ok: false, error: "Enter a valid email address." };
  }

  if (!isAllowedAdminEmail(email)) {
    return {
      ok: false,
      error: "Only @steepwood.com.au email addresses can access the admin panel.",
    };
  }

  const supabase = await createClient();
  const siteUrl = await resolveAuthSiteUrl();
  const redirectTo = new URL("/auth/callback", siteUrl);
  redirectTo.searchParams.set("next", "/admin/");

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo.toString(),
      shouldCreateUser: false,
    },
  });

  if (error) {
    console.error("[admin-auth] Magic link failed:", error);
    return {
      ok: false,
      error:
        "We could not send a login link. Confirm your email is registered in Supabase Auth.",
    };
  }

  return { ok: true };
}

export async function adminSignOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login/");
}
