"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

async function requireAdmin() {
  const session = await getSession();
  if (!session?.totpVerified) throw new Error("Unauthorized");
  return session;
}

// Prisma Json fields don't accept null directly — use undefined instead
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toJson(val: any) {
  if (val === null || val === undefined) return undefined;
  return JSON.parse(JSON.stringify(val, (_, v) => (typeof v === "bigint" ? v.toString() : v)));
}

// ─── Politicians ──────────────────────────────────────────────────────────────

const PoliticianSchema = z.object({
  fullName: z.string().min(1),
  position: z.string().min(1),
  partyId: z.string().optional(),
  constituencyId: z.string().optional(),
  electionYear: z.coerce.number().optional(),
  criminalCases: z.coerce.number().default(0),
  totalAssets: z.coerce.number().optional(),
  education: z.string().optional(),
  photoUrl: z.string().url().optional().or(z.literal("")),
  sourceUrl: z.string().url().optional().or(z.literal("")),
});

export async function createPolitician(formData: FormData) {
  const session = await requireAdmin();
  const data = PoliticianSchema.parse(Object.fromEntries(formData));

  const politician = await prisma.politician.create({ data });
  await prisma.auditLog.create({
    data: { entityType: "Politician", entityId: politician.id, action: "CREATE", changedBy: session.email, newData: toJson(politician) },
  });
  revalidatePath("/admin/politicians");
  return { ok: true, id: politician.id };
}

export async function updatePolitician(id: string, formData: FormData) {
  const session = await requireAdmin();
  const data = PoliticianSchema.partial().parse(Object.fromEntries(formData));

  const old = await prisma.politician.findUnique({ where: { id } });
  const politician = await prisma.politician.update({ where: { id }, data });
  await prisma.auditLog.create({
    data: { entityType: "Politician", entityId: id, action: "UPDATE", changedBy: session.email, oldData: toJson(old), newData: toJson(politician) },
  });
  revalidatePath("/admin/politicians");
  revalidatePath(`/admin/politicians/${id}`);
  return { ok: true };
}

export async function deletePolitician(id: string) {
  const session = await requireAdmin();
  const old = await prisma.politician.findUnique({ where: { id } });
  await prisma.politician.update({ where: { id }, data: { isActive: false } });
  await prisma.auditLog.create({
    data: { entityType: "Politician", entityId: id, action: "DELETE", changedBy: session.email, oldData: toJson(old) },
  });
  revalidatePath("/admin/politicians");
  return { ok: true };
}

// ─── Constituencies ───────────────────────────────────────────────────────────

const ConstituencySchema = z.object({
  name: z.string().min(1),
  state: z.string().min(1),
  type: z.enum(["LOK_SABHA", "VIDHAN_SABHA"]),
  population: z.coerce.bigint().optional(),
});

export async function createConstituency(formData: FormData) {
  const session = await requireAdmin();
  const data = ConstituencySchema.parse(Object.fromEntries(formData));
  const constituency = await prisma.constituency.create({ data });
  await prisma.auditLog.create({
    data: { entityType: "Constituency", entityId: constituency.id, action: "CREATE", changedBy: session.email, newData: toJson(constituency) },
  });
  revalidatePath("/admin/constituencies");
  return { ok: true, id: constituency.id };
}

export async function updateConstituency(id: string, formData: FormData) {
  const session = await requireAdmin();
  const data = ConstituencySchema.partial().parse(Object.fromEntries(formData));
  const old = await prisma.constituency.findUnique({ where: { id } });
  const constituency = await prisma.constituency.update({ where: { id }, data });
  await prisma.auditLog.create({
    data: { entityType: "Constituency", entityId: id, action: "UPDATE", changedBy: session.email, oldData: toJson(old), newData: toJson(constituency) },
  });
  revalidatePath("/admin/constituencies");
  return { ok: true };
}

// ─── Parties ──────────────────────────────────────────────────────────────────

export async function createParty(formData: FormData) {
  const session = await requireAdmin();
  const data = z.object({ name: z.string().min(1), abbreviation: z.string().min(1) }).parse(Object.fromEntries(formData));
  const party = await prisma.party.create({ data });
  await prisma.auditLog.create({
    data: { entityType: "Party", entityId: party.id, action: "CREATE", changedBy: session.email, newData: toJson(party) },
  });
  revalidatePath("/admin/politicians");
  return { ok: true, id: party.id };
}
