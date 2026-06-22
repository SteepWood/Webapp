import { promises as dns } from "node:dns";

const DOMAIN = "steepwood.com.au";

type DnsCheck = {
  label: string;
  status: "pass" | "warn" | "fail";
  detail: string;
};

async function lookupTxt(name: string): Promise<string[]> {
  try {
    const records = await dns.resolveTxt(name);
    return records.map((parts) => parts.join(""));
  } catch {
    return [];
  }
}

async function lookupMx(name: string): Promise<string[]> {
  try {
    const records = await dns.resolveMx(name);
    return records
      .sort((a, b) => a.priority - b.priority)
      .map((record) => `${record.priority} ${record.exchange}`);
  } catch {
    return [];
  }
}

function includesSpfInclude(records: string[], include: string): boolean {
  return records.some(
    (record) => record.startsWith("v=spf1") && record.includes(include),
  );
}

async function main() {
  const checks: DnsCheck[] = [];

  const rootTxt = await lookupTxt(DOMAIN);
  const sendTxt = await lookupTxt(`send.${DOMAIN}`);
  const dmarcTxt = await lookupTxt(`_dmarc.${DOMAIN}`);
  const dkimTxt = await lookupTxt(`resend._domainkey.${DOMAIN}`);
  const mx = await lookupMx(DOMAIN);

  if (mx.length > 0) {
    checks.push({
      label: "MX (inbound mail)",
      status: "pass",
      detail: mx.join("; "),
    });
  } else {
    checks.push({
      label: "MX (inbound mail)",
      status: "fail",
      detail: "No MX records found — hello@ / sukhveer@ cannot receive mail.",
    });
  }

  if (includesSpfInclude(sendTxt, "amazonses.com")) {
    checks.push({
      label: "SPF — send subdomain (Resend outbound)",
      status: "pass",
      detail: sendTxt.find((record) => record.startsWith("v=spf1")) ?? "",
    });
  } else {
    checks.push({
      label: "SPF — send subdomain (Resend outbound)",
      status: "fail",
      detail:
        "Missing send.steepwood.com.au TXT with include:amazonses.com — Resend outbound may fail SPF.",
    });
  }

  const rootSpf = rootTxt.find((record) => record.startsWith("v=spf1"));
  if (rootSpf) {
    const hasWorkspaceSpf =
      rootSpf.includes("secureserver.net") ||
      rootSpf.includes("spf.protection.outlook.com");
    checks.push({
      label: "SPF — root domain (workspace inboxes)",
      status: hasWorkspaceSpf ? "pass" : "warn",
      detail: rootSpf,
    });
  } else {
    checks.push({
      label: "SPF — root domain",
      status: "warn",
      detail: "No root SPF TXT record found.",
    });
  }

  if (dkimTxt.some((record) => record.startsWith("p="))) {
    checks.push({
      label: "DKIM — resend._domainkey",
      status: "pass",
      detail: "Resend DKIM public key present.",
    });
  } else {
    checks.push({
      label: "DKIM — resend._domainkey",
      status: "fail",
      detail: "Missing Resend DKIM TXT record.",
    });
  }

  if (dmarcTxt.some((record) => record.startsWith("v=DMARC1"))) {
    checks.push({
      label: "DMARC",
      status: "pass",
      detail: dmarcTxt.find((record) => record.startsWith("v=DMARC1")) ?? "",
    });
  } else {
    checks.push({
      label: "DMARC",
      status: "warn",
      detail:
        "No _dmarc TXT record. Recommended: v=DMARC1; p=quarantine; rua=mailto:dmarc@steepwood.com.au;",
    });
  }

  console.log(`Email DNS checks for ${DOMAIN}\n`);
  for (const check of checks) {
    const icon =
      check.status === "pass" ? "✓" : check.status === "warn" ? "!" : "✗";
    console.log(`${icon} ${check.label}`);
    console.log(`  ${check.detail}\n`);
  }

  const failures = checks.filter((check) => check.status === "fail");
  if (failures.length > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error("DNS check failed:", error);
  process.exit(1);
});
