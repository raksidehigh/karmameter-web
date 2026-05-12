export const dynamic = "force-dynamic";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createElectionType } from "../../actions";

export default async function NewElectionTypePage() {
  const countries = await prisma.country.findMany({ orderBy: { name: "asc" } });

  async function action(formData: FormData) {
    "use server";
    await createElectionType(formData);
    redirect("/admin/election-types");
  }

  return (
    <div className="p-8 max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/election-types" className="text-sm text-slate-500 hover:text-slate-900">← Election Types</Link>
        <span className="text-slate-300">/</span>
        <h1 className="font-semibold text-slate-900">New Election Type</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
            <select name="countryId" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="">— Select country —</option>
              {countries.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
            <input name="name" required placeholder="Lok Sabha" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Level *</label>
            <select name="level" required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
              <option value="NATIONAL">National</option>
              <option value="STATE">State</option>
              <option value="LOCAL">Local / Municipal</option>
            </select>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800">Create</button>
            <Link href="/admin/election-types" className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
