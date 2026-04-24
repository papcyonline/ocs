type PageHeaderProps = {
  eyebrow: string;
  title: string;
  updated?: string;
};

export function PageHeader({ eyebrow, title, updated }: PageHeaderProps) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-oranje-600 sm:text-xs">
        {eyebrow}
      </p>
      <h1 className="mt-4 font-display text-4xl tracking-tight text-black sm:mt-5 sm:text-5xl md:text-6xl">
        {title}
      </h1>
      {updated && (
        <p className="mt-5 text-sm text-neutral-500">Last updated: {updated}</p>
      )}
    </div>
  );
}
