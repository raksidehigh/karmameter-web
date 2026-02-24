import { ComingSoonBanner } from "@/components/ComingSoonBanner";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyItMatters } from "@/components/WhyItMatters";
import { BuiltFor } from "@/components/BuiltFor";
import { Disclaimer } from "@/components/Disclaimer";

export default function Home() {
  return (
    <main>
      <ComingSoonBanner />
      <Hero />
      <HowItWorks />
      <WhyItMatters />
      <BuiltFor />
      <Disclaimer />
    </main>
  );
}
