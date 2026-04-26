'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/lib/context';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout, t, language, authLoading } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      // router.push('/admin/login'); // BYPASS ENABLED
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (false) {
    // Show a friendly login prompt instead of rendering nothing
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center text-slate-600">
          <p>{language === 'en' ? 'Not authenticated' : 'Անձնական մուտքը չի հաստատված'}</p>
          <Link href="/admin/login" className="mt-2 inline-block text-blue-600 font-semibold">
            {language === 'en' ? 'Go to Admin Login' : 'Գործարկել ադմին մուտք'}
          </Link>
        </div>
      </div>
    );
  }

  const adminNav = [
    { href: '/admin', label: language === 'en' ? 'Dashboard' : 'Վահանակ', icon: '📊' },
    { href: '/admin/news', label: language === 'en' ? 'News' : 'Լրաշարք', icon: '📰' },
    { href: '/admin/books', label: language === 'en' ? 'Books' : 'Գրքեր', icon: '📚' },
    { href: '/admin/videos', label: language === 'en' ? 'Videos' : 'Տեսանյութեր', icon: '🎥' },
    { href: '/admin/presentations', label: language === 'en' ? 'Presentations' : 'Ներկայացումներ', icon: '📊' },
    { href: '/admin/courses', label: language === 'en' ? 'Courses' : 'Դասընթացներ', icon: '📅' },
    { href: '/admin/donations', label: language === 'en' ? 'Donations' : 'Նվիրաբերություններ', icon: '💰' },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="flex">
        <aside className="w-64 min-h-[calc(100vh-5rem)] bg-slate-50 border-r border-slate-200 p-4">
          <nav className="space-y-1">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-8 pt-4 border-t border-slate-200">
            <button
              onClick={async () => { await logout(); router.push('/'); }}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-600 hover:text-red-500 hover:bg-white rounded-lg transition-colors"
            >
              <span>🚪</span>
              <span>{language === 'en' ? 'Logout' : 'Ելք'}</span>
            </button>
          </div>
        </aside>
        
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
