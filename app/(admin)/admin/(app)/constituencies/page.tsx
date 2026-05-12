export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ConstituenciesPage() {
  const constituencies = await prisma.constituency.findMany({
    include: {
      state: { select: { name: true, country: { select: { name: true } } } },
      electionType: { select: { name: true, level: true } },
      _count: { select: { politicians: true } },
    },
    orderBy: [{ state: { name: "asc" } }, { name: "asc" }],
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Constituencies</h1>
        <Link href="/admin/constituencies/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          + Add Constituency
        </Link>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {["Name", "State", "Country", "Election Type", "Level", "Politicians", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {constituencies.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-400">No constituencies yet</td></tr>
            )}
            {constituencies.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50">
                <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                <td className="px-4 py-3 text-slate-500">{c.state.name}</td>
                <td className="px-4 py-3 text-slate-500">{c.state.country.name}</td>
                <td className="px-4 py-3 text-slate-500">{c.electionType.name}</td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                    {c.electionType.level}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500">{c._count.politicians}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/constituencies/${c.id}/edit`} className="text-slate-500 hover:text-slate-900">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
