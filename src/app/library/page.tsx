'use client';

import LibraryGrid from '@/components/LibraryGrid';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

export default function LibraryPage() {
  const { t } = useApp();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <Hero title={t.nav.library} subtitle={t.sections.libraryDesc} className="mb-8" />
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-blue-600 mb-4">{t.nav.library}</h1>
          <p className="text-slate-600 text-lg max-w-2xl">
            {t.sections.libraryDesc}
          </p>
        </div>
        <LibraryGrid />
      </div>
    </main>
  );
}
