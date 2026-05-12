import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

const FORMULA_VERSION = "v1";

// Scoring weights
const W = { promise: 0.35, attendance: 0.20, budget: 0.30, criminal: 0.15 };

async function computeScore(politicianId: string) {
  const [promises, attendance, politician] = await Promise.all([
    prisma.promise.findMany({ where: { politicianId } }),
    prisma.attendance.findMany({ where: { politicianId } }),
    prisma.politician.findUnique({ where: { id: politicianId } }),
  ]);

  if (!politician) return null;

  // Promise score: fulfilled / total
  const promiseScore = promises.length
    ? (promises.filter((p) => p.status === "FULFILLED").length / promises.length) * 100
    : 50; // neutral if no data

  // Attendance score: average across sessions
  const attendanceScore = attendance.length
    ? attendance.reduce((s, a) => s + a.attendancePercentage, 0) / attendance.length
    : 50;

  // Budget score: placeholder (50) until budget data is available
  const budgetScore = 50;

  // Criminal penalty: -10 per case, capped at 100
  const criminalPenalty = Math.min(100, (politician.criminalCases ?? 0) * 10);

  const overallScore =
    promiseScore * W.promise +
    attendanceScore * W.attendance +
    budgetScore * W.budget -
    criminalPenalty * W.criminal;

  return {
    politicianId,
    overallScore: Math.max(0, Math.min(100, overallScore)),
    promiseScore,
    attendanceScore,
    budgetScore,
    criminalPenalty,
    formulaVersion: FORMULA_VERSION,
    lastComputedAt: new Date(),
  };
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.totpVerified) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { politicianId } = await req.json().catch(() => ({}));

  const ids = politicianId
    ? [politicianId]
    : (await prisma.politician.findMany({ select: { id: true } })).map((p) => p.id);

  const results = await Promise.all(ids.map(computeScore));
  const valid = results.filter(Boolean) as NonNullable<typeof results[0]>[];

  for (const score of valid) {
    await prisma.score.upsert({
      where: { politicianId_formulaVersion: { politicianId: score.politicianId, formulaVersion: FORMULA_VERSION } },
      create: score,
      update: score,
    });
    await prisma.auditLog.create({
      data: {
        entityType: "Score",
        entityId: score.politicianId,
        action: "RECOMPUTE",
        changedBy: session.email,
        newData: score,
      },
    });
  }

  return NextResponse.json({ recomputed: valid.length });
}
