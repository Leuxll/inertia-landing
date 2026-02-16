# Project Research Summary

**Project:** Momentum Landing Page
**Domain:** Cinematic single-page app landing page (iOS habit tracker, pre-launch waitlist)
**Researched:** 2026-02-16
**Confidence:** HIGH

## Executive Summary

Momentum's landing page is a cinematic single-page marketing site for a minimalist iOS habit tracking app. The research confirms this is a well-understood product type — premium app landing pages have strong conventions established by Linear, Arc, Raycast, and Superhuman. The recommended stack is **Next.js 16 (App Router) + Tailwind CSS 4 + Motion 12 + Lenis + Remotion 4 + Resend**, all deployed on Vercel. Every technology is current stable, well-documented, and version-compatible. The stack is intentionally lean: no database, no CMS, no auth. The page has exactly one dynamic endpoint (email capture via Resend), everything else is static.

The recommended approach is to build in layers: **foundation first** (Next.js scaffold, Lenis smooth scroll, dark theme system, fonts), then **conversion-critical sections** (hero + two-state CTA + email capture), then **visual content** (feature sections with device frames and scroll animations), then **Remotion compositions** as an enhancement layer, and finally **polish** (parallax, micro-interactions, performance tuning). This layering is critical because the Remotion integration is the highest-complexity item and must not block the core page from being deployable. Static screenshots in device frames are the fallback that makes Remotion a nice-to-have, not a blocker.

The key risks are: (1) **Remotion Player bundle size** — it adds ~200KB+ to the client bundle and must be lazy-loaded with `next/dynamic({ ssr: false })` plus viewport-triggered mounting, (2) **iOS Safari scroll behavior** — `100dvh` must be used from day one, and Lenis's `smoothTouch` should stay disabled, and (3) **Resend domain verification** — DNS records (DKIM/SPF/DMARC) must be configured during setup, not at launch, or confirmation emails will land in spam. All three risks have straightforward mitigations if addressed in the correct phase.

## Key Findings

### Recommended Stack

The entire stack ships with `create-next-app` as a foundation, extended by four focused libraries. All versions are confirmed compatible with React 19 and Next.js 16 App Router. Total animation overhead is ~20KB gzipped (Motion tree-shaken + Lenis). Remotion is the heaviest addition (~200KB+) but is lazy-loaded below the fold.

**Core technologies:**
- **Next.js 16.1.6 (App Router):** Framework, SSR, static generation — industry standard on Vercel, bundled React 19, Turbopack dev server
- **Tailwind CSS 4.1:** Utility-first styling — new `@import "tailwindcss"` syntax, CSS `@theme` directive for dark palette tokens, no config file needed
- **Motion 12.34.0:** Scroll-triggered reveals and scroll-linked parallax — declarative React API (`whileInView`, `useScroll`, `useTransform`), tree-shakable, GPU-accelerated
- **Lenis 1.3.17:** Smooth scroll — lerp-based interpolation for cinematic feel, ~5KB, works seamlessly with Motion's scroll hooks
- **@remotion/player 4.0.422:** Embedded interactive React video compositions — renders app demos client-side without pre-rendered video files
- **Resend 6.9.2:** Waitlist email capture — simple SDK, React email templates, free tier (100/day, 3K/month) sufficient for pre-launch
- **next/font/google:** Self-hosted Playfair Display + Inter — zero layout shift, zero external requests

**Critical version note:** Import Motion from `motion/react` (not `framer-motion`). Tailwind v4 uses `@import "tailwindcss"` (not `tailwind.config.js`). Remotion Player requires `"use client"` + `ssr: false`.

### Expected Features

