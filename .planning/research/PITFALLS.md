# Pitfalls Research

**Domain:** Animated/cinematic single-page landing page with video content (Next.js + Remotion + Framer Motion)
**Researched:** 2026-02-16
**Confidence:** HIGH (most pitfalls verified via official docs; Remotion Player docs, Next.js font optimization docs, WCAG 2.1 SC 1.4.3, Vercel pricing docs, Resend API docs)

## Critical Pitfalls

### Pitfall 1: Remotion Player Bundle Size Blows Up Initial Load

**What goes wrong:**
Importing `@remotion/player` and its composition dependencies adds significant JavaScript to the client bundle. Remotion includes its own reconciler and rendering pipeline. On a landing page where first impressions matter, a 200KB+ (gzipped) additional JS payload pushes LCP past 2.5s on mobile 3G connections, killing Core Web Vitals and bounce rate.

**Why it happens:**
Developers import Remotion compositions at the top level of the page. Every composition, plus Remotion's core runtime, gets included in the initial bundle — even for videos below the fold that the user hasn't scrolled to yet.

**How to avoid:**
- Lazy-load Remotion Player with `next/dynamic` and `{ ssr: false }` — Remotion Player requires browser APIs and cannot SSR
- Only mount `<Player>` components when they enter/approach the viewport (use Intersection Observer)
- Consider pre-rendering Remotion compositions to MP4/WebM video files for simpler compositions and using `<video>` tags instead — reserve the Player for truly interactive/dynamic compositions
- Measure bundle impact with `next build --analyze` (use `@next/bundle-analyzer`)

**Warning signs:**
- `next build` output shows pages with >200KB first-load JS
- Lighthouse Performance score drops below 80 on mobile
- Time to Interactive exceeds 4s on simulated 4G

**Phase to address:**
Phase 1 (Project Setup / Scaffold) — decide which compositions use Player vs. pre-rendered video before building any content sections.

---

### Pitfall 2: Scroll Animation Jank from Layout Thrashing

**What goes wrong:**
Scroll-triggered animations that read DOM layout properties (getBoundingClientRect, offsetHeight, scrollTop) and then write styles in the same frame cause forced synchronous reflows. The browser recalculates layout on every frame, dropping to 15-30fps on mid-range mobile devices. A "cinematic" experience becomes a slideshow.

**Why it happens:**
Developers mix layout reads and writes in scroll handlers, or animate properties that trigger layout (width, height, top, left, margin) instead of compositor-only properties (transform, opacity). Framer Motion's `useScroll` and `useTransform` hooks are safe when used correctly, but combining them with manual DOM reads or animating layout-triggering CSS properties breaks the pipeline.

**How to avoid:**
- Only animate `transform` and `opacity` — these are compositor-only and skip layout/paint
- Use Framer Motion's `useScroll()` + `useTransform()` pipeline rather than raw scroll event listeners
- Never read layout properties inside animation callbacks
- Add `will-change: transform` on elements about to animate (but remove after animation completes)
- Test on a real mid-range Android device or throttled Chrome DevTools (4x CPU slowdown)

**Warning signs:**
- Chrome DevTools Performance tab shows layout recalculations during scroll (purple bars)
- FPS counter drops below 50 during scroll on desktop
- Users on iPhone SE / older Android report "laggy" scrolling

**Phase to address:**
Phase 2 (Animation System) — establish animation patterns and constraints before building individual sections. Create a shared animation utility that enforces transform/opacity-only animations.

---

### Pitfall 3: iOS Safari Scroll Behavior Breaks Scroll Animations

**What goes wrong:**
iOS Safari has unique scroll mechanics: elastic overscroll (rubber-banding), momentum scrolling, and the dynamic viewport height (the URL bar collapses/expands during scroll). Scroll-linked animations that assume linear, predictable scroll positions produce broken effects — elements jump, animations overshoot, or the viewport height changes mid-animation causing layout shifts.

