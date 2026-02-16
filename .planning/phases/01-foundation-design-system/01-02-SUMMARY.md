---
phase: 01-foundation-design-system
plan: 02
subsystem: ui
tags: [lenis, smooth-scroll, motion, animations, scroll-reveal, cta-config, env-var]

# Dependency graph
requires:
  - phase: 01-01
    provides: "Next.js scaffold, Tailwind v4 dark theme, font loading, placeholder page"
provides:
  - "Lenis smooth scroll provider (desktop momentum, native touch fallback)"
  - "CTA state config system (NEXT_PUBLIC_CTA_MODE env var with typed exports)"
  - "Animation variants library (fadeUp, fadeIn, staggerContainer, cinematicTransition)"
  - "ScrollReveal reusable component (viewport-triggered animations)"
affects: ["01-03", "02-hero-conversion", "03-feature-sections"]

# Tech tracking
tech-stack:
  added: []
  patterns: ["LenisProvider wrapping layout body", "Server Component page composing Client Components", "Build-time env var for CTA state switching", "Compositor-only animation properties (transform, opacity)"]

key-files:
  created:
    - src/components/providers/lenis-provider.tsx
    - src/lib/config.ts
    - src/lib/animations.ts
    - src/components/ui/scroll-reveal.tsx
  modified:
    - src/app/layout.tsx
    - src/app/page.tsx
    - .env.example

key-decisions:
  - "syncTouch: false (not touchSmooth) — Lenis v1.3 API uses syncTouch for touch device behavior"
  - "NEXT_PUBLIC_CTA_MODE prefix — required for client component visibility in Next.js"
  - "as const on cubic bezier arrays — TypeScript readonly tuple inference for animation easing"

patterns-established:
  - "LenisProvider: Client component wrapping layout children with root smooth scroll"
  - "ScrollReveal: Reusable viewport-triggered animation wrapper with fadeUp and stagger variants"
  - "Animation variants: Shared presets in lib/animations.ts, imported by components"
  - "CTA config: Build-time env var read in lib/config.ts, consumed by Server and Client Components"

# Metrics
duration: 3min
completed: 2026-02-16
---

# Phase 1 Plan 2: Smooth Scroll, CTA Config & Animation Foundation Summary

**Lenis smooth scroll with cinematic momentum on desktop (native touch fallback), two-state CTA config via NEXT_PUBLIC_CTA_MODE env var, and Motion-based scroll-reveal animation system with fadeUp/stagger variants**

## Performance

- **Duration:** 3 min
- **Started:** 2026-02-16T09:25:41Z
- **Completed:** 2026-02-16T09:28:50Z
- **Tasks:** 2
- **Files modified:** 7

## Accomplishments
- Lenis smooth scroll provider wraps layout with subtle momentum (lerp: 0.1, duration: 1.2) on desktop, native scroll on touch
- CTA config system reads NEXT_PUBLIC_CTA_MODE at build time, exports typed `ctaMode`, `isWaitlistMode`, `isDownloadMode`
- Animation variants library with cinematicTransition (700ms ease-out), smoothTransition (500ms ease-in-out), fadeUp, fadeIn, staggerContainer
- ScrollReveal component triggers viewport-entry animations with `once: true` and `-100px` margin
- Demo page shows CTA state switching end-to-end with two full-height scroll-reveal sections

## Task Commits

Each task was committed atomically:

1. **Task 1: Lenis smooth scroll provider and CTA config system** - `c7c4cb9` (feat)
2. **Task 2: Animation system and scroll-reveal component with page demo** - `806e47a` (feat)

## Files Created/Modified
- `src/components/providers/lenis-provider.tsx` - Client component wrapping children with ReactLenis smooth scroll
- `src/lib/config.ts` - Centralized CTA config reading NEXT_PUBLIC_CTA_MODE from process.env
- `src/lib/animations.ts` - Shared Motion animation variants and transition presets
- `src/components/ui/scroll-reveal.tsx` - Reusable scroll-triggered animation wrapper using Motion
- `src/app/layout.tsx` - Updated to import and wrap children with LenisProvider
- `src/app/page.tsx` - Replaced placeholder with two-section demo (CTA state + scroll reveals)
- `.env.example` - Updated to NEXT_PUBLIC_CTA_MODE

## Decisions Made
- Used `syncTouch: false` instead of `touchSmooth: false` — Lenis v1.3 API renamed the option
- Used `NEXT_PUBLIC_CTA_MODE` prefix instead of `CTA_MODE` — Next.js requires NEXT_PUBLIC_ prefix for client component env var access
- Added `as const` to cubic bezier arrays for TypeScript readonly tuple inference

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 1 - Bug] Fixed Lenis option name from touchSmooth to syncTouch**
- **Found during:** Task 1 (Lenis provider creation)
- **Issue:** Plan specified `touchSmooth: false` but Lenis v1.3 API uses `syncTouch` — TypeScript compilation failed
- **Fix:** Changed to `syncTouch: false` which is the correct API for disabling smooth scroll on touch devices
- **Files modified:** src/components/providers/lenis-provider.tsx
- **Verification:** `pnpm build` succeeds, TypeScript passes
- **Committed in:** c7c4cb9

---

**Total deviations:** 1 auto-fixed (1 bug)
**Impact on plan:** Trivial API naming fix. No scope creep.

## Issues Encountered
None.

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Smooth scroll, CTA config, and animation system all operational
- Ready for 01-03-PLAN.md (component primitives, contrast audit, responsive validation)
- All animation variants and ScrollReveal component ready for Phase 2+ section components

---
*Phase: 01-foundation-design-system*
*Completed: 2026-02-16*
