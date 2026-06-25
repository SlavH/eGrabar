'use client';

import { useState, useEffect } from 'react';
import { Event } from '@/types';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';
import { formatArmenianDate } from '@/lib/dateFormatter';
import ShareButtons from '@/components/ui/ShareButtons';

export default function EventsPage() {
  const { t, language, getLocalizedText } = useApp();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('events').select('*').order('date', { ascending: true });
      if (data && data.length > 0) {
        setEvents(data);
      }
      setLoading(false);
    }
    fetchEvents();
  }, []);

  useEffect(() => {
    if (!loading && events.length > 0 && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [loading, events]);

  const formatDate = (dateStr: string) => {
    return language === 'hy' 
      ? formatArmenianDate(dateStr) 
      : new Date(dateStr).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
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
          <div className="space-y-6">
            {events.map((event) => (
              <div key={event.id} id={event.id} className="group rounded-2xl p-6 border border-white/20 bg-white/10 backdrop-blur-[3px] card-hover max-w-full">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4 flex-wrap min-w-0">
                    <div className="px-4 py-2 bg-blue-600/20 rounded-lg text-blue-300 font-semibold backdrop-blur-[3px] shrink-0">
                      {formatDate(event.date)}
                    </div>
                    <div className="px-3 py-1 bg-sky-600/20 rounded-lg text-sky-300 text-sm backdrop-blur-[3px] shrink-0">
                      {event.time}
                    </div>
                    {event.link && (
                      <a
                        href={event.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/80 backdrop-blur-[3px] hover:bg-blue-500/80 text-white text-sm font-semibold rounded-lg transition-colors border border-white/20 shrink-0"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                        </svg>
                        {t.common.join}
                      </a>
                    )}
                    <p className="text-slate-400 text-sm shrink-0">
                      {t.common.instructor}: <span className="text-blue-300">{getLocalizedText(event, 'instructor')}</span>
                    </p>
                  </div>
                  <ShareButtons title={getLocalizedText(event, 'title')} url={`/courses#${event.id}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors break-words">{getLocalizedText(event, 'title')}</h3>
                <div className="text-slate-300 mb-2 prose-custom max-w-full break-words" dangerouslySetInnerHTML={{ __html: getLocalizedText(event, 'content') }} />
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
