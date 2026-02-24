export function HowItWorks() {
  return (
    <section className="py-24 bg-white border-y border-border-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 md:text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            From chaos to clarity
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            We replace manual record retrieval with automated intelligence
            through a rigorous three-step process.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {/* Step 1 */}
          <div className="group relative flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-900 transition-colors group-hover:border-slate-300 group-hover:bg-slate-100">
              <span className="material-symbols-outlined">database</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                1. Aggregate Records
              </h3>
              <p className="mt-2 text-base text-slate-500 leading-relaxed">
                We scrape and compile fragmented records from thousands of
                municipal sources, meeting minutes, and PDF disclosures.
              </p>
            </div>
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-6 left-16 w-[calc(100%-4rem)] h-[1px] bg-slate-100" />
          </div>
          {/* Step 2 */}
          <div className="group relative flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-900 transition-colors group-hover:border-slate-300 group-hover:bg-slate-100">
              <span className="material-symbols-outlined">verified_user</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                2. Structure &amp; Verify
              </h3>
              <p className="mt-2 text-base text-slate-500 leading-relaxed">
                Our algorithms and analysts cross-reference data points to
                ensure accuracy, standardize formats, and remove anomalies.
              </p>
            </div>
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-6 left-16 w-[calc(100%-4rem)] h-[1px] bg-slate-100" />
          </div>
          {/* Step 3 */}
          <div className="group relative flex flex-col gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200 text-slate-900 transition-colors group-hover:border-slate-300 group-hover:bg-slate-100">
              <span className="material-symbols-outlined">analytics</span>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                3. Generate Scoring
              </h3>
              <p className="mt-2 text-base text-slate-500 leading-relaxed">
                Raw data is synthesized into objective accountability metrics,
                transparent leaderboards, and easy-to-read trust scores.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

