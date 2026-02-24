"use client";

import { useEffect, useState } from "react";

const sections = [
  { id: "introduction", label: "Introduction" },
  { id: "data-acquisition", label: "1. Data Acquisition" },
  { id: "verification", label: "2. Verification Process" },
  { id: "scoring", label: "3. Scoring Framework" },
  { id: "peer-review", label: "4. Peer Review" },
];

export function MethodologyToc() {
  const [activeId, setActiveId] = useState<string>("introduction");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) =>
              (a.target as HTMLElement).offsetTop -
              (b.target as HTMLElement).offsetTop,
          );

        if (visibleSections[0]?.target?.id) {
          setActiveId(visibleSections[0].target.id);
        }
      },
      {
        // Trigger when a section is roughly in the middle of the viewport
        root: null,
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0.1,
      },
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const linkClasses = (id: string) =>
    id === activeId
      ? "block border-l-2 border-primary py-2 pl-4 text-sm font-medium text-primary bg-slate-50/50"
      : "block border-l-2 border-transparent py-2 pl-4 text-sm font-medium text-slate-600 hover:border-slate-300 hover:text-slate-900";

  return (
    <aside className="hidden w-64 flex-shrink-0 lg:block">
      <div className="sticky top-24">
        <h5 className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
          Contents
        </h5>
        <nav className="space-y-1 border-l border-slate-200">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={linkClasses(section.id)}
            >
              {section.label}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}

