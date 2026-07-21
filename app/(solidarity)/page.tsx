/* eslint-disable @next/next/no-img-element -- self-hosted static assets in /public; next/image can be layered in later */
import {
  SolidarityInteractions,
  BreakingPointVideo,
  ShareButton,
} from "./client";

const placards = [
  {
    title: "RESIGN.",
    body: "Education Minister Dharmendra Pradhan must go.",
    rotate: "-2deg",
    tape: "tl" as const,
    bodyClass: "text-2xl md:text-3xl",
    img: { src: "/protest/dharmendra-pradhan.jpg", alt: "Dharmendra Pradhan" },
    delay: "",
  },
  {
    title: "FREE SONAM WANGCHUK.",
    body: "End the forced hospitalisation.",
    rotate: "3deg",
    tape: "tr" as const,
    bodyClass: "text-2xl md:text-3xl",
    img: {
      src: "/protest/sonam-wangchuk-hospital.webp",
      alt: "Sonam Wangchuk being taken to hospital, 18 July 2026",
    },
    delay: "delay-100",
  },
  {
    title: "APOLOGISE.",
    body: "From the BJP's top leadership, the Delhi Police Commissioner, and everyone responsible for the 20 July lathi charge.",
    rotate: "-1deg",
    tape: "tl" as const,
    bodyClass: "text-xl md:text-2xl",
    img: null,
    delay: "delay-200",
  },
  {
    title: "END PAPER LEAKS.",
    body: "Fix the broken exam system.",
    rotate: "2deg",
    tape: "tr" as const,
    bodyClass: "text-2xl md:text-3xl",
    img: null,
    delay: "",
  },
  {
    title: "JUSTICE FOR THE ASPIRANTS WE LOST.",
    body: "Compensation for the NEET families.",
    rotate: "-3deg",
    tape: "tl" as const,
    bodyClass: "text-xl md:text-2xl",
    img: null,
    delay: "delay-100",
  },
  {
    title: "PEACEFUL PROTEST IS NOT A CRIME.",
    body: "The right to dissent is constitutional.",
    rotate: "1deg",
    tape: "tr" as const,
    bodyClass: "text-2xl md:text-3xl",
    img: null,
    delay: "delay-200",
  },
];

const stats = [
  { value: "10,000+", label: "Marched in solidarity" },
  { value: "~180", label: "Injured in lathi charge" },
  { value: "21", label: "Days of hunger strike" },
  { value: "MAY '26", label: "Protests ongoing since" },
];

const marqueeItems = [
  "#CHALOSANSAD",
  "#COCKROACHJANTAPARTY",
  "#JUSTICEFORYOUTH",
  "WE WILL NOT BE SILENCED",
];

const sources = [
  {
    outlet: "Al Jazeera",
    title: "Why have India's Gen Z protesters called for a march to parliament?",
    href: "https://www.aljazeera.com/features/2026/7/19/why-have-indias-gen-z-protesters-called-for-a-march-to-parliament",
  },
  {
    outlet: "Al Jazeera",
    title: "Police attack Cockroach activists as thousands march on parliament",
    href: "https://www.aljazeera.com/news/2026/7/20/police-attack-cockroach-activists-as-thousands-march-on-indian-parliament",
  },
  {
    outlet: "NPR",
    title: "India's youth-led Cockroach movement vows to continue after crackdown",
    href: "https://www.npr.org/2026/07/21/g-s1-134722/indias-youth-led-cockroach-movement-vows-to-continue-protest-after-police-crackdown",
  },
  {
    outlet: "Wikipedia",
    title: "2026 Delhi Jantar Mantar protests",
    href: "https://en.wikipedia.org/wiki/2026_Delhi_Jantar_Mantar_protests",
  },
];

