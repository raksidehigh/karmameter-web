import type { Record as PrismaRecord, Portal } from "@prisma/client";

export type RecordWithPortal = PrismaRecord & {
  portal: Pick<Portal, "id" | "name" | "baseUrl" | "type"> &
    Partial<Pick<Portal, "isActive" | "lastScrapedAt">>;
};

export function serializeRecord(record: RecordWithPortal) {
  const raw = (record.rawData as globalThis.Record<string, unknown> | null) ?? null;
  const summary =
    (typeof raw?.summary === "string" && raw.summary) ||
    (typeof raw?.description === "string" && raw.description) ||
    record.title;

  const publishedAt =
    (typeof raw?.publishedAt === "string" && raw.publishedAt) ||
    (typeof raw?.publication_date === "string" && raw.publication_date) ||
    (typeof raw?.published_at === "string" && raw.published_at) ||
    null;

  return {
    id: record.id,
    title: record.title,
    summary,
    publishedAt,
    publication_date: publishedAt,
    portal: record.portal.name,
    portal_id: record.portalId,
    source_url: record.documentUrl ?? "",
  };
}
