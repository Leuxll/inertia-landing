---
phase: 01-foundation-design-system
plan: 01
subsystem: infra
tags: [next.js, tailwind-v4, playfair-display, inter, motion, lenis, dark-theme]

# Dependency graph
requires: []
provides:
  - Next.js 16 project scaffold with App Router and TypeScript
  - Tailwind v4 dark theme tokens via CSS @theme directive
  - Playfair Display + Inter font loading via next/font/google
  - Placeholder page demonstrating all theme elements
  - Two-state CTA environment variable architecture (.env.local)
affects: [01-02, 01-03, 02-01, 02-02, 02-03]

# Tech tracking
tech-stack:
  added: [next@16.1.6, react@19.2.3, tailwindcss@4.1.18, motion@12.34.0, lenis@1.3.17]
  patterns: [Tailwind v4 CSS @theme for design tokens, next/font/google CSS variables on html element, Server Components by default]

key-files:
  created: [package.json, tsconfig.json, next.config.ts, postcss.config.mjs, eslint.config.mjs, src/app/globals.css, src/app/layout.tsx, src/app/page.tsx, .env.example, .gitignore]
  modified: []

key-decisions:
  - "Tailwind v4 @theme (not tailwind.config.ts) for all design tokens — CSS-native, no JS config"
  - "Font CSS variables on html element, referenced by @theme --font-display/--font-body for Tailwind utility class integration"
  - "Sharp corners (0px border-radius) on CTA button per design system context"
  - "display: swap on both fonts to eliminate FOUT"

patterns-established:
  - "Color tokens: bg-bg, text-text, text-text-muted, bg-cta, text-cta-text, bg-border, bg-surface"
  - "Font tokens: font-display (Playfair Display), font-body (Inter)"
  - "Transition tokens: transition-cinematic (700ms), transition-smooth (500ms)"

# Metrics
duration: 4min
completed: 2026-02-16
---

# Phase 1 Plan 1: Next.js Scaffold + Dark Theme Summary

**Next.js 16 with Tailwind v4 dark theme (#0a0a0a), Playfair Display + Inter fonts via next/font/google, and placeholder page with all design tokens demonstrable**

## Performance

- **Duration:** 4 min
- **Started:** 2026-02-16T09:17:27Z
- **Completed:** 2026-02-16T09:21:36Z
- **Tasks:** 2
- **Files modified:** 10

## Accomplishments
- Next.js 16 project scaffolded with App Router, TypeScript, Tailwind v4, ESLint, motion, and lenis
- Dark theme palette defined in CSS @theme: near-black bg, warm off-white text, muted gray, white CTA
- Playfair Display (serif headlines) and Inter (sans body) loaded with next/font/google CSS variables — no FOUT
- Placeholder page visually demonstrates all theme tokens: headline, subtitle, muted text, dividers, CTA button
- Two-state CTA architecture seeded with .env.local (CTA_MODE=waitlist) and documented .env.example

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js project and install all Phase 1 dependencies** - `b04c56f` (chore)
2. **Task 2: Configure dark theme tokens, font loading, root layout, and placeholder page** - `2fa37ff` (feat)

## Files Created/Modified
- `package.json` - Project manifest with next, motion, lenis, tailwindcss v4 dependencies
- `tsconfig.json` - TypeScript config with @/* path alias
- `next.config.ts` - Next.js configuration
- `postcss.config.mjs` - PostCSS with @tailwindcss/postcss plugin
- `eslint.config.mjs` - ESLint configuration for Next.js
- `src/app/globals.css` - Tailwind v4 @theme dark palette + font tokens + transition tokens
- `src/app/layout.tsx` - Root layout with Playfair Display + Inter font loading via CSS variables
- `src/app/page.tsx` - Placeholder page demonstrating all theme elements (headline, body, muted, CTA, dividers)
- `.env.example` - Documented CTA_MODE environment variable
- `.gitignore` - Standard Next.js ignores with .env.example exception

## Decisions Made
- **Tailwind v4 @theme instead of tailwind.config.ts** — CSS-native configuration, no JavaScript config file needed. Custom colors automatically become Tailwind utilities (bg-bg, text-text, etc.)
- **Font CSS variables on html, referenced in @theme** — next/font/google sets --font-playfair and --font-inter on html; @theme maps these to --font-display and --font-body for semantic Tailwind classes (font-display, font-body)
- **display: swap on both fonts** — Eliminates flash of unstyled text by showing fallback fonts immediately while web fonts load
- **Sharp corners on CTA button** — 0px border-radius per Phase 1 CONTEXT.md design system specification (stark, editorial aesthetic)

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
- `pnpm` was not globally installed — installed via `npm install -g pnpm` before scaffolding (standard toolchain setup)
- `create-next-app` refused to scaffold in directory with existing `.planning/` folder — scaffolded in /tmp and copied files over (no impact on result)

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness
- Foundation scaffold complete, ready for 01-02-PLAN.md (Lenis smooth scroll, CTA state config, animation foundation)
- All design tokens established and usable via Tailwind utility classes
- Font loading infrastructure ready for all subsequent components
- No blockers or concerns

---
*Phase: 01-foundation-design-system*
*Completed: 2026-02-16*
