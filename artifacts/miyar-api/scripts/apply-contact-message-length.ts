import postgres from "postgres";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL missing");
  process.exit(1);
}

const sql = postgres(url, { max: 1 });

try {
  // Soften any legacy rows that would violate the new check.
  await sql`
    UPDATE contact_submissions
    SET message = left(btrim(message) || repeat('.', greatest(0, 20 - char_length(btrim(message)))), 300)
    WHERE char_length(btrim(message)) < 20
       OR char_length(btrim(message)) > 300
  `;

  await sql`
    ALTER TABLE contact_submissions
    DROP CONSTRAINT IF EXISTS contact_submissions_message_len
  `;
  await sql`
    ALTER TABLE contact_submissions
    ADD CONSTRAINT contact_submissions_message_len
    CHECK (
      char_length(btrim(message)) >= 20
      AND char_length(btrim(message)) <= 300
    )
  `;
  console.log("contact_submissions_message_len: ok (20–300)");
} finally {
  await sql.end({ timeout: 5 });
}
