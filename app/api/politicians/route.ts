import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const state = searchParams.get("state");
  const constituencyId = searchParams.get("constituencyId");
  const partyId = searchParams.get("partyId");
  const q = searchParams.get("q");
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Number(searchParams.get("limit") ?? 20));

  const where = {
    isActive: true,
    ...(state && { constituency: { state } }),
    ...(constituencyId && { constituencyId }),
    ...(partyId && { partyId }),
    ...(q && { fullName: { contains: q, mode: "insensitive" as const } }),
  };

  const [politicians, total] = await Promise.all([
    prisma.politician.findMany({
      where,
      include: {
        party: { select: { id: true, name: true, abbreviation: true } },
        constituency: { select: { id: true, name: true, state: true, type: true } },
        scores: { orderBy: { lastComputedAt: "desc" }, take: 1 },
      },
      orderBy: { fullName: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.politician.count({ where }),
  ]);

  return NextResponse.json({ data: politicians, total, page, limit });
}
