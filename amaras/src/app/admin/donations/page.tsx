'use client';

import { useState, useEffect } from 'react';
import { Donation } from '@/types';
import { useApp } from '@/lib/context';

export default function AdminDonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const { t, language } = useApp();

  useEffect(() => {
    fetchDonations();
  }, []);

  async function fetchDonations() {
    const { supabase } = await import('@/lib/supabase');
    const { data } = await supabase.from('donations').select('*').order('created_at', { ascending: false });
    if (data) setDonations(data);
    setLoading(false);
  }

  const totalAmount = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-blue-600">{language === 'en' ? 'Donations' : 'Նվիրաբերություններ'}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <p className="text-slate-500 text-sm">{language === 'en' ? 'Total Raised' : 'Ընդհանուր'}</p>
          <p className="text-2xl font-bold text-blue-600">${totalAmount.toLocaleString()}</p>
        </div>
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <p className="text-slate-500 text-sm">{language === 'en' ? 'Total Donors' : 'Նվիրաբերներ'}</p>
          <p className="text-2xl font-bold text-slate-900">{donations.length}</p>
        </div>
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-6">
          <p className="text-slate-500 text-sm">{language === 'en' ? 'Average Donation' : 'Միջին Նվիրաբերություն'}</p>
          <p className="text-2xl font-bold text-slate-900">${donations.length > 0 ? Math.round(totalAmount / donations.length) : 0}</p>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="h-16 bg-slate-50 rounded-lg animate-pulse" />)}</div>
      ) : donations.length === 0 ? (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-8 text-center">
          <p className="text-slate-500">{language === 'en' ? 'No donations yet' : 'Դեռևս նվիրաբերություններ չկան'}</p>
        </div>
      ) : (
        <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="border-b border-slate-200">
              <tr className="text-left text-slate-500 text-sm">
                <th className="p-4">{language === 'en' ? 'Donor' : 'Նվիրաբեր'}</th>
                <th className="p-4">{language === 'en' ? 'Amount' : 'Գումար'}</th>
                <th className="p-4">{language === 'en' ? 'Message' : 'Հաղորդագրություն'}</th>
                <th className="p-4">{language === 'en' ? 'Date' : 'Ամսաթիվ'}</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(donation => (
                <tr key={donation.id} className="border-b border-slate-200">
                  <td className="p-4 text-slate-900">{donation.anonymous ? (language === 'en' ? 'Anonymous' : 'Անանուն') : donation.donor_name}</td>
                  <td className="p-4 text-blue-600 font-semibold">${donation.amount}</td>
                  <td className="p-4 text-slate-600 truncate max-w-xs">{donation.message || '-'}</td>
                  <td className="p-4 text-slate-500 text-sm">{new Date(donation.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
