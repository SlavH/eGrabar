'use client';

import Background3D from "@/components/Background3D";
import Link from "next/link";
import { useApp } from "@/lib/context";
import { useEffect, useState } from "react";

export default function Home() {
  const { t, language } = useApp();
  const [news, setNews] = useState<any[]>([]);

  useEffect(() => {
    async function fetchNews() {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('news').select('*').limit(3).order('created_at', { ascending: false });
      if (data) setNews(data);
    }
    fetchNews();
  }, []);

  return (
    <main className="min-h-screen">
      <Background3D />
      
      <section className="relative min-h-screen flex items-center justify-center px-2 sm:px-4 md:px-6 pt-20">
        <div className="max-w-5xl w-full mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-600/20 text-blue-600 text-xs sm:text-sm mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            {t.home.tagline}
          </div>
          
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-snug flex flex-wrap justify-center items-center gap-x-2">
            <span className="relative inline-block">
              <span className="text-blue-600 text-base absolute -bottom-0.5 -left-3">{language === 'en' ? 'e' : 'ի'}</span>
              <span className="text-blue-400 ml-1.5">{language === 'en' ? 'Grabar' : 'Գրաբար'}</span>
            </span>
          </h1>
          
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-slate-600 mb-10 max-w-3xl mx-auto leading-normal">
            {t.home.subtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/library"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-600/20 transition-all text-sm sm:text-base"
            >
              {t.home.explore}
            </Link>
            <Link
              href="/center"
              className="px-6 py-3 sm:px-8 sm:py-4 border border-slate-300 rounded-xl text-slate-700 font-semibold hover:border-blue-600 hover:text-blue-600 transition-all text-sm sm:text-base"
            >
              {t.home.about}
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {news.length > 0 && (
        <section className="py-20 px-6 bg-white border-t border-slate-200">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">{t.nav.news}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item) => (
                <div key={item.id} className="p-6 bg-slate-50 rounded-2xl border border-slate-200">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <div className="text-slate-600 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: item.content }} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      <section className="py-20 px-6 border-t border-slate-200/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                ),
                key: 'digitalLibrary',
                href: '/library'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                ),
                key: 'videoHub',
                href: '/videos'
              },
              {
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                ),
                key: 'courses',
                href: '/courses'
              }
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group p-8 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-600/50 transition-all card-hover"
              >
                <div className="w-14 h-14 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-5 group-hover:bg-blue-600/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {t.sections[item.key as keyof typeof t.sections]}
                </h3>
                <p className="text-slate-500">{t.sections[item.key + 'Desc' as keyof typeof t.sections]}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
