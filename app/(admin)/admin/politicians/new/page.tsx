export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createPolitician } from "../../actions";
import { PoliticianForm } from "../PoliticianForm";

export default async function NewPoliticianPage() {
  const [parties, constituencies] = await Promise.all([
    prisma.party.findMany({ orderBy: { name: "asc" } }),
    prisma.constituency.findMany({ orderBy: [{ state: "asc" }, { name: "asc" }] }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center gap-3">
        <Link href="/admin/politicians" className="text-sm text-slate-500 hover:text-slate-900">← Politicians</Link>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-900">New Politician</span>
      </header>
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <PoliticianForm action={createPolitician} parties={parties} constituencies={constituencies} submitLabel="Create Politician" />
        </div>
      </div>
    </div>
  );
}
