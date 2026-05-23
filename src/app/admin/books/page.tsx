'use client';

import { useState, useEffect, useRef } from 'react';
import { Book } from '@/types';
import { useApp } from '@/lib/context';

interface BookForm {
  title_en: string;
  title_hy: string;
  author_en: string;
  author_hy: string;
  pdf_file: string;
}

export default function AdminBooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState<BookForm>({ 
    title_en: '', title_hy: '', author_en: '', author_hy: '', 
    pdf_file: '' 
  });
  const { t, language } = useApp();
  const submittedRef = useRef(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase.from('books').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) setBooks(data);
    setLoading(false);
  }

  function handleEdit(book: Book) {
    setEditingId(book.id);
    setForm({
      title_en: book.title_en,
      title_hy: book.title_hy,
      author_en: book.author_en,
      author_hy: book.author_hy,
      pdf_file: book.pdf_file,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (submittedRef.current || submitting) return;
    submittedRef.current = true;
    setSubmitting(true);
    
    try {
      const { supabase } = await import('@/lib/supabase');
      
      if (editingId) {
        const { error } = await supabase.from('books').update({
          title_en: form.title_en,
          title_hy: form.title_hy,
          author_en: form.author_en,
          author_hy: form.author_hy,
          pdf_file: form.pdf_file,
        }).eq('id', editingId);
        if (error) console.error(error);
      } else {
        const { error } = await supabase.from('books').insert([{
          title_en: form.title_en,
          title_hy: form.title_hy,
          author_en: form.author_en,
          author_hy: form.author_hy,
          pdf_file: form.pdf_file,
        }]);
        if (error) console.error(error);
      }
      
      setForm({ title_en: '', title_hy: '', author_en: '', author_hy: '', pdf_file: '' });
      setEditingId(null);
      setShowForm(false);
      await fetchBooks();
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
    
    setTimeout(() => { submittedRef.current = false; }, 1000);
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    const { error } = await supabase.from('books').delete().eq('id', id);
    if (error) console.error(error);
    fetchBooks();
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    console.log("File detected:", file.name); // ЛОГ 1
    
    const { supabase: sb } = await import('@/lib/supabase');
    const fileName = `${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    
    const { data, error } = await sb.storage.from('books').upload(fileName, file);
    if (error) { 
      console.error("Upload error:", error); // ЛОГ 2
      return; 
    }
    
    const { data: urlData } = sb.storage.from('books').getPublicUrl(fileName);
    console.log("Uploaded URL:", urlData?.publicUrl); // ЛОГ 3
    setForm({ ...form, pdf_file: urlData?.publicUrl || '' });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{t.admin.manageBooks}</h1>
        <button onClick={() => {
          if (showForm) {
            setShowForm(false);
            setEditingId(null);
            setForm({ title_en: '', title_hy: '', author_en: '', author_hy: '', pdf_file: '' });
          } else {
            setShowForm(true);
          }
        }} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? t.admin.cancel : t.admin.addBook}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-8">
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">{t.admin.english}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t.admin.titleEn} value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" />
                <input type="text" placeholder={t.admin.authorEn} value={form.author_en} onChange={e => setForm({...form, author_en: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" />
              </div>
            </div>
            
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">{t.admin.armenian}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t.admin.titleHy} value={form.title_hy} onChange={e => setForm({...form, title_hy: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" />
                <input type="text" placeholder={t.admin.authorHy} value={form.author_hy} onChange={e => setForm({...form, author_hy: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" />
              </div>
            </div>
            
            <label className="flex flex-col gap-2 text-slate-300">
              <span>{t.admin.pdfFile}:</span>
              <input type="file" accept="application/pdf" onChange={handleFileUpload} className="text-slate-100" />
            </label>
          </div>
          <button type="submit" disabled={submitting} className="px-6 py-2 bg-blue-600/80 backdrop-blur-md text-white font-semibold rounded-lg mt-4 disabled:opacity-50">
            {submitting ? 'Saving...' : t.admin.save}
          </button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-x-auto p-6">
        <table className="w-full min-w-[600px] text-white">
            <thead className="border-b border-white/10">
              <tr className="text-left text-slate-300 text-sm">
                <th className="p-4">{language === 'en' ? 'English Title' : 'Վերնագիր (EN)'}</th>
                <th className="p-4">{language === 'hy' ? 'Հայերեն Վերնագիր' : 'Armenian Title'}</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book.id} className="border-b border-white/5">
                  <td className="p-4 text-slate-100">{book.title_en}</td>
                  <td className="p-4 text-slate-100">{book.title_hy}</td>
                  <td className="p-4">
                    <button onClick={() => handleEdit(book)} className="text-blue-300 hover:text-blue-200 text-sm mr-4">{t.admin.edit}</button>
                    <button onClick={() => handleDelete(book.id)} className="text-red-300 hover:text-red-200 text-sm">{t.admin.delete}</button>
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
