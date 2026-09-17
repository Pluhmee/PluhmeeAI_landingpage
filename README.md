# Pluhmme AI — Animated Landing Page

A dark, lime-accented product landing page for a fictional ambient-robotics brand. Built to feel like a hand-crafted Framer site: smooth scroll, masked text reveals, pinned horizontal scroll, magnetic buttons and a custom cursor.

## Stack

- **React 19 + TypeScript** (Vite)
- **Framer Motion** — scroll-linked parallax, masked reveals, layout/exit animations, springs
- **GSAP + ScrollTrigger** — pinned horizontal rail with scrubbed card tilt
- **Lenis** — smooth scroll, synced to the GSAP ticker so ScrollTrigger stays in lockstep

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle to dist/
```

## Animation inventory

| Section | Technique |
|---|---|
| Loader | easeOutExpo counter to 100, column wipe + panel slide-out on exit |
| Cursor | Spring-followed ring with `data-cursor` label swap, difference blend |
| Nav | Hide-on-scroll-down, blur-on-scroll, roll-over links, clip-path fullscreen menu |
| Hero | Scroll parallax on image, pointer parallax on chips, per-line masked text, corner-radius morph, animated SVG dial |
| Marquee | Scroll-velocity-driven horizontal drift via spring |
| About | Per-word opacity + blur tied to scroll progress |
| Capabilities | GSAP pinned horizontal scroll, `containerAnimation` card tilt, scrub progress bar |
| System | Sticky visual with scroll-driven rotation/scale/hue, staggered step reveals |
| Showcase | Hover-follow image preview with AnimatePresence, row fill wipe |
| FAQ | Height-auto accordion with rotating plus/minus |
| CTA | Scale + radius morph on scroll, animated aurora, form → success state |
| Footer | Outlined mega-wordmark reveal |

## Notes

- Fully responsive: the GSAP pin disables under 900px and the rail becomes a snap-scroll carousel.
- `prefers-reduced-motion` is respected globally.
- Product renders in `/public` are AI-generated placeholders — swap them for real assets.
