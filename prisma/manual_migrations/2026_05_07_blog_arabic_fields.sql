-- Add Arabic translation fields to BlogPost.
-- All columns are nullable so existing rows continue to work unchanged.
-- Apply with one of:
--   psql "$DATABASE_URL" -f prisma/manual_migrations/2026_05_07_blog_arabic_fields.sql
--   OR: paste into your DB console (Vercel Postgres / Supabase / Neon)
--   OR: npx prisma db push   (matches schema.prisma; same end state)

ALTER TABLE "BlogPost"
    ADD COLUMN IF NOT EXISTS "titleAr"     TEXT,
    ADD COLUMN IF NOT EXISTS "slugAr"      TEXT,
    ADD COLUMN IF NOT EXISTS "excerptAr"   TEXT,
    ADD COLUMN IF NOT EXISTS "contentAr"   TEXT,
    ADD COLUMN IF NOT EXISTS "metaTitleAr" TEXT,
    ADD COLUMN IF NOT EXISTS "metaDescAr"  TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slugAr_key" ON "BlogPost"("slugAr");
