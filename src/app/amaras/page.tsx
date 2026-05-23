'use client';

import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

export default function AmarasCenterPage() {
  const { language } = useApp();
  
  return (
    <main className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <a href="mailto:amarascenter@gmail.com" className="block mb-8">
            <img src="/amaras.png" alt="Amaras Center" className="w-32 h-32 mx-auto mb-8 hover:opacity-80 transition-opacity" />
        </a>
        <h1 className="text-4xl font-bold text-white mb-6">{language === 'en' ? 'Amaras Center' : 'Ամարաս Կենտրոն'}</h1>
        <p className="text-lg text-slate-600 mb-12">
            {language === 'en' ? 'Preserving Armenian Knowledge through Digital Innovation' : 'Հայկական գիտելիքի պահպանումը թվային նորարարության միջոցով'}
        </p>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold text-blue-300 mb-4">
              {language === 'en' ? 'Our Mission' : 'Մեր առաքելությունը'}
            </h3>
            <p className="text-slate-300 leading-relaxed mb-6">
              {language === 'en' 
                ? 'The Amaras Center is dedicated to preserving, promoting, and transmitting Armenian cultural, spiritual, and educational heritage — drawing inspiration from the ancient Amaras Monastery in Artsakh, a historic cradle of Armenian Christianity, scholarship, and identity since the 4th century.'
                : 'Ամարաս կենտրոնը նվիրված է հայկական մշակութային, հոգևոր և կրթական ժառանգության պահպանմանը, տարածմանը և փոխանցմանը` ոգեշնչվելով Արցախի հնագույն Ամարասի վանքից, որը հայ քրիստոնեության, գիտության և ինքնության պատմական օրրանն է 4-րդ դարից:'}
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              {language === 'en'
                ? 'We empower the Armenian community through high-quality educational programs and courses that strengthen language, culture, history, and national consciousness. We provide charitable support to vulnerable groups, including families of fallen soldiers and displaced people from Artsakh.'
                : 'Մենք հզորացնում ենք հայ համայնքը բարձրորակ կրթական ծրագրերի և դասընթացների միջոցով, որոնք ամրապնդում են լեզուն, մշակույթը, պատմությունը և ազգային գիտակցությունը: Մենք բարեգործական աջակցություն ենք ցուցաբերում խոցելի խմբերին, այդ թվում՝ զոհված զինվորների ընտանիքներին և Արցախից տեղահանված անձանց:'}
            </p>
            <p className="text-slate-300 leading-relaxed mb-6">
              {language === 'en'
                ? 'We actively advocate for the protection of Armenian historical monuments and cultural sites, especially in the face of ongoing threats and destruction.'
                : 'Մենք ակտիվորեն պաշտպանում ենք հայկական պատմական հուշարձանների և մշակութային օջախների պահպանությունը, հատկապես շարունակվող սպառնալիքների և ոչնչացման պայմաններում:'}
            </p>
            <p className="text-slate-300 leading-relaxed">
              {language === 'en'
                ? 'Our vision is a resilient, united Armenian diaspora and homeland that honors its roots, educates future generations, supports those in need, and defends its irreplaceable heritage on the global stage. Through knowledge, compassion, and principled action, we keep the spirit of Amaras alive — as a beacon of enlightenment, resilience, and cultural continuity.'
                : 'Մեր տեսլականը կայուն, միասնական հայկական սփյուռքն ու հայրենիքն է, որը հարգում է իր արմատները, կրթում ապագա սերունդներին, աջակցում կարիքավորներին և պաշտպանում իր անփոխարինելի ժառանգությունը համաշխարհային բեմում: Գիտելիքի, կարեկցանքի և սկզբունքային գործողությունների միջոցով մենք պահում ենք Ամարասի ոգին կենդանի՝ որպես լուսավորության, կայունության և մշակութային շարունակականության փարոս:'}
            </p>
          </div>

      </div>
    </main>
  );
}
