import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../globals.css";
import "./solidarity.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  weight: "400",
  variable: "--font-bebas",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "We Stand With India's Youth — Karmameter.in",
  description:
    "A living protest wall in solidarity with India's youth-led movement for accountability — over exam-paper leaks, the treatment of Sonam Wangchuk, and the right to protest peacefully. An independent citizen page.",
  openGraph: {
    title: "We Stand With India's Youth — Karmameter.in",
    description:
      "Solidarity with the students, aspirants, and citizens demanding accountability. The demands, the facts, and verified sources.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export default function SolidarityLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
        />
        {/* Progressive enhancement: keep content visible if JS never runs. */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".reveal{opacity:1 !important;transform:none !important}",
            }}
          />
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${bebas.variable} font-body bg-slate-900 text-slate-50 antialiased overflow-x-hidden selection:bg-red-600 selection:text-white`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
