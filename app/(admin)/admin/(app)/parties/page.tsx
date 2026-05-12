export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export default async function PartiesPage() {
  const parties = await prisma.party.findMany({
    include: {
      country: { select: { name: true, code: true } },
      _count: { select: { politicians: true } },
    },
    orderBy: [{ country: { name: "asc" } }, { name: "asc" }],
  });

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Parties</h1>
        <Link href="/admin/parties/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
          + Add Party
        </Link>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {["", "Name", "Abbreviation", "Country", "Politicians", "Actions"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {parties.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No parties yet</td></tr>
            )}
            {parties.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  {p.symbolUrl
                    ? <Image src={p.symbolUrl} alt={p.name} width={32} height={32} className="size-8 rounded object-contain" />
                    : <div className="size-8 rounded bg-slate-200" />}
                </td>
                <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                <td className="px-4 py-3"><span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium">{p.abbreviation}</span></td>
                <td className="px-4 py-3 text-slate-500">{p.country.name}</td>
                <td className="px-4 py-3 text-slate-500">{p._count.politicians}</td>
                <td className="px-4 py-3">
                  <Link href={`/admin/parties/${p.id}/edit`} className="text-slate-500 hover:text-slate-900">Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
