import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const isDev = process.env.NODE_ENV === "development";

function rejectPlaceholder(message: string) {
  return (value: string) =>
    isDev && value.includes("REPLACE_WITH") ? true : !value.includes("REPLACE_WITH");
}

export const env = createEnv({
  server: {
    SUPABASE_SERVICE_ROLE_KEY: z
      .string()
      .min(1)
      .refine(
        rejectPlaceholder(
          "SUPABASE_SERVICE_ROLE_KEY is still a placeholder — run pnpm setup:db",
        ),
        "SUPABASE_SERVICE_ROLE_KEY is still a placeholder — run pnpm setup:db",
      ),
    DATABASE_URL: z
      .string()
      .url()
      .refine(
        (value) =>
          value.startsWith("postgresql://") || value.startsWith("postgres://"),
        "DATABASE_URL must be a PostgreSQL connection string",
      )
      .refine(
        (value) => !value.includes("REPLACE_WITH"),
        "DATABASE_URL is still a placeholder — run pnpm setup:db",
      ),
    DIRECT_URL: z
      .string()
      .url()
      .refine(
        (value) =>
          value.startsWith("postgresql://") || value.startsWith("postgres://"),
        "DIRECT_URL must be a PostgreSQL connection string",
      )
      .refine(
        (value) => !value.includes("REPLACE_WITH"),
        "DIRECT_URL is still a placeholder — run pnpm setup:db",
      ),
    RESEND_API_KEY: z
      .string()
      .min(1)
      .refine(
        (value) => value.startsWith("re_"),
        "RESEND_API_KEY must start with re_",
      ),

    RESEND_FROM_EMAIL: z.string().email(),
    QUOTE_NOTIFY_EMAIL: z.string().email(),
    RESEND_WEBHOOK_SECRET: z.string().min(1).optional(),
    CRON_SECRET: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(20).optional(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20).optional(),
    NEXT_PUBLIC_SITE_URL: z.string().url(),
    NEXT_PUBLIC_GA4_ID: z.string().optional(),
  },
  runtimeEnv: {
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL,
    QUOTE_NOTIFY_EMAIL: process.env.QUOTE_NOTIFY_EMAIL,
    RESEND_WEBHOOK_SECRET: process.env.RESEND_WEBHOOK_SECRET,
    CRON_SECRET: process.env.CRON_SECRET,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_GA4_ID: process.env.NEXT_PUBLIC_GA4_ID,
  },
  emptyStringAsUndefined: true,
});

if (process.argv[1]?.includes("env.ts")) {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    throw new Error(
      "Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY",
    );
  }

  console.log("Environment variables validated successfully.");
}
