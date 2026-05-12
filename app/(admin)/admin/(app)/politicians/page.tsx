export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { deletePolitician } from "../actions";

export default async function PoliticiansPage() {
  const politicians = await prisma.politician.findMany({
    where: { isActive: true },
    include: {
      party: { select: { abbreviation: true } },
      constituency: { select: { name: true, state: { select: { name: true } } } },
      scores: { orderBy: { lastComputedAt: "desc" }, take: 1 },
    },
    orderBy: { fullName: "asc" },
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Politicians</h1>
        <Link href="/admin/politicians/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          + Add Politician
        </Link>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {["", "Name", "Party", "Constituency", "Position", "Score", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {politicians.length === 0 && (
              <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-400">No politicians yet</td></tr>
            )}
            {politicians.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  {p.photoUrl
                    ? <Image src={p.photoUrl} alt={p.fullName} width={32} height={32} className="size-8 rounded-full object-cover" />
                    : <div className="size-8 rounded-full bg-slate-200 flex items-center justify-center text-xs text-slate-500">{p.fullName[0]}</div>}
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{p.fullName}</td>
                <td className="px-4 py-3 text-slate-500">{p.party?.abbreviation ?? "—"}</td>
                <td className="px-4 py-3 text-slate-500">
                  {p.constituency ? `${p.constituency.name}, ${p.constituency.state.name}` : "—"}
                </td>
                <td className="px-4 py-3 text-slate-500">{p.position}</td>
                <td className="px-4 py-3">
                  {p.scores[0]
                    ? <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">{p.scores[0].overallScore.toFixed(1)}</span>
                    : <span className="text-slate-400">—</span>}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Link href={`/admin/politicians/${p.id}/edit`} className="text-slate-500 hover:text-slate-900">Edit</Link>
                    <form action={async () => { "use server"; await deletePolitician(p.id); }}>
                      <button type="submit" className="text-red-500 hover:text-red-700">Archive</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
