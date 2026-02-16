# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-02-16)

**Core value:** Convert visitors into waitlist signups or App Store downloads by communicating what makes Momentum different — a brutally honest, beautifully designed habit tracker that respects your wallet.
**Current focus:** Phase 2: Hero & Conversion

## Current Position

Phase: 2 of 5 (Hero & Conversion)
Plan: 2 of 3 in current phase
Status: In progress
Last activity: 2026-02-16 — Completed 02-02-PLAN.md

Progress: [█████░░░░░░░░] 5/13 (~38%)

## Performance Metrics

**Velocity:**
- Total plans completed: 5
- Average duration: 2.6 min
- Total execution time: 13 min

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1. Foundation | 3/3 | 9 min | 3 min |
| 2. Hero & Conversion | 2/3 | 4 min | 2 min |

**Recent Trend:**
- Last 5 plans: 01-02 (3 min), 01-03 (2 min), 02-01 (2 min), 02-02 (2 min)
- Trend: stable fast

*Updated after each plan completion*

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- [Roadmap]: Build in layers — foundation → conversion → content → Remotion → polish. Remotion isolated so it never blocks shipping.
- [Roadmap]: Two-state CTA (env var) goes in Phase 1 foundation, not Phase 2, because it's an architectural decision that affects every CTA component.
- [Roadmap]: RESP-01 and RESP-03 in Phase 1 (not Phase 5) — responsive viewport and contrast must be right from day one per research pitfall guidance.
- [01-01]: Tailwind v4 @theme for all design tokens (no tailwind.config.ts) — CSS-native, tokens auto-become utilities
- [01-01]: Font CSS variables on html, mapped to semantic @theme tokens (font-display, font-body)
- [01-02]: syncTouch: false (not touchSmooth) — Lenis v1.3 API for native touch scroll
- [01-02]: NEXT_PUBLIC_CTA_MODE prefix required for client component env var access in Next.js
- [01-03]: Explicit ButtonProps (not extending HTML button props) to avoid motion onDrag type conflict
- [01-03]: cn() utility in src/lib/utils.ts (clsx + tailwind-merge) for all className composition
- [02-01]: AnimatePresence mode="wait" for inline form-to-success crossfade (no toast, no navigation)
- [02-01]: Two counter-rotating circles for geometric accent at 3-4% opacity — ambient depth, not a feature
- [02-02]: In-memory rate limiter (no Redis) — acceptable for serverless landing page, cold starts reset
- [02-02]: Inline HTML email, no React Email dependency — single template doesn't justify a framework
- [02-02]: Duplicate signups return success to user but skip welcome email re-send

### Pending Todos

None yet.

### Blockers/Concerns

- Real iOS simulator screenshots needed before Phase 3 content can be finalized (production asset dependency, not code dependency)
- Resend domain verification (DKIM/SPF/DMARC) should happen early in Phase 2 to avoid spam issues
- Remotion composition designs (habit checkoff, heatmap fill) need to be designed before Phase 4

## Session Continuity

Last session: 2026-02-16
Stopped at: Completed 02-02-PLAN.md
Resume file: None
