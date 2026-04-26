'use client';

import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

export default function AmarasCenterPage() {
  const { language } = useApp();
  
  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <img src="/amaras.png" alt="Amaras Center" className="w-32 h-32 mx-auto mb-8" />
        <h1 className="text-4xl font-bold text-blue-600 mb-6">{language === 'en' ? 'Amaras Scientific Center' : 'Ամառաս գիտական կենտրոն'}</h1>
        <p className="text-lg text-slate-600 mb-12">
            {language === 'en' ? 'Preserving Armenian Knowledge through Digital Innovation' : 'Հայկական գիտելիքի պահպանումը թվային նորարարության միջոցով'}
        </p>
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
          <h3 className="text-2xl font-bold text-blue-600 mb-4">
            {language === 'en' ? 'Our Mission' : 'Մեր առաքելությունը'}
          </h3>
          <p className="text-slate-600 leading-relaxed">
            {language === 'en' 
              ? 'The Amaras Center acts as the primary hub for the digitization and preservation of Armenian scientific, religious, and cultural manuscripts. We bridge the gap between ancient scholarship and modern technology, ensuring that our heritage remains accessible to future generations.'
              : 'Ամառաս կենտրոնը հանդիսանում է հայկական գիտական, կրոնական և մշակութային ձեռագրերի թվայնացման և պահպանման հիմնական հանգույցը: Մենք կամրջում ենք հին գիտությունը և ժամանակակից տեխնոլոգիաները՝ ապահովելով մեր ժառանգության հասանելիությունը ապագա սերունդների համար:'}
          </p>
        </div>
      </div>
    </main>
  );
}
