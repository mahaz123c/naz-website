import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Phone, MessageCircle, Check, ChevronRight } from 'lucide-react';
import VehicleGallery from '@/components/VehicleGallery';
import VehicleCard from '@/components/VehicleCard';
import CarEnquiryTabs from '@/components/CarEnquiryTabs';
import Reveal from '@/components/Reveal';
import { createClient } from '@/lib/supabase-server';
import { demoVehicles } from '@/lib/demo-vehicles';
import { formatPrice, formatMonthly, formatMileage } from '@/lib/utils';
import { SITE_NAME, SITE_PHONE, SITE_WHATSAPP } from '@/lib/constants';
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

function StatusBadge({ status }: { status: string }) {
  if (status === 'available') {
    return <span className="badge bg-brand-500/20 text-brand-300">Available</span>;
  }
  if (status === 'reserved') {
    return <span className="badge bg-amber-400/20 text-amber-300">Reserved</span>;
  }
  return <span className="badge bg-white/10 text-white/70">Sold</span>;
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
  const title = `${vehicle.make} ${vehicle.model}`;
  const sold = vehicle.status === 'sold';
  const headerImage = vehicle.images[0] || 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&q=80';
  const waMessage = encodeURIComponent(
    `Hi KY Automotive, I'm interested in the ${vehicle.year} ${title} (${formatPrice(vehicle.price)}). Is it still available?`
  );

  const primarySpecs: { label: string; value: string }[] = [
    { label: 'Make', value: vehicle.make },
    { label: 'Model', value: vehicle.model },
    { label: 'Year', value: String(vehicle.year) },
    { label: 'Mileage', value: formatMileage(vehicle.mileage) },
    { label: 'Fuel type', value: vehicle.fuel_type },
    { label: 'Transmission', value: vehicle.transmission },
    { label: 'Body type', value: vehicle.body_type },
    ...(vehicle.colour ? [{ label: 'Colour', value: vehicle.colour }] : []),
    ...(vehicle.engine_size ? [{ label: 'Engine size', value: vehicle.engine_size }] : []),
    ...(vehicle.doors ? [{ label: 'Doors', value: String(vehicle.doors) }] : []),
    ...(vehicle.horsepower ? [{ label: 'Power', value: `${vehicle.horsepower} bhp` }] : []),
    ...(vehicle.monthly_price ? [{ label: 'From', value: `${formatMonthly(vehicle.monthly_price)}/month` }] : []),
  ];

  return (
    <div className="bg-cream-50 min-h-screen">
      {/* Cinematic header */}
      <div className="relative bg-ink-950 grain overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 blur-xl scale-110"
          style={{ backgroundImage: `url(${headerImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/70 to-ink-950" />

        <div className="container-px relative z-10 pt-8 pb-24 lg:pb-32">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-xs text-white/50">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={12} />
            <Link href="/stock" className="hover:text-white transition-colors">Showroom</Link>
            <ChevronRight size={12} />
            <span className="text-white/80">{title}</span>
          </nav>

          <div className="mt-8 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <div className="flex items-center gap-3">
                <p className="eyebrow eyebrow-light">
                  {vehicle.year} &middot; {vehicle.fuel_type}
                </p>
                <StatusBadge status={vehicle.status} />
              </div>
              <h1 className="mt-3 text-4xl md:text-6xl font-semibold text-white tracking-tight">
                {title}
              </h1>
              <p className="mt-2 text-white/60 text-sm md:text-base">
                {vehicle.colour ? `${vehicle.colour} · ` : ''}{vehicle.body_type} · {vehicle.transmission}
              </p>
            </div>
            <div className="lg:text-right">
              <p className="text-[11px] uppercase tracking-luxe text-white/50 mb-1">Price</p>
              <p className="font-display text-4xl md:text-5xl font-semibold text-brand-gradient animate-brand-sweep">
                {formatPrice(vehicle.price)}
              </p>
              {vehicle.monthly_price && (
                <p className="mt-1 text-sm text-white/60">
                  or {formatMonthly(vehicle.monthly_price)}/month with finance
                </p>
              )}
            </div>
          </div>

          {/* Mobile quick contact */}
          {!sold && (
            <div className="mt-6 flex gap-2 lg:hidden">
              <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} className="btn btn-primary flex-1 !text-xs">
                <Phone size={14} /> Call us
              </a>
              <a
                href={`https://wa.me/44${SITE_WHATSAPP.slice(1)}?text=${waMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-whatsapp flex-1 !text-xs"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="container-px relative z-10 -mt-16 lg:-mt-20 pb-16 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left column */}
          <div className="lg:col-span-3 space-y-10">
            <VehicleGallery images={vehicle.images} />

            {/* Highlight tiles */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-2xl bg-ink-100 border border-ink-100">
              {[
                { label: 'Year', value: String(vehicle.year) },
                { label: 'Mileage', value: formatMileage(vehicle.mileage) },
                { label: 'Fuel', value: vehicle.fuel_type },
                { label: 'Gearbox', value: vehicle.transmission },
              ].map(({ label, value }) => (
                <div key={label} className="bg-white px-4 py-5 text-center">
                  <p className="text-[10px] uppercase tracking-[0.14em] text-ink-400">{label}</p>
                  <p className="mt-1 font-display text-base font-semibold text-ink-950">{value}</p>
                </div>
              ))}
            </div>

            {/* Overview */}
            {vehicle.description && (
              <Reveal>
                <div>
                  <p className="eyebrow">Overview</p>
                  <p className="mt-4 whitespace-pre-line text-sm md:text-base leading-relaxed text-ink-600">
                    {vehicle.description}
                  </p>
                </div>
              </Reveal>
            )}

            {/* Features */}
            {vehicle.features && vehicle.features.length > 0 && (
              <Reveal>
                <div>
                  <p className="eyebrow">Features &amp; specification</p>
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                    {vehicle.features.map((f) => (
                      <p key={f} className="flex items-center gap-2.5 text-sm text-ink-700">
                        <Check size={14} className="shrink-0 text-brand-600" /> {f}
                      </p>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}

            {/* Full details */}
            <Reveal>
              <div>
                <p className="eyebrow">Full vehicle details</p>
                <dl className="mt-5 overflow-hidden rounded-2xl border border-ink-100">
                  {primarySpecs.map(({ label, value }, i) => (
                    <div
                      key={label}
                      className={`flex justify-between gap-4 px-5 py-3 text-sm ${
                        i % 2 === 0 ? 'bg-white' : 'bg-cream-100'
                      }`}
                    >
                      <dt className="text-ink-500">{label}</dt>
                      <dd className="font-medium text-ink-950 text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>

          {/* Right column — sticky purchase card */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-6 space-y-6">
              <div className="overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-luxe-sm">
                <div className="bg-ink-950 grain px-6 py-5 relative">
                  <div className="relative z-10 flex items-center justify-between">
                    <p className="font-wordmark text-xs font-bold uppercase tracking-[0.2em] text-white">
                      KY Automotive
                    </p>
                    <StatusBadge status={vehicle.status} />
                  </div>
                  <p className="relative z-10 mt-3 font-display text-3xl font-semibold text-white">
                    {formatPrice(vehicle.price)}
                  </p>
                  <p className="relative z-10 text-xs text-white/60 mt-0.5">
                    {vehicle.year} {title}
                  </p>
                </div>
                <div className="p-6">
                  {sold ? (
                    <div>
                      <p className="text-sm text-ink-600 mb-4">
                        This car has now been sold. Take a look at our similar stock below,
                        or tell us what you&apos;re after and we&apos;ll source it.
                      </p>
                      <Link href="/stock" className="btn btn-dark w-full">Browse the showroom</Link>
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} className="btn btn-primary w-full">
                        <Phone size={15} /> Call {SITE_PHONE}
                      </a>
                      <a
                        href={`https://wa.me/44${SITE_WHATSAPP.slice(1)}?text=${waMessage}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp w-full"
                      >
                        <MessageCircle size={15} /> Enquire on WhatsApp
                      </a>
                      <a href="#enquire" className="btn btn-outline w-full">
                        Send a message
                      </a>
                    </div>
                  )}

                  {/* Mini facts */}
                  <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-ink-100 pt-5 text-sm">
                    {[
                      { label: 'Year', value: String(vehicle.year) },
                      { label: 'Mileage', value: formatMileage(vehicle.mileage) },
                      { label: 'Fuel', value: vehicle.fuel_type },
                      { label: 'Gearbox', value: vehicle.transmission },
                      ...(vehicle.engine_size ? [{ label: 'Engine', value: vehicle.engine_size }] : []),
                      ...(vehicle.colour ? [{ label: 'Colour', value: vehicle.colour }] : []),
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <p className="text-[10px] uppercase tracking-[0.12em] text-ink-400">{label}</p>
                        <p className="font-medium text-ink-900">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enquiry panel */}
              <div id="enquire" className="card rounded-2xl p-6 scroll-mt-6">
                <p className="eyebrow">Enquiry</p>
                <h2 className="mt-2 font-display text-xl font-semibold text-ink-950">
                  Interested in this car?
                </h2>
                <p className="mt-1.5 mb-6 text-sm text-ink-500">
                  Send us a message, or add your part-exchange — we&apos;ll get straight back to you.
                </p>
                <CarEnquiryTabs
                  vehicleId={vehicle.id}
                  vehicleRef={`${vehicle.year} ${title}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Similar vehicles */}
        {similar.length > 0 && (
          <div className="mt-20">
            <Reveal>
              <p className="eyebrow">Keep looking</p>
              <h2 className="mt-3 mb-8 text-2xl md:text-4xl font-semibold text-ink-950 tracking-tight">
                Similar cars you might like
              </h2>
            </Reveal>
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {similar.map((v, i) => (
                <Reveal key={v.id} delay={Math.min(i * 60, 400)}>
                  <VehicleCard vehicle={v} />
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
