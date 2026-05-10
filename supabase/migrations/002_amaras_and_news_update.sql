CREATE TABLE IF NOT EXISTS amaras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_hy TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_hy TEXT NOT NULL,
  file_url TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE amaras ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read amaras" ON amaras FOR SELECT USING (true);
CREATE POLICY "Admin full access amaras" ON amaras FOR ALL USING (true);

ALTER TABLE news ADD COLUMN IF NOT EXISTS show_on_home BOOLEAN DEFAULT FALSE;
