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
        <LibraryGrid />
      </div>
    </main>
  );
}
