'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface AmarasForm {
  title_en: string;
  title_hy: string;
  content_en: string;
  content_hy: string;
  image_url: string;
}

export default function AdminAmarasPage() {
  const [amaras, setAmaras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<AmarasForm>({ title_en: '', title_hy: '', content_en: '', content_hy: '', image_url: '' });
  const [uploading, setUploading] = useState(false);
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

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploading(true);
    const { supabase } = await import('@/lib/supabase');
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    
    const { error: uploadError } = await supabase.storage.from('amaras').upload(fileName, file);
    if (uploadError) {
      alert(uploadError.message);
    } else {
      const { data } = supabase.storage.from('amaras').getPublicUrl(fileName);
      setForm({ ...form, image_url: data.publicUrl });
    }
    setUploading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { supabase } = await import('@/lib/supabase');
    
    if (editingId) {
      await supabase.from('amaras').update(form).eq('id', editingId);
    } else {
      await supabase.from('amaras').insert([form]);
    }
    
    setForm({ title_en: '', title_hy: '', content_en: '', content_hy: '', image_url: '' });
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
      image_url: item.image_url || ''
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
          <div className="mt-4">
            <input type="file" onChange={handleFileUpload} accept="image/*" />
            {uploading && <p>Uploading...</p>}
            {form.image_url && <img src={form.image_url} className="w-32 mt-2" />}
          </div>
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
