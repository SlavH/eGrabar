'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';
// Removed external UploadButton due to environment constraints; use inline file inputs instead

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', author: '', description: '', category: 'history', cover_url: '', pdf_url: '' });
  const { t, language } = useApp();

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const { supabase } = await import('@/lib/supabase');
    const { data } = await supabase.from('books').select('*').order('created_at', { ascending: false });
    if (data) setBooks(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('books').insert([form]);
    setForm({ title: '', author: '', description: '', category: 'history', cover_url: '', pdf_url: '' });
    setShowForm(false);
    fetchBooks();
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('books').delete().eq('id', id);
    fetchBooks();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{language === 'en' ? 'Manage Books' : 'Կառավարել Գրքերը'}</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? (language === 'en' ? 'Cancel' : 'Չեղարկել') : (language === 'en' ? 'Add Book' : 'Ավելացնել')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            <input type="text" placeholder="Author" value={form.author} onChange={e => setForm({...form, author: e.target.value})} required className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
            <div className="col-span-1 md:col-span-2 flex gap-4 items-center">
          <label className="flex items-center gap-2">Cover image
            <input type="file" accept="image/*" onChange={async (e) => {
              if (!e.target.files?.[0]) return;
              const file = e.target.files[0];
              // Inline storage upload without external module
              const { data, error } = await (await import('@/lib/supabase')).supabase.storage.from('books').upload(`${Date.now()}_${file.name}`, file);
              if (error) throw error;
              const { data: urlData } = (await import('@/lib/supabase')).supabase.storage.from('books').getPublicUrl(`${Date.now()}_${file.name}`);
              const url = urlData?.publicUrl ?? '';
              setForm({ ...form, cover_url: url });
            }} />
          </label>
          <label className="flex items-center gap-2">PDF
            <input type="file" accept="application/pdf" onChange={async (e) => {
              if (!e.target.files?.[0]) return;
              const file = e.target.files[0];
              const { data, error } = await (await import('@/lib/supabase')).supabase.storage.from('books').upload(`${Date.now()}_${file.name}`, file);
              if (error) throw error;
              const { data: urlData2 } = (await import('@/lib/supabase')).supabase.storage.from('books').getPublicUrl(`${Date.now()}_${file.name}`);
              const url = urlData2?.publicUrl ?? '';
              setForm({ ...form, pdf_url: url });
            }} />
          </label>
        </div>
        
        <input type="text" placeholder="PDF URL" value={form.pdf_url} onChange={e => setForm({...form, pdf_url: e.target.value})} required className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 md:col-span-2" />
            <RichTextEditor value={form.description} onChange={description => setForm({...form, description})} placeholder="Description" />
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
                <th className="p-4">{language === 'en' ? 'Author' : 'Հեղինակ'}</th>
                <th className="p-4">{language === 'en' ? 'Category' : 'Կատեգորիա'}</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id} className="border-b border-slate-200">
                  <td className="p-4 text-slate-900">{book.title}</td>
                  <td className="p-4 text-slate-600">{book.author}</td>
                  <td className="p-4"><span className="px-2 py-1 bg-blue-600/10 text-blue-600 rounded text-xs">{book.category}</span></td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(book.id)} className="text-red-500 hover:text-red-400 text-sm">{language === 'en' ? 'Delete' : 'Ջնջել'}</button>
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
