# AGENTS.md

React + Vite portfolio for NH / DUO.

---

## Goal
Build a multi-page portfolio with:
- creative developer aesthetic
- cinematic but restrained motion
- editorial layout

Navigation:
- top nav → compact on scroll

---

## Design System

Colors (60-30-10):
- base: #333333
- secondary: #F0F0F0
- accent: blue (#007BFF) or neon orange

Rules:
- avoid harsh contrast
- keep tones slightly muted
- use accent sparingly

Typography:
- sans-serif
- line-height ~1.5
- line length: 60–80ch

Layout:
- 8px spacing system
- fluid sizing (clamp + container queries)

---

## Layout

- prefer editorial, open layouts
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
- manual galleries (no auto-carousel)

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
- scroll-triggered reveals
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
- accent color
- action-driven text

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

Target WCAG AA:
- semantic HTML
- keyboard navigation
- visible focus
- alt text

Avoid:
- unnecessary ARIA
- unsafe motion

---

## Performance

Target Lighthouse 90+:
- optimize images (WebP)
- lazy load
- code split
- avoid re-renders
- keep DOM minimal

---

## Code Rules

Prefer:
- semantic tags (header, nav, main, section, article, footer)

Avoid:
- div-heavy structure
- unnecessary wrappers

- extract reusable components
- keep components small and readable

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
- if unsure → explain

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
- restrained, premium

Avoid:
- bounce
- playful springs (unless requested)
- large scale changes
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
# AGENTS.md

React + Vite portfolio (NH / DUO).

---

## GOAL
- multi-page portfolio
- editorial layout
- restrained cinematic motion

Nav:
- top → compact on scroll

---

## DESIGN

Colors:
- base #333333
- secondary #F0F0F0
- accent #007BFF or neon orange

Rules:
- low contrast extremes
- muted tones
- minimal accent use

Type:
- sans-serif
- lh ~1.5
- 60–80ch

Layout:
- 8px grid
- fluid (clamp, container)

---

## LAYOUT
- editorial > boxed
- no card-heavy UI
- F/Z flow
- allow asymmetry

---

## CASE STUDY
1. Hero
2. Overview
3. Exploration
4. Process
5. Final
6. Impact
7. Learnings

Include:
- progress nav
- scroll transitions
- manual gallery

---

## MOTION

Use:
- Motion = default (UI)
- GSAP = scroll/timeline only

Rules:
- start Motion
- add GSAP if required
- no overlap

Patterns:
- fade + translate
- parallax
- scroll reveal
- stagger
- hover

Avoid:
- excess animation
- autoplay

---

## FORMS
- name, email, message
- inline validation
- clear errors

CTA:
- large
- accent
- action text

---

## TOKENS
- color
- spacing
- type

Consistent + scalable.

---

## BRAND
- NH / DUO
- stylized slash
- accent on slash optional

---

## A11Y
Target AA:
- semantic HTML
- keyboard nav
- focus visible
- alt text

Avoid:
- extra ARIA
- unsafe motion

---

## PERFORMANCE
Target 90+:
- WebP
- lazy load
- code split
- avoid re-renders
- minimal DOM

---

## CODE
Prefer:
- semantic tags

Avoid:
- div-heavy
- wrappers

- reusable components
- small components

---

## REVIEW
Check:
- semantics
- a11y
- responsive
- complexity

No design changes unless required.

---

## CONSTRAINTS
- no build edits
- source only
- minimal changes
- unsure → explain

---

## SELF-REVIEW
- heading order
- mobile overflow
- landmarks
- focus states
- editorial feel
- no boxy UI
- subtle motion

---

## MOTION RULES

Style:
- restrained

Avoid:
- bounce
- springs (unless asked)
- scale jumps
- rotation
- loops
- competing motion

Timing:
- enter 0.4–0.7s
- hover 0.18–0.3s
- overlay 0.25–0.45s

Easing:
- cubic-bezier(0.22,1,0.36,1)

Implementation:
- Motion = components
- GSAP = scroll/timeline
- never share property
- unify easing/duration
- shared variants
- stagger groups
- respect reduced motion
- keep static contrast