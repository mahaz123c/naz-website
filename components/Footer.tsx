import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MessageCircle, MapPin, Instagram } from 'lucide-react';
import {
  SITE_PHONE, SITE_MOBILE, SITE_EMAIL, SITE_ADDRESS, SITE_HOURS,
  SITE_COMPANY_NO, SITE_LEGAL_NAME, SITE_WHATSAPP,
} from '@/lib/constants';

const exploreLinks = [
  { href: '/', label: 'Home' },
  { href: '/stock', label: 'Showroom' },
  { href: '/about', label: 'About Us' },
  { href: '/finance', label: 'Finance' },
  { href: '/sell-your-car', label: 'Part Exchange' },
  { href: '/sale-or-return', label: 'Sale or Return' },
  { href: '/sourcing', label: 'Vehicle Sourcing' },
  { href: '/warranty', label: 'Warranty' },
  { href: '/contact', label: 'Contact Us' },
];

const hours = [
  { day: 'Monday – Friday', time: SITE_HOURS.weekdays },
  { day: 'Saturday', time: SITE_HOURS.weekdays },
  { day: 'Sunday', time: SITE_HOURS.sunday },
];

export default function Footer() {
  return (
    <footer className="bg-black text-white grain">
      <div className="container-px py-16 lg:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <Image
              src="/logo-ky.png"
              alt="KY Automotive"
              width={96}
              height={56}
              className="h-14 w-auto object-contain"
            />
            <span>
              <span className="block font-wordmark text-sm font-bold tracking-[0.2em] uppercase">
                KY Automotive
              </span>
              <span className="block text-[10px] tracking-[0.18em] uppercase text-white/40">
                Drive Luxury. Pay Less.
              </span>
            </span>
          </div>
          <p className="text-sm text-white/55 leading-relaxed mb-6">
            Premium used cars, sold with confidence. Hand-picked stock, honest descriptions
            and a no-pressure buying experience. Family-run, based in West Drayton near
            Heathrow, London — with nationwide delivery.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="#"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
            >
              <Instagram size={16} />
            </a>
            <a
              href={`https://wa.me/44${SITE_WHATSAPP.slice(1)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 hover:text-white hover:border-white/50 transition-colors"
            >
              <MessageCircle size={16} />
            </a>
            <a
              href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
              className="btn btn-primary !py-2 !px-4 !text-xs"
            >
              <Phone size={13} /> {SITE_PHONE}
            </a>
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="font-wordmark text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-5">
            Explore
          </h3>
          <ul className="space-y-2.5 text-sm">
            {exploreLinks.map(({ href, label }) => (
              <li key={label}>
                <Link href={href} className="text-white/55 hover:text-white transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Get in touch */}
        <div>
          <h3 className="font-wordmark text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-5">
            Get in touch
          </h3>
          <ul className="space-y-3 text-sm text-white/55">
            <li>
              <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone size={14} /> {SITE_PHONE}
              </a>
            </li>
            <li>
              <a href={`tel:${SITE_MOBILE.replace(/\s/g, '')}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Phone size={14} /> {SITE_MOBILE}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE_EMAIL}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail size={14} /> {SITE_EMAIL}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/44${SITE_WHATSAPP.slice(1)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <MessageCircle size={14} /> WhatsApp us
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <span>
                {SITE_ADDRESS.line1},<br />
                {SITE_ADDRESS.line2},<br />
                {SITE_ADDRESS.postcode}
              </span>
            </li>
          </ul>
        </div>

        {/* Opening hours */}
        <div>
          <h3 className="font-wordmark text-xs font-bold uppercase tracking-[0.2em] text-white/80 mb-5">
            Opening hours
          </h3>
          <ul className="space-y-2.5 text-sm">
            {hours.map(({ day, time }) => (
              <li key={day} className="flex justify-between gap-4 text-white/55">
                <span>{day}</span>
                <span className="text-white/80">{time}</span>
              </li>
            ))}
          </ul>
          <p className="text-xs text-white/40 mt-5 leading-relaxed">
            Viewings and test drives by appointment — call ahead and we&apos;ll have the car ready.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 relative z-10">
        <div className="container-px py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} KY Automotive. All rights reserved.</p>
          <p className="text-center">
            {SITE_LEGAL_NAME} &middot; Company No. {SITE_COMPANY_NO} &middot; We are a credit broker, not a lender.
          </p>
          <p className="flex items-center gap-3">
            <span>Cars sold subject to availability.</span>
            <Link href="/admin/login" className="underline hover:text-white transition-colors">Admin</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
