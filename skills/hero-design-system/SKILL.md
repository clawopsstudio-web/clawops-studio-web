# Hero Design System — Cinematic Scrollytelling for Dark Premium Sites

## Purpose

A hero is not a "header with a button." It is a staged cinematic experience that tells a four-phase story in the first 5 seconds of attention. This skill encodes the scrollytelling hero pattern used on ClawOps — product-specific, not generic.

---

## The Fundamental Rule

**One dominant visual system per hero.** Not three competing motifs.

Every competing visual (3D model, particle field, video background, illustrated character, stock photo) fragments the visitor's attention. The hero communicates one thing: what this product will do for you. Everything else is noise.

**Reference:** The Aura showcase on ClawOps uses scrollytelling — text layers that reveal in sequence, tied to scroll position — not a game-like interactive experience. This is the correct mode.

---

## The Four-Phase Narrative

The hero must communicate in order:

### Phase 1: MESSAGE — "The Outcome"
- **Headline:** The result the visitor will get, stated in concrete terms
- **Subheadline:** Expand the headline. Add context, specificity, urgency
- **Visual:** Abstract or minimal. The text is the hero
- **Duration:** Above-the-fold, loads instantly with page

### Phase 2: DELEGATION — "The Mechanism"
- As the visitor scrolls slightly past the hero fold, a subtle transition communicates how it works
- A representative element (agent card, dashboard frame, task list) that implies process
- **DO NOT:** Show a full product screenshot here. That comes later in the page

### Phase 3: ACTION — "The Ask"
- **CTA 1 (Primary):** The conversion action. "Get Started", "Book a Demo", "Start Free"
- **CTA 2 (Secondary):** A softer entry point. "See How It Works", "View Pricing"
- **Placement:** CTA appears as the visitor begins to scroll past Phase 1

### Phase 4: RESULT — "The Proof"
- **Trust signal:** A single compelling stat or logo, positioned at the bottom of the hero
- **Format:** "Trusted by 50+ agencies" or "Saves 20 hours/week per employee"
- **Rule:** One proof point. Not a carousel. Not a grid.

---

## Phase-Reactive Elements

As scroll progresses through the hero, elements respond to depth:

| Scroll Depth | Element | Behavior |
|---|---|---|
| 0% | Headline + subheadline | Fully visible, high opacity |
| 20% | Primary CTA | Fades in with 200ms delay |
| 40% | Background element | Subtle shift: blur increases or vignette intensifies |
| 60% | Trust signal / stat | Fades in |
| 80% | Next section teaser | Slight parallax offset downward |

**Example (ClawOps):** The hero badge ("AI Employee as a Service") fades in at 200ms delay. The background vignette intensifies as the visitor scrolls. Team status indicators appear at specific scroll thresholds. All transitions use `ease-out` with 300-400ms duration. Framer Motion handles the orchestration.

---

## Readability Hierarchy

Dark heroes fail when text competes with glowing backgrounds. Enforce these rules:

1. **Vignette overlay:** Apply a radial gradient from `transparent` at center to `rgba(0,0,0,0.6-0.8)` at edges. Creates natural focus on center text.
2. **Text mask:** Use a subtle gradient mask behind the headline to cut through background glow
3. **Contrast ratios:** Body text minimum 4.5:1 on dark backgrounds. Headlines can go to 3:1 if large enough (18px+).
4. **Gradient text:** Use `linear-gradient` text (e.g., cyan to violet) for headlines only. Never for body or captions.
5. **Size hierarchy:** Headline minimum 48px mobile / 72px desktop. Subheadline 20-24px.

---

## When to Add What

### Add Immediately (above the fold)
- Headline + subheadline
- Primary CTA button
- Single trust stat

### Add at Phase 2 (post-hero scroll)
- Secondary CTA
- Brief feature bullets (3 max)
- "How it works" visual hint

### Add at Phase 3 (deep scroll, near section boundary)
- Team/status indicators
- Background visual elements (canvas, 3D)
- Scroll progress indicator

### Never Add in Hero
- Full pricing table
- Multi-step form
- Feature comparison grid
- Carousel of testimonials
- Blog post previews
- Full product dashboard screenshot
- Multiple competing visual effects

---

## Performance Rules

**No heavy WebGL in the hero.** This is non-negotiable.

- WebGL canvas in the hero viewport kills LCP (Largest Contentful Paint). Target LCP < 2.5s.
- Use CSS-driven animations as the primary tool. Framer Motion for React projects.
- If a 3D element is needed: load it lazily, never in the initial viewport render path.
- Background elements should be CSS gradients or lightweight SVG, not Canvas/WebGL particle systems.
- Use `will-change` sparingly and only on elements actively animating.

**Preferred stack:** CSS animations + Framer Motion (React) + Lenis (smooth scroll). GSAP only for complex timeline sequences (see `scroll-animation-system` skill).

---

## Stack-Specific Implementation

### Next.js + Framer Motion
```tsx
// Hero with scroll-linked phase transitions
const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] })

const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])

return (
  <motion.div ref={heroRef} style={{ opacity, scale }}>
    <h1 className="hero-headline">{headline}</h1>
    <motion.div className="hero-cta" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} />
  </motion.div>
)
```

### CSS-only fallback
```css
.hero-badge {
  opacity: 0;
  animation: fadeIn 0.4s ease-out 0.2s forwards;
}
.hero-cta {
  opacity: 0;
  animation: fadeIn 0.4s ease-out 0.4s forwards;
}
@keyframes fadeIn {
  to { opacity: 1; }
}
```

---

## Rules Summary

### DO
- One dominant visual system (text + subtle glow > competing elements)
- Outcome-first headline, not feature-first
- Scroll-linked phase transitions for cinematic feel
- Vignette overlay to protect text readability
- Load the hero with zero heavy assets in the critical path

### DON'T
- Add WebGL/Canvas/Three.js to the hero viewport
- Use a carousel of testimonials in the hero
- Show a full product screenshot in the hero
- Make it game-like (ClawOps is scrollytelling, not interactive)
- Use gradient text for body copy or captions
- Add more than 3 CTAs (creates choice paralysis)
