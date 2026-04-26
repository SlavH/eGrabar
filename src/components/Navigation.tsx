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
        <Link href="/" className="flex items-center gap-1.5 group">
          <img src="/nur.png" alt="Logo" className="w-10 h-10 rounded-lg" />
          <span className="text-2xl font-semibold tracking-wide whitespace-nowrap relative inline-block">
            <span className="text-blue-300 text-xs absolute -bottom-0.5 -left-0.5">{language === 'en' ? 'e' : 'ի'}</span>
            <span className="text-blue-200 ml-1.5">{language === 'en' ? 'Grabar' : 'Գրաբար'}</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-200 hover:text-blue-300 transition-colors relative group whitespace-nowrap"
            >
              {t.nav[link.key as keyof typeof t.nav]}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3 relative z-[110]">
          <div className="flex rounded-lg overflow-hidden border border-white/20 relative z-[120]">
            <button
              onClick={(e) => { e.stopPropagation(); setLanguage('hy'); }}
              className={`px-2 py-1 text-xs font-medium transition-colors ${
                language === 'hy' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-blue-300'
              }`}
            >
              ՀԱ
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); setLanguage('en'); }}
              className={`px-2 py-1 text-xs font-medium transition-colors ${
                language === 'en' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:text-blue-300'
              }`}
            >
              ENG
            </button>
            <a
              href="https://facebook.com/egrabar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-300 hover:text-blue-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/egrabar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-300 hover:text-blue-300 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c0 1.539-1.243 2.781-2.781 2.781-1.537 0-2.781-1.242-2.781-2.781 0-1.537 1.244-2.781 2.781-2.781 1.538 0 2.781 1.244 2.781 2.781z"/>
              </svg>
            </a>
          </div>


          <button
            onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
            className="lg:hidden p-2 text-slate-200 hover:text-blue-600 relative z-[120]"
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
            <a
              href="https://facebook.com/egrabar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/egrabar"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c0 1.539-1.243 2.781-2.781 2.781-1.537 0-2.781-1.242-2.781-2.781 0-1.537 1.244-2.781 2.781-2.781 1.538 0 2.781 1.244 2.781 2.781z"/>
              </svg>
            </a>
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
        <div className="lg:hidden glass absolute top-full left-0 w-full p-4 border-t border-white/20 z-[100]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-3 text-slate-200 hover:text-blue-300 transition-colors border-b border-white/10 last:border-0 relative z-[110]"
            >
              {t.nav[link.key as keyof typeof t.nav]}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
