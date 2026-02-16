# Stack Research

**Domain:** Premium single-page app landing page with cinematic scroll animations
**Project:** Momentum (minimalist habit tracking iOS app landing page)
**Researched:** 2026-02-16
**Confidence:** HIGH

---

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Next.js (App Router) | 16.1.6 (stable) | Framework / SSR / Routing | Industry standard for React apps on Vercel. App Router is the default since v13; v16 defaults to Turbopack for dev, includes React 19 canaries, built-in `next/font` for zero-layout-shift font loading. Single-page landing pages benefit from SSR for SEO and static export for performance. **Confidence: HIGH** (verified via official docs, `@doc-version: 16.1.6`, `@last-updated: 2026-02-11`) |
| React | 19 (canary, bundled with Next.js 16) | UI library | Ships with Next.js 16 App Router. No separate install needed. Provides Server Components for zero-JS static sections and Client Components for interactive/animated sections. **Confidence: HIGH** |
| TypeScript | ^5.1.0 | Type safety | Built-in with Next.js; zero-config. Next.js auto-installs deps and generates `tsconfig.json`. **Confidence: HIGH** |
| Tailwind CSS | 4.1 | Utility-first styling | Current major version. Uses `@import "tailwindcss"` directive (new v4 syntax). Next.js integration via `@tailwindcss/postcss` plugin. Theme variables for custom colors/typography. Native dark mode via `dark:` variant (class or media strategy). **Confidence: HIGH** (verified via official Tailwind v4.1 docs + Next.js installation guide) |

### Animation Stack

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| Motion (fka Framer Motion) | 12.34.0 | Scroll-triggered reveals, enter animations, gestures, layout animations | **Primary animation library.** Renamed from "Framer Motion" to "Motion" in v11+. Import from `motion/react`. Hybrid engine combining Web Animations API + JS for 120fps GPU-accelerated animations. Built-in `whileInView` for scroll-triggered reveals, `useScroll` + `useTransform` for parallax/scroll-linked values, `AnimatePresence` for exit animations, spring physics. Tree-shakable (~3kb for `useAnimate`). Declarative React API is a natural fit vs imperative GSAP. **Confidence: HIGH** (verified via official motion.dev docs, npm registry) |
| Lenis | 1.3.17 | Smooth scrolling | Lightweight smooth scroll library by darkroom.engineering (13.2k stars, 21.5k dependents). Provides the buttery-smooth native-like scroll feel that CSS `scroll-behavior: smooth` cannot match. Supports `lerp`-based interpolation, custom easing, `autoRaf`. Works seamlessly with Motion's `useScroll` and GSAP ScrollTrigger. Essential for "cinematic" feel. MIT licensed. **Confidence: HIGH** (verified via GitHub README, latest release Dec 28, 2025) |

### Video / Compositions

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| @remotion/player | 4.0.422 | Embed interactive React video compositions in the page | Renders Remotion compositions inline in any React app. Supports programmatic playback, custom controls, runtime parameter changes. Official Next.js App Router template exists. Does NOT require server-side rendering of video — compositions run client-side via `<Player>` component. Perfect for showing app interaction demos without pre-rendered video files. **Confidence: HIGH** (verified via GitHub releases, remotion.dev/docs/player) |
| remotion | 4.0.422 | Video composition authoring (Composition, useCurrentFrame, etc.) | Core package for defining frame-based React compositions. Required alongside `@remotion/player`. **Confidence: HIGH** |

### Email Capture

| Library | Version | Purpose | Why Recommended |
|---------|---------|---------|-----------------|
| resend | 6.9.2 | Email capture / transactional email API | Simple Node.js SDK. `new Resend(apiKey)` then `resend.emails.send(...)`. Supports React email templates. Ideal for waitlist confirmation emails. Use via Next.js Route Handlers (API routes). Free tier: 100 emails/day, 3000/month — sufficient for waitlist. **Confidence: HIGH** (verified via npm, resend.com/docs) |

