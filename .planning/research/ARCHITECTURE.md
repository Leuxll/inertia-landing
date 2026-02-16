# Architecture Research

**Domain:** Cinematic scroll-animated single-page landing page (Next.js App Router)
**Researched:** 2026-02-16
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Presentation Layer                           │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐           │
│  │  Hero    │  │ Feature  │  │ Remotion │  │  Footer  │           │
│  │ Section  │  │ Sections │  │ Previews │  │          │           │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘           │
│       │              │              │              │                │
├───────┴──────────────┴──────────────┴──────────────┴────────────────┤
│                     Animation Orchestration Layer                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ Lenis Smooth │  │ Framer Motion│  │ Intersection │              │
│  │   Scroll     │  │ useScroll /  │  │  Observer    │              │
│  │              │  │ whileInView  │  │  (useInView) │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                  │                  │                     │
├─────────┴──────────────────┴──────────────────┴─────────────────────┤
│                        Shared Infrastructure                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ CTA State    │  │ API Routes   │  │ Remotion     │              │
│  │ (env flag)   │  │ (email)      │  │ Compositions │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
└─────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `RootLayout` | HTML shell, font loading, Lenis provider, metadata | `app/layout.tsx` — Server Component wrapping `<html>` and `<body>` |
| `HomePage` | Section composition, scroll container | `app/page.tsx` — Server Component that renders section components in order |
| `LenisProvider` | Smooth scroll initialization | Client Component wrapping `<body>` children via `lenis/react` `<ReactLenis>` |
| `HeroSection` | Above-fold hook: headline, subheadline, CTA | Client Component — uses Framer Motion for entrance animations |
| `CtaBlock` | Two-state CTA: email capture (waitlist) OR App Store link (download) | Client Component — reads `NEXT_PUBLIC_CTA_MODE` env var at build time |
| `EmailForm` | Email input + submit, client-side validation | Client Component — `fetch('/api/waitlist', { method: 'POST', body })` |
| `FeatureSection` | Individual feature showcase: copy + phone frame with screenshot | Client Component — `whileInView` for scroll-triggered reveal |
| `PhoneFrame` | Device chrome wrapping screenshots or Remotion player | Presentational Client Component |
| `RemotionPreview` | Embedded Remotion `<Player>` for animated app demos | Client Component — lazy-loaded, plays when in view |
| `WhatsNextSection` | Teaser for upcoming features | Client Component — scroll-triggered animations |
| `Footer` | Links, branding, legal | Server Component (or simple Client Component) |
| `API: /api/waitlist` | Email capture endpoint: validate, send to Resend | Route Handler (`app/api/waitlist/route.ts`) |

## Recommended Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout: metadata, fonts, LenisProvider
│   ├── page.tsx                # Home page: composes all sections
│   ├── globals.css             # Tailwind directives + CSS custom properties
│   └── api/
│       └── waitlist/
│           └── route.ts        # POST handler: validate email → Resend
├── components/
│   ├── providers/
│   │   └── lenis-provider.tsx  # "use client" — ReactLenis wrapper
│   ├── sections/
│   │   ├── hero-section.tsx    # Hero with headline + CTA
│   │   ├── feature-section.tsx # Reusable feature showcase section
│   │   ├── whats-next.tsx      # Upcoming features teaser
│   │   └── footer.tsx          # Footer
│   ├── ui/
│   │   ├── cta-block.tsx       # Two-state CTA (waitlist vs download)
│   │   ├── email-form.tsx      # Email input + submit button
│   │   ├── phone-frame.tsx     # Device frame wrapper
│   │   ├── section-heading.tsx # Reusable animated heading
│   │   └── scroll-reveal.tsx   # Reusable scroll-triggered wrapper
│   └── remotion/
│       └── preview-player.tsx  # "use client" — lazy Remotion <Player>
├── remotion/
│   ├── index.ts                # registerRoot for Remotion Studio
│   ├── Root.tsx                # <Composition> list
│   └── compositions/
│       ├── HabitCheckoff.tsx    # Animated habit check-off demo
│       └── StreakCounter.tsx    # Animated streak counter demo
├── lib/
│   ├── config.ts               # CTA mode, feature flags from env vars
│   ├── resend.ts               # Resend client initialization
│   └── animations.ts           # Shared Framer Motion variants/transitions
├── hooks/
│   └── use-section-scroll.ts   # Custom hook: useScroll + useTransform for section
└── public/
    ├── images/
    │   ├── screenshots/        # App screenshots (WebP, optimized)
    │   └── og/                 # Open Graph images
    └── videos/                 # Pre-rendered Remotion fallback videos (optional)
