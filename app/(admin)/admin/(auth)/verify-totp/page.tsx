"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function VerifyTotpPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/verify-totp", {
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
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-slate-900 text-white text-xl font-bold">K</div>
          <h1 className="text-2xl font-bold text-slate-900">Two-Factor Auth</h1>
          <p className="mt-1 text-sm text-slate-500">Enter the 6-digit code from your authenticator app</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" inputMode="numeric" pattern="\d{6}" maxLength={6} required
            value={token} onChange={(e) => setToken(e.target.value)}
            placeholder="000000"
            className="w-full rounded-lg border border-slate-300 px-3 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-slate-900"
          />
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button
            type="submit" disabled={loading || token.length !== 6}
            className="w-full rounded-lg bg-slate-900 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? "Verifying…" : "Verify"}
          </button>
        </form>
      </div>
    </div>
  );
}