### Font Loading

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| next/font/google | Bundled with Next.js 16 | Self-host Google Fonts (Playfair Display + Inter) | Zero layout shift, zero external requests. Fonts served from same domain. Variable fonts recommended for performance. Both Playfair Display and Inter are available as Google Fonts. Import as functions, apply via `className`. Can use CSS variables for Tailwind integration. **Confidence: HIGH** (verified via Next.js 16 font optimization docs) |

### Deployment

| Technology | Purpose | Why Recommended |
|------------|---------|-----------------|
| Vercel | Hosting / CDN / Edge | First-party Next.js hosting. Zero-config deployment. Automatic edge CDN, image optimization, analytics. `next build` produces static + serverless output. Route Handlers for email API. **Confidence: HIGH** |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| Turbopack | Dev server bundler | Default in Next.js 16 (`next dev` uses Turbopack by default). Faster HMR than Webpack. |
| ESLint | Linting | Ships with `create-next-app`. v16 no longer runs lint on `next build` — run via npm scripts. |
| PostCSS | CSS processing | Required for Tailwind v4 integration via `@tailwindcss/postcss`. |
| Biome (optional) | Fast linter + formatter | Alternative to ESLint. Supported by `create-next-app` v16. |

---

## Installation

```bash
# Create project
pnpm create next-app@latest momentum-landing --yes
cd momentum-landing

# Core animation stack
pnpm add motion lenis

# Remotion (player for embedded compositions)
pnpm add remotion @remotion/player

# Email capture
pnpm add resend

# Tailwind (already included via create-next-app, but ensure PostCSS plugin)
pnpm add tailwindcss @tailwindcss/postcss postcss

# No separate font packages needed — next/font/google is built-in
```

```bash
# Dev dependencies (most included via create-next-app)
pnpm add -D typescript @types/react @types/node
```

---

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| Motion (motion/react) | GSAP + ScrollTrigger | When you need timeline-based choreography with precise scrubbing or have non-React sections. GSAP's imperative API is harder to integrate with React's declarative model. GSAP 3 also has a commercial license for some use cases. For this project, Motion's `useScroll` + `whileInView` cover all needed patterns more naturally. |
| Lenis | Locomotive Scroll v5 | Locomotive is heavier and more opinionated. Lenis is lighter (~5kb gzipped), more composable, and locomotive-scroll itself now wraps Lenis internally. |
| Lenis | CSS `scroll-behavior: smooth` | CSS smooth scrolling is basic — no lerp control, no easing customization, no programmatic scroll-to with callbacks, no momentum feel. Not "cinematic." |
| @remotion/player | Pre-rendered MP4 video | When you don't need runtime parameter changes or interactive playback. MP4 is simpler but loses the "living composition" benefit. For showcasing app interactions with dynamically-rendered content, Remotion Player is superior. |
| @remotion/player | Lottie animations | When animations come from After Effects. Lottie can't render React components or show real UI interactions. |
| Resend | SendGrid / Mailgun | When you need advanced email marketing features. For simple transactional "you're on the waitlist" emails, Resend's DX is superior (React templates, simpler API). |
| Tailwind CSS v4 | CSS Modules / styled-components | When team prefers co-located CSS or CSS-in-JS. Tailwind is faster to iterate with, produces smaller CSS bundles via automatic purging, and is the default in `create-next-app`. |
| next/font/google | Manual @font-face | When fonts aren't on Google Fonts. Both Playfair Display and Inter are Google Fonts, so `next/font/google` is ideal — automatic subsetting, zero layout shift. |

