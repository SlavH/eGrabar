import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const bucket = formData.get('bucket') as string || 'presentations';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const sb = getSupabaseAdmin();
    const { error } = await sb.storage.from(bucket).upload(fileName, buffer, {
      contentType: file.type,
      upsert: false,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: urlData } = sb.storage.from(bucket).getPublicUrl(fileName);

    return NextResponse.json({ url: urlData?.publicUrl || '' });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Upload error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
