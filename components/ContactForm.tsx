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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
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
      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch {
      setError('Something went wrong. Please try again or call us directly.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-surface border border-accent/30 rounded-lg p-6 text-center">
        <p className="text-accent font-semibold mb-1">Message sent successfully!</p>
        <p className="text-secondary text-sm">We&apos;ll be in touch shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {vehicleRef && (
        <div className="bg-surface border border-border rounded-lg p-3">
          <p className="text-xs text-secondary">Enquiring about:</p>
          <p className="text-sm text-white font-medium">{vehicleRef}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="name"
          type="text"
          placeholder="Your Name *"
          required
          className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40"
        />
        <input
          name="email"
          type="email"
          placeholder="Email Address *"
          required
          className="bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40"
        />
      </div>

      <input
        name="phone"
        type="tel"
        placeholder="Phone Number"
        className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40"
      />

      <textarea
        name="message"
        placeholder="Your Message *"
        required
        rows={4}
        className="w-full bg-surface border border-border rounded-lg px-4 py-3 text-sm text-white placeholder:text-secondary focus:outline-none focus:border-white/40 resize-none"
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="inline-flex items-center gap-2 bg-accent text-black px-6 py-3 font-semibold text-sm rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50"
      >
        <Send size={16} />
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
