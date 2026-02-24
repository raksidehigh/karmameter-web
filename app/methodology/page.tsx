import { MethodologyToc } from "@/components/MethodologyToc";
import { MethodologyContent } from "@/components/MethodologyContent";

export const metadata = {
  title: "Karmameter Methodology Documentation",
};

export default function MethodologyPage() {
  return (
    <div className="relative pt-20">
      <div className="absolute inset-0 -z-10 h-[600px] w-full bg-grid-pattern opacity-[0.4] grid-bg pointer-events-none fixed" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 py-10">
          <MethodologyToc />
          <MethodologyContent />
        </div>
      </div>
    </div>
  );
}