---

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| GSAP for primary animations | Imperative API conflicts with React's declarative model. Requires manual cleanup (`useEffect` + `gsap.context()`). Commercial license required for some plugins (ScrollSmoother, SplitText). Overkill for this scope. | Motion (`motion/react`) — declarative, React-native, tree-shakable, MIT licensed |
| `framer-motion` package name | Deprecated package name. Was renamed to `motion` in v11. `framer-motion` still works but is a compatibility shim and won't receive new features. | `motion` (import from `motion/react`) |
| Locomotive Scroll | Wraps Lenis internally but adds unnecessary abstraction and weight. Less composable. | Lenis directly |
| `react-scroll`, `react-scroll-parallax` | Older, less maintained. Motion's `useScroll`/`useTransform` cover these use cases with better performance and a unified API. | Motion's built-in scroll hooks |
| Tailwind CSS v3 | v4 is current stable. v3 uses `tailwind.config.js` (deprecated pattern in v4). v4 uses `@import "tailwindcss"` + CSS variables for theming. `create-next-app` defaults to v4. | Tailwind CSS v4.1 |
| `@remotion/bundler` / `@remotion/renderer` on Vercel | These are for server-side video rendering (FFmpeg). Vercel serverless functions have size/timeout limits. For an embedded player, you only need `@remotion/player` (client-side only). | `@remotion/player` for in-page compositions |
| Heavy video hosting (Mux, Cloudflare Stream) | Unnecessary if using Remotion Player (compositions are React, not video files). If you have a hero background video, a static MP4 in `/public` served via Vercel CDN is sufficient. | Self-hosted MP4 in `/public` or Remotion `<Player>` |
| Pages Router | Legacy routing model. App Router is the default and recommended approach since Next.js 13+. Server Components, streaming, layouts are only available in App Router. | App Router (`app/` directory) |

---

## Stack Patterns by Variant

**If pre-launch (waitlist mode):**
- Email form submits to Next.js Route Handler (`app/api/waitlist/route.ts`)
- Route Handler calls `resend.emails.send()` to confirm signup
- Store emails in Resend contact list (or add a simple KV/database later)
- CTA reads "Join the Waitlist"

**If post-launch (App Store live):**
- Swap CTA to direct App Store link (`<a href="https://apps.apple.com/...">`)
- Remove or keep email route handler for newsletter
- Toggle via environment variable: `NEXT_PUBLIC_LAUNCH_MODE=waitlist|live`

**If Remotion compositions get complex:**
- Keep compositions in a separate `src/remotion/` directory
- Use dynamic imports (`next/dynamic` with `ssr: false`) for the Player component
- This prevents Remotion from bloating the server bundle

**If smooth scrolling causes issues on iOS:**
- Lenis defaults to native scrolling on touch devices (`smoothTouch` is off by default)
- This is correct behavior — Lenis smooth scroll is for pointer/wheel devices
- Don't enable `syncTouch` unless specifically needed (can be unstable on iOS <16)

---

## Version Compatibility

| Package | Compatible With | Notes |
|---------|-----------------|-------|
| next@16.1.6 | react@19 (canary), tailwindcss@4.1 | React 19 is bundled. Tailwind v4 setup via `@tailwindcss/postcss`. |
| motion@12.34.0 | react@19, next@16 | Import from `motion/react`. Works with RSC (animation components must be Client Components with `"use client"`). |
| lenis@1.3.17 | motion@12, next@16 | Framework-agnostic core. Use `lenis/react` for React wrapper. Pairs with Motion's `useScroll` via `lenis.on('scroll', ...)`. |
| remotion@4.0.422 | react@19, next@16 (App Router) | `@remotion/player` renders client-side only. Must use `"use client"` directive. Official Next.js App Router template provided. |
| resend@6.9.2 | next@16 | Use in Route Handlers (`app/api/*/route.ts`). Server-side only — never expose API key to client. |
| tailwindcss@4.1 | next@16, postcss | Requires `@tailwindcss/postcss` plugin. No `tailwind.config.js` needed in v4 — use CSS `@theme` directive for customization. |

---

## Key Integration Patterns

### Lenis + Motion Scroll Animations

```typescript
// Lenis provides smooth scrolling
// Motion's useScroll reads native scroll position
// They work together without special integration:
// Lenis smooths the scroll → Motion reads the smoothed position

// In layout or provider:
"use client"
import { ReactLenis } from 'lenis/react'

export function SmoothScrollProvider({ children }) {
  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.2 }}>
      {children}
    </ReactLenis>
  )
}
```

