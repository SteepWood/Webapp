"use server";

import { prisma } from "@/lib/db/prisma";
import { sendContactNotification } from "@/lib/email/contactNotifications";
import { contactFormSchema } from "@/lib/validations/contact";

export type ContactFormState =
  | { ok: true }
  | { ok: false; error: string };

export async function submitContactForm(
  input: unknown,
): Promise<ContactFormState> {
  const parsed = contactFormSchema.safeParse(input);

  if (!parsed.success) {
    return { ok: false, error: "Please check the form and try again." };
  }

  const { name, email, phone, subject, message, company } = parsed.data;

  if (company) {
    return { ok: false, error: "Invalid submission." };
  }

  const fullMessage = `Subject: ${subject}\n\n${message}`;

  try {
    await prisma.contactSubmission.create({
      data: {
        name,
        email,
        phone: phone || null,
        message: fullMessage,
        status: "new",
      },
    });

    await sendContactNotification({
      name,
      email,
      phone: phone || undefined,
      subject,
      message,
    });

    return { ok: true };
  } catch (error) {
    console.error("[contact] Submission failed:", error);
    return {
      ok: false,
      error:
        "We could not save your enquiry right now. Please call us instead.",
    };
  }
}
