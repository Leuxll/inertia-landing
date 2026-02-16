# Roadmap: Momentum Landing Page

## Overview

The Momentum landing page is built in five phases ordered by dependency chain and risk isolation. Phase 1 establishes the foundation (Next.js scaffold, dark theme, fonts, smooth scroll, responsive base, and the two-state CTA architecture). Phase 2 delivers the conversion core — a fully functional hero + email capture that can start collecting waitlist signups immediately. Phase 3 fills in the visual content (feature sections, device frames, pricing, scroll animations). Phase 4 layers in Remotion animated previews as an enhancement that never blocks shipping. Phase 5 polishes with parallax, micro-interactions, accessibility refinements, and performance tuning to hit Lighthouse 90+.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Design System** - Next.js scaffold, dark theme, typography, smooth scroll, responsive base, CTA state config, Vercel deploy
- [ ] **Phase 2: Hero & Conversion** - Hero section, two-state CTA, email capture via Resend, sticky nav, footer, bottom CTA repeat
- [ ] **Phase 3: Feature Sections & Content** - Feature showcase with device-framed screenshots, pricing section, What's Next teaser, scroll-triggered reveals
- [ ] **Phase 4: Remotion Integration** - Animated app preview compositions embedded in feature sections, lazy-loaded below the fold
- [ ] **Phase 5: Polish & Performance** - Parallax effects, micro-interactions, reduced-motion support, Lighthouse 90+ optimization

## Phase Details

