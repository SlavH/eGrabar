'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface NewsForm {
  title_en: string;
  title_hy: string;
  content_en: string;
  content_hy: string;
}

export default function AdminNewsPage() {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<NewsForm>({ title_en: '', title_hy: '', content_en: '', content_hy: '' });
  const { language } = useApp();

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    const { supabase } = await import('@/lib/supabase');
    const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
    if (data) setNews(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { supabase } = await import('@/lib/supabase');
    
    const title = form.title_en || form.title_hy;
    const content = form.content_en || form.content_hy;
    
    await supabase.from('news').insert([{
      title,
      title_en: form.title_en,
      title_hy: form.title_hy,
      content,
      content_en: form.content_en,
      content_hy: form.content_hy,
    }]);
    
    setForm({ title_en: '', title_hy: '', content_en: '', content_hy: '' });
    setShowForm(false);
    fetchNews();
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('news').delete().eq('id', id);
    fetchNews();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{language === 'en' ? 'Manage News' : 'Կառավարել Լրաշարքը'}</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? (language === 'en' ? 'Cancel' : 'Չեղարկել') : (language === 'en' ? 'Add News' : 'Ավելացնել')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">English</h3>
              <input 
                type="text" 
                placeholder="Title (English)" 
                value={form.title_en} 
                onChange={e => setForm({...form, title_en: e.target.value})} 
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 mb-3" 
              />
              <RichTextEditor 
                value={form.content_en} 
                onChange={content_en => setForm({...form, content_en})} 
                placeholder="Content (English)" 
              />
            </div>
            
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">Armenian (Հայերեն)</h3>
              <input 
                type="text" 
                placeholder="Title (Armenian)" 
                value={form.title_hy} 
                onChange={e => setForm({...form, title_hy: e.target.value})} 
                className="w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 mb-3" 
              />
              <RichTextEditor 
                value={form.content_hy} 
                onChange={content_hy => setForm({...form, content_hy})} 
                placeholder="Content (Armenian)" 
              />
            </div>
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg mt-4">
            {language === 'en' ? 'Save' : 'Պահպանել'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-slate-50 rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead className="border-b border-slate-200">
              <tr className="text-left text-slate-500 text-sm">
                <th className="p-4">English Title</th>
                <th className="p-4">Armenian Title</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {news.map(item => (
                <tr key={item.id} className="border-b border-slate-200">
                  <td className="p-4 text-slate-900">{item.title_en || item.title || '-'}</td>
                  <td className="p-4 text-slate-900">{item.title_hy || '-'}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-400 text-sm">
                      {language === 'en' ? 'Delete' : 'Ջնջել'}
                    </button>
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