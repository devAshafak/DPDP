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
      className="mt-5 rounded-2xl bg-white p-4 shadow-[0_8px_30px_rgba(0,0,0,0.2)] sm:mt-8 sm:p-6 sm:shadow-[0_20px_50px_rgba(0,0,0,0.25)] md:p-8"
    >
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="space-y-3 md:space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wide text-slate-800 sm:text-sm">
            What to expect
          </h2>
          <ul className="space-y-1.5 text-xs text-gray-800 sm:space-y-2 sm:text-sm">
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
          <h3 className="text-xs font-bold uppercase tracking-wide text-slate-800 sm:text-sm">
            Sections covered
          </h3>
          <div className="mt-2 grid gap-1.5 text-xs text-gray-800 sm:mt-3 sm:grid-cols-2 sm:gap-2 sm:text-sm">
            {sections.map((section) => (
              <div
                key={section}
                className="flex items-start gap-2 rounded-lg border border-slate-100 bg-slate-50 px-2.5 py-1.5 sm:px-3 sm:py-2"
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

