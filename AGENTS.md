# AGENTS.md

React + Vite portfolio (NH / DUO).

---

## Goal
Multi-page portfolio with:
- creative developer aesthetic
- cinematic but restrained motion
- editorial layout

Navigation:
- top nav → compacts on scroll

---

## Design System

Colors (60-30-10):
- base: #333333
- secondary: #F0F0F0

Rules:
- low contrast extremes
- muted tones
- minimal accent use

Typography:
- sans-serif
- line-height ~1.5
- line length: 60–80ch

Layout:
- 8px spacing system
- fluid sizing (clamp + container queries)

---

## Layout

- editorial, open layouts
- avoid card-heavy UI
- use F/Z pattern
- allow asymmetry when useful

---

## Case Study Structure

1. Hero
2. Overview (role, tools, timeline)
3. Exploration
4. Process
5. Final
6. Impact
7. Learnings

Include:
- section progress nav
- scroll transitions
- manual galleries

---

## Motion

Default:
- Motion → UI transitions
- GSAP → scroll + timelines only

Rules:
- start with Motion
- add GSAP only when needed
- do not overlap responsibilities

Patterns:
- fade + slight translate
- parallax
- scroll reveal
- staggered groups
- hover states

Avoid:
- excessive animation
- autoplay-heavy UI

---

## Forms

- fields: name, email, message
- inline validation
- clear errors

CTA:
- large
- accent
- action text

---

## Tokens

Use tokens for:
- color
- spacing
- typography

Keep consistent and scalable.

---

## Branding

- monogram: NH / DUO
- stylized slash between letters
- accent may highlight slash

---

## Accessibility

Target AA:
- semantic HTML
- keyboard navigation
- visible focus
- alt text

Avoid:
- unnecessary ARIA
- unsafe motion

---

## Performance

Target 90+:
- optimize images (WebP)
- lazy load
- code split
- avoid re-renders
- keep DOM minimal

---

## Code Rules

Prefer:
- semantic tags

Avoid:
- div-heavy
- unnecessary wrappers

- reusable components
- small, readable components

---

## Review

Check:
- semantics
- accessibility
- responsiveness
- complexity

Do not change design unless required.

---

## Constraints

- do not edit build output
- edit source only
- keep changes minimal
- unsure → explain

---

## Self-Review

- heading hierarchy (h1→h3)
- mobile overflow
- proper landmarks
- consistent focus states
- maintain editorial style
- avoid boxy layouts
- motion remains subtle

---

## Motion Rules

Style:
- restrained

Avoid:
- bounce
- playful springs (unless requested)
- scale jumps
- rotations
- looping decoration
- competing animations

Timing:
- enter: 0.4–0.7s
- hover: 0.18–0.3s
- overlays: 0.25–0.45s

Easing:
- cubic-bezier(0.22, 1, 0.36, 1)

Implementation:
- Motion → components
- GSAP → scroll/timelines
- never animate same property with both
- keep easing + duration consistent
- use shared Motion variants
- use stagger for groups
- respect reduced motion
- keep static contrast