import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signSession, sessionCookieOptions } from "@/lib/session";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const admin = await prisma.adminUser.findUnique({ where: { email } });

  if (!admin || !(await bcrypt.compare(password, admin.passwordHash))) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Issue a session with totpVerified=false — middleware will gate to /admin/verify-totp
  const token = await signSession({
    adminId: admin.id,
    email: admin.email,
    totpVerified: false,
  });

  const res = NextResponse.json({
    ok: true,
    needsTotpSetup: !admin.totpVerified,
  });
  res.cookies.set(sessionCookieOptions(token));
  return res;
}
