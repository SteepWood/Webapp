import { getAdminUser } from "@/lib/auth/admin";

export type AdminActionError = { ok: false; error: string };
export type AdminActionSuccess<T = void> = { ok: true; data?: T };

export async function requireAdminAction(): Promise<
  | AdminActionError
  | (AdminActionSuccess & {
      user: NonNullable<Awaited<ReturnType<typeof getAdminUser>>>;
    })
> {
  const user = await getAdminUser();

  if (!user) {
    return { ok: false, error: "You must be signed in to perform this action." };
  }

  return { ok: true, user };
}
