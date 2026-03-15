'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { formatPrice } from '@/lib/utils';
import type { Vehicle } from '@/lib/types';

export default function AdminVehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVehicles = useCallback(async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching vehicles:', error);
    } else {
      setVehicles((data as Vehicle[]) || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchVehicles();
  }, [fetchVehicles]);

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this vehicle?')) return;

    const supabase = createClient();
    const { error } = await supabase.from('vehicles').delete().eq('id', id);

    if (error) {
      alert('Failed to delete vehicle');
      console.error(error);
    } else {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
    }
  }

  async function toggleStatus(id: string, currentStatus: string) {
    const newStatus = currentStatus === 'available' ? 'sold' : 'available';
    const supabase = createClient();
    const { error } = await supabase.from('vehicles').update({ status: newStatus }).eq('id', id);

    if (error) {
      console.error(error);
    } else {
      setVehicles((prev) =>
        prev.map((v) => (v.id === id ? { ...v, status: newStatus as Vehicle['status'] } : v))
      );
    }
  }

  if (loading) {
    return (
      <div>
        <h1 className="text-2xl font-bold text-white mb-6">Vehicles</h1>
        <p className="text-secondary">Loading...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">Vehicles ({vehicles.length})</h1>
        <Link
          href="/admin/vehicles/new"
          className="inline-flex items-center gap-2 bg-accent text-black px-4 py-2 text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
        >
          <Plus size={16} />
          Add Vehicle
        </Link>
      </div>

      {vehicles.length === 0 ? (
        <div className="bg-surface border border-border rounded-lg p-8 text-center">
          <p className="text-white mb-2">No vehicles yet</p>
          <p className="text-secondary text-sm mb-4">Add your first vehicle to get started.</p>
          <Link
            href="/admin/vehicles/new"
            className="inline-flex items-center gap-2 bg-accent text-black px-4 py-2 text-sm font-semibold rounded-lg hover:bg-accent-hover transition-colors"
          >
            <Plus size={16} /> Add Vehicle
          </Link>
        </div>
      ) : (
        <div className="bg-surface border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left px-4 py-3 text-secondary font-medium">Image</th>
                <th className="text-left px-4 py-3 text-secondary font-medium">Vehicle</th>
                <th className="text-left px-4 py-3 text-secondary font-medium">Year</th>
                <th className="text-left px-4 py-3 text-secondary font-medium">Price</th>
                <th className="text-left px-4 py-3 text-secondary font-medium">Status</th>
                <th className="text-left px-4 py-3 text-secondary font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id} className="border-b border-border last:border-0 hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <div className="relative w-16 h-12 rounded overflow-hidden bg-muted">
                      {v.images && v.images[0] && (
                        <Image src={v.images[0]} alt="" fill className="object-cover" sizes="64px" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-white">{v.make} {v.model}</p>
                    <p className="text-xs text-secondary">{v.fuel_type} &middot; {v.transmission}</p>
                  </td>
                  <td className="px-4 py-3 text-secondary">{v.year}</td>
                  <td className="px-4 py-3 text-white font-medium">{formatPrice(v.price)}</td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleStatus(v.id, v.status)}
                      className={`inline-block text-xs font-medium px-2.5 py-1 rounded-full cursor-pointer ${
                        v.status === 'available' ? 'bg-green-400/10 text-green-400' :
                        v.status === 'sold' ? 'bg-red-400/10 text-red-400' :
                        'bg-accent/10 text-accent'
                      }`}
                    >
                      {v.status}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/vehicles/${v.id}/edit`}
                        className="p-1.5 text-secondary hover:text-white transition-colors"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-1.5 text-secondary hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
