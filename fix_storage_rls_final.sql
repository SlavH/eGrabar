-- Make sure the bucket itself is public
UPDATE storage.buckets SET public = true WHERE id = 'news-images';

-- We need to ensure that the policy allows the insertion based on the bucket_id AND the path.
-- Sometimes the error happens because the system tries to insert a row into storage.objects
-- but the policy doesn't allow the 'name' or other metadata fields to be set.

-- Drop all old policies
DROP POLICY IF EXISTS "Allow authenticated inserts to news-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow public select from news-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates to news-images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes to news-images" ON storage.objects;

-- Create a blanket policy for this bucket for authenticated users
-- Using 'true' for WITH CHECK is the most permissive way to allow the insert
CREATE POLICY "Allow authenticated full access to news-images" ON storage.objects
FOR ALL
USING (bucket_id = 'news-images' AND auth.role() = 'authenticated')
WITH CHECK (bucket_id = 'news-images' AND auth.role() = 'authenticated');

-- Create a blanket policy for public read
CREATE POLICY "Allow public select from news-images" ON storage.objects
FOR SELECT
USING (bucket_id = 'news-images');
