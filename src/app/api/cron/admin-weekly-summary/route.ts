import { NextResponse } from "next/server";

import { env } from "@/env";
import { getResend } from "@/lib/email/client";
import { verifyCronRequest } from "@/lib/cron/auth";
import { prisma } from "@/lib/db/prisma";

function startOfWeek(): Date {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(now.getDate() - diff);
  return monday;
}

export async function GET(request: Request) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const weekStart = startOfWeek();

    const [quotes, contacts, draftPosts, pendingTestimonials] =
      await Promise.all([
        prisma.quoteRequest.count({
          where: { createdAt: { gte: weekStart } },
        }),
        prisma.contactSubmission.count({
          where: { createdAt: { gte: weekStart } },
        }),
        prisma.blogPost.count({ where: { isPublished: false } }),
        prisma.testimonial.count({ where: { isVerified: false } }),
      ]);

    const html = `
      <h1>SteepWood weekly admin summary</h1>
      <p>Week starting ${weekStart.toLocaleDateString("en-AU")}</p>
      <ul>
        <li>New quote requests: <strong>${quotes}</strong></li>
        <li>Contact enquiries: <strong>${contacts}</strong></li>
        <li>Draft blog posts: <strong>${draftPosts}</strong></li>
        <li>Pending testimonials: <strong>${pendingTestimonials}</strong></li>
      </ul>
      <p><a href="${env.NEXT_PUBLIC_SITE_URL}/admin/">Open admin dashboard</a></p>
    `;

    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: env.RESEND_FROM_EMAIL,
        to: env.QUOTE_NOTIFY_EMAIL,
        subject: `SteepWood weekly summary — ${quotes} new quotes`,
        html,
      });
    }

    return NextResponse.json({
      quotes,
      contacts,
      draftPosts,
      pendingTestimonials,
    });
  } catch (error) {
    console.error("[cron/admin-weekly-summary] Failed:", error);
    return NextResponse.json(
      { error: "Could not send weekly summary." },
      { status: 500 },
    );
  }
}
