import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const state = searchParams.get("state");
  const type = searchParams.get("type") as "LOK_SABHA" | "VIDHAN_SABHA" | null;

  const constituencies = await prisma.constituency.findMany({
    where: {
      ...(state && { state }),
      ...(type && { type }),
    },
    include: {
      _count: { select: { politicians: true, projects: true } },
    },
    orderBy: [{ state: "asc" }, { name: "asc" }],
  });

  return NextResponse.json(constituencies);
}
