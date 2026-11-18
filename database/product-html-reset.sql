-- Run SECOND, after product-html-import.sql.
-- Permanently deletes ALL old product records, published AND drafts. NO BACKUP/ARCHIVE.
-- New HTML-imported products are excluded, so a rerun does not wipe your new catalogue.
-- Product category/filter definitions, solutions, portfolio pages and leads remain.
BEGIN;
UPDATE public."PortfolioProject" p SET "productIds" = ARRAY(
 SELECT entry FROM unnest(p."productIds") AS entry
 WHERE entry NOT IN (SELECT "id" FROM public."Product" WHERE "contentMode"='LEGACY')
) WHERE cardinality(p."productIds") > 0;
DELETE FROM public."Product" WHERE "contentMode"='LEGACY';
COMMIT;
-- SQL deletes database records only. Existing R2/Blob files are left untouched,
-- because files can be shared with other pages. This script creates no backup.
