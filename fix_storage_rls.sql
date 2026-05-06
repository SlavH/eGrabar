-- 1. Disable RLS for storage to start clean (if necessary)
-- ALTER TABLE storage.objects DISABLE ROW LEVEL SECURITY;
-- ALTER TABLE storage.buckets DISABLE ROW LEVEL SECURITY;

-- 2. Drop any potentially conflicting policies (adjust names if needed)
DROP POLICY IF EXISTS "Allow authenticated inserts 1wjj44y_0" ON storage.objects;
DROP POLICY IF EXISTS "Public read access 1wjj44y_0" ON storage.objects;

-- 3. Re-enable RLS
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 4. Create proper policies
-- Allow authenticated users to upload files to 'news-images' bucket
CREATE POLICY "Allow authenticated inserts to news-images" ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'news-images' 
  AND auth.role() = 'authenticated'
);

-- Allow public to read files from 'news-images' bucket
CREATE POLICY "Allow public select from news-images" ON storage.objects
FOR SELECT
USING (bucket_id = 'news-images');

-- Allow authenticated users to update/delete their own files (optional but good practice)
CREATE POLICY "Allow authenticated updates to news-images" ON storage.objects
FOR UPDATE
USING (bucket_id = 'news-images' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated deletes to news-images" ON storage.objects
FOR DELETE
USING (bucket_id = 'news-images' AND auth.role() = 'authenticated');
