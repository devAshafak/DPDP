import { KeyboardEvent } from "react";
import type { OptionLabel } from "../data/dpdpQuestions";

type OptionCardProps = {
  label: OptionLabel;
  text: string;
  selected: boolean;
  onSelect: () => void;
};

export default function OptionCard({
  label,
  text,
  selected,
  onSelect,
}: OptionCardProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onSelect();
    }
  };

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      onKeyDown={handleKeyDown}
      className={`flex w-full items-start gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white/30 sm:px-5 sm:py-4 ${
        selected
          ? "border-[#4A90E2] bg-blue-50/70"
          : "border-white/40 bg-white/50 hover:border-blue-200/80 hover:bg-white/70"
      }`}
    >
      <span
        className={`mt-0.5 flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${
          selected
            ? "bg-[#4A90E2] text-white"
            : "bg-slate-100 text-gray-700"
        }`}
        aria-hidden="true"
      >
        {label}
      </span>
      <span className="flex-1 text-gray-800">{text}</span>
      {selected && (
        <span
          className="mt-0.5 text-xs font-medium text-[#4A90E2]"
          aria-hidden="true"
        >
          ✓
        </span>
      )}
    </button>
  );
}