export default function SolidarityHome() {
  return (
    <main>
      {/* Top bar */}
      <header className="fixed top-0 left-0 z-50 flex h-20 w-full items-center justify-between border-b border-slate-700 bg-slate-900/80 px-6 backdrop-blur-md md:px-10">
        <div className="font-display text-3xl font-black uppercase tracking-wider text-white">
          KARMAMETER.IN
        </div>
        <div className="flex items-center gap-6">
          <a
            className="hidden text-xs font-bold uppercase tracking-wider transition-colors hover:text-red-600 md:block"
            href="#demands"
          >
            The Demands
          </a>
          <a
            className="hidden text-xs font-bold uppercase tracking-wider transition-colors hover:text-red-600 md:block"
            href="#whats-happening"
          >
            What&apos;s Happening
          </a>
          <a
            className="hidden text-xs font-bold uppercase tracking-wider transition-colors hover:text-red-600 md:block"
            href="#sources"
          >
            Sources
          </a>
          <a
            href="#sources"
            className="bg-red-600 px-6 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-red-600"
          >
            Stand With Them
          </a>
          <ShareButton />
        </div>
      </header>

      {/* Chapter 1 — Hero */}
      <section className="relative flex h-screen min-h-[800px] w-full flex-col justify-end overflow-hidden pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Illustrative hero image (see credits). */}
          <img
            alt="Protest scene — illustration"
            className="animate-slow-zoom h-full w-full object-cover"
            src="/protest/hero.jpg"
          />
          <div className="hero-overlay absolute inset-0" />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 md:px-10 md:pb-32">
          <div className="reveal mb-8 inline-flex items-center gap-3 rounded-full border border-slate-700 bg-slate-800/80 px-5 py-3 shadow-lg backdrop-blur-sm">
            <span className="live-dot h-3 w-3 rounded-full" />
            <span className="text-xs font-bold uppercase tracking-widest text-slate-50">
              LIVE • Independent citizen page • Updated 21 July 2026
            </span>
          </div>
          <h1 className="reveal delay-100 font-display mb-8 max-w-5xl text-[64px] uppercase leading-[0.85] tracking-tighter text-white drop-shadow-2xl md:text-[120px]">
            We Stand With <br />
            <span className="text-red-600">India&apos;s Youth.</span>
          </h1>
          <p className="reveal delay-200 font-body mb-12 max-w-3xl text-xl leading-relaxed text-slate-300 md:text-2xl">
            The streets have spoken. Solidarity with the students, aspirants, and
            citizens demanding accountability. Here is what they demand.
          </p>
          <div className="reveal delay-300 flex flex-wrap gap-4">
            <a
              className="bg-red-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:bg-white hover:text-red-600"
              href="#whats-happening"
            >
              What&apos;s happening
            </a>
            <a
              className="border border-slate-700 bg-slate-800 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:border-white"
              href="#sources"
            >
              Verified sources
            </a>
          </div>
        </div>
      </section>

      {/* Chapter 2 — Snapshot stats band */}
      <section className="border-y border-red-800 bg-red-600 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="reveal grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display mb-2 text-5xl text-white md:text-7xl">
                  {s.value}
                </div>
                <div className="text-xs font-bold uppercase tracking-wider text-red-200">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chapter 3 — The Wall of Demands */}
      <section
        className="relative overflow-hidden bg-slate-900 py-24 md:py-40"
        id="demands"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-10">
          <div className="reveal mb-20 text-center">
            <h2 className="font-display text-5xl uppercase tracking-tight text-white md:text-7xl">
              The Wall of Demands
            </h2>
            <div className="mx-auto mt-8 h-1 w-24 bg-red-600" />
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16 lg:grid-cols-3">
            {placards.map((p) => (
              <div
                key={p.title}
                className={`placard reveal ${p.delay} p-10 md:p-12`}
                style={{ transform: `rotate(${p.rotate})` }}
              >
                <div className={p.tape === "tl" ? "tape-corner-tl" : "tape-corner-tr"} />
                <div className="flex flex-col gap-6">
                  {p.img && (
                    <img
                      alt={p.img.alt}
                      loading="lazy"
                      className="h-24 w-24 border-2 border-white object-cover shadow-lg grayscale transition-all hover:grayscale-0"
                      src={p.img.src}
                    />
                  )}
                  <h3 className="font-display text-4xl font-black uppercase leading-none text-slate-900 md:text-5xl">
                    {p.title}
                    <br />
                    <br />
                    <span
                      className={`font-body font-bold text-slate-700 ${p.bodyClass}`}
                    >
                      {p.body}
                    </span>
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Marquee ticker */}
      <div className="flex w-full overflow-hidden whitespace-nowrap border-y border-slate-700 bg-white py-4 text-slate-900">
        <div className="animate-marquee font-display flex items-center gap-10 text-2xl font-bold uppercase tracking-widest">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>{item}</span>
              <span>•</span>
            </span>
          ))}
        </div>
      </div>

      {/* Chapter 4 — The Faces of This Moment */}
      <section className="border-t border-slate-700 bg-slate-900 py-24 md:py-40">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="reveal mb-20 text-center">
            <h2 className="font-display text-5xl uppercase tracking-tight text-white md:text-7xl">
              The Faces of This Moment
            </h2>
            <div className="mx-auto mt-8 h-1 w-24 bg-red-600" />
          </div>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Face 1 — Dharmendra Pradhan */}
            <div className="reveal flex flex-col gap-8 border border-slate-700 bg-slate-800 p-8 md:flex-row">
              <div className="w-full md:w-1/2">
                <img
                  alt="Dharmendra Pradhan"
                  loading="lazy"
                  className="h-full w-full object-cover shadow-2xl grayscale transition-all duration-700 hover:grayscale-0"
                  src="/protest/dharmendra-pradhan.jpg"
                />
                <p className="mt-2 text-[10px] font-bold uppercase text-slate-300/50">
                  Ministry of Education (GODL-India)
                </p>
              </div>
              <div className="flex w-full flex-col justify-center md:w-1/2">
                <h3 className="font-display mb-1 text-3xl text-white">
                  Dharmendra Pradhan
                </h3>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-red-600">
                  Union Education Minister
                </p>
                <p className="text-slate-300">
                  Protesters are demanding his resignation over exam-system
                  failures.
                </p>
              </div>
            </div>
            {/* Face 2 — Sonam Wangchuk */}
            <div className="reveal delay-100 flex flex-col gap-8 border border-slate-700 bg-slate-800 p-8 md:flex-row">
              <div className="w-full md:w-1/2">
                <img
                  alt="Sonam Wangchuk being taken to hospital, 18 July 2026"
                  loading="lazy"
                  className="h-full w-full object-cover shadow-2xl grayscale transition-all duration-700 hover:grayscale-0"
                  src="/protest/sonam-wangchuk-hospital.webp"
                />
                <p className="mt-2 text-[10px] font-bold uppercase text-slate-300/50">
                  Pelph Hoters / Wikimedia Commons (CC BY-SA 4.0)
                </p>
              </div>
              <div className="flex w-full flex-col justify-center md:w-1/2">
                <h3 className="font-display mb-1 text-3xl text-white">
                  Sonam Wangchuk
                </h3>
                <p className="mb-4 text-xs font-bold uppercase tracking-widest text-red-600">
                  Ladakhi education &amp; climate activist
                </p>
                <p className="text-slate-300">
                  On hunger strike since late June; forcibly taken to hospital on
                  18 July. Protesters demand his release.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 5 — The Breaking Point (with video) */}
      <section className="bg-slate-800 py-24 md:py-40" id="whats-happening">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="flex flex-col items-center gap-16 lg:flex-row">
            <div className="reveal w-full lg:w-1/2">
              <BreakingPointVideo />
              <p className="mt-4 text-sm font-bold uppercase text-slate-300">
                Footage from the protests — via social media.
              </p>
            </div>
            <div className="reveal delay-100 w-full lg:w-1/2">
              <h2 className="font-display mb-8 text-5xl uppercase tracking-tight text-white md:text-6xl">
                The Breaking Point
              </h2>
              <div className="font-body space-y-6 text-lg text-slate-300">
                <p>
                  For weeks, students and civil-society members have gathered
                  peacefully to demand transparency in the education sector and
                  accountability for repeated exam-system failures.
                </p>
                <p>
                  The situation escalated on 20 July, when a march toward
                  Parliament was met with lathi charges and tear gas. News
                  reports put the injured at around 180. Days earlier, activist
                  Sonam Wangchuk was forcibly taken to hospital during his hunger
                  strike.
                </p>
                <blockquote className="font-display my-10 border-l-4 border-red-600 py-2 pl-6 text-2xl italic text-white md:text-3xl">
                  &ldquo;We came with books and questions. They answered with
                  lathis and silence.&rdquo;
                </blockquote>
                <a
                  className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-red-600 transition-colors hover:text-white"
                  href="#sources"
                >
                  View verified sources
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chapter 6 — Verified Sources */}
      <section className="border-t border-slate-700 bg-slate-900 py-24 md:py-32" id="sources">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="reveal mb-6 text-center">
            <h2 className="font-display text-5xl uppercase tracking-tight text-white md:text-7xl">
              Verified Sources
            </h2>
            <div className="mx-auto mt-8 h-1 w-24 bg-red-600" />
          </div>
          <p className="reveal mx-auto mb-16 max-w-2xl text-center text-slate-300">
            Reports evolve as the story develops. Read the primary coverage, and
            verify before you share.
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {sources.map((s) => (
              <a
                key={s.href}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group flex items-start justify-between gap-4 border border-slate-700 bg-slate-800 p-6 transition-all hover:border-red-600"
              >
                <div>
                  <div className="mb-1 text-xs font-bold uppercase tracking-widest text-red-600">
                    {s.outlet}
                  </div>
                  <div className="font-body text-lg text-white">{s.title}</div>
                </div>
                <span className="material-symbols-outlined text-slate-300 transition-colors group-hover:text-white">
                  arrow_outward
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="flex w-full flex-col items-center gap-6 border-t-4 border-red-600 bg-slate-950 px-6 py-20 text-center md:px-10">
        <div className="font-display flex items-center gap-3 text-2xl font-bold uppercase tracking-wider text-white">
          <span className="material-symbols-outlined text-3xl text-red-600">
            policy
          </span>
          KARMAMETER.IN
        </div>

        <div className="max-w-2xl">
          <h3 className="font-display mb-2 text-3xl uppercase tracking-wide text-white">
            This domain is available to serve the movement.
          </h3>
          <p className="font-body leading-relaxed text-slate-300">
            karmameter.in is offered to whoever can put it to better use for this
            cause. If you&apos;re an organiser, student union, journalist, lawyer,
            or civic group who can carry this forward, write to us.
          </p>
        </div>

        <a
          href="mailto:contact@karmameter.in?subject=Karmameter.in%20for%20the%20movement"
          className="bg-red-600 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white hover:text-red-600"
        >
          contact@karmameter.in
        </a>

        <p
          id="disclaimer"
          className="mt-6 max-w-3xl text-xs leading-relaxed text-slate-300/70"
        >
          This is an independent, citizen-run page. It is not affiliated with,
          endorsed by, or an official channel of the Cockroach Janta Party, any
          political party, the police, or any government body. Facts summarised
          here are drawn from the cited public news reports and may change —
          verify against primary sources. Nothing here is legal advice.
        </p>

        <p className="max-w-3xl text-[10px] uppercase tracking-wide text-slate-300/40">
          Image credits: Ministry of Education (GODL-India); Pelph Hoters /
          Wikimedia Commons (CC BY-SA 4.0). Hero image is an illustration. Video
          via social media.
        </p>

        <div className="mt-4 flex flex-wrap justify-center gap-8 text-xs font-bold uppercase tracking-widest">
          <a
            className="text-slate-300 underline-offset-4 transition-all hover:text-white hover:underline"
            href="#sources"
          >
            Verified Sources
          </a>
          <a
            className="text-slate-300 underline-offset-4 transition-all hover:text-white hover:underline"
            href="mailto:contact@karmameter.in?subject=Karmameter.in%20domain"
          >
            Domain Offer
          </a>
          <a
            className="text-slate-300 underline-offset-4 transition-all hover:text-white hover:underline"
            href="mailto:contact@karmameter.in"
          >
            Contact
          </a>
        </div>

        <p className="mt-4 text-xs text-slate-300/50">
          © 2026 Karmameter.in — a digital protest wall.
        </p>
      </footer>

      <SolidarityInteractions />
    </main>
  );
}