```

### Structure Rationale

- **`components/sections/`:** Each full-width page section is its own component. These are the top-level compositional units rendered in sequence by `page.tsx`. Keeps `page.tsx` clean and each section independently testable.
- **`components/ui/`:** Smaller reusable UI pieces used within sections. `scroll-reveal.tsx` is a generic wrapper that applies `whileInView` animation to any children — avoids duplicating scroll animation boilerplate across sections.
- **`components/remotion/`:** Bridge between the Next.js app and Remotion. `preview-player.tsx` wraps `@remotion/player` with lazy loading and in-view autoplay. Separated from `remotion/` (Remotion Studio code) because the Player wrapper is a Next.js Client Component.
- **`remotion/`:** Standalone Remotion project. Contains `registerRoot`, `<Composition>` declarations, and composition source files. This folder is used by both `npx remotion studio` (dev preview) and the `<Player>` component. Code here must be framework-agnostic React (no Next.js imports).
- **`lib/`:** Shared utilities. `config.ts` centralizes the feature flag logic. `animations.ts` defines reusable Framer Motion variant objects so animation timing stays consistent across sections.
- **`hooks/`:** Custom React hooks for scroll animation patterns that are reused across multiple sections.

## Architectural Patterns

### Pattern 1: Scroll-Triggered Section Reveals via Framer Motion `whileInView`

**What:** Each section wraps its content in a `<motion.div>` with `initial`, `whileInView`, and `viewport={{ once: true }}` props. Entrance animations (fade-up, slide-in, stagger) fire once as the user scrolls each section into view.

**When to use:** Every section on the page. This is the primary animation mechanism.

**Trade-offs:** Simple, declarative, performant (uses Intersection Observer internally). Limited to threshold-based triggers — cannot do continuous scroll-linked effects like parallax.

**Example:**
```typescript
// components/ui/scroll-reveal.tsx
"use client";
import { motion, type Variants } from "motion/react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export function ScrollReveal({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={revealVariants}
    >
      {children}
    </motion.div>
  );
}
```

### Pattern 2: Scroll-Linked Parallax via `useScroll` + `useTransform`

**What:** Attach `useScroll({ target: sectionRef })` to a section, then use `useTransform` to map `scrollYProgress` to CSS properties (translateY, opacity, scale). Creates continuous parallax depth effects.

**When to use:** Hero background, phone frame floating effects, or any element that should move at a different rate than the scroll.

**Trade-offs:** More complex than `whileInView`. Requires a ref. Can cause perf issues if too many elements are scroll-linked — use sparingly for hero-level drama.

**Example:**
```typescript
// hooks/use-section-scroll.ts
"use client";
import { useRef } from "react";
import { useScroll, useTransform, type MotionValue } from "motion/react";

export function useSectionScroll(inputRange = ["start end", "end start"]) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: inputRange as any });
  return { ref, scrollYProgress };
}

