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
      className="mt-8 rounded-xl border border-blue-100 bg-[#F6F2EA] px-4 py-3 sm:px-6 sm:py-4"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex items-start gap-2 text-sm text-gray-700"
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

