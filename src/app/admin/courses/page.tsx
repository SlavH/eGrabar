'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/types';
import { useApp } from '@/lib/context';
import RichTextEditor from '@/components/ui/RichTextEditor';

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', date: '', time: '', zoom_link: '', instructor: '' });
  const { t, language } = useApp();

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const { supabase } = await import('@/lib/supabase');
    const { data } = await supabase.from('events').select('*').order('date', { ascending: false });
    if (data) setEvents(data);
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('events').insert([form]);
    setForm({ title: '', description: '', date: '', time: '', zoom_link: '', instructor: '' });
    setShowForm(false);
    fetchEvents();
  }

  async function handleDelete(id: string) {
    const { supabase } = await import('@/lib/supabase');
    await supabase.from('events').delete().eq('id', id);
    fetchEvents();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{language === 'en' ? 'Manage Courses' : 'Կառավարել Դասընթացները'}</h1>
        <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white font-semibold rounded-lg">
          {showForm ? (language === 'en' ? 'Cancel' : 'Չեղարկել') : (language === 'en' ? 'Add Course' : 'Ավելացնել Դասընթաց')}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Title" value={form.title} onChange={e => setForm({...form, title: e.target.value})} required className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-slate-100" />
            <input type="text" placeholder="Instructor" value={form.instructor} onChange={e => setForm({...form, instructor: e.target.value})} required className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-slate-100" />
            <input type="date" value={form.date} onChange={e => setForm({...form, date: e.target.value})} required className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-slate-100" />
            <input type="time" value={form.time} onChange={e => setForm({...form, time: e.target.value})} required className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-slate-100" />
            <input type="text" placeholder="Join Link" value={form.zoom_link} onChange={e => setForm({...form, zoom_link: e.target.value})} required className="px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-slate-100 md:col-span-2" />
            <RichTextEditor value={form.description} onChange={description => setForm({...form, description})} placeholder="Description" />
          </div>
          <button type="submit" className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg">{language === 'en' ? 'Save' : 'Պահպանել'}</button>
        </form>
      )}

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-white/10 backdrop-blur-md rounded-lg animate-pulse" />)}</div>
      ) : (
        <div className="bg-white/10 backdrop-blur-md rounded-xl border border-white/20 overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="border-b border-white/20">
              <tr className="text-left text-slate-300 text-sm">
                <th className="p-4">{language === 'en' ? 'Title' : 'Վերնագիր'}</th>
                <th className="p-4">{language === 'en' ? 'Date' : 'Ամսաթիվ'}</th>
                <th className="p-4">{language === 'en' ? 'Instructor' : 'Վարորդ'}</th>
                <th className="p-4 w-24"></th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} className="border-b border-white/20">
                  <td className="p-4 text-slate-100">{event.title}</td>
                  <td className="p-4 text-slate-300">{event.date} {event.time}</td>
                  <td className="p-4 text-slate-300">{event.instructor}</td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(event.id)} className="text-red-500 hover:text-red-400 text-sm">{language === 'en' ? 'Delete' : 'Ջնջել'}</button>
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
