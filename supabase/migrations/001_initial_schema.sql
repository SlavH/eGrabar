-- Base tables for eGrabar
-- All text content is strictly bilingual (en/hy), no fallback fields

CREATE TABLE IF NOT EXISTS books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_hy TEXT NOT NULL,
  author_en TEXT NOT NULL,
  author_hy TEXT NOT NULL,
  description_en TEXT DEFAULT '',
  description_hy TEXT DEFAULT '',
  pdf_file TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_hy TEXT NOT NULL,
  description_en TEXT DEFAULT '',
  description_hy TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS presentations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_hy TEXT NOT NULL,
  description_en TEXT DEFAULT '',
  description_hy TEXT DEFAULT '',
  pdf_file TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_hy TEXT NOT NULL,
  description_en TEXT DEFAULT '',
  description_hy TEXT DEFAULT '',
  date DATE NOT NULL,
  time TEXT DEFAULT '',
  link TEXT DEFAULT '',
  instructor_en TEXT NOT NULL,
  instructor_hy TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en TEXT NOT NULL,
  title_hy TEXT NOT NULL,
  content_en TEXT NOT NULL,
  content_hy TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_books_created_at ON books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_videos_created_at ON videos(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_presentations_created_at ON presentations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date ASC);
CREATE INDEX IF NOT EXISTS idx_news_created_at ON news(created_at DESC);

-- Enable Row Level Security
ALTER TABLE books ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE presentations ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

-- Public read access for all tables
CREATE POLICY "Public can read books" ON books FOR SELECT USING (true);
CREATE POLICY "Public can read videos" ON videos FOR SELECT USING (true);
CREATE POLICY "Public can read presentations" ON presentations FOR SELECT USING (true);
CREATE POLICY "Public can read events" ON events FOR SELECT USING (true);
CREATE POLICY "Public can read news" ON news FOR SELECT USING (true);

-- Full CRUD for authenticated admin (service role bypasses RLS, but policies for safety)
CREATE POLICY "Admin full access books" ON books FOR ALL USING (true);
CREATE POLICY "Admin full access videos" ON videos FOR ALL USING (true);
CREATE POLICY "Admin full access presentations" ON presentations FOR ALL USING (true);
CREATE POLICY "Admin full access events" ON events FOR ALL USING (true);
CREATE POLICY "Admin full access news" ON news FOR ALL USING (true);
