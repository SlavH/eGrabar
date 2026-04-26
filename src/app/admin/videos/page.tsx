'use client';

import { useState, useEffect } from 'react';
import { Video } from '@/types';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', thumbnail_url: '', video_url: '', youtube_id: '', duration: 0 });
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
    await supabase.from('videos').insert([form]);
    setForm({ title: '', description: '', thumbnail_url: '', video_url: '', youtube_id: '', duration: 0 });
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
        <h1 className="text-3xl font-bold text-blue-600">{language === 'en' ? 'Manage Videos' : 'Կառավարել Տեսանյութերը'}</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? (language === 'en' ? 'Cancel' : 'Չեղարկել') : (language === 'en' ? 'Add Video' : 'Ավելացնել')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            <input type="text" placeholder="YouTube ID" value={form.youtube_id} onChange={e => setForm({...form, youtube_id: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            <input type="text" placeholder="Thumbnail URL" value={form.thumbnail_url} onChange={e => setForm({...form, thumbnail_url: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            <input type="text" placeholder="Video URL" value={form.video_url} onChange={e => setForm({...form, video_url: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            <input type="number" placeholder="Duration (seconds)" value={form.duration} onChange={e => setForm({...form, duration: parseInt(e.target.value)})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            <div className="md:col-span-2">
              <RichTextEditor value={form.description} onChange={description => setForm({...form, description})} placeholder="Description" />
            </div>
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg">{language === 'en' ? 'Save' : 'Պահպանել'}</button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-slate-50 rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="border-b border-slate-200">
              <tr className="text-left text-slate-500 text-sm">
                <th className="p-4">{language === 'en' ? 'Title' : 'Վերնագիր'}</th>
                <th className="p-4">{language === 'en' ? 'YouTube ID' : 'YouTube ID'}</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {videos.map(video => (
                <tr key={video.id} className="border-b border-slate-200">
                  <td className="p-4 text-slate-900">{video.title}</td>
                  <td className="p-4 text-slate-600">{video.youtube_id || '-'}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(video.id)} className="text-red-500 hover:text-red-400 text-sm">{language === 'en' ? 'Delete' : 'Ջնջել'}</button>
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
