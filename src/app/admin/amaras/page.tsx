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
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Amaras Content Management</h1>
        <button onClick={() => setShowForm(!showForm)} className="bg-blue-600 text-white px-4 py-2 rounded">
          {showForm ? 'Cancel' : 'Add New Section'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8">
          <input className="w-full mb-4 p-2 border rounded" placeholder="Title (EN)" value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} required />
          <input className="w-full mb-4 p-2 border rounded" placeholder="Title (HY)" value={form.title_hy} onChange={e => setForm({...form, title_hy: e.target.value})} required />
          <RichTextEditor value={form.content_en} onChange={v => setForm({...form, content_en: v})} placeholder="Content (EN)" />
          <RichTextEditor value={form.content_hy} onChange={v => setForm({...form, content_hy: v})} placeholder="Content (HY)" />
          <button className="bg-green-600 text-white px-6 py-2 rounded mt-4">Save</button>
        </form>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-slate-50">
              <th className="p-4 text-left">Title (EN)</th>
              <th className="p-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {amaras.map(item => (
              <tr key={item.id} className="border-t">
                <td className="p-4">{item.title_en}</td>
                <td className="p-4">
                  <button onClick={() => handleEdit(item)} className="text-blue-500 mr-4">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
