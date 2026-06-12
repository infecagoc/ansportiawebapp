# Ansportia — Project Conventions

This file is auto-loaded by Claude Code. Follow these rules when editing the frontend.

## About Ansportia (what it IS — write copy accordingly)

Ansportia is a **global logistics, sourcing and quality-control (QC) partner** —
**NOT** a SaaS trade dashboard/platform/ledger. It:

- **Sources** products and vetted factories/suppliers (e.g. China, India) at the
  right price and quality — from low-range to high-range products.
- **Inspects** them with on-the-ground **quality control** before shipment.
- **Ships** door-to-door across **China, Nepal, Australia, UK, India and USA**,
  helping customers reach markets and build brand value.

Positioning / voice: *"You think, you invest — we source, inspect and ship, and
make your brand valuable."* Speak to founders, brands and importers who want a
trusted partner to source, QC and deliver. Do NOT frame it as an in-house
"platform / workspace / ledger / cross-border trade software." From the house of
**Infeca**.

## Design tokens are SINGLE SOURCE OF TRUTH

All brand colors and typography live as **CSS variables in
[frontend/src/styles/globals.css](frontend/src/styles/globals.css)** (`:root`).
The Tailwind tokens in [frontend/tailwind.config.ts](frontend/tailwind.config.ts)
only *reference* those variables. **Change a value in `globals.css` once and it
cascades to every page/component.** Do not hardcode hex values or raw
`font-weight` numbers in components — use the tokens below.

### Colors

- Defined in `globals.css` as **space-separated RGB channels** (e.g.
  `--primary: 168 139 88;`), NOT hex. The channel format is required so Tailwind
  opacity modifiers work, e.g. `text-cream/70`, `ring-ink/10`.
- Tailwind tokens reference them via `rgb(var(--x) / <alpha-value>)`.
- Semantic roles: `--primary` (petrol blue, `#0E1D24`), `--secondary`
  (maroon, `#660C20`), `--tertiary` (gold, `#A88B58`), `--quaternary`
  (creamy, `#FAF6F0`). Named scales: `--ink-*`, `--gold-*`, `--maroon-*`,
  `--cream`. Canvas/text: `--background`, `--foreground`.
- Use classes like `bg-cream`, `text-gold`, `bg-primary`, `text-secondary`.
- To recolor a hex literal `#RRGGBB`, convert to channels: `R G B`.

### Typography

- **Global font = Google Sans Flex** (variable, weight 1..1000) — used across the
  WHOLE portal (body + headings), not just headings. Loaded via `<link>` in
  [frontend/src/pages/_document.tsx](frontend/src/pages/_document.tsx) (it is NOT
  in `next/font` for this Next version). Set as the default on `body` and as the
  first entry of Tailwind `font-sans`. Do **not** use Righteous — it was removed.
- **Inter** is loaded only as a fallback (if Google Sans Flex fails to load).
- **No italics.** Do not use the `italic` class or `font-style: italic` anywhere —
  accent words use `text-gold-gradient`, not italics.
- Family token: `--font-brand` → Tailwind families `font-brand`, `font-heading`,
  and `font-serif` (alias). Headings use `font-serif`/`font-heading`.
- **Weight tokens** (`--brand-font-*` in `globals.css`) → Tailwind utilities.
  Always use these instead of raw Tailwind weights:

  | Utility class          | CSS var                  | Weight |
  |------------------------|--------------------------|--------|
  | `font-brand-thin`      | `--brand-font-thin`      | 100    |
  | `font-brand-extralight`| `--brand-font-extralight`| 200    |
  | `font-brand-light`     | `--brand-font-light`     | 300    |
  | `font-brand-normal`    | `--brand-font-normal`    | 400    |
  | `font-brand-medium`    | `--brand-font-medium`    | 500    |
  | `font-brand-semibold`  | `--brand-font-semibold`  | 600    |
  | `font-brand-bold`      | `--brand-font-bold`      | 700    |
  | `font-brand-extrabold` | `--brand-font-extrabold` | 800    |
  | `font-brand-black`     | `--brand-font-black`     | 900    |

  Rule: use `font-brand-*`, NOT plain `font-bold`/`font-medium`/etc.
- Google Sans Flex axes (`slnt/wdth/GRAD/ROND`) are applied via
  `--brand-font-variation` to `.font-brand`, `.font-heading`, `.font-serif`.

### Heading scale (use SAME scale everywhere — premium consistency)

Defined once in [globals.css](frontend/src/styles/globals.css) `@layer base`, so
**semantic tags inherit the scale automatically site-wide**. Prefer using
`<h1>…<h6>` tags and let them inherit; only add a size utility for a genuine
one-off. All headings use the brand font (Google Sans Flex).

| Tag  | Size (responsive)              | Weight        | Use                         |
|------|--------------------------------|---------------|-----------------------------|
| `h1` | `text-5xl → 6xl → 7xl`         | brand-bold    | page / hero title           |
| `h2` | `text-3xl → 4xl → 5xl`         | brand-bold    | section title               |
| `h3` | `text-2xl → 3xl`               | brand-semibold| sub-section                 |
| `h4` | `text-xl → 2xl`                | brand-semibold| card / block title          |
| `h5` | `text-lg`                      | brand-medium  | minor heading               |
| `h6` | `text-xs`, uppercase `0.25em`  | brand-semibold| eyebrow / label             |

Body copy stays Inter-fallback brand font at default sizes; emphasis via the
`font-brand-*` weight tokens, never raw `font-bold`.

## Smooth scrolling (Lenis)

The site uses **Lenis** for smooth scrolling site-wide (all portals), mounted
once at the app root in [frontend/src/pages/_app.tsx](frontend/src/pages/_app.tsx)
via `<ReactLenis root options={{ lerp: 0.1, smoothWheel: true }}>`.
Use `lerp` alone (lower = smoother, higher = snappier) — do NOT also set
`duration`, since combining them makes scrolling feel laggy. The required Lenis classes
(`html.lenis`, `.lenis-smooth`, `.lenis-stopped`, …) live in
[globals.css](frontend/src/styles/globals.css) so every page behaves the same.

- To control scrolling from a component, use the hook: `const lenis = useLenis()`
  from `lenis/react`, then `lenis?.stop()` / `lenis?.start()` (e.g. the intro
  lock in [LandingPage.tsx](frontend/src/components/landing/LandingPage.tsx) and
  the menu drawer in [Header.tsx](frontend/src/components/Header.tsx)).
- To smooth-scroll to a target programmatically: `lenis?.scrollTo('#id')`.
- Opt a scrollable element OUT of Lenis with `data-lenis-prevent`.
- Framer Motion's `useScroll` still works (Lenis emits native scroll events) —
  that's how the header's hide/show is driven.

## Dev server gotcha

Editing **`tailwind.config.ts`** (or any config) is NOT always hot-reloaded by
Next dev. After config changes, **restart the dev server and clear `.next`**:

```powershell
# stop the process on port 3600, then:
Remove-Item -Recurse -Force frontend/.next
# restart:  cd frontend; npm run dev   (serves on http://localhost:3600)
```

Editing `globals.css` (CSS variables) hot-reloads fine — just hard-refresh the
browser (Ctrl+Shift+R). The dev server runs on **port 3600**.
