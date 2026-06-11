import { NextResponse } from "next/server";

import { revalidateBlogPaths } from "@/lib/admin/revalidate";
import { verifyCronRequest } from "@/lib/cron/auth";
import { prisma } from "@/lib/db/prisma";

export async function GET(request: Request) {
  if (!verifyCronRequest(request)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const duePosts = await prisma.blogPost.findMany({
      where: {
        isPublished: false,
        publishedAt: {
          lte: new Date(),
          not: null,
        },
      },
      select: { id: true, slug: true },
    });

    for (const post of duePosts) {
      await prisma.blogPost.update({
        where: { id: post.id },
        data: { isPublished: true },
      });
      revalidateBlogPaths(post.slug);
    }

    revalidateBlogPaths();

    return NextResponse.json({ published: duePosts.length });
  } catch (error) {
    console.error("[cron/publish-scheduled-posts] Failed:", error);
    return NextResponse.json(
      { error: "Could not publish scheduled posts." },
      { status: 500 },
    );
  }
}
