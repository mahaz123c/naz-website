'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase-client';
import { MAKES, FUEL_TYPES, BODY_TYPES, TRANSMISSIONS } from '@/lib/constants';
import { generateSlug } from '@/lib/utils';
import { Save } from 'lucide-react';

export default function NewVehiclePage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const currentYear = new Date().getFullYear();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const form = new FormData(e.currentTarget);
    const make = form.get('make') as string;
    const model = form.get('model') as string;
    const year = Number(form.get('year'));

    const data = {
      make,
      model,
      year,
      price: Number(form.get('price')),
      mileage: Number(form.get('mileage')),
      fuel_type: form.get('fuel_type') as string,
      transmission: form.get('transmission') as string,
      body_type: form.get('body_type') as string,
      colour: (form.get('colour') as string) || null,
      doors: Number(form.get('doors')) || 4,
      engine_size: (form.get('engine_size') as string) || null,
      horsepower: Number(form.get('horsepower')) || null,
      monthly_price: Number(form.get('monthly_price')) || null,
      description: (form.get('description') as string) || null,
      features: (form.get('features') as string).split(',').map((f) => f.trim()).filter(Boolean),
      images: (form.get('image_urls') as string).split(',').map((u) => u.trim()).filter(Boolean),
      status: form.get('status') as string || 'available',
      featured: form.get('featured') === 'on',
      slug: generateSlug(year, make, model),
    };

    const supabase = createClient();
    const { error: dbError } = await supabase.from('vehicles').insert(data);

    if (dbError) {
      console.error('Insert error:', dbError);
      setError(dbError.message);
      setSaving(false);
      return;
    }

    router.push('/admin/vehicles');
  }

  const inputClass = "w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/40";
  const selectClass = "w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/40 appearance-none";

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Add New Vehicle</h1>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        {/* Basic info */}
        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Make *</label>
              <select name="make" required className={selectClass}>
                <option value="">Select make</option>
                {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Model *</label>
              <input name="model" required className={inputClass} placeholder="e.g. M4 Competition" />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Year *</label>
              <select name="year" required className={selectClass}>
                {Array.from({ length: 20 }, (_, i) => currentYear - i).map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Price (£) *</label>
              <input name="price" type="number" required className={inputClass} placeholder="29990" />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Mileage *</label>
              <input name="mileage" type="number" required className={inputClass} placeholder="15000" />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Monthly Price (£)</label>
              <input name="monthly_price" type="number" step="0.01" className={inputClass} placeholder="429.00" />
            </div>
          </div>
        </div>

        {/* Specs */}
        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Fuel Type *</label>
              <select name="fuel_type" required className={selectClass}>
                {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Transmission *</label>
              <select name="transmission" required className={selectClass}>
                {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Body Type *</label>
              <select name="body_type" required className={selectClass}>
                {BODY_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Colour</label>
              <input name="colour" className={inputClass} placeholder="e.g. Obsidian Black" />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Doors</label>
              <input name="doors" type="number" defaultValue={4} className={inputClass} />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Engine Size</label>
              <input name="engine_size" className={inputClass} placeholder="e.g. 3.0L" />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Horsepower</label>
              <input name="horsepower" type="number" className={inputClass} placeholder="300" />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Status</label>
              <select name="status" className={selectClass}>
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                <input name="featured" type="checkbox" className="w-4 h-4 accent-accent" />
                Featured on homepage
              </label>
            </div>
          </div>
        </div>

        {/* Description & Features */}
        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Description & Features</h2>
          <div>
            <label className="block text-sm text-secondary mb-1">Description</label>
            <textarea name="description" rows={4} className={`${inputClass} resize-none`} placeholder="Full vehicle description..." />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-1">Features (comma-separated)</label>
            <input name="features" className={inputClass} placeholder="Leather Seats, Parking Sensors, Sat Nav, Heated Seats" />
          </div>
        </div>

        {/* Images */}
        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Images</h2>
          <p className="text-xs text-secondary mb-2">
            Paste image URLs separated by commas. You can upload images to Supabase Storage and use those URLs.
          </p>
          <textarea
            name="image_urls"
            rows={3}
            className={`${inputClass} resize-none`}
            placeholder="https://your-supabase-url.supabase.co/storage/v1/object/public/vehicle-images/image1.jpg, https://..."
          />
        </div>

        {error && (
          <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-accent text-black px-6 py-3 font-semibold text-sm rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Vehicle'}
        </button>
      </form>
    </div>
  );
}
