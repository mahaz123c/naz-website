import { Phone, Smartphone, Mail, MessageCircle, MapPin, Clock } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { SITE_NAME, SITE_PHONE, SITE_MOBILE, SITE_EMAIL, SITE_ADDRESS, SITE_HOURS } from '@/lib/constants';

export const metadata = {
  title: 'Contact Us',
  description: `Get in touch with ${SITE_NAME}. Call us, email us, or visit our dealership.`,
};

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-surface py-12 px-4 md:px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-secondary text-sm">Get in touch with our friendly team</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-white mb-6">Send us a message</h2>
            <ContactForm />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-surface border border-border rounded-lg p-6 space-y-5">
              <h3 className="text-lg font-semibold text-white">Get in Touch</h3>

              <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-secondary hover:text-white transition-colors">
                <Phone size={18} className="text-accent shrink-0" />
                <div>
                  <p className="text-xs text-secondary">Landline</p>
                  <p className="text-white">{SITE_PHONE}</p>
                </div>
              </a>

              <a href={`tel:${SITE_MOBILE.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-secondary hover:text-white transition-colors">
                <Smartphone size={18} className="text-accent shrink-0" />
                <div>
                  <p className="text-xs text-secondary">Mobile</p>
                  <p className="text-white">{SITE_MOBILE}</p>
                </div>
              </a>

              <a href={`mailto:${SITE_EMAIL}`} className="flex items-center gap-3 text-sm text-secondary hover:text-white transition-colors">
                <Mail size={18} className="text-accent shrink-0" />
                <div>
                  <p className="text-xs text-secondary">Email</p>
                  <p className="text-white">{SITE_EMAIL}</p>
                </div>
              </a>

              <a href="#" className="flex items-center gap-3 text-sm text-secondary hover:text-white transition-colors">
                <MessageCircle size={18} className="text-accent shrink-0" />
                <div>
                  <p className="text-xs text-secondary">WhatsApp</p>
                  <p className="text-white">Message Us</p>
                </div>
              </a>
            </div>

            <div className="bg-surface border border-border rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-white">{SITE_ADDRESS.line1}</p>
                  <p className="text-secondary">{SITE_ADDRESS.line2}</p>
                  <p className="text-secondary">{SITE_ADDRESS.line3} {SITE_ADDRESS.postcode}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock size={18} className="text-accent shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-white">Opening Times</p>
                  <p className="text-secondary">Mon - Sat: {SITE_HOURS.weekdays}</p>
                  <p className="text-secondary">Sun: {SITE_HOURS.sunday}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
