export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createConstituency } from "../../actions";

export default async function NewConstituencyPage() {
  const [states, electionTypes] = await Promise.all([
    prisma.state.findMany({ include: { country: { select: { name: true } } }, orderBy: [{ country: { name: "asc" } }, { name: "asc" }] }),
    prisma.electionType.findMany({ include: { country: { select: { name: true } } }, orderBy: [{ country: { name: "asc" } }, { name: "asc" }] }),
  ]);

  async function action(formData: FormData) {
    "use server";
    await createConstituency(formData);
    redirect("/admin/constituencies");
  }

  return (
    <div className="p-8 max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/constituencies" className="text-sm text-slate-500 hover:text-slate-900">← Constituencies</Link>
        <span className="text-slate-300">/</span>
        <h1 className="font-semibold text-slate-900">New Constituency</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
            <input name="name" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">State *</label>
            <select name="stateId" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="">— Select state —</option>
              {states.map((s) => <option key={s.id} value={s.id}>{s.name} — {s.country.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Election Type *</label>
            <select name="electionTypeId" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="">— Select election type —</option>
              {electionTypes.map((e) => <option key={e.id} value={e.id}>{e.name} ({e.level}) — {e.country.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Population</label>
            <input name="population" type="number" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800">Create</button>
            <Link href="/admin/constituencies" className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
