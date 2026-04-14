'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/context';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/news', key: 'news' },
  { href: '/library', key: 'library' },
  { href: '/videos', key: 'videos' },
  { href: '/presentations', key: 'presentations' },
  { href: '/history', key: 'history' },
  { href: '/courses', key: 'courses' },
  { href: '/amaras', key: 'amaras' },
  { href: '/donate', key: 'donate' },
  { href: '/contacts', key: 'contacts' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t, language, setLanguage } = useApp();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <img src="/nur.png" alt="Logo" className="w-10 h-10 rounded-lg" />
          <span className="text-2xl font-semibold tracking-wide whitespace-nowrap">
            <span className="text-blue-600">{language === 'en' ? 'e' : 'ի'}</span>
            <span className="text-blue-400">{language === 'en' ? 'Grabar' : 'Գրաբար'}</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-700 hover:text-blue-600 transition-colors relative group whitespace-nowrap"
            >
              {t.nav[link.key as keyof typeof t.nav]}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 relative z-[110]">
          <div className="flex rounded-lg overflow-hidden border border-slate-300 relative z-[120]">
            <button
              onClick={(e) => { e.stopPropagation(); setLanguage('hy'); }}
              className={`px-2 py-1 text-xs font-medium transition-colors ${
                language === 'hy' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              ՀԱ
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLanguage('en'); }}
              className={`px-2 py-1 text-xs font-medium transition-colors ${
                language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              ENG
            </button>
          </div>

          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
            className="lg:hidden p-2 text-slate-700 hover:text-blue-600 relative z-[120]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="lg:hidden glass absolute top-full left-0 w-full p-4 border-t border-slate-200 z-[100]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-slate-700 hover:text-blue-600 transition-colors border-b border-slate-200 last:border-0 relative z-[110]"
            >
              {t.nav[link.key as keyof typeof t.nav]}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
