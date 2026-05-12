export const dynamic = "force-dynamic";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateConstituency } from "../../../actions";

export default async function EditConstituencyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const constituency = await prisma.constituency.findUnique({ where: { id } });
  if (!constituency) notFound();

  async function action(formData: FormData) {
    "use server";
    await updateConstituency(id, formData);
    redirect("/admin/constituencies");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center gap-3">
        <Link href="/admin/constituencies" className="text-sm text-slate-500 hover:text-slate-900">← Constituencies</Link>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-900">Edit: {constituency.name}</span>
      </header>
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <form action={action} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
              <input name="name" required defaultValue={constituency.name}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">State *</label>
              <input name="state" required defaultValue={constituency.state}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Type *</label>
              <select name="type" required defaultValue={constituency.type}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
                <option value="VIDHAN_SABHA">Vidhan Sabha (State)</option>
                <option value="LOK_SABHA">Lok Sabha (Central)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Population</label>
              <input name="population" type="number" defaultValue={constituency.population?.toString() ?? ""}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
            </div>
            <div className="flex gap-3 pt-2">
              <button type="submit" className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                Update Constituency
              </button>
              <Link href="/admin/constituencies" className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
