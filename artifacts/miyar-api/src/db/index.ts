import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { resolveAppEnv, resolveDatabaseUrl } from "./env.js";
import * as schema from "./schema.js";

let client: ReturnType<typeof postgres> | null = null;
let db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  const url = resolveDatabaseUrl();
  if (!db) {
    console.log(`[db] using ${resolveAppEnv()} database`);
    client = postgres(url, { prepare: false, max: 5 });
    db = drizzle(client, { schema });
  }
  return db;
}
