import Link from 'next/link';
import { Scale, Check, ShieldCheck, Clock, PoundSterling, Handshake } from 'lucide-react';
import { SITE_PHONE } from '@/lib/constants';

export const metadata = {
  title: 'Car Finance',
  description: 'Apply for car finance with KY Automotive. We work with Zuto, Close Brothers, and Motonova to find flexible finance options with competitive rates.',
};

const benefits = [
  { Icon: PoundSterling, title: 'Competitive Rates', desc: 'We work with Zuto, Close Brothers, and Motonova to find you the best rates available.' },
  { Icon: Clock, title: 'Quick Decisions', desc: 'Apply and receive a decision quickly. Our soft credit check won\'t affect your credit score.' },
  { Icon: Handshake, title: 'Flexible Terms', desc: 'Choose from PCP, HP, and personal loan options to suit your needs and budget.' },
  { Icon: ShieldCheck, title: 'Transparent Process', desc: 'No hidden fees or surprises. We walk you through every step with full transparency.' },
];

export default function FinancePage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-surface py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Scale size={48} className="text-white mx-auto mb-4" />
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Car Finance</h1>
          <p className="text-secondary text-sm mb-6">
            Flexible finance options to help you get behind the wheel of your dream car.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {['Flexible finance options', 'Zuto, Close Brothers & Motonova', 'Free finance check', 'Get instant results'].map((text) => (
              <div key={text} className="flex items-center gap-2 text-sm text-secondary">
                <Check size={16} className="text-accent" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits */}
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map(({ Icon, title, desc }) => (
            <div key={title} className="bg-surface border border-border rounded-lg p-6 flex gap-4">
              <Icon size={28} className="text-accent shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
                <p className="text-sm text-secondary leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How it works */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-white mb-8">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'Choose Your Car', desc: 'Browse our stock and find the perfect vehicle for you.' },
              { step: '2', title: 'Apply for Finance', desc: 'Complete our quick application. It won\'t affect your credit score.' },
              { step: '3', title: 'Drive Away', desc: 'Once approved, we\'ll arrange everything so you can drive away happy.' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-full bg-accent text-black text-xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 bg-surface border border-border rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-3">Ready to Apply?</h2>
          <p className="text-secondary text-sm mb-6">
            Contact us to discuss your finance options or browse our stock to find your perfect vehicle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/stock" className="bg-accent text-black px-6 py-3 font-semibold text-sm rounded-lg hover:bg-accent-hover transition-colors">
              Browse Stock
            </Link>
            <a href={`tel:${SITE_PHONE.replace(/\s/g, '')}`} className="border border-white/30 text-white px-6 py-3 font-medium text-sm rounded-lg hover:bg-white/10 transition-colors">
              Call {SITE_PHONE}
            </a>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-secondary max-w-3xl mx-auto leading-relaxed">
            We are a credit broker, not a lender. Finance is subject to status and income.
            Written Quotation on request. We work with Zuto, Close Brothers, and Motonova
            who may be able to offer you finance for your purchase.
          </p>
        </div>
      </div>
    </div>
  );
}
