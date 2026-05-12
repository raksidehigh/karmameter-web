"use client";

import { useRef, useState } from "react";
import Image from "next/image";

type Props = {
  name: string;           // hidden input name (e.g. "flagUrl", "symbolUrl")
  defaultUrl?: string;
  bucket: string;
  storagePath: string;    // e.g. "flags/IN", "symbols/BJP"
  label?: string;
  shape?: "square" | "flag";
};

export function ImageUpload({ name, defaultUrl, bucket, storagePath, label = "Image", shape = "square" }: Props) {
  const [preview, setPreview] = useState<string | null>(defaultUrl ?? null);
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setError("");
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("bucket", bucket);
    const ext = file.name.split(".").pop() ?? "jpg";
    fd.append("path", `${storagePath}.${ext}`);
    const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const data = await res.json();
    if (data.url) setUrl(data.url);
    else setError(data.error ?? "Upload failed");
    setUploading(false);
  }

  const previewClass = shape === "flag"
    ? "w-14 h-10 rounded object-cover"
    : "size-14 rounded-lg object-contain bg-slate-100";

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
      <div className="flex items-center gap-4">
        <div className={`${shape === "flag" ? "w-14 h-10" : "size-14"} rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center`}>
          {preview
            ? <Image src={preview} alt={label} width={56} height={40} className={previewClass} unoptimized={preview.startsWith("blob:")} />
            : <span className="text-slate-400 text-xs">None</span>}
        </div>
        <div>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />
          <button type="button" onClick={() => fileRef.current?.click()}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            {uploading ? "Uploading…" : "Choose"}
          </button>
          {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
      </div>
      <input type="hidden" name={name} value={url} />
    </div>
  );
}
