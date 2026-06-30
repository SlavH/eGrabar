-- Storage policies for news-images bucket (used by CKEditor on all admin forms)

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
