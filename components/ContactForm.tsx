'use client';

import { useState } from 'react';
import { Send } from 'lucide-react';

interface ContactFormProps {
  vehicleId?: string;
  vehicleRef?: string;
}

export default function ContactForm({ vehicleId, vehicleRef }: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');
  const [sentName, setSentName] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const data = {
      name,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      vehicle_id: vehicleId || null,
      type: vehicleId ? 'vehicle' : 'general',
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send message');
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
      <div className="card rounded-2xl border-brand-200 bg-brand-50 p-7 text-center">
        <p className="font-display text-lg font-semibold text-brand-800 mb-1">Enquiry sent</p>
        <p className="text-sm text-ink-600">
          Thanks{sentName ? ` ${sentName}` : ''}, we&apos;ve received your message and will be
          in touch very shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="label" htmlFor="cf-name">Your name</label>
          <input id="cf-name" name="name" type="text" required className="input" placeholder="Jane Smith" />
        </div>
        <div>
          <label className="label" htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" required className="input" placeholder="you@email.com" />
        </div>
      </div>

      <div>
        <label className="label" htmlFor="cf-phone">Phone</label>
        <input id="cf-phone" name="phone" type="tel" className="input" placeholder="07xxx xxxxxx" />
        <p className="mt-1.5 text-xs text-ink-400">We&apos;ll give you a quick call to discuss the car.</p>
      </div>

      <div>
        <label className="label" htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          className="input resize-none"
          defaultValue={vehicleRef ? `Hi, I'm interested in the ${vehicleRef}. Please get in touch.` : ''}
          placeholder="How can we help?"
        />
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={status === 'loading'} className="btn btn-primary disabled:opacity-50">
        <Send size={15} />
        {status === 'loading' ? 'Sending…' : 'Send enquiry'}
      </button>
    </form>
  );
}