### Remotion Player in Next.js

```typescript
// Must be a Client Component
"use client"
import dynamic from 'next/dynamic'

// Dynamically import to avoid SSR issues
const Player = dynamic(
  () => import('@remotion/player').then(mod => mod.Player),
  { ssr: false }
)
```

### Font Loading (Playfair Display + Inter)

```typescript
// app/layout.tsx
import { Playfair_Display, Inter } from 'next/font/google'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// Apply as CSS variables for Tailwind
<html className={`${playfair.variable} ${inter.variable}`}>
```

### Tailwind v4 Theme (Dark Monochromatic)

```css
/* app/globals.css */
@import "tailwindcss";

@theme {
  --color-bg: #0a0a0a;
  --color-fg: #f4f4f0;
  --font-serif: var(--font-playfair), serif;
  --font-sans: var(--font-inter), sans-serif;
}
```

### Resend Waitlist Route Handler

```typescript
// app/api/waitlist/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { email } = await request.json()
  const { data, error } = await resend.emails.send({
    from: 'Momentum <hello@yourdomain.com>',
    to: email,
    subject: "You're on the list",
    html: '<p>Thanks for joining the Momentum waitlist.</p>',
  })
  // ...
}
```

---

## Vercel Deployment Gotchas

| Concern | Impact | Mitigation |
|---------|--------|------------|
| Large video files in `/public` | Increases build size, slower cold starts | Use Vercel Blob Storage or external CDN for videos >10MB. For Remotion Player compositions (React, not video files), this is a non-issue. |
| Remotion `@remotion/renderer` on serverless | FFmpeg + Chromium exceed Vercel function size limits (250MB). Timeouts on free tier (10s). | Do NOT use server-side rendering on Vercel. Use `@remotion/player` for client-side playback only. If you need to render videos, use Remotion Lambda or the new Vercel Sandbox template. |
| Font subsetting | Large font files increase LCP | `next/font/google` automatically subsets to specified `subsets: ['latin']`. No action needed. |
| Scroll-heavy JS bundle | Motion + Lenis add to client bundle | Motion is tree-shakable. Only import what you use (`useScroll`, `motion`, `AnimatePresence`). Lenis core is ~5kb gzipped. Total animation overhead: ~15-20kb gzipped. |
| Image optimization | Hero images and phone frames need optimization | Use `next/image` with `priority` for above-fold images. Vercel's Image Optimization API handles format conversion (WebP/AVIF) and resizing automatically. |
| Edge caching for static pages | Landing page is largely static | Set `export const dynamic = 'force-static'` on the page (or use `output: 'export'` for full static export). Route Handler for email is the only dynamic endpoint. |

---

## Sources

- **Next.js 16.1.6** — Official installation docs (`@doc-version: 16.1.6`, fetched 2026-02-16), GitHub releases page (canary at v16.2.0-canary.46) — **HIGH confidence**
- **Motion 12.34.0** — Official motion.dev introduction docs, npm registry (published 7 days ago) — **HIGH confidence**
- **Lenis 1.3.17** — GitHub README (darkroomengineering/lenis), latest release Dec 28, 2025 — **HIGH confidence**
- **Remotion 4.0.422** — GitHub releases page (published Feb 13, 2026), remotion.dev/docs/player — **HIGH confidence**
- **Tailwind CSS 4.1** — Official Next.js integration guide at tailwindcss.com, docs header showing "v4.1" — **HIGH confidence**
- **Resend 6.9.2** — npm registry (published 6 days ago), resend.com/docs/introduction — **HIGH confidence**
- **next/font** — Next.js 16.1.6 font optimization docs (`@doc-version: 16.1.6`) — **HIGH confidence**

---
*Stack research for: Premium animated single-page app landing page*
*Researched: 2026-02-16*
