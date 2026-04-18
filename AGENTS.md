# AGENTS.md

This is a React + Vite portfolio website.

## Project goals
- Preserve the premium, dark, editorial design direction.
- Prefer minimal, high-signal changes over broad rewrites.
- Keep the site performant, accessible, and maintainable.

## Design principles
- Avoid boxy dashboard-like layouts unless explicitly requested.
- Prefer composition, spacing, and typography over heavy card framing.
- Keep accents restrained and intentional.
- Preserve the visual identity of `NH / DUO`.

## Frontend standards
- Prefer semantic HTML:
  - header, nav, main, section, article, footer
- Maintain clean heading hierarchy.
- Use buttons for actions and links for navigation.
- Avoid unnecessary wrapper divs.
- Favor native browser behavior over custom JS where possible.
- Keep responsive behavior strong on widescreen and mobile.

## Accessibility
- Prefer accessible, semantic markup.
- Preserve keyboard accessibility and visible focus states.
- Avoid unnecessary ARIA usage.
- Do not introduce inaccessible motion patterns.

## Code style
- Keep components readable and moderately small.
- Extract repeated patterns when clearly beneficial.
- Do not introduce large dependencies for small problems.
- Do not change visual design unless requested or required.

## Review guidelines
When reviewing this repo:
- flag semantic HTML issues
- flag accessibility risks
- flag responsiveness issues
- flag performance issues
- suggest minimal, safe fixes first

## Constraints
- Do not edit deployment output branches.
- Work in source files only.
- If a change is risky, explain before applying.