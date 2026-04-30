'use client';

import { useState, useEffect } from 'react';
import { Book } from '@/types';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';

interface BookForm {
  title_en: string;
  title_hy: string;
  author_en: string;
  author_hy: string;
  description_en: string;
  description_hy: string;
  pdf_file: string;
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<BookForm>({ 
    title_en: '', title_hy: '', author_en: '', author_hy: '', 
    description_en: '', description_hy: '', pdf_file: '' 
  });
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
    
    await supabase.from('books').insert([{
      title_en: form.title_en,
      title_hy: form.title_hy,
      author_en: form.author_en,
      author_hy: form.author_hy,
      description_en: form.description_en,
      description_hy: form.description_hy,
      pdf_file: form.pdf_file,
    }]);
    
    setForm({ title_en: '', title_hy: '', author_en: '', author_hy: '', description_en: '', description_hy: '', pdf_file: '' });
    setShowForm(false);
    fetchBooks();
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('books').delete().eq('id', id);
    fetchBooks();
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const { supabase: sb } = await import('@/lib/supabase');
    const { data, error } = await sb.storage.from('books').upload(`${Date.now()}_${file.name}`, file);
    if (error) { console.error(error); return; }
    const { data: urlData } = sb.storage.from('books').getPublicUrl(`${Date.now()}_${file.name}`);
    const url = urlData?.publicUrl ?? '';
    setForm({ ...form, pdf_file: url });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{t.admin.manageBooks}</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? t.admin.cancel : t.admin.addBook}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-xl border border-slate-200 p-6 mb-8">
          <div className="space-y-6">
            <div className="border-b border-slate-200 pb-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">{t.admin.english}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t.admin.titleEn} value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
                <input type="text" placeholder={t.admin.authorEn} value={form.author_en} onChange={e => setForm({...form, author_en: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" />
              </div>
              <div className="mt-3">
                <RichTextEditor value={form.description_en} onChange={description_en => setForm({...form, description_en})} placeholder={t.admin.descriptionEn} />
              </div>
            </div>
            
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-slate-700 mb-3">{t.admin.armenian}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t.admin.titleHy} value={form.title_hy} onChange={e => setForm({...form, title_hy: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" dir="rtl" />
                <input type="text" placeholder={t.admin.authorHy} value={form.author_hy} onChange={e => setForm({...form, author_hy: e.target.value})} className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-slate-800" dir="rtl" />
              </div>
              <div className="mt-3">
                <RichTextEditor value={form.description_hy} onChange={description_hy => setForm({...form, description_hy})} placeholder={t.admin.descriptionHy} />
              </div>
            </div>
            
            <label className="flex flex-col gap-2">
              <span>{t.admin.pdfFile}:</span>
              <input type="file" accept="application/pdf" onChange={handleFileUpload} />
            </label>
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
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id} className="border-b border-slate-200">
                  <td className="p-4 text-slate-900">{book.title_en}</td>
                  <td className="p-4 text-slate-900">{book.title_hy}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(book.id)} className="text-red-500 hover:text-red-400 text-sm">{t.admin.delete}</button>
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
