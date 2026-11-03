BEGIN;
-- Additive update: preserves every existing portfolio project and its content.
ALTER TABLE public."PortfolioProject"
  ADD COLUMN IF NOT EXISTS "caseStudy" JSONB NOT NULL DEFAULT '{}'::jsonb;
COMMIT;
