# AGENTS.md

This is a React + Vite portfolio website for NH / DUO.

---

## Project Goal
Build a multi-page portfolio combining:
- creative developer aesthetic
- high-end cinematic interaction
- editorial layout composition

Navigation:
- top navigation bar
- transforms into compact strip after hero scroll

---

## Design System

### Color Palette (60-30-10)
- Base: Charcoal (#333333)
- Secondary: Light Gray / White (#F0F0F0)
- Accent: Electric Blue (#007BFF) or Neon Orange

Guidelines:
- Avoid harsh black/white contrast
- Keep tones refined and slightly muted
- Use accent color sparingly for focus

---

### Typography & Grid
- Sans-serif for all text
- Line height ~1.5
- Line length: 60–80 characters
- 8px spacing system
- Use clamp() and container queries for fluid scaling

---

## Layout & Composition

- Prefer editorial, open layouts over boxed UI
- Avoid dashboard/card-heavy design
- Use F-pattern and Z-pattern composition
- Allow asymmetry where beneficial

### Navigation
- Top bar
- Transforms on scroll (size, opacity, background)

---

## Case Study Structure

Each case study should follow:

1. Hero (title + cover)
2. Project Overview (role, tools, timeline)
3. Exploration / Discovery
4. Design Process
5. Final Design
6. Impact
7. Learnings

Include:
- section progress navigation
- scroll-based transitions
- gallery views (no auto carousels)

---

## Interaction & Motion

- Moderate motion by default
- Occasional high-impact cinematic sequences

Use:
- GSAP → complex timelines
- Motion → component transitions

Patterns:
- fade-ins
- parallax
- scroll-triggered transitions
- hover states for all interactive elements

Avoid:
- excessive or distracting animation
- autoplay-heavy UI

---

## Forms & CTA

- Minimal form (name, email, message)
- Inline validation
- Clear error states

CTA:
- large
- accent-colored
- action-driven ("Let's talk", "Start project")

---

## Design Tokens

- Use tokens for:
  - colors
  - spacing
  - typography

- Keep system scalable and consistent

---

## Branding

- Monogram: NH / DUO
- Slash visually fuses H and D
- Accent color may be used for slash

---

## Accessibility

- Aim for WCAG AA
- Maintain:
  - semantic HTML
  - keyboard navigation
  - visible focus states
  - proper alt text

Avoid:
- unnecessary ARIA
- inaccessible motion

---

## Performance

- Target Lighthouse 90+
- Optimize:
  - images (WebP)
  - lazy loading
  - code splitting
- Avoid unnecessary re-renders
- Keep DOM clean

---

## Code Guidelines

- Prefer semantic HTML:
  header, nav, main, section, article, footer

- Avoid:
  - div-heavy structures
  - redundant wrappers

- Extract reusable components when needed
- Keep components readable and focused

---

## Review Behavior

When reviewing or editing:

- prioritize semantics
- check accessibility
- check responsiveness (mobile + widescreen)
- reduce complexity
- preserve visual design unless necessary

---

## Constraints

- Do not edit deployment output (gh-pages)
- Work only in source files
- Prefer minimal, safe changes
- If unsure → explain instead of guessing

---

## Self-review focus for this project

During self-review, prioritize:

- semantic heading hierarchy (h1 → h2 → h3 consistency)
- mobile overflow and text wrapping issues
- proper use of landmarks (header, nav, main, section, footer)
- visible and consistent focus-visible states
- preserving the dark, minimal, editorial design direction
- avoiding unnecessary wrappers or overly boxy/card-heavy layouts
- ensuring motion remains subtle, intentional, and performance-friendly

---

## Motion consistency rules

Motion should feel restrained, premium, and editorial.

Prefer:
- fade + slight translate
- subtle staggered reveals
- soft opacity transitions
- minimal hover lift
- smooth navbar/menu transitions
- motion that supports hierarchy, not decoration

Avoid:
- bounce
- springy playful motion unless explicitly requested
- large scale changes
- dramatic rotations
- long looping decorative animations
- multiple competing animations in the same viewport

Timing:
- entrance transitions: ~0.4s to 0.7s
- hover transitions: ~0.18s to 0.3s
- menu/overlay transitions: ~0.25s to 0.45s

Easing:
- prefer smooth, refined easing such as cubic-bezier(0.22, 1, 0.36, 1)

Implementation:
- prefer shared Motion variants over repeated inline animation objects
- use staggered children for grouped reveals
- preserve reduced-motion accessibility where appropriate
- do not animate everything; leave enough static space for contrast