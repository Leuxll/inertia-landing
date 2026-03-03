# COMPONENTS KNOWLEDGE BASE

## OVERVIEW

Landing page component system split into reusable primitives (`ui/`) and page-specific sections (`features/`).

## STRUCTURE

```
components/
├── ui/                          # Reusable primitives
│   ├── section.tsx              # Layout container: fullHeight, density (hero/airy/standard/dense)
│   ├── cta-block.tsx            # Waitlist form: CtaBlock → WaitlistForm + SuccessMessage
│   ├── phone-frame.tsx          # Generic phone mockup with masked viewport + safe area
│   ├── hero-phone.tsx           # Hero-specific phone frame (same mask pattern, hero sizing)
│   ├── heading.tsx              # Typography primitive for section headings
│   ├── geometric-accent.tsx     # Decorative background shapes with parallax
│   ├── geometric-divider.tsx    # Section transition dividers (currently removed from page)
│   └── scroll-indicator.tsx     # Scroll affordance animation
├── features/                    # Page-specific sections (self-contained)
│   ├── hero-section.tsx         # Hero: editorial headline, CTA form, phone mock, founder note
│   ├── core-experience-section.tsx  # Image-left / card-right layout
│   ├── insight-section.tsx      # "More Than Streaks": two-column premium cards
│   ├── pricing-section.tsx      # Pricing display
│   ├── faq-section.tsx          # Objection-handling FAQ with analytics events
│   ├── whats-next-section.tsx   # Roadmap/future section
│   └── bottom-cta-section.tsx   # Final CTA with viewport-aware min-height
├── providers/                   # Context providers (analytics, theme)
├── footer.tsx                   # Site footer (rendered at page level, not inside CTA)
├── nav.tsx                      # Navigation bar
└── waitlist-counter.tsx         # Live waitlist count display
```

## WHERE TO LOOK

| Task | Primary File | Notes |
|------|-------------|-------|
| Change section spacing/height | `ui/section.tsx` | `fullHeight` → `min-h-dvh py-0`; density controls padding |
| Fix phone screenshot clipping | `ui/phone-frame.tsx` or `ui/hero-phone.tsx` | Both use masked viewport + safe-area inset |
| Modify waitlist form UX | `ui/cta-block.tsx` + `lib/use-waitlist-form.ts` | UI in cta-block, logic in hook |
| Add a new landing section | `features/` + `app/page.tsx` | Create component, add to page orchestrator |
| Adjust final CTA height | `features/bottom-cta-section.tsx` | Uses `min-h-[calc(100dvh-Xrem)]`, not fullHeight |

## CONVENTIONS

- **Section system**: All feature sections wrap content in `<Section>`. Use `fullHeight` for viewport-height pages. Use `density` for padding presets (`hero` > `airy` > `standard` > `dense`).
- **Phone frames**: `phone-frame.tsx` is the generic reusable mock. `hero-phone.tsx` is hero-specific with same mask pattern but different sizing. Both use `overflow-hidden` + rounded mask + inner safe-area inset (`inset-[8px]`) + `object-contain` to avoid clipping screenshot content.
- **Screenshot images**: Stored in `public/screenshots/`. Current set: `home.png`, `insights.png`, `habits.png`, `details.png`, `habit-detail.png`, `templates.png`.
- **CTA architecture**: `CtaBlock` accepts `placement` prop ("hero" vs "bottom") which controls button text and analytics event data. Form logic lives in `useWaitlistForm` hook.
- **Feature sections are self-contained**: Each `*-section.tsx` owns its own copy, layout, and styling. No shared state between sections.

## ANTI-PATTERNS

- Do NOT put footer inside bottom-cta-section — it inflates container height. Footer is rendered at page level.
- Do NOT use `object-cover` on phone screenshots without safe-area inset — it clips corner content.
- Do NOT use `fullHeight` on bottom-cta-section — use responsive `min-h-[calc(100dvh-Xrem)]` to account for footer.
- Do NOT add geometric dividers between sections — they were explicitly removed for cleaner page-like scrolling.