**Why it happens:**
- `100vh` on iOS Safari includes the URL bar height, meaning content behind the URL bar is initially invisible. When the bar collapses, `100vh` suddenly refers to a taller area.
- Momentum scrolling means `scrollTop` values can overshoot boundaries (negative values, values beyond scrollHeight).
- `scroll` events may not fire during momentum coast on older iOS versions.
- Non-passive scroll event listeners block the main thread and cause Safari to log warnings or drop frames.

**How to avoid:**
- Use `100dvh` (dynamic viewport height) instead of `100vh` for full-screen sections — supported in Safari 15.4+
- Clamp scroll progress values: `Math.max(0, Math.min(1, progress))` — never trust raw scroll values
- Ensure all scroll event listeners are passive: `{ passive: true }` — Framer Motion handles this internally, but custom listeners must opt in
- Test the `prefers-reduced-motion` media query: `@media (prefers-reduced-motion: reduce)` — skip scroll animations entirely for users who've enabled reduced motion in system settings
- Test on real iOS devices via BrowserStack or Xcode Simulator — Chrome DevTools device emulation does NOT replicate Safari scroll behavior

**Warning signs:**
- Hero section has a gap at the bottom on iOS Safari
- Scroll animations "snap" or "jump" at the start/end of the page
- Console warnings about non-passive event listeners
- Accessibility audit flags lack of reduced-motion handling

**Phase to address:**
Phase 2 (Animation System) — build iOS Safari viewport handling into the layout foundation. This is not something you retrofit.

---

### Pitfall 4: Dark Theme Fails WCAG Contrast Requirements

