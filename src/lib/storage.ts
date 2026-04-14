import { createClient } from '@supabase/supabase-js';
import { supabase } from './supabase';

export async function uploadFile(bucket: string, path: string, file: File): Promise<string> {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file);
  if (error) throw error;
  const { data: urlData, error: urlError } = await supabase.storage.from(bucket).getPublicUrl(path);
  if (urlError) throw urlError;
  return urlData?.publicURL ?? '';
}
