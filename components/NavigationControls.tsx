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
    <section className="border-t border-white/10 px-4 py-4 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={!canGoBack}
          className="inline-flex w-full items-center justify-center rounded-[10px] border border-slate-300 bg-slate-100 px-4 py-2 text-sm font-bold uppercase text-gray-800 shadow-sm transition-colors hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          Back
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={!canGoNext}
          className="btn-primary inline-flex w-full items-center justify-center px-5 py-2.5 text-sm text-white transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {isLastQuestion ? "Submit Assessment" : "Next"}
        </button>
      </div>
    </section>
  );
}

