import { Phone, MessageCircle, Mail, MapPin } from 'lucide-react';
import Reveal from './Reveal';
import { SITE_PHONE, SITE_WHATSAPP, SITE_EMAIL, SITE_ADDRESS } from '@/lib/constants';

interface ServiceCTAProps {
  heading: string;
  text: string;
}

export default function ServiceCTA({ heading, text }: ServiceCTAProps) {
  const mapQuery = encodeURIComponent(
    `${SITE_ADDRESS.line1}, ${SITE_ADDRESS.line2}, ${SITE_ADDRESS.postcode}`
  );

  return (
    <section className="container-px pb-16 lg:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-ink-900 via-ink-950 to-ink-900 grain">
          <div className="absolute -top-24 -right-16 h-80 w-80 rounded-full bg-brand-500/15 blur-3xl" />
          <div className="absolute -bottom-28 -left-20 h-96 w-96 rounded-full bg-brand-500/10 blur-3xl" />

          <div className="relative z-10 px-6 py-14 md:px-14 lg:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">{heading}</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/65 text-sm md:text-base leading-relaxed">{text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} className="btn btn-primary">
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
              <a href={`mailto:${SITE_EMAIL}`} className="btn btn-outline-light">
                <Mail size={15} /> Email us
              </a>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
            >
              <MapPin size={12} /> {SITE_ADDRESS.line1}, {SITE_ADDRESS.line2}, {SITE_ADDRESS.postcode}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
