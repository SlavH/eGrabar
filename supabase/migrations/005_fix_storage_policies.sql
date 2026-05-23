-- Ensure authenticated users can insert into the 'presentations' storage bucket
-- This requires that the storage.objects table has a policy for the 'presentations' bucket.
-- Since storage policies are usually handled via the dashboard, this SQL script enables 
-- the necessary authenticated access if it wasn't already configured.

-- 1. Enable RLS on storage.objects (if not already enabled)
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy for inserting into the 'presentations' bucket
-- Note: Replace 'presentations' with your exact bucket name if it differs in the DB.
CREATE POLICY "Allow authenticated inserts into presentations" ON storage.objects
  FOR INSERT
  WITH CHECK (
    bucket_id = 'presentations' AND 
    auth.role() = 'authenticated'
  );

-- 3. Create a policy for updating existing files in the 'presentations' bucket
CREATE POLICY "Allow authenticated updates in presentations" ON storage.objects
  FOR UPDATE
  USING (
    bucket_id = 'presentations' AND 
    auth.role() = 'authenticated'
  );

-- 4. Create a policy for deleting files in the 'presentations' bucket
CREATE POLICY "Allow authenticated deletes in presentations" ON storage.objects
  FOR DELETE
  USING (
    bucket_id = 'presentations' AND 
    auth.role() = 'authenticated'
  );
