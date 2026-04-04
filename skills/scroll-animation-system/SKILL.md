# Scroll Animation System — GSAP + Framer Motion + Lenis Patterns

## Purpose

Scroll animations should feel like a story unfolding, not objects randomly bouncing around. This skill encodes the staged scrollytelling animation system used on ClawOps — sequential reveals, scroll-linked progress, and performance-first implementation.

---

## The Core Principle: Staged Sequences Beat Chaotic Motion

Random scroll-triggered animations — elements flying in from random directions, scaling unpredictably, spinning — feel unprofessional and distract from the content. Every animation should follow a **staged sequence**:

```
Section enters view → Element A reveals → Element B reveals → Element C reveals → Sequence complete
```

This is how a story unfolds. The visitor follows the narrative naturally.

---

## The Three Animation Patterns

### Pattern 1: Sequential Reveal (use most often)
Elements within a section reveal one by one, top to bottom or left to right.

```tsx
// Framer Motion — staggered reveal
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }
}
```

**Rule:** Stagger delay between items: 0.08s-0.15s. Less than 0.08s feels like they appear simultaneously. More than 0.15s feels slow.

### Pattern 2: Scroll-Linked Progress (use for hero scrollytelling)
Animation state is directly tied to scroll position, not a trigger threshold.

```tsx
// Framer Motion — scroll-linked transform
const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end start"]
})

const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1, 0, 0])
const y = useTransform(scrollYProgress, [0, 0.5], [0, -50])
const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95])
```

**Rule:** Map scroll progress to a meaningful narrative transition. 0-30% = Phase 1 visible. 30-70% = Phase 2 visible. 70-100% = fade out + parallax.

### Pattern 3: Parallax Depth (use sparingly)
Background elements move at a different speed than foreground, creating depth.

```tsx
// Parallax: background moves slower than scroll
const y = useTransform(scrollYProgress, [0, 1], [0, -100])
```

**Rule:** Parallax offset should be subtle: -30px to -100px max. Exceeding this breaks the visual connection between layers. Never parallax text — only background shapes or images.

---

## GSAP vs Framer Motion: When to Use Which

### Use Framer Motion (React projects)
- Scroll-triggered reveals with `useScroll` + `useTransform`
- Staggered list animations
- Hover state animations
- Page transitions
- Anything tied to React component lifecycle

### Use GSAP (complex timelines, non-React)
- Multi-step timelines that need frame-level control
- ScrollTrigger for complex scroll-linked sequences
- SplitText animations (character-by-character reveals)
- Complex scrub animations where Framer Motion is insufficient

### Use CSS Animations (simple reveals)
- Single-element fade-in on scroll (use Intersection Observer)
- Simple transforms (scale, rotate on hover)
- Loading states

**Rule:** For ClawOps-style sites, Framer Motion is the primary tool. GSAP is reserved for the hero scrollytelling timeline only.

---

## GSAP Hero Scrollytelling Pattern

```javascript
// gsap.config.js — hero timeline
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: 1,  // 1 second of scroll = 1 second of animation
  }
})

heroTl
  .from('.hero-headline', { opacity: 0, y: 40, duration: 0.3 })
  .from('.hero-subheadline', { opacity: 0, y: 30, duration: 0.3 }, '-=0.2')
  .from('.hero-cta', { opacity: 0, y: 20, duration: 0.2 }, '-=0.15')
  .from('.hero-stat', { opacity: 0, scale: 0.9, duration: 0.2 }, '+=0.1')
```

**Rule:** Scrub value of 1 is smoothest. Lower values (0.5) feel laggy. Higher values (2+) feel disconnected from scroll.

---

## Lenis Smooth Scroll Integration

Lenis provides smooth scroll interpolation that makes scroll-linked animations feel premium. Without it, scroll animations can feel jerky.

```javascript
// lenis.config.js
import Lenis from 'lenis'

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
})

// Connect to GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

**Rule:** Lenis duration of 1.0-1.4 feels natural. Below 0.8 feels too fast. Above 1.6 feels floaty.

---

## Performance Guards

### The Golden Rules

1. **Always clean up animations on unmount**
```tsx
useEffect(() => {
  return () => ctx.revert()  // Framer Motion cleanup
}, [])
```

2. **Use `will-change` only during animation**
```css
.animating-element {
  will-change: transform, opacity;
  /* removed automatically after animation completes */
}
```

3. **Avoid animating layout properties (width, height, margin)**
Use `transform` (translate, scale, rotate, opacity) only. Layout animations trigger reflow, which is expensive.

4. **Limit simultaneous animated elements to 20 max**
More than 20 animated elements on screen = potential frame drops. Use intersection observer to pause off-screen animations.

5. **RAF cleanup on unmount**
```javascript
// GSAP
ScrollTrigger.getAll().forEach(t => t.kill())

// Framer Motion
// useMotionValueEvent, useScroll automatically clean up
```

6. **Lazy load heavy animation components**
```tsx
const HeroCanvas = dynamic(() => import('../components/HeroCanvas'), {
  ssr: false,
  loading: () => <div className="hero-placeholder" />
})
```

---

## Easing Reference

| Name | Curve | Use Case |
|---|---|---|
| `easeOut` | Fast start, slow end | Elements entering (most common) |
| `easeIn` | Slow start, fast end | Elements exiting |
| `easeInOut` | Slow both ends | Elements transitioning between states |
| `linear` | Constant speed | Never for scroll animations. Use for loading bars only |

```javascript
// ClawOps standard easing
const standardEasing = [0.25, 0.1, 0.25, 1]  // ease-out cubic bezier
const smoothEasing = [0.65, 0, 0.35, 1]        // ease-in-out
```

---

## Scrollytelling Example: Pricing Section Reveal

```tsx
// Framer Motion — staggered pricing cards
function PricingSection() {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.12 } }
      }}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
    >
      <motion.h2 variants={fadeUp}>Simple, transparent pricing</motion.h2>
      <motion.p variants={fadeUp}>No hidden fees. Cancel anytime.</motion.p>
      <div className="pricing-grid">
        {plans.map(plan => (
          <motion.div key={plan.id} variants={fadeUp} className="glass-card">
            {/* card content */}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
}
```

---

## Rules Summary

### DO
- Use staged sequences: one element reveals, then the next
- Tie hero animations to scroll progress, not arbitrary timeouts
- Use Lenis for smooth scroll interpolation
- Clean up animations on unmount (Framer: `ctx.revert()`, GSAP: `t.kill()`)
- Animate only `transform` and `opacity` — never layout properties
- Set `viewport={{ once: true }}` for section reveals (animate once, not every scroll)

### DON'T
- Use random directions for scroll reveals (always follow visual hierarchy)
- Animate `width`, `height`, `margin`, or `padding`
- Leave `will-change` on non-animating elements
- Use `linear` easing for scroll animations
- Load Three.js/WebGL scenes in the animation-critical path
- Animate more than 20 elements simultaneously on screen
