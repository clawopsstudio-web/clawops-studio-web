# Dark Premium UX — Cyan/Violet Glow System, Glass UI, Readability

## Purpose

Dark premium sites fail in two ways: they are either too flat (boring dark gray with no personality) or too loud (rainbow glows destroying readability). This skill encodes the balanced dark aesthetic from ClawOps — a cyan/violet glow system that feels premium without sacrificing readability.

---

## The Glow Paradox

Glow makes dark sites feel alive and premium. But too much glow turns text into a painful blur. The rule:

**Glow exists to highlight, not to illuminate.**

Glow signals: "this element is important." It does not replace light sources. It accents them. Every glow element must be paired with text that has sufficient contrast against the background behind it, not the glow itself.

---

## Design Token Reference (ClawOps Values)

Use these as the baseline. All values derived from the ClawOps design system.

### Colors
```
--bg-base:        #050511        // Deep dark base — the page background
--bg-surface:     #0a0a1a        // Slightly lighter — card backgrounds
--bg-elevated:    #0f0f25        // Elevated surfaces — modals, dropdowns
--border-subtle:  rgba(255,255,255,0.06)  // Very subtle borders
--border-active:  rgba(255,255,255,0.12)   // Active/hover borders

--cyan-primary:   #22d3ee        // Primary accent — CTAs, key highlights
--cyan-glow:      rgba(34,211,238,0.15)   // Glow for cyan elements
--violet-primary: #a78bfa        // Secondary accent — tags, badges
--violet-glow:    rgba(167,139,250,0.15)  // Glow for violet elements

--text-primary:   #f8fafc        // Main body text (Slate-50)
--text-secondary: #94a3b8        // Secondary text (Slate-400)
--text-muted:     #475569        // Muted text (Slate-600)
```

### Spacing (8px base unit)
```
--space-1:  4px    --space-8:  32px
--space-2:  8px    --space-12: 48px
--space-3:  12px   --space-16: 64px
--space-4:  16px   --space-24: 96px
--space-6:  24px   --space-32: 128px
```

### Typography
```
--font-display: Inter, system-ui, sans-serif
--font-body:    Inter, system-ui, sans-serif
--text-xs:   0.75rem / 1rem
--text-sm:   0.875rem / 1.25rem
--text-base: 1rem / 1.5rem
--text-lg:   1.125rem / 1.75rem
--text-xl:   1.25rem / 1.75rem
--text-2xl:  1.5rem / 2rem
--text-4xl:  2.25rem / 2.5rem
--text-6xl:  3.75rem / 1.1
```

---

## Glass Card Pattern

Glass UI is the primary card pattern for dark premium sites. The formula:

```css
.glass-card {
  background: rgba(10, 10, 26, 0.6);   /* Semi-transparent bg-surface */
  backdrop-filter: blur(16px);           /* 12-20px blur */
  -webkit-backdrop-filter: blur(16px);  /* Safari */
  border: 1px solid rgba(255, 255, 255, 0.08);  /* Thin, subtle border */
  border-radius: 16px;                 /* 12-16px radius */
}

/* With glow (use sparingly) */
.glass-card-glow {
  box-shadow: 0 0 40px rgba(34, 211, 238, 0.08),
              0 0 80px rgba(167, 139, 250, 0.05);
}
```

**Rule:** Glass cards with blur > 20px begin to look smeared on lower-end devices. 12-16px is the safe range. On mobile, reduce blur to 8px or remove it entirely.

---

## Glow Containment Strategy

### The Problem: Rainbow Overload
When every element glows — cards, buttons, icons, borders, backgrounds — the page becomes an unreadable neon soup. The visitor's eye has no hierarchy to follow.

### The Solution: Glow Scarcity
Only 1-2 element types should glow at a time. Pick:

1. **Primary glow (cyan):** Reserved for the single most important action on the page — usually the primary CTA button
2. **Secondary glow (violet):** Reserved for badges, tags, or status indicators

Everything else uses `--border-subtle` at most.

### Containment Rules
- A glowing element should glow against a dark background, not against another glowing element
- Never place two glowing cards adjacent to each other
- Glow radius should be proportional to element size: button glow radius 20-30px, card glow radius 40-60px
- Background glow effects (like a radial gradient on the page bg) should be very subtle: opacity 0.05-0.1

**Example (ClawOps):** The primary CTA button has a cyan glow. The FAQ accordion items have subtle border glow on hover. The pricing cards have no glow — they rely on glass + border. This creates clear hierarchy.

---

## Gradient vs Solid Text

| Element | Type | Rule |
|---|---|---|
| H1 headline | Gradient (cyan→violet) | Only for the primary headline |
| H2 section headers | Solid text-primary | Gradient is overkill on sub-headers |
| Body text | Solid text-secondary | Never gradient |
| Captions / labels | Solid text-muted | Never gradient |
| CTA button text | Solid white | Never gradient on text inside buttons |

```css
.headline-gradient {
  background: linear-gradient(135deg, #22d3ee 0%, #a78bfa 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Dark Background Rules

### Contrast Ratios
- Body text on `--bg-base`: use `--text-primary` (f8fafc) — ratio ~15:1
- Secondary text on `--bg-base`: use `--text-secondary` (94a3b8) — ratio ~5:1
- Text on glass cards: same rules, glass is transparent so bg-base shows through

### Layering (back to front)
```
Layer 0: Page background    — --bg-base (#050511)
Layer 1: Section bg        — --bg-surface (#0a0a1a) or transparent
Layer 2: Glass cards       — rgba(10,10,26,0.6) + blur
Layer 3: Glow elements     — 1-2 per section max
Layer 4: Text overlays     — text-primary or text-secondary
```

### Background Gradient Usage
Use radial gradients to create depth, not linear gradients that look like backgrounds:

```css
.hero-bg {
  background: radial-gradient(ellipse 80% 50% at 50% 0%,
    rgba(34, 211, 238, 0.12) 0%,
    rgba(167, 139, 250, 0.06) 40%,
    transparent 70%);
}
```

This creates a subtle glow at the top of the hero without competing with the headline.

---

## Rules Summary

### DO
- Use glass cards with `rgba + blur + thin border` for content containers
- Reserve glow for 1-2 element types per page section
- Apply radial gradients as background depth effects (very subtle, 0.05-0.1 opacity)
- Use gradient text only for the primary H1 headline
- Maintain 4.5:1 contrast ratio for body text
- Layer: bg-base → glass → glow → text

### DON'T
- Glow every card and button (rainbow overload)
- Place glowing elements adjacent to each other
- Use gradient text for body, captions, or sub-headers
- Use linear gradients as full-page backgrounds
- Exceed blur > 20px on glass cards (performance + aesthetics)
- Use bright colors (pure white, pure cyan) as large area fills — they create glare
