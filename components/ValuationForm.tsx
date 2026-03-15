'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';
import { MAKES } from '@/lib/constants';

export default function ValuationForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      make: formData.get('make') as string,
      model: formData.get('model') as string,
      year: Number(formData.get('year')),
      mileage: Number(formData.get('mileage')),
      registration: formData.get('registration') as string,
      condition: formData.get('condition') as string,
      notes: formData.get('notes') as string,
    };

    try {
      const res = await fetch('/api/valuation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit');
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface border border-accent/30 rounded-lg p-8 text-center">
        <p className="text-accent font-semibold text-lg mb-2">Valuation Request Submitted!</p>
        <p className="text-secondary text-sm">We&apos;ll be in touch within 24 hours with a valuation for your vehicle.</p>
      </div>
    );
  }

  const currentYear = new Date().getFullYear();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" type="text" placeholder="Your Name *" required className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40" />
        <input name="email" type="email" placeholder="Email Address *" required className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40" />
      </div>
      <input name="phone" type="tel" placeholder="Phone Number *" required className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select name="make" required className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 appearance-none">
          <option value="">Vehicle Make *</option>
          {MAKES.map((m) => <option key={m} value={m}>{m}</option>)}
          <option value="Other">Other</option>
        </select>
        <input name="model" type="text" placeholder="Vehicle Model *" required className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <select name="year" required className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 appearance-none">
          <option value="">Year *</option>
          {Array.from({ length: 20 }, (_, i) => currentYear - i).map((y) => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <input name="mileage" type="number" placeholder="Mileage *" required className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40" />
        <input name="registration" type="text" placeholder="Registration" className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40" />
      </div>

      <select name="condition" className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/40 appearance-none">
        <option value="">Vehicle Condition</option>
        <option value="excellent">Excellent</option>
        <option value="good">Good</option>
        <option value="fair">Fair</option>
        <option value="poor">Poor</option>
      </select>

      <textarea name="notes" placeholder="Any additional notes (damage, modifications, service history, etc.)" rows={3} className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40 resize-none" />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button type="submit" disabled={status === 'loading'} className="inline-flex items-center gap-2 bg-accent text-black px-6 py-3 font-semibold text-sm rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50">
        <Send size={16} />
        {status === 'loading' ? 'Submitting...' : 'Get My Valuation'}
      </button>
    </form>
  );
}
