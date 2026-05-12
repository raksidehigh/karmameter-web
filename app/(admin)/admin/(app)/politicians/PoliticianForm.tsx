"use client";

import { useRouter } from "next/navigation";
import { useTransition, useState, useRef } from "react";

type Party = { id: string; name: string; abbreviation: string; country: { name: string } };
type Constituency = { id: string; name: string; electionType: { name: string }; state: { name: string } };

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
  const [photoPreview, setPhotoPreview] = useState<string | null>(defaultValues.photoUrl as string ?? null);
  const [uploading, setUploading] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string>(defaultValues.photoUrl as string ?? "");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview immediately
    setPhotoPreview(URL.createObjectURL(file));

    // Upload needs a politicianId — for new politicians we use a temp ID
    // The actual upload happens after create, or we use a placeholder
    // For edit pages, we upload immediately
    const pid = defaultValues.id as string;
    if (!pid) {
      // Store file for upload after creation — handled via hidden input
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("politicianId", pid);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setPhotoUrl(data.url);
    setUploading(false);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (photoUrl) formData.set("photoUrl", photoUrl);
    startTransition(async () => {
      const result = await action(formData);
      if (result.ok) router.push("/admin/politicians");
    });
  }

  const field = (label: string, name: string, type = "text", required = false, placeholder = "") => (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1">{label}{required && " *"}</label>
      <input type={type} name={name} required={required} placeholder={placeholder}
        defaultValue={defaultValues[name] as string ?? ""}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
      />
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Photo upload */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">Photo</label>
        <div className="flex items-center gap-4">
          <div className="size-20 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center">
            {photoPreview
              ? <img src={photoPreview} alt="Preview" className="size-full object-cover" />
              : <span className="text-slate-400 text-xs">No photo</span>
            }
          </div>
          <div>
            <input ref={fileRef} type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            <button type="button" onClick={() => fileRef.current?.click()}
              className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
              {uploading ? "Uploading…" : "Choose Photo"}
            </button>
            <p className="text-xs text-slate-400 mt-1">Max 5MB. JPG, PNG, WebP.</p>
          </div>
        </div>
        <input type="hidden" name="photoUrl" value={photoUrl} />
      </div>

      {field("Full Name", "fullName", "text", true)}
      {field("Position (MP / MLA / Minister / Senator)", "position", "text", true)}

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Party</label>
        <select name="partyId" defaultValue={defaultValues.partyId as string ?? ""}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
          <option value="">— None —</option>
          {parties.map((p) => (
            <option key={p.id} value={p.id}>{p.name} ({p.abbreviation}) — {p.country.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Constituency</label>
        <select name="constituencyId" defaultValue={defaultValues.constituencyId as string ?? ""}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
          <option value="">— None —</option>
          {constituencies.map((c) => (
            <option key={c.id} value={c.id}>{c.name} — {c.electionType.name}, {c.state.name}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {field("Election Year", "electionYear", "number")}
        {field("Criminal Cases", "criminalCases", "number")}
      </div>
      {field("Total Assets (local currency)", "totalAssets", "number")}
      {field("Education", "education")}
      {field("Source URL (affidavit / official)", "sourceUrl", "url")}

      <div className="flex gap-3 pt-2">
        <button type="submit" disabled={pending || uploading}
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
