import { NextRequest, NextResponse } from "next/server";
import { MOCK_RECORDS } from "@/lib/mockRecords";

// Temporary fake API. Replace with the real one when it's ready.
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get("q") ?? "").toLowerCase();
  const portal = req.nextUrl.searchParams.get("portal") ?? "";

  const data = MOCK_RECORDS.filter(
    (r) =>
      r.title.toLowerCase().includes(q) &&
      (portal === "" || r.portal === portal)
  );

  return NextResponse.json({ data });
}