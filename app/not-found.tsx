import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-cream-50 px-4 text-center">
      <p className="font-display text-7xl md:text-9xl font-semibold text-brand-gradient animate-brand-sweep">
        404
      </p>
      <h1 className="mt-4 text-2xl md:text-3xl font-semibold text-ink-950">Page not found</h1>
      <p className="mt-3 max-w-md text-sm text-ink-500">
        The page you&apos;re looking for has moved, sold, or never existed. Let&apos;s get you
        back on the road.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">Back home</Link>
        <Link href="/stock" className="btn btn-outline">Browse stock</Link>
      </div>
    </div>
  );
}
