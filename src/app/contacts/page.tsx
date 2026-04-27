'use client';

import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

export default function ContactsPage() {
  const { language } = useApp();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-background">
      <Hero
        title={language === 'en' ? 'Contacts' : 'Կապ'}
        className="mb-8"
      />
      <div className="max-w-4xl mx-auto text-center bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 space-y-6">
        <p className="text-slate-300">
          {language === 'en' ? 'Contact us at:' : 'Կապնվեք մեզ հետ՝'}
        </p>
        <a href="mailto:amarascenter@gmail.com" className="block text-blue-600 hover:text-blue-800 text-lg">
          amarascenter@gmail.com
        </a>
        <div className="flex justify-center gap-6 pt-4 text-blue-600">
          <span className="flex items-center gap-2">
            <strong>Whatsapp Viber:</strong> +1-747-203-9694
          </span>
        </div>
        <div className="flex justify-center gap-6 pt-4">
          <a 
            href="https://www.facebook.com/groups/1880715288860279" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span>Facebook</span>
          </a>
          <a 
            href="https://www.instagram.com/amarascenter/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c0 1.539-1.243 2.781-2.781 2.781-1.537 0-2.781-1.242-2.781-2.781 0-1.537 1.244-2.781 2.781-2.781 1.538 0 2.781 1.244 2.781 2.781z"/>
            </svg>
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </main>
  );
}
