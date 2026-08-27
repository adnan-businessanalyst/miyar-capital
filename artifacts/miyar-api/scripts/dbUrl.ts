import { resolveAppEnv, resolveDatabaseUrl } from "../src/db/env.ts";

export function requireDatabaseUrl(): string {
  try {
    const url = resolveDatabaseUrl();
    console.log(`[db] target=${resolveAppEnv()}`);
    return url;
  } catch (err) {
    console.error(err instanceof Error ? err.message : err);
    process.exit(1);
  }
}
