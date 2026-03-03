# PROJECT KNOWLEDGE BASE

**Generated:** 2026-03-03
**Commit:** bae3411
**Branch:** codex/refactor-cta-waitlist

## OVERVIEW

Next.js 14 App Router landing page + waitlist API for Inertia (iOS habit-tracking app). Stack: TypeScript strict, Tailwind CSS v4 (CSS-based config), Framer Motion, Resend email, Upstash Redis rate limiting. Package manager: pnpm exclusively.

## STRUCTURE

```
inertia-landing/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, fonts (Inter + Playfair), metadata, safe metadataBase parser
│   │   ├── page.tsx            # Landing page orchestrator — section ordering, footer placement
│   │   ├── globals.css         # Tailwind v4 theme (custom colors, fonts, transitions)
│   │   ├── api/
│   │   │   ├── waitlist/route.ts  # POST: signup + email, GET: count. Resend + Redis rate limiting
│   │   │   └── health/route.ts    # Health check endpoint
│   │   ├── privacy/page.tsx
│   │   └── terms/page.tsx
│   ├── components/             # See src/components/AGENTS.md
│   │   ├── ui/                 # Reusable primitives (15 files)
│   │   ├── features/           # Page-specific sections (7 files)
│   │   ├── providers/          # Context providers
│   │   ├── footer.tsx
│   │   ├── nav.tsx
│   │   └── waitlist-counter.tsx
│   └── lib/
│       ├── config.ts           # Environment variable access
│       ├── rate-limit.ts       # Upstash Redis sliding-window rate limiter
│       ├── use-waitlist-form.ts # Extracted hook: form state, submission, event tracking
│       ├── analytics.ts        # Client-side event tracking
│       ├── animations.ts       # Framer Motion animation presets
│       ├── utils.ts            # cn() helper (clsx + twMerge)
│       └── email/
│           └── welcome-template.ts  # HTML email template for waitlist confirmation
├── public/
│   └── screenshots/            # App mockup images used in phone frames
├── scripts/
│   └── smoke-waitlist.mjs      # Real HTTP smoke test for waitlist API
└── .github/workflows/
    └── deploy-guard.yml        # CI: type-check → lint → build → smoke test
```

## WHERE TO LOOK

| Task | Location | Notes |
|------|----------|-------|
| Add/reorder landing sections | `src/app/page.tsx` | Section order, dividers, footer placement |
| Change section layout/copy | `src/components/features/*-section.tsx` | Each section is self-contained |
| Modify reusable UI primitives | `src/components/ui/` | Section, PhoneFrame, CtaBlock, etc. |
| Waitlist signup flow | `src/app/api/waitlist/route.ts` + `src/lib/use-waitlist-form.ts` | API + client hook |
| Rate limiting config | `src/lib/rate-limit.ts` | Upstash Redis, per-email + global limits |
| Theme colors/fonts/transitions | `src/app/globals.css` | Tailwind v4 CSS @theme block |
| Metadata/SEO/OG | `src/app/layout.tsx` | Comprehensive metadata export |
| CI pipeline | `.github/workflows/deploy-guard.yml` | quality + smoke jobs |
| Environment variables | `.env.example` | Required keys documented there |

## CODE MAP

| Symbol | Type | Location | Role |
|--------|------|----------|------|
| `Home` | Function | `src/app/page.tsx:11` | Landing page section orchestrator |
| `RootLayout` | Function | `src/app/layout.tsx:113` | Root layout with fonts + metadata |
| `getMetadataBase` | Function | `src/app/layout.tsx:21` | Safe URL parser with fallback |
| `POST` | Function | `src/app/api/waitlist/route.ts:498` | Waitlist signup endpoint |
| `GET` | Function | `src/app/api/waitlist/route.ts:558` | Waitlist count endpoint |
| `CtaBlock` | Function | `src/components/ui/cta-block.tsx:156` | Waitlist form wrapper (hero + bottom) |
| `useWaitlistForm` | Hook | `src/lib/use-waitlist-form.ts` | Form state, submission, analytics |
| `Section` | Function | `src/components/ui/section.tsx:19` | Layout primitive with fullHeight + density |
| `upsertContactAndSendWelcome` | Function | `src/app/api/waitlist/route.ts:205` | Resend contact create + welcome email |
| `checkRateLimit` | Function | `src/app/api/waitlist/route.ts:135` | Unified rate limit check |

## CONVENTIONS

- **File naming**: kebab-case everywhere (`cta-block.tsx`, `hero-section.tsx`), not PascalCase
- **No barrel files**: Import directly from file paths, no `index.tsx` re-exports
- **Tailwind v4**: Theme defined in `globals.css` via `@theme` block, not `tailwind.config.js`
- **TypeScript strict mode**: `strict: true`, `isolatedModules: true` in tsconfig
- **Path alias**: `@/*` maps to `./src/*`
- **No Prettier/EditorConfig**: Formatting relies on editor defaults
- **Fonts**: `--font-display` (Playfair Display) for headings, `--font-body` (Inter) for body
- **Custom transitions**: `--transition-cinematic` (700ms), `--transition-smooth` (500ms)

## ANTI-PATTERNS (THIS PROJECT)

- No `as any`, `@ts-ignore`, `@ts-expect-error` — strict mode enforced
- No `console.log` in committed code — codebase is currently clean of TODO/FIXME/HACK
- No traditional test framework (Jest/Vitest) — only smoke tests via `scripts/smoke-waitlist.mjs`
- Sentry was explicitly removed — do not re-add monitoring scaffolding without discussion
- `src/lib/rate-limit-redis.ts` was explicitly deleted — use `src/lib/rate-limit.ts` only

## COMMANDS

```bash
pnpm dev              # Local dev server
pnpm build            # Production build
pnpm lint             # ESLint (core-web-vitals + typescript)
pnpm type-check       # tsc --noEmit
pnpm smoke:waitlist   # Real HTTP smoke test (needs env vars)
pnpm test-production  # NODE_ENV=production build + start
```

## NOTES

- **metadataBase**: `src/app/layout.tsx` safely parses `NEXT_PUBLIC_SITE_URL` with try/catch fallback to `https://getinertia.app`. Invalid env values won't crash module init.
- **Section fullHeight**: When `fullHeight={true}`, Section applies `min-h-dvh py-0`. The bottom CTA section uses a custom responsive `min-h-[calc(100dvh-Xrem)]` instead to account for footer height.
- **Footer placement**: Footer is rendered at page level in `page.tsx`, outside the bottom CTA section container, to avoid height inflation.
- **Rate limiting**: Two tiers — per-email and global — using Upstash Redis sliding window. Requires `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN`.
- **Email**: Resend API for contact management + transactional welcome emails. Requires `RESEND_API_KEY` and `RESEND_AUDIENCE_ID`.
- **CI**: `deploy-guard.yml` runs type-check → lint → build as quality gate, then optional waitlist smoke test (skipped on fork PRs due to missing secrets).
