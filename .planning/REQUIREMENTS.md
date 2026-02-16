# Requirements: Momentum Landing Page

**Defined:** 2026-02-16
**Core Value:** Convert visitors into waitlist signups (pre-launch) or App Store downloads (post-launch) by communicating what makes Momentum different: a brutally honest, beautifully designed habit tracker that respects your wallet.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Hero & Conversion

- [ ] **HERO-01**: User sees "The Anti-Subscription Habit Tracker" headline and subhead above the fold within 2 seconds of page load
- [ ] **HERO-02**: User can enter email and submit to join waitlist (State A: pre-launch)
- [ ] **HERO-03**: User sees App Store download button linking to the app listing (State B: post-launch)
- [ ] **HERO-04**: Page state (waitlist vs download) is controlled by a single environment variable, switchable without code changes
- [ ] **HERO-05**: User sees a repeating CTA at the bottom of the page matching the hero CTA
- [ ] **HERO-06**: User sees waitlist count next to email input (displayed only when count exceeds 25)
- [ ] **HERO-07**: User receives a welcome email after joining the waitlist with Momentum branding/content

### Navigation & Structure

- [ ] **NAV-01**: User sees a sticky navigation bar with logo on left and CTA button on right
- [ ] **NAV-02**: User sees a footer with placeholder Privacy Policy, Terms of Service links and contact email
- [ ] **NAV-03**: Page scrolls with cinematic smooth scrolling behavior (Lenis)

### Feature Showcase

- [ ] **FEAT-01**: User can scroll through 3-5 feature sections showcasing habit tracking, heatmaps, insights, and onboarding
- [ ] **FEAT-02**: Each feature section displays real app screenshots inside a consistent device frame (iPhone)
- [ ] **FEAT-03**: Key feature sections include animated Remotion compositions showing app interactions in motion
- [ ] **FEAT-04**: User sees a "What's Next" section teasing AI reflections and token economy as upcoming features
- [ ] **FEAT-05**: User sees a pricing/value section communicating free tier and Pro options (yearly sub or one-time purchase)

### Design System & Visual

- [ ] **VIS-01**: Page uses monochromatic dark theme matching the app (#0a0a0a background, #f4f4f0 text, #1A1A1A surfaces)
- [ ] **VIS-02**: Page uses Playfair Display for display/headlines and Inter for body text, loaded via next/font
- [ ] **VIS-03**: Sections animate into view with scroll-triggered reveals (fade, slide, stagger)
- [ ] **VIS-04**: Page includes subtle parallax depth effects on background elements or device mockups
- [ ] **VIS-05**: Interactive elements have micro-interactions (button glows, card lifts, smooth transitions)
- [ ] **VIS-06**: All copy follows the philosophical/existential tone matching the Momentum app brand

### Responsive & Accessibility

- [ ] **RESP-01**: Page is fully responsive across mobile, tablet, and desktop viewports
- [ ] **RESP-02**: Animations respect `prefers-reduced-motion` user setting
- [ ] **RESP-03**: Text contrast meets WCAG AA standards on dark backgrounds

### Infrastructure

- [ ] **INFRA-01**: Page is built with Next.js App Router and deploys to Vercel
- [ ] **INFRA-02**: Email capture uses Resend via Next.js API route with validation and rate limiting
- [ ] **INFRA-03**: Page achieves Lighthouse performance score of 90+ on desktop

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Social Proof

- **SOCL-01**: User sees testimonials from real users in a clean grid layout
- **SOCL-02**: User sees App Store rating and review excerpts pulled dynamically

### Optimization

- **OPT-01**: Multiple headline variants are A/B tested for conversion
- **OPT-02**: Page supports multiple languages based on browser locale

### Visual Enhancement

- **VISE-01**: Hero section includes ambient video background with motion
- **VISE-02**: Feature sections include scroll-controlled interactive app demos

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| Multi-page site (blog, about, docs) | Single page only — content marketing is post-launch |
| Complex navigation / hamburger menu | Page IS the navigation — you scroll it |
| Competitor comparison tables | Premium brands don't acknowledge competitors |
| Chatbot / live chat widget | No product to support pre-launch, adds JS bloat |
| Google Play / Android mentions | iOS only — false expectations |
| Cookie consent banner | No tracking cookies planned — no legal requirement |
| Exit-intent popup | Contradicts premium philosophical brand |
| Full pricing page / tier comparison | Mobile app pricing belongs in App Store, not a landing page |
| Autoplay video with sound | Browsers block it, users hate it |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| HERO-01 | — | Pending |
| HERO-02 | — | Pending |
| HERO-03 | — | Pending |
| HERO-04 | — | Pending |
| HERO-05 | — | Pending |
| HERO-06 | — | Pending |
| HERO-07 | — | Pending |
| NAV-01 | — | Pending |
| NAV-02 | — | Pending |
| NAV-03 | — | Pending |
| FEAT-01 | — | Pending |
| FEAT-02 | — | Pending |
| FEAT-03 | — | Pending |
| FEAT-04 | — | Pending |
| FEAT-05 | — | Pending |
| VIS-01 | — | Pending |
| VIS-02 | — | Pending |
| VIS-03 | — | Pending |
| VIS-04 | — | Pending |
| VIS-05 | — | Pending |
| VIS-06 | — | Pending |
| RESP-01 | — | Pending |
| RESP-02 | — | Pending |
| RESP-03 | — | Pending |
| INFRA-01 | — | Pending |
| INFRA-02 | — | Pending |
| INFRA-03 | — | Pending |

**Coverage:**
- v1 requirements: 27 total
- Mapped to phases: 0
- Unmapped: 27 ⚠️

---
*Requirements defined: 2026-02-16*
*Last updated: 2026-02-16 after initial definition*
