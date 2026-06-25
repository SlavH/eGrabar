'use client';

import { useState, useEffect } from 'react';
import PdfCoverPreview from '@/components/ui/PdfCoverPreview';
import { Presentation } from '@/types';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';
import { GlassCard, GlassCardContent, GlassCardTitle } from '@/components/ui/glass-card';
import ShareButtons from '@/components/ui/ShareButtons';

export default function PresentationsPage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useApp();

  useEffect(() => {
    async function fetchPresentations() {
      const { supabase } = await import('@/lib/supabase');
      const { data, error } = await supabase.from('presentations').select('*').order('created_at', { ascending: false });

      if (data) setPresentations(data);
      setLoading(false);
    }
    fetchPresentations();
  }, []);

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-background">
      <Hero
        title={t.nav.presentations}
        subtitle={t.sections.presentationsDesc}
        className="mb-8"
      />
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-slate-50 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : presentations.length === 0 ? (
          <div className="text-center py-20 text-white">
            <h3 className="text-xl font-semibold mb-2">{t.common.noPresentationsYet}</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {presentations.map((ppt) => (
              <a
                key={ppt.id}
                href={ppt.pdf_file || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
                onClick={(e) => {
                  if (!ppt.pdf_file || ppt.pdf_file === '' || ppt.pdf_file === '#') {
                    e.preventDefault();
                    alert('PDF not available');
                  }
                }}
              >
                <GlassCard className="card-hover h-full max-w-full">
                  <PdfCoverPreview src={ppt.pdf_file || ''} coverUrl={ppt.cover_url || ''} className="aspect-[3/4]" />
                  <GlassCardContent>
                    <GlassCardTitle className="text-slate-100 group-hover:text-blue-300 transition-colors break-words">
                      {language === 'en' ? ppt.title_en : ppt.title_hy}
                    </GlassCardTitle>
                    <div className="flex justify-end mt-2">
                      <ShareButtons title={language === 'en' ? ppt.title_en : ppt.title_hy} url={`/presentations#${ppt.id}`} />
                    </div>
                  </GlassCardContent>
                </GlassCard>
              </a>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
