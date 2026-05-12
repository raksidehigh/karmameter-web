export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

const LEVEL_LABEL: Record<string, string> = {
  NATIONAL: "National",
  STATE: "State",
  LOCAL: "Local",
};

export default async function ElectionTypesPage() {
  const types = await prisma.electionType.findMany({
    include: {
      country: { select: { name: true, code: true } },
      _count: { select: { constituencies: true } },
    },
    orderBy: [{ country: { name: "asc" } }, { name: "asc" }],
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Election Types</h1>
        <Link href="/admin/election-types/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          + Add Election Type
        </Link>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {["Name", "Level", "Country", "Constituencies", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {types.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No election types yet</td></tr>
            )}
            {types.map((t) => (
              <tr key={t.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{t.name}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                    {LEVEL_LABEL[t.level]}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{t.country.name}</td>
                <td className="px-4 py-3 text-slate-500">{t._count.constituencies}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/election-types/${t.id}/edit`} className="text-slate-500 hover:text-slate-900">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
