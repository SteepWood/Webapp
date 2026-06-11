import type { QuoteRequest } from "@prisma/client";

import { env } from "@/env";

import { getResend } from "./client";
import { buildQuoteEmailData } from "./quoteData";

export async function sendQuoteContactedEmail(
  quote: QuoteRequest,
): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] Resend not configured — skipping contacted email");
    return;
  }

  const emailData = buildQuoteEmailData(quote, env.NEXT_PUBLIC_SITE_URL);

  const html = `
    <p>Hi ${emailData.greetingName},</p>
    <p>Thanks for your SteepWood quote request (ref <strong>${emailData.reference}</strong>).</p>
    <p>We've reviewed your enquiry and will be in touch shortly to discuss your project and book a consultation if needed.</p>
    <p>If you have any questions in the meantime, reply to this email or call us during business hours.</p>
    <p>— SteepWood Joinery</p>
  `;

  await resend.emails.send({
    from: env.RESEND_FROM_EMAIL,
    to: quote.email,
    replyTo: env.QUOTE_NOTIFY_EMAIL,
    subject: `We've received your quote request — ref ${emailData.reference}`,
    html,
    tags: [
      { name: "quote_id", value: quote.id },
      { name: "email_type", value: "contacted" },
    ],
  });
}
