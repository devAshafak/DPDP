"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { FinalResult } from "../../../types/assessment";
import Link from "next/link";

const RESULT_KEY = "dpdp-assessment-result";
const DETAILS_KEY = "dpdp-assessment-details";
const USER_ID_KEY = "dpdp-user-id";

export default function AssessmentResultPage() {
  const router = useRouter();
  const [result, setResult] = useState<FinalResult | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const storedResult = window.sessionStorage.getItem(RESULT_KEY);
    const storedDetails = window.sessionStorage.getItem(DETAILS_KEY);

    // Block access to results unless the mandatory details form is completed.
    if (!storedDetails) {
      router.replace("/assessment/details");
      return;
    }

    if (storedResult) {
      try {
        const parsed: FinalResult = JSON.parse(storedResult);
        setResult(parsed);

        const userId = window.sessionStorage.getItem(USER_ID_KEY);
        if (userId) {
          // Fire-and-forget persistence of result
          fetch("/api/assessment/result", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, result: parsed }),
          }).catch((error) =>
            console.error("Failed to persist assessment result", error)
          );
        }
      } catch {
        // ignore parse errors
      }
    }
  }, [router]);

  const handleRetake = () => {
    router.push("/assessment/start");
  };

  const primaryCtaForRisk = (riskLevel: FinalResult["riskLevel"]) => {
    if (riskLevel === "High") {
      return "guide";
    }
    // For Medium & Good risk, emphasize the AWS scanner.
    return "scanner";
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-10 text-gray-900 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <header className="border-b border-slate-200 pb-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            DPDP Readiness Assessment
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-900">
            Assessment Result
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            This score reflects your organization&apos;s{" "}
            <span className="font-medium">readiness posture</span> based on your
            responses.
          </p>
        </header>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
          {result ? (
            <>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-600">
                    Overall readiness score
                  </p>
                  <p className="mt-1 text-3xl font-semibold text-blue-700">
                    {Math.round(
                      (result.totalScore / result.maxScore) * 100
                    )}
                    %
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {result.totalScore} of {result.maxScore} possible points
                  </p>
                  <p className="mt-1 text-xs text-gray-600">
                    Risk band:{" "}
                    {result.riskLevel === "High"
                      ? "🔴 High DPDP Risk"
                      : result.riskLevel === "Medium"
                      ? "🟠 Medium DPDP Risk"
                      : "🟢 Good DPDP Awareness"}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleRetake}
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-slate-50"
                >
                  Start again
                </button>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Section-wise view
                </p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {result.sectionBreakdown.map((section) => {
                    const sectionPercent = Math.round(section.percentage);
                    return (
                      <div
                        key={section.sectionName}
                        className="rounded-xl border border-slate-100 bg-slate-50/60 px-4 py-3 text-sm text-gray-800"
                      >
                        <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
                          {section.sectionName}
                        </p>
                        <p className="mt-1 text-base font-semibold">
                          {sectionPercent}% · {section.maturityLevel} maturity
                        </p>
                        <p className="mt-1 text-xs text-gray-600">
                          {section.obtainedScore} of {section.maxScore} points
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Recommended next steps
                </p>
                {result && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <Link
                      href="/cta/guide"
                      className={`flex flex-col justify-between rounded-xl border px-3 py-3 text-xs transition-colors ${
                        primaryCtaForRisk(result.riskLevel) === "guide"
                          ? "border-[#4A90E2] bg-blue-50/60"
                          : "border-slate-200 bg-white hover:border-blue-200"
                      }`}
                    >
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                          Starter guide
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                          DPDP Starter Guide
                        </p>
                        <p className="mt-1 text-[11px] text-gray-600">
                          Educational PDF for teams beginning their DPDP journey.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/cta/scanner"
                      className={`flex flex-col justify-between rounded-xl border px-3 py-3 text-xs transition-colors ${
                        primaryCtaForRisk(result.riskLevel) === "scanner"
                          ? "border-[#4A90E2] bg-blue-50/60"
                          : "border-slate-200 bg-white hover:border-blue-200"
                      }`}
                    >
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                          AWS scanner
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                          DPDP AWS Scanner
                        </p>
                        <p className="mt-1 text-[11px] text-gray-600">
                          Technical validation for cloud configurations.
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/cta/expert"
                      className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs transition-colors hover:border-blue-200"
                    >
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-blue-700">
                          Expert session
                        </p>
                        <p className="mt-1 font-medium text-gray-900">
                          Talk to a DPDP Expert
                        </p>
                        <p className="mt-1 text-[11px] text-gray-600">
                          Human guidance to interpret results and plan next steps.
                        </p>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-600">
                  Key insights
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-gray-700">
                  {result.insights.map((insight) => (
                    <li key={insight}>{insight}</li>
                  ))}
                </ul>
                <p className="mt-3 text-[11px] text-gray-500">
                  {result.disclaimer}
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                It looks like there is no active assessment result in this
                session.
              </p>
              <button
                type="button"
                onClick={handleRetake}
                className="inline-flex items-center justify-center rounded-full bg-[#6BA6E9] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4A90E2]"
              >
                Start assessment
              </button>
            </div>
          )}
        </section>

        <footer className="mt-6 text-xs text-gray-500">
          Designed to support internal readiness conversations, not to certify
          compliance. Use results as input into deeper legal and security
          reviews where needed.
        </footer>
      </div>
    </main>
  );
}

