export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export default async function AdminDashboard() {
  const session = await getSession();

  const [politicians, constituencies, parties, recentLogs] = await Promise.all([
    prisma.politician.count({ where: { isActive: true } }),
    prisma.constituency.count(),
    prisma.party.count(),
    prisma.auditLog.findMany({ orderBy: { timestamp: "desc" }, take: 10 }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex size-8 items-center justify-center rounded bg-slate-900 text-white text-sm font-bold">K</div>
          <span className="font-semibold text-slate-900">Karmameter Admin</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500">{session?.email}</span>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="text-sm text-slate-500 hover:text-slate-900">Sign out</button>
          </form>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-8">
        <h1 className="text-2xl font-bold text-slate-900 mb-6">Dashboard</h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Politicians", value: politicians, href: "/admin/politicians" },
            { label: "Constituencies", value: constituencies, href: "/admin/constituencies" },
            { label: "Parties", value: parties, href: "/admin/politicians" },
          ].map((stat) => (
            <Link key={stat.label} href={stat.href}
              className="rounded-xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition">
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
            </Link>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <Link href="/admin/politicians/new"
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition">
            <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 text-lg">+</div>
            <div>
              <p className="font-medium text-slate-900">Add Politician</p>
              <p className="text-xs text-slate-500">Create a new politician record</p>
            </div>
          </Link>
          <Link href="/admin/constituencies/new"
            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-300 transition">
            <div className="flex size-10 items-center justify-center rounded-lg bg-slate-100 text-slate-600 text-lg">+</div>
            <div>
              <p className="font-medium text-slate-900">Add Constituency</p>
              <p className="text-xs text-slate-500">Create a new constituency</p>
            </div>
          </Link>
        </div>

        {/* Recent audit log */}
        <div className="rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-200 px-6 py-4 flex items-center justify-between">
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
    </div>
  );
}
