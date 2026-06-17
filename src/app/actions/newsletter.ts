"use server";

import { subscribeToNewsletter } from "@/lib/email/newsletter";
import { newsletterFormSchema } from "@/lib/validations/newsletter";

export type NewsletterFormState =
  | { ok: true; alreadySubscribed: boolean }
  | { ok: false; error: string };

export async function submitNewsletterForm(
  input: unknown,
): Promise<NewsletterFormState> {
  const parsed = newsletterFormSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Please enter a valid email address." };
  }

  const { email, company } = parsed.data;

  if (company) {
    return { ok: false, error: "Invalid submission." };
  }

  const result = await subscribeToNewsletter(email);

  if (!result.ok) {
    return { ok: false, error: result.error };
  }

  return { ok: true, alreadySubscribed: result.alreadySubscribed };
}
