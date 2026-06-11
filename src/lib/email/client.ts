import { Resend } from "resend";

import { env } from "@/env";

let resendClient: Resend | undefined;

export function isResendConfigured(): boolean {
  const key = env.RESEND_API_KEY;

  return Boolean(
    key &&
      !key.includes("REPLACE_WITH") &&
      (key.startsWith("re_") || key.length > 20),
  );
}

export function getResend(): Resend | null {
  if (!isResendConfigured()) {
    return null;
  }

  if (!resendClient) {
    resendClient = new Resend(env.RESEND_API_KEY);
  }

  return resendClient;
}
