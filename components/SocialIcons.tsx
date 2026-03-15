import { Facebook, Instagram, Youtube, Linkedin } from 'lucide-react';

function XIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

interface SocialIconsProps {
  variant?: 'filled' | 'outline';
}

const socials = [
  { name: 'Facebook', Icon: Facebook, color: 'hover:bg-[#1877F2]', href: '#' },
  { name: 'Instagram', Icon: Instagram, color: 'hover:bg-[#E4405F]', href: '#' },
  { name: 'X', Icon: XIcon, color: 'hover:bg-black', href: '#' },
  { name: 'YouTube', Icon: Youtube, color: 'hover:bg-[#FF0000]', href: '#' },
  { name: 'LinkedIn', Icon: Linkedin, color: 'hover:bg-[#0A66C2]', href: '#' },
];

export default function SocialIcons({ variant = 'filled' }: SocialIconsProps) {
  return (
    <div className="flex items-center gap-3">
      {socials.map(({ name, Icon, color, href }) => (
        <a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={name}
          className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
            variant === 'outline'
              ? `border border-white/30 text-white ${color} hover:border-transparent hover:text-white`
              : `bg-white/10 text-white ${color} hover:text-white`
          }`}
        >
          <Icon size={18} />
        </a>
      ))}
    </div>
  );
}
