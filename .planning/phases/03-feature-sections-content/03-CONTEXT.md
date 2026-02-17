# Phase 3: Feature Sections & Content - Context

**Gathered:** 2026-02-16
**Status:** Ready for planning

<domain>
## Phase Boundary

Visitors understand what Momentum does and why it's different. Three feature showcase sections (habit tracking, heatmaps/insights, customization) with screenshots in device frames, a pricing/value philosophy section, a "What's Next" teaser for upcoming features, all with scroll-triggered reveals and brand-consistent philosophical copy. Onboarding section was deliberately cut — three strong sections, not four.

</domain>

<decisions>
## Implementation Decisions

### Feature section layout & flow
- Apple-inspired layout: large visuals, generous whitespace, each section is its own "moment" as you scroll
- Ultra-minimal copy per section: bold philosophical headline + one sentence max. Screenshot does the talking.
- Three feature sections in order: Habit Tracking → Heatmaps/Insights → Customization (onboarding cut)
- Claude's discretion on section height: full viewport vs tall natural flow — pick what feels right

### Screenshot handling & device frames
- Build with placeholder images now (solid colored rectangles or abstract fills inside frames). Real iOS simulator screenshots will be swapped in later.
- Flat minimal device frame: simple rounded rectangle with thin border, no depth, no 3D perspective. Matches the monochromatic aesthetic.
- Claude's discretion on one vs multiple screenshots per section
- Modest screenshot sizing: device frame is an accent, not the dominant element. The philosophical headline is the star.

### Pricing presentation
- Conversational tone, not a pricing table or cards. This is a value/philosophy statement.
- Pro features aren't launching yet — focus on the anti-subscription philosophy ("Free to use"), hint that Pro will come with a one-time purchase option
- Light teaser of 1-2 Pro features in passing (e.g., advanced insights, custom themes) but keep focus on the pricing model itself
- Equal visual weight to feature sections — this is a full "moment," not a lesser aside
- Claude's discretion on whether to include a simple icon/symbol or keep it purely typographic

### "What's Next" teaser tone
- Mix of philosophical voice and honest roadmap: mysterious/philosophical headline wrapping concrete feature names
- Three upcoming features teased: AI reflections, token economy, HealthKit
- Individual cards/blocks for each feature: headline + one line per feature, laid out as a row or grid
- Claude's discretion on whether to include a CTA tying back to the waitlist or let the bottom CTA section handle it

### Claude's Discretion
- Feature section height (full viewport vs tall natural flow)
- One vs multiple screenshots per feature section
- Pricing section visual element (icon/symbol vs purely typographic)
- "What's Next" CTA inclusion (tie to waitlist or let bottom CTA handle it)
- Loading skeleton design, exact spacing, typography scale
- Scroll-triggered animation styles (fade, slide, stagger — per section)

</decisions>

<specifics>
## Specific Ideas

- Apple product page as the reference for section rhythm and visual weight — each section is a cinematic "moment"
- Philosophical voice lives in the headlines themselves, not in explanatory paragraphs
- Pricing section is a brand statement, not a comparison chart — "No subscriptions. No trials. No tricks." energy
- "What's Next" combines mystery with transparency: tease without overpromising, name the features honestly

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 03-feature-sections-content*
*Context gathered: 2026-02-16*
