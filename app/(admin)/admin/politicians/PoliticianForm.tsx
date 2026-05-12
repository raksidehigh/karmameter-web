"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

type Party = { id: string; name: string; abbreviation: string };
type Constituency = { id: string; name: string; state: string };

type Props = {
  action: (formData: FormData) => Promise<{ ok: boolean; id?: string }>;
  parties: Party[];
  constituencies: Constituency[];
  defaultValues?: Record<string, string | number | null | undefined>;
  submitLabel?: string;
};

export function PoliticianForm({ action, parties, constituencies, defaultValues = {}, submitLabel = "Save" }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await action(formData);
      if (result.ok) router.push("/admin/politicians");
    });
  }

  const field = (label: string, name: string, type = "text", required = false) => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}{required && " *"}</label>
      <input type={type} name={name} required={required}
        defaultValue={defaultValues[name] as string ?? ""}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {field("Full Name", "fullName", "text", true)}
      {field("Position (MP / MLA / Minister)", "position", "text", true)}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Party</label>
        <select name="partyId" defaultValue={defaultValues.partyId as string ?? ""}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
          <option value="">— None —</option>
          {parties.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.abbreviation})</option>)}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Constituency</label>
        <select name="constituencyId" defaultValue={defaultValues.constituencyId as string ?? ""}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
          <option value="">— None —</option>
          {constituencies.map((c) => <option key={c.id} value={c.id}>{c.name}, {c.state}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {field("Election Year", "electionYear", "number")}
        {field("Criminal Cases", "criminalCases", "number")}
      </div>
      {field("Total Assets (₹)", "totalAssets", "number")}
      {field("Education", "education")}
      {field("Photo URL", "photoUrl", "url")}
      {field("Source URL (affidavit)", "sourceUrl", "url")}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending}
          className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50">
          {pending ? "Saving…" : submitLabel}
        </button>
        <button type="button" onClick={() => router.back()}
          className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          Cancel
        </button>
      </div>
    </form>
  );
}
