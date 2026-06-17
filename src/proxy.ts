import { type NextRequest } from "next/server";

import { hashIpForLog, isAiBotUserAgent } from "@/lib/aio/botAgents";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const userAgent = request.headers.get("user-agent");

  if (isAiBotUserAgent(userAgent)) {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      request.headers.get("x-real-ip");
    const origin = request.nextUrl.origin;

    void fetch(`${origin}/api/internal/ai-bot-visit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userAgent: userAgent ?? "unknown",
        path: request.nextUrl.pathname,
        ipHash: hashIpForLog(ip),
      }),
    }).catch(() => undefined);
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
