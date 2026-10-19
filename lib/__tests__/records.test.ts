import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { findMany, findUnique } = vi.hoisted(() => ({
  findMany: vi.fn(),
  findUnique: vi.fn(),
}));
vi.mock("@/lib/prisma", () => ({ prisma: { record: { findMany, findUnique } } }));

import { SEARCH_LIMIT, toRecordResult } from "../records";
import { GET as searchGET } from "@/app/api/v1/records/search/route";
import { GET as detailGET } from "@/app/api/v1/records/[id]/route";

const row = {
  id: "rec_1",
  portalId: "p1",
  title: "Annual Budget Report",
  documentUrl: "https://gov.example.in/budget.pdf",
  fileHash: null,
  status: "FETCHED",
  fetchedAt: new Date("2026-09-01T00:00:00Z"),
  rawData: { summary: "Funds allocated by department.", publishedAt: "2026-06-30" },
  createdAt: new Date("2026-09-01T00:00:00Z"),
  updatedAt: new Date("2026-09-01T00:00:00Z"),
  portal: { name: "portal-1", baseUrl: "https://gov.example.in" },
};

beforeEach(() => {
  findMany.mockReset();
  findUnique.mockReset();
});

describe("toRecordResult", () => {
  it("maps a record row to the public API shape", () => {
    expect(toRecordResult(row)).toEqual({
      id: "rec_1",
      title: "Annual Budget Report",
      summary: "Funds allocated by department.",
      publishedAt: "2026-06-30",
      portal: "portal-1",
      source_url: "https://gov.example.in/budget.pdf",
    });
  });

  it("falls back to fetch metadata when rawData is missing or malformed", () => {
    const result = toRecordResult({
      ...row,
      documentUrl: null,
      rawData: { summary: 42, publishedAt: "not a date" },
    });
    expect(result.summary).toBe("");
    expect(result.publishedAt).toBe("2026-09-01T00:00:00.000Z");
    expect(result.source_url).toBe("https://gov.example.in");
  });
});

describe("GET /api/v1/records/search", () => {
  it("filters by title and portal name", async () => {
    findMany.mockResolvedValue([row]);
    const res = await searchGET(
      new NextRequest("http://localhost/api/v1/records/search?q=%20budget%20&portal=portal-1")
    );

    expect(res.status).toBe(200);
    expect((await res.json()).data).toHaveLength(1);
    expect(findMany).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          title: { contains: "budget", mode: "insensitive" },
          portal: { name: "portal-1" },
        },
        take: SEARCH_LIMIT,
      })
    );
  });

  it("returns recent records when no filters are given", async () => {
    findMany.mockResolvedValue([]);
    const res = await searchGET(new NextRequest("http://localhost/api/v1/records/search"));

    expect(await res.json()).toEqual({ data: [] });
    expect(findMany).toHaveBeenCalledWith(expect.objectContaining({ where: {} }));
  });

  it("rejects an overly long query", async () => {
    const res = await searchGET(
      new NextRequest(`http://localhost/api/v1/records/search?q=${"a".repeat(201)}`)
    );
    expect(res.status).toBe(400);
    expect(findMany).not.toHaveBeenCalled();
  });
});

describe("GET /api/v1/records/[id]", () => {
  it("returns the record", async () => {
    findUnique.mockResolvedValue(row);
    const res = await detailGET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "rec_1" }),
    });

    expect(res.status).toBe(200);
    expect((await res.json()).record.id).toBe("rec_1");
  });

  it("returns 404 for an unknown id", async () => {
    findUnique.mockResolvedValue(null);
    const res = await detailGET(new Request("http://localhost"), {
      params: Promise.resolve({ id: "missing" }),
    });
    expect(res.status).toBe(404);
  });
});
