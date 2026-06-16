import Link from "@/components/ui/link";
import { redirect } from "next/navigation";

import { SteepWoodLogo } from "@/components/brand/SteepWoodLogo";
import { getAdminUser } from "@/lib/auth/admin";

import { AdminLoginForm } from "../_components/AdminLoginForm";

const ERROR_MESSAGES: Record<string, string> = {
  unauthorized:
    "That email is not authorised for admin access. Only @steepwood.com.au accounts are allowed.",
  auth_failed: "We could not verify your login link. Request a new one and try again.",
  missing_code: "The login link was incomplete. Request a new magic link.",
};

type AdminLoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const user = await getAdminUser();
  if (user) {
    redirect("/admin/");
  }

  const params = await searchParams;
  const errorMessage = params.error ? ERROR_MESSAGES[params.error] : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-900 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <SteepWoodLogo
            variant="mark"
            theme="dark"
            className="mx-auto justify-center text-ink-50"
          />
          <h1 className="mt-6 font-serif text-display-3 text-ink-50">
            Admin sign in
          </h1>
          <p className="mt-2 text-body-sm text-ink-50/70">
            Magic link login for SteepWood team members.
          </p>
        </div>

        {errorMessage ? (
          <p
            role="alert"
            className="mb-4 rounded-md border border-error/30 bg-error/10 px-4 py-3 text-body-sm text-error"
          >
            {errorMessage}
          </p>
        ) : null}

        <AdminLoginForm />

        <p className="mt-6 text-center text-body-sm text-ink-50/60">
          <Link href="/" className="underline-offset-4 hover:underline">
            Back to website
          </Link>
        </p>
      </div>
    </div>
  );
}
