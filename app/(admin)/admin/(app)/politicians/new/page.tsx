export const dynamic = "force-dynamic";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createPolitician } from "../../actions";
import { PoliticianForm } from "../PoliticianForm";

export default async function NewPoliticianPage() {
  const [parties, constituencies] = await Promise.all([
    prisma.party.findMany({ include: { country: { select: { name: true } } }, orderBy: { name: "asc" } }),
    prisma.constituency.findMany({
      include: { electionType: { select: { name: true } }, state: { select: { name: true } } },
      orderBy: [{ state: { name: "asc" } }, { name: "asc" }],
    }),
  ]);

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/politicians" className="text-sm text-slate-500 hover:text-slate-900">← Politicians</Link>
        <span className="text-slate-300">/</span>
        <h1 className="font-semibold text-slate-900">New Politician</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <PoliticianForm action={createPolitician} parties={parties} constituencies={constituencies} submitLabel="Create Politician" />
      </div>
    </div>
  );
}
