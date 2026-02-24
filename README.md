# 🏛 Karmameter – Public Accountability Infrastructure

This repository contains the public web experience for **Karmameter**, an experimental platform for measuring and visualizing public accountability in India.

The README is intentionally written less like a typical app boilerplate and more like a design/architecture note for the project.

---

## 1. Overview

Karmameter is a civic‑tech data platform that aggregates, normalizes, and scores publicly available data about:

- Politicians  
- Government officials  
- Constituencies  
- Public budgets  
- Development projects  
- Election promises

The goal is to create a **structured, verifiable, and transparent scoring system** for public accountability – one that makes fragmented public data usable for citizens, journalists, researchers, and policy practitioners.

---

## 1️⃣ Vision – Why This Exists

India generates a huge volume of public data – budgets, tenders, affidavits, meeting minutes, RTI responses – but most of it is:

- **Fragmented** across thousands of portals and PDFs  
- **Unstructured** and hard to compare across time or jurisdictions  
- **Opaque to citizens**, journalists, and even policy researchers

As a result:

- Citizens rarely track **promises vs. delivery**  
- Journalists and researchers spend weeks just **cleaning data** instead of analysing it  
- Accountability conversations are driven by **outrage and anecdotes**, not structured evidence

**Karmameter’s goal** is to:

- Aggregate publicly available governance data  
- Verify and normalize it  
- Convert it into **transparent, explainable scores and narratives** around public performance

The intent is **clarity, not outrage**. If this works:

- Citizens can quickly understand performance in their constituency  
- Journalists and researchers get a clean starting point for deeper work  
- Policy debates can move from rhetoric to **evidence-backed discussion**

---

## 2️⃣ Core Principles

Karmameter is guided by a few non‑negotiable principles:

- **Data‑first, not opinion‑first** – We describe what the data shows; interpretation is left to users.  
- **Transparent methodology** – Scoring logic and data transformations are documented and open to expert review.  
- **Verifiable sources only** – Every claim should trace back to an official or otherwise reputable public source.  
- **No anonymous manipulation** – Data or methodology changes should be attributable and auditable.  
- **Safety over virality** – Accuracy and fairness matter more than being shareable.

If the methodology is not transparent and defensible, **the project has no credibility**.

---

## 3️⃣ System Architecture (Conceptual)

This repo currently holds the **Next.js frontend**, but the overall system is designed around four major components.

### A. Data Sources

Target classes of input data:

- Government APIs and open data portals  
- RTI responses and disclosures  
- Budget and audit PDFs  
- Public tenders and procurement data  
- Election affidavits and candidate disclosures  
- Legislative records (attendance, questions, voting)

Key questions:

- How do we validate **authenticity** of each source?  
- How do we handle **conflicting records** across different documents?

If the data ingestion layer is weak, **every score built on top of it collapses**.

### B. Data Pipeline

Planned pipeline:

- Scraping / ingestion layer (Python workers, scheduled jobs)  
- Parsing and normalization (text extraction, schema mapping)  
- Data cleaning and de‑duplication  
- Storage in a relational store (e.g. Postgres / Supabase)  
- Versioning of records and schemas

Operational concerns:

- **Update frequency** per data source (daily / weekly / monthly)  
- **Error handling** and retries for failed ingestions  
- **Audit logs** for any manual corrections or backfills

### C. Scoring Engine

The scoring engine is the core of Karmameter’s value.

Illustrative inputs:

- Budget utilization %  
- Project completion rates and delays  
- Criminal cases/status against representatives  
- Attendance and participation in legislative bodies  
- Manifesto / promise fulfilment ratio

Design constraints:

- Each metric has a **clearly defined calculation** and data source.  
- Weight distributions and formulas are **documented and reviewable**.  
- Scores are **historical**, not just point‑in‑time – trends over time matter.  
- A governance mechanism (internal or external) defines and reviews weights.

Legitimacy depends on **who sets the rules** and how easy it is to challenge them.

### D. Frontend UX

Core UX expectations for this Next.js app:

- Search and browse by **constituency, person, or office**  
- Profile pages with **score breakdowns** and supporting metrics  
- Trend graphs over time for key indicators  
- Clear **source citations** for each metric  
- Plain‑language explanations of what each score means (and does *not* mean)

