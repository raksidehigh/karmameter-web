export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function ConstituenciesPage() {
  const constituencies = await prisma.constituency.findMany({
    include: { _count: { select: { politicians: true, projects: true } } },
    orderBy: [{ state: "asc" }, { name: "asc" }],
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/dashboard" className="text-sm text-slate-500 hover:text-slate-900">← Dashboard</Link>
          <span className="text-slate-300">/</span>
          <span className="font-semibold text-slate-900">Constituencies</span>
        </div>
        <Link href="/admin/constituencies/new"
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          + Add Constituency
        </Link>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                {["Name", "State", "Type", "Politicians", "Projects", "Actions"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {constituencies.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No constituencies yet</td></tr>
              )}
              {constituencies.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{c.name}</td>
                  <td className="px-4 py-3 text-slate-500">{c.state}</td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">
                      {c.type === "LOK_SABHA" ? "Lok Sabha" : "Vidhan Sabha"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-500">{c._count.politicians}</td>
                  <td className="px-4 py-3 text-slate-500">{c._count.projects}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/constituencies/${c.id}/edit`} className="text-slate-500 hover:text-slate-900">Edit</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
