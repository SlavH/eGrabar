'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/types';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

const mockEvents: Event[] = [
  { id: '1', title: 'Armenian Medieval History Seminar', description: 'Deep dive into 12th century.', date: '2026-05-10', time: '14:00', zoom_link: 'https://zoom.us', instructor: 'Dr. Arzumanyan', created_at: new Date().toISOString() },
  { id: '2', title: 'Khachkar Art Workshop', description: 'Traditional stonework techniques.', date: '2026-05-15', time: '10:00', zoom_link: 'https://zoom.us', instructor: 'Prof. Sargsyan', created_at: new Date().toISOString() },
];

export default function EventsPage() {
  const { t, language, getLocalizedText } = useApp();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('events').select('*').gte('date', new Date().toISOString().split('T')[0]).order('date', { ascending: true });
      if (data && data.length > 0) {
        setEvents(data);
      } else {
        setEvents(mockEvents);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString(language === 'hy' ? 'hy-AM' : 'en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-background">
      <Hero
        title={t.nav.courses}
        subtitle={t.sections.coursesDesc}
        className="mb-8"
      />
      <div className="max-w-7xl mx-auto">

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-slate-50 rounded-xl h-32 animate-pulse" />
            ))}
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">{t.common.noEventsYet}</h3>
            <p className="text-slate-500">{t.common.noEventsHint}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="group bg-slate-50 rounded-xl p-6 border border-slate-200 card-hover">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="px-4 py-2 bg-blue-600/10 rounded-lg text-blue-600 font-semibold">
                        {formatDate(event.date)}
                      </div>
                      <div className="px-3 py-1 bg-sky-600/10 rounded-lg text-sky-600 text-sm">
                        {event.time}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">{getLocalizedText(event, 'title')}</h3>
                    <p className="text-slate-500 mb-2">{getLocalizedText(event, 'description')}</p>
                    <p className="text-slate-400 text-sm">
                      {t.common.instructor}: <span className="text-blue-600">{getLocalizedText(event, 'instructor')}</span>
                    </p>
                  </div>
                  <a
                    href={event.zoom_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-600-light text-white font-semibold rounded-xl transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {t.common.join}
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}