// Usage in a section:
const { ref, scrollYProgress } = useSectionScroll();
const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
// <motion.div ref={ref}><motion.img style={{ y }} /></motion.div>
```

### Pattern 3: Lenis Smooth Scroll as Global Provider

**What:** Initialize Lenis once at the layout level via `lenis/react`'s `<ReactLenis>` component wrapping `{children}`. All sections inherit smooth scroll automatically. Framer Motion's `useScroll` reads from the native scroll position which Lenis updates smoothly.

**When to use:** Always. Lenis wraps the entire page. It normalizes scroll behavior across input devices (trackpad, mouse wheel, touch).

**Trade-offs:** Adds ~5KB. Lenis transforms the scroll from native browser scroll to a requestAnimationFrame-driven interpolation. This means scroll position updates are synchronized to the render loop, which eliminates jank with scroll-linked animations. However, it can conflict with native scroll features (CSS scroll-snap, in-page search scroll-to). For a single-page landing page, these conflicts are irrelevant.

**Example:**
```typescript
// components/providers/lenis-provider.tsx
"use client";
import { ReactLenis } from "lenis/react";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}

// app/layout.tsx
import { LenisProvider } from "@/components/providers/lenis-provider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
```

### Pattern 4: Remotion Player with Lazy Loading and InView Autoplay

**What:** Wrap `@remotion/player`'s `<Player>` in a client component that lazy-loads (via `next/dynamic` or React.lazy) and auto-plays when visible. The `<Player>` renders the Remotion composition in-browser as a real-time React render — not a video file.

**When to use:** For animated app interaction previews (e.g., habit check-off animation, streak counter). Use `<Player>` rather than pre-rendered video when you want crisp resolution at any size and dynamic input props.

**Trade-offs:** `@remotion/player` renders React on every frame, so it uses more CPU than a `<video>` tag. Lazy loading is essential — Remotion adds ~200KB+ to the bundle. Autoplay via `useInView` + `playerRef.play()` ensures the composition only runs when visible.

**Example:**
```typescript
// components/remotion/preview-player.tsx
"use client";
import { Player, type PlayerRef } from "@remotion/player";
import { useEffect, useRef } from "react";
import { useInView } from "motion/react";

interface PreviewPlayerProps {
  component: React.FC<any>;
  inputProps?: Record<string, unknown>;
  durationInFrames: number;
  width?: number;
  height?: number;
}

