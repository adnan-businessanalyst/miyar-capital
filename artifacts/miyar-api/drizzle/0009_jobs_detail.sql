ALTER TABLE "job_posts" ADD COLUMN IF NOT EXISTS "slug" varchar(200);
ALTER TABLE "job_posts" ADD COLUMN IF NOT EXISTS "description" text DEFAULT '' NOT NULL;
ALTER TABLE "job_posts" ADD COLUMN IF NOT EXISTS "description_ar" text;
ALTER TABLE "job_posts" ADD COLUMN IF NOT EXISTS "how_to_apply" text DEFAULT '' NOT NULL;
ALTER TABLE "job_posts" ADD COLUMN IF NOT EXISTS "how_to_apply_ar" text;

UPDATE "job_posts"
SET "slug" = lower(regexp_replace(trim("reference_code"), '[^a-zA-Z0-9]+', '-', 'g'))
WHERE "slug" IS NULL OR trim("slug") = '';

UPDATE "job_posts"
SET "slug" = 'job-' || substr(replace("id"::text, '-', ''), 1, 12)
WHERE "slug" IS NULL OR trim("slug") = '';

ALTER TABLE "job_posts" ALTER COLUMN "slug" SET NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'job_posts_slug_unique'
  ) THEN
    ALTER TABLE "job_posts" ADD CONSTRAINT "job_posts_slug_unique" UNIQUE ("slug");
  END IF;
END $$;
