---
phase: 02-hero-conversion
plan: 03
subsystem: ui
tags: [nav, footer, waitlist-counter, scroll-behavior, motion, landing-page]

# Dependency graph
requires:
  - phase: 02-01
    provides: Hero section with CtaBlock and geometric accent
  - phase: 02-02
    provides: Waitlist API with GET endpoint for contact count
provides:
  - Sticky nav with scroll-aware logo + CTA
  - Footer with links, social icons, copyright
  - Bottom CTA section with compact CtaBlock
  - Waitlist counter with 25+ threshold display
  - Complete assembled landing page (hero → bottom CTA → footer)
affects: [03-feature-sections, 05-polish]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Scroll-aware component state via useEffect + scroll listener
    - AnimatePresence for conditional element transitions
    - Inline SVG icons for social links and logo

key-files:
  created:
    - src/components/nav.tsx
    - src/components/footer.tsx
    - src/components/waitlist-counter.tsx
  modified:
    - src/app/page.tsx
    - src/app/layout.tsx

key-decisions:
  - "Geometric M monogram as placeholder logo mark — inline SVG, swappable later"
  - "Nav CTA uses plain button/anchor (not Button component) for compact sizing control"
  - "Footer is a server component — no interactivity needed"

patterns-established:
  - "Scroll threshold at 80vh for nav state transition"
  - "Conditional rendering with count > 25 for social proof counter"

# Metrics
duration: 2min
completed: 2026-02-16
---

# Phase 2 Plan 3: Nav, Footer, Bottom CTA & Waitlist Counter Summary

**Scroll-aware sticky nav with logo + CTA, footer with social links, bottom CTA "Ready?" nudge, and conditional waitlist counter completing the full landing page assembly**

## Performance

- **Duration:** 2 min
- **Started:** 2026-02-16T19:00:00Z
- **Completed:** 2026-02-16T19:02:21Z
- **Tasks:** 2
- **Files modified:** 5

## Accomplishments
- Sticky nav with transparent→solid background transition, logo always visible, CTA appears after scrolling past hero fold
- Footer with Momentum logo, Privacy Policy, Terms of Service, contact email, X/Instagram social icons, copyright
- Bottom CTA section with "Ready?" heading and compact CtaBlock for closing conversion nudge
- Waitlist counter that fetches from GET /api/waitlist and only displays when count exceeds 25
- Complete landing page assembled: hero → bottom CTA → footer wrapped in semantic `<main>`

## Task Commits

Each task was committed atomically:

1. **Task 1: Build sticky Nav component with scroll-aware behavior** - `73a8506` (feat)
2. **Task 2: Build footer, bottom CTA, waitlist counter, assemble page** - `ab103ab` (feat)

## Files Created/Modified
- `src/components/nav.tsx` - Sticky nav with scroll-aware logo + CTA, geometric M logo mark
- `src/components/footer.tsx` - Footer with links, social SVG icons, copyright
- `src/components/waitlist-counter.tsx` - Client component fetching waitlist count, 25+ threshold
- `src/app/page.tsx` - Complete page with hero, bottom CTA section, footer
- `src/app/layout.tsx` - Updated with Nav component above LenisProvider

## Decisions Made
- **Geometric M monogram as placeholder logo**: Clean diagonal strokes forming an "M" — inline SVG at 32px in nav, 20px in footer. Easily swappable when real logo asset is available.
- **Nav CTA uses plain button/anchor**: Avoided the Button component to maintain compact sizing (text-sm, px-5 py-2.5) without fighting the component's base styles. Consistent visual language but independent sizing.
- **Footer as server component**: No client interactivity needed — pure HTML/CSS with static links and SVGs. Better performance.

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered
None

## User Setup Required
None - no external service configuration required.

## Next Phase Readiness
- Phase 2 (Hero & Conversion) is now complete — all 3 plans executed
- Complete landing page with hero, nav, bottom CTA, footer, email capture, and welcome email
- Ready for Phase 3 (Feature Sections & Content) to build out the marketing content below the fold
- Real iOS simulator screenshots needed before Phase 3 feature sections can show actual app UI

---
*Phase: 02-hero-conversion*
*Completed: 2026-02-16*
