'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function EditVehiclePage() {
  return (
    <div>
      <Link href="/admin/vehicles" className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white mb-6 transition-colors">
        <ArrowLeft size={16} /> Back to Vehicles
      </Link>

      <h1 className="text-2xl font-bold text-white mb-6">Edit Vehicle</h1>

      <div className="bg-surface border border-border rounded-lg p-6">
        <p className="text-secondary text-sm">
          Vehicle editing will be fully functional once Supabase is connected. The edit form
          is identical to the &quot;Add Vehicle&quot; form but pre-populated with existing data.
        </p>
        <p className="text-secondary text-sm mt-3">
          To connect Supabase, update your <code className="text-accent">.env.local</code> with your project credentials.
        </p>
      </div>
    </div>
  );
}