### Phase 1: Foundation & Design System
**Goal**: A deployable dark-themed skeleton with correct fonts, smooth scrolling, responsive viewport handling, and the two-state CTA architecture — the base every other phase builds on
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, VIS-01, VIS-02, NAV-03, HERO-04, RESP-01, RESP-03
**Success Criteria** (what must be TRUE):
  1. Visiting the Vercel URL shows a dark (#0a0a0a) page with Playfair Display headline text and Inter body text, no flash of unstyled content
  2. Page scrolls with smooth cinematic behavior (Lenis) on desktop and falls back to native scroll on touch devices
  3. Page renders correctly on mobile (375px), tablet (768px), and desktop (1440px) viewports using `100dvh` for full-height sections
  4. Setting `CTA_MODE=waitlist` vs `CTA_MODE=download` environment variable changes a visible placeholder element on the page (proving the two-state config works end-to-end)
  5. All text on the page meets WCAG AA contrast ratio (4.5:1 minimum) against dark backgrounds
**Plans:** 3 plans

Plans:
- [x] 01-01-PLAN.md — Next.js scaffold, Tailwind v4 dark theme tokens, font loading, placeholder page
- [x] 01-02-PLAN.md — Lenis smooth scroll, CTA state config system, animation foundation, scroll-reveal
- [x] 01-03-PLAN.md — Component primitives (Button, Section, Container, Heading, Text, Divider, CtaBlock), contrast audit, responsive validation

### Phase 2: Hero & Conversion
**Goal**: A functional landing page that converts visitors — hero headline above the fold, working email capture in waitlist mode, App Store link in download mode, sticky nav, footer, and bottom CTA repeat
**Depends on**: Phase 1
**Requirements**: HERO-01, HERO-02, HERO-03, HERO-05, HERO-06, HERO-07, NAV-01, NAV-02, INFRA-02
**Success Criteria** (what must be TRUE):
  1. User sees "The Anti-Subscription Habit Tracker" headline and compelling subhead above the fold within 2 seconds of page load
  2. In waitlist mode: user can type email, submit, and receive a branded welcome email in their inbox (via Resend) with rate limiting preventing abuse
  3. In download mode: user sees an App Store download button that links to the correct app listing
  4. User sees a sticky nav bar (logo left, CTA right) that remains visible while scrolling, and a footer with Privacy Policy, Terms of Service placeholder links and contact email
  5. User sees a repeating CTA at the bottom of the page that matches the hero CTA behavior (email form or download button depending on state)
**Plans**: TBD

Plans:
- [ ] 02-01: Hero section — headline, subhead, two-state CTA component (email form + App Store button)
- [ ] 02-02: Email capture backend — Resend API route, validation, rate limiting, welcome email template
- [ ] 02-03: Navigation and footer — sticky nav bar, footer with placeholder links, bottom CTA repeat, waitlist counter

### Phase 3: Feature Sections & Content
**Goal**: Visitors understand what Momentum does and why it's different — feature showcase sections with real app screenshots in device frames, pricing/value transparency, What's Next teaser, all animated with scroll-triggered reveals
**Depends on**: Phase 2
**Requirements**: FEAT-01, FEAT-02, FEAT-04, FEAT-05, VIS-03, VIS-06
**Success Criteria** (what must be TRUE):
  1. User can scroll through 3-5 distinct feature sections (habit tracking, heatmaps/insights, philosophical onboarding, customization) each with a headline, description, and real app screenshot inside a consistent iPhone device frame
  2. Each feature section animates into view as the user scrolls to it (fade, slide, or stagger reveals — not visible on initial page load)
  3. User sees a pricing/value section clearly communicating "Free forever" with optional Pro tier (yearly subscription or one-time purchase)
  4. User sees a "What's Next" teaser section that presents AI reflections and token economy as upcoming features with an honest "coming soon" tone
  5. All copy across feature sections follows the philosophical/existential tone of the Momentum brand ("It Hurts. It Helps.", "Decode the habits that define you.")
**Plans**: TBD

Plans:
- [ ] 03-01: ScrollReveal wrapper, FeatureSection component, PhoneFrame device frame component
- [ ] 03-02: Feature content sections — habit tracking, heatmaps, insights, onboarding (with real screenshots)
- [ ] 03-03: Pricing/value section, What's Next teaser section, brand copy refinement

### Phase 4: Remotion Integration
**Goal**: Key feature sections are elevated with animated Remotion compositions showing the app in motion — lazy-loaded to protect performance, with static screenshots as fallback
**Depends on**: Phase 3
**Requirements**: FEAT-03
**Success Criteria** (what must be TRUE):
  1. User sees at least 2 animated app previews (e.g., habit checkoff animation, heatmap filling) embedded within feature sections, playing automatically when scrolled into view
  2. Remotion compositions are lazy-loaded (not included in initial page bundle) and the page's first-load JS remains under 200KB
  3. If Remotion fails to load or on slow connections, the user still sees static screenshots in device frames (graceful fallback)
**Plans**: TBD

Plans:
- [ ] 04-01: Remotion project setup, composition design, lazy-loaded PreviewPlayer component
- [ ] 04-02: Integrate compositions into feature sections with viewport-triggered autoplay and static fallbacks

### Phase 5: Polish & Performance
**Goal**: The page feels premium and cinematic — parallax depth, micro-interactions on every interactive element, accessibility-complete reduced-motion support, and verified Lighthouse 90+ performance
**Depends on**: Phase 4
**Requirements**: VIS-04, VIS-05, RESP-02, INFRA-03
**Success Criteria** (what must be TRUE):
  1. Background elements or device mockups have subtle parallax depth effects that respond to scroll position, creating a layered cinematic feel
  2. All interactive elements have micro-interactions: buttons glow/lift on hover, cards elevate, transitions feel smooth and intentional
  3. With `prefers-reduced-motion: reduce` enabled in OS settings, all scroll animations, parallax effects, and Remotion compositions are disabled or replaced with static equivalents
  4. Page scores 90+ on Lighthouse performance audit (desktop), with optimized images, minimal layout shift, and efficient bundle splitting

**Plans**: TBD

Plans:
- [ ] 05-01: Parallax depth effects and micro-interactions across all sections
- [ ] 05-02: Reduced-motion support, accessibility audit, Lighthouse performance optimization

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5

| Phase | Plans Complete | Status | Completed |
|-------|---------------|--------|-----------|
| 1. Foundation & Design System | 3/3 | ✓ Verified | 2026-02-16 |
| 2. Hero & Conversion | 0/3 | Not started | - |
| 3. Feature Sections & Content | 0/3 | Not started | - |
| 4. Remotion Integration | 0/2 | Not started | - |
| 5. Polish & Performance | 0/2 | Not started | - |

---
*Roadmap created: 2026-02-16*
*Last updated: 2026-02-16*
