"use client";

import CTAHeader from "../../../components/CTAHeader";
import TrustBox from "../../../components/TrustBox";

export default function DpdpAwsScannerPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-10 text-gray-900 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <CTAHeader
          title="DPDP AWS Scanner"
          subtitle="Validate your DPDP readiness with automated cloud checks."
        />

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <h2 className="text-sm font-semibold text-gray-900">
            What the scanner checks
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-800">
            <li>Detects open or publicly exposed storage (S3, buckets).</li>
            <li>Identifies high-risk access and permission misconfigurations.</li>
            <li>Flags potential data exposure paths relevant to DPDP.</li>
            <li>Generates technical evidence you can share with security teams.</li>
          </ul>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-gray-900">
              How it works
            </h3>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-gray-800">
              <li>Connect a read-only AWS role limited to relevant services.</li>
              <li>Run automated checks mapped to DPDP readiness signals.</li>
              <li>Download a findings report for internal review and follow-up.</li>
            </ol>
          </div>

          <TrustBox>
            <p>
              No credentials are stored. Access is read-only, and no customer
              data is copied or retained by the scanner.
            </p>
          </TrustBox>

          <div className="mt-6 space-y-3">
            <button
              type="button"
              className="inline-flex w-full items-center justify-center rounded-full bg-[#6BA6E9] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4A90E2] sm:w-auto"
            >
              Run DPDP AWS Scanner
            </button>
            <p className="text-xs text-gray-500">
              This will lead into a guided connection flow. You remain in
              control of permissions at all times.
            </p>

            <p className="pt-2 text-xs text-gray-600">
              Not on AWS?{" "}
              <a
                href="/cta/expert"
                className="font-medium text-[#4A90E2] underline-offset-2 hover:underline"
              >
                Talk to an expert
              </a>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

