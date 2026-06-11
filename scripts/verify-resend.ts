import { env } from "@/env";
import { getResend, isResendConfigured } from "@/lib/email/client";

async function main() {
  if (!isResendConfigured()) {
    console.error("Resend is not configured — check RESEND_API_KEY in .env.local");
    process.exit(1);
  }

  const resend = getResend();
  if (!resend) {
    console.error("Failed to initialise Resend client");
    process.exit(1);
  }

  const domains = await resend.domains.list();
  const list = domains.data?.data ?? [];

  console.log("Resend configured: yes");
  console.log(`From: ${env.RESEND_FROM_EMAIL}`);
  console.log(`Notify: ${env.QUOTE_NOTIFY_EMAIL}`);

  if (domains.error) {
    console.error("Resend API error:", domains.error);
    process.exit(1);
  }

  if (list.length === 0) {
    console.warn("No domains returned — key may be valid but domain list is empty");
  } else {
    for (const domain of list) {
      console.log(`Domain: ${domain.name} (${domain.status})`);
    }
  }
}

main().catch((error) => {
  console.error("Resend verification failed:", error);
  process.exit(1);
});
