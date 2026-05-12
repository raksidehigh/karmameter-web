export const dynamic = "force-dynamic";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updatePolitician } from "../../../actions";
import { PoliticianForm } from "../../PoliticianForm";

export default async function EditPoliticianPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [politician, parties, constituencies] = await Promise.all([
    prisma.politician.findUnique({ where: { id } }),
    prisma.party.findMany({ orderBy: { name: "asc" } }),
    prisma.constituency.findMany({ orderBy: [{ state: "asc" }, { name: "asc" }] }),
  ]);

  if (!politician) notFound();

  const action = updatePolitician.bind(null, id);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-6 py-4 flex items-center gap-3">
        <Link href="/admin/politicians" className="text-sm text-slate-500 hover:text-slate-900">← Politicians</Link>
        <span className="text-slate-300">/</span>
        <span className="font-semibold text-slate-900">Edit: {politician.fullName}</span>
      </header>
      <div className="mx-auto max-w-2xl px-6 py-8">
        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <PoliticianForm
            action={action}
            parties={parties}
            constituencies={constituencies}
            defaultValues={{
              fullName: politician.fullName,
              position: politician.position,
              partyId: politician.partyId ?? "",
              constituencyId: politician.constituencyId ?? "",
              electionYear: politician.electionYear ?? "",
              criminalCases: politician.criminalCases,
              totalAssets: politician.totalAssets?.toString() ?? "",
              education: politician.education ?? "",
              photoUrl: politician.photoUrl ?? "",
              sourceUrl: politician.sourceUrl ?? "",
            }}
            submitLabel="Update Politician"
          />
        </div>
      </div>
    </div>
  );
}
