'use client';

import { useState } from 'react';
import ContactForm from './ContactForm';
import ValuationForm from './ValuationForm';

interface CarEnquiryTabsProps {
  vehicleId: string;
  vehicleRef: string;
}

export default function CarEnquiryTabs({ vehicleId, vehicleRef }: CarEnquiryTabsProps) {
  const [tab, setTab] = useState<'enquire' | 'px'>('enquire');

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setTab('enquire')}
          className={`btn !px-5 !py-2.5 !text-xs ${tab === 'enquire' ? 'btn-dark' : 'btn-outline'}`}
        >
          Enquire
        </button>
        <button
          onClick={() => setTab('px')}
          className={`btn !px-5 !py-2.5 !text-xs ${tab === 'px' ? 'btn-dark' : 'btn-outline'}`}
        >
          Part exchange
        </button>
      </div>

      {tab === 'enquire' ? (
        <ContactForm vehicleId={vehicleId} vehicleRef={vehicleRef} />
      ) : (
        <ValuationForm interestedIn={vehicleRef} />
      )}
    </div>
  );
}
