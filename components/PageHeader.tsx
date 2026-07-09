interface PageHeaderProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
}

export default function PageHeader({ eyebrow, title, subtitle }: PageHeaderProps) {
  return (
    <div className="bg-ink-950 grain py-14 lg:py-20">
      <div className="container-px relative z-10">
        <p className="eyebrow eyebrow-light">{eyebrow}</p>
        <h1 className="mt-3 text-4xl md:text-6xl font-semibold text-white tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 max-w-2xl text-sm md:text-base text-white/60 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
