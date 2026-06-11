import { render } from "@react-email/render";
import { createElement } from "react";

import { env } from "@/env";
import ContactFormEmail from "@/emails/ContactFormEmail";

import { getResend } from "./client";

type ContactNotificationInput = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export async function sendContactNotification(
  input: ContactNotificationInput,
): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] Resend not configured — skipping contact notification");
    return;
  }

  try {
    const html = await render(createElement(ContactFormEmail, input));

    await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.QUOTE_NOTIFY_EMAIL,
      replyTo: input.email,
      subject: `Contact enquiry — ${input.subject} (${input.name})`,
      html,
      tags: [{ name: "email_type", value: "contact_form" }],
    });
  } catch (error) {
    console.error("[email] Contact notification failed:", error);
  }
}
