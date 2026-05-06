import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const supabase = createClient(supabaseUrl, supabaseKey);

export function uploadImageAdapter(loader: any) {
  return {
    upload: () => {
      return loader.file.then((file: File) => {
        return new Promise((resolve, reject) => {
          const fileName = `${Date.now()}_${file.name}`;
          supabase.storage
            .from('news-images')
            .upload(fileName, file)
            .then(({ data, error }) => {
              if (error) return reject(error);
              const { data: publicUrlData } = supabase.storage
                .from('news-images')
                .getPublicUrl(fileName);
              resolve({ default: publicUrlData.publicUrl });
            });
        });
      });
    },
  };
}
