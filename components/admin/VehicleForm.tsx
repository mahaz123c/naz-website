'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';
import { MAKES, FUEL_TYPES, BODY_TYPES, TRANSMISSIONS } from '@/lib/constants';
import { generateSlug } from '@/lib/utils';
import type { Vehicle } from '@/lib/types';
import ImageUploader from './ImageUploader';

type Mode = 'create' | 'edit';

interface Props {
  mode: Mode;
  initialData?: Vehicle;
}

const inputClass =
  'w-full bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/40';
const selectClass = `${inputClass} appearance-none`;

const currentYear = new Date().getFullYear();

export default function VehicleForm({ mode, initialData }: Props) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [make, setMake] = useState(initialData?.make ?? '');
  const [model, setModel] = useState(initialData?.model ?? '');
  const [year, setYear] = useState<number>(initialData?.year ?? currentYear);
  const [price, setPrice] = useState<string>(initialData?.price?.toString() ?? '');
  const [mileage, setMileage] = useState<string>(initialData?.mileage?.toString() ?? '');
  const [monthlyPrice, setMonthlyPrice] = useState<string>(
    initialData?.monthly_price?.toString() ?? ''
  );
  const [fuelType, setFuelType] = useState(initialData?.fuel_type ?? FUEL_TYPES[0]);
  const [transmission, setTransmission] = useState(initialData?.transmission ?? TRANSMISSIONS[0]);
  const [bodyType, setBodyType] = useState(initialData?.body_type ?? BODY_TYPES[0]);
  const [colour, setColour] = useState(initialData?.colour ?? '');
  const [doors, setDoors] = useState<string>(initialData?.doors?.toString() ?? '4');
  const [engineSize, setEngineSize] = useState(initialData?.engine_size ?? '');
  const [horsepower, setHorsepower] = useState<string>(initialData?.horsepower?.toString() ?? '');
  const [description, setDescription] = useState(initialData?.description ?? '');
  const [features, setFeatures] = useState<string>(initialData?.features?.join(', ') ?? '');
  const [status, setStatus] = useState<Vehicle['status']>(initialData?.status ?? 'available');
  const [featured, setFeatured] = useState<boolean>(initialData?.featured ?? false);
  const [images, setImages] = useState<string[]>(initialData?.images ?? []);

  const pathPrefix = mode === 'edit' && initialData ? initialData.id : 'tmp';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError('');

    const payload = {
      make,
      model,
      year,
      price: Number(price),
      mileage: Number(mileage),
      fuel_type: fuelType,
      transmission,
      body_type: bodyType,
      colour: colour || null,
      doors: Number(doors) || 4,
      engine_size: engineSize || null,
      horsepower: horsepower ? Number(horsepower) : null,
      monthly_price: monthlyPrice ? Number(monthlyPrice) : null,
      description: description || null,
      features: features
        .split(',')
        .map((f) => f.trim())
        .filter(Boolean),
      images,
      status,
      featured,
    };

    const supabase = createClient();

    if (mode === 'create') {
      const { error: dbError } = await supabase
        .from('vehicles')
        .insert({ ...payload, slug: generateSlug(year, make, model) });
      if (dbError) {
        setError(dbError.message);
        setSaving(false);
        return;
      }
    } else if (initialData) {
      const { error: dbError } = await supabase
        .from('vehicles')
        .update(payload)
        .eq('id', initialData.id);
      if (dbError) {
        setError(dbError.message);
        setSaving(false);
        return;
      }
    }

    router.push('/admin/vehicles');
    router.refresh();
  }

  return (
    <div>
      <Link
        href="/admin/vehicles"
        className="inline-flex items-center gap-2 text-sm text-secondary hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Vehicles
      </Link>

      <h1 className="text-2xl font-bold text-white mb-6">
        {mode === 'create' ? 'Add New Vehicle' : 'Edit Vehicle'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Make *</label>
              <select
                value={make}
                onChange={(e) => setMake(e.target.value)}
                required
                className={selectClass}
              >
                <option value="">Select make</option>
                {MAKES.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Model *</label>
              <input
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
                className={inputClass}
                placeholder="e.g. M4 Competition"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Year *</label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                required
                className={selectClass}
              >
                {Array.from({ length: 25 }, (_, i) => currentYear - i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Price (&pound;) *</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className={inputClass}
                placeholder="29990"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Mileage *</label>
              <input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
                required
                className={inputClass}
                placeholder="15000"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Monthly Price (&pound;)</label>
              <input
                type="number"
                step="0.01"
                value={monthlyPrice}
                onChange={(e) => setMonthlyPrice(e.target.value)}
                className={inputClass}
                placeholder="429.00"
              />
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-secondary mb-1">Fuel Type *</label>
              <select
                value={fuelType}
                onChange={(e) => setFuelType(e.target.value)}
                required
                className={selectClass}
              >
                {FUEL_TYPES.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Transmission *</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value)}
                required
                className={selectClass}
              >
                {TRANSMISSIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Body Type *</label>
              <select
                value={bodyType}
                onChange={(e) => setBodyType(e.target.value)}
                required
                className={selectClass}
              >
                {BODY_TYPES.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Colour</label>
              <input
                value={colour ?? ''}
                onChange={(e) => setColour(e.target.value)}
                className={inputClass}
                placeholder="e.g. Obsidian Black"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Doors</label>
              <input
                type="number"
                value={doors}
                onChange={(e) => setDoors(e.target.value)}
                className={inputClass}
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Engine Size</label>
              <input
                value={engineSize ?? ''}
                onChange={(e) => setEngineSize(e.target.value)}
                className={inputClass}
                placeholder="e.g. 3.0L"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Horsepower</label>
              <input
                type="number"
                value={horsepower}
                onChange={(e) => setHorsepower(e.target.value)}
                className={inputClass}
                placeholder="300"
              />
            </div>
            <div>
              <label className="block text-sm text-secondary mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Vehicle['status'])}
                className={selectClass}
              >
                <option value="available">Available</option>
                <option value="reserved">Reserved</option>
                <option value="sold">Sold</option>
              </select>
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
                <input
                  type="checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-accent"
                />
                Featured on homepage
              </label>
            </div>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Description &amp; Features</h2>
          <div>
            <label className="block text-sm text-secondary mb-1">Description</label>
            <textarea
              value={description ?? ''}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Full vehicle description..."
            />
          </div>
          <div>
            <label className="block text-sm text-secondary mb-1">Features (comma-separated)</label>
            <input
              value={features}
              onChange={(e) => setFeatures(e.target.value)}
              className={inputClass}
              placeholder="Leather Seats, Parking Sensors, Sat Nav, Heated Seats"
            />
          </div>
        </div>

        <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-white mb-2">Photos</h2>
          <p className="text-xs text-secondary">
            The first photo is the main image shown in listings. Tap &quot;Make Main&quot; or use the arrows to reorder.
          </p>
          <ImageUploader value={images} onChange={setImages} pathPrefix={pathPrefix} />
        </div>

        {error && (
          <div className="bg-red-400/10 border border-red-400/30 rounded-lg p-4">
            <p className="text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 bg-accent text-black px-6 py-3 font-semibold text-sm rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? 'Saving...' : mode === 'create' ? 'Save Vehicle' : 'Update Vehicle'}
        </button>
      </form>
    </div>
  );
}
