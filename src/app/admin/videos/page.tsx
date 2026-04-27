'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/types';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface VideoForm {
  title_en: string;
  title_hy: string;
  description_en: string;
  description_hy: string;
  thumbnail_url: string;
  video_url: string;
  youtube_id: string;
  duration: number;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<VideoForm>({ 
    title_en: '', title_hy: '', description_en: '', description_hy: '', 
    thumbnail_url: '', video_url: '', youtube_id: '', duration: 0 
  });
  const { t, language } = useApp();

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    const { supabase } = await import('@/lib/supabase');
    const { data } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
    if (data) setVideos(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { supabase } = await import('@/lib/supabase');
    
    await supabase.from('videos').insert([{
      title: form.title_en || form.title_hy,
      title_en: form.title_en,
      title_hy: form.title_hy,
      description: form.description_en || form.description_hy,
      description_en: form.description_en,
      description_hy: form.description_hy,
      thumbnail_url: form.thumbnail_url,
      video_url: form.video_url,
      youtube_id: form.youtube_id,
      duration: form.duration,
    }]);
    
    setForm({ title_en: '', title_hy: '', description_en: '', description_hy: '', thumbnail_url: '', video_url: '', youtube_id: '', duration: 0 });
    setShowForm(false);
    fetchVideos();
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('videos').delete().eq('id', id);
    fetchVideos();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{t.admin.manageVideos}</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? t.admin.cancel : t.admin.addVideo}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">{t.admin.english}</h3>
              <input type="text" placeholder={t.admin.titleEn} value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 mb-3" />
              <RichTextEditor value={form.description_en} onChange={description_en => setForm({...form, description_en})} placeholder={t.admin.descriptionEn} />
            </div>
            
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">{t.admin.armenian}</h3>
              <input type="text" placeholder={t.admin.titleHy} value={form.title_hy} onChange={e => setForm({...form, title_hy: e.target.value})} className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 mb-3" dir="rtl" />
              <RichTextEditor value={form.description_hy} onChange={description_hy => setForm({...form, description_hy})} placeholder={t.admin.descriptionHy} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder={t.admin.youtubeId} value={form.youtube_id} onChange={e => setForm({...form, youtube_id: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
              <input type="text" placeholder={t.admin.thumbnailUrl} value={form.thumbnail_url} onChange={e => setForm({...form, thumbnail_url: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
              <input type="text" placeholder={t.admin.videoUrl} value={form.video_url} onChange={e => setForm({...form, video_url: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
              <input type="number" placeholder={t.admin.duration} value={form.duration} onChange={e => setForm({...form, duration: parseInt(e.target.value) || 0})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            </div>
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg mt-4">{t.admin.save}</button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-slate-50 rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="border-b border-slate-200">
              <tr className="text-left text-slate-500 text-sm">
                <th className="p-4">{language === 'en' ? 'English Title' : 'Վերնագիր (EN)'}</th>
                <th className="p-4">{language === 'hy' ? 'Հայերեն Վերնագիր' : 'Armenian Title'}</th>
                <th className="p-4">{t.admin.youtubeId}</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {videos.map(video => (
                <tr key={video.id} className="border-b border-slate-200">
                  <td className="p-4 text-slate-900">{video.title_en || video.title || '-'}</td>
                  <td className="p-4 text-slate-900">{video.title_hy || '-'}</td>
                  <td className="p-4 text-slate-600">{video.youtube_id || '-'}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(video.id)} className="text-red-500 hover:text-red-400 text-sm">{t.admin.delete}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}