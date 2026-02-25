# ☁️ Karmameter – Infrastructure & Deployment Strategy

This document covers **every aspect** of deploying Karmameter — from where to host, which cloud to pick, how to keep costs at zero (or near-zero), and how to scale as the platform grows. It's written as a living decision document, not a tutorial.

---

## Table of Contents

1. [Cloud Provider Comparison](#1-cloud-provider-comparison)
2. [Recommended Architecture (Phase-wise)](#2-recommended-architecture-phase-wise)
3. [Detailed Service Mapping](#3-detailed-service-mapping)
4. [Domain & DNS Strategy](#4-domain--dns-strategy)
5. [Database Strategy](#5-database-strategy)
6. [Caching & Rate Limiting](#6-caching--rate-limiting)
7. [Background Jobs & Data Pipeline](#7-background-jobs--data-pipeline)
8. [File & Blob Storage](#8-file--blob-storage)
9. [Authentication & Authorization](#9-authentication--authorization)
10. [Observability & Monitoring](#10-observability--monitoring)
11. [Security & DDoS Protection](#11-security--ddos-protection)
12. [CI/CD Pipeline](#12-cicd-pipeline)
13. [Cost Analysis](#13-cost-analysis)
14. [Migration & Vendor Lock-in Strategy](#14-migration--vendor-lock-in-strategy)
15. [Decision Matrix & Final Recommendation](#15-decision-matrix--final-recommendation)

---

## 1. Cloud Provider Comparison

### The Big Three: AWS vs GCP vs Azure

| Aspect | AWS | GCP | Azure |
|---|---|---|---|
| **Free tier** | 12 months + always-free | 12 months + always-free | 12 months + always-free |
| **Free compute** | 750 hrs/month EC2 t2.micro (12 mo) | 1 e2-micro VM forever | 750 hrs B1S VM (12 mo) |
| **Free database** | 750 hrs RDS (12 mo only) | None (Firestore has free tier) | 750 hrs SQL (12 mo only) |
| **Free storage** | 5 GB S3 (12 mo) | 5 GB Cloud Storage (always) | 5 GB Blob (12 mo) |
| **Serverless** | Lambda (1M requests/mo free) | Cloud Functions (2M/mo free) | Azure Functions (1M/mo free) |
| **Complexity** | Very high / steep learning curve | Moderate | High |
| **Billing surprises** | Common and notorious | Less common but possible | Moderate |
| **Next.js support** | Poor natively (needs custom setup) | App Engine or Cloud Run (decent) | Poor natively |
| **India regions** | Mumbai (ap-south-1) ✅ | Mumbai (asia-south1) ✅ | Pune, Chennai ✅ |
| **Best for** | Enterprise, mature infra teams | ML/data, moderate infra teams | Microsoft shops |

### The Developer-First Platforms

| Aspect | Vercel | Railway | Fly.io | Render |
|---|---|---|---|---|
| **Free tier** | Hobby (generous) | $5/month credit | $5/month credit | 750 hrs free |
| **Next.js support** | ⭐ Best-in-class | Good (Docker) | Good (Docker) | Good |
| **Deploy complexity** | Zero (git push) | Low | Low-moderate | Low |
| **Custom domains** | Free ✅ | Free ✅ | Free ✅ | Free ✅ |
| **Serverless functions** | ✅ Included | ❌ (containers) | ❌ (containers) | ❌ (containers) |
| **Database** | Via integrations | Built-in Postgres | Built-in Postgres | Built-in Postgres |
| **Background workers** | Cron only | ✅ Full support | ✅ Full support | ✅ Background workers |
| **Billing model** | Per-request | Per-usage | Per-usage | Per-usage |
| **Best for** | Next.js frontends | Full-stack apps | Global edge apps | Simple full-stack |

### The Specialized Free Services

| Service | What It Solves | Free Tier |
|---|---|---|
| **Neon** | Serverless Postgres | 0.5 GB, autoscaling, branching |
| **Supabase** | Postgres + Auth + Realtime | 500 MB, 50K monthly actives |
| **PlanetScale** | MySQL (serverless) | Deprecated free tier — avoid |
| **Upstash** | Serverless Redis + Kafka | 10K commands/day |
| **Cloudflare** | DNS, CDN, WAF, R2 storage | Extremely generous |
| **Sentry** | Error tracking | 5K events/month |
| **PostHog** | Product analytics | 1M events/month |

---

## 2. Recommended Architecture (Phase-wise)

### Phase 1: MVP (Current → 3 months)

**Goal**: Landing page live, early backend, minimal data.

```
┌──────────────────────────────────────────────────┐
│                  Cloudflare DNS                   │
│           (karmameter.in → Vercel)                │
│              CDN + DDoS protection                │
└──────────────┬───────────────────────────────────┘
               │
┌──────────────▼───────────────────────────────────┐
│              Vercel (Hobby Plan)                  │
│  ┌─────────────────┐  ┌───────────────────────┐  │
│  │  Next.js SSR     │  │  API Route Handlers   │  │
│  │  (Frontend)      │  │  (/app/api/*)         │  │
│  └─────────────────┘  └───────────┬───────────┘  │
│                                   │              │
│  ┌────────────────────────────────┘              │
│  │  Vercel Cron (daily score recompute)          │
│  └───────────────────────────────────────────────┘
└──────────────┬───────────────────────────────────┘
               │
┌──────────────▼──────────┐  ┌─────────────────────┐
│   Neon (Postgres)        │  │  Upstash (Redis)     │
│   Free: 0.5 GB          │  │  Free: 10K cmd/day   │
│   Serverless pooling     │  │  Rate limiting +     │
│                          │  │  light caching       │
└──────────────────────────┘  └─────────────────────┘
```

**Monthly cost: $0**

---

### Phase 2: Automation (3–9 months)

**Goal**: Automated scraping, scheduled pipelines, growing data.

```
┌──────────────────────────────────────────────────┐
│                  Cloudflare                       │
│         DNS + CDN + WAF + R2 Storage              │
└──────────────┬───────────────────────────────────┘
               │
┌──────────────▼───────────────────────────────────┐
│              Vercel (Hobby/Pro)                   │
│       Next.js Frontend + API Routes               │
└──────────────┬───────────────────────────────────┘
               │
       ┌───────┴───────┐
       │               │
┌──────▼──────┐  ┌─────▼──────────────────────────┐
│    Neon     │  │   GitHub Actions (Cron)          │
│  (Postgres) │  │   - Daily scraping jobs          │
│             │◄─┤   - PDF parsing (Python)         │
│             │  │   - Data normalization            │
│             │  │   - Push to Postgres              │
└─────────────┘  └────────────────────────────────┘
                          │
                 ┌────────▼────────┐
                 │  Cloudflare R2   │
                 │  (Blob Storage)  │
                 │  PDFs, raw data  │
                 └─────────────────┘
```

**Monthly cost: $0** (GitHub Actions free: 2,000 min/month)

---

### Phase 3: Public Scale (9–18 months)

**Goal**: Public API, significant traffic, multi-state data.

```
┌──────────────────────────────────────────────────┐
│              Cloudflare (Free/Pro)                │
│     DNS + CDN + WAF + DDoS + Rate Limiting        │
└──────────────┬───────────────────────────────────┘
               │
┌──────────────▼───────────────────────────────────┐
│         Vercel (Pro – $20/month)                  │
│    Next.js Frontend + API Routes + Middleware      │
└──────────────┬───────────────────────────────────┘
               │
    ┌──────────┼──────────┐
    │          │          │
┌───▼────┐ ┌──▼────┐ ┌───▼──────────────────────┐
│  Neon  │ │Upstash│ │  Railway / Fly.io         │
│Postgres│ │ Redis │ │  - Python scraping worker  │
│(Scale) │ │(Scale)│ │  - Scoring engine cron     │
│~$19/mo │ │~$10/mo│ │  - ETL pipeline            │
└────────┘ └───────┘ │  ~$5-10/month              │
                     └────────────────────────────┘
```

**Monthly cost: ~$50–60/month**

---

## 3. Detailed Service Mapping

Here's exactly which service handles what, mapped to your README architecture:

| README Component | Phase 1 Service | Phase 2 Service | Phase 3 Service |
|---|---|---|---|
| **Frontend (Next.js)** | Vercel Free | Vercel Free | Vercel Pro ($20/mo) |
| **API Routes** | Vercel Serverless | Vercel Serverless | Vercel Serverless |
| **Database (Postgres)** | Neon Free | Neon Free | Neon Scale ($19/mo) |
| **ORM** | Prisma | Prisma | Prisma |
| **Caching (Redis)** | Upstash Free | Upstash Free | Upstash Pay-as-you-go |
| **Auth** | NextAuth.js | NextAuth.js | NextAuth.js |
| **Rate Limiting** | Upstash Rate Limit | Upstash + Cloudflare | Cloudflare WAF |
| **Scraping/ETL** | Manual | GitHub Actions | Railway worker |
| **PDF/Blob Storage** | — | Cloudflare R2 Free | Cloudflare R2 |
| **Cron/Scheduling** | Vercel Cron | GitHub Actions Cron | Dedicated worker |
| **DNS/CDN** | Cloudflare Free | Cloudflare Free | Cloudflare Pro |
| **DDoS Protection** | Cloudflare Free | Cloudflare Free | Cloudflare Pro |
| **Error Tracking** | — | Sentry Free | Sentry Team |
| **Analytics** | — | PostHog Free | PostHog Free |
| **Logging** | Vercel Logs | Axiom Free | Axiom/Better Stack |
| **CI/CD** | Vercel auto-deploy | Vercel + GitHub Actions | Same |

---

## 4. Domain & DNS Strategy

### Current Setup
- Domain: `karmameter.in` (registered with your registrar)
- Deployed on: Vercel

### Recommended: Move DNS to Cloudflare (Free)

**Why Cloudflare DNS:**
- **Free CDN**: Caches static assets at edge nodes worldwide (including India)
- **Free DDoS protection**: Critical for politically sensitive content
- **Free SSL**: Automatic HTTPS with full (strict) mode
- **Fast DNS propagation**: Cloudflare is one of the fastest DNS resolvers globally
- **Analytics**: Free DNS-level analytics (who's hitting your site, from where)
- **Page Rules**: Block bad bots, redirect www → non-www, etc.
- **Easy WAF rules**: Block specific countries, IPs, or request patterns

**How to set up:**
1. Create a free Cloudflare account
2. Add `karmameter.in` as a site
3. Cloudflare scans existing DNS records automatically
4. Update your registrar's nameservers to Cloudflare's (they provide 2 nameservers)
5. In Cloudflare DNS settings, add:
   - `A` record: `karmameter.in` → `76.76.21.21` (Vercel's IP)
   - `CNAME` record: `www` → `cname.vercel-dns.com`
6. Set SSL mode to **Full (Strict)**
7. Enable **Always Use HTTPS**

**DNS Records Table:**

| Type | Name | Value | Proxy |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | Proxied (orange cloud) |
| `CNAME` | `www` | `cname.vercel-dns.com` | Proxied |
| `TXT` | `@` | (Vercel verification TXT) | DNS only |

> ⚠️ **Important**: After moving DNS to Cloudflare, also verify the domain in Vercel's project settings (Settings → Domains). Vercel needs to know the domain is yours.

---

## 5. Database Strategy

### Why Neon Over Others

| Feature | Neon | Supabase | Railway Postgres | AWS RDS |
|---|---|---|---|---|
| **Free tier** | 0.5 GB, autoscale | 500 MB, 50K MAU | $5 credit | 12 months only |
| **Serverless pooling** | ✅ Built-in | ✅ Via Supavisor | ❌ | ❌ |
| **Works with Prisma** | ✅ Perfect | ✅ But has its own ORM | ✅ | ✅ |
| **Database branching** | ✅ (like git branches) | ❌ | ❌ | ❌ |
| **Vercel integration** | ✅ Native | ✅ Native | ❌ | ❌ |
| **Cold start** | ~500ms (first query) | None (always on) | None | None |
| **Auto-suspend** | ✅ (saves cost) | ✅ (pauses after 1 week) | ❌ | ❌ |
| **India region** | Singapore (closest) | Singapore | US only (free) | Mumbai ✅ |

**Recommendation**: **Neon** for Phase 1-2. If cold starts become an issue at scale, migrate to **Supabase** or **Railway Postgres** (both are standard Postgres, migration is a `pg_dump` + `pg_restore`).

### Database Branching (Neon's Killer Feature)

Neon lets you create database branches — like git branches for your data:

```
main (production data)
 ├── feature/add-attendance-table   ← test migrations safely
 ├── staging                        ← mirror of prod with test data
 └── experiment/new-scoring-formula ← try new schema without risk
```

This is invaluable for a project where schema changes affect scoring logic and auditability.

### Connection Setup for Vercel + Neon + Prisma

```env
# .env (local development)
DATABASE_URL="postgresql://user:pass@ep-xxxx.ap-southeast-1.aws.neon.tech/karmameter?sslmode=require"

# For Vercel serverless (connection pooling)
DATABASE_URL="postgresql://user:pass@ep-xxxx-pooler.ap-southeast-1.aws.neon.tech/karmameter?sslmode=require"
```

Prisma schema addition:
```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
}
```

---

## 6. Caching & Rate Limiting

### Why Upstash Redis

- **Serverless**: No connection management needed (HTTP-based Redis)
- **Free tier**: 10,000 commands/day — enough for MVP
- **@upstash/ratelimit**: Purpose-built rate-limiting library for Next.js
- **Global replication**: Data replicated to edge nodes
- **Pay-as-you-go**: After free tier, $0.2 per 100K commands

### Rate Limiting Setup (Next.js Middleware)

```typescript
// middleware.ts
import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "10 s"), // 10 requests per 10 seconds
})

export async function middleware(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1"
  const { success } = await ratelimit.limit(ip)

  if (!success) {
    return new NextResponse("Too Many Requests", { status: 429 })
  }
}
```

### What to Cache

| Data | Cache Duration | Why |
|---|---|---|
| Politician profiles | 1 hour | Rarely changes, heavy DB query |
| Score computations | 6 hours | Expensive to compute |
| Constituency pages | 1 hour | High-traffic pages |
| Search results | 5 minutes | Moderate freshness needed |
| API responses | 15 minutes | Reduce serverless invocations |

---

## 7. Background Jobs & Data Pipeline

### Phase 1: Vercel Cron (Free, Simple)

```typescript
// app/api/cron/recompute-scores/route.ts
export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 })
  }

  await recomputeAllScores()
  return Response.json({ success: true })
}
```

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/recompute-scores",
      "schedule": "0 2 * * *"
    }
  ]
}
```

**Limitation**: Vercel functions timeout at 10s (hobby) / 60s (pro). Fine for score recomputation, not for scraping.

### Phase 2: GitHub Actions (Free, Powerful)

```yaml
# .github/workflows/scrape-parliament.yml
name: Scrape Parliament Data
on:
  schedule:
    - cron: '0 3 * * 1'  # Every Monday at 3am UTC
  workflow_dispatch:        # Manual trigger

jobs:
  scrape:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'
      - run: pip install -r scraper/requirements.txt
      - run: python scraper/parliament_attendance.py
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
      - run: python scraper/budget_parser.py
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

**Free tier**: 2,000 minutes/month — easily enough for daily scraping.

### Phase 3: Dedicated Worker (Railway)

For heavy-duty scraping (PDFs, NLP, large datasets):

```
┌─────────────────────────────────────┐
│          Railway Worker              │
│                                      │
│  ┌──────────┐  ┌──────────────────┐ │
│  │ Scraper  │  │ PDF Parser       │ │
│  │ (Python) │  │ (Python/OCR)     │ │
│  └────┬─────┘  └────────┬────────┘ │
│       │                  │          │
│  ┌────▼──────────────────▼────────┐ │
│  │    Data Normalizer             │ │
│  │    (Schema mapping, dedup)     │ │
│  └────────────┬───────────────────┘ │
│               │                      │
└───────────────┼──────────────────────┘
                │
         ┌──────▼───────┐
         │  Neon Postgres │
         └──────────────┘
```

---

## 8. File & Blob Storage

### Cloudflare R2 (Recommended)

| Feature | Cloudflare R2 | AWS S3 | GCP Cloud Storage |
|---|---|---|---|
| **Free storage** | 10 GB | 5 GB (12 mo) | 5 GB |
| **Free egress** | ✅ Always free | ❌ $0.09/GB | ❌ $0.12/GB |
| **Free operations** | 1M reads, 10M writes/mo | Limited | Limited |
| **S3 compatible** | ✅ | N/A | ❌ |
| **India edge** | ✅ | ✅ | ✅ |

**Why R2 wins**: Zero egress fees. Serving PDFs and raw data publicly costs nothing extra. With S3 or GCS, egress fees can spike unexpectedly.

### What to Store in R2

- Downloaded government PDFs
- Scraped raw HTML/JSON snapshots
- Election affidavit images
- Audit log archives (compressed)
- Database backup exports

---

## 9. Authentication & Authorization

### NextAuth.js (Auth.js v5)

For admin/editor access to data management:

```typescript
// auth.ts
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    authorized({ auth, request }) {
      // Only allow whitelisted admin emails
      const adminEmails = process.env.ADMIN_EMAILS?.split(",") ?? []
      return adminEmails.includes(auth?.user?.email ?? "")
    }
  }
})
```

### Role Model

| Role | Can Do | Access |
|---|---|---|
| `PUBLIC` | Read scores, profiles, search | All public pages |
| `EDITOR` | Upload CSVs, correct data | Admin panel |
| `ADMIN` | Recompute scores, manage users, DB access | Full admin |

### Auth Cost: $0

NextAuth.js is open source. Google OAuth is free. No third-party auth service needed.

---

## 10. Observability & Monitoring

### Logging Stack (All Free Tiers)

| Layer | Tool | Free Tier |
|---|---|---|
| **Application errors** | Sentry | 5K events/month |
| **Structured logs** | Axiom (via Vercel integration) | 500 MB ingest/month |
| **Product analytics** | PostHog | 1M events/month |
| **Uptime monitoring** | Better Stack (or UptimeRobot) | 50 monitors free |
| **Performance** | Vercel Analytics | Basic (free) |

### Sentry Setup for Next.js

```bash
npx @sentry/wizard@latest -i nextjs
```

This auto-configures:
- Client-side error tracking
- Server-side error tracking
- Source maps upload
- Performance monitoring

### Alerts to Configure

| Alert | Tool | Trigger |
|---|---|---|
| Site down | Better Stack | 3 consecutive failures |
| Error spike | Sentry | >50 errors in 5 minutes |
| High latency | Vercel Analytics | P95 > 3s |
| DB near limit | Neon dashboard | >80% storage |
| Rate limit hits | Upstash dashboard | >1000 blocked/day |

---

## 11. Security & DDoS Protection

### Why Security Matters More Here

Karmameter deals with **politically sensitive data**. Expect:
- DDoS attempts during election season
- Targeted takedown attempts via legal or technical means
- Bot scraping of your data
- Potential defamation claims requiring audit trails

### Security Layers

```
Layer 1: Cloudflare (Edge)
├── DDoS mitigation (automatic)
├── Bot management (free tier)
├── WAF rules (5 free rules)
├── SSL/TLS (full strict)
└── Country/IP blocking

Layer 2: Vercel (Application)
├── CSP headers
├── CORS configuration
├── Rate limiting (Upstash middleware)
└── Auth middleware (NextAuth)

Layer 3: Database (Data)
├── Row-level security (Postgres policies)
├── Immutable raw data pattern
├── Audit logging on all mutations
└── Encrypted connections (SSL)

Layer 4: Operational
├── 2FA on all admin accounts
├── Environment variable encryption (Vercel)
├── Regular dependency audits (Dependabot)
└── Database backups (Neon auto-snapshots)
```

### Hardened Next.js Headers

```typescript
// next.config.ts
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
]
```

---

## 12. CI/CD Pipeline

### Current: Vercel Auto-Deploy

```
git push origin main → Vercel builds → deploys to production
git push origin feature/* → Vercel creates preview deployment
```

### Recommended: GitHub Actions + Vercel

```yaml
# .github/workflows/ci.yml
name: CI
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npx tsc --noEmit

  test:
    runs-on: ubuntu-latest
    needs: lint-and-type-check
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - run: npm ci
      - run: npm test

  # Vercel handles deployment automatically
```

### Database Migrations in CI

```yaml
# .github/workflows/migrate.yml
name: Database Migration
on:
  push:
    branches: [main]
    paths:
      - 'prisma/schema.prisma'
      - 'prisma/migrations/**'

jobs:
  migrate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx prisma migrate deploy
        env:
          DATABASE_URL: ${{ secrets.DATABASE_URL }}
```

---

## 13. Cost Analysis

### Phase 1: MVP ($0/month)

| Service | Plan | Cost |
|---|---|---|
| Vercel | Hobby | $0 |
| Neon (Postgres) | Free | $0 |
| Upstash (Redis) | Free | $0 |
| Cloudflare | Free | $0 |
| GitHub Actions | Free (2000 min) | $0 |
| NextAuth.js | Open source | $0 |
| Sentry | Free (5K events) | $0 |
| **Total** | | **$0/month** |

### Phase 2: Automation ($0–5/month)

| Service | Plan | Cost |
|---|---|---|
| Vercel | Hobby | $0 |
| Neon | Free | $0 |
| Upstash | Free | $0 |
| Cloudflare + R2 | Free | $0 |
| GitHub Actions | Free | $0 |
| Sentry | Free | $0 |
| PostHog | Free | $0 |
| **Total** | | **$0–5/month** |

### Phase 3: Public Scale (~$50–60/month)

| Service | Plan | Cost |
|---|---|---|
| Vercel | Pro | $20/month |
| Neon | Scale | $19/month |
| Upstash | Pay-as-you-go | ~$5/month |
| Cloudflare | Free or Pro | $0–20/month |
| Railway (worker) | Usage-based | ~$5–10/month |
| Sentry | Team | $26/month (or stay free) |
| **Total** | | **$50–80/month** |

### What If You Used AWS/GCP Instead?

| Phase | Recommended Stack Cost | AWS Equivalent | GCP Equivalent |
|---|---|---|---|
| Phase 1 | $0 | $0 (free tier, 12 mo only) | $0 (free tier) |
| Phase 2 | $0–5 | $15–30 (after free tier expires) | $10–20 |
| Phase 3 | $50–80 | $100–200+ | $80–150 |

> **Key difference**: AWS/GCP free tiers mostly expire after 12 months. The recommended stack uses services with **permanent** free tiers. After the free year, AWS/GCP costs jump significantly.

---

## 14. Migration & Vendor Lock-in Strategy

### Lock-in Risk Assessment

| Service | Lock-in Risk | Migration Difficulty | Alternative |
|---|---|---|---|
| Vercel | **Low** | Easy — it's just Next.js | Coolify, Railway, Fly.io |
| Neon | **Low** | `pg_dump` → any Postgres | Supabase, Railway, RDS |
| Upstash | **Low** | Standard Redis protocol | Any Redis (Fly, self-hosted) |
| Cloudflare | **Low** | Standard DNS records | Any DNS provider |
| GitHub Actions | **Low** | Standard CI/CD yaml | GitLab CI, CircleCI |
| Prisma | **Medium** | ORM migration needed | Drizzle, Kysely, raw SQL |
| NextAuth.js | **Medium** | Auth logic rewrite | Clerk, Lucia, custom |

### Emergency Escape Plan

If Vercel becomes unusable (pricing, policy, downtime):

**Option A: Coolify (Self-hosted, $5/month)**
- Run Coolify on a Hetzner or DigitalOcean VPS ($5/month)
- Deploy Next.js as a Docker container
- Full control, no vendor dependency

**Option B: Railway ($5+/month)**
- `railway init` → deploy from GitHub
- Built-in Postgres, Redis
- Simple migration

**Option C: Fly.io ($0–5/month)**
- Global edge deployment
- Built-in Postgres
- Slightly more complex setup

### Data Portability Checklist

- [ ] Database: `pg_dump` works with any Postgres host
- [ ] Files/Blobs: R2 is S3-compatible, can `rclone` to any provider
- [ ] Auth: NextAuth stores sessions in your DB, fully portable
- [ ] Code: Standard Next.js, no Vercel-specific APIs used
- [ ] DNS: Standard records, move between providers in minutes
- [ ] Secrets: Documented in `.env.example`, re-create on any platform

---

## 15. Decision Matrix & Final Recommendation

### Why NOT AWS/GCP for Karmameter (Right Now)

| Concern | Details |
|---|---|
| **Complexity** | AWS has 200+ services. You'd spend more time configuring infrastructure than building features. |
| **Cost after free tier** | AWS/GCP free tiers expire after 12 months. You'd be paying $50-100/month for what you get free on the recommended stack. |
| **Billing surprises** | AWS is infamous for unexpected charges. A misconfigured S3 bucket or NAT gateway can cost hundreds. |
| **Operational overhead** | Managing EC2 instances, security groups, IAM roles, VPCs — this needs a full-time DevOps focus. |
| **Next.js support** | Neither AWS nor GCP has first-class Next.js support. You'd need to containerize or use SST/OpenNext. |
| **Solo developer** | The recommended stack is designed for small teams and solo developers. AWS/GCP is designed for infra teams. |

### When AWS/GCP DOES Make Sense

| Scenario | Why |
|---|---|
| **You need ML/AI pipelines** | GCP Vertex AI, AWS SageMaker — for anomaly detection on scoring data |
| **You need heavy compute** | GPU instances for NLP/OCR on government PDFs at scale |
| **You get cloud credits** | Google for Startups ($100K GCP credits), AWS Activate ($5-100K credits) |
| **Enterprise partnerships** | If a government or NGO partner requires specific cloud hosting |
| **Regulatory compliance** | If data residency laws require specific Indian infrastructure |

> 💡 **Pro Tip**: Apply for **Google for Startups Cloud Program** or **AWS Activate Credits** — both give $5K–$100K in free credits for civic-tech projects. If you get those, GCP/AWS becomes very attractive for Phase 3+.

### Final Recommended Stack

```
┌─────────────────────────────────────────────────────────┐
│                    KARMAMETER STACK                       │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ EDGE: Cloudflare (DNS, CDN, DDoS, WAF, R2)         │ │
│  └──────────────────────┬──────────────────────────────┘ │
│                         │                                │
│  ┌──────────────────────▼──────────────────────────────┐ │
│  │ APP: Vercel (Next.js SSR + API Routes + Cron)       │ │
│  └──────────┬───────────────────────────┬──────────────┘ │
│             │                           │                │
│  ┌──────────▼──────────┐  ┌─────────────▼────────────┐  │
│  │ DATA: Neon Postgres  │  │ CACHE: Upstash Redis     │  │
│  │ + Prisma ORM         │  │ + Rate Limiting           │  │
│  └─────────────────────┘  └──────────────────────────┘  │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ PIPELINE: GitHub Actions (scraping, ETL, CI/CD)     │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ OBSERVE: Sentry + PostHog + Axiom                   │ │
│  └─────────────────────────────────────────────────────┘ │
│                                                          │
│  ┌─────────────────────────────────────────────────────┐ │
│  │ AUTH: NextAuth.js (Google OAuth + role-based)        │ │
│  └─────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────┘
```

**Bottom line**: Build with the developer-first stack now ($0/month). Apply for cloud credits from GCP/AWS. When credits come through or when you hit scale, selectively move heavy compute (ML, scraping) to the cloud while keeping the frontend on Vercel.

---

*Last updated: February 2026*
*Maintainer: Karmameter Core Team*
