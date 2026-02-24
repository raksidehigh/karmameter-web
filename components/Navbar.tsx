import Link from "next/link";

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border-light bg-surface-light/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex size-8 items-center justify-center rounded bg-primary text-white">
            <span className="material-symbols-outlined text-[20px]">
              policy
            </span>
          </div>
          <span className="text-lg font-bold tracking-tight text-slate-900">
            Karmameter
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="/methodology"
            className="hidden text-sm font-medium text-slate-600 transition hover:text-primary sm:block"
          >
            Methodology
          </Link>
          <Link
            href="/use-cases"
            className="hidden text-sm font-medium text-slate-600 transition hover:text-primary sm:block"
          >
            Use Cases
          </Link>
          <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            Request Access
          </button>
        </div>
      </div>
    </nav>
  );
}

