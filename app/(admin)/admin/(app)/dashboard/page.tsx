export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [politicians, constituencies, parties, countries, recentLogs] = await Promise.all([
    prisma.politician.count({ where: { isActive: true } }),
    prisma.constituency.count(),
    prisma.party.count(),
    prisma.country.count(),
    prisma.auditLog.findMany({ orderBy: { timestamp: "desc" }, take: 10 }),
  ]);

  const stats = [
    { label: "Politicians", value: politicians, href: "/admin/politicians" },
    { label: "Constituencies", value: constituencies, href: "/admin/constituencies" },
    { label: "Parties", value: parties, href: "/admin/parties" },
    { label: "Countries", value: countries, href: "/admin/countries" },
  ];

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}
            className="rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition">
            <p className="text-3xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500 mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { href: "/admin/politicians/new", label: "Add Politician", sub: "Create a new politician record" },
          { href: "/admin/constituencies/new", label: "Add Constituency", sub: "Create a new constituency" },
          { href: "/admin/parties/new", label: "Add Party", sub: "Create a new political party" },
          { href: "/admin/countries/new", label: "Add Country", sub: "Add a new country" },
        ].map((a) => (
          <Link key={a.href} href={a.href}
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition">
            <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 text-lg font-bold">+</div>
            <div>
              <p className="font-medium text-slate-900">{a.label}</p>
              <p className="text-xs text-slate-500">{a.sub}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-6 py-4">
          <h2 className="font-semibold text-slate-900">Recent Activity</h2>
        </div>
        <div className="divide-y divide-slate-100">
          {recentLogs.length === 0 && (
            <p className="px-6 py-8 text-sm text-slate-400 text-center">No activity yet</p>
          )}
          {recentLogs.map((log) => (
            <div key={log.id} className="px-6 py-3 flex items-center justify-between">
              <div>
                <span className="text-sm font-medium text-slate-900">{log.action}</span>
                <span className="text-sm text-slate-500"> · {log.entityType} </span>
                <span className="text-xs text-slate-400 font-mono">{log.entityId.slice(0, 8)}</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">{log.changedBy}</p>
                <p className="text-xs text-slate-400">{new Date(log.timestamp).toLocaleString("en-IN")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