If users cannot verify sources in one or two clicks, **trust evaporates**.

---

## 4️⃣ Legal & Risk Considerations (India‑specific)

Working in public accountability in India requires deliberate risk design.

Karmameter is built with these guardrails:

- Uses data sourced from the **public domain** (official portals, disclosures, and other reputable public records).  
- No intent to defame; the platform summarizes data and clearly states **limitations and caveats**.  
- Methodology and assumptions are described in human‑readable form.  
- There is a **correction / appeal mechanism** – affected parties can contest data or scoring via the contact channel.

Anyone building or deploying this should ask:

- Are you prepared to respond to a **legal notice**?  
- Are logs and sources good enough to reconstruct how a number was computed?

Design the system defensively so that good‑faith work is clearly distinguishable from smear campaigns.

---

## 5️⃣ Security & Integrity

Because the subject is politically sensitive, integrity and resilience matter as much as features.

Key concerns and planned mitigations:

- **Rate limiting** and basic abuse protection on public endpoints  
- **Tamper‑evident logging** for admin and data‑modification actions  
- Regular **backups** of both raw and processed data  
- Infrastructure redundancy and the ability to move hosting if required  
- Basic DDoS mitigation and monitoring

The goal is not “perfect security”, but a system that fails **gracefully and audibly**, not silently.

---

## 6️⃣ Roadmap (Phased Build Plan)

This is a long‑term project. Trying to “boil the ocean” on day one is a guaranteed failure.

**Phase 1 – MVP**

- Focus on a **single state or city**  
- Limited, clearly defined metrics  
- Some **manual data entry and validation** is acceptable  
- Primary audience: internal exploration and close collaborators

**Phase 2 – Automation**

- Build scraping / ingestion pipelines for the most valuable sources  
- Introduce scheduled updates and data freshness guarantees  
- Harden schemas, add basic audit logging and corrections flow

**Phase 3 – Public credibility**

- Publish a detailed **methodology paper**  
- Document the scoring logic fully for expert review  
- Invite structured feedback from researchers, journalists, and domain experts

**Phase 4 – Community layer**

- Citizen feedback on data quality and missing records  
- Crowdsourced verification workflows with clear review gates  
- Partnerships with civil‑society and research organizations

Each phase should be **stable** before the next begins.

---

## 7️⃣ Monetization (If Ever)

The default stance is **mission‑first, not monetization‑first**. Any revenue strategy must not compromise independence.

Possible, carefully chosen options:

- Grants and research funding  
- Donations from individuals and institutions  
- Limited data/API partnerships for civic or academic use

Hard constraints:

- No pay‑to‑play visibility  
- No selling influence or “score fixing”  
- Any partnership must be **publicly discloseable** without embarrassment

Credibility, once lost, is almost impossible to regain.

---

## 8️⃣ Architecture & Tech Stack

### Stack philosophy

- Keep infrastructure **minimal and boring**  
- Use **Next.js as the unified app server** (UI + API)  
- Keep **scoring logic server‑side only**  
- Maintain a strict separation between **raw data** and **computed scores**  
- Prioritise **auditability and correctness over raw speed**

### Core framework

- **Next.js (App Router)**
  - Frontend UI and routing
  - API Route Handlers under `/app/api/*`
  - Server Actions for admin and internal ops
  - Middleware for auth / rate‑limiting
  - Edge runtime support where it makes sense

- **TypeScript**
  - Strict mode enabled for end‑to‑end type safety

### Backend layer (inside Next.js)

- Route Handlers under `/app/api/*` for REST‑style endpoints  
- Server Actions for privileged admin flows  
- **Zod** for schema validation of all inputs  
- Auth via **NextAuth** or a small custom JWT‑based layer  
- Rate‑limiting middleware (backed by Redis)

### Database

- Primary store: **PostgreSQL** (Supabase / Neon / Railway recommended)

Why Postgres:

- Rich **JSONB** support for semi‑structured data  
- Strong relational guarantees for core entities (politicians, constituencies, scores)  
- Good fit for **audit logging** and historical versions  
- Well‑understood for future analytics and warehouse exports

