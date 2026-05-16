'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/types';
import { useApp } from '@/lib/context';

interface VideoForm {
  title_en: string;
  title_hy: string;
  youtube_url: string;
}

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<VideoForm>({ 
    title_en: '', title_hy: '', youtube_url: '' 
  });
  const { t, language } = useApp();

  useEffect(() => {
    fetchVideos();
  }, []);

  async function fetchVideos() {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) setVideos(data);
    setLoading(false);
  }

  function handleEdit(video: Video) {
    setEditingId(video.id);
    setForm({
      title_en: video.title_en,
      title_hy: video.title_hy,
      youtube_url: video.youtube_url || '',
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { supabase } = await import('@/lib/supabase');
      
      if (editingId) {
        const { error } = await supabase.from('videos').update({
          title_en: form.title_en,
          title_hy: form.title_hy,
          youtube_url: form.youtube_url,
        }).eq('id', editingId);
        if (error) console.error(error);
      } else {
        const { error } = await supabase.from('videos').insert([{
          title_en: form.title_en,
          title_hy: form.title_hy,
          youtube_url: form.youtube_url,
        }]);
        if (error) console.error(error);
      }
      
      setForm({ title_en: '', title_hy: '', youtube_url: '' });
      setEditingId(null);
      setShowForm(false);
      fetchVideos();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    const { error } = await supabase.from('videos').delete().eq('id', id);
    if (error) console.error(error);
    fetchVideos();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{t.admin.manageVideos}</h1>
        <button onClick={() => {
          if (showForm) {
            setShowForm(false);
            setEditingId(null);
            setForm({ title_en: '', title_hy: '', youtube_url: '' });
          } else {
            setShowForm(true);
          }
        }} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? t.admin.cancel : t.admin.addVideo}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-8">
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">{t.admin.english}</h3>
              <input type="text" placeholder={t.admin.titleEn} value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" />
            </div>
            
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">{t.admin.armenian}</h3>
              <input type="text" placeholder={t.admin.titleHy} value={form.title_hy} onChange={e => setForm({...form, title_hy: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" dir="rtl" />
            </div>

            <div className="pb-4">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">YouTube URL</h3>
              <input type="text" placeholder="https://youtube.com/..." value={form.youtube_url} onChange={e => setForm({...form, youtube_url: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" />
            </div>
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600/80 backdrop-blur-md text-white font-semibold rounded-lg mt-4 hover:bg-blue-600 transition-colors">{t.admin.save}</button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead className="border-b border-white/10">
              <tr className="text-left text-slate-300 text-sm">
                <th className="p-4">{language === 'en' ? 'English Title' : 'Վերնագիր (EN)'}</th>
                <th className="p-4">{language === 'hy' ? 'Հայերեն Վերնագիր' : 'Armenian Title'}</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {videos.map(video => (
                <tr key={video.id} className="border-b border-white/5">
                  <td className="p-4 text-slate-100">{video.title_en}</td>
                  <td className="p-4 text-slate-100">{video.title_hy}</td>
                  <td className="p-4">
                    <button onClick={() => handleEdit(video)} className="text-blue-300 hover:text-blue-200 text-sm mr-4">{t.admin.edit}</button>
                    <button onClick={() => handleDelete(video.id)} className="text-red-300 hover:text-red-200 text-sm">{t.admin.delete}</button>
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
