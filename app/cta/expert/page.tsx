"use client";

import { FormEvent, useState } from "react";
import CTAHeader from "../../../components/CTAHeader";
import TrustBox from "../../../components/TrustBox";

export default function DpdpExpertPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a future iteration, this can post to a backend or scheduling tool.
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 py-10 text-gray-900 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <CTAHeader
          title="Talk to a DPDP Expert"
          subtitle="Get clarity on your DPDP obligations and practical next steps."
        />

        <section className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:p-7">
          <h2 className="text-sm font-semibold text-gray-900">
            What you’ll get from the conversation
          </h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-800">
            <li>Plain-language explanation of your assessment results.</li>
            <li>Guidance on DSAR readiness and handling data principal requests.</li>
            <li>Discussion of vendor, incident, and breach preparedness.</li>
            <li>A practical, staged roadmap for improving DPDP readiness.</li>
          </ul>

          <div className="mt-5">
            <h3 className="text-sm font-semibold text-gray-900">
              Best suited for
            </h3>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-800">
              <li>Founders and leadership teams.</li>
              <li>Compliance and risk owners.</li>
              <li>CTOs and engineering leaders.</li>
              <li>Security and privacy teams.</li>
            </ul>
          </div>

          <TrustBox>
            <p>
              No sales pressure. The session is designed as an informational
              discussion to help you understand options and next steps.
            </p>
          </TrustBox>

          <div className="mt-6">
            {submitted ? (
              <div className="rounded-lg border border-green-100 bg-green-50 px-4 py-3 text-sm text-gray-800">
                Thank you. Your request has been noted. A DPDP specialist can
                follow up using the details you shared once a backend
                integration is connected.
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 text-sm text-gray-800"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Name <span className="font-normal text-gray-400">(optional)</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium text-gray-700"
                    >
                      Work email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="orgType"
                    className="block text-xs font-medium text-gray-700"
                  >
                    Organization type
                  </label>
                  <select
                    id="orgType"
                    name="orgType"
                    className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                  >
                    <option value="">Select an option</option>
                    <option value="startup">Startup</option>
                    <option value="sme">SME</option>
                    <option value="enterprise">Enterprise</option>
                    <option value="nonprofit">Non-profit / public sector</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#6BA6E9] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#4A90E2] sm:w-auto"
                >
                  Book Free Consultation
                </button>
                <p className="mt-2 text-xs text-gray-500">
                  You can share only the minimum contact details you are
                  comfortable with. No account creation is required.
                </p>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

