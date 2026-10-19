import { NextResponse } from "next/server";
import { getRecord } from "@/lib/records";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const record = await getRecord(id);
  if (!record) {
    return NextResponse.json({ message: "Record Not Found" }, { status: 404 });
  }
  return NextResponse.json({ message: "Record found", record }, { status: 200 });
}
