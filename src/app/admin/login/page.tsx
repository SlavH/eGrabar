'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/context';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { language } = useApp();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    // Production login: call backend admin login API
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok && data?.ok !== false) {
      // Redirect to admin dashboard; cookie is set in API route
      window.location.assign('/admin');
    } else {
      setError(data?.error || (language === 'en' ? 'Invalid credentials' : 'Անվավեր տվյալներ'));
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">Ե</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">
            {language === 'en' ? 'Admin Login' : 'Ադմին Մուտք'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl border border-slate-200 p-8">
          <div className="mb-6">
            <label className="block text-slate-600 mb-2">
              {language === 'en' ? 'Email' : 'Էլ. Փոստ'}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          <div className="mb-6">
            <label className="block text-slate-600 mb-2">
              {language === 'en' ? 'Password' : 'Գաղտնաբառ'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-600"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-blue-600/20 transition-all disabled:opacity-50"
          >
            {loading ? (language === 'en' ? 'Signing in...' : 'Մուտք...') : (language === 'en' ? 'Sign In' : 'Մուտք')}
          </button>
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          {language === 'en' 
            ? 'Use your Supabase Auth credentials' 
            : 'Օգտագործեք ձեր Supabase Auth տվյալները'}
        </p>
      </div>
    </main>
  );
}
