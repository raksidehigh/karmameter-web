import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type RecordResult = {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  portal: string;
  source_url: string;
};

export const SEARCH_LIMIT = 50;

const recordWithPortal = {
  include: { portal: { select: { name: true, baseUrl: true } } },
} satisfies Prisma.RecordDefaultArgs;

type RecordWithPortal = Prisma.RecordGetPayload<typeof recordWithPortal>;

function rawString(raw: Prisma.JsonValue | null, key: string): string | undefined {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return undefined;
  const value = (raw as Prisma.JsonObject)[key];
  return typeof value === "string" && value.trim() ? value : undefined;
}

// The records table has no summary/publishedAt columns yet, so read them from
// rawData when the ingester provides them and fall back to fetch metadata.
export function toRecordResult(record: RecordWithPortal): RecordResult {
  const publishedAt = rawString(record.rawData, "publishedAt");
  return {
    id: record.id,
    title: record.title,
    summary: rawString(record.rawData, "summary") ?? "",
    publishedAt:
      publishedAt && !Number.isNaN(Date.parse(publishedAt))
        ? publishedAt
        : record.fetchedAt.toISOString(),
    portal: record.portal.name,
    source_url: record.documentUrl ?? record.portal.baseUrl,
  };
}

export async function searchRecords({ q, portal }: { q?: string; portal?: string }) {
  const records = await prisma.record.findMany({
    ...recordWithPortal,
    where: {
      ...(q ? { title: { contains: q, mode: "insensitive" } } : {}),
      ...(portal ? { portal: { name: portal } } : {}),
    },
    orderBy: { fetchedAt: "desc" },
    take: SEARCH_LIMIT,
  });
  return records.map(toRecordResult);
}

export async function getRecord(id: string) {
  const record = await prisma.record.findUnique({ ...recordWithPortal, where: { id } });
  return record ? toRecordResult(record) : null;
}
