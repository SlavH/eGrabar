'use client';

import { useState, useEffect } from 'react';
import { Presentation } from '@/types';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';

export default function AdminPresentationsPage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', thumbnail_url: '', pptx_url: '' });
  const { t, language } = useApp();

  useEffect(() => {
    fetchPresentations();
  }, []);

  async function fetchPresentations() {
    const { supabase } = await import('@/lib/supabase');
    const { data } = await supabase.from('presentations').select('*').order('created_at', { ascending: false });
    if (data) setPresentations(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('presentations').insert([form]);
    setForm({ title: '', description: '', thumbnail_url: '', pptx_url: '' });
    setShowForm(false);
    fetchPresentations();
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('presentations').delete().eq('id', id);
    fetchPresentations();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{language === 'en' ? 'Manage Presentations' : 'Կառավարել Ներկայացումները'}</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? (language === 'en' ? 'Cancel' : 'Չեղարկել') : (language === 'en' ? 'Add Presentation' : 'Ավելացնել')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            <input type="text" placeholder="Thumbnail URL" value={form.thumbnail_url} onChange={e => setForm({...form, thumbnail_url: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            <input type="text" placeholder="PPTX URL" value={form.pptx_url} onChange={e => setForm({...form, pptx_url: e.target.value})} required className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 md:col-span-2" />
            <RichTextEditor value={form.description} onChange={description => setForm({...form, description})} placeholder="Description" />
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg">{language === 'en' ? 'Save' : 'Պահպանել'}</button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-slate-50 rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-slate-200">
              <tr className="text-left text-slate-500 text-sm">
                <th className="p-4">{language === 'en' ? 'Title' : 'Վերնագիր'}</th>
                <th className="p-4">{language === 'en' ? 'URL' : 'URL'}</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {presentations.map(ppt => (
                <tr key={ppt.id} className="border-b border-slate-200">
                  <td className="p-4 text-slate-900">{ppt.title}</td>
                  <td className="p-4 text-slate-600 truncate max-w-xs">{ppt.pptx_url}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(ppt.id)} className="text-red-500 hover:text-red-400 text-sm">{language === 'en' ? 'Delete' : 'Ջնջել'}</button>
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
