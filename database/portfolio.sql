-- Run in Supabase SQL Editor before deploying portfolio features. No sample projects are inserted.
BEGIN;
CREATE TABLE IF NOT EXISTS "PortfolioProject" (
  "id" TEXT PRIMARY KEY,
  "slug" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "summary" TEXT NOT NULL DEFAULT '',
  "clientName" TEXT NOT NULL DEFAULT '',
  "clientLogo" TEXT NOT NULL DEFAULT '',
  "clientOverview" TEXT NOT NULL DEFAULT '',
  "industry" TEXT NOT NULL DEFAULT '',
  "location" TEXT NOT NULL DEFAULT '',
  "year" TEXT NOT NULL DEFAULT '',
  "duration" TEXT NOT NULL DEFAULT '',
  "deliveryModel" TEXT NOT NULL DEFAULT '',
  "platforms" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "solutionIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "productIds" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  "coverImage" TEXT NOT NULL DEFAULT '',
  "coverAlt" TEXT NOT NULL DEFAULT '',
  "challenge" TEXT NOT NULL DEFAULT '',
  "solution" TEXT NOT NULL DEFAULT '',
  "results" TEXT NOT NULL DEFAULT '',
  "technology" JSONB NOT NULL DEFAULT '[]'::JSONB,
  "outcomes" JSONB NOT NULL DEFAULT '[]'::JSONB,
  "gallery" JSONB NOT NULL DEFAULT '[]'::JSONB,
  "caseStudy" JSONB NOT NULL DEFAULT '{}'::jsonb,
  "galleryLayout" TEXT NOT NULL DEFAULT 'grid',
  "testimonialQuote" TEXT NOT NULL DEFAULT '',
  "testimonialName" TEXT NOT NULL DEFAULT '',
  "testimonialRole" TEXT NOT NULL DEFAULT '',
  "documentUrl" TEXT NOT NULL DEFAULT '',
  "seoTitle" TEXT NOT NULL DEFAULT '',
  "seoDescription" TEXT NOT NULL DEFAULT '',
  "ogImage" TEXT NOT NULL DEFAULT '',
  "noIndex" BOOLEAN NOT NULL DEFAULT false,
  "featured" BOOLEAN NOT NULL DEFAULT false,
  "order" INTEGER NOT NULL DEFAULT 0,
  "isDraft" BOOLEAN NOT NULL DEFAULT true,
  "publishedAt" TIMESTAMP(3),
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS "PortfolioSettings" (
  "id" TEXT PRIMARY KEY DEFAULT 'main',
  "heading" TEXT NOT NULL DEFAULT 'Connected infrastructure. Proven in practice.',
  "introduction" TEXT NOT NULL DEFAULT 'Explore the projects connecting people, assets, and operations.',
  "seoTitle" TEXT NOT NULL DEFAULT 'Projects & Case Studies | Najhum',
  "seoDescription" TEXT NOT NULL DEFAULT 'Explore Najhum projects across industrial IoT, EV charging and precision agriculture.',
  "ogImage" TEXT NOT NULL DEFAULT '',
  "noIndex" BOOLEAN NOT NULL DEFAULT false
);
CREATE UNIQUE INDEX IF NOT EXISTS "PortfolioProject_slug_key" ON "PortfolioProject"("slug");
CREATE INDEX IF NOT EXISTS "PortfolioProject_isDraft_publishedAt_idx" ON "PortfolioProject"("isDraft", "publishedAt");
INSERT INTO "PortfolioSettings" ("id") VALUES ('main') ON CONFLICT ("id") DO NOTHING;
ALTER TABLE "PortfolioProject" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "PortfolioSettings" ENABLE ROW LEVEL SECURITY;
-- Access is through the authenticated server-side Prisma connection; no anonymous write policies.
COMMIT;
