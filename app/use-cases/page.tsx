import { ReactNode } from "react";
import { UseCaseSection } from "@/components/UseCaseSection";

function JournalistsMock() {
  return (
    <div className="rounded-xl border border-border-light bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
      <div className="border-b border-border-light bg-slate-50 px-3 sm:px-4 py-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
          <div className="w-2.5 h-2.5 rounded-full bg-slate-300" />
        </div>
        <div className="text-xs font-mono text-slate-400 hidden sm:block">
          karmameter.com/search
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="relative">
          <span className="absolute left-3 top-2.5 material-symbols-outlined text-slate-400 text-[18px]">
            search
          </span>
          <input
            readOnly
            type="text"
            value="City Council procurement > $50k"
            className="w-full rounded-md border-slate-200 pl-10 text-xs sm:text-sm py-2 text-slate-900 bg-slate-50 mb-4 sm:mb-6"
          />
        </div>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                Road Resurfacing Contract A-12
              </div>
              <div className="text-xs text-slate-500">
                Dept. of Public Works • 2 days ago
              </div>
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-600 whitespace-nowrap">$145,000.00</div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                IT Infrastructure Upgrade
              </div>
              <div className="text-xs text-slate-500">
                City Hall Operations • 5 days ago
              </div>
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-600 whitespace-nowrap">$89,250.00</div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors opacity-60 gap-2">
            <div className="flex-1 min-w-0">
              <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                Consulting Services Q3
              </div>
              <div className="text-xs text-slate-500">
                Office of the Mayor • 1 week ago
              </div>
            </div>
            <div className="text-xs sm:text-sm font-mono text-slate-600 whitespace-nowrap">$12,500.00</div>
          </div>
          <div className="mt-4 sm:mt-6 flex justify-end">
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded shadow-sm">
              <span className="material-symbols-outlined text-[14px]">
                download
              </span>
              <span className="hidden sm:inline">Export to CSV</span>
              <span className="sm:hidden">Export</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ResearchersMock() {
  return (
    <div className="rounded-xl border border-border-light bg-white shadow-xl shadow-slate-200/50 overflow-hidden p-4 sm:p-6 relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-6 gap-4">
        <div>
          <div className="text-xs sm:text-sm font-medium text-slate-500 uppercase tracking-wider">
            Public Infrastructure Spend
          </div>
          <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
            +12.4%{" "}
            <span className="text-xs sm:text-sm font-normal text-slate-500">
              vs 5yr avg
            </span>
          </div>
        </div>
        <div className="flex gap-2 text-xs">
          <span className="w-3 h-3 rounded-full bg-indigo-500" />
          <span className="text-slate-500">Region A</span>
          <span className="w-3 h-3 rounded-full bg-slate-300 ml-2" />
          <span className="text-slate-500">National Avg</span>
        </div>
      </div>
      <div className="relative h-40 sm:h-48 w-full flex items-end justify-between gap-1 sm:gap-2">
        {[
          "40%",
          "55%",
          "45%",
          "70%",
          "60%",
          "85%",
          "75%",
        ].map((height, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={`w-full bg-slate-100 rounded-t-sm relative group h-[${height}]`}
          >
            <div className="absolute bottom-0 w-full bg-indigo-500/10 h-full" />
            <div className="absolute bottom-0 w-full bg-indigo-500 h-[70%] rounded-t-sm" />
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-2 text-[10px] sm:text-xs text-slate-400 font-mono">
        <span>2018</span>
        <span>2019</span>
        <span>2020</span>
        <span>2021</span>
        <span>2022</span>
        <span>2023</span>
        <span>2024</span>
      </div>
    </div>
  );
}

function PolicyMock() {
  return (
    <div className="rounded-xl border border-border-light bg-white shadow-xl shadow-slate-200/50 overflow-hidden">
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        <div className="p-4 sm:p-6">
          <div className="text-xs text-slate-400 font-bold uppercase mb-4">
            Region A (Target)
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">
                Fiscal Health Score
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[78%]" />
              </div>
              <div className="text-right text-xs font-bold text-slate-900 mt-1">
                78/100
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">
                Service Efficiency
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 w-[62%]" />
              </div>
              <div className="text-right text-xs font-bold text-slate-900 mt-1">
                62/100
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 sm:p-6 bg-slate-50/50">
          <div className="text-xs text-slate-400 font-bold uppercase mb-4">
            Region B (Benchmark)
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs text-slate-500 mb-1">
                Fiscal Health Score
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 w-[85%]" />
              </div>
              <div className="text-right text-xs font-bold text-slate-900 mt-1">
                85/100
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-500 mb-1">
                Service Efficiency
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-slate-400 w-[82%]" />
              </div>
              <div className="text-right text-xs font-bold text-slate-900 mt-1">
                82/100
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-100 p-3 sm:p-4 bg-slate-50">
        <div className="flex items-start sm:items-center gap-2 text-xs text-slate-500">
          <span className="material-symbols-outlined text-[16px] flex-shrink-0">info</span>
          <span>Region A underperforming in Service Efficiency by 24%</span>
        </div>
      </div>
    </div>
  );
}

function CitizensMock() {
  return (
    <div className="w-full max-w-sm mx-auto rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-6 gap-3">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 flex-shrink-0">
            <span className="material-symbols-outlined text-[28px] sm:text-[32px]">
              person
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-slate-900 text-base sm:text-lg truncate">Jane Doe</h3>
            <div className="text-xs sm:text-sm text-slate-500 truncate">
              City Council, District 9
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end flex-shrink-0">
          <div className="text-xl sm:text-2xl font-black text-emerald-600">A-</div>
          <div className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wide">
            Karma Score
          </div>
        </div>
      </div>
      <div className="space-y-3 sm:space-y-4">
        <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
          <span className="text-xs sm:text-sm font-medium text-slate-600">Attendance</span>
          <span className="text-xs sm:text-sm font-bold text-slate-900">98%</span>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
          <span className="text-xs sm:text-sm font-medium text-slate-600">
            Sponsored Bills
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-900">14 Passed</span>
        </div>
        <div className="p-3 bg-slate-50 rounded-lg flex justify-between items-center">
          <span className="text-xs sm:text-sm font-medium text-slate-600">
            Budget Adherence
          </span>
          <span className="text-xs sm:text-sm font-bold text-slate-900">+4.2%</span>
        </div>
      </div>
      <button className="w-full mt-4 sm:mt-6 py-2.5 rounded-lg border border-slate-200 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
        View Full Profile
      </button>
    </div>
  );
}

export const metadata = {
  title: "Karmameter - Use Cases & Solutions",
};

export default function UseCasesPage() {
  const journalistsBullets = [
    {
      icon: "check_circle",
      iconColorClasses: "text-emerald-500",
      text: "Search across 12,000+ municipal sources instantly",
    },
    {
      icon: "check_circle",
      iconColorClasses: "text-emerald-500",
      text: "Trace funding flows between entities",
    },
    {
      icon: "check_circle",
      iconColorClasses: "text-emerald-500",
      text: "Instant CSV exports for deep analysis",
    },
  ];

  const researchersBullets = [
    {
      icon: "insights",
      iconColorClasses: "text-purple-500",
      text: "Historical budget data spanning 20+ years",
    },
    {
      icon: "insights",
      iconColorClasses: "text-purple-500",
      text: "Normalized schema across 50 states",
    },
    {
      icon: "insights",
      iconColorClasses: "text-purple-500",
      text: "API access for high-volume data retrieval",
    },
  ];

  const policyBullets = [
    {
      icon: "tune",
      iconColorClasses: "text-emerald-600",
      text: "Side-by-side regional comparisons",
    },
    {
      icon: "tune",
      iconColorClasses: "text-emerald-600",
      text: "Spending efficiency scoring",
    },
    {
      icon: "tune",
      iconColorClasses: "text-emerald-600",
      text: "Demographic-adjusted performance metrics",
    },
  ];

  const citizensBullets = [
    {
      icon: "how_to_vote",
      iconColorClasses: "text-orange-600",
      text: 'Transparent "Karma Scores"',
    },
    {
      icon: "how_to_vote",
      iconColorClasses: "text-orange-600",
      text: "Voting history & attendance logs",
    },
    {
      icon: "how_to_vote",
      iconColorClasses: "text-orange-600",
      text: "Campaign finance contribution mapping",
    },
  ];

  return (
    <>
      <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-20 md:pt-40 md:pb-24">
        <div className="absolute inset-0 -z-10 h-[600px] w-full bg-grid-pattern opacity-[0.4] grid-bg pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="mx-auto max-w-4xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Empowering Precision
            <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-500">
              Accountability
            </span>
          </h1>
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl text-base sm:text-lg md:text-xl text-slate-500 leading-relaxed px-4">
            Different sectors leverage Karmameter&apos;s structured data to
            uncover truth, optimize policy, and strengthen democratic
            institutions.
          </p>
        </div>
      </section>
      <section className="py-12 pb-20 sm:pb-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-32">
          <UseCaseSection
            badgeText="For Investigative Journalists"
            badgeColorClasses="bg-blue-50 text-blue-700 ring-blue-700/10"
            title="Data-Driven Storytelling"
            description="Uncover hidden patterns in procurement and budget allocation. Our searchable database transforms chaotic public records into structured leads, allowing you to substantiate claims with hard numbers."
            bullets={journalistsBullets}
            rightContent={<JournalistsMock />}
          />
          <UseCaseSection
            reverse
            badgeText="For Academic Researchers"
            badgeColorClasses="bg-purple-50 text-purple-700 ring-purple-700/10"
            title="Longitudinal Governance Studies"
            description="Access standardized datasets for cross-jurisdictional analysis. Track budget efficiency over decades and correlate governance scores with economic outcomes."
            bullets={researchersBullets}
            rightContent={<ResearchersMock />}
          />
          <UseCaseSection
            badgeText="For Policy Analysts"
            badgeColorClasses="bg-emerald-50 text-emerald-700 ring-emerald-700/10"
            title="Benchmarking & Efficiency"
            description="Identify best practices by benchmarking municipal performance against similar jurisdictions. Create evidence-based policy recommendations backed by peer-reviewed metrics."
            bullets={policyBullets}
            rightContent={<PolicyMock />}
          />
          <UseCaseSection
            reverse
            badgeText="For Informed Citizens"
            badgeColorClasses="bg-orange-50 text-orange-700 ring-orange-700/10"
            title="Verifiable Track Records"
            description="Look beyond campaign rhetoric. Access simplified profile cards for public officials with high-level 'Karma Scores' based on attendance, voting records, and project completion rates."
            bullets={citizensBullets}
            rightContent={<CitizensMock />}
          />
        </div>
      </section>
    </>
  );
}

