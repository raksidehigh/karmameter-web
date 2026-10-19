import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { searchRecords } from "@/lib/records";

const QuerySchema = z.object({
  q: z.string().trim().max(200).optional(),
  portal: z.string().trim().max(100).optional(),
});

export async function GET(req: NextRequest) {
  const parsed = QuerySchema.safeParse({
    q: req.nextUrl.searchParams.get("q") ?? undefined,
    portal: req.nextUrl.searchParams.get("portal") ?? undefined,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid search parameters" }, { status: 400 });
  }

  const data = await searchRecords(parsed.data);
  return NextResponse.json({ data });
}
