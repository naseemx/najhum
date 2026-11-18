-- Run FIRST in Supabase SQL Editor, before deploying the new product workflow.
-- Schema + editable category/filter defaults only. No products are seeded or deleted.
BEGIN;
ALTER TABLE public."Product"
 ADD COLUMN IF NOT EXISTS "slug" TEXT,
 ADD COLUMN IF NOT EXISTS "modelCode" TEXT NOT NULL DEFAULT '',
 ADD COLUMN IF NOT EXISTS "contentMode" TEXT NOT NULL DEFAULT 'LEGACY',
 ADD COLUMN IF NOT EXISTS "publishedRevisionId" TEXT,
 ADD COLUMN IF NOT EXISTS "seoTitle" TEXT NOT NULL DEFAULT '',
 ADD COLUMN IF NOT EXISTS "seoDescription" TEXT NOT NULL DEFAULT '',
 ADD COLUMN IF NOT EXISTS "socialImage" TEXT NOT NULL DEFAULT '',
 ADD COLUMN IF NOT EXISTS "socialImageAlt" TEXT NOT NULL DEFAULT '';
CREATE UNIQUE INDEX IF NOT EXISTS "Product_slug_key" ON public."Product"("slug");
CREATE TABLE IF NOT EXISTS public."ProductRevision" (
 "id" TEXT PRIMARY KEY,"productId" TEXT NOT NULL REFERENCES public."Product"("id") ON DELETE CASCADE,
 "number" INTEGER NOT NULL,"document" JSONB NOT NULL,"createdBy" TEXT NOT NULL,
 "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
 UNIQUE("productId","number")
);
CREATE INDEX IF NOT EXISTS "ProductRevision_productId_createdAt_idx" ON public."ProductRevision"("productId","createdAt");
CREATE TABLE IF NOT EXISTS public."ProductCategory" (
 "id" TEXT PRIMARY KEY,"name" TEXT NOT NULL,"slug" TEXT NOT NULL UNIQUE,
 "icon" TEXT NOT NULL DEFAULT 'grid',"order" INTEGER NOT NULL DEFAULT 0,"isActive" BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE IF NOT EXISTS public."ProductFilterGroup" (
 "id" TEXT PRIMARY KEY,"name" TEXT NOT NULL,"slug" TEXT NOT NULL UNIQUE,
 "order" INTEGER NOT NULL DEFAULT 0,"isActive" BOOLEAN NOT NULL DEFAULT true
);
CREATE TABLE IF NOT EXISTS public."ProductFilterOption" (
 "id" TEXT PRIMARY KEY,"groupId" TEXT NOT NULL REFERENCES public."ProductFilterGroup"("id") ON DELETE CASCADE,
 "name" TEXT NOT NULL,"slug" TEXT NOT NULL,"order" INTEGER NOT NULL DEFAULT 0,"isActive" BOOLEAN NOT NULL DEFAULT true,
 UNIQUE("groupId","slug")
);
CREATE TABLE IF NOT EXISTS public."ProductCategoryAssignment" (
 "productId" TEXT NOT NULL REFERENCES public."Product"("id") ON DELETE CASCADE,
 "categoryId" TEXT NOT NULL REFERENCES public."ProductCategory"("id") ON DELETE CASCADE,
 PRIMARY KEY("productId","categoryId")
);
CREATE TABLE IF NOT EXISTS public."ProductFilterAssignment" (
 "productId" TEXT NOT NULL REFERENCES public."Product"("id") ON DELETE CASCADE,
 "optionId" TEXT NOT NULL REFERENCES public."ProductFilterOption"("id") ON DELETE CASCADE,
 PRIMARY KEY("productId","optionId")
);
CREATE TABLE IF NOT EXISTS public."RelatedProduct" (
 "sourceId" TEXT NOT NULL REFERENCES public."Product"("id") ON DELETE CASCADE,
 "targetId" TEXT NOT NULL REFERENCES public."Product"("id") ON DELETE CASCADE,
 "position" INTEGER NOT NULL DEFAULT 0,
 PRIMARY KEY("sourceId","targetId"), CHECK("sourceId" <> "targetId")
);
INSERT INTO public."ProductCategory"("id","name","slug","icon","order") VALUES
 ('cat-occupancy','Occupancy & People Counting','occupancy-people-counting','people',10),
 ('cat-energy','Energy & Power','energy-power','bolt',20),
 ('cat-building','Smart Building Control','smart-building-control','building',30),
 ('cat-water','Water & Leak','water-leak','water',40),
 ('cat-environment','Environment & Air','environment-air','air',50),
 ('cat-gas','Gas Detection','gas-detection','sensor',60)
 ON CONFLICT DO NOTHING;
INSERT INTO public."ProductFilterGroup"("id","name","slug","order") VALUES
 ('fg-platform','Platform','platform',10),('fg-connectivity','Connectivity','connectivity',20),
 ('fg-power','Power','power',30),('fg-installation','Installation','installation',40)
 ON CONFLICT DO NOTHING;
INSERT INTO public."ProductFilterOption"("id","groupId","name","slug","order") VALUES
 ('fo-iotrics','fg-platform','IoTRICs','iotrics',10),('fo-evoltics','fg-platform','EVOLTICS','evoltics',20),('fo-cropifai','fg-platform','cropifAI','cropifai',30),
 ('fo-lpwan','fg-connectivity','LPWAN','lpwan',10),('fo-ble','fg-connectivity','BLE','ble',20),('fo-nbiot','fg-connectivity','NB-IoT','nb-iot',30),('fo-cellular','fg-connectivity','4G / Cellular','4g-cellular',40),('fo-ethernet','fg-connectivity','PoE / Ethernet','poe-ethernet',50),
 ('fo-battery','fg-power','Battery','battery',10),('fo-mains','fg-power','Mains','mains',20),('fo-self','fg-power','Self-powered','self-powered',30),
 ('fo-indoor','fg-installation','Indoor','indoor',10),('fo-outdoor','fg-installation','Outdoor / IP67+','outdoor-ip67',20),('fo-hazardous','fg-installation','Hazardous area','hazardous-area',30)
 ON CONFLICT DO NOTHING;
ALTER TABLE public."ProductRevision" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ProductCategory" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ProductFilterGroup" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ProductFilterOption" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ProductCategoryAssignment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."ProductFilterAssignment" ENABLE ROW LEVEL SECURITY;
ALTER TABLE public."RelatedProduct" ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public."ProductRevision",public."ProductCategory",public."ProductFilterGroup",public."ProductFilterOption",public."ProductCategoryAssignment",public."ProductFilterAssignment",public."RelatedProduct" FROM anon,authenticated;
COMMIT;
