"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useCallback } from "react";

const NAV = [
  { label: "Dashboard", icon: "grid_view", href: "/admin/dashboard" },
  {
    label: "Politicians", icon: "person",
    children: [
      { label: "View All", href: "/admin/politicians" },
      { label: "Add New", href: "/admin/politicians/new" },
    ],
  },
  {
    label: "Constituencies", icon: "map",
    children: [
      { label: "View All", href: "/admin/constituencies" },
      { label: "Add New", href: "/admin/constituencies/new" },
    ],
  },
  {
    label: "Parties", icon: "flag",
    children: [
      { label: "View All", href: "/admin/parties" },
      { label: "Add New", href: "/admin/parties/new" },
    ],
  },
  {
    label: "Election Types", icon: "how_to_vote",
    children: [
      { label: "View All", href: "/admin/election-types" },
      { label: "Add New", href: "/admin/election-types/new" },
    ],
  },
  {
    label: "States", icon: "location_on",
    children: [
      { label: "View All", href: "/admin/states" },
      { label: "Add New", href: "/admin/states/new" },
    ],
  },
  {
    label: "Countries", icon: "public",
    children: [
      { label: "View All", href: "/admin/countries" },
      { label: "Add New", href: "/admin/countries/new" },
    ],
  },
  { label: "Audit Log", icon: "history", href: "/admin/audit" },
];

const MIN_WIDTH = 180;
const MAX_WIDTH = 320;

type Props = { email: string; width: number; setWidth: (w: number) => void };

export function AdminSidebar({ email, width, setWidth }: Props) {
  const pathname = usePathname();
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const dragging = useRef(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    const onMove = (e: MouseEvent) => {
      if (!dragging.current) return;
      setWidth(Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, e.clientX)));
    };
    const onUp = () => {
      dragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, [setWidth]);

  function toggleGroup(label: string) {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  }

  const collapsed = width <= 160;

  return (
    <aside style={{ width }} className="fixed inset-y-0 left-0 bg-slate-900 text-white flex flex-col select-none z-40">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-slate-700 shrink-0">
        <div className="flex size-8 items-center justify-center rounded bg-white text-slate-900 text-sm font-bold shrink-0">K</div>
        {!collapsed && <span className="font-semibold text-sm truncate">Karmameter</span>}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {NAV.map((item) => {
          if (!item.children) {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link key={item.href} href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${active ? "bg-slate-700 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                <span className="material-symbols-outlined text-[18px] shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          }

          const groupActive = item.children.some((c) => pathname.startsWith(c.href));
          const open = openGroups[item.label] ?? groupActive;

          return (
            <div key={item.label}>
              <button onClick={() => toggleGroup(item.label)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${groupActive ? "text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                <span className="material-symbols-outlined text-[18px] shrink-0">{item.icon}</span>
                {!collapsed && (
                  <>
                    <span className="flex-1 text-left truncate">{item.label}</span>
                    <span className="material-symbols-outlined text-[14px]" style={{ transform: open ? "rotate(180deg)" : "none" }}>expand_more</span>
                  </>
                )}
              </button>
              {open && !collapsed && (
                <div className="ml-7 mt-0.5 space-y-0.5">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}
                      className={`block px-3 py-1.5 rounded-lg text-xs transition-colors ${pathname === child.href ? "bg-slate-700 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white"}`}>
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* User + logout */}
      {!collapsed && (
        <div className="border-t border-slate-700 px-4 py-4 shrink-0">
          <p className="text-xs text-slate-400 truncate mb-2">{email}</p>
          <form action="/api/admin/logout" method="POST">
            <button type="submit" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
              <span className="material-symbols-outlined text-[16px]">logout</span>
              Sign out
            </button>
          </form>
        </div>
      )}

      {/* Drag handle */}
      <div onMouseDown={onMouseDown} className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-slate-500 transition-colors" />
    </aside>
  );
}
