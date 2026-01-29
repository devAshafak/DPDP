"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TrustBanner from "../../../components/TrustBanner";
import AssessmentOverviewCard from "../../../components/AssessmentOverviewCard";

export default function DpdpAssessmentStartPage() {
  const router = useRouter();
  const [isStarting, setIsStarting] = useState(false);

  const handleStart = () => {
    if (isStarting) return;
    setIsStarting(true);
    router.push("/assessment/questions");
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-10 text-gray-900 sm:py-12">
      <div className="mx-auto flex max-w-4xl flex-col justify-center">
        <header className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-blue-700 sm:text-3xl">
            DPDP Readiness Assessment
          </h1>
          <p className="mt-3 text-sm text-gray-600 sm:text-base">
            Evaluate how prepared your organization is under India&apos;s DPDP
            Act in under 5 minutes.
          </p>
        </header>

        <TrustBanner />

        <AssessmentOverviewCard />

        <section
          aria-label="Scoring explanation"
          className="mt-8 max-w-2xl text-sm text-gray-600 mx-auto text-center"
        >
          <p>
            Each answer contributes to a readiness score based on DPDP best
            practices. Your final score reflects awareness level, not verified
            compliance.
          </p>
        </section>

        <section className="mt-10 flex flex-col items-center text-center">
          <button
            type="button"
            onClick={handleStart}
            disabled={isStarting}
            className="inline-flex w-full max-w-xs items-center justify-center rounded-full bg-[#6BA6E9] px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-[#4A90E2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#FAF7F2] sm:w-auto"
            aria-label="Start DPDP readiness assessment"
          >
            {isStarting ? "Starting..." : "Start Assessment"}
          </button>
          <p className="mt-3 text-xs text-gray-500">
            You can exit anytime. No signup required.
          </p>
        </section>

        <footer className="mt-10 border-t border-blue-100 pt-4 text-xs text-gray-500 text-center">
          <p>
            Designed for startups, SMEs, and growing organizations operating in
            India.
          </p>
        </footer>
      </div>
    </main>
  );
}

