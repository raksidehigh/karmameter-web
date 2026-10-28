import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

vi.mock("@/lib/prisma", () => {
  return {
    prisma: {
      record: {
        findMany: vi.fn(),
        count: vi.fn(),
        findUnique: vi.fn(),
      },
    },
  };
});

import { prisma } from "@/lib/prisma";
import { GET as getSearch } from "../search/route";
import { GET as getRecordById } from "../[id]/route";

describe("Records API Endpoints (INT-5)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/v1/records/search", () => {
    it("returns HTTP 200 without ?q param (searchParams.get('q') is null)", async () => {
      (prisma.record.findMany as any).mockResolvedValue([]);
      (prisma.record.count as any).mockResolvedValue(0);

      const req = new NextRequest("http://localhost:3000/api/v1/records/search");
      const res = await getSearch(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.data).toEqual([]);
      expect(json.pagination.total).toBe(0);
    });

    it("returns HTTP 200 with JSON payload containing array of matching records in RecordResult shape and pagination metadata", async () => {
      const mockRecords = [
        {
          id: "rec-1",
          portalId: "portal-1",
          title: "Municipal Budget 2025",
          documentUrl: "https://example.com/budget.pdf",
          fileHash: "hash123",
          status: "FETCHED",
          rawData: {
            summary: "Annual budget summary for 2025.",
            publishedAt: "2025-04-01",
          },
          createdAt: new Date("2026-01-01"),
          updatedAt: new Date("2026-01-02"),
          fetchedAt: new Date("2026-01-01"),
          portal: {
            id: "portal-1",
            name: "portal-1",
            baseUrl: "https://finance.example.com",
            type: "GOV",
          },
        },
      ];

      (prisma.record.findMany as any).mockResolvedValue(mockRecords);
      (prisma.record.count as any).mockResolvedValue(1);

      const req = new NextRequest("http://localhost:3000/api/v1/records/search?q=budget&page=1&pageSize=10");
      const res = await getSearch(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(Array.isArray(json.data)).toBe(true);
      expect(json.data).toHaveLength(1);
      expect(json.data[0].title).toBe("Municipal Budget 2025");
      expect(json.data[0].summary).toBe("Annual budget summary for 2025.");
      expect(json.data[0].publishedAt).toBe("2025-04-01");
      expect(json.data[0].source_url).toBe("https://example.com/budget.pdf");
      expect(json.data[0].portal).toBe("portal-1");
      expect(json.data[0].raw_data).toBeUndefined();
      expect(json.data[0].file_hash).toBeUndefined();
      expect(json.pagination).toEqual({
        total: 1,
        page: 1,
        pageSize: 10,
        totalPages: 1,
        hasMore: false,
      });

      expect(prisma.record.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            title: { contains: "budget", mode: "insensitive" },
          },
          skip: 0,
          take: 10,
        })
      );
    });

    it("filters by portal if portal query param is provided", async () => {
      (prisma.record.findMany as any).mockResolvedValue([]);
      (prisma.record.count as any).mockResolvedValue(0);

      const req = new NextRequest("http://localhost:3000/api/v1/records/search?portal=portal-1");
      const res = await getSearch(req);

      expect(res.status).toBe(200);
      expect(prisma.record.findMany).toHaveBeenCalledWith(
        expect.objectContaining({
          where: {
            OR: [
              { portalId: "portal-1" },
              { portal: { name: { equals: "portal-1", mode: "insensitive" } } },
            ],
          },
        })
      );
    });
  });

  describe("GET /api/v1/records/:id", () => {
    it("returns HTTP 200 with record data satisfying RecordDetailView (data.record) and source_url", async () => {
      const mockRecord = {
        id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        portalId: "portal-1",
        title: "City Council Report",
        documentUrl: "https://example.com/report.pdf",
        fileHash: "hashabc",
        status: "FETCHED",
        rawData: {
          summary: "City council report details.",
          publishedAt: "2026-03-15",
        },
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-02"),
        fetchedAt: new Date("2026-01-01T10:00:00.000Z"),
        portal: {
          id: "portal-1",
          name: "City Portal",
          baseUrl: "https://city.gov",
          type: "MUNICIPAL",
          isActive: true,
          lastScrapedAt: null,
        },
      };

      (prisma.record.findUnique as any).mockResolvedValue(mockRecord);

      const req = new NextRequest("http://localhost:3000/api/v1/records/a1b2c3d4-e5f6-7890-abcd-ef1234567890");
      const res = await getRecordById(req, {
        params: Promise.resolve({ id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890" }),
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.record).toBeDefined();
      expect(json.record.id).toBe("a1b2c3d4-e5f6-7890-abcd-ef1234567890");
      expect(json.record.title).toBe("City Council Report");
      expect(json.record.summary).toBe("City council report details.");
      expect(json.record.source_url).toBe("https://example.com/report.pdf");
      expect(json.record.publishedAt).toBe("2026-03-15");
      expect(json.record.publication_date).toBe("2026-03-15");
      expect(json.record.portal).toBe("City Portal");
      expect(json.record.raw_data).toBeUndefined();
      expect(json.record.file_hash).toBeUndefined();
    });

    it("returns null for publication_date if publishedAt is not in rawData (not fetchedAt)", async () => {
      const mockRecord = {
        id: "rec-unknown-date",
        portalId: "portal-1",
        title: "Undated Report",
        documentUrl: "https://example.com/doc.pdf",
        fileHash: "hash123",
        status: "FETCHED",
        rawData: null,
        createdAt: new Date("2026-01-01"),
        updatedAt: new Date("2026-01-02"),
        fetchedAt: new Date("2026-01-01"),
        portal: {
          id: "portal-1",
          name: "Portal 1",
          baseUrl: "https://portal.gov",
          type: "GOV",
        },
      };

      (prisma.record.findUnique as any).mockResolvedValue(mockRecord);

      const req = new NextRequest("http://localhost:3000/api/v1/records/rec-unknown-date");
      const res = await getRecordById(req, {
        params: Promise.resolve({ id: "rec-unknown-date" }),
      });
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.record.publication_date).toBeNull();
      expect(json.record.publishedAt).toBeNull();
    });

    it("returns HTTP 404 when given a non-existent UUID", async () => {
      (prisma.record.findUnique as any).mockResolvedValue(null);

      const req = new NextRequest("http://localhost:3000/api/v1/records/non-existent-uuid");
      const res = await getRecordById(req, {
        params: Promise.resolve({ id: "non-existent-uuid" }),
      });
      const json = await res.json();

      expect(res.status).toBe(404);
      expect(json.message).toBe("Record Not Found");
    });
  });
});
