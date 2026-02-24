export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-24">
      {/* Background Grid */}
      <div className="absolute inset-0 -z-10 h-[800px] w-full bg-grid-pattern opacity-[0.4] grid-bg pointer-events-none" />
      <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mx-auto max-w-4xl text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl md:text-7xl">
          Public Accountability,
          <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
            Quantified.
          </span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-500 sm:text-xl leading-relaxed">
          Karmameter aggregates publicly available data on public officials,
          budgets, and government projects — transforming fragmented records
          into structured, transparent insights.
        </p>
        {/* <div className="mx-auto mt-10 max-w-md sm:flex sm:max-w-xl sm:justify-center sm:gap-4">
          <div className="relative w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <span className="material-symbols-outlined text-[20px]">
                mail
              </span>
            </div>
            <input
              type="email"
              placeholder="Enter your work email"
              className="block w-full rounded-lg border-0 py-3 pl-10 pr-4 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6 h-12 bg-white"
            />
          </div>
          <div className="mt-3 sm:mt-0 sm:w-auto">
            <button className="w-full h-12 rounded-lg bg-primary px-6 text-sm font-semibold text-white shadow-sm hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary whitespace-nowrap">
              Get Early Access
            </button>
          </div>
        </div> */}
        <div className="mt-6 flex justify-center">
          <button className="group flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors">
            View Methodology
            <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-0.5">
              arrow_forward
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}

