'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface AmarasForm {
  title_en: string;
  title_hy: string;
  content_en: string;
  content_hy: string;
}

export default function AdminAmarasPage() {
  const [amaras, setAmaras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AmarasForm>({ title_en: '', title_hy: '', content_en: '', content_hy: '' });
  const { language } = useApp();

  useEffect(() => {
    fetchAmaras();
  }, []);

  async function fetchAmaras() {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase.from('amaras').select('*');
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
    
    setForm({ title_en: '', title_hy: '', content_en: '', content_hy: '' });
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
      content_hy: item.content_hy
    });
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure?')) return;
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('amaras').delete().eq('id', id);
    fetchAmaras();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">Amaras Content Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? 'Cancel' : 'Add New Section'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-8">
          <input className="w-full mb-4 p-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" placeholder="Title (EN)" value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} required />
          <input className="w-full mb-4 p-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" placeholder="Title (HY)" value={form.title_hy} onChange={e => setForm({...form, title_hy: e.target.value})} required />
          <div className="mb-4">
            <RichTextEditor value={form.content_en} onChange={v => setForm({...form, content_en: v})} placeholder="Content (EN)" />
          </div>
          <div className="mb-4">
            <RichTextEditor value={form.content_hy} onChange={v => setForm({...form, content_hy: v})} placeholder="Content (HY)" />
          </div>
          <button className="px-6 py-2 bg-blue-600/80 backdrop-blur-md text-white font-semibold rounded-lg mt-4 hover:bg-blue-600 transition-colors">Save</button>
        </form>
      )}

      <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-slate-300 text-sm border-b border-white/10">
              <th className="p-4">Title (EN)</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {amaras.map(item => (
              <tr key={item.id} className="border-b border-white/5">
                <td className="p-4 text-slate-100">{item.title_en}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(item)} className="text-blue-300 hover:text-blue-200 text-sm mr-4">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-300 hover:text-red-200 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
