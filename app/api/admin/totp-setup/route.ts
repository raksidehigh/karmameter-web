import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";
import { getSession, signSession, sessionCookieOptions } from "@/lib/session";
import { generateTotpSecret, getTotpUri, verifyTotpToken } from "@/lib/totp";
import { isLocked, recordFailure, LOCKED_MESSAGE } from "@/lib/lockout";

// GET — generate a new TOTP secret and return the QR URI
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Enrollment is one-time: never let a password-only session replace an existing TOTP secret
  const admin = await prisma.adminUser.findUnique({ where: { id: session.adminId } });
  if (!admin) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  if (admin.totpVerified) {
    return NextResponse.json({ error: "TOTP already configured" }, { status: 403 });
  }

  const secret = generateTotpSecret();
  const uri = getTotpUri(session.email, secret);
  const qrDataUrl = await QRCode.toDataURL(uri);

  // Temporarily store secret (not yet verified)
  await prisma.adminUser.update({
    where: { id: session.adminId },
    data: { totpSecret: secret, totpVerified: false },
  });

  return NextResponse.json({ secret, uri, qrDataUrl });
}

// POST — verify the first TOTP code to confirm setup
const schema = z.object({ token: z.string().length(6) });

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid token" }, { status: 400 });

  const admin = await prisma.adminUser.findUnique({ where: { id: session.adminId } });
  if (!admin?.totpSecret) {
    return NextResponse.json({ error: "No TOTP secret found" }, { status: 400 });
  }
  if (admin.totpVerified) {
    return NextResponse.json({ error: "TOTP already configured" }, { status: 403 });
  }
  if (isLocked(admin)) {
    return NextResponse.json({ error: LOCKED_MESSAGE }, { status: 429 });
  }

  if (!verifyTotpToken(parsed.data.token, admin.totpSecret)) {
    await recordFailure(admin.id);
    return NextResponse.json({ error: "Invalid TOTP code" }, { status: 401 });
  }

  await prisma.adminUser.update({
    where: { id: admin.id },
    data: { totpVerified: true, failedAttempts: 0, lockedUntil: null },
  });

  // Upgrade session to totpVerified=true
  const newToken = await signSession({ adminId: admin.id, email: admin.email, totpVerified: true });
  const res = NextResponse.json({ ok: true });
  res.cookies.set(sessionCookieOptions(newToken));
  return res;
}
