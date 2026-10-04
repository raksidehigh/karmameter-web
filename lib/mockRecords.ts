export type RecordResult = {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  portal: string;
};

// Temporary fake data. Remove when the real API is ready.
export const MOCK_RECORDS: RecordResult[] = [
  {
    id: "1",
    title: "Road Resurfacing Contract A-12",
    summary: "Contract awarded for resurfacing of main roads in the central ward.",
    publishedAt: "2026-08-12",
    portal: "portal-1",
  },
  {
    id: "2",
    title: "Annual Budget Report 2025-26",
    summary: "Summary of funds allocated and spent across departments.",
    publishedAt: "2026-06-30",
    portal: "portal-2",
  },
  {
    id: "3",
    title: "Municipal Meeting Minutes, July",
    summary: "Minutes of the monthly council meeting, including attendance.",
    publishedAt: "2026-07-18",
    portal: "portal-1",
  },
];