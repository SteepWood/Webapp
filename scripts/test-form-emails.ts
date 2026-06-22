import { render } from "@react-email/render";
import { createElement } from "react";

import { env } from "@/env";
import ContactFormEmail from "@/emails/ContactFormEmail";
import QuoteAutoReplyEmail from "@/emails/QuoteAutoReplyEmail";
import QuoteNotificationEmail from "@/emails/QuoteNotificationEmail";
import { getResend, isResendConfigured } from "@/lib/email/client";

const testRecipient =
  process.argv.find((arg) => arg.startsWith("--to="))?.slice(5)?.trim() ??
  "sukhveer@steepwood.com.au";

async function main() {
  if (!isResendConfigured()) {
    console.error("Resend is not configured — set RESEND_API_KEY in .env.local");
    process.exit(1);
  }

  const resend = getResend();
  if (!resend) {
    console.error("Failed to initialise Resend client");
    process.exit(1);
  }

  const stamp = new Date().toISOString().slice(0, 19).replace("T", " ");
  const reference = `TEST-${Date.now().toString(36).toUpperCase()}`;

  console.log("Sending form email test bundle…");
  console.log(`From: ${env.RESEND_FROM_EMAIL}`);
  console.log(`Team inbox: ${env.QUOTE_NOTIFY_EMAIL}`);
  console.log(`Test customer inbox: ${testRecipient}\n`);

  const contactHtml = await render(
    createElement(ContactFormEmail, {
      name: "SteepWood DNS Test",
      email: testRecipient,
      phone: "0468 387 676",
      subject: "General enquiry",
      message: `Automated contact form email test at ${stamp}. Safe to delete.`,
    }),
  );

  const quoteNotificationHtml = await render(
    createElement(QuoteNotificationEmail, {
      reference,
      firstName: "SteepWood DNS Test",
      greetingName: "SteepWood",
      services: "Custom Kitchens",
      scope: "Full kitchen",
      suburb: "Merewether, Newcastle",
      locationName: "Newcastle",
      propertyType: "House",
      budgetRange: "$25,000 – $40,000",
      timeframe: "3–6 months",
      preferredContact: "Email",
      marketingOptIn: false,
      projectDescription: `Automated quote notification test at ${stamp}.`,
      attachments: [],
      adminUrl: `${env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/admin/quotes/`,
    }),
  );

  const quoteAutoReplyHtml = await render(
    createElement(QuoteAutoReplyEmail, {
      greetingName: "SteepWood",
      reference,
    }),
  );

  const sends = [
    {
      label: "Contact notification → team",
      payload: {
        from: env.RESEND_FROM_EMAIL,
        to: env.QUOTE_NOTIFY_EMAIL,
        replyTo: testRecipient,
        subject: `[TEST] Contact enquiry — General enquiry (SteepWood DNS Test)`,
        html: contactHtml,
        tags: [{ name: "email_type", value: "contact_form_test" }],
      },
    },
    {
      label: "Quote notification → team",
      payload: {
        from: env.RESEND_FROM_EMAIL,
        to: env.QUOTE_NOTIFY_EMAIL,
        replyTo: testRecipient,
        subject: `[TEST] New quote request — ${reference} (SteepWood DNS Test)`,
        html: quoteNotificationHtml,
        tags: [{ name: "email_type", value: "quote_notification_test" }],
      },
    },
    {
      label: "Quote auto-reply → customer",
      payload: {
        from: env.RESEND_FROM_EMAIL,
        to: testRecipient,
        replyTo: env.QUOTE_NOTIFY_EMAIL,
        subject: `[TEST] Your SteepWood quote request — ref ${reference}`,
        html: quoteAutoReplyHtml,
        tags: [{ name: "email_type", value: "quote_auto_reply_test" }],
      },
    },
  ];

  const pause = (ms: number) =>
    new Promise<void>((resolve) => {
      setTimeout(resolve, ms);
    });

  for (const send of sends) {
    const result = await resend.emails.send(send.payload);

    if (result.error) {
      console.error(`✗ ${send.label}`);
      console.error(`  ${result.error.message}`);
      process.exitCode = 1;
      continue;
    }

    console.log(`✓ ${send.label}`);
    console.log(`  Resend id: ${result.data?.id ?? "unknown"}\n`);
    await pause(600);
  }

  console.log("Done. Check both inboxes (and spam) within 2 minutes.");
  console.log("Resend dashboard → Logs will show delivery status.");
}

main().catch((error) => {
  console.error("Form email test failed:", error);
  process.exit(1);
});
