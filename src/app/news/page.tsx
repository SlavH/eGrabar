'use client';

import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

export default function NewsPage() {
  const { t } = useApp();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-background">
      <Hero
        title={t.nav.news}
        className="mb-8"
      />
      <div className="max-w-7xl mx-auto text-center py-20 text-slate-500">
        <p>{t.common.noNews}</p>
      </div>
    </main>
  );
}
