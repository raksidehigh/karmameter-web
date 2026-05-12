export const dynamic = "force-dynamic";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { updateCountry } from "../../../actions";
import { ImageUpload } from "@/app/(admin)/admin/_components/ImageUpload";

export default async function EditCountryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const country = await prisma.country.findUnique({ where: { id } });
  if (!country) notFound();

  async function action(formData: FormData) {
    "use server";
    await updateCountry(id, formData);
    redirect("/admin/countries");
  }

  return (
    <div className="p-8 max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/countries" className="text-sm text-slate-500 hover:text-slate-900">← Countries</Link>
        <span className="text-slate-300">/</span>
        <h1 className="font-semibold text-slate-900">Edit {country.name}</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
            <input name="name" required defaultValue={country.name} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ISO Code * (2 letters)</label>
            <input name="code" required maxLength={2} defaultValue={country.code} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <ImageUpload name="flagUrl" bucket="politician-photos" storagePath={`flags/${country.code}`} label="Flag" shape="flag" defaultUrl={country.flagUrl ?? undefined} />
          <div className="flex gap-3 pt-2">
            <button type="submit" className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800">Save</button>
            <Link href="/admin/countries" className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
