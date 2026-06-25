'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';
import { GlassCard } from '@/components/ui/glass-card';
import ShareButtons from '@/components/ui/ShareButtons';

export default function AmarasCenterPage() {
  const { t, language, getLocalizedText } = useApp();
  const [amaras, setAmaras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAmaras() {
      const { supabase } = await import('@/lib/supabase');
      const { data } = await supabase.from('amaras').select('*').order('created_at', { ascending: true });
      if (data) setAmaras(data);
      setLoading(false);
    }
    fetchAmaras();
  }, []);

  useEffect(() => {
    if (!loading && amaras.length > 0 && window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [loading, amaras]);

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <Hero
        title={language === 'en' ? 'Amaras Center' : 'Ամարաս Կենտրոն'}
        subtitle={language === 'en' ? 'Preserving Armenian Knowledge through Digital Innovation' : 'Հայկական գիտելիքի պահպանումը թվային նորարարության միջոցով'}
        className="mb-12"
      />
      
      <div className="text-center mb-12">
        <img src="/amaras.png" alt="Amaras Center" className="w-24 h-24 mx-auto hover:opacity-80 transition-opacity" />
      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8">
            {amaras.map((item) => (
              <GlassCard key={item.id} id={item.id} className="p-8 xl:col-span-3 max-w-full">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h3 className="text-3xl font-bold text-blue-300 break-words">
                    {getLocalizedText(item, 'title')}
                  </h3>
                  <ShareButtons title={getLocalizedText(item, 'title')} url={`/amaras#${item.id}`} />
                </div>
                <div 
                  className="text-slate-300 leading-relaxed prose-custom prose-lg max-w-full break-words"
                  dangerouslySetInnerHTML={{ __html: getLocalizedText(item, 'content') }}
                />
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
