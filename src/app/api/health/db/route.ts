import { NextResponse } from "next/server";

import { prisma } from "@/lib/db/prisma";

export async function GET() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const services = await prisma.service.findMany({
      take: 5,
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({
      ok: true,
      serviceCount: services.length,
      services,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Database connection failed";

    return NextResponse.json(
      {
        ok: false,
        error: message,
        hint: "Check DATABASE_URL and DIRECT_URL in .env.local",
      },
      { status: 500 },
    );
  }
}
