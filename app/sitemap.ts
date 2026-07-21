import { MetadataRoute } from "next";

const BASE_URL = "https://www.karmameter.in";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE_URL,
      lastModified: new Date("2026-07-21"),
      changeFrequency: "daily",
      priority: 1,
    },
  ];
}
