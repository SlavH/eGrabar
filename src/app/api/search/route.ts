import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('q')?.trim();

  if (!query || query.length < 2) {
    return NextResponse.json({ data: [] });
  }

  const ilike = `%${query}%`;
  const supabase = getSupabaseAdmin();

  const [booksRes, videosRes, presentationsRes, eventsRes, newsRes] = await Promise.all([
    supabase.from('books').select('id, title_en, title_hy, description_en, description_hy, pdf_file, created_at').ilike('title_en', ilike),
    supabase.from('videos').select('id, title_en, title_hy, description_en, description_hy, created_at').ilike('title_en', ilike),
    supabase.from('presentations').select('id, title_en, title_hy, description_en, description_hy, pdf_file, created_at').ilike('title_en', ilike),
    supabase.from('events').select('id, title_en, title_hy, description_en, description_hy, date, time, link, instructor_en, instructor_hy, created_at').ilike('title_en', ilike),
    supabase.from('news').select('id, title_en, title_hy, content_en, content_hy, created_at').ilike('title_en', ilike),
  ]);

  const results = [
    ...(booksRes.data || []).map((item: any) => ({ ...item, type: 'book' as const })),
    ...(videosRes.data || []).map((item: any) => ({ ...item, type: 'video' as const })),
    ...(presentationsRes.data || []).map((item: any) => ({ ...item, type: 'presentation' as const })),
    ...(eventsRes.data || []).map((item: any) => ({ ...item, type: 'event' as const })),
    ...(newsRes.data || []).map((item: any) => ({ ...item, type: 'news' as const })),
  ].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

  return NextResponse.json({ data: results });
}
