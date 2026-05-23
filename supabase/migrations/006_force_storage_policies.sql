-- First, disable and then enable RLS to be sure we are applying policies correctly.
-- WARNING: This will drop existing policies on storage.objects.
-- Make sure you have backup of your existing storage policies if you have complex custom ones.

-- 1. Ensure storage is enabled
CREATE SCHEMA IF NOT EXISTS storage;

-- 2. Clear out any existing policies that might conflict for the 'presentations' bucket
-- (This step is destructive to existing storage policies, but necessary to clear the block)
DROP POLICY IF EXISTS "Allow authenticated inserts into presentations" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated updates in presentations" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated deletes in presentations" ON storage.objects;

-- 3. Apply explicit policies for the 'presentations' bucket
-- This policy allows any authenticated user to insert into the 'presentations' bucket.
CREATE POLICY "Allow authenticated inserts into presentations" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'presentations' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated updates in presentations" ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'presentations' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated deletes in presentations" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'presentations' AND auth.role() = 'authenticated');
