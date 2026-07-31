import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import postgres from "postgres";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const sql = postgres(url, { max: 1 });
const body = readFileSync(join(root, "drizzle/0009_jobs_detail.sql"), "utf8");

async function main() {
  await sql.unsafe(body);
  console.log("migration 0009_jobs_detail applied");
  await sql.end();
}

main().catch(async (e) => {
  console.error(e);
  await sql.end({ timeout: 1 });
  process.exit(1);
});
