'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, Settings, Gauge, Fuel, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { formatPrice, formatMonthly, formatMileage } from '@/lib/utils';
import type { Vehicle } from '@/lib/types';

// Demo vehicles for when Supabase isn't connected or DB is empty
const demoVehicles: Vehicle[] = [
  {
    id: '1', make: 'BMW', model: 'iX3', year: 2023, price: 22990, mileage: 57111,
    fuel_type: 'Electric', transmission: 'Automatic', body_type: 'SUV', colour: 'Black',
    doors: 5, engine_size: null, horsepower: 286, monthly_price: 342.91,
    description: null, features: [],
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80'],
    status: 'available', featured: true, slug: '2023-bmw-ix3-demo1', created_at: '', updated_at: '',
  },
  {
    id: '2', make: 'Mercedes-Benz', model: 'C-Class', year: 2022, price: 28990, mileage: 32000,
    fuel_type: 'Diesel', transmission: 'Automatic', body_type: 'Saloon', colour: 'Silver',
    doors: 4, engine_size: '2.0L', horsepower: 200, monthly_price: 429.00,
    description: null, features: [],
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80'],
    status: 'available', featured: true, slug: '2022-mercedes-c-class-demo2', created_at: '', updated_at: '',
  },
  {
    id: '3', make: 'Audi', model: 'A4', year: 2023, price: 26500, mileage: 18500,
    fuel_type: 'Petrol', transmission: 'Automatic', body_type: 'Saloon', colour: 'White',
    doors: 4, engine_size: '2.0L', horsepower: 204, monthly_price: 389.00,
    description: null, features: [],
    images: ['https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80'],
    status: 'available', featured: true, slug: '2023-audi-a4-demo3', created_at: '', updated_at: '',
  },
];

interface FeaturedSectionProps {
  vehicles?: Vehicle[];
}

export default function FeaturedSection({ vehicles }: FeaturedSectionProps) {
  const cars = vehicles && vehicles.length > 0 ? vehicles : demoVehicles;
  const [current, setCurrent] = useState(0);
  const car = cars[current];

  const next = () => setCurrent((prev) => (prev + 1) % cars.length);
  const prev = () => setCurrent((prev) => (prev - 1 + cars.length) % cars.length);

  return (
    <section className="bg-background py-16 px-4 md:px-8 relative overflow-hidden">
      {/* Watermark */}
      <div className="absolute inset-0 flex items-start justify-center pt-4 pointer-events-none">
        <span className="text-[8rem] md:text-[12rem] font-bold text-white/[0.03] uppercase tracking-wider whitespace-nowrap">
          KY AUTOMOTIVE
        </span>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-white text-center mb-12">
          Family-Run Dealership<br />Near Heathrow, London
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Vehicle card */}
          <div className="relative bg-white rounded-lg overflow-hidden">
            {/* Logo overlay */}
            <div className="absolute top-4 left-4 z-10 bg-white/90 px-3 py-1">
              <span className="text-sm font-bold tracking-wider text-black uppercase">KY Automotive</span>
            </div>

            {/* Image */}
            <div
              className="h-[300px] md:h-[350px] bg-cover bg-center"
              style={{ backgroundImage: `url(${car.images[0]})` }}
            />

            {/* Info overlay */}
            <div className="bg-surface p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {car.make} {car.model}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-secondary mt-1">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {car.year}</span>
                    <span className="flex items-center gap-1"><Settings size={12} /> {car.transmission}</span>
                    <span className="flex items-center gap-1"><Gauge size={12} /> {formatMileage(car.mileage)}</span>
                    <span className="flex items-center gap-1"><Fuel size={12} /> {car.fuel_type}</span>
                  </div>
                </div>
                <div className="text-right">
                  {car.monthly_price && (
                    <p className="text-sm text-accent font-semibold">{formatMonthly(car.monthly_price)} /month</p>
                  )}
                  <p className="text-lg font-bold text-white">{formatPrice(car.price)}</p>
                </div>
              </div>
              <div className="flex gap-4 mt-3 text-sm">
                <Link href={`/stock/${car.slug}`} className="font-medium text-white underline underline-offset-2 hover:text-accent transition-colors">
                  View details
                </Link>
                <Link href="/finance" className="font-medium text-accent underline underline-offset-2 hover:text-accent-hover transition-colors">
                  Apply for finance
                </Link>
              </div>
            </div>

            {/* Carousel arrows */}
            {cars.length > 1 && (
              <>
                <button onClick={prev} className="absolute left-2 top-1/3 z-10 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70" aria-label="Previous vehicle">
                  <ChevronLeft size={16} />
                </button>
                <button onClick={next} className="absolute right-2 top-1/3 z-10 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-black/70" aria-label="Next vehicle">
                  <ChevronRight size={16} />
                </button>
              </>
            )}
          </div>

          {/* Right: Part Exchange */}
          <div className="flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Looking to Part Exchange?
            </h3>
            <form className="flex items-center gap-0 max-w-md" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Your Reg"
                className="flex-1 bg-transparent border border-white/30 text-white px-4 py-3 text-sm placeholder:text-secondary focus:outline-none focus:border-white/60 rounded-l-full"
              />
              <select className="bg-transparent border-y border-white/30 text-secondary px-4 py-3 text-sm focus:outline-none appearance-none">
                <option value="">Mileage</option>
                <option value="10000">Under 10,000</option>
                <option value="30000">Under 30,000</option>
                <option value="50000">Under 50,000</option>
                <option value="70000">Under 70,000</option>
                <option value="100000">Under 100,000</option>
                <option value="100001">Over 100,000</option>
              </select>
              <button
                type="submit"
                className="w-12 h-[46px] flex items-center justify-center border border-white/30 rounded-r-full text-white hover:bg-white/10 transition-colors"
              >
                <ArrowUpRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
