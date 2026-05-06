-- Drop columns from tables
ALTER TABLE books DROP COLUMN description_en, DROP COLUMN description_hy;
ALTER TABLE videos DROP COLUMN description_en, DROP COLUMN description_hy;
ALTER TABLE presentations DROP COLUMN description_en, DROP COLUMN description_hy;

-- Verify changes (optional)
SELECT column_name FROM information_schema.columns WHERE table_name IN ('books', 'videos', 'presentations');
