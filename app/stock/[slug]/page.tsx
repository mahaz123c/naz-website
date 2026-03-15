import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Calendar, Settings, Gauge, Fuel, Paintbrush, DoorOpen, Zap, Car } from 'lucide-react';
import VehicleGallery from '@/components/VehicleGallery';
import VehicleCard from '@/components/VehicleCard';
import ContactForm from '@/components/ContactForm';
import { createClient } from '@/lib/supabase-server';
import { demoVehicles } from '@/lib/demo-vehicles';
import { formatPrice, formatMonthly, formatMileage } from '@/lib/utils';
import { SITE_NAME } from '@/lib/constants';
import type { Vehicle } from '@/lib/types';

async function getVehicle(slug: string): Promise<Vehicle | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      // Fallback to demo data
      return demoVehicles.find((v) => v.slug === slug) || null;
    }
    return data as Vehicle;
  } catch {
    return demoVehicles.find((v) => v.slug === slug) || null;
  }
}

async function getSimilar(vehicle: Vehicle): Promise<Vehicle[]> {
  try {
    const supabase = await createClient();
    const { data } = await supabase
      .from('vehicles')
      .select('*')
      .neq('id', vehicle.id)
      .eq('status', 'available')
      .or(`make.eq.${vehicle.make},body_type.eq.${vehicle.body_type}`)
      .limit(3);

    if (data && data.length > 0) return data as Vehicle[];
  } catch {
    // fallback
  }
  return demoVehicles
    .filter((v) => v.id !== vehicle.id && v.status === 'available' && (v.make === vehicle.make || v.body_type === vehicle.body_type))
    .slice(0, 3);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) return { title: 'Vehicle Not Found' };
  return {
    title: `${vehicle.year} ${vehicle.make} ${vehicle.model} - ${formatPrice(vehicle.price)}`,
    description: vehicle.description || `${vehicle.year} ${vehicle.make} ${vehicle.model} for sale at ${SITE_NAME}. ${vehicle.mileage.toLocaleString()} miles, ${vehicle.fuel_type}, ${vehicle.transmission}.`,
    openGraph: {
      images: vehicle.images[0] ? [vehicle.images[0]] : [],
    },
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = await getVehicle(slug);
  if (!vehicle) notFound();

  const similar = await getSimilar(vehicle);

  const specs = [
    { label: 'Year', value: vehicle.year.toString(), Icon: Calendar },
    { label: 'Transmission', value: vehicle.transmission, Icon: Settings },
    { label: 'Mileage', value: formatMileage(vehicle.mileage), Icon: Gauge },
    { label: 'Fuel Type', value: vehicle.fuel_type, Icon: Fuel },
    { label: 'Body Type', value: vehicle.body_type, Icon: Car },
    ...(vehicle.colour ? [{ label: 'Colour', value: vehicle.colour, Icon: Paintbrush }] : []),
    ...(vehicle.doors ? [{ label: 'Doors', value: vehicle.doors.toString(), Icon: DoorOpen }] : []),
    ...(vehicle.horsepower ? [{ label: 'Power', value: `${vehicle.horsepower} bhp`, Icon: Zap }] : []),
    ...(vehicle.engine_size ? [{ label: 'Engine', value: vehicle.engine_size, Icon: Settings }] : []),
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-secondary mb-6">
          <Link href="/stock" className="hover:text-white transition-colors">Our Stock</Link>
          <span>/</span>
          <span className="text-white">{vehicle.make} {vehicle.model}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Gallery */}
          <div className="lg:col-span-3">
            <VehicleGallery images={vehicle.images} />
          </div>

          {/* Right: Info */}
          <div className="lg:col-span-2">
            {vehicle.status !== 'available' && (
              <div className="bg-accent/20 text-accent text-sm font-semibold px-4 py-2 rounded-lg mb-4 inline-block uppercase">
                {vehicle.status}
              </div>
            )}

            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </h1>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-bold text-accent">{formatPrice(vehicle.price)}</span>
              {vehicle.monthly_price && (
                <span className="text-sm text-secondary">
                  {formatMonthly(vehicle.monthly_price)}/month
                </span>
              )}
            </div>

            {/* Specs grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {specs.map(({ label, value, Icon }) => (
                <div key={label} className="flex items-center gap-3 bg-surface rounded-lg p-3">
                  <Icon size={18} className="text-secondary shrink-0" />
                  <div>
                    <p className="text-xs text-secondary">{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 mb-6">
              <Link
                href="/finance"
                className="flex-1 bg-accent text-black text-center py-3 font-semibold rounded-lg hover:bg-accent-hover transition-colors text-sm"
              >
                Apply for Finance
              </Link>
              <a
                href={`tel:01234567890`}
                className="flex-1 border border-white/30 text-white text-center py-3 font-medium rounded-lg hover:bg-white/10 transition-colors text-sm"
              >
                Call Us
              </a>
            </div>

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-white mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {vehicle.features.map((f) => (
                    <span key={f} className="bg-surface border border-border text-secondary text-xs px-3 py-1.5 rounded-full">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {vehicle.description && (
          <div className="mt-10 max-w-3xl">
            <h2 className="text-xl font-semibold text-white mb-4">Description</h2>
            <p className="text-secondary text-sm leading-relaxed">{vehicle.description}</p>
          </div>
        )}

        {/* Enquiry form */}
        <div className="mt-12 max-w-2xl">
          <h2 className="text-xl font-semibold text-white mb-4">Enquire About This Vehicle</h2>
          <ContactForm vehicleId={vehicle.id} vehicleRef={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} />
        </div>

        {/* Similar vehicles */}
        {similar.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-white mb-6">Similar Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similar.map((v) => (
                <VehicleCard key={v.id} vehicle={v} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