export function PreviewPlayer({
  component,
  inputProps,
  durationInFrames,
  width = 390,
  height = 844,
}: PreviewPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<PlayerRef>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-20%" });

  useEffect(() => {
    if (!playerRef.current) return;
    if (isInView) {
      playerRef.current.play();
    } else {
      playerRef.current.pause();
    }
  }, [isInView]);

  return (
    <div ref={containerRef}>
      <Player
        ref={playerRef}
        component={component}
        inputProps={inputProps}
        durationInFrames={durationInFrames}
        compositionWidth={width}
        compositionHeight={height}
        fps={30}
        loop
        style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
```

### Pattern 5: Two-State CTA via Build-Time Environment Variable

**What:** A `NEXT_PUBLIC_CTA_MODE` env var (`"waitlist"` | `"download"`) controls whether the CTA renders an email capture form or an App Store link. This is evaluated at build time since `NEXT_PUBLIC_*` vars are inlined by Next.js during the build.

**When to use:** To toggle between pre-launch (email waitlist) and post-launch (App Store download) without code changes. Just change the env var and redeploy.

**Trade-offs:** Build-time means a redeploy is needed to switch modes. This is intentional: the CTA state doesn't change per-user, it changes per-release. Avoids runtime complexity of feature flag services for a simple binary toggle.

**Example:**
```typescript
// lib/config.ts
export const CTA_MODE = (process.env.NEXT_PUBLIC_CTA_MODE ?? "waitlist") as "waitlist" | "download";
export const APP_STORE_URL = process.env.NEXT_PUBLIC_APP_STORE_URL ?? "#";

// components/ui/cta-block.tsx
"use client";
import { CTA_MODE, APP_STORE_URL } from "@/lib/config";
import { EmailForm } from "./email-form";

export function CtaBlock() {
  if (CTA_MODE === "download") {
    return (
      <a href={APP_STORE_URL} className="...">
        Download on the App Store
      </a>
    );
  }
  return <EmailForm />;
}
```

### Pattern 6: Email Capture via Next.js Route Handler + Resend

**What:** A `POST /api/waitlist` route handler receives `{ email }`, validates it, and sends a confirmation email via the Resend SDK. Resend also stores the contact for the waitlist.

**When to use:** Waitlist mode. The `EmailForm` component sends a `fetch` POST to this route.

**Trade-offs:** Simple and serverless-friendly. No database needed — Resend's audience/contact feature can serve as the waitlist store. Rate limiting should be added for production.

**Example:**
```typescript
// app/api/waitlist/route.ts
import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Momentum <hello@momentum.app>",
      to: [email],
      subject: "You're on the list!",
      html: "<p>Thanks for joining the Momentum waitlist.</p>",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
```

## Data Flow

### Scroll Animation Flow

```
[User scrolls page]
    ↓
[Lenis] intercepts native scroll → applies lerp interpolation → updates scroll position smoothly
    ↓
[Browser] fires scroll events with smooth position values
    ↓
[Framer Motion useScroll] reads scrollYProgress for scroll-linked sections
    ↓
[useTransform] maps progress → CSS values (translateY, opacity, scale)
    ↓
[motion.div style] applies values to DOM via hardware-accelerated transforms
    
[Framer Motion whileInView] (parallel path)
    ↓
[IntersectionObserver] detects section entering viewport
    ↓
[motion.div] transitions from "hidden" → "visible" variant
```

### Email Capture Flow

```
[User enters email in EmailForm]
    ↓
[Client-side validation] (regex, empty check)
    ↓ valid
[fetch POST /api/waitlist] with { email }
    ↓
[Route Handler] server-side validation
    ↓ valid
[Resend SDK] sends confirmation email
    ↓
[Response] → EmailForm shows success/error state
```

### CTA State Flow

```
[Build time]
    ↓
[Next.js reads NEXT_PUBLIC_CTA_MODE from .env]
    ↓
[Inlines "waitlist" or "download" into client bundle]
    ↓
[CtaBlock component] renders EmailForm OR AppStore link
```

### Remotion Player Flow

```
[Page loads] → [PreviewPlayer mounts (lazy-loaded)]
    ↓
[useInView] detects container entering viewport
    ↓ isInView = true
[playerRef.play()] → Remotion renders composition frame-by-frame in React
    ↓ isInView = false (scrolls away)
[playerRef.pause()] → stops rendering to save CPU
```

### Key Data Flows

1. **Scroll position → Animation values:** Lenis smooths scroll → Framer Motion reads position → `useTransform` maps to CSS → DOM updates. This is the core data flow. It is purely client-side and synchronous with the render loop.
2. **Email → Resend:** Form submit → Route Handler → Resend API. One-way, fire-and-forget with confirmation response.
3. **Environment → CTA mode:** `.env` → build-time inlining → component conditional rendering. Static after build.
4. **Remotion compositions → Player:** React components in `remotion/compositions/` are imported by `preview-player.tsx` and passed to `<Player component={...}>`. The Player renders them as an inline React tree, not as video.

## Anti-Patterns

### Anti-Pattern 1: Using GSAP Alongside Framer Motion

**What people do:** Import GSAP ScrollTrigger for some animations and Framer Motion for others, thinking they complement each other.

**Why it's wrong:** Two animation libraries fighting over the same DOM elements causes conflicts, doubles bundle size (~40KB+ for GSAP), and creates maintenance confusion. Framer Motion's `useScroll` + `whileInView` covers the same scroll-triggered and scroll-linked patterns GSAP ScrollTrigger provides.

**Do this instead:** Use Framer Motion (now "Motion") exclusively. It handles scroll-triggered (`whileInView`), scroll-linked (`useScroll` + `useTransform`), layout animations, and gesture animations. Only reach for GSAP if you need complex timeline sequencing that Framer Motion's `staggerChildren` and `delayChildren` cannot express.

### Anti-Pattern 2: Pre-Rendering Remotion to Video Files for Landing Page Previews

**What people do:** Render Remotion compositions to MP4 files and embed them as `<video>` tags.

**Why it's wrong for this use case:** Pre-rendered videos are fixed resolution, large file sizes, cannot accept dynamic props, and look blurry when scaled. The `@remotion/player` renders the composition as live React — pixel-perfect at any size, responsive, and interactive.

**Do this instead:** Use `<Player>` for the landing page. Reserve pre-rendered video for social media assets or fallback for browsers without JavaScript. If needed, keep a pre-rendered MP4 in `public/videos/` as a `<noscript>` fallback only.

### Anti-Pattern 3: Animating Non-Composited Properties

**What people do:** Animate `width`, `height`, `top`, `left`, `margin`, or `padding` with scroll-linked animations.

**Why it's wrong:** These properties trigger browser layout recalculation on every frame, causing jank. Scroll-linked animations fire 60+ times per second — layout thrashing destroys performance.

**Do this instead:** Animate only `transform` (translate, scale, rotate) and `opacity`. These are GPU-composited and skip layout/paint. Framer Motion's `x`, `y`, `scale`, `rotate`, and `opacity` props all map to composited properties. Add `will-change: transform` to elements with continuous scroll-linked animations.

### Anti-Pattern 4: Making Every Component a Client Component

**What people do:** Add `"use client"` to every file because animations need client-side React.

**Why it's wrong:** Server Components provide automatic code splitting and zero client JS. Marking everything as client bundles unnecessary code.

**Do this instead:** Keep `page.tsx` and `layout.tsx` as Server Components. Only mark components that use hooks (`useState`, `useRef`, `useScroll`, `useInView`) or browser APIs as Client Components. The section components that use Framer Motion need `"use client"`, but `page.tsx` just imports and renders them — it stays a Server Component.

### Anti-Pattern 5: Loading Remotion Compositions Eagerly

**What people do:** Import Remotion compositions at the top of the page component, loading the entire Remotion bundle on initial page load.

**Why it's wrong:** Remotion + its dependencies add ~200KB+ to the initial bundle. Users see the hero section first — the Remotion previews are far below the fold.

**Do this instead:** Use `next/dynamic` with `{ ssr: false }` or React.lazy + Suspense to load the PreviewPlayer component only when needed. Combine with `useInView` so the import doesn't even start until the user scrolls near the Remotion section.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| Resend | Server-side SDK in Route Handler (`app/api/waitlist/route.ts`) | API key in `RESEND_API_KEY` env var (not NEXT_PUBLIC_). Only accessed server-side. |
| App Store | Static link in CTA component | URL from `NEXT_PUBLIC_APP_STORE_URL` env var. No API integration needed. |
| Vercel (hosting) | `next build` + deploy | Environment variables set in Vercel dashboard. Automatic edge caching for static page. |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| `page.tsx` (Server) ↔ Section components (Client) | Props / children | Server Component renders Client Components. No special protocol — standard React composition. |
| `EmailForm` (Client) ↔ `/api/waitlist` (Server) | HTTP POST (fetch) | Form sends `{ email }` as JSON. Route returns `{ success }` or `{ error }`. |
| `PreviewPlayer` (Client) ↔ Remotion compositions | React component import | `PreviewPlayer` receives a Remotion composition component via `component` prop. Compositions must be pure React (no Next.js server features). |
| `LenisProvider` ↔ all sections | React context (implicit) | Lenis wraps the page. Sections don't explicitly interact with Lenis — they just scroll normally and Lenis smooths it. Framer Motion reads the smoothed scroll position. |
| `config.ts` ↔ `CtaBlock` | Module import | `CtaBlock` imports `CTA_MODE` from `config.ts`. Since it uses `NEXT_PUBLIC_*`, the value is inlined at build time. |

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| Single landing page (current) | Static single-page. No database. Resend handles email. Vercel free tier is sufficient. All sections in one `page.tsx`. |
| Multiple pages (marketing site) | Add route segments (`/blog`, `/pricing`). Move shared components to `components/ui/`. Add `_components` colocated with new routes. |
| High traffic (10k+ daily visitors) | Ensure page is statically generated (`generateStaticParams` or default static rendering). Vercel CDN handles the rest. Add rate limiting to `/api/waitlist` via middleware or Vercel's built-in rate limiting. |

### Scaling Priorities

1. **First bottleneck: Initial load performance.** Animation-heavy pages risk large bundle sizes. Mitigate with lazy-loaded Remotion, optimized images (Next.js `<Image>`), and keeping the critical path (hero section) lean. Target <200KB initial JS.
2. **Second bottleneck: Email API abuse.** The `/api/waitlist` route is public. Add rate limiting (IP-based, via middleware) and honeypot field before launch.

## Build Order (Suggested)

Based on component dependencies, build in this order:

```
Phase 1: Foundation (no dependencies)
├── Next.js project scaffold + Tailwind config
├── Root layout + global styles + fonts
├── LenisProvider
└── lib/config.ts (CTA_MODE, env vars)

Phase 2: Static Sections (depends on Phase 1)
├── HeroSection (headline + static CTA placeholder)
├── CtaBlock + EmailForm (two-state CTA)
├── Footer
└── /api/waitlist route + Resend integration

Phase 3: Feature Sections (depends on Phase 1)
├── scroll-reveal.tsx (reusable animation wrapper)
├── PhoneFrame component
├── FeatureSection (composing PhoneFrame + copy + ScrollReveal)
└── WhatsNextSection

Phase 4: Remotion Integration (depends on Phase 3)
├── remotion/ folder setup (index.ts, Root.tsx)
├── Remotion compositions (HabitCheckoff, etc.)
├── PreviewPlayer wrapper (lazy load + inView autoplay)
└── Integrate into FeatureSection(s)

Phase 5: Polish (depends on all above)
├── Scroll-linked parallax effects (useScroll + useTransform)
├── Staggered entry animations
├── Responsive breakpoint tuning
├── Performance audit (Lighthouse, bundle analysis)
└── OG image, metadata, favicon
```

**Rationale:**
- Phase 1 establishes the scroll infrastructure (Lenis) and config that everything else depends on.
- Phase 2 delivers the hero + CTA — the most critical conversion element. Can be tested/deployed independently.
- Phase 3 builds the visual content sections. `scroll-reveal.tsx` is created first because every section uses it.
- Phase 4 is isolated because Remotion has its own setup and can be integrated into existing `FeatureSection` slots.
- Phase 5 is refinement — parallax and stagger effects layer on top of working sections.

## Sources

- Next.js App Router project structure: https://nextjs.org/docs/app/getting-started/project-structure (HIGH confidence — official docs, verified 2026-02-16)
- Framer Motion scroll animations: https://motion.dev/docs/react-scroll-animations (HIGH confidence — official docs, v12.34.0, verified 2026-02-16)
- Remotion Player integration in Next.js: https://www.remotion.dev/docs/player/integration (HIGH confidence — official docs, verified 2026-02-16)
- Remotion `<Player>` API: https://www.remotion.dev/docs/player/player (HIGH confidence — official docs, verified 2026-02-16)
- Lenis smooth scroll library: https://github.com/darkroomengineering/lenis (HIGH confidence — official README, v1.3.17, verified 2026-02-16)
- Resend + Next.js integration: https://resend.com/docs/send-with-nextjs (HIGH confidence — official docs, verified 2026-02-16)

---
*Architecture research for: Momentum Landing Page (cinematic scroll-animated Next.js single-page site)*
*Researched: 2026-02-16*
