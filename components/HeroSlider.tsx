'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { SITE_NAME } from '@/lib/constants';

const slides = [
  {
    image: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=1920&q=80',
    subtitle: 'Welcome to',
    title: SITE_NAME,
  },
  {
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?w=1920&q=80',
    subtitle: 'Premium',
    title: 'Used Cars',
  },
  {
    image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=1920&q=80',
    subtitle: 'Finance',
    title: 'Available',
  },
  {
    image: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1920&q=80',
    subtitle: 'Free UK',
    title: 'Delivery',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${
            i === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      ))}

      {/* Text overlay */}
      <div className="relative z-10 flex items-end h-full pb-24 md:pb-32 px-6 md:px-16 lg:px-24">
        <div>
          <p className="text-white/80 text-lg md:text-xl font-light mb-2">
            {slides[current].subtitle}
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-semibold text-white mb-1 border-b border-white/30 pb-4 inline-block">
            {slides[current].title}
          </h1>
          <div className="mt-6">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 border border-white/50 text-white px-6 py-3 text-sm font-medium hover:bg-white/10 transition-colors"
            >
              More about us <span>&rarr;</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 md:left-8 bottom-8 z-10 w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors rounded-none"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 md:right-8 bottom-8 z-10 w-12 h-12 flex items-center justify-center border border-white/30 text-white hover:bg-white/10 transition-colors rounded-none"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Slide counter */}
      <div className="absolute right-4 md:right-20 bottom-10 z-10 text-white text-2xl font-light">
        <span className="text-4xl font-semibold">{current + 1}</span>
        <span className="text-white/50"> / {slides.length}</span>
      </div>
    </section>
  );
}
