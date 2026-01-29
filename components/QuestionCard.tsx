import type { Question, OptionLabel } from "../data/dpdpQuestions";
import OptionCard from "./OptionCard";

type QuestionCardProps = {
  question: Question;
  selectedOption: OptionLabel | null;
  onSelectOption: (label: OptionLabel) => void;
  sectionTransitionMessage?: string | null;
};

export default function QuestionCard({
  question,
  selectedOption,
  onSelectOption,
  sectionTransitionMessage,
}: QuestionCardProps) {
  return (
    <section className="mt-6 flex justify-center px-4 pb-10 sm:px-6">
      <div className="w-full max-w-3xl">
        {sectionTransitionMessage && (
          <div className="mb-4 rounded-lg border border-blue-100 bg-blue-50/60 px-4 py-2 text-xs font-medium text-blue-800">
            {sectionTransitionMessage}
          </div>
        )}

        <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            {question.sectionTitle}
          </p>
          <h2 className="mt-3 text-base font-semibold text-gray-900 sm:text-lg">
            {question.questionText}
          </h2>
          <p className="mt-2 text-xs italic text-gray-500 sm:text-sm">
            {question.signal}
          </p>

          <div
            role="radiogroup"
            aria-label="Answer options"
            className="mt-5 space-y-3"
          >
            {question.options.map((option) => (
              <OptionCard
                key={option.label}
                label={option.label}
                text={option.text}
                selected={selectedOption === option.label}
                onSelect={() => onSelectOption(option.label)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

