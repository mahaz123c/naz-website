'use client';

import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const socials = [
  { name: 'Facebook', Icon: Facebook, bg: 'bg-[#1877F2]', href: '#' },
  { name: 'Instagram', Icon: Instagram, bg: 'bg-gradient-to-br from-[#f09433] via-[#e6683c] to-[#bc1888]', href: '#' },
  { name: 'X', Icon: XIcon, bg: 'bg-black', href: '#' },
  { name: 'YouTube', Icon: Youtube, bg: 'bg-[#FF0000]', href: '#' },
  { name: 'LinkedIn', Icon: Linkedin, bg: 'bg-[#0A66C2]', href: '#' },
];

export default function SocialSidebar() {
  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-1">
      {socials.map(({ name, Icon, bg, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={`flex items-center justify-center w-10 h-10 ${bg} text-white transition-opacity hover:opacity-80 rounded-l-lg`}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
