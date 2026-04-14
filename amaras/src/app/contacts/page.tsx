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
      <div className="max-w-4xl mx-auto text-center bg-slate-50 p-8 rounded-2xl border border-slate-200">
        <p className="text-slate-600">
          {language === 'en' ? 'Contact us at: info@egrabar.am' : 'Կապնվեք մեզ հետ՝ info@egrabar.am'}
        </p>
      </div>
    </main>
  );
}
