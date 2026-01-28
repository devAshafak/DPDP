"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import ProgressBar from "../../../components/ProgressBar";
import QuestionCard from "../../../components/QuestionCard";
import NavigationControls from "../../../components/NavigationControls";
import { dpdpQuestions, type OptionLabel } from "../../../data/dpdpQuestions";
import {
  computeFinalResult,
  type RawAnswerMap,
} from "../../../lib/dpdpScoring";

const ANSWERS_KEY = "dpdp-assessment-answers";
const INDEX_KEY = "dpdp-assessment-current-index";
const RESULT_KEY = "dpdp-assessment-result";
const DETAILS_KEY = "dpdp-assessment-details";

export default function AssessmentQuestionsPage() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<RawAnswerMap>({});
  const [sectionTransitionMessage, setSectionTransitionMessage] = useState<
    string | null
  >(null);

  const totalQuestions = dpdpQuestions.length;
  const currentQuestion = dpdpQuestions[currentIndex];
  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);

  // Initial load from sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;

    const storedAnswersRaw = window.sessionStorage.getItem(ANSWERS_KEY);
    const storedIndexRaw = window.sessionStorage.getItem(INDEX_KEY);

    if (storedAnswersRaw) {
      try {
        const parsed: RawAnswerMap = JSON.parse(storedAnswersRaw);
        setAnswers(parsed);
      } catch {
        // ignore parse errors and start clean
      }
    }

    if (storedIndexRaw) {
      const parsedIndex = Number(storedIndexRaw);
      if (!Number.isNaN(parsedIndex) && parsedIndex >= 0 && parsedIndex < totalQuestions) {
        setCurrentIndex(parsedIndex);
      }
    }
  }, [totalQuestions]);

  // Persist state to sessionStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(ANSWERS_KEY, JSON.stringify(answers));
    window.sessionStorage.setItem(INDEX_KEY, String(currentIndex));
  }, [answers, currentIndex]);

  // Scroll to top on question change and handle section transition message
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    if (currentIndex === 0) {
      setSectionTransitionMessage(
        `Now entering: ${currentQuestion.sectionTitle}`
      );
      return;
    }

    const previousQuestion = dpdpQuestions[currentIndex - 1];
    if (previousQuestion.sectionId !== currentQuestion.sectionId) {
      setSectionTransitionMessage(
        `Now entering: ${currentQuestion.sectionTitle}`
      );
    } else {
      setSectionTransitionMessage(null);
    }
  }, [currentIndex, currentQuestion.sectionTitle, currentQuestion.sectionId]);

  const handleSelectOption = (label: OptionLabel) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: label,
    }));
  };

  const canGoBack = currentIndex > 0;
  const selectedForCurrent = answers[currentQuestion?.id] ?? null;
  const canGoNext = Boolean(selectedForCurrent);
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const handleNext = () => {
    if (!canGoNext) return;

    if (isLastQuestion) {
      try {
        const result = computeFinalResult(answers);
        if (typeof window !== "undefined") {
          window.sessionStorage.setItem(RESULT_KEY, JSON.stringify(result));
          // Clear any previous details so the form is shown fresh for this run.
          window.sessionStorage.removeItem(DETAILS_KEY);
        }
        router.push("/assessment/details");
      } catch {
        // If scoring fails (e.g., incomplete or invalid answers), stay on page.
        // In future, surface a user-facing message here.
      }
      return;
    }

    setCurrentIndex((prev) => Math.min(prev + 1, totalQuestions - 1));
  };

  const handleBack = () => {
    if (!canGoBack) return;
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const stepLabel = `${currentQuestion.sectionTitle.replace(
    "Section ",
    "Section "
  )} · Question ${currentIndex + 1} of ${totalQuestions}`;

  return (
    <main className="min-h-screen bg-[#FAF7F2] text-gray-900">
      {/* Sticky header */}
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3 sm:px-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
              DPDP Readiness Assessment
            </p>
          </div>
          <p className="text-[11px] font-medium text-gray-600 sm:text-xs">
            {stepLabel}
          </p>
        </div>
        <ProgressBar
          answeredCount={answeredCount}
          totalQuestions={totalQuestions}
        />
      </header>

      {/* Question area */}
      <QuestionCard
        question={currentQuestion}
        selectedOption={selectedForCurrent}
        onSelectOption={handleSelectOption}
        sectionTransitionMessage={sectionTransitionMessage}
      />

      {/* Navigation controls */}
      <NavigationControls
        canGoBack={canGoBack}
        canGoNext={canGoNext}
        isLastQuestion={isLastQuestion}
        onBack={handleBack}
        onNext={handleNext}
      />
    </main>
  );
}

