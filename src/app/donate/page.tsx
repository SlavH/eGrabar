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
        className="mb-8"
      />
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-blue-500/50 transition-all">
          <h3 className="text-xl font-bold text-slate-100 mb-4">Bank Transfer</h3>
          <p className="text-slate-300">Account: XXXX-XXXX-XXXX-XXXX</p>
          <p className="text-slate-300">Bank: ABC Bank</p>
        </div>
        <div className="p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 hover:border-blue-500/50 transition-all">
          <h3 className="text-xl font-bold text-slate-100 mb-4">Crypto</h3>
          <p className="text-slate-300">BTC: 1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</p>
          <p className="text-slate-300">ETH: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F</p>
        </div>
      </div>
    </main>
  );
}
