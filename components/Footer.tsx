export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-slate-900 text-[20px]">
              policy
            </span>
            <span className="text-sm font-bold text-slate-900">Karmameter</span>
          </div>
          <div className="flex gap-8">
            <a
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
              href="/privacy"
            >
              Privacy Policy
            </a>
            <a
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
              href="/terms"
            >
              Terms of Service
            </a>
            <a
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
              href="/data-sources"
            >
              Data Sources
            </a>
            <a
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
              href="/contact"
            >
              Contact
            </a>
          </div>
          <p className="text-sm text-slate-400">© {year} Karmameter Inc.</p>
        </div>
      </div>
    </footer>
  );
}

