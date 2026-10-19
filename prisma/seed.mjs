// Seeds demo portals and records for local development.
// Run with `npx prisma db seed`. Safe to re-run: rows are upserted by fixed ids.
import { PrismaClient } from "@prisma/client";

if (process.env.NODE_ENV === "production") {
  console.error("Refusing to seed demo data in production.");
  process.exit(1);
}

const prisma = new PrismaClient();

// Portal names match the options hardcoded in components/SearchForm.tsx.
const portals = [
  { id: "seed-portal-1", name: "portal-1", baseUrl: "https://portal-1.example.in", type: "municipal" },
  { id: "seed-portal-2", name: "portal-2", baseUrl: "https://portal-2.example.in", type: "state" },
];

// Demo data only: every URL points at example.in so nothing here passes for a real record.
const records = [
  {
    id: "seed-record-1",
    portalId: "seed-portal-1",
    title: "Road Resurfacing Contract A-12",
    documentUrl: "https://portal-1.example.in/tenders/a-12.pdf",
    rawData: {
      summary: "Contract awarded for resurfacing of main roads in the central ward.",
      publishedAt: "2026-08-12",
    },
  },
  {
    id: "seed-record-2",
    portalId: "seed-portal-2",
    title: "Annual Budget Report 2025-26",
    documentUrl: "https://portal-2.example.in/budget/2025-26.pdf",
    rawData: {
      summary: "Summary of funds allocated and spent across departments.",
      publishedAt: "2026-06-30",
    },
  },
  {
    id: "seed-record-3",
    portalId: "seed-portal-1",
    title: "Municipal Meeting Minutes, July",
    documentUrl: "https://portal-1.example.in/minutes/2026-07.pdf",
    rawData: {
      summary: "Minutes of the monthly council meeting, including attendance.",
      publishedAt: "2026-07-18",
    },
  },
  {
    id: "seed-record-4",
    portalId: "seed-portal-2",
    title: "Water Supply Pipeline Tender, Ward 9",
    documentUrl: null,
    rawData: {
      summary: "Tender notice for replacing ageing distribution pipelines in ward 9.",
      publishedAt: "2026-09-03",
    },
  },
  {
    id: "seed-record-5",
    portalId: "seed-portal-1",
    title: "Budget Utilisation Statement, Q1",
    documentUrl: "https://portal-1.example.in/budget/q1-utilisation.pdf",
    // No rawData: exercises the fetchedAt / empty-summary fallbacks.
    rawData: undefined,
  },
];

async function main() {
  for (const { id, ...data } of portals) {
    await prisma.portal.upsert({ where: { id }, update: data, create: { id, ...data } });
  }
  for (const { id, ...data } of records) {
    await prisma.record.upsert({ where: { id }, update: data, create: { id, ...data } });
  }
  console.log(`Seeded ${portals.length} portals and ${records.length} records.`);
}

main()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
