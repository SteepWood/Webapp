import { createBrowserClient } from "@supabase/ssr";

import { env } from "@/env";

import type { Database } from "./database.types";
import { getSupabasePublicKey } from "./public-key";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function createClient() {
  if (!browserClient) {
    browserClient = createBrowserClient<Database>(
      env.NEXT_PUBLIC_SUPABASE_URL,
      getSupabasePublicKey(),
    );
  }

  return browserClient;
}
