import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export const ADMIN_EMAIL_DOMAIN = "@steepwood.com.au";

export function isAllowedAdminEmail(email: string | null | undefined): boolean {
  if (!email) {
    return false;
  }

  return email.trim().toLowerCase().endsWith(ADMIN_EMAIL_DOMAIN);
}

export async function getAdminUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || !isAllowedAdminEmail(user.email)) {
    return null;
  }

  return user;
}

export async function requireAdminUser() {
  const user = await getAdminUser();

  if (!user) {
    redirect("/admin/login/");
  }

  return user;
}
