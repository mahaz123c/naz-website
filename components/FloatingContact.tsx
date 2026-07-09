import { Phone, MessageCircle } from 'lucide-react';
import { SITE_PHONE, SITE_WHATSAPP } from '@/lib/constants';

const waMessage = encodeURIComponent("Hi KY Automotive, I'd like to make an enquiry.");

export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/44${SITE_WHATSAPP.slice(1)}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp us"
        className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-luxe-sm hover:scale-105 transition-transform duration-300"
      >
        <MessageCircle size={24} />
      </a>
      <a
        href={`tel:${SITE_PHONE.replace(/\s/g, '')}`}
        aria-label="Call us"
        className="md:hidden w-13 h-13 rounded-full bg-ink-950 text-white flex items-center justify-center shadow-luxe-sm hover:scale-105 transition-transform duration-300"
      >
        <Phone size={22} />
      </a>
    </div>
  );
}
