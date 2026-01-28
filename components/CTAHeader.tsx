type CTAHeaderProps = {
  title: string;
  subtitle: string;
};

export default function CTAHeader({ title, subtitle }: CTAHeaderProps) {
  return (
    <header className="border-b border-slate-200 pb-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
        DPDP Readiness Assessment
      </p>
      <h1 className="mt-2 text-2xl font-semibold text-gray-900">{title}</h1>
      <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
    </header>
  );
}

