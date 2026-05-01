# Handoff: CCM Waitlist Hero Redesign

## ⚠️ READ THIS FIRST — Do not squash existing work

This handoff updates **the hero section only** of the existing Claude Code Marketing waitlist page. **There is already working ConvertKit form integration in the codebase that MUST be preserved.**

Before changing any markup:

1. **Locate the current ConvertKit form** in the existing codebase (likely an embed script, an iframe, or a custom form posting to ConvertKit's API). Note the form's data attributes, action URL, hidden fields, and event handlers.
2. **Wire the new design's `<form>` markup to that existing integration** — do not replace, recreate, or guess at the ConvertKit setup. The visual input + button are new; the submission plumbing is not.
3. The reference HTML uses a placeholder `onSubmit` that shows "CHECK INBOX ✓" — that is **stub code for the design preview only**. Replace it with the real ConvertKit handler.
4. Anything outside the hero (footer, FAQ, curriculum, OG tags, analytics) should be **left untouched** unless the user asks otherwise.

If unsure whether a piece of code is design vs. integration, ask the user before changing it.

---

## Overview

This is a visual redesign of the hero section on the CCM (Claude Code For Growth Marketing) waitlist page. It replaces the previous hero with a two-column dark "tar" layout featuring a terminal-mock product image on the right.

## About the Design Files

The files in `reference/` are **design references created in HTML** — a prototype showing intended look and behavior, not production code to copy directly. The task is to **recreate this design in the existing codebase's environment** using its established patterns (existing component library, CSS approach, framework conventions). Do not ship the reference HTML as-is.

## Fidelity

**High-fidelity.** All colors, typography, spacing, and component states are final. Recreate pixel-perfectly.

---

## Screens / Views

### Hero Section (single screen)

**Purpose:** Introduce the bootcamp, capture email signups for the waitlist, show a countdown to enrollment.

**Layout:**
- Two-column grid, left ≈ 1.05fr / right ≈ 1fr, gap 80px
- Container max-width 1280px, horizontal padding 64px, vertical padding 36px top / 56px bottom
- Background: solid `#16120E` (tar) with two ambient radial gradients overlaid (see CSS `.ht-glow`)
- Min-height 100vh

**Top nav strip** (above the two-column main):
- Left: orange dot + "CCM" wordmark + dot separator + tagline "CLAUDE CODE FOR GROWTH MARKETING"
- Right: pulsing orange dot + "LIVE — ENROLLMENT OPENS MAY 11"
- 13px uppercase, letter-spacing 0.16em, color linen

**Left column (content):**
1. Eyebrow: "EDITION 01 / 2026 — 2-WEEK LIVE BOOTCAMP" (12px, uppercase, taupe color)
2. **H1 headline:** "MARKETING AGENCIES CHARGE **$5–$15K** TO BUILD WORKFLOWS LIKE THIS" — `$5–$15K` is wrapped in `<span class="ht-money">` and rendered in burnt-orange (`#E8682A`). Size `clamp(44px, 5.6vw, 72px)`, weight 700, line-height 0.98, letter-spacing -0.04em, uppercase, linen color, `text-wrap: balance`.
3. Parenthetical sub-headline: "(and we're going to teach you to build them yourself in 2 weeks)" — italic-feeling but not italicized, 17–20px, taupe, with "yourself in 2 weeks" in orange.
4. Body sub-copy: "On **Monday, May 18th**, we're launching **Claude Code For Growth Marketing**: a 2-week live bootcamp..." — 16px, line-height 1.6, taupe, with bolded fragments in linen.
5. **Email form** — flex row with email input + submit button. **THIS IS WHERE CONVERTKIT WIRES IN.** Visually: input on left (transparent background, taupe placeholder), orange button on right (uppercase, 13px, weight 700, letter-spacing 0.12em). Wrapper has border `1px solid rgba(240,228,208,0.15)`, border-radius 6px, on focus-within border becomes `--orange`.
6. Form fine print: small dot + "Waitlist subscribers unlock **exclusive bonuses**" (12px, taupe, "exclusive bonuses" in orange).
7. **Countdown timer:** "— ENROLLMENT OPENS IN —" label, then DAYS : HOURS : MIN : SEC blocks. Each block: tar-darker chip with linen monospace digits, uppercase 10px label below.

**Right column (visual):**
- A terminal mockup ("ProductMark" component, `variant="terminal"`) showing a fake terminal session with traffic-light header, a green prompt line, a Claude response, and a code block. Max-width 460px, slight upward translation. Pure CSS/HTML — no image asset.

---

## Interactions & Behavior

- **Form submission:** REPLACE the stub handler with the existing ConvertKit integration. On success, swap button label to "CHECK INBOX ✓".
- **Focus states:** Form wrapper border transitions to `--orange` on focus-within. Button hover lifts -1px and brightens (`filter: brightness(1.05)`).
- **Live pulse dot:** 1.4s infinite ease-in-out animation on the nav status indicator.
- **Countdown:** Ticks every second. Target date is `2026-05-11T16:00:00Z` — **adjust to the real enrollment open time before shipping.**
- **Responsive:** Below ~960px the two-column stacks (right column moves below left). Below ~640px the form row stacks vertically. See media queries in `heroes.css`.

## State Management

- `email` (string) — controlled input
- `submitted` (bool) — flips after successful ConvertKit POST; controls button label
- `countdown` (object: `{d, h, m, s}`) — derived from setInterval against the target date

## Design Tokens

```
--orange:      #E8682A   (burnt-orange — primary CTA, headline accent)
--orange-dark: #C8541E
--peach:       #FFB86C   (sandy-peach — secondary accent, glows)
--linen:       #F0E4D0   (cream — primary text on dark)
--taupe:       #B4A690   (warm-taupe — secondary text)
--espresso:    #3A322A
--tar:         #16120E   (page background)
--tar-light:   #1F1A14
--tar-darker:  #0F0C09
```

**Typography:** Space Grotesk (Google Fonts), weights 400/500/600/700. Used everywhere — H1, body, terminal mock, countdown.

**Spacing scale used:** 4, 6, 8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 40, 56, 64, 80 px.

**Border radius:** 4px (small chips/buttons), 5px (button), 6px (form wrapper), 12px (terminal window).

**Shadows:**
- Terminal: `0 30px 60px rgba(0,0,0,0.5), 0 0 80px rgba(232,104,42,0.12)`
- Button hover: `filter: brightness(1.05); transform: translateY(-1px)`

## Assets

No image files. Everything is CSS/HTML, including the terminal mock. The brand "CCM" wordmark is set in Space Grotesk 700.

## Files

In `reference/`:
- `CCM Waitlist.html` — the standalone hero page (entry point — open this to see the design)
- `heroes.jsx` — `HeroTar` component (the variant used here is `variant="baseline"`); also contains unused `HeroLinen`, `HeroPoster`, and `MoneyHeadline` sticker/spotlight variants — **ignore those, ship the baseline only**
- `heroes.css` — all hero styles, scoped under `.ht-*`
- `product-mark.jsx` — the right-column terminal mockup

## Implementation Checklist

- [ ] Find existing ConvertKit integration; document its API surface
- [ ] Recreate hero markup in target framework (preserve semantic structure: header → main → left/right columns)
- [ ] Port `heroes.css` rules under `.ht-*` to project's CSS approach (CSS modules, Tailwind, styled-components, etc.)
- [ ] Wire form to existing ConvertKit handler — do NOT use the stub
- [ ] Pass real enrollment-open timestamp into countdown
- [ ] Verify Space Grotesk loads in production (preconnect + display=swap already set in reference)
- [ ] QA at 1440 / 1280 / 960 / 640 / 375 widths
- [ ] **Do not modify any other section of the page** unless explicitly asked
