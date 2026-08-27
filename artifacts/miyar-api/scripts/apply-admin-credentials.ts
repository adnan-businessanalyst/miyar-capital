import postgres from "postgres";
import { requireDatabaseUrl } from "./dbUrl.ts";

const url = requireDatabaseUrl();

const sql = postgres(url, { max: 1 });

try {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_credentials (
      id integer PRIMARY KEY DEFAULT 1 NOT NULL,
      updated_at timestamptz DEFAULT now() NOT NULL,
      password_hash text,
      reset_token_hash varchar(64),
      reset_expires_at timestamptz
    )
  `;
  await sql`
    INSERT INTO admin_credentials (id)
    VALUES (1)
    ON CONFLICT (id) DO NOTHING
  `;
  console.log("admin_credentials: ok");
} finally {
  await sql.end({ timeout: 5 });
}
