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
    prisma.party.findMany({ include: { country: { select: { name: true } } }, orderBy: { name: "asc" } }),
    prisma.constituency.findMany({
      include: { electionType: { select: { name: true } }, state: { select: { name: true } } },
      orderBy: [{ state: { name: "asc" } }, { name: "asc" }],
    }),
  ]);

  if (!politician) notFound();

  return (
    <div className="p-8 max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/politicians" className="text-sm text-slate-500 hover:text-slate-900">← Politicians</Link>
        <span className="text-slate-300">/</span>
        <h1 className="font-semibold text-slate-900">Edit: {politician.fullName}</h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <PoliticianForm
          action={updatePolitician.bind(null, id)}
          parties={parties}
          constituencies={constituencies}
          defaultValues={{
            id,
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
  );
}
