'use client';

import { useEffect, useRef, useState } from 'react';

type Direction = 'up' | 'down' | 'left' | 'right' | 'none';

interface RevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  className?: string;
}

// Site-wide scroll-reveal wrapper: fades content in (with a directional offset)
// the first time it enters the viewport.
export default function Reveal({ children, direction = 'up', delay = 0, className = '' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '-60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dirClass = direction === 'none' ? '' : `reveal-${direction}`;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${dirClass} ${visible ? 'reveal-visible' : ''} ${className}`}
    >
      {children}
    </div>
  );
}