### ORM

- **Prisma ORM**
  - Schema‑driven development
  - Safe migrations and rollbacks
  - Strong TypeScript types across the stack

### Caching layer

- **Redis** (e.g. Upstash or self‑hosted)
  - Cache computed scores and heavy constituency pages  
  - Backing store for rate‑limiting tokens  
  - Potential short‑term queue for small background jobs

### Background jobs

Long‑running scraping and ETL tasks do **not** run in the web process.

- Option A: Separate Node.js worker service (Railway/Fly.io/etc.)  
- Option B: Serverless cron (Vercel Cron, GitHub Actions) invoking ingestion endpoints  
- Option C: Dedicated scraping service in Python for heavy PDF / NLP work

### Hosting

- Frontend + API: **Vercel** (or similar)  
- Database: **Supabase / Neon / Railway**  
- Redis: **Upstash** or managed Redis  
- Workers: Railway / Fly.io / other container host

### Observability

- Logging: structured logs (e.g. **Pino**)  
- Error tracking: **Sentry**  
- Product analytics (optional, privacy‑respecting): **PostHog** or similar

The overarching philosophy: **stability and observability over novelty**.

---

## 9️⃣ Database Schema (Initial Structure)

Initial relational design focuses on keeping **raw facts** separate from **computed scores**.

### 9.1 Politicians

```sql
Politician
-----------
id uuid primary key
full_name text
date_of_birth date
party_id uuid references Party(id)
constituency_id uuid references Constituency(id)
position text           -- MP, MLA, Minister etc
election_year int
total_assets numeric
criminal_cases int
education text
created_at timestamp
updated_at timestamp
```

### 9.2 Political Parties

```sql
Party
------
id uuid primary key
name text
abbreviation text
symbol_url text
created_at timestamp
updated_at timestamp
```

### 9.3 Constituencies

```sql
Constituency
--------------
id uuid primary key
name text
state text
type text       -- LOK_SABHA, VIDHAN_SABHA
population bigint
created_at timestamp
updated_at timestamp
```

### 9.4 Budgets

```sql
Budget
--------
id uuid primary key
constituency_id uuid references Constituency(id)
financial_year text
allocated_amount numeric
spent_amount numeric
source_url text
created_at timestamp
updated_at timestamp
```

### 9.5 Projects

```sql
Project
---------
id uuid primary key
title text
description text
constituency_id uuid references Constituency(id)
politician_id uuid references Politician(id) null
allocated_budget numeric
status text          -- PLANNED, ONGOING, COMPLETED, DELAYED
start_date date
end_date date
completion_percentage float
source_url text
created_at timestamp
updated_at timestamp
```

### 9.6 Promises (Manifesto Tracking)

```sql
Promise
----------
id uuid primary key
politician_id uuid references Politician(id)
description text
category text
status text       -- NOT_STARTED, IN_PROGRESS, FULFILLED, BROKEN
evidence_url text
created_at timestamp
updated_at timestamp
```

### 9.7 Attendance Records

```sql
Attendance
-------------
id uuid primary key
politician_id uuid references Politician(id)
session_year text
attendance_percentage float
source_url text
created_at timestamp
updated_at timestamp
```

### 9.8 Scores (Computed, Not Raw)

```sql
Score
--------
id uuid primary key
politician_id uuid references Politician(id)
overall_score float
promise_score float
attendance_score float
budget_score float
criminal_penalty float
formula_version text
last_computed_at timestamp
```

Scores are **derived artefacts**. They should be recomputed by scheduled jobs and can be regenerated from raw data if needed.

### 9.9 Audit Logs (Critical)

```sql
AuditLog
----------
id uuid primary key
entity_type text
entity_id uuid
action text        -- CREATE, UPDATE, DELETE, RECOMPUTE
changed_by text
old_data jsonb
new_data jsonb
timestamp timestamp
```

Audit logs are essential for legal defensibility and for debugging how any single score was produced.

---

## 10️⃣ Scoring Engine Design

The scoring engine should live in a **separate, versioned module** and never be mixed with request‑handling logic.

Example (illustrative only):

