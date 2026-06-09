'use client';

import { useState, useEffect } from 'react';
import { Presentation } from '@/types';
import { useApp } from '@/lib/context';

interface PresentationForm {
  title_en: string;
  title_hy: string;
  pdf_file: string;
}

export default function AdminPresentationsPage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PresentationForm>({ 
    title_en: '', title_hy: '', pdf_file: '' 
  });
  const { t, language } = useApp();

  useEffect(() => {
    fetchPresentations();
  }, []);

  async function fetchPresentations() {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase.from('presentations').select('*').order('created_at', { ascending: false });
    if (error) console.error(error);
    if (data) setPresentations(data);
    setLoading(false);
  }

  function handleEdit(ppt: Presentation) {
    setEditingId(ppt.id);
    setForm({
      title_en: ppt.title_en,
      title_hy: ppt.title_hy,
      pdf_file: ppt.pdf_file,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitting. Current form state:", form);
    try {
      const { supabase } = await import('@/lib/supabase');
      
      // Use the current form state directly
      const payload = {
        title_en: form.title_en,
        title_hy: form.title_hy,
        pdf_file: form.pdf_file,
      };

      console.log("Submitting payload:", payload);
      
      if (editingId) {
        const { error } = await supabase.from('presentations').update(payload).eq('id', editingId);
        console.log("Update response error:", error);
        if (error) {
          console.error("Update error:", error);
          alert("Failed to update: " + error.message);
          return;
        }
      } else {
        const { error } = await supabase.from('presentations').insert([payload]);
        console.log("Insert response error:", error);
        if (error) {
          console.error("Insert error:", error);
          alert("Failed to insert: " + error.message);
          return;
        }
      }
      
      alert("Successfully saved!");
      setForm({ title_en: '', title_hy: '', pdf_file: '' });
      setEditingId(null);
      setShowForm(false);
      fetchPresentations();
    } catch (err) {
      console.error(err);
      alert("An unexpected error occurred.");
    }
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    const { error } = await supabase.from('presentations').delete().eq('id', id);
    if (error) console.error(error);
    fetchPresentations();
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    
    // Clean the filename to be purely alphanumeric and safe
    const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const fileName = `presentation_${Date.now()}_${cleanFileName}`;
    
    console.log("Uploading file:", fileName);

    const { supabase: sb } = await import('@/lib/supabase');
    const { data, error } = await sb.storage.from('books').upload(fileName, file, {
        upsert: true,
        cacheControl: '3600',
    });
    if (error) { 
      console.error("Upload error:", error);
      alert("Upload failed: " + error.message);
      return; 
    }
    
    // Construct public URL manually because getPublicUrl might not be working as expected in all environments
    const url = `https://otlraznomgebrztljxta.supabase.co/storage/v1/object/public/books/${fileName}`;
    
    console.log("Setting pdf_file in form to:", url);
    setForm(prev => {
        const next = { ...prev, pdf_file: url };
        console.log("New form state:", next);
        return next;
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{t.admin.managePresentations}</h1>
        <button onClick={() => {
          if (showForm) {
            setShowForm(false);
            setEditingId(null);
            setForm({ title_en: '', title_hy: '', pdf_file: '' });
          } else {
            setShowForm(true);
          }
        }} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? t.admin.cancel : t.admin.addPresentation}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-8">
          <div className="space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">{t.admin.english}</h3>
              <input type="text" placeholder={t.admin.titleEn} value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" />
            </div>
            
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-slate-100 mb-3">{t.admin.armenian}</h3>
              <input type="text" placeholder={t.admin.titleHy} value={form.title_hy} onChange={e => setForm({...form, title_hy: e.target.value})} className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400" />
            </div>
            
            <label className="flex flex-col gap-2 text-slate-300">
              <span>PDF File (URL):</span>
              <input 
                type="text" 
                placeholder="https://..." 
                value={form.pdf_file} 
                onChange={e => setForm({...form, pdf_file: e.target.value})} 
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 placeholder-slate-400"
              />
            </label>
            <label className="flex flex-col gap-2 text-slate-300">
              <span>PDF File (Upload):</span>
              <input type="file" accept="application/pdf" onChange={handleFileUpload} className="text-slate-100" />
            </label>
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600/80 backdrop-blur-md text-white font-semibold rounded-lg mt-4 hover:bg-blue-600 transition-colors">{t.admin.save}</button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-x-auto p-6">
        <table className="w-full min-w-[400px] text-white">
            <thead className="border-b border-white/10">
              <tr className="text-left text-slate-300 text-sm">
                <th className="p-4">{language === 'en' ? 'English Title' : 'Վերնագիր (EN)'}</th>
                <th className="p-4">{language === 'hy' ? 'Հայերեն Վերնագիր' : 'Armenian Title'}</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {presentations.map(ppt => (
                <tr key={ppt.id} className="border-b border-white/5">
                  <td className="p-4 text-slate-100">{ppt.title_en}</td>
                  <td className="p-4 text-slate-100">{ppt.title_hy}</td>
                  <td className="p-4">
                    <button onClick={() => handleEdit(ppt)} className="text-blue-300 hover:text-blue-200 text-sm mr-4">{t.admin.edit}</button>
                    <button onClick={() => handleDelete(ppt.id)} className="text-red-300 hover:text-red-200 text-sm">{t.admin.delete}</button>
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
