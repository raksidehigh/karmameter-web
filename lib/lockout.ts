import { prisma } from "@/lib/prisma";

const MAX_ATTEMPTS = 5;
const LOCK_MS = 15 * 60 * 1000; // 15 minutes

export const LOCKED_MESSAGE = "Too many failed attempts. Try again in 15 minutes.";

export function isLocked(admin: { lockedUntil: Date | null }): boolean {
  return admin.lockedUntil !== null && admin.lockedUntil > new Date();
}

// Count a failed password/TOTP attempt; lock the account once the limit is hit
export async function recordFailure(adminId: string) {
  const admin = await prisma.adminUser.update({
    where: { id: adminId },
    data: { failedAttempts: { increment: 1 } },
  });
  if (admin.failedAttempts >= MAX_ATTEMPTS) {
    await prisma.adminUser.update({
      where: { id: adminId },
      data: { failedAttempts: 0, lockedUntil: new Date(Date.now() + LOCK_MS) },
    });
  }
}

export async function resetFailures(adminId: string) {
  await prisma.adminUser.update({
    where: { id: adminId },
    data: { failedAttempts: 0, lockedUntil: null },
  });
}
