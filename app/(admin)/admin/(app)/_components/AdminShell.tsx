"use client";

import { useState, useRef, useCallback } from "react";
import { AdminSidebar } from "./AdminSidebar";

const DEFAULT_WIDTH = 224;

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  const [width, setWidth] = useState(DEFAULT_WIDTH);

  return (
    <div className="flex min-h-screen">
      <AdminSidebar email={email} width={width} setWidth={setWidth} />
      <main style={{ marginLeft: width }} className="flex-1 bg-slate-50 min-h-screen transition-none">
        {children}
      </main>
    </div>
  );
}
