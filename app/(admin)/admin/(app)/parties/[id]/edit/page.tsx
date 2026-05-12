export const dynamic = "force-dynamic";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateParty } from "../../../actions";
import { ImageUpload } from "@/app/(admin)/admin/_components/ImageUpload";

export default async function EditPartyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [party, countries] = await Promise.all([
    prisma.party.findUnique({ where: { id }, include: { country: true } }),
    prisma.country.findMany({ orderBy: { name: "asc" } }),
  ]);
  if (!party) notFound();

  async function action(formData: FormData) {
    "use server";
    await updateParty(id, formData);
    redirect("/admin/parties");
  }

  return (
    <div className="p-8 max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/parties" className="text-sm text-slate-500 hover:text-slate-900">← Parties</Link>
        <span className="text-slate-300">/</span>
        <h1 className="font-semibold text-slate-900">Edit {party.name}</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Country *</label>
            <select name="countryId" defaultValue={party.countryId} required className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900">
              {countries.map((c) => <option key={c.id} value={c.id}>{c.name} ({c.code})</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
            <input name="name" required defaultValue={party.name} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Abbreviation *</label>
            <input name="abbreviation" required defaultValue={party.abbreviation} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <ImageUpload name="symbolUrl" bucket="politician-photos" storagePath={`symbols/${party.abbreviation}`} label="Party Symbol" defaultUrl={party.symbolUrl ?? undefined} />
          <div className="flex gap-3 pt-2">
            <button type="submit" className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800">Save</button>
            <Link href="/admin/parties" className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
