import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { recordSearchQuerySchema } from "@/lib/schemas/records";
import { serializeRecord } from "@/lib/serializers/record";

export async function GET(req: NextRequest) {
  const parsed = recordSearchQuerySchema.safeParse({
    q: req.nextUrl.searchParams.get("q") ?? undefined,
    portal: req.nextUrl.searchParams.get("portal") ?? undefined,
    page: req.nextUrl.searchParams.get("page") ?? undefined,
    pageSize:
      req.nextUrl.searchParams.get("pageSize") ??
      req.nextUrl.searchParams.get("limit") ??
      undefined,
  });

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid query parameters", details: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { q, portal, page, pageSize } = parsed.data;

  const where = {
    ...(q && {
      title: { contains: q, mode: "insensitive" as const },
    }),
    ...(portal && {
      OR: [
        { portalId: portal },
        { portal: { name: { equals: portal, mode: "insensitive" as const } } },
      ],
    }),
  };

  const [records, total] = await Promise.all([
    prisma.record.findMany({
      where,
      include: {
        portal: {
          select: {
            id: true,
            name: true,
            baseUrl: true,
            type: true,
          },
        },
      },
      orderBy: { fetchedAt: "desc" },
      skip: (page - 1) * pageSize,
      take: pageSize,
    }),
    prisma.record.count({ where }),
  ]);

  return NextResponse.json({
    data: records.map(serializeRecord),
    pagination: {
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      hasMore: page * pageSize < total,
    },
  });
}
