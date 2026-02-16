# Feature Research

**Domain:** Premium app landing page (single-page, dark-themed, iOS habit tracker)
**Researched:** 2026-02-16
**Confidence:** HIGH (based on analysis of Linear, Arc, Raycast, Superhuman, Notion, Headspace, Calm landing pages + domain knowledge of waitlist/launch patterns)

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = page feels incomplete or amateur.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Hero section with headline + CTA** | First 5 seconds determine bounce. Every premium landing page opens with a bold value prop + single clear action. Linear: "The product development system for teams and agents." Arc: immediate download buttons. | LOW | Headline ("The Anti-Subscription Habit Tracker") + single CTA (email capture or App Store button). Keep copy tight: headline + 1-line subhead + CTA. No paragraphs. |
| **Primary CTA (email capture / download)** | The entire page exists for conversion. Without a clear primary action, the page is a brochure. Headspace: "Try for $0". Calm: "Try Calm for Free". | LOW | Two states: (A) email input + submit button, (B) App Store badge. Must be above the fold. |
| **Navigation bar** | Signals legitimacy and orientation. Even single-page sites have a minimal nav. Linear, Raycast, Arc all have slim top navs. | LOW | Minimal: logo left, maybe 1-2 anchor links + CTA button right. For a single-page site, can be logo + CTA only. Sticky on scroll. |
| **Feature showcase section** | Users need to understand what the app does. Every app landing page has a "what it does" section with visuals. | MEDIUM | 3-5 feature blocks with visual (screenshot or animation) + short copy. Habit tracking, heatmaps, insights, onboarding ritual. |
| **Visual proof of the app (screenshots/mockups)** | Users don't trust text-only claims. They need to see the product. Arc, Headspace, Raycast all show product UI prominently. | MEDIUM | Real simulator screenshots in device frames. This is non-negotiable for a mobile app page. |
| **Responsive design (mobile-first)** | 60%+ of traffic is mobile. A landing page that breaks on mobile is dead on arrival. | MEDIUM | Tailwind handles this well, but animations and device mockups need mobile-specific layouts. Test heavily. |
| **Footer with legal/info links** | Signals legitimacy. Even pre-launch pages need placeholder links for Privacy, Terms, Contact. Every analyzed page has a structured footer. | LOW | Minimal: Privacy Policy (placeholder), Terms (placeholder), contact email. Can be very sparse for pre-launch. |
| **Social proof or credibility signal** | Users need validation from others. Raycast: testimonial wall from known tech figures. Notion: "Trusted by Figma, OpenAI, Ramp." Calm: "Over 2 million 5-star reviews." | LOW-MEDIUM | Pre-launch options: testimonials from beta testers, "Join X others on the waitlist" counter, press mentions if any. Post-launch: App Store rating, download count, user quotes. |
| **Pricing/value transparency** | "Anti-Subscription" is the core positioning. Users need to understand what they get for free vs Pro. Superhuman and Headspace both have clear pricing sections. | LOW | Doesn't need a full pricing table. A short section: "Free forever. Pro when you want it. No tricks." with bullet points differentiating free vs Pro. |
| **Repeating CTA (bottom of page)** | After scrolling, users need the CTA again. Linear, Arc, Raycast all repeat the primary CTA at the bottom. Calm: "Try Calm for Free" repeats in footer area. | LOW | Mirror the hero CTA at the bottom of the page. Same email capture or download button. |

### Differentiators (Competitive Advantage)

