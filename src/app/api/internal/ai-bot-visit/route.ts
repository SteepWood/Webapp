import { NextResponse } from "next/server";
import { z } from "zod";

import { prisma } from "@/lib/db/prisma";

const payloadSchema = z.object({
  userAgent: z.string().min(1).max(512),
  path: z.string().min(1).max(512),
  ipHash: z.string().max(64).nullable().optional(),
});

export async function POST(request: Request) {
  try {
    const body = payloadSchema.parse(await request.json());

    await prisma.aiBotVisit.create({
      data: {
        userAgent: body.userAgent,
        path: body.path,
        ipHash: body.ipHash ?? null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid payload." }, { status: 400 });
    }

    console.error("[internal/ai-bot-visit] Failed:", error);
    return NextResponse.json({ error: "Could not log visit." }, { status: 500 });
  }
}
