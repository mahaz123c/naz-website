import { Phone, Smartphone, Mail, MessageCircle, MapPin, Instagram, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import PageHeader from '@/components/PageHeader';
import Reveal from '@/components/Reveal';
import {
  SITE_NAME, SITE_PHONE, SITE_MOBILE, SITE_EMAIL, SITE_ADDRESS, SITE_HOURS, SITE_WHATSAPP,
  SITE_INSTAGRAM, SITE_INSTAGRAM_HANDLE,
} from '@/lib/constants';

export const metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SITE_NAME}. Call, WhatsApp or visit our dealership near Heathrow, London.`,
};

export default function ContactPage() {
  const mapQuery = encodeURIComponent(
    `${SITE_ADDRESS.line1}, ${SITE_ADDRESS.line2}, ${SITE_ADDRESS.postcode}`
  );

  const cards = [
    { Icon: Phone, label: 'Call us', value: SITE_PHONE, href: `tel:${SITE_PHONE.replace(/\s/g, '')}` },
    { Icon: Smartphone, label: 'Mobile', value: SITE_MOBILE, href: `tel:${SITE_MOBILE.replace(/\s/g, '')}` },
    { Icon: MessageCircle, label: 'WhatsApp', value: 'Message us', href: `https://wa.me/44${SITE_WHATSAPP.slice(1)}` },
    { Icon: Mail, label: 'Email', value: SITE_EMAIL, href: `mailto:${SITE_EMAIL}` },
    { Icon: Instagram, label: 'Instagram', value: SITE_INSTAGRAM_HANDLE, href: SITE_INSTAGRAM },
    {
      Icon: MapPin,
      label: 'Find us',
      value: `${SITE_ADDRESS.line1}, ${SITE_ADDRESS.postcode}`,
      href: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`,
    },
  ];

  return (
    <div className="bg-cream-50 min-h-screen">
      <PageHeader
        eyebrow="Get in touch"
        title={<>Let&apos;s talk cars</>}
        subtitle="Questions about a car, a viewing to arrange, or a test drive to book — call, message or drop in. We're a family business, so you'll always speak to someone who can actually help."
      />

      <div className="container-px py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Left: contact cards + hours + map */}
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cards.map(({ Icon, label, value, href }, i) => (
                <Reveal key={label} delay={Math.min(i * 50, 300)}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="card block rounded-2xl p-5 transition-all duration-500 hover:-translate-y-1 hover:shadow-luxe-sm"
                  >
                    <Icon size={18} className="text-brand-600 mb-3" />
                    <p className="text-[10px] uppercase tracking-[0.14em] text-ink-400">{label}</p>
                    <p className="mt-0.5 text-sm font-semibold text-ink-950 break-words">{value}</p>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="card rounded-2xl p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <Clock size={16} className="text-brand-600" />
                  <h3 className="font-display text-base font-semibold text-ink-950">Opening hours</h3>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between text-ink-500">
                    <span>Monday – Saturday</span>
                    <span className="font-medium text-ink-900">{SITE_HOURS.weekdays}</span>
                  </li>
                  <li className="flex justify-between text-ink-500">
                    <span>Sunday</span>
                    <span className="font-medium text-ink-900">{SITE_HOURS.sunday}</span>
                  </li>
                </ul>
                <p className="mt-4 text-xs text-ink-400">
                  Viewings and test drives by appointment — call ahead and we&apos;ll have the car ready.
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-ink-100">
                <iframe
                  title="KY Automotive location"
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  className="h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </Reveal>
          </div>

          {/* Right: message form */}
          <Reveal direction="right" className="lg:col-span-3">
            <div className="card rounded-2xl p-6 md:p-9">
              <p className="eyebrow">Enquiry</p>
              <h2 className="mt-2 mb-7 text-2xl md:text-3xl font-semibold text-ink-950 tracking-tight">
                Send us a message
              </h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
