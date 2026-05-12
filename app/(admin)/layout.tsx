import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = { title: "Karmameter Admin" };

export default function AdminGroupLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
