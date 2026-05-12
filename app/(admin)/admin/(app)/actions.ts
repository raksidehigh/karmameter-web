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

function toJson(val: unknown) {
  if (val === null || val === undefined) return undefined;
  return JSON.parse(JSON.stringify(val, (_, v) => (typeof v === "bigint" ? v.toString() : v)));
}

async function audit(entityType: string, entityId: string, action: "CREATE" | "UPDATE" | "DELETE", changedBy: string, oldData?: unknown, newData?: unknown) {
  await prisma.auditLog.create({
    data: { entityType, entityId, action, changedBy, oldData: toJson(oldData), newData: toJson(newData) },
  });
}

// ─── Countries ────────────────────────────────────────────────────────────────

const CountrySchema = z.object({
  name: z.string().min(1),
  code: z.string().length(2).toUpperCase(),
  flagUrl: z.string().url().optional().or(z.literal("")),
});

export async function createCountry(formData: FormData) {
  const session = await requireAdmin();
  const data = CountrySchema.parse(Object.fromEntries(formData));
  const country = await prisma.country.create({ data });
  await audit("Country", country.id, "CREATE", session.email, undefined, country);
  revalidatePath("/admin/countries");
  return { ok: true };
}

export async function updateCountry(id: string, formData: FormData) {
  const session = await requireAdmin();
  const data = CountrySchema.partial().parse(Object.fromEntries(formData));
  const old = await prisma.country.findUnique({ where: { id } });
  const country = await prisma.country.update({ where: { id }, data });
  await audit("Country", id, "UPDATE", session.email, old, country);
  revalidatePath("/admin/countries");
  return { ok: true };
}

// ─── States ───────────────────────────────────────────────────────────────────

const StateSchema = z.object({
  name: z.string().min(1),
  code: z.string().optional(),
  countryId: z.string().min(1),
});

export async function createState(formData: FormData) {
  const session = await requireAdmin();
  const data = StateSchema.parse(Object.fromEntries(formData));
  const state = await prisma.state.create({ data });
  await audit("State", state.id, "CREATE", session.email, undefined, state);
  revalidatePath("/admin/states");
  return { ok: true };
}

export async function updateState(id: string, formData: FormData) {
  const session = await requireAdmin();
  const data = StateSchema.partial().parse(Object.fromEntries(formData));
  const old = await prisma.state.findUnique({ where: { id } });
  const state = await prisma.state.update({ where: { id }, data });
  await audit("State", id, "UPDATE", session.email, old, state);
  revalidatePath("/admin/states");
  return { ok: true };
}

// ─── Election Types ───────────────────────────────────────────────────────────

const ElectionTypeSchema = z.object({
  name: z.string().min(1),
  level: z.enum(["NATIONAL", "STATE", "LOCAL"]),
  countryId: z.string().min(1),
});

export async function createElectionType(formData: FormData) {
  const session = await requireAdmin();
  const data = ElectionTypeSchema.parse(Object.fromEntries(formData));
  const et = await prisma.electionType.create({ data });
  await audit("ElectionType", et.id, "CREATE", session.email, undefined, et);
  revalidatePath("/admin/election-types");
  return { ok: true };
}

export async function updateElectionType(id: string, formData: FormData) {
  const session = await requireAdmin();
  const data = ElectionTypeSchema.partial().parse(Object.fromEntries(formData));
  const old = await prisma.electionType.findUnique({ where: { id } });
  const et = await prisma.electionType.update({ where: { id }, data });
  await audit("ElectionType", id, "UPDATE", session.email, old, et);
  revalidatePath("/admin/election-types");
  return { ok: true };
}

// ─── Parties ──────────────────────────────────────────────────────────────────

const PartySchema = z.object({
  name: z.string().min(1),
  abbreviation: z.string().min(1),
  countryId: z.string().min(1),
  symbolUrl: z.string().url().optional().or(z.literal("")),
});

export async function createParty(formData: FormData) {
  const session = await requireAdmin();
  const data = PartySchema.parse(Object.fromEntries(formData));
  const party = await prisma.party.create({ data });
  await audit("Party", party.id, "CREATE", session.email, undefined, party);
  revalidatePath("/admin/parties");
  return { ok: true };
}

export async function updateParty(id: string, formData: FormData) {
  const session = await requireAdmin();
  const data = PartySchema.partial().parse(Object.fromEntries(formData));
  const old = await prisma.party.findUnique({ where: { id } });
  const party = await prisma.party.update({ where: { id }, data });
  await audit("Party", id, "UPDATE", session.email, old, party);
  revalidatePath("/admin/parties");
  return { ok: true };
}

// ─── Constituencies ───────────────────────────────────────────────────────────

const ConstituencySchema = z.object({
  name: z.string().min(1),
  stateId: z.string().min(1),
  electionTypeId: z.string().min(1),
  population: z.coerce.bigint().optional(),
});

export async function createConstituency(formData: FormData) {
  const session = await requireAdmin();
  const data = ConstituencySchema.parse(Object.fromEntries(formData));
  const c = await prisma.constituency.create({ data });
  await audit("Constituency", c.id, "CREATE", session.email, undefined, c);
  revalidatePath("/admin/constituencies");
  return { ok: true };
}

export async function updateConstituency(id: string, formData: FormData) {
  const session = await requireAdmin();
  const data = ConstituencySchema.partial().parse(Object.fromEntries(formData));
  const old = await prisma.constituency.findUnique({ where: { id } });
  const c = await prisma.constituency.update({ where: { id }, data });
  await audit("Constituency", id, "UPDATE", session.email, old, c);
  revalidatePath("/admin/constituencies");
  return { ok: true };
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
  photoUrl: z.string().optional(),
  sourceUrl: z.string().url().optional().or(z.literal("")),
});

export async function createPolitician(formData: FormData) {
  const session = await requireAdmin();
  const data = PoliticianSchema.parse(Object.fromEntries(formData));
  const p = await prisma.politician.create({ data });
  await audit("Politician", p.id, "CREATE", session.email, undefined, p);
  revalidatePath("/admin/politicians");
  return { ok: true, id: p.id };
}

export async function updatePolitician(id: string, formData: FormData) {
  const session = await requireAdmin();
  const data = PoliticianSchema.partial().parse(Object.fromEntries(formData));
  const old = await prisma.politician.findUnique({ where: { id } });
  const p = await prisma.politician.update({ where: { id }, data });
  await audit("Politician", id, "UPDATE", session.email, old, p);
  revalidatePath("/admin/politicians");
  return { ok: true };
}

export async function deletePolitician(id: string) {
  const session = await requireAdmin();
  const old = await prisma.politician.findUnique({ where: { id } });
  await prisma.politician.update({ where: { id }, data: { isActive: false } });
  await audit("Politician", id, "DELETE", session.email, old);
  revalidatePath("/admin/politicians");
  return { ok: true };
}
