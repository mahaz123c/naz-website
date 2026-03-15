import ValuationForm from '@/components/ValuationForm';
import { Check } from 'lucide-react';
import { SITE_NAME } from '@/lib/constants';

export const metadata = {
  title: 'Sell Your Car',
  description: `Sell your car to ${SITE_NAME}. Get an instant online valuation and receive a competitive offer within 24 hours.`,
};

export default function SellYourCarPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-surface py-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">Sell Your Car</h1>
          <p className="text-secondary text-sm mb-6">
            Get a competitive valuation for your vehicle. Fill in the form below and we&apos;ll be in touch within 24 hours.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {['Competitive prices', 'Quick & easy process', 'Free valuation', 'No obligation'].map((text) => (
              <div key={text} className="flex items-center gap-2 text-sm text-secondary">
                <Check size={16} className="text-accent" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-12">
        <ValuationForm />
      </div>
    </div>
  );
}
