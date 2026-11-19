-- Run in Supabase SQL Editor BEFORE deploying the updated application.
-- Adds independent listing visibility. No content is deleted or archived.
-- Existing published pages stay listed; newly created pages default to unlisted.
-- Safe to rerun: previously chosen listing preferences are preserved.
BEGIN;
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Solution' AND column_name = 'isListed') THEN
    ALTER TABLE public."Solution" ADD COLUMN "isListed" BOOLEAN NOT NULL DEFAULT false;
    UPDATE public."Solution" SET "isListed" = true WHERE "isDraft" = false;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Product' AND column_name = 'isListed') THEN
    ALTER TABLE public."Product" ADD COLUMN "isListed" BOOLEAN NOT NULL DEFAULT false;
    UPDATE public."Product" SET "isListed" = true WHERE "isDraft" = false;
  END IF;
END $$;
COMMIT;
