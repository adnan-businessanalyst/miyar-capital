ALTER TABLE "contact_submissions"
  DROP CONSTRAINT IF EXISTS "contact_submissions_message_len";--> statement-breakpoint
ALTER TABLE "contact_submissions"
  ADD CONSTRAINT "contact_submissions_message_len"
  CHECK (char_length(btrim("message")) >= 20 AND char_length(btrim("message")) <= 300);