**What goes wrong:**
The monochromatic dark palette (#0a0a0a background, #f4f4f0 text) provides excellent contrast for primary text (~17.5:1 ratio, well above WCAG AA's 4.5:1). But secondary/muted text, placeholder text, subtle borders, and disabled states on dark backgrounds easily fall below WCAG AA minimums. Designers use opacity to create hierarchy (e.g., `text-white/50` = `rgba(244,244,240,0.5)`) without checking contrast.

**Why it happens:**
On dark themes, the perceptual difference between "slightly dim" and "illegible" is much smaller than on light themes. An opacity of 0.5 on white text over #0a0a0a yields a contrast ratio of ~8.8:1 (fine), but 0.3 yields ~5.4:1 (borderline for body text, fails for small text depending on font weight). Surface cards (#1A1A1A) with muted text create even lower contrast.

Per WCAG 2.1 SC 1.4.3 (confirmed via W3C docs):
- Normal text: minimum 4.5:1 contrast ratio
- Large text (18pt+ or 14pt+ bold): minimum 3:1 contrast ratio
- UI components and graphical objects: minimum 3:1 (SC 1.4.11)

**How to avoid:**
- Define a contrast-checked opacity scale: establish minimum opacity values for text on each background color (#0a0a0a, #1A1A1A, etc.) and document them
- Use a contrast checker tool during design (e.g., WebAIM Contrast Checker) for every text/background combination
- Playfair Display at display sizes (24px+) qualifies as "large text" — 3:1 minimum applies. But Inter at body sizes (14-16px) requires 4.5:1
- Never use opacity below 0.4 for any text that conveys information on #0a0a0a
- Test with browser extensions that simulate low vision and color blindness

**Warning signs:**
- Any text color with less than 4.5:1 ratio against its background at body text size
- Lighthouse accessibility audit flags contrast issues
- Using Tailwind opacity utilities (`/30`, `/20`) on text without checking computed contrast

**Phase to address:**
Phase 1 (Design System / Scaffold) — define the color tokens and opacity scale with contrast ratios verified before building components. This is a design system concern, not a per-component concern.

---

### Pitfall 5: Video/Animation Files Destroy Vercel Bandwidth and LCP

**What goes wrong:**
A landing page with multiple Remotion video compositions or `<video>` elements (showing app interactions like checkbox animations, heatmap fills, onboarding flows) can easily serve 20-50MB of video per page load. On Vercel Hobby (100GB bandwidth/month), even moderate traffic (5,000 visits/month * 30MB = 150GB) exceeds the free tier. Simultaneously, video files that aren't properly optimized become the LCP element and push Core Web Vitals into "poor" territory.

**Why it happens:**
- Developers export video at source resolution (1080p+) without compression
- Multiple videos autoplay simultaneously on page load
- No CDN caching headers set, so videos re-download on repeat visits
- Videos placed above the fold become the LCP element with multi-second load times

**How to avoid:**
- Compress all video to H.264 (MP4) + VP9 (WebM) using FFmpeg: target 1-2MB per 10-second clip at 720p
- Use `<video>` with `preload="none"` or `preload="metadata"` for below-fold content — only the above-fold hero should preload
- Serve videos from a dedicated CDN (Cloudflare R2, AWS CloudFront, or Bunny CDN) rather than from the Vercel deployment to avoid bandwidth charges
- For hero content, consider a poster image that loads instantly with the video loading behind it
- Set proper `Cache-Control` headers: `public, max-age=31536000, immutable` for versioned video assets
- Vercel Hobby plan includes 100GB bandwidth/month; Pro is usage-based — monitor via Vercel dashboard

**Warning signs:**
- `next build` output shows large static assets in the public/ directory
- Vercel dashboard shows bandwidth approaching plan limits
- LCP in Lighthouse exceeds 2.5s with video as the LCP element
- Page weight exceeds 5MB on initial load (check via Chrome DevTools Network tab)

**Phase to address:**
Phase 1 (Project Setup) — decide video hosting strategy before adding any video content. Phase 3 (Content Sections) — compress and optimize each video as it's added.

---

### Pitfall 6: Resend Email Capture Without Domain Verification Lands in Spam

**What goes wrong:**
Emails sent from Resend's default `onboarding@resend.dev` domain during development work fine. But when you switch to your own sending domain without properly configuring DNS records (DKIM, SPF, DMARC), confirmation emails land in spam folders. Your waitlist signups never see the confirmation, undermining the entire pre-launch email strategy.

**Why it happens:**
- Resend free tier allows only 1 custom domain — but developers forget to verify it before going live
- DKIM/SPF/DMARC DNS records are set incorrectly or DNS propagation isn't complete at launch time
- Using `@gmail.com` or `@outlook.com` as the "from" address (email providers reject these from third-party senders)
- Resend free tier: 100 emails/day, 3,000 emails/month — sufficient for 50-100 waitlist signups, but a social media spike could exhaust the daily limit

**How to avoid:**
- Set up your custom domain in Resend and verify DNS records (DKIM, SPF, DMARC) during the scaffold phase, not at launch
- Use a subdomain for transactional email (e.g., `mail.momentum.app`) to isolate reputation
- Implement rate limiting on the email API route: max 5 signups per IP per hour to prevent abuse
- Add a Resend idempotency key (confirmed in their API docs) to prevent duplicate emails on form resubmission
- Test deliverability by sending to Gmail, Outlook, Yahoo, and Apple Mail accounts before launch
- Store emails in a simple database/KV store (even a JSON file in development) as a backup — don't rely solely on Resend's audience/contact list

**Warning signs:**
- Test emails land in spam folder on Gmail/Outlook
- Resend dashboard shows high bounce rates
- DNS verification shows "pending" status in Resend dashboard days after adding records
- Daily limit reached during testing

**Phase to address:**
Phase 1 (Project Setup) — register domain in Resend and configure DNS immediately. Phase 4 (Email Integration) — implement rate limiting and idempotency.

---

### Pitfall 7: Two-State CTA Serves Stale State from Cache

**What goes wrong:**
The two-state CTA (waitlist mode vs. App Store download mode) is controlled by an environment variable or feature flag. After switching from State A to State B, users see the old waitlist form instead of the download button because:
1. Vercel's CDN has cached the previous page version
2. The client-side JavaScript has been cached by the browser or service worker
3. The environment variable change requires a redeployment, but the developer expected it to be "live"

**Why it happens:**
- Next.js static pages (SSG) are generated at build time — changing an env var without redeploying has no effect
- Vercel's Edge CDN caches aggressively by default — even ISR pages may serve stale content for the revalidation window
- Browser-level caching of JS bundles means returning users see the old state even after redeployment

**How to avoid:**
- Use a runtime check, not a build-time env var: fetch the CTA state from a lightweight API route, Edge Config, or remote config (Vercel Edge Config is free and instant)
- If using SSG, trigger a redeployment via Vercel Deploy Hook when switching states (can be automated with a simple script or webhook)
- Set `Cache-Control: no-cache` or short `s-maxage` on the page if the state needs to update without redeployment
- Alternatively, use ISR with a short revalidation period (e.g., 60 seconds) during the transition window, then switch back to static after launch is stable
- Test the transition explicitly: deploy State A, verify, switch to State B, verify, switch back

**Warning signs:**
- After changing the env var, the live site still shows the old CTA
- Different users see different states (some cached, some not)
- No redeployment was triggered after the environment variable change

**Phase to address:**
Phase 1 (Architecture) — decide the state-switching mechanism upfront. Phase 5 (Polish / Launch Prep) — test the A→B transition as a specific launch checklist item.

---

## Technical Debt Patterns

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Using `<video>` for everything instead of Remotion Player | Simpler implementation, smaller bundle | Lose interactive/dynamic compositions, harder to update app preview content | For compositions that don't need runtime interactivity (e.g., simple app interaction loops) — this is actually preferable |
| Inline scroll animation values instead of shared config | Faster to build individual sections | Inconsistent animation timing, hard to tune globally | Never — define animation presets in a shared config from day one |
| Skipping video compression, serving source files | Faster development iteration | 10-50x larger file sizes, bandwidth overages, terrible mobile experience | Only in local development |
| Using `100vh` instead of `100dvh` | Works in dev (Chrome desktop) | Broken on iOS Safari — content hidden behind URL bar | Never — `100dvh` is supported in all target browsers |
| Storing waitlist emails only in Resend contacts | No database to set up | No backup if Resend has an outage, hard to export, 1-day data retention on free tier | Only for truly minimal MVP with <20 expected signups |
| Hardcoding CTA state with env var | Simple, no external dependency | Requires full redeployment to switch states | Acceptable if you accept the ~60s redeployment delay at launch |

## Integration Gotchas

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| Resend (email) | Sending from unverified domain or personal email address | Verify a custom domain (or subdomain) with DKIM/SPF/DMARC before first production send |
| Resend (email) | No duplicate submission prevention | Use idempotency keys in the API, plus client-side form disable after submit |
| Remotion Player | Rendering Player on the server (SSR) | Always use `next/dynamic` with `ssr: false` — Remotion Player requires browser APIs |
| Remotion Player | Not memoizing `inputProps` | Wrap inputProps in `useMemo()` — unmemoized objects cause full Player re-renders every frame (confirmed in Remotion best practices docs) |
| Remotion Player | Not handling the buffering state | Use `pauseWhenBuffering` prop on media elements inside compositions to prevent flicker (will be default in Remotion 5.0, per official docs) |
| Vercel (deployment) | Putting large video files in `public/` directory | Host on external CDN; `public/` files count against Vercel's bandwidth and increase deployment size/time |
| next/font | Loading full font families instead of specific weights | Import only the weights you need: Playfair Display 400/700, Inter 400/500/600 — each unused weight adds ~20-50KB |

## Performance Traps

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| All Remotion compositions load on page mount | LCP >4s, initial bundle >500KB | Lazy-load with dynamic imports + Intersection Observer | Immediately on any mobile device |
| Autoplay videos load simultaneously | Network waterfall, 30+ second full page load on 3G | `preload="none"` for off-screen videos, stagger loading | >2 video elements on page |
| Scroll animations trigger re-renders of unrelated components | Janky scrolling, high CPU usage | Isolate animated components from parent state, use Framer Motion's `motion` components which optimize re-renders | >5 animated sections on one page |
| Unoptimized screenshot PNGs at 3x retina resolution | 2-5MB per screenshot image | Use `next/image` with quality=80, serve WebP/AVIF, size to 2x max display width (not 3x) | >3 phone frame screenshots on page |
| Font files loaded via external CDN instead of next/font | FOUT (flash of unstyled text), extra DNS lookup, privacy issue | Use `next/font/google` which self-hosts fonts at build time (confirmed in Next.js docs) — zero external network requests | Immediately on first load |

## Security Mistakes

| Mistake | Risk | Prevention |
|---------|------|------------|
| Email API route with no rate limiting | Bot spam: thousands of junk signups, Resend daily/monthly limit exhausted, potential Resend account suspension | Server-side rate limiting (IP-based, 5/hour), honeypot field, optional turnstile/reCAPTCHA |
| Resend API key exposed in client-side code | Attacker sends emails as your domain, burns your reputation and Resend quota | Only call Resend from a server-side API route (Next.js Route Handler), never expose `RESEND_API_KEY` to the browser |
| No input sanitization on email field | XSS via email display, header injection attacks | Validate email format server-side with a proper regex or library (e.g., `zod` email validator), sanitize before storing |
| GDPR non-compliance on email collection | Legal liability in EU, potential fines | Add clear consent language ("We'll email you when Momentum launches"), link to privacy policy, provide unsubscribe mechanism in any emails sent |

## UX Pitfalls

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Scroll animations with no reduced-motion fallback | Users with vestibular disorders experience nausea/dizziness; 30%+ of iOS users have "Reduce Motion" enabled | Check `prefers-reduced-motion: reduce` and replace scroll animations with simple fade-in or instant display |
| Video autoplay with sound | Browsers block autoplay with sound; video appears broken | Always use `muted` attribute on autoplay videos; add visible play/unmute button if audio is desired |
| Email form with no loading/success/error states | User clicks submit, nothing visible happens, clicks again (duplicate submission) | Show loading spinner on submit, success message on completion, clear error messages on failure |
| Phone frame screenshots that are tiny on mobile | Users can't see app details, defeats the purpose of showcasing the app | Make phone frames full-width on mobile (with horizontal scroll for multiple), or use a lightbox/zoom interaction |
| Animations that delay content visibility | User must wait 2-3s for staggered animations to reveal content — feels slow, not cinematic | Keep entrance animations under 800ms total duration, ensure key content (headline, CTA) is visible immediately |

## "Looks Done But Isn't" Checklist

- [ ] **Scroll animations:** Often missing `prefers-reduced-motion` fallback — verify with `(prefers-reduced-motion: reduce)` media query active in browser devtools
- [ ] **Email capture:** Often missing error handling for network failures — verify by testing with network offline
- [ ] **Email capture:** Often missing duplicate prevention — verify by submitting same email twice
- [ ] **Dark theme:** Often missing contrast check on muted/secondary text — verify every text color against its background with a contrast checker tool
- [ ] **Remotion Player:** Often missing loading state — verify by throttling network to Slow 3G and observing blank space where Player should be
- [ ] **Two-state CTA:** Often missing transition testing — verify by actually switching the env var/flag and confirming both states render correctly without redeployment
- [ ] **Font loading:** Often missing fallback font metrics — verify by disabling network and observing layout shift (CLS) when fonts don't load
- [ ] **Mobile viewport:** Often missing `100dvh` usage — verify on real iOS Safari that hero section fills viewport correctly with URL bar visible and hidden
- [ ] **SEO:** Often missing static content for crawlers — verify with `curl` that meaningful text content is in the initial HTML response, not only rendered by JS
- [ ] **Images:** Often missing `alt` text on decorative screenshots — verify with Lighthouse accessibility audit
- [ ] **Video:** Often missing `poster` attribute — verify that a meaningful image shows before video loads
- [ ] **CTA button:** Often missing keyboard focus styles on dark background — verify by tabbing through the page

## Recovery Strategies

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Bundle too large from Remotion | MEDIUM | Switch specific compositions from Player to pre-rendered video files; add dynamic imports for remaining Player instances |
| iOS Safari viewport broken | LOW | Replace all `100vh` with `100dvh`; add `min-height: -webkit-fill-available` as fallback for older Safari |
| Contrast failures | LOW | Audit with Lighthouse, increase opacity values or switch to explicit color tokens; typically a few CSS changes |
| Video files too large | MEDIUM | Re-encode with FFmpeg (`-crf 28 -preset slow`), generate WebM alternatives, move to external CDN |
| Email spam/abuse | MEDIUM | Add rate limiting middleware, deploy Cloudflare Turnstile, review and purge junk signups from Resend |
| Stale CTA state after switching | LOW | Purge Vercel CDN cache (`vercel --force`), trigger redeployment, add cache-busting query param |
| SEO invisible content | HIGH | Refactor from client-only rendering to server-rendered content with client-side animation enhancement (progressive enhancement pattern) — this is an architectural change |

## Pitfall-to-Phase Mapping

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Remotion bundle size | Phase 1: Scaffold | `next build` shows <150KB first-load JS per page |
| Scroll animation jank | Phase 2: Animation System | Chrome DevTools Performance shows 60fps during scroll |
| iOS Safari scroll | Phase 2: Animation System | Real device testing on iPhone with Safari — hero section renders correctly |
| Dark theme contrast | Phase 1: Design System | Every text/background combination checked with WCAG contrast tool |
| Video file size / bandwidth | Phase 1: Setup + Phase 3: Content | No single video >2MB, total page weight <8MB, videos on external CDN |
| Resend domain verification | Phase 1: Setup | Test email delivered to inbox (not spam) on Gmail, Outlook |
| Two-state CTA caching | Phase 1: Architecture | Both states tested on production deployment with cache cleared |
| Font loading FOUT/CLS | Phase 1: Scaffold | CLS <0.1 measured by Lighthouse with fonts loaded via next/font |
| Email rate limiting | Phase 4: Email Integration | Cannot submit >5 signups from same IP within 1 hour |
| SEO content visibility | Phase 3: Content | `curl` shows headline, description, and key text in HTML response |
| Image optimization | Phase 3: Content | All screenshots served as WebP via next/image, <200KB each at 2x |

## Sources

- Next.js Font Optimization docs: https://nextjs.org/docs/app/building-your-application/optimizing/fonts (confirmed: self-hosting, zero external requests, layout shift prevention)
- Remotion Player docs: https://www.remotion.dev/docs/player (confirmed: installation, best practices, flicker avoidance)
- Remotion Player best practices: https://www.remotion.dev/docs/player/best-practices (confirmed: avoid re-renders, memoize inputProps, pass event to play())
- Remotion Player flicker avoidance: https://www.remotion.dev/docs/troubleshooting/player-flicker (confirmed: pauseWhenBuffering, premounting, preloading strategies)
- WCAG 2.1 SC 1.4.3 Contrast (Minimum): https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html (confirmed: 4.5:1 for normal text, 3:1 for large text)
- Vercel pricing docs: https://vercel.com/docs/pricing (confirmed: usage-based billing, Hobby plan limits)
- Vercel Functions pricing: https://vercel.com/docs/functions/usage-and-pricing (confirmed: CPU/memory billing model)
- Resend API docs: https://resend.com/docs/api-reference/emails/send-email (confirmed: idempotency keys, max 50 recipients per email)
- Resend pricing page: https://resend.com/pricing (confirmed: Free = 100/day, 3K/month, 1 domain, 1-day retention; Pro = $20/mo, 50K/month)
- iOS Safari viewport units: MDN `dvh` documentation (MEDIUM confidence — based on known browser behavior and widespread community documentation)
- Framer Motion scroll behavior: Based on Framer Motion API design patterns (MEDIUM confidence — verified against known API surface, not fetched from docs in this session)

---
*Pitfalls research for: Animated/cinematic single-page landing page with video content*
*Researched: 2026-02-16*
