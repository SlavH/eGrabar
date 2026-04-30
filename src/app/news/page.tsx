'use client';

import { useState, useEffect } from 'react';
import { News } from '@/types';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';
import { GlassCard } from '@/components/ui/glass-card';

export default function NewsPage() {
  const { t, language, getLocalizedText } = useApp();
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('news').select('*').order('created_at', { ascending: false });
      if (data) setNews(data);
      setLoading(false);
    }
    fetchNews();
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-background">
      <Hero
        title={t.nav.news}
        className="mb-8"
      />
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-50 rounded-xl h-48 animate-pulse" />
            ))}
          </div>
        ) : news.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">{t.common.noNews}</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map((item) => (
              <GlassCard key={item.id} className="p-6 border border-white/20 backdrop-blur-md">
                <time className="text-xs text-slate-400 mb-3 block">
                  {new Date(item.created_at).toLocaleDateString(language === 'hy' ? 'hy-AM' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
                <h3 className="text-xl font-semibold mb-3 text-slate-100">{getLocalizedText(item, 'title')}</h3>
                <div className="text-slate-300 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: getLocalizedText(item, 'content') }} />
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
