export function MethodologyContent() {
  return (
    <main className="w-full lg:flex-1 lg:pl-8">
      <div
        id="introduction"
        className="max-w-3xl border-b border-slate-200 pb-10"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-6">
          Our Methodology
        </h1>
        <p className="text-xl leading-relaxed text-slate-600">
          At Karmameter, we believe that public trust must be earned through
          rigorous, verifiable data. Our methodology is built on a commitment to
          absolute objectivity, transparency, and data integrity. We do not
          editorialize; we quantify.
        </p>
      </div>

      <div
        id="data-acquisition"
        className="max-w-3xl py-12 border-b border-slate-200"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-slate-600">
            <span className="material-symbols-outlined text-[18px]">
              cloud_download
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            1. Data Acquisition
          </h2>
        </div>
        <p className="mb-6 text-slate-600 leading-relaxed">
          We aggregate raw data from over 12,000 unique municipal and federal
          sources. Our automated scrapers run daily cycles to ingest records
          from disparate formats, ensuring real-time accountability.
        </p>
        <div className="my-8 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h4 className="text-sm font-semibold text-slate-900 mb-4">
            Ingestion Sources
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-slate-400">
                description
              </span>
              <div>
                <span className="block text-sm font-medium text-slate-900">
                  PDF Disclosures
                </span>
                <span className="text-xs text-slate-500">
                  Asset declarations, expense reports
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-slate-400">
                public
              </span>
              <div>
                <span className="block text-sm font-medium text-slate-900">
                  Official Gazettes
                </span>
                <span className="text-xs text-slate-500">
                  Legal notices, tender awards
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-slate-400">
                meeting_room
              </span>
              <div>
                <span className="block text-sm font-medium text-slate-900">
                  Municipal Portals
                </span>
                <span className="text-xs text-slate-500">
                  Meeting minutes, attendance logs
                </span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
              <span className="material-symbols-outlined text-slate-400">
                gavel
              </span>
              <div>
                <span className="block text-sm font-medium text-slate-900">
                  Court Records
                </span>
                <span className="text-xs text-slate-500">
                  Public litigation involving officials
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="verification" className="max-w-3xl py-12 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-slate-600">
            <span className="material-symbols-outlined text-[18px]">
              verified
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            2. Verification Process
          </h2>
        </div>
        <p className="mb-6 text-slate-600 leading-relaxed">
          Raw data is often messy or incomplete. We employ a multi-stage
          verification pipeline that combines algorithmic anomaly detection with
          human-in-the-loop auditing for high-stakes records.
        </p>
        <div className="bg-slate-900 rounded-lg p-6 font-mono text-sm text-slate-300 my-6 overflow-x-auto">
          <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-xs text-slate-500 ml-2">
              verification_logic.py
            </span>
          </div>
          <p>
            <span className="text-purple-400">def</span>{" "}
            <span className="text-blue-400">verify_record</span>(record):
          </p>
          <p className="pl-4">
            <span className="text-slate-500">
              # Cross-reference with secondary source
            </span>
          </p>
          <p className="pl-4">
            <span className="text-purple-400">if</span> record.source_id{" "}
            <span className="text-purple-400">not in</span> trusted_sources:
          </p>
          <p className="pl-8">flag_for_human_review(record)</p>
          <p className="pl-8">
            <span className="text-purple-400">return</span>{" "}
            <span className="text-orange-400">&quot;PENDING_REVIEW&quot;</span>
          </p>
          <p className="pl-4" />
          <p className="pl-4">
            <span className="text-slate-500">
              # Check for statistical anomalies in spending
            </span>
          </p>
          <p className="pl-4">
            <span className="text-purple-400">if</span> record.amount &gt;{" "}
            {"(avg_spend * "}
            <span className="text-orange-400">3.0</span>
            {"):"}
          </p>
          <p className="pl-8">
            record.anomaly_score = <span className="text-orange-400">HIGH</span>
          </p>
        </div>
        <ul className="list-disc pl-5 space-y-2 text-slate-600">
          <li>
            <strong>Entity Resolution:</strong> Merging duplicate profiles (e.g.
            &quot;J. Doe&quot; vs &quot;John Doe&quot;).
          </li>
          <li>
            <strong>Anomaly Detection:</strong> Flagging budget outliers that
            deviate by &gt;2 standard deviations.
          </li>
          <li>
            <strong>Human Audit:</strong> A team of data analysts manually
            reviews all flagged items before publication.
          </li>
        </ul>
      </div>

      <div id="scoring" className="max-w-3xl py-12 border-b border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-slate-600">
            <span className="material-symbols-outlined text-[18px]">
              calculate
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            3. Scoring Framework
          </h2>
        </div>
        <p className="mb-6 text-slate-600 leading-relaxed">
          The &quot;Karma Score&quot; is a normalized index from 0 to 100
          representing an official&apos;s adherence to fiscal responsibility and
          transparency mandates. It is calculated via a weighted average of
          three core pillars.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
          <div className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col items-center text-center">
            <div className="relative h-20 w-20 mb-4">
              <svg
                className="h-full w-full rotate-[-90deg]"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-slate-100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-slate-800"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="40, 100"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-900">
                40%
              </div>
            </div>
            <h4 className="font-semibold text-slate-900">Fiscal Efficiency</h4>
            <p className="text-xs text-slate-500 mt-2">
              Budget utilization vs. project completion rates.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col items-center text-center">
            <div className="relative h-20 w-20 mb-4">
              <svg
                className="h-full w-full rotate-[-90deg]"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-slate-100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-slate-800"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="35, 100"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-900">
                35%
              </div>
            </div>
            <h4 className="font-semibold text-slate-900">Transparency</h4>
            <p className="text-xs text-slate-500 mt-2">
              Timeliness of disclosures and public record availability.
            </p>
          </div>
          <div className="p-5 rounded-xl border border-slate-200 bg-white flex flex-col items-center text-center">
            <div className="relative h-20 w-20 mb-4">
              <svg
                className="h-full w-full rotate-[-90deg]"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-slate-100"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="text-slate-800"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="25, 100"
                  strokeWidth="3"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-900">
                25%
              </div>
            </div>
            <h4 className="font-semibold text-slate-900">Presence</h4>
            <p className="text-xs text-slate-500 mt-2">
              Attendance in council meetings and voting records.
            </p>
          </div>
        </div>
      </div>

      <div id="peer-review" className="max-w-3xl py-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-slate-100 text-slate-600">
            <span className="material-symbols-outlined text-[18px]">groups</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">
            4. Peer Review &amp; Feedback
          </h2>
        </div>
        <p className="mb-6 text-slate-600 leading-relaxed">
          We recognize that algorithms can contain implicit biases. Our scoring
          logic is documented and available for structured review by qualified
          researchers and policy experts. We regularly invite external feedback
          to refine our weighting mechanisms and address potential blind spots.
        </p>
        <div className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <span className="material-symbols-outlined text-primary mt-1">
            info
          </span>
          <div>
            <h4 className="font-semibold text-sm text-slate-900">
              Suggest a Modification
            </h4>
            <p className="text-sm text-slate-600 mt-1">
              If you believe a specific metric unfairly penalizes rural
              municipalities or has other systemic issues, please reach out via
              our{" "}
              <a
                href="/contact"
                className="text-primary underline decoration-slate-300 underline-offset-2"
              >
                contact form
              </a>{" "}
              or contact our Data Ethics Board.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

