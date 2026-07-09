'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronDown, Search, SlidersHorizontal, X } from 'lucide-react';
import { MAKES, FUEL_TYPES, BODY_TYPES, TRANSMISSIONS, BUDGET_OPTIONS } from '@/lib/constants';

const selectClass = 'input appearance-none cursor-pointer';

const PRICES = [5000, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 75000, 100000];
const YEARS = Array.from({ length: 16 }, (_, i) => new Date().getFullYear() - i);
const MILEAGES = [10000, 20000, 30000, 40000, 50000, 60000, 80000, 100000];

const CHIP_LABELS: Record<string, string> = {
  q: 'Search',
  make: 'Make',
  model: 'Model',
  body: 'Body',
  fuel: 'Fuel',
  transmission: 'Gearbox',
  min_price: 'From',
  max_price: 'To',
  min_year: 'Year from',
  max_mileage: 'Max mileage',
  max_monthly: 'Monthly',
};

function formatChip(key: string, value: string): string {
  if (key === 'min_price' || key === 'max_price' || key === 'max_monthly') {
    return `${CHIP_LABELS[key]} £${Number(value).toLocaleString()}`;
  }
  if (key === 'max_mileage') return `Under ${Number(value).toLocaleString()} mi`;
  return `${CHIP_LABELS[key]}: ${value}`;
}

export default function VehicleFilters({ resultCount }: { resultCount?: number }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [searchText, setSearchText] = useState(searchParams.get('q') || '');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
      router.push(`/stock?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Debounced text search (300ms)
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if ((searchParams.get('q') || '') !== searchText) {
        updateFilter('q', searchText);
      }
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchText, searchParams, updateFilter]);

  const clearAll = () => {
    setSearchText('');
    router.push('/stock', { scroll: false });
  };

  const activeChips = Array.from(searchParams.entries()).filter(
    ([key, value]) => value && CHIP_LABELS[key] && key !== 'sort'
  );
  const advancedCount = ['body', 'fuel', 'transmission', 'min_year', 'max_mileage', 'max_monthly']
    .filter((k) => searchParams.get(k)).length;

  return (
    <div className="rounded-2xl border border-ink-100 bg-white/80 shadow-luxe-sm backdrop-blur-xl p-4 md:p-5">
      {/* Primary row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3">
        <div className="relative lg:col-span-2">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search make, model…"
            className="input !pl-9"
          />
        </div>

        <select
          value={searchParams.get('make') || ''}
          onChange={(e) => updateFilter('make', e.target.value)}
          className={selectClass}
        >
          <option value="">All makes</option>
          {MAKES.map((m) => (
            <option key={m} value={m}>{m}</option>
          ))}
        </select>

        <select
          value={searchParams.get('min_price') || ''}
          onChange={(e) => updateFilter('min_price', e.target.value)}
          className={selectClass}
        >
          <option value="">Min price</option>
          {PRICES.map((p) => (
            <option key={p} value={p}>£{p.toLocaleString()}</option>
          ))}
        </select>

        <select
          value={searchParams.get('max_price') || ''}
          onChange={(e) => updateFilter('max_price', e.target.value)}
          className={selectClass}
        >
          <option value="">Max price</option>
          {PRICES.map((p) => (
            <option key={p} value={p}>£{p.toLocaleString()}</option>
          ))}
        </select>

        <button
          type="button"
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="btn btn-outline !rounded-xl !px-4 justify-between"
        >
          <span className="flex items-center gap-2">
            <SlidersHorizontal size={14} />
            All filters
            {advancedCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-600 text-[10px] font-bold text-white">
                {advancedCount}
              </span>
            )}
          </span>
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${advancedOpen ? 'rotate-180' : ''}`}
          />
        </button>
      </div>

      {/* Advanced panel */}
      <div
        className={`grid transition-all duration-300 ${
          advancedOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 pt-1">
            <select
              value={searchParams.get('body') || ''}
              onChange={(e) => updateFilter('body', e.target.value)}
              className={selectClass}
            >
              <option value="">Body type</option>
              {BODY_TYPES.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            <select
              value={searchParams.get('fuel') || ''}
              onChange={(e) => updateFilter('fuel', e.target.value)}
              className={selectClass}
            >
              <option value="">Fuel type</option>
              {FUEL_TYPES.map((f) => (
                <option key={f} value={f}>{f}</option>
              ))}
            </select>

            <select
              value={searchParams.get('transmission') || ''}
              onChange={(e) => updateFilter('transmission', e.target.value)}
              className={selectClass}
            >
              <option value="">Gearbox</option>
              {TRANSMISSIONS.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>

            <select
              value={searchParams.get('min_year') || ''}
              onChange={(e) => updateFilter('min_year', e.target.value)}
              className={selectClass}
            >
              <option value="">Year from</option>
              {YEARS.map((y) => (
                <option key={y} value={y}>{y}</option>
              ))}
            </select>

            <select
              value={searchParams.get('max_mileage') || ''}
              onChange={(e) => updateFilter('max_mileage', e.target.value)}
              className={selectClass}
            >
              <option value="">Max mileage</option>
              {MILEAGES.map((m) => (
                <option key={m} value={m}>{m.toLocaleString()} mi</option>
              ))}
            </select>

            <select
              value={searchParams.get('max_monthly') || ''}
              onChange={(e) => updateFilter('max_monthly', e.target.value)}
              className={selectClass}
            >
              <option value="">Monthly budget</option>
              {BUDGET_OPTIONS.map((opt) => (
                <option key={opt.label} value={opt.max}>{opt.label}/mo</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Chips + count + sort */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        {activeChips.map(([key, value]) => (
          <button
            key={key}
            onClick={() => {
              if (key === 'q') setSearchText('');
              updateFilter(key, '');
            }}
            className="inline-flex items-center gap-1.5 rounded-full bg-ink-950 px-3 py-1.5 text-xs font-medium text-white hover:bg-ink-700 transition-colors"
          >
            {formatChip(key, value)}
            <X size={12} />
          </button>
        ))}
        {activeChips.length > 0 && (
          <button
            onClick={clearAll}
            className="text-xs font-semibold text-brand-600 underline underline-offset-2 hover:text-brand-700 transition-colors"
          >
            Clear all
          </button>
        )}

        <div className="ml-auto flex items-center gap-3">
          {typeof resultCount === 'number' && (
            <p className="text-xs text-ink-500">
              <span className="font-semibold text-ink-900">{resultCount}</span> car{resultCount !== 1 ? 's' : ''} available
            </p>
          )}
          <select
            value={searchParams.get('sort') || ''}
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="input !w-auto !py-2 !text-xs appearance-none cursor-pointer"
          >
            <option value="">Newest stock</option>
            <option value="price_asc">Price: low to high</option>
            <option value="price_desc">Price: high to low</option>
            <option value="mileage">Lowest mileage</option>
            <option value="newest_year">Newest year</option>
          </select>
        </div>
      </div>
    </div>
  );
}
