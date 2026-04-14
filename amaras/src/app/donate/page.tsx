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
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-8 mb-12">
          <div className="flex justify-between text-slate-600 mb-2">
            <span>{language === 'en' ? 'Raised:' : 'Հավաքվել է:'} ${currentAmount.toLocaleString()}</span>
            <span>{language === 'en' ? 'Goal:' : 'Նպատակ:'} ${targetAmount.toLocaleString()}</span>
          </div>
          <div className="h-4 bg-white rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-br from-blue-600 to-blue-800" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-center text-slate-500 mt-2">{progress.toFixed(1)}% {language === 'en' ? 'funded' : 'ֆինանսավորված'}</p>
        </div>

        {submitted ? (
          <div className="bg-slate-50 rounded-2xl border border-blue-600/30 p-8 text-center">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {language === 'en' ? 'Thank you for your support!' : 'Շնորհակալ ենք ձեր աջակցության համար:'}
            </h3>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
            <div className="mb-6">
              <label className="block text-slate-600 mb-2">{language === 'en' ? 'Donation Amount ($)' : 'Նվիրաբերություն ($)'}</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Other amount"
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-zinc-500 focus:outline-none focus:border-blue-600"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'en' ? 'Email (for receipt)' : 'Էլ. Փոստ (հարգանքին համար)'}
                className="w-full mt-4 px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 placeholder-zinc-500 focus:outline-none focus:border-blue-600"
              />
            </div>
            <button
              type="submit"
              disabled={!amount}
              className="w-full py-4 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-600/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {language === 'en' ? 'Donate Now' : 'Նվիրաբերել Հիմա'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
