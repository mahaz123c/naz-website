'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Phone, Menu, X, ChevronDown, Instagram, MessageCircle } from 'lucide-react';
import { SITE_PHONE, SITE_WHATSAPP } from '@/lib/constants';

const mainLinks = [
  { href: '/', label: 'Home' },
  { href: '/stock', label: 'Showroom' },
  { href: '/finance', label: 'Finance' },
  { href: '/about', label: 'About' },
];

const serviceLinks = [
  { href: '/sell-your-car', label: 'Part Exchange' },
  { href: '/sale-or-return', label: 'Sale or Return' },
  { href: '/sourcing', label: 'Vehicle Sourcing' },
  { href: '/warranty', label: 'Warranty' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="relative z-50 bg-black">
      {/* Announcement strip */}
      <div className="hidden md:flex h-9 items-center border-b border-white/10">
        <div className="container-px flex items-center justify-between text-[11px] tracking-[0.08em] uppercase">
          <p className="text-white/50">
            West Drayton, London &middot; Hand-selected stock, sold with confidence
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors">
              <Instagram size={12} /> Instagram
            </a>
            <a
              href={`https://wa.me/44${SITE_WHATSAPP.slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors"
            >
              <MessageCircle size={12} /> WhatsApp us
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="container-px flex h-16 md:h-[72px] items-center justify-between">
        {/* Logo + wordmark — large but clearly contained within the bar */}
        <Link href="/" className="flex items-center gap-4 shrink-0">
          <Image
            src="/logo-ky.png"
            alt="KY Automotive"
            width={109}
            height={64}
            className="h-14 md:h-16 w-auto object-contain"
            priority
          />
          <span className="hidden sm:block">
            <span className="block font-wordmark text-sm font-bold tracking-[0.2em] text-white uppercase">
              KY Automotive
            </span>
            <span className="block text-[10px] tracking-[0.18em] uppercase text-white/40">
              Drive Luxury. Pay Less.
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {mainLinks.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`relative text-sm font-medium transition-colors ${
                  active ? 'text-brand-500' : 'text-white hover:text-brand-400'
                }`}
              >
                {label}
                {active && <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-brand-500" />}
              </Link>
            );
          })}

          {/* Services dropdown */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-sm font-medium text-white hover:text-brand-400 transition-colors py-2">
              Services
              <ChevronDown size={14} className="transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-1/2 -translate-x-1/2 top-full pt-2 z-50">
              <div className="w-56 rounded-2xl bg-ink-900/95 backdrop-blur-xl border border-white/10 p-2 shadow-luxe">
                {serviceLinks.map(({ href, label }) => (
                  <Link
                    key={label}
                    href={href}
                    className="block rounded-xl px-4 py-2.5 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors ${
              pathname === '/contact' ? 'text-brand-500' : 'text-white hover:text-brand-400'
            }`}
          >
            Contact
          </Link>

          {/* Phone pill */}
          <a
            href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
            className="btn btn-primary !py-2.5 !px-5 text-sm"
          >
            <Phone size={14} />
            {SITE_PHONE}
          </a>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 -mr-2"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-black border-t border-white/10 px-5 py-6">
          {mainLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="block text-white font-medium py-3 border-b border-white/5"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}

          <p className="label !text-white/40 mt-5 mb-1">Services</p>
          {serviceLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="block text-white/80 py-2.5 border-b border-white/5"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}

          <Link
            href="/contact"
            className="block text-white font-medium py-3 border-b border-white/5"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </Link>

          <a
            href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
            className="btn btn-primary w-full mt-5"
          >
            <Phone size={15} /> Call {SITE_PHONE}
          </a>
        </div>
      )}
    </header>
  );
}
