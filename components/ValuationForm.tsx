'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { MAKES } from '@/lib/constants';

interface ValuationFormProps {
  interestedIn?: string;
}

export default function ValuationForm({ interestedIn }: ValuationFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [sentName, setSentName] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const interested = formData.get('interested_in') as string;
    const notes = formData.get('notes') as string;
    const data = {
      name,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      make: formData.get('make') as string,
      model: formData.get('model') as string,
      year: Number(formData.get('year')),
      mileage: Number(formData.get('mileage')),
      registration: formData.get('registration') as string,
      condition: formData.get('condition') as string,
      notes: [interested ? `Interested in: ${interested}` : '', notes].filter(Boolean).join('\n'),
    };

    try {
      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setSentName(name.split(' ')[0]);
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="card rounded-2xl border-brand-200 bg-brand-50 p-8 text-center">
        <p className="font-display text-lg font-semibold text-brand-800 mb-1">
          Thanks{sentName ? `, ${sentName}` : ''}!
        </p>
        <p className="text-sm text-ink-600">
          We&apos;ve received your part-exchange details and will be in touch shortly with a valuation.
        </p>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <p className="label !mb-3">Your car</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="registration" type="text" placeholder="Registration (optional)" className="input" />
          <input name="mileage" type="number" placeholder="Mileage *" required className="input" />
          <select name="make" required defaultValue="" className="input appearance-none cursor-pointer">
            <option value="" disabled>Make *</option>
            {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
            <option value="Other">Other</option>
          </select>
          <input name="model" type="text" placeholder="Model *" required className="input" />
          <select name="year" required defaultValue="" className="input appearance-none cursor-pointer">
            <option value="" disabled>Year *</option>
            {Array.from({ length: 25 }, (_, i) => currentYear - i).map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <select name="condition" defaultValue="" className="input appearance-none cursor-pointer">
            <option value="" disabled>Condition</option>
            <option value="excellent">Excellent</option>
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
          </select>
        </div>
      </div>

      <div>
        <p className="label !mb-3">Car you&apos;re interested in (optional)</p>
        <input
          name="interested_in"
          type="text"
          defaultValue={interestedIn || ''}
          placeholder="e.g. the BMW 3 Series on your website"
          className="input"
        />
      </div>

      <div>
        <p className="label !mb-3">Your details</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input name="name" type="text" placeholder="Your name *" required className="input" />
          <input name="phone" type="tel" placeholder="Phone *" required className="input" />
          <input name="email" type="email" placeholder="Email *" required className="input" />
        </div>
      </div>

      <div>
        <p className="label !mb-3">Anything else?</p>
        <textarea
          name="notes"
          placeholder="Damage, modifications, service history, outstanding finance…"
          rows={3}
          className="input resize-none"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={status === 'loading'} className="btn btn-primary disabled:opacity-50">
        <Send size={15} />
        {status === 'loading' ? 'Submitting…' : 'Get my valuation'}
      </button>
    </form>
  );
}
