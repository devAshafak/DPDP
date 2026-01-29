import { ReactNode } from "react";

type TrustItem = {
  icon: ReactNode;
  label: string;
};

const items: TrustItem[] = [
  {
    icon: "🔒",
    label: "No personal data is collected or stored",
  },
  {
    icon: "🧠",
    label: "Self-assessment only",
  },
  {
    icon: "⚖️",
    label: "Not a legal or technical audit",
  },
];

export default function TrustBanner() {
  return (
    <section
      aria-label="Assessment trust and assurance information"
      className="mt-5 rounded-xl border border-slate-200 bg-white/95 px-3 py-3 shadow-md backdrop-blur-sm sm:mt-8 sm:px-6 sm:py-4 sm:bg-slate-100/95"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-2 text-xs text-gray-700 sm:text-sm"
          >
            <span className="mt-0.5 text-base" aria-hidden="true">
              {item.icon}
            </span>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

