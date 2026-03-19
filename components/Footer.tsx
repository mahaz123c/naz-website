import Link from 'next/link';
import Image from 'next/image';
import { Phone, Smartphone, Mail, MessageCircle } from 'lucide-react';
import {
  SITE_PHONE, SITE_MOBILE, SITE_MOBILE_2, SITE_EMAIL,
  SITE_ADDRESS, SITE_HOURS, SITE_COMPANY_NO, SITE_LEGAL_NAME, SITE_WHATSAPP,
} from '@/lib/constants';
import SocialIcons from './SocialIcons';

export default function Footer() {
  return (
    <footer className="bg-surface">
      {/* Logo + Contact */}
      <div className="text-center py-12 px-4">
        <div className="mb-8 flex justify-center">
          <Image
            src="/logo.png"
            alt="KY Automotive"
            width={200}
            height={80}
            className="h-16 w-auto"
          />
        </div>

        {/* Contact row */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm text-secondary mb-8">
          <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Phone size={16} /> {SITE_PHONE}
          </a>
          <a href={`tel:${SITE_MOBILE.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Smartphone size={16} /> {SITE_MOBILE}
          </a>
          <a href={`tel:${SITE_MOBILE_2.replace(/\s/g, '')}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Smartphone size={16} /> {SITE_MOBILE_2}
          </a>
          <a href={`mailto:${SITE_EMAIL}`} className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={16} /> Email Us
          </a>
          <a href={`https://wa.me/44${SITE_WHATSAPP.slice(1)}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        </div>

        {/* Address */}
        <div className="text-secondary text-sm space-y-0.5 mb-8">
          <p>{SITE_ADDRESS.line1}</p>
          <p>{SITE_ADDRESS.line2}</p>
          {SITE_ADDRESS.line3 && <p>{SITE_ADDRESS.line3}</p>}
          <p>{SITE_ADDRESS.postcode}</p>
        </div>
      </div>

      {/* Opening Times */}
      <div className="border-t border-border py-6 px-4">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm">
          <span className="font-semibold text-white">Our Opening Times</span>
          <span className="hidden md:block text-accent">|</span>
          <span className="text-secondary">
            Everyday: <span className="font-semibold text-white">{SITE_HOURS.weekdays}</span>
          </span>
        </div>
        <p className="text-center text-xs text-secondary mt-3 max-w-2xl mx-auto">
          Customers are welcome to book appointments and test drives. Please contact us by phone to arrange your visit.
        </p>
      </div>

      {/* Social + Legal */}
      <div className="border-t border-border py-8 px-4 text-center">
        <div className="flex justify-center mb-6">
          <SocialIcons variant="outline" />
        </div>

        <p className="text-xs text-secondary max-w-4xl mx-auto mb-4 leading-relaxed">
          All finance is subject to status and income. Written Quotation on request. We act as a credit broker
          not a lender. We work with a number of carefully selected credit providers including Zuto, Close Brothers,
          and Motonova who may be able to offer you finance for your purchase.
        </p>

        <p className="text-xs text-secondary mb-6">
          {SITE_LEGAL_NAME} &nbsp;|&nbsp; Company No. {SITE_COMPANY_NO}
        </p>

        <div className="flex flex-wrap justify-center gap-3 text-xs text-secondary">
          <Link href="#" className="hover:text-white underline transition-colors">Privacy</Link>
          <span>|</span>
          <Link href="#" className="hover:text-white underline transition-colors">Terms of Use</Link>
          <span>|</span>
          <Link href="#" className="hover:text-white underline transition-colors">Terms &amp; Conditions</Link>
          <span>|</span>
          <Link href="#" className="hover:text-white underline transition-colors">Complaints Procedure</Link>
          <span>|</span>
          <Link href="#" className="hover:text-white underline transition-colors">Cookies</Link>
        </div>
      </div>
    </footer>
  );
}
