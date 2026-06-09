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
      const { data, error } = await supabase.from('presentations').select('*').order('created_at', { ascending: false });
      if (error) console.error("Error fetching presentations:", error);
      if (data) {
        console.log("Presentations fetched:", data);
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
          <div className="text-center py-20 text-white">
            <h3 className="text-xl font-semibold mb-2">{t.common.noPresentationsYet}</h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {presentations.map((ppt) => (
              <div key={ppt.id} className="group bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/20 card-hover flex flex-col">
                <a 
                    href={ppt.pdf_file} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="aspect-[3/4] relative overflow-hidden bg-white/5 block flex-shrink-0"
                    onClick={(e) => {
                      if (!ppt.pdf_file || ppt.pdf_file.trim() === '') {
                        e.preventDefault();
                        alert('PDF not available');
                      }
                    }}
                >
                  {ppt.pdf_file ? (
                    <PdfCoverPreview src={ppt.pdf_file} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white/50">
                        <span>No PDF</span>
                    </div>
                  )}
                </a>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <h3 className="font-semibold text-slate-100 line-clamp-2 mb-3">{getLocalizedText(ppt, 'title')}</h3>
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
