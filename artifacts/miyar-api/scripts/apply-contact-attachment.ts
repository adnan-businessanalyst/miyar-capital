/**
 * Applies contact_submissions attachment / nullable-email changes
 * when drizzle migrate can't replay from 0000 (tables already exist).
 */
import postgres from "postgres";
import { requireDatabaseUrl } from "./dbUrl.ts";

const url = requireDatabaseUrl();

const sql = postgres(url, { max: 1 });

try {
  await sql`ALTER TABLE contact_submissions ALTER COLUMN email DROP NOT NULL`;
  console.log("email: nullable");

  await sql`
    ALTER TABLE contact_submissions
    ADD COLUMN IF NOT EXISTS attachment_name varchar(120)
  `;
  console.log("attachment_name: ok");

  await sql`
    ALTER TABLE contact_submissions
    ADD COLUMN IF NOT EXISTS attachment_mime varchar(80)
  `;
  console.log("attachment_mime: ok");

  await sql`
    ALTER TABLE contact_submissions
    ADD COLUMN IF NOT EXISTS attachment_data bytea
  `;
  console.log("attachment_data: ok");

  const cols = await sql`
    select column_name, is_nullable, data_type
    from information_schema.columns
    where table_schema = 'public' and table_name = 'contact_submissions'
    order by ordinal_position
  `;
  console.log("contact_submissions columns:");
  for (const c of cols) {
    console.log(`  ${c.column_name} ${c.data_type} nullable=${c.is_nullable}`);
  }
} finally {
  await sql.end({ timeout: 5 });
}
