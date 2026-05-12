import { redirect } from "next/navigation";
import Link from "next/link";
import { createCountry } from "../../actions";
import { ImageUpload } from "@/app/(admin)/admin/_components/ImageUpload";

export default function NewCountryPage() {
  async function action(formData: FormData) {
    "use server";
    await createCountry(formData);
    redirect("/admin/countries");
  }

  return (
    <div className="p-8 max-w-lg">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/countries" className="text-sm text-slate-500 hover:text-slate-900">← Countries</Link>
        <span className="text-slate-300">/</span>
        <h1 className="font-semibold text-slate-900">New Country</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
        <form action={action} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name *</label>
            <input name="name" required placeholder="India" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ISO Code * (2 letters)</label>
            <input name="code" required maxLength={2} placeholder="IN" className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm uppercase focus:outline-none focus:ring-2 focus:ring-slate-900" />
          </div>
          <ImageUpload name="flagUrl" bucket="politician-photos" storagePath="flags/new" label="Flag" shape="flag" />
          <div className="flex gap-3 pt-2">
            <button type="submit" className="rounded-lg bg-slate-900 px-6 py-2 text-sm font-semibold text-white hover:bg-slate-800">Create</button>
            <Link href="/admin/countries" className="rounded-lg border border-slate-300 px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Cancel</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
