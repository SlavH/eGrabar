'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface AmarasForm {
  title_en: string;
  title_hy: string;
  content_en: string;
  content_hy: string;
  show_on_home: boolean;
}

export default function AdminAmarasPage() {
  const [amaras, setAmaras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AmarasForm>({ title_en: '', title_hy: '', content_en: '', content_hy: '', show_on_home: false });
  const { language } = useApp();

  useEffect(() => {
    fetchAmaras();
  }, []);

  async function fetchAmaras() {
    const { supabase } = await import('@/lib/supabase');
    const { data } = await supabase.from('amaras').select('*').order('created_at', { ascending: false });
    if (data) setAmaras(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { supabase } = await import('@/lib/supabase');
    
    if (editingId) {
      await supabase.from('amaras').update(form).eq('id', editingId);
    } else {
      await supabase.from('amaras').insert([form]);
    }
    
    setForm({ title_en: '', title_hy: '', content_en: '', content_hy: '', show_on_home: false });
    setEditingId(null);
    setShowForm(false);
    fetchAmaras();
  }

  function handleEdit(item: any) {
    setEditingId(item.id);
    setForm({ 
      title_en: item.title_en, 
      title_hy: item.title_hy, 
      content_en: item.content_en, 
      content_hy: item.content_hy,
      show_on_home: item.show_on_home || false
    });
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('amaras').delete().eq('id', id);
    fetchAmaras();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{language === 'en' ? 'Manage Amaras' : 'Կառավարել Ամարասը'}</h1>
        <button onClick={() => { setShowForm(!showForm); setEditingId(null); setForm({ title_en: '', title_hy: '', content_en: '', content_hy: '', show_on_home: false }); }} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? (language === 'en' ? 'Cancel' : 'Չեղարկել') : (language === 'en' ? 'Add Amaras Card' : 'Ավելացնել')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-8">
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">English</h3>
              <input 
                type="text" 
                placeholder="Title (English)" 
                value={form.title_en} 
                onChange={e => setForm({...form, title_en: e.target.value})} 
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400 mb-3" 
              />
              <RichTextEditor 
                value={form.content_en} 
                onChange={content_en => setForm({...form, content_en})} 
                placeholder="Content (English)" 
              />
            </div>
            
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">Armenian (Հայերեն)</h3>
              <input 
                type="text" 
                placeholder="Title (Armenian)" 
                value={form.title_hy} 
                onChange={e => setForm({...form, title_hy: e.target.value})} 
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400 mb-3" 
              />
              <RichTextEditor 
                value={form.content_hy} 
                onChange={content_hy => setForm({...form, content_hy})} 
                placeholder="Content (Armenian)" 
              />
              <label className="flex items-center gap-2 mt-4 text-slate-100">
                <input 
                  type="checkbox" 
                  checked={form.show_on_home} 
                  onChange={e => setForm({...form, show_on_home: e.target.checked})} 
                />
                Show on Home
              </label>
            </div>
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600/80 backdrop-blur-md text-white font-semibold rounded-lg mt-4 hover:bg-blue-600 transition-colors">
            {language === 'en' ? 'Save' : 'Պահպանել'}
          </button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-x-auto">
          <table className="w-full min-w-[400px]">
            <thead className="border-b border-white/10">
              <tr className="text-left text-slate-300 text-sm">
                <th className="p-4">English Title</th>
                <th className="p-4">Armenian Title</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {amaras.map(item => (
                <tr key={item.id} className="border-b border-white/5">
                  <td className="p-4 text-slate-100">{item.title_en}</td>
                  <td className="p-4 text-slate-100">{item.title_hy}</td>
                  <td className="p-4">
                    <button onClick={() => handleEdit(item)} className="text-blue-300 hover:text-blue-200 text-sm mr-4">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-300 hover:text-red-200 text-sm">
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
