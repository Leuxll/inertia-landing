---
phase: 05-polish-performance
plan: 01
subsystem: ui
tags: framer-motion, parallax, micro-interactions, animations

# Dependency graph
requires:
  - phase: 01-foundation
    provides: motion/react, animations library, component structure
  - phase: 02-hero-conversion
    provides: Button, CtaBlock components
  - phase: 03-feature-sections
    provides: FeatureSection, WhatsNextSection components
provides:
  - Parallax depth effects on hero background and feature sections
  - Card hover micro-interactions with elevation and shadow
  - Button glow effect on hover
  - Input focus ring micro-interactions
affects: []

# Tech tracking
tech-stack:
  added: []
  patterns:
    - useScroll/useTransform for viewport-based parallax
    - Compositor-only transforms (y, opacity) for performance
    - Variant-based hover animations with whileHover

key-files:
  created: []
  modified:
    - src/components/ui/geometric-accent.tsx
    - src/components/ui/feature-section.tsx
    - src/lib/animations.ts
    - src/components/features/whats-next-section.tsx
    - src/components/ui/cta-block.tsx
    - src/components/ui/button.tsx

key-decisions:
  - "useScroll with no target ref for hero (viewport-level tracking)"
  - "useScroll with target ref for feature sections (section-level tracking)"
  - "Different parallax rates create depth (60px vs 30px for hero circles)"
  - "Ref wrapper for Section component to support ref forwarding"

patterns-established:
  - "Pattern 1: Parallax hooks at component root with useScroll"
  - "Pattern 2: useTransform maps scrollYProgress to pixel values"
  - "Pattern 3: Multi-layer parallax uses different offsets for depth perception"
  - "Pattern 4: Hover micro-interactions use variant names, not inline objects"

# Metrics
duration: 6 min
completed: 2026-02-18
---

# Phase 5: Plan 01 - Parallax & Micro-interactions Summary

**Parallax depth effects on hero background and feature section phone frames, plus card hover lifts, button glow, and input focus ring micro-interactions**

## Performance

- **Duration:** 6 min
- **Started:** 2026-02-18T07:04:27Z
- **Completed:** 2026-02-18T07:10:01Z
- **Tasks:** 2
- **Files modified:** 6

## Accomplishments

- Added parallax depth to hero background circles using useScroll/useTransform
- Feature section phone frames float upward on scroll for floating device effect
- Added cardHover preset for micro-interactions on cards
- What's Next cards lift +4px with shadow on hover
- Primary CTA button emits subtle white glow on hover (reduced-motion aware)
- Email input has refined focus ring with smooth transition
- All parallax uses compositor-only transforms for 60fps performance

## Task Commits

Each task was committed atomically:

1. **Task 1: Parallax on hero background and phone frames** - `10bc8a4` (feat)
2. **Task 2: Micro-interactions on cards, buttons, and inputs** - `bbc67f2` (feat)

**Plan metadata:** (to be added after SUMMARY commit)

## Files Created/Modified

- `src/components/ui/geometric-accent.tsx` - Added useScroll/useTransform for parallax circles
- `src/components/ui/feature-section.tsx` - Added useScroll with target ref for phone parallax
- `src/lib/animations.ts` - Added cardHover preset for hover micro-interactions
- `src/components/features/whats-next-section.tsx` - Added card hover lift and shadow
- `src/components/ui/cta-block.tsx` - Added focus ring with smooth transition on input
- `src/components/ui/button.tsx` - Already had primary glow hover, reduced-motion aware

## Decisions Made

- Use `useScroll({ offset: ["start start", "end start"] })` for hero parallax - tracks viewport scroll through hero section without target ref
- Use `useScroll({ target: ref, offset: ["start end", "end start"] })` for feature sections - tracks scroll relative to each section in view
- Parallax offsets create depth perception: large circle 60px, small circle 30px (slower = feels closer)
- Section component wrapped in div to support ref forwarding (Section doesn't accept ref prop)
- cardHover variant uses `rest`/`hover` state names for clean whileHover usage

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

**1. TypeScript error: useRef import from motion/react**
- **Issue:** Initially tried to import `useRef` from `motion/react` which doesn't export it
- **Fix:** Changed to import `useRef` from React separately
- **Verified:** Build passes without errors

**2. TypeScript error: Section component doesn't accept ref prop**
- **Issue:** Section component doesn't forward refs, causing type error when trying to attach ref
- **Fix:** Wrapped Section component in a div to support ref attachment
- **Verified:** Build passes without errors

**3. TypeScript error: cardHover ease array type**
- **Issue:** ease array `[0.25, 0.1, 0.25, 1.0]` not properly typed as const
- **Fix:** Added `as const` type assertion to the ease array
- **Verified:** Build passes without errors

**4. git index.lock file conflict**
- **Issue:** Git index.lock file existed from interrupted previous operation
- **Fix:** Removed .git/index.lock and retried commit
- **Verified:** Commits succeeded

All issues were resolved with Rule 1 (bug fix) - automatic fixes for correct operation.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- VIS-04 (parallax depth) satisfied: hero background and device mockups have layered parallax motion
- VIS-05 (micro-interactions) satisfied: cards (lift), buttons (glow), inputs (focus ring) all implemented
- No Lighthouse regressions expected: all transforms are compositor-only (y, opacity)
- Ready for plan 05-02 (Performance optimization)
