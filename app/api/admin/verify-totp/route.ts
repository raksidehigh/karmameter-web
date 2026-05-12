import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getSession, signSession, sessionCookieOptions } from "@/lib/session";
import { verifyTotpToken } from "@/lib/totp";

const schema = z.object({ token: z.string().length(6) });

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid token" }, { status: 400 });

  const admin = await prisma.adminUser.findUnique({ where: { id: session.adminId } });
  if (!admin?.totpSecret || !admin.totpVerified) {
    return NextResponse.json({ error: "TOTP not configured" }, { status: 400 });
  }

  if (!verifyTotpToken(parsed.data.token, admin.totpSecret)) {
    return NextResponse.json({ error: "Invalid TOTP code" }, { status: 401 });
  }

  const newToken = await signSession({ adminId: admin.id, email: admin.email, totpVerified: true });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieOptions(newToken));
  return res;
}
