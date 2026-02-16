# Phase 2: Hero & Conversion - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

A functional conversion-focused landing page: full-screen centered hero with headline, subhead, and working email capture (waitlist mode) or App Store link (download mode), sticky nav that builds up on scroll, footer with links, and a bottom CTA repeat. Phase 1 primitives (Button, Section, Container, Heading, Text, Divider, CtaBlock) are the building blocks.

</domain>

<decisions>
## Implementation Decisions

### Hero layout & visual impact
- Full-screen centered composition — headline, subhead, and CTA stacked dead center on dark canvas
- Layered headline hierarchy: small uppercase tracking-wide label at top (e.g. "MOMENTUM" or "INTRODUCING"), then large Playfair Display headline ("The Anti-Subscription Habit Tracker"), then 1-2 sentence subhead in Inter
- Single subtle geometric accent element in the background (thin circle, line, or rotating shape) — adds depth without competing with text, fits the Co-Star cosmic aesthetic
- Generous negative space between all hero elements — luxury brand feel, the page breathes

### Email capture experience
- Stacked form layout: email input on its own line, full-width "Get Early Access" submit button below it
- On successful submission, the form fades/transforms inline into a confirmation message (e.g. "You're in. Check your inbox.") — no page navigation, no toast
- Welcome email is on-brand and minimal: dark background matching site aesthetic, short philosophical message, no images — "You're on the list. We'll be in touch."
- CTA button text in waitlist mode: "Get Early Access"

### Sticky nav behavior
- Minimal on hero, full on scroll: only the logo mark visible during the hero (no CTA button), then the full nav with CTA slides/fades in once user scrolls past the fold
- Left side: Momentum logo mark pulled from the Momentum app project (geometric icon, not text wordmark)
- Solid dark background (#0a0a0a) once fully visible — clean separation, no blur or transparency
- Nav CTA is a compact "Get Early Access" button that scrolls down to the hero email form (not a standalone form in the nav)

### Footer & bottom CTA
- Bottom CTA is a minimal nudge — just the email form with a short line like "Ready?" — no headline repeat, understated closing
- Footer is light but structured: small logo, column of links, copyright line — two to three rows max
- Links: Privacy Policy (placeholder), Terms of Service (placeholder), contact email, social links (Twitter/X, Instagram — even if not active yet, signals legitimacy)
- Copyright line is minimal: "Momentum (c) 2026" — nothing more

### Claude's Discretion
- Exact geometric accent element choice and animation (circle, line, rotating shape — whatever looks best)
- Email input placeholder text and styling details
- Form validation error states and messaging
- Nav scroll threshold (exactly how far past the fold before full nav appears)
- Nav transition animation (slide, fade, or combination)
- Footer layout grid and spacing
- Social link icon style
- Welcome email exact copy beyond the established tone

</decisions>

<specifics>
## Specific Ideas

- Hero follows the app's existing uppercase tracking-wide label pattern (already established in Phase 1 component primitives)
- Welcome email should feel like receiving a message from Co-Star — dark, minimal, philosophical
- The bottom CTA "Ready?" nudge is confident and understated — the page already did the selling
- Logo mark exists in the Momentum app project and should be imported/adapted for web use

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-hero-conversion*
*Context gathered: 2026-02-16*
