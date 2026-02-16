# Momentum Landing Page

## What This Is

A single-page marketing landing page for Momentum, a minimalist habit tracking iOS app. The page serves as the primary web presence for Momentum — showcasing features, communicating the "Anti-Subscription" positioning, and converting visitors into waitlist signups (pre-launch) or App Store downloads (post-launch). Built to match the app's monochromatic, philosophical, cinematic aesthetic.

## Core Value

The landing page must convert visitors into waitlist signups (State A) or App Store downloads (State B) by communicating what makes Momentum different: a brutally honest, beautifully designed habit tracker that respects your wallet.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Two-state page: waitlist email capture (State A) swaps to App Store download link (State B)
- [ ] Rich feature showcase with animated app previews (Remotion) and real simulator screenshots
- [ ] Cinematic scroll experience with parallax, scroll-triggered animations, and motion
- [ ] Monochromatic black (#0a0a0a) / off-white (#f4f4f0) aesthetic matching the Momentum app
- [ ] Playfair Display (serif display) + Inter (sans-serif body) typography system
- [ ] "The Anti-Subscription Habit Tracker" hero positioning
- [ ] Email capture integrated with Resend for waitlist collection (target: 50-100 pre-launch emails)
- [ ] Launch feature sections: habit tracking, insights/heatmaps, philosophical onboarding, customization
- [ ] "What's Next" teaser section for upcoming features (AI reflections, token economy)
- [ ] Deployable on Vercel

### Out of Scope

- Multi-page site (blog, docs, about pages) — single page only
- HealthKit integration showcase — utility feature, not differentiating enough to feature
- User accounts or dashboard on the website — this is a marketing page
- Mobile app download tracking/analytics — keep simple for launch
- Terms of Service / Privacy Policy pages — placeholder links until domain secured

## Context

**The App:** Momentum is a React Native (Expo) habit tracker for iOS. It's heavily inspired by Co-Star's aesthetic — monochromatic, existential/philosophical tone, premium minimalism. The app features a dramatic onboarding "ritual," animated heatmaps, consistency insights, and a unique rest token economy. AI-powered reflections and HealthKit integration are planned but deferred past launch.

**Positioning:** "The Anti-Subscription Habit Tracker" — Momentum will be free to use with an optional Pro tier that offers both a yearly subscription AND a one-time purchase option. This gives users the choice most habit trackers don't.

**Two-State Strategy:**
- **State A (Now → Apple approval):** Hero headline + email capture CTA ("Get Early Access"). Goal: collect emails to blast on launch day to spike the App Store algorithm.
- **State B (Launch day):** Same headline, CTA swaps to "Download on App Store" button. Immediate conversion.

**Visual DNA from the app:**
- Colors: Near-black background (#0a0a0a), warm off-white text (#f4f4f0), surface cards (#1A1A1A), subtle borders (rgba(244,244,240,0.1))
- Fonts: Playfair Display (headlines, display) + Inter (body, UI labels)
- Patterns: Uppercase tracking-wide labels, serif italic for metrics/numbers, high contrast, generous negative space
- Tone: Philosophical, existential, brutally honest — "Stop Guessing. Start Tracking.", "It Hurts. It Helps."
- Animations: Spring-based, fade reveals, spinning geometric elements

**App taglines available for use:**
- "Stop Guessing. Start Tracking."
- "Growth Is Always Built On Structure."
- "It Hurts. It Helps."
- "The Real Goal: Know Your Self."
- "Decode the habits that define you."
- "Entropy is rising. Re-calibrate."

**Assets needed from app:** Real simulator screenshots, Remotion video compositions of app interactions (animated checkbox, heatmap filling, onboarding scroll, insights reveal).

## Constraints

- **Tech stack**: Next.js + Remotion + Tailwind CSS + Resend — aligns with React ecosystem from the app
- **Deployment**: Vercel (free tier)
- **Domain**: Not yet secured — will use Vercel default URL initially
- **Aesthetic**: Must faithfully match Momentum app's monochromatic, Co-Star-inspired visual language
- **Content**: Real screenshots from iOS simulator required (not mockups)
- **State switching**: Must support clean swap between waitlist mode and download mode without redeployment (environment variable or feature flag)

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Single page over multi-page | Focus conversion, reduce scope, match launch timeline | — Pending |
| Remotion for animated previews | Premium feel, shows app interactions in motion, React-based so fits stack | — Pending |
| Resend for email capture | Simple API, free tier sufficient for 50-100 emails, first-party Next.js SDK | — Pending |
| Show future features as teaser | AI + tokens are differentiators worth teasing, but honest about timeline | — Pending |
| Skip HealthKit on landing page | Utility feature, not exciting enough to showcase pre-launch | — Pending |
| Free + subscription + one-time purchase model | "Anti-Subscription" = giving users choice, not eliminating paid tier | — Pending |

---
*Last updated: 2026-02-16 after initialization*