**Must have (table stakes) — P1:**
- Hero section with bold headline + single CTA (email capture or App Store badge)
- Two-state CTA system (waitlist mode ↔ download mode via env var)
- Email capture backend (Resend Route Handler)
- 3-4 feature sections with real app screenshots in device frames
- Pricing/value transparency section ("Free forever. Pro when you want it.")
- Minimal sticky nav (logo + CTA button)
- Repeating bottom CTA
- Footer with legal placeholder links
- Dark monochromatic theme with correct color tokens (#0a0a0a / #f4f4f0)
- Responsive design (mobile-first)

**Should have (differentiators) — P2:**
- Scroll-triggered section reveal animations (fade-up, slide-in)
- Remotion animated app previews (habit checkoff, streak counter)
- "What's Next" teaser section (AI reflections, token economy)
- Micro-interactions and hover states
- Social proof / waitlist counter

**Defer (v2+):**
- Video hero background (heavy asset, mobile performance risk)
- Interactive scroll-controlled demos (extremely high complexity)
- A/B testing headlines (need traffic volume first)
- Blog / content section (out of scope per PROJECT.md)

**Anti-features to avoid:** Hamburger menu, autoplay video with sound, competitor comparison table, chatbot, exit-intent popup, cookie banner (no tracking cookies), testimonial carousel.

### Architecture Approach

The architecture follows a three-layer model: **Presentation** (section components), **Animation Orchestration** (Lenis + Motion + Intersection Observer), and **Shared Infrastructure** (CTA state config, email API route, Remotion compositions). The page is a single Server Component (`page.tsx`) that composes Client Component sections in sequence. Lenis wraps the entire app as a global provider. Each section is independently animated via a reusable `ScrollReveal` wrapper. Remotion Player is isolated behind lazy-loaded Client Components.

**Major components:**
1. **RootLayout + LenisProvider** — HTML shell, fonts, smooth scroll initialization
2. **HeroSection + CtaBlock** — Above-fold conversion: headline + two-state CTA (email form or App Store link)
3. **FeatureSection + PhoneFrame** — Reusable feature showcase with device-framed screenshots
4. **PreviewPlayer** — Lazy-loaded Remotion Player with viewport-triggered autoplay
5. **EmailForm + /api/waitlist** — Client form → server Route Handler → Resend SDK
6. **lib/config.ts** — Centralized feature flags (`CTA_MODE`, `APP_STORE_URL`) from env vars

**Key patterns:** `whileInView` for section reveals, `useScroll` + `useTransform` for parallax, `next/dynamic({ ssr: false })` for Remotion, build-time env var for CTA state toggle.

### Critical Pitfalls

1. **Remotion bundle size (~200KB+)** — Lazy-load with `next/dynamic({ ssr: false })`, mount only when approaching viewport, consider pre-rendered video for simple compositions. Target <150KB first-load JS.
2. **Scroll animation jank from layout thrashing** — Animate only `transform` and `opacity` (compositor-only properties). Use Motion's `useScroll`/`useTransform` pipeline, never raw DOM reads in scroll handlers. Establish animation constraints before building sections.
3. **iOS Safari viewport and scroll quirks** — Use `100dvh` everywhere (not `100vh`), clamp scroll progress values, keep scroll listeners passive, disable smooth scroll on touch devices (Lenis default). Test on real iOS devices.
4. **Dark theme WCAG contrast failures** — Primary text (#f4f4f0 on #0a0a0a) is fine at ~17.5:1, but muted/secondary text using opacity <0.4 fails. Define contrast-checked opacity scale in the design system before building components.
5. **Resend emails landing in spam** — Verify custom domain DNS (DKIM/SPF/DMARC) during project setup, not at launch. Use a subdomain for transactional email. Add rate limiting (5/IP/hour) and input validation.
6. **Stale CTA state from CDN cache** — After switching env var, must redeploy. Test the A→B transition explicitly as a launch checklist item. Consider Vercel Edge Config for instant switching if needed.

## Implications for Roadmap

Based on combined research, the build should follow 5 phases ordered by dependency chain and risk mitigation:

### Phase 1: Foundation & Design System
**Rationale:** Everything depends on the Next.js scaffold, font loading, smooth scroll provider, dark theme tokens, and CTA state config. Pitfalls research shows that color contrast, viewport units (`100dvh`), and Resend domain verification must be addressed at the foundation level — retrofitting these is painful.
**Delivers:** Deployable skeleton with correct fonts, dark theme, smooth scroll, and env-based configuration. Vercel deployment pipeline working.
**Addresses:** Dark theme + typography system, responsive foundation, state management (env var)
**Avoids:** Dark theme contrast failures (Pitfall 4), iOS Safari viewport issues (Pitfall 3), Resend spam (Pitfall 6), font FOUT/CLS

### Phase 2: Hero & Email Capture (Conversion Core)
**Rationale:** The hero + CTA is the page's reason to exist. Feature research shows every premium landing page leads with a bold value prop + single CTA. This phase delivers a functional, deployable page that can start collecting waitlist emails before any content sections exist.
**Delivers:** Working hero section with headline, two-state CTA (email form or App Store link), email capture backend via Resend, sticky nav, footer, bottom CTA repeat.
**Uses:** Motion (entrance animations), Resend SDK, Next.js Route Handler
**Implements:** HeroSection, CtaBlock, EmailForm, /api/waitlist, Footer, Nav
**Avoids:** CTA caching issues (Pitfall 7), email rate limiting gaps (Security)

### Phase 3: Feature Sections & Content
**Rationale:** With conversion infrastructure in place, build the visual content that convinces visitors to sign up. Architecture research shows `FeatureSection` and `PhoneFrame` are reusable components, and the `ScrollReveal` wrapper should be created first since every section uses it. Real app screenshots are a production dependency.
**Delivers:** 3-4 feature showcase sections with device-framed screenshots, pricing/value section, scroll-triggered reveal animations, "What's Next" teaser section.
**Uses:** Motion (`whileInView`, stagger animations), PhoneFrame component
**Implements:** FeatureSection, PhoneFrame, ScrollReveal, WhatsNextSection, pricing section
**Avoids:** Scroll animation jank (Pitfall 2), non-composited animation properties (Anti-pattern 3)

### Phase 4: Remotion Integration
**Rationale:** Remotion is the highest-complexity, highest-risk feature. Architecture research explicitly recommends building feature sections with static screenshots first, then layering in Remotion compositions. This isolation means Remotion problems never block the core page. Bundle size (Pitfall 1) is the #1 critical pitfall.
**Delivers:** 1-2 animated app previews (habit checkoff, streak counter) embedded in existing feature sections, replacing static screenshots where appropriate.
**Uses:** @remotion/player, next/dynamic, Intersection Observer
**Implements:** PreviewPlayer, Remotion compositions (HabitCheckoff, StreakCounter)
**Avoids:** Bundle size blowup (Pitfall 1), eager loading (Anti-pattern 5), SSR crashes (Integration gotcha)

### Phase 5: Polish & Performance
**Rationale:** Parallax effects, micro-interactions, and performance tuning are refinement that layers on top of working sections. Architecture research places this last because it depends on all content being in place.
**Delivers:** Scroll-linked parallax effects, micro-interactions (hover states, button glows), responsive breakpoint tuning, performance audit (Lighthouse, bundle analysis), OG image, metadata, SEO verification, launch-readiness checklist.
**Uses:** Motion (`useScroll` + `useTransform` for parallax), next/image optimization
**Avoids:** Video/bandwidth issues (Pitfall 5), SEO invisible content, missing reduced-motion fallbacks

### Phase Ordering Rationale

- **Phase 1 before everything:** Lenis provider, font loading, theme tokens, and `100dvh` viewport handling are foundational. Three critical pitfalls (contrast, iOS Safari, Resend domain) must be addressed here or they compound later.
- **Phase 2 before content:** A hero + email capture is a functional landing page. It can be deployed and start collecting emails while content sections are built. This follows the "deployable at every phase" principle.
- **Phase 3 before Remotion:** Static screenshots in device frames are the Remotion fallback. Building content sections first means Remotion is purely additive — its failure or delay never blocks shipping.
- **Phase 4 isolated:** Remotion has its own project structure (`remotion/` folder), its own bundle implications, and its own failure modes. Isolating it means the page ships with or without it.
- **Phase 5 last:** Polish is meaningless without content. Performance auditing requires the full page to be populated.

### Research Flags

Phases likely needing deeper research during planning:
- **Phase 4 (Remotion Integration):** Complex integration with bundle size implications. Needs research on optimal composition structure, lazy-loading patterns, and fallback strategies. The Remotion + Next.js App Router integration has specific gotchas (SSR, `inputProps` memoization, `pauseWhenBuffering`).

Phases with standard, well-documented patterns (skip research):
- **Phase 1 (Foundation):** Next.js scaffold, Tailwind v4 setup, Lenis integration, font loading — all have official docs and templates. Straightforward.
- **Phase 2 (Hero & Email):** Standard form + API route + Resend SDK. Well-documented pattern with official examples.
- **Phase 3 (Feature Sections):** Motion `whileInView` is the most documented animation pattern. PhoneFrame is pure CSS. Standard implementation.
- **Phase 5 (Polish):** Performance optimization follows Lighthouse guidance. Standard web performance patterns.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | All versions verified via official docs and npm registry (2026-02-16). Every package confirmed compatible with React 19 + Next.js 16. |
| Features | HIGH | Based on analysis of 7 premium landing pages (Linear, Arc, Raycast, Superhuman, Notion, Headspace, Calm) plus established conversion patterns. |
| Architecture | HIGH | All patterns verified via official docs (Motion scroll animations, Remotion Player integration, Lenis React wrapper, Next.js App Router structure). |
| Pitfalls | HIGH | Critical pitfalls verified via official docs (Remotion Player docs, WCAG 2.1 SC 1.4.3, Vercel pricing, Resend API). iOS Safari viewport behavior based on MDN docs + widespread community consensus (MEDIUM for this specific sub-area). |

**Overall confidence:** HIGH

### Gaps to Address

- **Real app screenshots:** Feature sections depend on actual iOS simulator screenshots from the Momentum app. These are a production asset dependency, not a code dependency. Must be captured before Phase 3 content can be finalized.
- **Remotion composition design:** The specific animations (habit checkoff, streak counter, heatmap fill) need to be designed and built. Research confirms the Player integration pattern but not the composition content itself.
- **Waitlist email copy and design:** Resend integration is straightforward technically, but the actual email template content (welcome copy, branding) needs to be authored.
- **iOS Safari real-device testing:** Chrome DevTools device emulation does NOT replicate Safari scroll behavior. Real device or BrowserStack testing is needed during Phases 2-3. This is a process gap, not a knowledge gap.
- **Video hosting decision:** If any pre-rendered video (hero background, Remotion fallbacks) is used, it should be hosted on an external CDN (Cloudflare R2, Bunny CDN), not in Vercel's `public/` folder. The specific CDN choice hasn't been made.

## Sources

### Primary (HIGH confidence)
- Next.js 16.1.6 — Official installation docs, font optimization docs, project structure docs (verified 2026-02-16)
- Motion 12.34.0 — Official motion.dev introduction + scroll animation docs (verified 2026-02-16)
- Lenis 1.3.17 — GitHub README, darkroomengineering/lenis (latest release Dec 28, 2025)
- Remotion 4.0.422 — GitHub releases, remotion.dev/docs/player, best practices, flicker avoidance (verified 2026-02-16)
- Tailwind CSS 4.1 — Official Next.js integration guide at tailwindcss.com (verified 2026-02-16)
- Resend 6.9.2 — npm registry, resend.com/docs, API reference, pricing page (verified 2026-02-16)
- WCAG 2.1 SC 1.4.3 — W3C Understanding Contrast (Minimum) (verified 2026-02-16)
- Vercel — Pricing docs, Functions pricing docs (verified 2026-02-16)

### Secondary (MEDIUM confidence)
- iOS Safari viewport units (`dvh`) — MDN documentation + widespread community documentation
- Framer Motion scroll behavior patterns — Based on known API surface, consistent with official docs
- Competitor landing page analysis — Linear, Arc, Raycast, Superhuman, Notion, Headspace, Calm (analyzed 2026-02-16)

### Tertiary (LOW confidence)
- None — all findings backed by primary or secondary sources

---
*Research completed: 2026-02-16*
*Ready for roadmap: yes*
