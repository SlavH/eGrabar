'use client';

import { useApp } from '@/lib/context';

const timeline = [
  {
    year: '1995',
    title: { en: 'Foundation', hy: 'Հիմնադրում' },
    description: {
      en: 'eGrabar Scientific Center was founded with the mission to preserve and promote Armenian scientific heritage.',
      hy: 'իԳրաբար գիտական կենտրոնը հիմնադրվեց հայկական գիտական ժառանգությունը պահպանելու և խթանելու նպատակով:',
    },
  },
  {
    year: '2005',
    title: { en: 'Digital Archive Launch', hy: 'Թվային Արխիվ' },
    description: {
      en: 'Launched our digital archive, making rare manuscripts and research accessible worldwide.',
      hy: 'Թողարկվեց մեր թվային արխիվը, դարձնելով հազվագյուտ ձեռագրերը և հետազոտությունները հասանելի ամբողջ աշխարհին:',
    },
  },
  {
    year: '2015',
    title: { en: 'International Recognition', hy: 'Միջազգային Ճանաչում' },
    description: {
      en: 'Received recognition from UNESCO for contributions to preserving cultural heritage.',
      hy: 'Մշակութային ժառանգության պահպանմանը նպաստելու համար ստացել է UNESCO-ի ճանաչում:',
    },
  },
  {
    year: '2024',
    title: { en: 'Global Expansion', hy: 'Գլոբալ Ընդլայնում' },
    description: {
      en: 'Expanded to become a global platform for Armenian scholarship and education.',
      hy: 'Ընդլայնվեց՝ դառնալով հայկական գիտության և կրթության համաշխարհային հարթակ:',
    },
  },
];

export default function HistoryPage() {
  const { t, language } = useApp();

  return (
    <main className="min-h-screen pt-24 pb-16">
      <section className="px-6 mb-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-blue-600 mb-6">{language === 'en' ? 'History' : 'Պատմություն'}</h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            {language === 'en' 
              ? 'Dedicated to preserving and advancing Armenian scientific knowledge through research, education, and digital preservation.'
              : 'Նվիրված է հայկական գիտական գիտելիքների պահպանմանը և զարգացմանը հետազոտության, կրթության և թվային պահպանման միջոցով:'}
          </p>
        </div>
      </section>

      <section className="px-6 mb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: '📚', 
                title: language === 'en' ? 'Digital Library' : 'Թվային Գրադարան',
                desc: language === 'en' ? '10,000+ documents' : '10,000+ փաստաթղթեր'
              },
              { 
                icon: '🎥', 
                title: language === 'en' ? 'Video Archive' : 'Տեսանյութեր',
                desc: language === 'en' ? '500+ hours' : '500+ ժամ'
              },
              { 
                icon: '🌍', 
                title: language === 'en' ? 'Global Reach' : 'Գլոբալ Հասանելիություն',
                desc: language === 'en' ? '50,000+ users' : '50,000+ օգտատեր'
              },
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="text-4xl mb-4">{stat.icon}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{stat.title}</h3>
                <p className="text-blue-600 text-lg font-bold">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-blue-600 mb-12 text-center">
            {language === 'en' ? 'Our History' : 'Մեր Պատմությունը'}
          </h2>
          
          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 via-burgundy to-blue-600 hidden md:block" />
            
            {timeline.map((item, i) => (
              <div key={i} className={`flex items-center mb-16 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                    <span className="text-blue-600 font-bold text-lg">{item.year}</span>
                    <h3 className="text-xl font-semibold text-slate-900 mt-2">{item.title[language as keyof typeof item.title]}</h3>
                    <p className="text-slate-500 mt-2">{item.description[language as keyof typeof item.description]}</p>
                  </div>
                </div>
                <div className="hidden md:flex w-4 h-4 rounded-full bg-blue-600 shadow-lg shadow-blue-600/50 z-10" />
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
