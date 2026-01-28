type NavigationControlsProps = {
  canGoBack: boolean;
  canGoNext: boolean;
  isLastQuestion: boolean;
  onBack: () => void;
  onNext: () => void;
};

export default function NavigationControls({
  canGoBack,
  canGoNext,
  isLastQuestion,
  onBack,
  onNext,
}: NavigationControlsProps) {
  return (
    <section className="border-t border-slate-200 bg-[#FAF7F2] px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack}
          className="inline-flex w-full items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="inline-flex w-full items-center justify-center rounded-full bg-[#6BA6E9] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4A90E2] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isLastQuestion ? "Submit Assessment" : "Next"}
        </button>
      </div>
    </section>
  );
}

