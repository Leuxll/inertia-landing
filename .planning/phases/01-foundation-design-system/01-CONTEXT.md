# Phase 1: Foundation & Design System - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

A deployable dark-themed skeleton with correct fonts, smooth scrolling, responsive viewport handling, and the two-state CTA architecture. This is the base every other phase builds on. No hero content, no email capture, no feature sections — just the scaffolding, theme, motion system, and component primitives.

</domain>

<decisions>
## Implementation Decisions

### Dark theme palette
- Stark minimal tone — near-black backgrounds, white text, barely any color (Linear/Vercel territory)
- Near monochrome — color only on CTA buttons, no decorative accent colors
- Single surface level (#0a0a0a everywhere) — sections divided by spacing and typography, not background shifts
- Text hierarchy via contrast: pure white (#fff) for headings, lighter gray (~#a1a1a1) for body text

### Typography hierarchy
- Editorial + cinematic personality — large, commanding Playfair Display headlines (72px+ on desktop), dramatic scale contrast with body text
- Playfair Display for all section headlines AND key accent phrases/pull quotes; Inter for everything else
- Balanced whitespace — enough to breathe but not wasteful of vertical space
- Body text size: Claude's discretion (pick what balances with the large headline scale)

### Scroll & motion feel
- Lenis smooth scroll: subtle enhancement — slight momentum, responsive, doesn't fight user intent
- Scroll-triggered reveal style: Claude's discretion (pick what fits the editorial tone)
- Transition speed for hover/UI interactions: cinematic slow (700ms+), dramatic and intentional
- Easing: smooth easing (ease-out / ease-in-out) — natural and gentle, no bounce or spring physics

### Component primitives
- Core toolkit upfront: Button, Section, Container, Heading, Text, Divider — enough to build Phase 2 without creating new components
- Sharp corners (0px border-radius) everywhere — stark, editorial, high contrast geometric personality
- Primary CTA: solid white button with dark text — high visibility, bold
- Section layout approach: Claude's discretion (pick what fits the overall aesthetic of the landing page and the Momentum app brand)

### Claude's Discretion
- Body text size (balance with headline scale)
- Scroll-triggered reveal animation style (fade, slide, stagger — whatever fits editorial tone)
- Section layout approach (constrained center, full-bleed, or hybrid — match the Momentum brand aesthetic)
- Loading skeleton design
- Error state handling
- Exact spacing scale values

</decisions>

<specifics>
## Specific Ideas

- Aesthetic should feel editorial and cinematic — think magazine spread meets dark-mode product page
- The stark minimal + monochrome + sharp corners + slow transitions should create a premium, intentional feel — every element earns its place
- Near monochrome means color is rare and therefore powerful when it appears (CTA buttons)
- The brand voice is philosophical/existential ("It Hurts. It Helps.") — the design system should match that gravity

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-design-system*
*Context gathered: 2026-02-16*
