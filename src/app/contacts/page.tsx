'use client';

import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

export default function ContactsPage() {
  const { t, language } = useApp();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-background">
      <Hero
        title={t.nav.contacts}
        className="mb-8"
      />
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 space-y-6">
          <p className="text-slate-300">
            {t.contacts.contactUsAt}
          </p>
          <a href="mailto:amarascenter@gmail.com" className="block text-blue-300 hover:text-white text-lg">
            amarascenter@gmail.com
          </a>
          <div className="flex justify-center gap-6 pt-4 text-blue-300">
            <a href="tel:+17472039694" className="flex items-center gap-2 hover:text-blue-300 text-blue-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <strong>{t.contacts.whatsappViber}:</strong> +1-747-203-9694
            </a>
          </div>
          <div className="flex justify-center gap-6 pt-4 flex-wrap">
            <a 
              href="https://www.facebook.com/groups/1880715288860279" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>{t.contacts.facebook}</span>
            </a>
            <a 
              href="https://www.instagram.com/amarascenter/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c0 1.539-1.243 2.781-2.781 2.781-1.537 0-2.781-1.242-2.781-2.781 0-1.537 1.244-2.781 2.781-2.781 1.538 0 2.781 1.244 2.781 2.781z"/>
              </svg>
              <span>{t.contacts.instagram}</span>
            </a>
            <a 
              href="https://www.youtube.com/@amaras-center" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              <span>{t.contacts.youtube}</span>
            </a>
          </div>
        </div>

        <div className="text-center bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
          <p className="text-slate-400 text-sm">
            &copy; 2026 <a href="https://www.linkedin.com/in/slav-hayrapetyan-b867a5243" target="_blank" rel="noopener noreferrer" className="text-blue-300 hover:text-white transition-colors">Slav Hayrapetyan</a>. {t.contacts.copyright}
          </p>
        </div>
      </div>
    </main>
  );
}
