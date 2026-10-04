"use client";

import { useState } from "react";
import { RecordResult } from "@/lib/mockRecords";

export function SearchForm() {
  const [query, setQuery] = useState("");
  const [portal, setPortal] = useState("");
  const [results, setResults] = useState<RecordResult[] | null>(null);

    async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    if (portal) params.set("portal", portal);

    const res = await fetch(`/api/v1/records/search?${params.toString()}`);
    const json = await res.json();
    setResults(json.data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search records..."
          className="flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        />
        <select
          value={portal}
          onChange={(e) => setPortal(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm"
        >
          <option value="">All portals</option>
          <option value="portal-1">Portal 1</option>
          <option value="portal-2">Portal 2</option>
        </select>
        <button
          type="submit"
          className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white"
        >
          Search
        </button>
      </form>

      {results !== null && results.length === 0 && (
        <p className="mt-8 rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-500">
          No records found. Try a different keyword or portal.
        </p>
      )}

      <ul className="mt-8 space-y-4">
        {results?.map((r) => (
          <li key={r.id} className="rounded-lg border border-slate-200 bg-white p-4">
            <h2 className="font-semibold text-slate-900">{r.title}</h2>
            <p className="mt-1 text-sm text-slate-600">{r.summary}</p>
            <p className="mt-2 text-xs text-slate-400">
              Published {new Date(r.publishedAt).toLocaleDateString("en-IN")}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}