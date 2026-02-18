# Phase 5: Polish & Performance - Context

**Gathered:** 2026-02-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Make the page feel premium and cinematic — parallax depth on scroll, micro-interactions on interactive elements, full reduced-motion support, and verified Lighthouse 90+ performance. No new content or sections; this phase refines what already exists.

</domain>

<decisions>
## Implementation Decisions

### Claude's Discretion

The user explicitly delegated all aesthetic and technical decisions to Claude across all four areas:

- **Parallax & depth** — Choose which elements move, how much, and at what scroll rate. Aim for subtle ambient depth (background layers, device frames) rather than dramatic foreground movement. Should reinforce the cinematic dark aesthetic without distracting from content.
- **Micro-interactions** — Decide which elements get hover/tap states and what form they take (glow, lift, scale, underline). Buttons, nav CTA, feature cards, and pricing tier are the primary candidates. Keep interactions consistent with the brand: restrained, intentional, not flashy.
- **Reduced-motion** — Implement conservatively: `prefers-reduced-motion: reduce` disables all scroll animations, parallax, and transitions. Replace with immediate visibility (no fade-in delay). Static screenshots stay static.
- **Performance** — Target Lighthouse 90+ desktop as the floor. Optimize images (next/image with correct sizing/formats), audit bundle splits, remove unused dependencies. Do not sacrifice visual quality for marginal performance gains.

</decisions>

<specifics>
## Specific Ideas

No specific requirements — open to standard approaches. Claude should draw on the established brand tokens (dark theme, Playfair Display headlines, restrained geometric accents) to ensure polish feels native to the existing design system rather than added on top.

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope.

</deferred>

---

*Phase: 05-polish-performance*
*Context gathered: 2026-02-17*
