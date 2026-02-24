import Link from "next/link";

export function BuiltFor() {
  return (
    <section className="py-24 bg-white border-t border-border-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Built For Transparency
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Empowering those who demand accountability with precision data.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              href="/use-cases"
              className="text-sm font-semibold text-primary hover:text-slate-800"
            >
              Explore use cases →
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-slate-50 p-2 text-slate-700 group-hover:bg-slate-100">
              <span className="material-symbols-outlined">newspaper</span>
            </div>
            <h3 className="text-base font-semibold leading-7 text-slate-900">
              Journalists
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Uncover stories hidden in messy datasets and substantiate claims
              with hard numbers.
            </p>
          </div>
          {/* Card 2 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-slate-50 p-2 text-slate-700 group-hover:bg-slate-100">
              <span className="material-symbols-outlined">science</span>
            </div>
            <h3 className="text-base font-semibold leading-7 text-slate-900">
              Researchers
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Access clean, historical data for longitudinal studies on
              governance efficacy.
            </p>
          </div>
          {/* Card 3 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-slate-50 p-2 text-slate-700 group-hover:bg-slate-100">
              <span className="material-symbols-outlined">gavel</span>
            </div>
            <h3 className="text-base font-semibold leading-7 text-slate-900">
              Policy Analysts
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Benchmark municipal performance against similar jurisdictions to
              identify best practices.
            </p>
          </div>
          {/* Card 4 */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100">
            <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-slate-50 p-2 text-slate-700 group-hover:bg-slate-100">
              <span className="material-symbols-outlined">groups</span>
            </div>
            <h3 className="text-base font-semibold leading-7 text-slate-900">
              Informed Citizens
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Vote with confidence based on verifiable track records, not
              campaign rhetoric.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

