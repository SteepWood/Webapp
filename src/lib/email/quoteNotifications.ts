import { render } from "@react-email/render";
import type { QuoteRequest } from "@prisma/client";
import { createElement } from "react";

import { env } from "@/env";
import QuoteAutoReplyEmail from "@/emails/QuoteAutoReplyEmail";
import QuoteNotificationEmail from "@/emails/QuoteNotificationEmail";

import { getResend } from "./client";
import { buildQuoteEmailData, formatQuoteReference } from "./quoteData";

export async function sendQuoteNotification(quote: QuoteRequest): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] Resend not configured — skipping quote notification");
    return;
  }

  try {
    const emailData = buildQuoteEmailData(quote, env.NEXT_PUBLIC_SITE_URL);
    const html = await render(
      createElement(QuoteNotificationEmail, emailData),
    );

    await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: env.QUOTE_NOTIFY_EMAIL,
      replyTo: quote.email,
      subject: `New quote request — ${emailData.reference} (${quote.firstName})`,
      html,
      tags: [
        { name: "quote_id", value: quote.id },
        { name: "email_type", value: "team_notification" },
      ],
    });
  } catch (error) {
    console.error("[email] Quote notification failed:", error);
  }
}

export async function sendQuoteAutoReply(quote: QuoteRequest): Promise<void> {
  const resend = getResend();
  if (!resend) {
    console.warn("[email] Resend not configured — skipping quote auto-reply");
    return;
  }

  try {
    const emailData = buildQuoteEmailData(quote, env.NEXT_PUBLIC_SITE_URL);
    const html = await render(
      createElement(QuoteAutoReplyEmail, {
        greetingName: emailData.greetingName,
        reference: emailData.reference,
      }),
    );

    const result = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: quote.email,
      replyTo: env.QUOTE_NOTIFY_EMAIL,
      subject: `Your SteepWood quote request — ref ${emailData.reference}`,
      html,
      tags: [
        { name: "quote_id", value: quote.id },
        { name: "email_type", value: "auto_reply" },
      ],
    });

    if (!result.error) {
      const { prisma } = await import("@/lib/db/prisma");
      await prisma.quoteRequest.update({
        where: { id: quote.id },
        data: { emailDeliveryStatus: "sent" },
      });
    }
  } catch (error) {
    console.error("[email] Quote auto-reply failed:", error);
  }
}

export { formatQuoteReference };
