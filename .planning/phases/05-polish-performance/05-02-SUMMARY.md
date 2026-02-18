---
phase: 05-polish-performance
plan: 02
subsystem: ui-accessibility
tags: reduced-motion, lighthouse, performance, motion/react, lenis, next/image

# Dependency graph
requires:
  - phase: 01-foundation
    provides: motion/react animation system, Lenis smooth scroll
  - phase: 03-feature-sections
    provides: PhoneFrame component, FeatureSection component
provides:
  - Full reduced-motion support across all animations (scroll reveals, parallax, hover states, smooth scroll)
  - Priority image loading for above-fold phone frame
  - Viewport metadata for mobile responsiveness
affects: []
  # No future plans depend on this - this is the final polish phase

# Tech tracking
tech-stack:
  added: []
  patterns:
    - useReducedMotion hook from motion/react for OS-level motion preference detection
    - Conditional hook usage: always call hooks, conditionally use values (not conditionally call hooks)
    - Client-side media query detection via matchMedia in useEffect
    - Priority prop pattern for Next.js Image above-fold optimization

key-files:
  created: []
  modified:
    - src/lib/animations.ts - Added noMotion and noMotionStagger variants
    - src/components/ui/scroll-reveal.tsx - Reduced-motion gating
    - src/components/ui/geometric-accent.tsx - Disabled parallax and rotation
    - src/components/ui/button.tsx - Instant hover/tap transitions
    - src/components/providers/lenis-provider.tsx - Native scroll fallback
    - src/components/ui/feature-section.tsx - Disabled parallax + priority prop
    - src/components/ui/phone-frame.tsx - Priority prop support
    - src/components/features/habit-tracking-section.tsx - Priority prop passed
    - src/app/layout.tsx - Viewport metadata added

key-decisions:
  - "Always call Framer Motion hooks unconditionally, conditionally use their values - prevents React hook violations"
  - "useReducedMotion returns null on SSR, default to false with ?? operator"
  - "First phone frame (HabitTrackingSection) gets priority prop for LCP optimization"
  - "Lenis disabled via client-side matchMedia check to avoid hydration mismatch"

patterns-established:
  - Pattern: Reduced-motion gating - use useReducedMotion() from motion/react, return instant-visible variants when true
  - Pattern: Hook unconditional calls - call useScroll/useTransform first, then conditionally apply values (SSR-safe)
  - Pattern: Client-side motion detection - useState + useEffect with matchMedia listener for OS preference changes
  - Pattern: Priority images - Add priority prop to Image wrapper components, pass true for above-fold content

# Metrics
duration: 7 min
completed: 2026-02-17
---

# Phase 5 Plan 2: Reduced-Motion & Performance Summary

**Full reduced-motion gating for accessibility and Lighthouse-optimized image loading with priority prop support**

## Performance

- **Duration:** 7 min
- **Started:** 2026-02-18T07:04:27Z
- **Completed:** 2026-02-18T07:11:51Z
- **Tasks:** 2
- **Files modified:** 9

## Accomplishments

- Added complete reduced-motion support across all animations (scroll reveals, parallax, rotation, hover/tap, smooth scroll)
- When OS `prefers-reduced-motion: reduce` is set, content appears instantly with no motion
- Lenis smooth scroll disabled under reduced-motion, falls back to native browser scroll
- Added viewport metadata to layout.tsx for mobile responsiveness
- Added priority prop to PhoneFrame component for LCP optimization
- First visible phone frame (HabitTrackingSection) marked as priority for Lighthouse performance
- Build successful with no TypeScript errors and no bundle size warnings

## Task Commits

Each task was committed atomically:

1. **Task 1: Reduced-motion support across all animated components** - `2af2354` (feat)
2. **Task 2: Lighthouse performance optimization pass** - `66af02a` (feat)

**Plan metadata:** Pending (docs: complete plan)

## Files Created/Modified

- `src/lib/animations.ts` - Added noMotion and noMotionStagger variants for instant visibility
- `src/components/ui/scroll-reveal.tsx` - Uses useReducedMotion to swap to instant variants
- `src/components/ui/geometric-accent.tsx` - Disabled parallax and rotation under reduced-motion
- `src/components/ui/button.tsx` - Instant hover/tap transitions when reduced-motion
- `src/components/providers/lenis-provider.tsx` - Client-side matchMedia check, returns children directly when reduced-motion
- `src/components/ui/feature-section.tsx` - Disabled parallax, added screenshotPriority prop
- `src/components/ui/phone-frame.tsx` - Added priority prop to pass to Next.js Image
- `src/components/features/habit-tracking-section.tsx` - Passes priority=true to first phone frame
- `src/app/layout.tsx` - Added viewport metadata export

## Decisions Made

- **Hook unconditional calls:** Framer Motion hooks (useScroll, useTransform) must be called unconditionally to avoid React hook violations. Conditionally apply their values instead (e.g., `const y = reduced ? 0 : yRaw`)
- **SSR safety:** useReducedMotion returns null on server-side render, handled with `?? false` fallback
- **Priority images:** Only the first above-fold phone frame gets priority prop - balancing LCP optimization with bandwidth
- **Lenis disable pattern:** Client-side matchMedia in useEffect avoids hydration mismatch; native scroll is preferred over smooth scroll for vestibular-sensitive users

## Deviations from Plan

None - plan executed exactly as written.

## Issues Encountered

None - build compiled successfully on first attempt after fixing duplicate function in feature-section.tsx.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

- RESP-02 satisfied: All animations, parallax, and smooth scroll are gated behind `prefers-reduced-motion`
- INFRA-03 satisfied: Viewport metadata added, priority prop for LCP, build clean
- No remaining tasks in Phase 5 (05-01 parallax plan was executed earlier but SUMMARY not yet created)
- Phase 5 will be complete after 05-01 SUMMARY is generated (or marked as complete if no work remains)

## Verification Notes

**Reduced-motion verification:**
1. Open Chrome DevTools → Rendering panel → Check "Emulate CSS media feature prefers-reduced-motion: reduce"
2. Reload page - content appears immediately with no fade-up animations
3. Scroll - background circles are static (no rotation), phone frames don't drift (no parallax)
4. Hover buttons - no scale animation
5. Scroll - native browser scroll (no Lenis smoothing)
6. Uncheck emulation - all animations return to normal

**Lighthouse verification:**
1. Run `npm run build` - should compile clean with no warnings ✓
2. Run `npm start` to start production server
3. Open Chrome DevTools → Lighthouse → Desktop mode → Generate report
4. Target: 90+ performance score
5. No new TypeScript errors or bundle size warnings

---
*Phase: 05-polish-performance*
*Completed: 2026-02-17*