Features that set Momentum's landing page apart from generic app pages. Not required, but create the premium impression and boost conversion.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Scroll-driven storytelling with sequential reveals** | Linear's page tells a narrative: Intake -> Plan -> Build -> Reviews -> Monitor, with each section scrolling into view. This creates a cinematic experience that matches Momentum's philosophical tone. Instead of dumping features, you guide the visitor through a journey. | HIGH | Use Framer Motion or GSAP with Intersection Observer for scroll-triggered section reveals. Each section fades/slides into view as user scrolls. The philosophical tone ("Stop Guessing. Start Tracking." -> feature sections -> "What's Next") maps naturally to a narrative structure. |
| **Animated app previews (Remotion compositions)** | Most app pages show static screenshots. Showing the app in motion (checkbox animation, heatmap filling, insights reveal) is how Linear and Raycast differentiate — they show the product working, not just sitting there. This is especially powerful for a habit tracker where the daily interaction IS the product. | HIGH | Remotion compositions rendered as video or animated GIFs embedded in feature sections. Key animations: (1) habit checkbox toggle with spring animation, (2) heatmap cells filling over time, (3) insights/stats counter animating up. Fall back to static screenshots on slow connections. |
| **Device frame presentation with real screenshots** | Premium pages put screenshots in high-fidelity device frames. Apple does this on every product page. It signals "this is a real, polished product" vs a prototype. | MEDIUM | Use a consistent iPhone frame (iPhone 15 Pro in black, matching the monochromatic theme). CSS-based frame avoids image weight. All screenshots must be real simulator captures, not mockups. |
| **Dark-themed cinematic aesthetic** | Most landing pages are white/light. A dark page immediately differentiates and signals premium positioning (think Apple product pages, Linear, Raycast). The near-black (#0a0a0a) background with off-white (#f4f4f0) text matches the Co-Star/existential aesthetic. High contrast is striking. | MEDIUM | Use the app's exact color tokens. Subtle gradients (radial glows behind sections) prevent "wall of black" fatigue. Linear uses subtle light effects on dark backgrounds. Borders at rgba(244,244,240,0.1) for card separation. |
| **Philosophical/existential copywriting tone** | No other habit tracker talks like this. Co-Star's tone (direct, existential, slightly confrontational) applied to a habit tracker creates an unforgettable brand voice. "It Hurts. It Helps." is more memorable than "Track your habits easily." | LOW | Copy is content, not code. But it must be integrated into the visual hierarchy. Short, punchy lines. Playfair Display for emotional headlines, Inter for functional body copy. Use the existing taglines from PROJECT.md. |
| **"What's Next" future feature teaser section** | Teasing AI reflections and token economy creates anticipation and signals ambition without overpromising. Linear does this with their "Reviews (Coming soon)" section. It's honest about timeline while building excitement. | MEDIUM | Clearly labeled "Coming Soon" or "What's Next" section. Show 2-3 future features with minimal but evocative descriptions. Use dimmed/greyed visual treatment to distinguish from current features. Avoid mockups of unbuilt features — use abstract icons or conceptual illustrations instead. |
| **Waitlist counter / social proof in real-time** | "Join 247 others" next to an email input creates urgency and social proof. Converts better than a bare input field. | LOW-MEDIUM | Show real count from Resend list. Update on page load. Even "Join the first 50" works pre-launch. If the number is embarrassingly low (<10), hide the counter and just use "Be the first to know." |
| **Micro-interactions and hover states** | Subtle animations on buttons, cards, and transitions signal craft. Raycast's keyboard visualization, Linear's smooth card transitions — these details communicate "we care about every pixel." | MEDIUM | Button hover glow effects, card hover lift, smooth scroll behavior, cursor-following subtle effects. Keep it restrained — the monochromatic palette means motion carries more visual weight. |
| **Parallax depth on scroll** | Creates a 3D, layered feeling as user scrolls. Apple uses this extensively on product pages. Combined with dark theme and large typography, this creates the "cinematic" scroll experience. | MEDIUM | Parallax on background elements or device mockups. Keep it subtle — aggressive parallax causes motion sickness and hurts mobile performance. 1-2 layers of depth, not 5. Disable or reduce on mobile/prefers-reduced-motion. |
| **Email capture with immediate value feedback** | Instead of just "Enter your email" -> "Thanks!", the best waitlist UX confirms value: show position in line, promise specific launch-day perks, or immediately deliver something (wallpaper, manifesto PDF). | LOW-MEDIUM | After signup: "You're in. #247 on the list. We'll email you launch day." Optionally: auto-send a welcome email via Resend with a Momentum wallpaper or manifesto excerpt. |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems for this specific project.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **Hamburger menu / complex navigation** | "We need nav links to each section" | Single-page sites with complex nav feel like broken multi-page sites. Hamburger menus hide content and add clicks. The page IS the nav — you scroll it. | Minimal sticky nav: logo + CTA button. Optional: 2-3 anchor links that scroll smoothly. |
| **Autoplay video with sound** | "Show the app in action immediately" | Autoplaying video/sound causes immediate bounce. Browsers block it. Users hate it. Even Headspace and Calm don't autoplay sound. | Muted autoplay for short loops OR scroll-triggered animation. User-initiated play for anything with audio. |
| **Feature comparison table vs competitors** | "Show why we're better than Habitica, Streaks, etc." | Comparison tables look defensive, not confident. They also invite legal issues and date quickly. Premium brands don't acknowledge competitors. | Imply superiority through design quality and tone: "The Anti-Subscription Habit Tracker" says everything without naming competitors. |
| **Chatbot / live chat widget** | "Support users who have questions" | Pre-launch, there's no product to support. A chatbot on a landing page screams "enterprise SaaS," not "premium indie app." It also adds JS weight and visual clutter. | Simple mailto: link in footer or a minimal FAQ section (3-4 questions max). |
| **App Store badge overload (Google Play, web app, etc.)** | "Maximize download surface area" | Momentum is iOS-only. Showing a Google Play badge or web app link sets false expectations. Even a "coming soon to Android" is a distraction from the primary CTA. | Single "Download on the App Store" badge (State B) or single email input (State A). One CTA. |
| **Pricing page / tier comparison** | "Show the free vs Pro breakdown in detail" | Full pricing pages are for SaaS products with complex tiers. For a mobile app, it kills the "just try it" impulse. Headspace and Calm bury pricing details. | Brief "Free forever. Pro for power users." section with 3-4 bullet points. Link to App Store for actual pricing. |
| **Blog / content section** | "We should have content marketing from day one" | Multi-page content dilutes a single-page landing page. Content marketing is a Phase 2+ effort. Adding blog posts to a pre-launch page looks empty. | Out of scope (confirmed in PROJECT.md). Content marketing comes after launch when there's actual product and users. |
| **Cookie consent banner** | "GDPR compliance" | If only collecting emails via Resend and not using tracking cookies (no GA, no Facebook Pixel), a cookie banner may not be legally required. It's visual noise on a minimal page. | If no tracking cookies: skip the banner. If adding analytics later: add consent then. Verify with a GDPR checklist before launch. |
| **Testimonial carousel / slider** | "Show lots of social proof" | Carousels have notoriously low engagement (users rarely click past slide 1). They add JS complexity and CLS issues. Calm has one but it's their only social proof — they have the volume to fill it. | 2-3 static testimonial quotes in a clean grid. Or a single powerful quote with attribution. Quality over quantity. |
| **Aggressive exit-intent popup** | "Capture emails from bouncing visitors" | Exit-intent popups feel desperate and adversarial. They contradict the premium, philosophical brand. Co-Star would never. | If the page itself doesn't convert, a popup won't save it. Invest in the page quality instead. |

## Feature Dependencies

```
[Hero Section] (headline + CTA)
    ├── requires → [State Management] (waitlist vs download mode)
    │                  └── requires → [Environment Variable / Feature Flag]
    └── requires → [Email Capture Backend] (Resend integration, State A only)

[Feature Showcase Sections]
    ├── requires → [Device Frame Component] (reusable phone mockup)
    ├── requires → [Real App Screenshots] (from iOS simulator)
    └── optionally enhanced by → [Remotion Animated Previews]
                                      └── requires → [Remotion Setup + Compositions]

[Scroll Animations]
    ├── requires → [Animation Library] (Framer Motion or GSAP)
    └── enhanced by → [Parallax Effects]

["What's Next" Teaser Section]
    └── independent (content only, no backend)

[Social Proof Section]
    └── optionally enhanced by → [Waitlist Counter] 
                                      └── requires → [Resend API read access]

[Footer]
    └── independent (static content + links)

[Repeating Bottom CTA]
    └── requires → [State Management] (same as Hero CTA)
```

### Dependency Notes

- **Hero CTA requires State Management:** The entire page's CTA behavior depends on whether the page is in waitlist mode (State A) or download mode (State B). This must be the first architectural decision — an env var or feature flag that controls CTA rendering globally.
- **Feature Showcase requires real screenshots:** No screenshots = no feature showcase. Screenshots are a production dependency, not a code dependency. Must be captured from the actual iOS app in simulator.
- **Remotion enhances but doesn't block Feature Showcase:** Static screenshots are the fallback. Remotion compositions add motion but are the highest-complexity item. Build feature sections with static images first, layer in animations.
- **Scroll Animations are independent of content:** The animation system (Framer Motion / GSAP + Intersection Observer) can be built as a reusable wrapper component and applied to any section.
- **Waitlist Counter requires Resend API:** If showing "Join X others," need a server-side API route that reads the Resend audience count. This is optional — page works fine without it.

## MVP Definition

### Launch With (v1)

Minimum viable landing page — enough to start collecting emails and look premium.

- [x] **Hero section** — Headline + subhead + email capture input (State A) — this IS the landing page's core function
- [x] **Sticky minimal nav** — Logo + CTA button — establishes legitimacy
- [x] **3-4 feature sections with static screenshots in device frames** — shows the product is real
- [x] **Pricing/value section** — "Free forever. Pro when you want it." — communicates the Anti-Subscription positioning
- [x] **Repeating bottom CTA** — second conversion opportunity after scroll
- [x] **Footer** — legal placeholder links + contact
- [x] **State management (env var)** — ability to flip from waitlist to download mode
- [x] **Resend email capture integration** — server-side API route for collecting emails
- [x] **Responsive design** — must work on mobile from day one
- [x] **Dark theme with correct color tokens** — the aesthetic IS the differentiator

### Add After Validation (v1.x)

Features to add once the core page is live and collecting emails.

- [ ] **Scroll-triggered reveal animations** — fade/slide sections into view as user scrolls. Trigger: page is live and stable.
- [ ] **Remotion animated previews** — replace static screenshots with video compositions in 1-2 key feature sections. Trigger: have Remotion compositions from the app project.
- [ ] **"What's Next" teaser section** — AI reflections + token economy teaser. Trigger: have finalized feature descriptions for these.
- [ ] **Waitlist counter** — "Join X others." Trigger: have >25 signups (below that, showing a count hurts more than it helps).
- [ ] **Parallax / depth effects** — subtle layered scrolling. Trigger: base scroll animations are working.
- [ ] **Social proof section** — beta tester quotes or early press. Trigger: have real testimonials to show.
- [ ] **Post-signup value delivery** — welcome email with Momentum wallpaper or manifesto excerpt via Resend. Trigger: email capture is working.

### Future Consideration (v2+)

Features to defer until post-launch with real traction.

- [ ] **Video hero background** — ambient motion behind the hero. Defer: heavy asset, slows initial load, hard to get right on mobile.
- [ ] **Interactive feature demos** — scroll-controlled app animations that respond to user scroll position. Defer: extremely high complexity, diminishing returns vs simpler animations.
- [ ] **A/B testing different headlines** — test "Stop Guessing. Start Tracking." vs "The Anti-Subscription Habit Tracker." Defer: need traffic volume first.
- [ ] **App Store review integration** — pull and display real App Store reviews. Defer: need reviews first (post-launch).
- [ ] **Multi-language support** — Defer: English-only until international demand is demonstrated.

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Hero + email CTA | HIGH | LOW | P1 |
| State management (waitlist/download) | HIGH | LOW | P1 |
| Resend email integration | HIGH | LOW | P1 |
| Dark theme + typography system | HIGH | MEDIUM | P1 |
| Feature sections with screenshots | HIGH | MEDIUM | P1 |
| Device frame component | HIGH | LOW-MEDIUM | P1 |
| Responsive design | HIGH | MEDIUM | P1 |
| Sticky nav | MEDIUM | LOW | P1 |
| Footer | LOW | LOW | P1 |
| Repeating bottom CTA | MEDIUM | LOW | P1 |
| Pricing/value section | HIGH | LOW | P1 |
| Scroll-triggered animations | MEDIUM | MEDIUM | P2 |
| Remotion animated previews | HIGH | HIGH | P2 |
| "What's Next" teaser section | MEDIUM | LOW-MEDIUM | P2 |
| Micro-interactions / hover states | MEDIUM | MEDIUM | P2 |
| Social proof section | MEDIUM | LOW | P2 |
| Waitlist counter | LOW-MEDIUM | LOW-MEDIUM | P2 |
| Parallax effects | LOW-MEDIUM | MEDIUM | P3 |
| Post-signup welcome email | LOW-MEDIUM | LOW | P3 |
| Video hero background | LOW | HIGH | P3 |

**Priority key:**
- P1: Must have for launch — page is broken or unconvincing without it
- P2: Should have — significant quality/conversion uplift, add when core is stable
- P3: Nice to have — polish and optimization, defer until P1+P2 are solid

## Competitor Landing Page Analysis

| Feature | Linear | Arc | Raycast | Superhuman | Headspace/Calm | Momentum Approach |
|---------|--------|-----|---------|------------|----------------|-------------------|
| Theme | Dark | White/gradient | Dark | White | Colorful/light | Dark (#0a0a0a) — matches app DNA |
| Hero style | Big headline + product screenshot | Quote + download buttons | Headline + keyboard visual | Headline + product demo | Headline + app screenshots carousel | Big headline + email input or App Store badge |
| Feature presentation | Scroll-through numbered sections | Screenshot + short copy blocks | Interactive category tabs | Tab-based product suite | Categorized content library | Sequential scroll reveals with device mockups |
| Social proof | Logo wall + customer quotes | 4 user tweets | Testimonial grid with avatars + roles | Logo wall ("Trusted by...") | "2M+ 5-star reviews" + user quotes | Start with waitlist count, add testimonials post-launch |
| Animation | Heavy — scroll-driven section reveals, product UI animations | Moderate — screenshot transitions | Moderate — keyboard animation, card hovers | Moderate — tab transitions | Light — carousel, hover states | Medium — scroll reveals + Remotion video compositions |
| CTA pattern | "Sign up" repeated at top + bottom | "Download" repeated at top + bottom | "Download" repeated at top + bottom | "Get Superhuman" repeated at top + bottom | "Try for $0" / "Try for free" repeated | Email capture (A) / App Store badge (B) at top + bottom |
| Coming soon | "Reviews (Coming soon)" clearly labeled | Dia browser teaser | Windows beta callout | — | — | "What's Next" section for AI + tokens |
| Tone | Professional, technical confidence | Playful, personal | Efficient, developer-focused | Aspirational, productivity | Warm, calming, scientific | Philosophical, existential, brutally honest |

## Sources

- Linear (https://linear.app) — analyzed 2026-02-16: Dark-themed SaaS landing page with narrative scroll structure, numbered sections (Intake -> Plan -> Build -> Reviews -> Monitor), heavy scroll animations, logo wall social proof, "Coming soon" pattern for Reviews feature
- Arc (https://arc.net) — analyzed 2026-02-16: Clean app landing page with quote hero, direct download buttons, screenshot-driven feature showcase, user tweet testimonials, privacy emphasis
- Raycast (https://raycast.com) — analyzed 2026-02-16: Dark-themed developer tool landing page with interactive keyboard hero, category-tabbed extensions showcase, testimonial grid with real tech industry names, newsletter signup in footer, strong community section
- Superhuman (https://superhuman.com) — analyzed 2026-02-16: Product suite landing page with tab-based product showcase, logo wall social proof, aspirational "Becoming Superhuman" manifesto section, repeated "Get Superhuman" CTA
- Notion (https://notion.so) — analyzed 2026-02-16: Feature-rich landing page with logo wall, bento-grid feature cards, customer stories, trust badges, calculator tool for value proposition, repeated CTA pattern
- Headspace (https://headspace.com) — analyzed 2026-02-16: Mobile app landing page with carousel hero, categorized content showcase, App Store badges in footer, FAQ section, newsletter signup, "Try for $0" CTA pattern
- Calm (https://calm.com) — analyzed 2026-02-16: Mobile app landing page with testimonial carousel, category tabs (Sleep, Stress, Mindfulness), extensive FAQ, minimal hero, "Try Calm for Free" CTA

---
*Feature research for: Premium app landing page (single-page, dark-themed, iOS habit tracker)*
*Researched: 2026-02-16*
