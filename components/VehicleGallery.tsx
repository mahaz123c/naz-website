'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';

export default function VehicleGallery({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const next = useCallback(() => setCurrent((p) => (p + 1) % images.length), [images.length]);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + images.length) % images.length), [images.length]);

  // Keyboard navigation for the lightbox
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightbox, next, prev]);

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl bg-ink-100">
        <p className="text-ink-400 text-sm">No images available</p>
      </div>
    );
  }

  // Swipe support for mobile
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 50) return;
    if (delta < 0) next();
    else prev();
  };

  return (
    <div>
      {/* Main image */}
      <div
        className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-ink-100"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <Image
          key={current}
          src={images[current]}
          alt={`Vehicle image ${current + 1}`}
          fill
          className="object-cover animate-fade-in-fast"
          priority
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-ink-950/60 text-white backdrop-blur-sm hover:bg-ink-950/80 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 h-10 w-10 items-center justify-center rounded-full bg-ink-950/60 text-white backdrop-blur-sm hover:bg-ink-950/80 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <div className="absolute bottom-3 left-3 rounded-full bg-ink-950/60 px-3 py-1 text-xs text-white backdrop-blur-sm">
          {current + 1} / {images.length}
        </div>
        <button
          onClick={() => setLightbox(true)}
          className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-ink-950/60 text-white backdrop-blur-sm hover:bg-ink-950/80 transition-colors"
          aria-label="Expand image"
        >
          <Expand size={15} />
        </button>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all ${
                i === current ? 'ring-2 ring-brand-500' : 'opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="96px" />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950/95 p-4">
          <button
            onClick={() => setLightbox(false)}
            className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div
            className="relative h-[80vh] w-full max-w-6xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <Image
              key={current}
              src={images[current]}
              alt={`Vehicle image ${current + 1}`}
              fill
              className="object-contain animate-fade-in-fast"
              sizes="100vw"
            />
          </div>
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={next}
                className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Next image"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}
          <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/60">
            {current + 1} / {images.length}
          </p>
        </div>
      )}
    </div>
  );
}
