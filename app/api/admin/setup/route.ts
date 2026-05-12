import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(12),
  setupKey: z.string(),
});

// One-time setup endpoint — disabled once an admin exists
export async function POST(req: NextRequest) {
  const existing = await prisma.adminUser.count();
  if (existing > 0) {
    return NextResponse.json({ error: "Setup already complete" }, { status: 403 });
  }

  // Require a setup key from env to prevent unauthorized bootstrap
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Invalid input" }, { status: 400 });

  if (parsed.data.setupKey !== process.env.ADMIN_SETUP_KEY) {
    return NextResponse.json({ error: "Invalid setup key" }, { status: 403 });
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const admin = await prisma.adminUser.create({
    data: { email: parsed.data.email, passwordHash },
  });

  return NextResponse.json({ ok: true, adminId: admin.id });
}
