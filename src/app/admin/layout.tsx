'use client';

import Link from 'next/link';
import { useApp } from '@/lib/context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, logout, t, language, authLoading } = useApp();
  const router = useRouter();
  const pathname = usePathname();

  const cookieOn = typeof window !== 'undefined' && document.cookie.includes('admin_session=1');

  useEffect(() => {
    if (!authLoading && !isAuthenticated && !cookieOn && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [authLoading, isAuthenticated, cookieOn, router, pathname]);

  if (authLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Allow access to login page
  if (pathname === '/admin/login') {
    return <main className="pt-20">{children}</main>;
  }

  if (!isAuthenticated && !cookieOn) {
    return null;
  }

  // Debug: Confirm rendering

  const adminNav = [
    { href: '/admin/news', label: t.nav.news, icon: '📰' },
    { href: '/admin/books', label: t.nav.library, icon: '📚' },
    { href: '/admin/videos', label: t.nav.videos, icon: '🎥' },
    { href: '/admin/presentations', label: t.nav.presentations, icon: '📊' },
    { href: '/admin/courses', label: t.nav.courses, icon: '🎓' },
    { href: '/admin/amaras', label: t.nav.amaras, icon: '🏛️' },
  ];

  return (
    <div className="min-h-screen pt-20">
      <div className="flex">
        <aside className="w-64 min-h-[calc(100vh-5rem)] bg-white/10 backdrop-blur-md border-r border-white/20 p-4 shrink-0">
          <nav className="space-y-1">
            {adminNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-blue-300 hover:bg-white/10 rounded-lg transition-colors"
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
          
          <div className="mt-8 pt-4 border-t border-white/20">
            <button
              onClick={async () => { await logout(); router.push('/'); }}
              className="flex items-center gap-3 w-full px-4 py-3 text-slate-300 hover:text-red-400 hover:bg-white/10 rounded-lg transition-colors"
            >
              <span>🚪</span>
              <span>{language === 'en' ? 'Logout' : 'Ելք'}</span>
            </button>
          </div>
        </aside>
        
        <main className="flex-1 p-8 text-white [&_h1]:text-white [&_h1]:brightness-150">
          {children}
        </main>
      </div>
    </div>
  );
}
