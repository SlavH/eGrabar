'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';

export default function AdminDashboard() {
  const { t, language, isAuthenticated, authLoading } = useApp();
  const cookieOn = typeof window !== 'undefined' && document.cookie.includes('admin_session=1');
  const isAuthorized = isAuthenticated || cookieOn;
  const [stats, setStats] = useState({ books: 0, videos: 0, presentations: 0, events: 0, donations: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const { supabase } = await import('@/lib/supabase');
      const [books, videos, presentations, events, donations] = await Promise.all([
        supabase.from('books').select('id', { count: 'exact', head: true }),
        supabase.from('videos').select('id', { count: 'exact', head: true }),
        supabase.from('presentations').select('id', { count: 'exact', head: true }),
        supabase.from('events').select('id', { count: 'exact', head: true }),
        supabase.from('donations').select('id', { count: 'exact', head: true }),
      ]);
      setStats({
        books: books.count || 0,
        videos: videos.count || 0,
        presentations: presentations.count || 0,
        events: events.count || 0,
        donations: donations.count || 0,
      });
      setLoading(false);
    }
    fetchStats();
  }, []);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-slate-600">Loading admin session...</span>
      </div>
    );
  }
  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="text-slate-600 mb-4">{language === 'en' ? 'Not authenticated' : 'Անհրաժարված մուտք'}</p>
        <Link href="/admin/login" className="px-4 py-2 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg font-semibold">
          {language === 'en' ? 'Go to Admin Login' : 'Գնալ ադմին մուտք'}
        </Link>
      </div>
    );
  }

  const statCards = [
    { label: language === 'en' ? 'Books' : 'Գրքեր', value: stats.books, icon: '📚', color: 'bg-blue-600/10 text-blue-600' },
    { label: language === 'en' ? 'Videos' : 'Տեսանյութեր', value: stats.videos, icon: '🎥', color: 'bg-sky-600/10 text-sky-600' },
    { label: language === 'en' ? 'Presentations' : 'Ներկայացումներ', value: stats.presentations, icon: '📊', color: 'bg-blue-500/10 text-blue-500' },
    { label: language === 'en' ? 'Events' : 'Միջոցառումներ', value: stats.events, icon: '📅', color: 'bg-green-500/10 text-green-500' },
    { label: language === 'en' ? 'Donations' : 'Նվիրաբերություններ', value: stats.donations, icon: '💰', color: 'bg-purple-500/10 text-purple-500' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold text-blue-600 mb-8">
        {language === 'en' ? 'Dashboard' : 'Վահանակ'}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className="bg-slate-50 rounded-xl border border-slate-200 p-6">
            <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center text-2xl mb-4`}>
              {stat.icon}
            </div>
            <p className="text-slate-500 text-sm">{stat.label}</p>
            {loading ? (
              <div className="h-8 bg-zinc-800 rounded animate-pulse mt-1" />
            ) : (
              <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
