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
    <main className="start-page-bg min-h-screen px-4 py-6 text-white sm:px-6 sm:py-10 md:py-12">
      <div className="relative mx-auto flex max-w-4xl flex-col justify-center">
        <header className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:pt-0">
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <img
              src="/entersoftLogo.png"
              alt="Entersoft"
              className="h-8 w-auto sm:h-9 md:h-10"
              width={120}
              height={40}
            />
          </div>
          <div className="flex-1 text-center sm:text-right">
            <h1 className="font-bebas-neue text-2xl uppercase tracking-tight text-white sm:text-3xl md:text-4xl">
              DPDP Readiness Assessment
            </h1>
            <p className="mt-1.5 text-xs leading-snug text-white/90 sm:mt-2 sm:text-sm md:text-base">
              Evaluate how prepared your organization is under India&apos;s DPDP
              Act in under 5 minutes.
            </p>
          </div>
        </header>

        <TrustBanner />

        <AssessmentOverviewCard />

        <section
          aria-label="Scoring explanation"
          className="mt-5 max-w-2xl text-xs leading-relaxed text-white/80 mx-auto text-center sm:mt-8 sm:text-sm"
        >
          <p>
            Each answer contributes to a readiness score based on DPDP best
            practices. Your final score reflects awareness level, not verified
            compliance.
          </p>
        </section>

        <section className="mt-8 flex flex-col items-center text-center sm:mt-10">
          <button
            type="button"
            onClick={handleStart}
            disabled={isStarting}
            className="btn-primary inline-flex w-full max-w-xs items-center justify-center px-5 py-2.5 text-sm text-white transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020024] sm:px-6 sm:py-3 sm:w-auto"
            aria-label="Start DPDP readiness assessment"
          >
            {isStarting ? "Starting..." : "Start Assessment"}
          </button>
          <p className="mt-2 text-xs text-white/70 sm:mt-3">
            You can exit anytime. No signup required.
          </p>
        </section>

        <footer className="mt-6 border-t border-white/20 pt-4 text-xs text-white/70 text-center sm:mt-10">
          <p>
            Designed for startups, SMEs, and growing organizations operating in
            India.
          </p>
        </footer>
      </div>
    </main>
  );
}

