import { createInterface } from "node:readline/promises";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const PROJECT_REF = "uqumesylnwumwxgoukpn";
const REGION = "ap-southeast-1";
const ENV_PATH = path.join(process.cwd(), ".env.local");

function encodePassword(password: string): string {
  return encodeURIComponent(password);
}

function buildDatabaseUrls(password: string) {
  const encoded = encodePassword(password);

  return {
    databaseUrl: `postgresql://postgres.${PROJECT_REF}:${encoded}@aws-1-${REGION}.pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1`,
    directUrl: `postgresql://postgres:${encoded}@db.${PROJECT_REF}.supabase.co:5432/postgres`,
  };
}

function upsertEnvLine(content: string, key: string, value: string): string {
  const line = `${key}=${value}`;
  const pattern = new RegExp(`^${key}=.*$`, "m");

  if (pattern.test(content)) {
    return content.replace(pattern, line);
  }

  return `${content.trimEnd()}\n${line}\n`;
}

async function main() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("SteepWood Supabase local setup");
  console.log(`Project: ${PROJECT_REF} (${REGION})`);
  console.log("");
  console.log(
    "Get credentials from Supabase Dashboard → Project Settings:",
  );
  console.log("  • Database password → Database → Connection string");
  console.log("  • Service role key  → API → service_role (secret)");
  console.log("");

  const dbPassword = await rl.question("Database password: ");
  const serviceRoleKey = await rl.question("Service role key: ");

  rl.close();

  if (!dbPassword.trim() || !serviceRoleKey.trim()) {
    console.error("Both values are required.");
    process.exit(1);
  }

  const { databaseUrl, directUrl } = buildDatabaseUrls(dbPassword.trim());

  let envContent = await readFile(ENV_PATH, "utf8");
  envContent = upsertEnvLine(envContent, "DATABASE_URL", databaseUrl);
  envContent = upsertEnvLine(envContent, "DIRECT_URL", directUrl);
  envContent = upsertEnvLine(
    envContent,
    "SUPABASE_SERVICE_ROLE_KEY",
    serviceRoleKey.trim(),
  );

  await writeFile(ENV_PATH, envContent, "utf8");

  console.log("");
  console.log("Updated .env.local with DATABASE_URL, DIRECT_URL, and SUPABASE_SERVICE_ROLE_KEY.");
  console.log("Next steps:");
  console.log("  pnpm check:env");
  console.log("  pnpm db:seed");
  console.log("  pnpm dev");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
