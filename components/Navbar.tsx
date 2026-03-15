'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Mail, MessageCircle, Search, Menu, X } from 'lucide-react';
import { SITE_NAME, SITE_PHONE } from '@/lib/constants';

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface">
      {/* Single nav row */}
      <div className="flex items-center justify-between px-4 md:px-8 py-3">
        {/* Left: Contact info (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-4 text-sm text-secondary">
          <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Phone size={14} />
            <span>{SITE_PHONE}</span>
          </a>
          <span className="text-border">|</span>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={14} />
            <span>Sales</span>
          </a>
          <span className="text-border">|</span>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <Mail size={14} />
            <span>Aftersales</span>
          </a>
          <span className="text-border">|</span>
          <a href="#" className="flex items-center gap-1.5 hover:text-white transition-colors">
            <MessageCircle size={14} />
            <span>Chat</span>
          </a>
        </div>

        {/* Center: Logo */}
        <Link href="/" className="flex flex-col items-center">
          <span className="text-xl md:text-2xl font-bold tracking-[0.25em] text-white uppercase">
            {SITE_NAME.split(' ')[0] || SITE_NAME}
          </span>
          {SITE_NAME.split(' ').length > 1 && (
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.3em] text-white uppercase bg-white/10 px-2 py-0.5">
              {SITE_NAME.split(' ').slice(1).join(' ')}
            </span>
          )}
        </Link>

        {/* Right: Nav links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link href="/stock" className="text-sm font-medium text-white hover:text-accent transition-colors">
            Buy
          </Link>
          <Link href="/finance" className="text-sm font-medium text-white hover:text-accent transition-colors">
            Finance
          </Link>
          <Link href="/sell-your-car" className="text-sm font-medium text-white hover:text-accent transition-colors">
            Sell
          </Link>
          <span className="text-border">|</span>
          <Link href="/stock" className="text-white hover:text-accent transition-colors">
            <Search size={18} />
          </Link>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex items-center gap-2 text-sm font-medium text-white hover:text-accent transition-colors"
          >
            Menu
            <Menu size={18} />
          </button>
        </div>

        {/* Mobile: hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface border-t border-border px-4 py-6 space-y-4">
          <Link href="/stock" className="block text-white font-medium py-2" onClick={() => setMobileOpen(false)}>
            Buy
          </Link>
          <Link href="/finance" className="block text-white font-medium py-2" onClick={() => setMobileOpen(false)}>
            Finance
          </Link>
          <Link href="/sell-your-car" className="block text-white font-medium py-2" onClick={() => setMobileOpen(false)}>
            Sell
          </Link>
          <Link href="/about" className="block text-white font-medium py-2" onClick={() => setMobileOpen(false)}>
            About
          </Link>
          <Link href="/contact" className="block text-white font-medium py-2" onClick={() => setMobileOpen(false)}>
            Contact
          </Link>
          <div className="pt-4 border-t border-border space-y-3 text-sm text-secondary">
            <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2">
              <Phone size={14} /> {SITE_PHONE}
            </a>
            <a href="#" className="flex items-center gap-2">
              <Mail size={14} /> Sales
            </a>
            <a href="#" className="flex items-center gap-2">
              <MessageCircle size={14} /> Chat
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
