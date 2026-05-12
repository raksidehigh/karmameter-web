import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "bimoioedrejycyfuufrp.supabase.co" },
    ],
  },
};

export default nextConfig;
