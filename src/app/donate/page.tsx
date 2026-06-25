'use client';

import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

export default function DonatePage() {
  const { t, language } = useApp();

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-background">
      <Hero
        title={t.nav.donate}
        className="mb-8"
      />
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-blue-500/50 transition-all text-center">
          <h3 className="text-xl font-bold text-slate-100 mb-4">{language === 'en' ? 'Support Our Mission' : 'Աջակցեք մեր առաքելությանը'}</h3>
          <p className="text-slate-300">
            {language === 'en' 
              ? 'Your contributions help support the study and digitization of Classical Armenian, the development of educational initiatives, and the implementation of charitable programs. Thank you for your generous support.'
              : 'Ձեր ներդրումները կօգնեն մեզ՝ գրաբարի ուսումնասիրման, թվայնացման բազմազան ձեռնարկներ, նաև բարեգործական ծրագրեր իրականացնելիս։ Շնորհակալություն Ձեր աջակցության համար։'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="https://buy.stripe.com/14AeV6dVwfp1cxYaS4eAg00"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-blue-500/50 transition-all text-center block"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
              <svg className="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.96 4.56 3.32 3.8 5.202 3.8 7.52c0 4.394 4.012 5.979 6.456 6.754 2.126.657 3.26 1.347 3.26 2.341 0 1.026-.802 1.642-2.227 1.642-2.129 0-4.802-1.118-6.516-2.043v6.113c3.068.984 5.632 1.289 7.703 1.289 4.52 0 7.714-2.106 7.714-5.804 0-4.546-4.233-5.976-6.634-6.642z"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-100 mb-2">
              {language === 'en' ? 'Donate via Stripe' : 'Նվիրաբերել Stripe-ով'}
            </h4>
            <p className="text-slate-400 text-sm">
              {language === 'en' ? 'Secure credit card payment' : 'Ապահով վարկային քարտով վճարում'}
            </p>
          </a>

          <a
            href="https://paypal.me/AmarasCenter"
            target="_blank"
            rel="noopener noreferrer"
            className="group p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-blue-500/50 transition-all text-center block"
          >
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-600/20 rounded-full flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
              <svg className="w-8 h-8 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"/>
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-100 mb-2">
              {language === 'en' ? 'Donate via PayPal' : 'Նվիրաբերել PayPal-ով'}
            </h4>
            <p className="text-slate-400 text-sm">
              {language === 'en' ? 'PayPal account or credit card' : 'PayPal հաշիվ կամ վարկային քարտ'}
            </p>
          </a>
        </div>
      </div>
    </main>
  );
}
