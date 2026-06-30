-- Ensure news-images bucket exists and is public
INSERT INTO storage.buckets (id, name, public)
VALUES ('news-images', 'news-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Allow public read access to images
DROP POLICY IF EXISTS "Allow public select on news-images" ON storage.objects;
CREATE POLICY "Allow public select on news-images" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'news-images');

-- Allow authenticated users to upload images
DROP POLICY IF EXISTS "Allow authenticated inserts into news-images" ON storage.objects;
CREATE POLICY "Allow authenticated inserts into news-images" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'news-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated updates in news-images" ON storage.objects;
CREATE POLICY "Allow authenticated updates in news-images" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'news-images' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "Allow authenticated deletes in news-images" ON storage.objects;
CREATE POLICY "Allow authenticated deletes in news-images" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'news-images' AND auth.role() = 'authenticated');
