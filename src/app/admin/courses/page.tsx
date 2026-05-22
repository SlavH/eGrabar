'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/types';
import { useApp } from '@/lib/context';

interface EventForm {
  title_en: string;
  title_hy: string;
  instructor_en: string;
  instructor_hy: string;
  date: string;
  time: string;
  link: string;
}

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<EventForm>({ 
    title_en: '', title_hy: '', 
    instructor_en: '', instructor_hy: '', date: '', time: '', link: '' 
  });
  const { t, language } = useApp();

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { supabase } = await import('@/lib/supabase');
    const { data, error } = await supabase.from('events').select('*').order('date', { ascending: false });
    if (error) console.error(error);
    if (data) setEvents(data);
    setLoading(false);
  }

  function handleEdit(event: Event) {
    setEditingId(event.id);
    setForm({
      title_en: event.title_en,
      title_hy: event.title_hy,
      instructor_en: event.instructor_en,
      instructor_hy: event.instructor_hy,
      date: event.date,
      time: event.time,
      link: event.link,
    });
    setShowForm(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const { supabase } = await import('@/lib/supabase');
      
      if (editingId) {
        const { error } = await supabase.from('events').update({
          title_en: form.title_en,
          title_hy: form.title_hy,
          instructor_en: form.instructor_en,
          instructor_hy: form.instructor_hy,
          date: form.date,
          time: form.time,
          link: form.link,
        }).eq('id', editingId);
        if (error) console.error(error);
      } else {
        const { error } = await supabase.from('events').insert([{
          title_en: form.title_en,
          title_hy: form.title_hy,
          instructor_en: form.instructor_en,
          instructor_hy: form.instructor_hy,
          date: form.date,
          time: form.time,
          link: form.link,
        }]);
        if (error) console.error(error);
      }
      
      setForm({ title_en: '', title_hy: '', instructor_en: '', instructor_hy: '', date: '', time: '', link: '' });
      setEditingId(null);
      setShowForm(false);
      fetchEvents();
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    const { error } = await supabase.from('events').delete().eq('id', id);
    if (error) console.error(error);
    fetchEvents();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{t.admin.manageCourses}</h1>
        <button onClick={() => {
          if (showForm) {
            setShowForm(false);
            setEditingId(null);
            setForm({ title_en: '', title_hy: '', instructor_en: '', instructor_hy: '', date: '', time: '', link: '' });
          } else {
            setShowForm(true);
          }
        }} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? t.admin.cancel : t.admin.addCourse}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 mb-8">
          <div className="space-y-6">
            <div className="border-b border-white/20 pb-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-3">{t.admin.english}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t.admin.titleEn} value={form.title_en} onChange={e => setForm({...form, title_en: e.target.value})} className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-slate-100" />
                <input type="text" placeholder={t.admin.instructorEn} value={form.instructor_en} onChange={e => setForm({...form, instructor_en: e.target.value})} className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-slate-100" />
              </div>
            </div>
            
            <div className="pb-4">
              <h3 className="text-lg font-semibold text-slate-200 mb-3">{t.admin.armenian}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={t.admin.titleHy} value={form.title_hy} onChange={e => setForm({...form, title_hy: e.target.value})} className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-slate-100" />
                <input type="text" placeholder={t.admin.instructorHy} value={form.instructor_hy} onChange={e => setForm({...form, instructor_hy: e.target.value})} className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-slate-100" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100" />
              <input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} required className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100" />
              <input type="text" placeholder="Link" value={form.link} onChange={e => setForm({...form, link: e.target.value})} required className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-slate-100 md:col-span-2 placeholder-slate-400" />
            </div>
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600/80 backdrop-blur-md text-white font-semibold rounded-lg mt-4 hover:bg-blue-600 transition-colors">{t.admin.save}</button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-white/5 rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="bg-white/5 backdrop-blur-md rounded-xl border border-white/10 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="border-b border-white/10">
              <tr className="text-left text-slate-300 text-sm">
                <th className="p-4">{language === 'en' ? 'English Title' : 'Վերնագիր (EN)'}</th>
                <th className="p-4">{language === 'hy' ? 'Հայերեն Վերնագիր' : 'Armenian Title'}</th>
                <th className="p-4">{t.admin.date}</th>
                <th className="p-4">{t.admin.instructor}</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="border-b border-white/5">
                  <td className="p-4 text-slate-100">{event.title_en}</td>
                  <td className="p-4 text-slate-100">{event.title_hy}</td>
                  <td className="p-4 text-slate-300">{event.date} {event.time}</td>
                  <td className="p-4 text-slate-300">{language === 'en' ? event.instructor_en : event.instructor_hy}</td>
                  <td className="p-4">
                    <button onClick={() => handleEdit(event)} className="text-blue-300 hover:text-blue-200 text-sm mr-4">{t.admin.edit}</button>
                    <button onClick={() => handleDelete(event.id)} className="text-red-300 hover:text-red-200 text-sm">{t.admin.delete}</button>
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
