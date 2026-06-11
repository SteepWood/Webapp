import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Webhook } from "svix";

import { env } from "@/env";
import { prisma } from "@/lib/db/prisma";

type ResendWebhookTag = {
  name: string;
  value: string;
};

type ResendWebhookPayload = {
  type: string;
  data: {
    tags?: ResendWebhookTag[];
  };
};

const DELIVERY_STATUS_BY_EVENT: Record<string, string> = {
  "email.sent": "sent",
  "email.delivered": "delivered",
  "email.bounced": "bounced",
  "email.complained": "complained",
};

function getTagValue(tags: ResendWebhookTag[] | undefined, name: string): string | null {
  return tags?.find((tag) => tag.name === name)?.value ?? null;
}

export async function POST(request: NextRequest) {
  const secret = env.RESEND_WEBHOOK_SECRET;

  if (!secret) {
    console.error("[webhook/resend] RESEND_WEBHOOK_SECRET is not configured");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const body = await request.text();
  const svixId = request.headers.get("svix-id");
  const svixTimestamp = request.headers.get("svix-timestamp");
  const svixSignature = request.headers.get("svix-signature");

  if (!svixId || !svixTimestamp || !svixSignature) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  let payload: ResendWebhookPayload;

  try {
    const webhook = new Webhook(secret);
    payload = webhook.verify(body, {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as ResendWebhookPayload;
  } catch (error) {
    console.error("[webhook/resend] Signature verification failed:", error);
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const deliveryStatus = DELIVERY_STATUS_BY_EVENT[payload.type];
  const quoteId = getTagValue(payload.data.tags, "quote_id");
  const emailType = getTagValue(payload.data.tags, "email_type");

  if (!deliveryStatus || !quoteId || emailType !== "auto_reply") {
    return NextResponse.json({ ok: true, ignored: true });
  }

  try {
    await prisma.quoteRequest.update({
      where: { id: quoteId },
      data: { emailDeliveryStatus: deliveryStatus },
    });
  } catch (error) {
    console.error("[webhook/resend] Failed to update quote delivery status:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
