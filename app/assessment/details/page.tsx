"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import TrustNotice from "../../../components/TrustNotice";
import AssessmentDetailsForm, {
  type AssessmentDetailsPayload,
} from "../../../components/AssessmentDetailsForm";
import { generateUUID } from "../../../lib/uuid";

const RESULT_KEY = "dpdp-assessment-result";
const DETAILS_KEY = "dpdp-assessment-details";
const USER_ID_KEY = "dpdp-user-id";

export default function AssessmentDetailsPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const result = window.sessionStorage.getItem(RESULT_KEY);
    const details = window.sessionStorage.getItem(DETAILS_KEY);

    // If there is no computed result, send user back to start of flow.
    if (!result) {
      router.replace("/assessment/start");
      return;
    }

    // If details are already present, go straight to result.
    if (details) {
      router.replace("/assessment/result");
    }
  }, [router]);

  const handleComplete = async (payload: AssessmentDetailsPayload) => {
    let userId: string | null = null;

    if (typeof window !== "undefined") {
      userId = window.sessionStorage.getItem(USER_ID_KEY);
      if (!userId) {
        userId = generateUUID();
        window.sessionStorage.setItem(USER_ID_KEY, userId);
      }

      const record = {
        name: payload.name.trim(),
        email: payload.email.trim(),
        organizationName: payload.organizationName?.trim(),
        organizationType: payload.organizationType,
        completedAt: Date.now(),
      };
      window.sessionStorage.setItem(DETAILS_KEY, JSON.stringify(record));
    }

    if (userId) {
      try {
        await fetch("/api/assessment/details", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            fullName: payload.name.trim(),
            workEmail: payload.email.trim(),
            organizationName: payload.organizationName?.trim(),
            organizationType: payload.organizationType,
          }),
        });
      } catch (error) {
        console.error("Failed to persist assessment details", error);
        // Do not block navigation if persistence fails
      }
    }

    router.push("/assessment/result");
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-10 text-gray-900 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-blue-700">
            DPDP Readiness Assessment
          </p>
          <h1 className="mt-2 text-2xl font-semibold text-gray-900">
            Almost Done
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please share a few details to view your DPDP readiness result.
          </p>
        </div>

        <TrustNotice>
          <p className="text-xs text-gray-700">
            This information helps us contextualize your assessment and share
            relevant guidance. We do not sell or misuse your data.
          </p>
        </TrustNotice>

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <h2 className="text-sm font-semibold text-gray-900">
            Your details
          </h2>
          <p className="mt-1 text-xs text-gray-600">
            Required fields are marked. You can provide high-level information and
            avoid sensitive data.
          </p>

          <AssessmentDetailsForm onComplete={handleComplete} />
        </section>
      </div>
    </main>
  );
}

