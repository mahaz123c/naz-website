'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase-client';
import type { Enquiry, Valuation } from '@/lib/types';

type Tab = 'enquiries' | 'valuations';

export default function AdminEnquiriesPage() {
  const [tab, setTab] = useState<Tab>('enquiries');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [valuations, setValuations] = useState<Valuation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient();

      const [enqRes, valRes] = await Promise.all([
        supabase.from('enquiries').select('*').order('created_at', { ascending: false }),
        supabase.from('valuations').select('*').order('created_at', { ascending: false }),
      ]);

      if (enqRes.data) setEnquiries(enqRes.data as Enquiry[]);
      if (valRes.data) setValuations(valRes.data as Valuation[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Enquiries & Valuations</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab('enquiries')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            tab === 'enquiries' ? 'bg-accent text-black' : 'bg-surface text-secondary hover:text-white border border-border'
          }`}
        >
          Contact Enquiries ({enquiries.length})
        </button>
        <button
          onClick={() => setTab('valuations')}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            tab === 'valuations' ? 'bg-accent text-black' : 'bg-surface text-secondary hover:text-white border border-border'
          }`}
        >
          Valuations ({valuations.length})
        </button>
      </div>

      {loading ? (
        <p className="text-secondary">Loading...</p>
      ) : tab === 'enquiries' ? (
        enquiries.length === 0 ? (
          <div className="bg-surface border border-border rounded-lg p-8 text-center">
            <p className="text-secondary text-sm">No enquiries yet. They&apos;ll appear here when visitors submit the contact form.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {enquiries.map((e) => (
              <div key={e.id} className="bg-surface border border-border rounded-lg p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-white">{e.name}</p>
                    <p className="text-xs text-secondary">{e.email} {e.phone && `• ${e.phone}`}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full">{e.type}</span>
                    <p className="text-xs text-secondary mt-1">{new Date(e.created_at).toLocaleDateString('en-GB')}</p>
                  </div>
                </div>
                <p className="text-sm text-secondary">{e.message}</p>
              </div>
            ))}
          </div>
        )
      ) : (
        valuations.length === 0 ? (
          <div className="bg-surface border border-border rounded-lg p-8 text-center">
            <p className="text-secondary text-sm">No valuation requests yet. They&apos;ll appear here when visitors submit the sell your car form.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {valuations.map((v) => (
              <div key={v.id} className="bg-surface border border-border rounded-lg p-5">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-medium text-white">{v.name}</p>
                    <p className="text-xs text-secondary">{v.email} • {v.phone}</p>
                  </div>
                  <p className="text-xs text-secondary">{new Date(v.created_at).toLocaleDateString('en-GB')}</p>
                </div>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="text-white font-medium">{v.year} {v.make} {v.model}</span>
                  <span className="text-secondary">{v.mileage.toLocaleString()} miles</span>
                  {v.registration && <span className="text-secondary">Reg: {v.registration}</span>}
                  {v.condition && <span className="text-secondary capitalize">Condition: {v.condition}</span>}
                </div>
                {v.notes && <p className="text-xs text-secondary mt-2">{v.notes}</p>}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}
