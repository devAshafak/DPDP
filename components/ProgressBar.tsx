type ProgressBarProps = {
  answeredCount: number;
  totalQuestions: number;
};

export default function ProgressBar({
  answeredCount,
  totalQuestions,
}: ProgressBarProps) {
  const rawPercent =
    totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;
  const percent = Math.round(rawPercent);

  return (
    <section
      aria-label="Assessment progress"
      className="border-b border-white/10 px-4 py-3 sm:px-6"
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-xs font-medium text-white/90">
          Progress: {percent}% completed
        </p>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full rounded-full bg-[#1fc9f2] transition-all duration-300 ease-out"
            style={{ width: `${percent}%` }}
            aria-hidden="true"
          />
        </div>
      </div>
    </section>
  );
}

