export const dynamic = "force-dynamic";
import { prisma } from "@/lib/prisma";

export default async function AuditPage() {
  const logs = await prisma.auditLog.findMany({
    orderBy: { timestamp: "desc" },
    take: 100,
  });

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Audit Log</h1>
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-200 bg-slate-50">
            <tr>
              {["Action", "Entity", "ID", "Changed By", "Time"].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {logs.length === 0 && (
              <tr><td colSpan={5} className="px-4 py-8 text-center text-slate-400">No activity yet</td></tr>
            )}
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                    log.action === "CREATE" ? "bg-green-100 text-green-700" :
                    log.action === "UPDATE" ? "bg-blue-100 text-blue-700" :
                    log.action === "DELETE" ? "bg-red-100 text-red-700" :
                    "bg-slate-100 text-slate-700"
                  }`}>{log.action}</span>
                </td>
                <td className="px-4 py-3 text-slate-700">{log.entityType}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{log.entityId.slice(0, 12)}…</td>
                <td className="px-4 py-3 text-slate-500">{log.changedBy}</td>
                <td className="px-4 py-3 text-slate-400 text-xs">{new Date(log.timestamp).toLocaleString("en-IN")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
