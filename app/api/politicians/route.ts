import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const stateId = searchParams.get("stateId");
  const constituencyId = searchParams.get("constituencyId");
  const partyId = searchParams.get("partyId");
  const q = searchParams.get("q");
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Number(searchParams.get("limit") ?? 20));

  const where = {
    isActive: true,
    ...(stateId && { constituency: { stateId } }),
    ...(constituencyId && { constituencyId }),
    ...(partyId && { partyId }),
    ...(q && { fullName: { contains: q, mode: "insensitive" as const } }),
  };

  const [politicians, total] = await Promise.all([
    prisma.politician.findMany({
      where,
      include: {
        party: { select: { id: true, name: true, abbreviation: true } },
        constituency: { select: { id: true, name: true, state: { select: { name: true } }, electionType: { select: { name: true } } } },
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
