import postgres from "postgres";
import { requireDatabaseUrl } from "./dbUrl.ts";

const url = requireDatabaseUrl();

const sql = postgres(url, { max: 1 });

try {
  await sql`UPDATE contact_submissions SET phone = '' WHERE phone IS NULL`;
  await sql`ALTER TABLE contact_submissions ALTER COLUMN phone SET NOT NULL`;
  console.log("phone: NOT NULL");

  await sql`
    ALTER TABLE contact_submissions
    ADD COLUMN IF NOT EXISTS page_title varchar(300)
  `;
  console.log("page_title: ok");

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
