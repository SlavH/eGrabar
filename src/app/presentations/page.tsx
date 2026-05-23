'use client';

import { useState, useEffect } from 'react';
import PdfCoverPreview from '@/components/ui/PdfCoverPreview';
import { Presentation } from '@/types';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

export default function PresentationsPage() {
  const [presentations, setPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, getLocalizedText } = useApp();

  useEffect(() => {
    async function fetchPresentations() {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('presentations').select('*').order('created_at', { ascending: false });
      if (data && data.length > 0) {
        setPresentations(data);
      }
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
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-slate-50 flex items-center justify-center">
              <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-600 mb-2">{t.common.noPresentationsYet}</h3>
            <p className="text-slate-500">{t.common.noPresentationsHint}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {presentations.map((ppt) => (
              <div key={ppt.id} className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 card-hover">
                <a href={ppt.pdf_file} target="_blank" rel="noopener noreferrer" className="aspect-[3/4] relative overflow-hidden bg-white/5 block">
                  {ppt.pdf_file ? (
                    <PdfCoverPreview src={ppt.pdf_file} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                  )}
                </a>
                <div className="p-4">
                  <h3 className="font-semibold text-slate-100 line-clamp-2 mb-3 group-hover:text-blue-300 transition-colors">{getLocalizedText(ppt, 'title')}</h3>
                  {ppt.pdf_file && (
                    <a href={ppt.pdf_file} target="_blank" rel="noopener noreferrer" className="w-full py-2 bg-blue-600/80 backdrop-blur-md text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors block text-center">
                      {t.common.download}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
