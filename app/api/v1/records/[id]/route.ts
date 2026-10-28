import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serializeRecord } from "@/lib/serializers/record";

export async function GET(
  _req: NextRequest | Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id || typeof id !== "string") {
    return NextResponse.json({ message: "Record Not Found", error: "Record ID is required" }, { status: 400 });
  }

  const record = await prisma.record.findUnique({
    where: { id },
    include: {
      portal: {
        select: {
          id: true,
          name: true,
          baseUrl: true,
          type: true,
          isActive: true,
          lastScrapedAt: true,
        },
      },
    },
  });

  if (!record) {
    return NextResponse.json({ message: "Record Not Found", error: "Record not found" }, { status: 404 });
  }

  const serialized = serializeRecord(record);

  return NextResponse.json({
    message: "Record found",
    record: serialized,
    ...serialized,
  });
}
