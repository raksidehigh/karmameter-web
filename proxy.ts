import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "./lib/session";

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/setup"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // ── IP allowlist ──────────────────────────────────────────────────────────
  const allowlist = process.env.ADMIN_IP_ALLOWLIST;
  if (allowlist) {
    const allowed = allowlist.split(",").map((ip) => ip.trim()).filter(Boolean);
    if (allowed.length > 0) {
      const ip =
        req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        req.headers.get("x-real-ip") ??
        "unknown";
      if (!allowed.includes(ip)) {
        return new NextResponse("Forbidden", { status: 403 });
      }
    }
  }

  // ── Public admin paths (login, setup) ─────────────────────────────────────
  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  // ── Session check ─────────────────────────────────────────────────────────
  const token = req.cookies.get("km_admin_session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  const session = await verifySession(token);
  if (!session) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  // ── TOTP must be verified ─────────────────────────────────────────────────
  if (!session.totpVerified && !pathname.startsWith("/admin/verify-totp")) {
    return NextResponse.redirect(new URL("/admin/verify-totp", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
