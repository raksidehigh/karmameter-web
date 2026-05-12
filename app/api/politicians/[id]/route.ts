import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const politician = await prisma.politician.findUnique({
    where: { id },
    include: {
      party: true,
      constituency: true,
      scores: { orderBy: { lastComputedAt: "desc" } },
      promises: { orderBy: { createdAt: "desc" } },
      attendance: { orderBy: { sessionYear: "desc" } },
      projects: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  });

  if (!politician) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(politician);
}
