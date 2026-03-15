'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import { MAKES, FUEL_TYPES, BODY_TYPES, TRANSMISSIONS } from '@/lib/constants';

export default function VehicleFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/stock?${params.toString()}`);
    },
    [router, searchParams]
  );

  const clearAll = () => {
    router.push('/stock');
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <select
        value={searchParams.get('make') || ''}
        onChange={(e) => updateFilter('make', e.target.value)}
        className="bg-surface border border-border text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-white/40 appearance-none cursor-pointer min-w-[140px]"
      >
        <option value="">All Makes</option>
        {MAKES.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>

      <select
        value={searchParams.get('body') || ''}
        onChange={(e) => updateFilter('body', e.target.value)}
        className="bg-surface border border-border text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-white/40 appearance-none cursor-pointer min-w-[140px]"
      >
        <option value="">All Body Types</option>
        {BODY_TYPES.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>

      <select
        value={searchParams.get('fuel') || ''}
        onChange={(e) => updateFilter('fuel', e.target.value)}
        className="bg-surface border border-border text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-white/40 appearance-none cursor-pointer min-w-[140px]"
      >
        <option value="">All Fuel Types</option>
        {FUEL_TYPES.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>

      <select
        value={searchParams.get('transmission') || ''}
        onChange={(e) => updateFilter('transmission', e.target.value)}
        className="bg-surface border border-border text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-white/40 appearance-none cursor-pointer min-w-[140px]"
      >
        <option value="">All Transmissions</option>
        {TRANSMISSIONS.map((t) => (
          <option key={t} value={t}>{t}</option>
        ))}
      </select>

      <select
        value={searchParams.get('min_price') || ''}
        onChange={(e) => updateFilter('min_price', e.target.value)}
        className="bg-surface border border-border text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-white/40 appearance-none cursor-pointer min-w-[130px]"
      >
        <option value="">Min Price</option>
        {[5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000].map((p) => (
          <option key={p} value={p}>£{p.toLocaleString()}</option>
        ))}
      </select>

      <select
        value={searchParams.get('max_price') || ''}
        onChange={(e) => updateFilter('max_price', e.target.value)}
        className="bg-surface border border-border text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-white/40 appearance-none cursor-pointer min-w-[130px]"
      >
        <option value="">Max Price</option>
        {[10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000].map((p) => (
          <option key={p} value={p}>£{p.toLocaleString()}</option>
        ))}
      </select>

      <select
        value={searchParams.get('sort') || ''}
        onChange={(e) => updateFilter('sort', e.target.value)}
        className="bg-surface border border-border text-white text-sm px-4 py-2.5 rounded-lg focus:outline-none focus:border-white/40 appearance-none cursor-pointer min-w-[140px]"
      >
        <option value="">Sort By</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="newest">Newest First</option>
        <option value="mileage">Lowest Mileage</option>
      </select>

      {searchParams.toString() && (
        <button
          onClick={clearAll}
          className="text-sm text-accent hover:text-accent-hover underline underline-offset-2 transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
