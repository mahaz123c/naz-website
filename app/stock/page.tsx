import { Suspense } from 'react';
import VehicleCard from '@/components/VehicleCard';
import VehicleFilters from '@/components/VehicleFilters';
import { createClient } from '@/lib/supabase-server';
import { demoVehicles } from '@/lib/demo-vehicles';
import type { Vehicle } from '@/lib/types';
import { SITE_NAME } from '@/lib/constants';

export const metadata = {
  title: 'Used Cars For Sale',
  description: `Browse our extensive range of premium used cars at ${SITE_NAME}. Filter by make, price, fuel type and more.`,
};

async function getVehicles(searchParams: Record<string, string | undefined>): Promise<Vehicle[]> {
  try {
    const supabase = await createClient();
    let query = supabase.from('vehicles').select('*');

    if (searchParams.make) query = query.eq('make', searchParams.make);
    if (searchParams.body) query = query.eq('body_type', searchParams.body);
    if (searchParams.fuel) query = query.eq('fuel_type', searchParams.fuel);
    if (searchParams.transmission) query = query.eq('transmission', searchParams.transmission);
    if (searchParams.min_price) query = query.gte('price', Number(searchParams.min_price));
    if (searchParams.max_price) query = query.lte('price', Number(searchParams.max_price));
    if (searchParams.max_monthly) query = query.lte('monthly_price', Number(searchParams.max_monthly));

    // Sort
    switch (searchParams.sort) {
      case 'price_asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price_desc':
        query = query.order('price', { ascending: false });
        break;
      case 'newest':
        query = query.order('created_at', { ascending: false });
        break;
      case 'mileage':
        query = query.order('mileage', { ascending: true });
        break;
      default:
        query = query.order('created_at', { ascending: false });
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
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-surface py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-2">Our Stock</h1>
          <p className="text-secondary text-sm">
            {available.length} vehicle{available.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-muted py-4 px-4 md:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <Suspense fallback={<div className="h-10" />}>
            <VehicleFilters />
          </Suspense>
        </div>
      </div>

      {/* Vehicle Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {vehicles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-white mb-2">No vehicles found</p>
            <p className="text-secondary text-sm">Try adjusting your filters to see more results.</p>
          </div>
        )}
      </div>
    </div>
  );
}
