'use client';

import { useEffect, useState } from 'react';
import { Car, Eye, CheckCircle, MessageSquare } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, available: 0, sold: 0, enquiries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const supabase = createClient();

      const [vehiclesRes, enquiriesRes] = await Promise.all([
        supabase.from('vehicles').select('status'),
        supabase.from('enquiries').select('id', { count: 'exact', head: true }),
      ]);

      const vehicles = vehiclesRes.data || [];
      const total = vehicles.length;
      const available = vehicles.filter((v) => v.status === 'available').length;
      const sold = vehicles.filter((v) => v.status === 'sold').length;
      const enquiries = enquiriesRes.count || 0;

      setStats({ total, available, sold, enquiries });
      setLoading(false);
    }
    fetchStats();
  }, []);

  const cards = [
    { label: 'Total Vehicles', value: stats.total, Icon: Car, color: 'text-blue-400' },
    { label: 'Available', value: stats.available, Icon: Eye, color: 'text-green-400' },
    { label: 'Sold', value: stats.sold, Icon: CheckCircle, color: 'text-accent' },
    { label: 'Enquiries', value: stats.enquiries, Icon: MessageSquare, color: 'text-purple-400' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard</h1>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ label, value, Icon, color }) => (
          <div key={label} className="bg-surface border border-border rounded-lg p-5">
            <div className="flex items-center justify-between mb-2">
              <Icon size={22} className={color} />
            </div>
            <p className="text-2xl font-bold text-white">{loading ? '...' : value}</p>
            <p className="text-xs text-secondary">{label}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Supabase Connected</h2>
        <p className="text-sm text-secondary">
          Your database is live. Add vehicles via the Vehicles section, and form submissions will appear in Enquiries.
        </p>
      </div>
    </div>
  );
}
