import { env } from "@/env";

import { isResendConfigured } from "./client";

export type NewsletterSubscribeResult =
  | { ok: true; alreadySubscribed: boolean }
  | { ok: false; error: string };

type ResendErrorBody = {
  message?: string;
  name?: string;
};

function isNewsletterConfigured(): boolean {
  return Boolean(
    env.RESEND_NEWSLETTER_SEGMENT_ID && env.RESEND_NEWSLETTER_TOPIC_ID,
  );
}

export async function subscribeToNewsletter(
  email: string,
): Promise<NewsletterSubscribeResult> {
  if (!isNewsletterConfigured() || !isResendConfigured()) {
    console.warn("[email] Newsletter or Resend not configured — skipping subscribe");
    return {
      ok: false,
      error: "Newsletter signup is unavailable right now. Please try again later.",
    };
  }

  const segmentId = env.RESEND_NEWSLETTER_SEGMENT_ID;
  const topicId = env.RESEND_NEWSLETTER_TOPIC_ID;

  if (!segmentId || !topicId) {
    return {
      ok: false,
      error: "Newsletter signup is unavailable right now. Please try again later.",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/contacts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        unsubscribed: false,
        segments: [{ id: segmentId }],
        topics: [{ id: topicId, subscription: "opt_in" }],
      }),
    });

    if (response.ok) {
      return { ok: true, alreadySubscribed: false };
    }

    const errorBody = (await response.json().catch(() => null)) as
      | ResendErrorBody
      | null;
    const message = errorBody?.message?.toLowerCase() ?? "";

    if (
      response.status === 409 ||
      message.includes("already") ||
      message.includes("exists") ||
      message.includes("duplicate")
    ) {
      return { ok: true, alreadySubscribed: true };
    }

    console.error("[email] Newsletter subscribe failed:", errorBody);
    return {
      ok: false,
      error: "We could not add you to the list. Please try again shortly.",
    };
  } catch (error) {
    console.error("[email] Newsletter subscribe failed:", error);
    return {
      ok: false,
      error: "We could not add you to the list. Please try again shortly.",
    };
  }
}
