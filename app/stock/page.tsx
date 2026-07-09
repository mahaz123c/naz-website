import { Suspense } from 'react';
import VehicleCard from '@/components/VehicleCard';
import VehicleFilters from '@/components/VehicleFilters';
import { createClient } from '@/lib/supabase-server';
import { demoVehicles } from '@/lib/demo-vehicles';
import type { Vehicle } from '@/lib/types';
import { SITE_NAME } from '@/lib/constants';

export const metadata = {
  title: 'The Showroom | Used Cars For Sale',
  description: `Browse our range of hand-selected premium used cars at ${SITE_NAME}. Filter by make, price, year, mileage and more.`,
};

async function getVehicles(searchParams: Record<string, string | undefined>): Promise<Vehicle[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('vehicles').select('*');

    if (searchParams.q) {
      const q = searchParams.q.replace(/[%,()]/g, '');
      query = query.or(`make.ilike.%${q}%,model.ilike.%${q}%`);
    }
    if (searchParams.make) query = query.eq('make', searchParams.make);
    if (searchParams.model) query = query.ilike('model', `%${searchParams.model.replace(/[%,()]/g, '')}%`);
    if (searchParams.body) query = query.eq('body_type', searchParams.body);
    if (searchParams.fuel) query = query.eq('fuel_type', searchParams.fuel);
    if (searchParams.transmission) query = query.eq('transmission', searchParams.transmission);
    if (searchParams.min_price) query = query.gte('price', Number(searchParams.min_price));
    if (searchParams.max_price) query = query.lte('price', Number(searchParams.max_price));
    if (searchParams.max_monthly) query = query.lte('monthly_price', Number(searchParams.max_monthly));
    if (searchParams.min_year) query = query.gte('year', Number(searchParams.min_year));
    if (searchParams.max_mileage) query = query.lte('mileage', Number(searchParams.max_mileage));

    // Sort
    switch (searchParams.sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'mileage':
        query = query.order('mileage', { ascending: true });
        break;
      case 'newest_year':
        query = query.order('year', { ascending: false });
        break;
      default:
        // Newest stock: featured first, then most recently added
        query = query.order('featured', { ascending: false }).order('created_at', { ascending: false });
    }

    const { data, error } = await query;

    if (error) {
      console.error('Supabase error:', error);
      return demoVehicles;
    }

    return (data as Vehicle[]) || [];
  } catch {
    // Fallback to demo data if Supabase isn't configured
    return demoVehicles;
  }
}

export default async function StockPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | undefined>>;
}) {
  const params = await searchParams;
  const vehicles = await getVehicles(params);
  const available = vehicles.filter((v) => v.status === 'available');

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Header */}
      <div className="bg-ink-950 grain py-14 lg:py-20">
        <div className="container-px relative z-10">
          <p className="eyebrow eyebrow-light">The collection</p>
          <h1 className="mt-3 text-4xl md:text-6xl font-semibold text-white tracking-tight">
            The Showroom
          </h1>
          <p className="mt-4 max-w-xl text-sm md:text-base text-white/60">
            {available.length} hand-selected car{available.length !== 1 ? 's' : ''} available now.
            Every one inspected, prepared and ready to drive.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="container-px -mt-7 relative z-20">
        <Suspense fallback={<div className="h-20 rounded-2xl skeleton" />}>
          <VehicleFilters resultCount={available.length} />
        </Suspense>
      </div>

      {/* Vehicle grid */}
      <div className="container-px py-12 lg:py-16">
        {vehicles.length > 0 ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="card mx-auto max-w-lg rounded-2xl py-16 px-8 text-center">
            <p className="font-display text-xl text-ink-900 mb-2">No cars found</p>
            <p className="text-sm text-ink-500">
              Try widening your search — remove a filter or two and more of the collection will appear.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
