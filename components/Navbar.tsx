"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

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
          <button className="hidden sm:block rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2">
            Request Access
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="sm:hidden p-2 text-slate-600"
            aria-label="Toggle menu"
          >
            <span className="material-symbols-outlined">
              {isOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden border-t border-border-light bg-surface-light">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/methodology"
              className="block text-sm font-medium text-slate-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              Methodology
            </Link>
            <Link
              href="/use-cases"
              className="block text-sm font-medium text-slate-600 py-2"
              onClick={() => setIsOpen(false)}
            >
              Use Cases
            </Link>
            <button className="w-full rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white">
              Request Access
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

