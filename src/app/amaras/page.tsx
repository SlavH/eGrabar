'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';
import { GlassCard } from '@/components/ui/glass-card';

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

  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <Hero
        title={language === 'en' ? 'Amaras Center' : 'Ամարաս Կենտրոն'}
        subtitle={language === 'en' ? 'Preserving Armenian Knowledge through Digital Innovation' : 'Հայկական գիտելիքի պահպանումը թվային նորարարության միջոցով'}
        className="mb-12"
      />

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/10 rounded-xl h-64 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {amaras.map((item) => (
              <GlassCard key={item.id} className="p-6">
                <h3 className="text-2xl font-bold text-blue-300 mb-4">
                  {getLocalizedText(item, 'title')}
                </h3>
                <div 
                  className="text-slate-300 leading-relaxed prose-custom"
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
