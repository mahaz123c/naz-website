import Link from 'next/link';
import { Phone, MessageCircle } from 'lucide-react';
import Reveal from './Reveal';
import { SITE_PHONE, SITE_WHATSAPP } from '@/lib/constants';

export default function ContactCTA() {
  return (
    <section className="bg-cream-50 py-16 lg:py-28">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900 grain">
            {/* Accent orbs */}
            <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-brand-500/15 blur-3xl" />
            <div className="absolute -bottom-28 -left-20 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />

            <div className="relative z-10 px-6 py-16 md:px-16 lg:py-24 text-center">
              <p className="eyebrow eyebrow-light eyebrow-center justify-center">Ready when you are</p>
              <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-white tracking-tight">
                Found something you{' '}
                <em className="text-brand-gradient animate-brand-sweep italic">love</em>?
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-white/65 text-base leading-relaxed">
                Get in touch and we&apos;ll answer any questions, arrange a viewing or hold the
                car for you. Part exchange and finance? We&apos;ll handle that too.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-3">
                <Link href="/contact" className="btn btn-primary">
                  Contact us
                </Link>
                <a
                  href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
                  className="btn bg-white text-ink-950 hover:bg-cream-100"
                >
                  <Phone size={15} /> {SITE_PHONE}
                </a>
                <a
                  href={`https://wa.me/44${SITE_WHATSAPP.slice(1)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <MessageCircle size={15} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
