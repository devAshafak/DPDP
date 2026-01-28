"use client";

import Link from "next/link";
import CTAHeader from "../../../components/CTAHeader";
import TrustBox from "../../../components/TrustBox";

export default function DpdpStarterGuidePage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-10 text-gray-900 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <CTAHeader
          title="Free DPDP Starter Guide"
          subtitle="Understand what India’s DPDP Act expects from your organization."
        />

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <h2 className="text-sm font-semibold text-gray-900">
            What this guide covers
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-800">
            <li>Plain-language overview of DPDP basics and key concepts.</li>
            <li>Core obligations for organizations handling personal data.</li>
            <li>Common implementation mistakes to watch out for.</li>
            <li>Practical next steps to begin improving readiness.</li>
          </ul>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-gray-900">
              Who this is for
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-800">
              <li>Early-stage startups beginning to handle personal data.</li>
              <li>SMEs building internal DPDP awareness.</li>
              <li>
                Non-legal teams (product, ops, tech) who need clear orientation.
              </li>
            </ul>
          </div>

          <TrustBox>
            <p>
              No personal data is collected. This guide is informational and
              does not constitute legal advice.
            </p>
          </TrustBox>

          <div className="mt-6 space-y-3">
            <a
              href="/dpdp-starter-guide.pdf"
              download
              className="inline-flex w-full items-center justify-center rounded-full bg-[#6BA6E9] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4A90E2] sm:w-auto"
            >
              Download Free Guide
            </a>
            <p className="text-xs text-gray-500">
              You can also choose to share an email address later if you’d like
              follow-up materials. This is entirely optional.
            </p>

            <p className="pt-2 text-xs text-gray-600">
              Prefer guidance?{" "}
              <Link
                href="/cta/expert"
                className="font-medium text-[#4A90E2] underline-offset-2 hover:underline"
              >
                Talk to a DPDP Expert
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

