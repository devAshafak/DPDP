const sections = [
  "Personal Data Awareness",
  "Access & Security Controls",
  "Data Sharing & Third Parties",
  "User Rights (DSAR)",
  "Incident Preparedness",
  "Governance & Oversight",
];

export default function AssessmentOverviewCard() {
  return (
    <section
      aria-label="Assessment overview"
      className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-blue-50 sm:p-8"
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-blue-700">
            What to expect
          </h2>
          <ul className="space-y-2 text-sm text-gray-800">
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-base" aria-hidden="true">
                📋
              </span>
              <p>
                <span className="font-medium">Total Questions:</span> 15 MCQs
              </p>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-0.5 text-base" aria-hidden="true">
                📊
              </span>
              <p>
                <span className="font-medium">Scoring:</span> Risk-based
                readiness score
              </p>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-700">
            Sections covered
          </h3>
          <div className="mt-3 grid gap-2 text-sm text-gray-800 sm:grid-cols-2">
            {sections.map((section) => (
              <div
                key={section}
                className="flex items-start gap-2 rounded-lg border border-blue-50 bg-slate-50/60 px-3 py-2"
              >
                <span
                  className="mt-0.5 h-1.5 w-1.5 rounded-full bg-blue-500"
                  aria-hidden="true"
                />
                <p>{section}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

