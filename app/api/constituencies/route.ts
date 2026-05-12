import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const stateId = searchParams.get("stateId");
  const electionTypeId = searchParams.get("electionTypeId");
  const countryId = searchParams.get("countryId");

  const constituencies = await prisma.constituency.findMany({
    where: {
      ...(stateId && { stateId }),
      ...(electionTypeId && { electionTypeId }),
      ...(countryId && { state: { countryId } }),
    },
    include: {
      state: { select: { name: true, country: { select: { name: true, code: true } } } },
      electionType: { select: { name: true, level: true } },
      _count: { select: { politicians: true } },
    },
    orderBy: [{ state: { name: "asc" } }, { name: "asc" }],
  });

  return NextResponse.json(constituencies);
}