```text
overall_score =
  (promise_score * 0.35) +
  (attendance_score * 0.20) +
  (budget_efficiency_score * 0.30) -
  (criminal_penalty * 0.15)
```

Guidelines:

- Every sub‑score (promise, attendance, budget, etc.) must have a **clear definition and source mapping**.  
- The formula should be **versioned**, and `formula_version` stored with each `Score` row.  
- Changes to weights or sub‑scores should go through a **governance and review** process, not ad‑hoc edits.  
- Historical scores must be reproducible from stored raw data + formula version.

---

## 11️⃣ API Structure (Next.js)

Suggested public/internal API surface under `/app/api`:

```text
/api/politicians
/api/politicians/[id]
/api/constituencies
/api/projects
/api/scores/recompute
/api/admin/*
```

Implementation notes:

- Use middleware for **auth and rate‑limiting**.  
- Use **Zod** schemas to validate all incoming payloads.  
- All sensitive configuration must come from **server‑only environment variables**.

---

## 12️⃣ Data Ingestion Pipeline

The ingestion pipeline should evolve in phases.

**Phase 1 – Manual / Semi‑manual**

- Admin‑only CSV uploads via a simple interface  
- Manual verification and correction of records

**Phase 2 – Programmatic ingestion**

- Scraping scripts for key portals  
- PDF parsing for budgets and affidavits  
- Integrations with government open data APIs where available

**Phase 3 – Scheduled automation**

- Scheduled scrapers and ETL jobs  
- Automated freshness checks and alerts  
- Better monitoring of failure rates and anomalies

At every phase, **raw data remains immutable**; fixes are applied as new records plus audit log entries.

---

## 13️⃣ Security Strategy (Implementation Level)

Complementing the high‑level security principles above:

- Role‑based access control (e.g. `ADMIN`, `EDITOR`, `VIEWER`)  
- No public write access to core data tables  
- Immutable raw data; corrections are additive, not destructive  
- All score recalculations logged in `AuditLog`  
- API rate‑limiting and basic DDoS mitigation at the edge  
- Regular backups and tested restore procedures

---

## 14️⃣ Deployment Strategy

Environments:

- **Development** – local + preview deployments  
- **Staging** – mirrors production schema with anonymised / synthetic data  
- **Production** – locked‑down environment with restricted access

Operational practices:

- Automated **Prisma migrations** as part of CI/CD  
- Daily database snapshots and off‑site backups  
- Simple runbooks for common operations (recompute scores, rollback deployment, restore backup)

---

## 15️⃣ Future Scalability

The schema is intentionally generic so it can support both **single‑state pilots** and eventual **national coverage**.

Initial recommendation:

- Start with **one small state** (for example, Goa) to validate data pipelines and methodology.  
- Optimise ingestion, scoring, and UX there before expanding.

Future directions:

- Multi‑state rollout with better region/level metadata  
- Anomaly detection using ML/AI over historical scores and spending patterns  
- Public, rate‑limited API for researchers and partners  
- Richer data visualisation layers (maps, comparison dashboards)  
- Potential graph‑database augmentation for relationship‑heavy analyses

---

## 16️⃣ Contribution & Collaboration

This project is **not currently open‑sourced** as a public repo, but the intent is to keep the methodology and governance transparent.

If you are interested in collaborating:

- Be comfortable working with **public‑interest data** and its constraints.  
- Treat data subjects (public officials and institutions) with **fairness and care**.  
- Be willing to document assumptions and reasoning thoroughly.

Potential collaboration areas:

- Data engineering and scraping pipelines  
- Methodology and metric design  
- UX for explaining complex scores simply  
- Legal and policy review

For serious collaboration proposals, reach out via the contact channel exposed on the site.

---

## 17️⃣ Running the Web App Locally

For development of the Next.js frontend:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser.

The main entry points are:

- `app/page.tsx` – marketing / landing page  
- `app/methodology/page.tsx` – methodology documentation experience  
- `app/use-cases/page.tsx` – sector‑wise use cases  
- `components/*` – shared layout and section components

Keep changes in line with the principles above: **clarity, verifiability, and calm, institutional tone**. 
