-- 1. Create Amaras table
CREATE TABLE IF NOT EXISTS public.amaras (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en TEXT NOT NULL,
  title_hy TEXT NOT NULL,
  content_en TEXT,
  content_hy TEXT,
  show_on_home BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.amaras ENABLE ROW LEVEL SECURITY;

-- 3. Policy for public read access
CREATE POLICY "Allow public read access" ON public.amaras
  FOR SELECT USING (true);

-- 4. Policies for authenticated admin users (Insert, Update, Delete)
CREATE POLICY "Allow authenticated insert" ON public.amaras
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update" ON public.amaras
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete" ON public.amaras
  FOR DELETE USING (auth.role() = 'authenticated');

-- 5. Note on Storage: 
-- You mentioned using the existing 'news' bucket for images. 
-- Since your app already uses a 'news' bucket in the 'storage.buckets' table, 
-- you do not need to create a new one. Your RichTextEditor component is 
-- already configured to use the 'news' bucket upload adapter.
-- Simply ensure the 'news' bucket in your Supabase Dashboard has 
-- an 'INSERT' policy for 'authenticated' users (just like you did for 'presentations').
