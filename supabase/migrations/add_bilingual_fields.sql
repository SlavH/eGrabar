-- Migration script for bilingual content support
-- Run this in your Supabase SQL Editor

-- Books table: Add English and Armenian fields
ALTER TABLE books ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE books ADD COLUMN IF NOT EXISTS title_hy TEXT;
ALTER TABLE books ADD COLUMN IF NOT EXISTS author_en TEXT;
ALTER TABLE books ADD COLUMN IF NOT EXISTS author_hy TEXT;
ALTER TABLE books ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE books ADD COLUMN IF NOT EXISTS description_hy TEXT;

-- Videos table: Add English and Armenian fields
ALTER TABLE videos ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS title_hy TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE videos ADD COLUMN IF NOT EXISTS description_hy TEXT;

-- Presentations table: Add English and Armenian fields
ALTER TABLE presentations ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE presentations ADD COLUMN IF NOT EXISTS title_hy TEXT;
ALTER TABLE presentations ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE presentations ADD COLUMN IF NOT EXISTS description_hy TEXT;

-- Events table: Add English and Armenian fields
ALTER TABLE events ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS title_hy TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS description_hy TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS instructor_en TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS instructor_hy TEXT;

-- News table: Add English and Armenian fields
ALTER TABLE news ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS title_hy TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS content_hy TEXT;

-- After running this migration, you can remove the old single-language columns if needed
-- Example: ALTER TABLE books DROP COLUMN IF EXISTS title;