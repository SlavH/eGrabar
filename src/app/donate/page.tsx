'use client';

import { useState } from 'react';
import { useApp } from '@/lib/context';
import Hero from '@/components/Hero';

export default function DonatePage() {
  const { t, language } = useApp();
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [donorName, setDonorName] = useState('');
  const [message, setMessage] = useState('');
  const [anonymous, setAnonymous] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const targetAmount = 100000;
  const currentAmount = 34500;
  const progress = (currentAmount / targetAmount) * 100;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Initiate Stripe Checkout session via API route
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: Number(amount) || 0, donorName: email || 'Anonymous', email }),
    });
    const data = await res.json();
    if (data?.url) {
      window.location.href = data.url;
    } else {
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-16 px-6 bg-background">
      <Hero
        title={t.nav.donate}
        subtitle={language === 'en' ? 'Support our mission to preserve Armenian scientific heritage.' : 'Սատերեք մեր հանձնառությունը՝ պահպանելու հայկական գիտական ժառանգությունը:'}
        className="mb-8"
      />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 mb-12">
          <div className="flex justify-between text-slate-300 mb-2">
            <span>{language === 'en' ? 'Raised:' : 'Հավաքվել է:'} ${currentAmount.toLocaleString()}</span>
            <span>{language === 'en' ? 'Goal:' : 'Նպատակ:'} ${targetAmount.toLocaleString()}</span>
          </div>
          <div className="h-4 bg-white/20 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-br from-blue-500 to-blue-700" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-slate-300 mt-2">{progress.toFixed(1)}% {language === 'en' ? 'funded' : 'ֆինանսավորված'}</p>
        </div>

        {submitted ? (
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              {language === 'en' ? 'Thank you for your support!' : 'Շնորհակալ ենք ձեր աջակցության համար:'}
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">{language === 'en' ? 'Bank Transfer' : 'Բանկային փոխանցում'}</h3>
              <p className="text-slate-300">Bank Name: ...</p>
              <p className="text-slate-300">Account: ...</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-8">
              <h3 className="text-xl font-semibold text-slate-100 mb-4">{language === 'en' ? 'Crypto' : 'Կրիպտո'}</h3>
              <p className="text-slate-300">BTC: ...</p>
              <p className="text-slate-300">ETH: ...</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
