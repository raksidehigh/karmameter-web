"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function SetupTotpPage() {
  const router = useRouter();
  const [uri, setUri] = useState("");
  const [secret, setSecret] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrUrl, setQrUrl] = useState("");

  useEffect(() => {
    fetch("/api/admin/totp-setup")
      .then((r) => r.json())
      .then((d) => {
        setUri(d.uri);
        setSecret(d.secret);
        setQrUrl(d.qrDataUrl);
      });
  }, []);

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/totp-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error); return; }
      router.push("/admin/dashboard");
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-slate-900 text-white text-xl font-bold">K</div>
          <h1 className="text-2xl font-bold text-slate-900">Set Up Authenticator</h1>
          <p className="mt-1 text-sm text-slate-500">Scan this QR code with Google Authenticator or Authy</p>
        </div>

        {qrUrl && (
          <div className="mb-4 flex justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={qrUrl} alt="TOTP QR Code" width={200} height={200} />
          </div>
        )}

        {secret && (
          <div className="mb-6 rounded-lg bg-slate-100 p-3 text-center">
            <p className="text-xs text-slate-500 mb-1">Manual entry key</p>
            <code className="text-sm font-mono text-slate-800 break-all">{secret}</code>
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Confirm with a code</label>
            <input
              type="text" inputMode="numeric" pattern="\d{6}" maxLength={6} required
              value={token} onChange={(e) => setToken(e.target.value)}
              placeholder="000000"
              className="w-full rounded-lg border border-slate-300 px-3 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button
            type="submit" disabled={loading || token.length !== 6}
            className="w-full rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Confirming…" : "Confirm & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
