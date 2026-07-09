'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  to: number;
  suffix?: string;
  className?: string;
}

// Counts up from 0 when scrolled into view. 1.6s with the signature easing.
export default function Counter({ to, suffix = '', className = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const duration = 1600;
        const start = performance.now();
        // cubic-bezier(0.22, 1, 0.36, 1) approximation for a JS ease-out curve
        const ease = (t: number) => 1 - Math.pow(1 - t, 3.2);

        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          setValue(Math.round(ease(progress) * to));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { rootMargin: '-40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to]);

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString('en-GB')}
      {suffix}
    </span>
  );
}
