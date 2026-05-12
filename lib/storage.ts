import { createClient } from "@supabase/supabase-js";

// Server-only — uses service role key, never exposed to client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function uploadImage(file: File, bucket: string, path: string): Promise<string> {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true, contentType: file.type });

  if (error) throw new Error(`Upload failed: ${error.message}`);

  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

export async function uploadPoliticianPhoto(file: File, politicianId: string): Promise<string> {
  const ext = file.name.split(".").pop() ?? "jpg";
  return uploadImage(file, "politician-photos", `${politicianId}.${ext}`);
}

export async function deletePoliticianPhoto(politicianId: string) {
  await supabase.storage.from("politician-photos").remove([`${politicianId}.jpg`, `${politicianId}.png`, `${politicianId}.webp`]);
}
