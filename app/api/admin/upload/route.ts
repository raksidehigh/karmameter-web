import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/session";
import { uploadImage, uploadPoliticianPhoto } from "@/lib/storage";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.totpVerified) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) return NextResponse.json({ error: "file required" }, { status: 400 });
  if (!file.type.startsWith("image/")) return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  if (file.size > 5 * 1024 * 1024) return NextResponse.json({ error: "Max file size is 5MB" }, { status: 400 });

  try {
    // Generic upload: bucket + path
    const bucket = formData.get("bucket") as string | null;
    const path = formData.get("path") as string | null;

    if (bucket && path) {
      const url = await uploadImage(file, bucket, path);
      return NextResponse.json({ url });
    }

    // Legacy: politician photo upload
    const politicianId = formData.get("politicianId") as string | null;
    if (!politicianId) return NextResponse.json({ error: "bucket+path or politicianId required" }, { status: 400 });
    const url = await uploadPoliticianPhoto(file, politicianId);
    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
