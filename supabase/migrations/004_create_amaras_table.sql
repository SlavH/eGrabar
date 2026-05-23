-- Create Amaras table
CREATE TABLE IF NOT EXISTS amaras (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_hy TEXT NOT NULL,
  content_en TEXT,
  content_hy TEXT,
  show_on_home BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE amaras ENABLE ROW LEVEL SECURITY;

-- Allow read access for everyone
CREATE POLICY "Allow public read access" ON amaras
  FOR SELECT USING (true);

-- Allow authenticated (admin) users to manage
CREATE POLICY "Allow authenticated insert" ON amaras
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON amaras
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON amaras
  FOR DELETE USING (auth.role() = 'authenticated');
