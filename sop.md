# Rouvin — UI/UX Standard Operating Procedure

**Design System:** Rouvin DS v1.0
**Applies to:** rouvin.com (marketing) and the Rouvin Console (authenticated web app)
**Status:** Baseline — approved for build
**Owner:** Design Lead · **Contributors:** Frontend Lead, Product, QA, Brand
**Review cadence:** Minor review every 6 weeks · Major review every 2 quarters
**Last updated:** 25 August 2026

---

## 0. How to use this document

This is a working SOP, not a mood board. Anything written as **MUST** is a hard rule and a valid reason to reject a design review or a pull request. **SHOULD** is the default that requires a written justification to break. **MAY** is at the designer's discretion.

The companion file `rouvin-design-system.html` is the visual source of truth. Open it in a browser to see every token, icon, and component rendered live. When this document and the HTML disagree, the HTML wins for *appearance* and this document wins for *process*.

---

## 1. Purpose and scope

### 1.1 Purpose
To give designers, engineers, and reviewers one shared, testable definition of what "a Rouvin screen" looks like and how it behaves, so that:

- Any two people building different screens arrive at the same result.
- Accessibility and responsive quality are built in, not retrofitted.
- Review time is spent on product decisions, not on re-litigating spacing and colour.

### 1.2 Product assumption
This SOP is written for **Rouvin as a logistics and fleet-operations platform** — routing, dispatch, shipment tracking, and fleet analytics, sold B2B. That assumption comes from the mark itself: the "R" resolves into a directional chevron and a road-like counter, and the wordmark's italic pushes forward.

If the product is something else, the *system* (tokens, grid, process, accessibility rules) still holds. Only §2.4 (voice) and §9 (component inventory) need adjusting. Do not silently repurpose — log a change request under §16.

### 1.3 Primary users
| Segment | Context of use | Design consequence |
|---|---|---|
| Dispatchers / ops staff | 8-hour shifts, dual monitors, dense data, high task repetition | Information density over whitespace; keyboard-first; no gratuitous motion |
| Drivers / field staff | Mobile, one-handed, outdoors, gloves, glare | Large targets (min 48px), high contrast, offline states |
| Fleet managers / buyers | Occasional, decision-making, often on the marketing site | Clarity, credibility, scannable proof |

Design for the dispatcher first. If a screen works during hour seven of a shift, it works for everyone else.

---

## 2. Brand foundation

### 2.1 The logo
The mark is a navy chevron-R with an orange directional cut, locked to an italic wordmark with a navy underscore rule.

**MUST**
- Maintain clear space on all sides equal to the height of the "R" counter (the enclosed bowl). Nothing — text, image edge, border — enters that zone.
- Minimum sizes: horizontal lockup **120px** wide on screen; glyph-only mark **24px**.
- Reproduce only from approved SVG masters. Never re-type the wordmark; the italic and the underscore rule are part of the artwork.

**MUST NOT**
- Recolour, add gradients, add drop shadows, outline, stretch, rotate, or crop the mark.
- Place the full-colour lockup on any background darker than Navy 500 or on a busy photograph — use the white knockout version.
- Use the glyph as a favicon at sizes below 24px without the simplified single-weight variant.

### 2.2 Logo variants to produce
| Variant | Use |
|---|---|
| `rouvin-lockup-color.svg` | Default, on white or Slate 50 |
| `rouvin-lockup-white.svg` | On Navy 700–900, photography, video |
| `rouvin-lockup-mono-navy.svg` | Single-colour print, faxable documents, embroidery |
| `rouvin-glyph-color.svg` | App icon, avatar, favicon ≥ 32px |
| `rouvin-glyph-simple.svg` | Favicon 16–24px, map pin, loading indicator |

### 2.3 Design principle — "the route line"
The one signature device in this system. A **2px navy hairline that turns orange at the point of action**, echoing the chevron cut in the mark.

It appears as: the active navigation indicator, the filled portion of a progress stepper, the leading edge of a loading bar, the divider that separates a page header from its content, and the underline of a focused link. It is the visual grammar of "this is where you are, and this is where it goes next."

Use it deliberately. If the route line appears more than twice in one viewport, remove one.

### 2.4 Voice
Plain, exact, unhurried. We speak like a good dispatcher: we say what happened, what it means, and what to do.

- Say "Delivery delayed by 40 minutes" — not "Uh oh! Something went wrong."
- Say "Assign driver" on the button and "Driver assigned" in the toast. Same verb, whole flow.
- No exclamation marks in the product. One is permitted per marketing page.
- Numbers are facts: never round a shipment count, a timestamp, or a distance to sound better.

---

## 3. Colour system

All values are sampled from the logo artwork. Navy `#0A3681` and Orange `#FF5F03` are the two literal brand colours; every other value is a derived ramp built for interface use.

### 3.1 Navy ramp — structure, trust, primary action
| Token | Hex | On white | Use |
|---|---|---|---|
| `navy-900` | `#05204F` | 15.84 | Dark surfaces, footers, app chrome |
| `navy-800` | `#072B67` | 13.54 | Hover state of navy-700 |
| `navy-700` | `#0A3681` | 11.31 | **Brand primary.** Primary buttons, logo navy, headings |
| `navy-600` | `#14479C` | 8.71 | Links, info semantic text |
| `navy-500` | `#1F5BC0` | 6.33 | Data-viz series 1, selected states |
| `navy-400` | `#4C82DB` | 3.80 | Non-text UI only — borders, chart fills |
| `navy-300` | `#85AAE9` | 2.35 | Decorative, dark-mode text |
| `navy-200` | `#BBD0F4` | 1.56 | Selected-row tint, chart gridlines |
| `navy-100` | `#E3ECFB` | 1.19 | Info banner background |
| `navy-050` | `#F2F6FD` | 1.08 | Subtle section background |

### 3.2 Orange ramp — motion, attention, the accent
| Token | Hex | On white | Use |
|---|---|---|---|
| `orange-900` | `#7A2C00` | 9.60 | Text on orange tints |
| `orange-800` | `#A83D00` | 6.30 | Pressed state of orange-700 |
| `orange-700` | `#D24E00` | 4.35 | **Only orange approved for body-size text on white** |
| `orange-600` | `#EE5800` | 3.48 | Hover fill for accent buttons |
| `orange-500` | `#FF5F03` | 3.05 | **Brand accent.** Fills, focus ring, route line, icons |
| `orange-400` | `#FF8038` | 2.50 | Accent on navy surfaces (4.52 on navy-700) |
| `orange-300` | `#FFA771` | 1.91 | Chart series, decorative |
| `orange-200` | `#FFCDAE` | 1.44 | Borders on orange tints |
| `orange-100` | `#FFE8DA` | 1.18 | Highlight background |
| `orange-050` | `#FFF4EE` | 1.08 | Subtle accent wash |

### 3.3 The orange rule (read this twice)

`orange-500` on white measures **3.05:1**. That passes WCAG for non-text UI components but **fails for text**. White on `orange-500` measures the same 3.05:1 and fails identically.

**MUST**
- Orange text on a light background uses `orange-700` (4.35:1) at 16px+, or `orange-500` only at ≥ 24px bold (large-text exemption, 3:1).
- Orange **fills** carry `ink-900 #0E1729` text, never white. That measures 5.87:1 and passes.
- Orange is never the only signal for a state. Pair with an icon, a label, or a shape.

**Why dark-on-orange is right here, not a compromise:** high-visibility livery — safety vests, load-bearing markings, road signage — is orange with black. Our users work in that world every day. The pairing reads as native to logistics, not as a workaround.

### 3.4 Colour ratio budget
Per viewport, aim for **60% neutral / 30% navy / 10% orange**. Orange is a wayfinding accent, not a brand blanket. If a screen reads as an orange screen, it is wrong.

**MUST NOT** use orange for: destructive actions, large background panels, body copy, disabled states, or more than one primary emphasis per screen region.

### 3.5 Neutrals (blue-tinted slate, so neutrals belong to the brand)
| Token | Hex | On white | Use |
|---|---|---|---|
| `ink-950` | `#060B16` | 19.68 | Text on orange fills, max-contrast headings |
| `ink-900` | `#0E1729` | 17.90 | **Body text default** |
| `ink-800` | `#1C2740` | 14.86 | Headings on light |
| `slate-700` | `#33405C` | 10.35 | Secondary text |
| `slate-600` | `#4E5C7A` | 6.70 | Tertiary text, captions, placeholders |
| `slate-500` | `#6B7997` | 4.37 | Smallest passing text — labels at 14px+ |
| `slate-400` | `#93A0B8` | 2.64 | Icons in disabled state, non-text only |
| `slate-300` | `#BEC7D8` | 1.70 | Input borders, dividers on tinted surfaces |
| `slate-200` | `#DDE3EE` | 1.29 | Default border, table rules |
| `slate-100` | `#EEF1F7` | 1.13 | Hover row, subtle fill |
| `slate-050` | `#F7F9FC` | 1.05 | Page background |
| `white` | `#FFFFFF` | — | Card and surface background |

### 3.6 Semantic colours
| Role | Text/icon | Background | Border | Ratio on tint |
|---|---|---|---|---|
| Success — delivered, saved | `#0B7350` | `#E6F6F0` | `#A8DCC6` | 5.25 |
| Warning — delayed, expiring | `#8A5205` | `#FDF3E0` | `#EBCF9A` | 5.80 |
| Error — failed, destructive | `#B8112F` | `#FDECEF` | `#F3B7C2` | 5.83 |
| Info — neutral system message | `#14479C` | `#E3ECFB` | `#BBD0F4` | 7.32 |

**Warning is mustard `#8A5205`, deliberately not orange.** Brand orange already means "this is the action." If warning were orange too, users could not tell a call-to-action from an alert. This separation is non-negotiable and every warning **MUST** also carry the `alert-triangle` icon.

Error is a crimson shifted toward magenta so it is distinguishable from brand orange for users with protanopia and deuteranopia.

### 3.7 Dark mode (Console only, v1.1)
- Surfaces: `#0B1220` base, `#111B2E` raised, `#1A2540` overlay. Never pure black.
- Text: `#E8ECF4` primary, `#A6B2CA` secondary.
- Brand navy is invisible on dark — **primary actions switch to orange fills with `ink-950` text**. This is the one place orange becomes the primary button.
- Accent text uses `orange-400 #FF8038` (4.52 on navy-700, 6.33 on navy-900).
- Desaturate elevation with borders, not shadows. Shadows do not read on dark.

### 3.8 Data visualisation sequence
Fixed order, never reshuffled: `#0A3681` → `#FF5F03` → `#1F5BC0` → `#FFA771` → `#4E5C7A` → `#85AAE9` → `#7A2C00`.

**MUST** additionally encode by pattern, dash style, or direct label — colour alone is never the only carrier of meaning in a chart.

---

## 4. Typography

### 4.1 Typefaces
| Role | Family | Weights | Rationale |
|---|---|---|---|
| Display | **Sora** | 600, 700 | Geometric skeleton with flat terminals — the same construction logic as the wordmark's circular bowls, without imitating its italic |
| Body / UI | **IBM Plex Sans** | 400, 500, 600 | Engineered humanist. Built for dense operational interfaces; excellent at 14px; wide language coverage |
| Data / mono | **IBM Plex Mono** | 400, 500 | Tabular figures for tracking IDs, timestamps, coordinates, plate numbers. Sibling family, so it never clashes |

Fallback stack: `"Sora", "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`.

**MUST** load only the weights listed. **MUST** use `font-display: swap` and self-host WOFF2 for the Console.

### 4.2 Type scale (1.250 major third, 16px base)
| Token | Size / line-height | Family & weight | Tracking | Use |
|---|---|---|---|---|
| `display-1` | 61/64px | Sora 700 | −0.02em | Marketing hero only |
| `display-2` | 49/56px | Sora 700 | −0.02em | Section openers |
| `h1` | 39/48px | Sora 600 | −0.015em | Page title |
| `h2` | 31/40px | Sora 600 | −0.01em | Section |
| `h3` | 25/32px | Sora 600 | −0.01em | Subsection, card title |
| `h4` | 20/28px | Plex Sans 600 | 0 | Group label, modal title |
| `body-lg` | 18/28px | Plex Sans 400 | 0 | Intro paragraphs |
| `body` | 16/24px | Plex Sans 400 | 0 | **Default** |
| `body-sm` | 14/20px | Plex Sans 400 | 0 | Dense tables, helper text |
| `label` | 13/16px | Plex Sans 500 | 0.01em | Form labels, chips |
| `caption` | 12/16px | Plex Sans 400 | 0.02em | Timestamps, footnotes |
| `overline` | 12/16px | Plex Sans 600 | 0.12em, uppercase | Eyebrows, table group headers |
| `mono` | 14/20px | Plex Mono 400 | 0 | IDs, codes, coordinates |

### 4.3 Rules
**MUST**
- Never set body text below **14px**. Never set text below **12px** anywhere.
- Cap measure at **72 characters** for long-form, **56** for marketing paragraphs.
- Use sentence case for headings, labels, buttons, and menu items. `ALL CAPS` only for `overline`.
- Use `font-variant-numeric: tabular-nums` on every column of numbers so figures align vertically.
- Preserve a strict hierarchy — never skip from `h1` to `h3` in the DOM for visual reasons; restyle instead.

**MUST NOT**
- Use italics for emphasis in the Console (the wordmark owns the italic). Use weight 600 instead.
- Use more than three type sizes in a single card or three weights on a single page.
- Justify text or use letter-spacing on body copy.

---

## 5. Spacing, grid, and layout

### 5.1 Spacing scale — 4px base
`2, 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128`

Every margin, padding, and gap **MUST** come from this scale. No arbitrary values in production CSS.

Rhythm guide: `4/8` inside a component, `12/16` between related elements, `24/32` between component groups, `48/64` between page sections, `80/96` between marketing sections.

### 5.2 Grid
| Context | Columns | Gutter | Margin | Max content width |
|---|---|---|---|---|
| Marketing desktop | 12 | 24px | 64px | 1200px |
| Console desktop | 12 | 24px | 32px | fluid, 1440px cap |
| Tablet | 8 | 20px | 32px | fluid |
| Mobile | 4 | 16px | 16px | fluid |

### 5.3 Breakpoints
`xs 0` · `sm 480` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`

Design mobile-first. Every layout is specified at 375px, 768px, and 1440px minimum before handoff.

### 5.4 Console shell
- Left navigation: 264px expanded, 72px collapsed (icon-only, with tooltips). State persists per user.
- Top bar: 64px, sticky, contains breadcrumb, global search, notifications, account.
- Content area: 32px padding, 24px vertical stack gap.
- Right detail drawer: 400px, overlays on `< lg`, pushes content on `≥ xl`.

### 5.5 Radius and elevation
| Token | Value | Use |
|---|---|---|
| `radius-sm` | 6px | Chips, badges, small inputs |
| `radius-md` | 10px | **Default** — buttons, inputs, cards |
| `radius-lg` | 16px | Modals, large panels, marketing cards |
| `radius-full` | 999px | Avatars, pills, toggle tracks |

Elevation is navy-tinted, never grey-black:
| Token | Shadow | Use |
|---|---|---|
| `elev-0` | none, `1px solid slate-200` | Resting cards — the default |
| `elev-1` | `0 1px 2px rgba(10,54,129,.08), 0 1px 3px rgba(10,54,129,.06)` | Hover on interactive cards |
| `elev-2` | `0 4px 12px rgba(10,54,129,.10)` | Dropdowns, popovers |
| `elev-3` | `0 16px 40px rgba(10,54,129,.16)` | Modals, drawers |

**SHOULD** prefer borders over shadows in the Console. Dense screens with many shadows read as noise.

---

## 6. Iconography

### 6.1 Library
**Lucide** (MIT licensed) is the single approved icon set. No mixing libraries, no one-off downloads from icon marketplaces, no emoji in the product UI.

### 6.2 Construction rules
| Property | Value |
|---|---|
| Grid | 24 × 24px |
| Stroke | **1.75px** at 20–24px; 2px at 32px+; 1.5px at 16px |
| Caps / joins | Round |
| Fill | None — Rouvin icons are stroked, with one exception (see 6.4) |
| Optical padding | 2px inside the 24px box |
| Colour | Inherits `currentColor`. Never hard-coded in the SVG |

Stroke is set to 1.75px rather than Lucide's 2px default: at the densities the dispatcher screens run, 2px reads as heavy against Plex Sans at 14px. 1.75px sits correctly against the type without losing the mark's confidence.

### 6.3 Sizes
| Token | Size | Use |
|---|---|---|
| `icon-xs` | 16px | Inline with `body-sm`, chips, breadcrumb separators |
| `icon-sm` | 20px | **Default** — buttons, inputs, menu items, table actions |
| `icon-md` | 24px | Navigation, toolbars, card headers |
| `icon-lg` | 32px | Feature callouts, empty-state headers |
| `icon-xl` | 48px | Empty states, marketing feature blocks |

### 6.4 Usage rules
**MUST**
- Every icon-only control carries an `aria-label` and a tooltip on hover and focus.
- Icons that convey status (delivered, delayed, failed) are always accompanied by a text label. Icon alone is never the only carrier of meaning.
- Icons in a row share one optical size and one stroke weight.
- Set `aria-hidden="true"` on decorative icons that sit next to their own label.
- Minimum touch target 44 × 44px (48px in driver-facing views), regardless of icon size.

**MUST NOT**
- Rotate, flip, or recolour an icon to invent a new meaning. Request an addition instead (§16).
- Use two-tone or filled icons except for the single approved exception: **active navigation items use a filled variant** to reinforce the route-line indicator.
- Place an icon inside a button on both sides.

### 6.5 Core inventory (v1.0)
| Meaning | Lucide name |
|---|---|
| Dashboard / home | `layout-dashboard` |
| Shipments | `package` |
| Live tracking | `map-pin` |
| Route planning | `route` |
| Fleet | `truck` |
| Drivers | `users` |
| Schedule | `calendar-clock` |
| Analytics | `bar-chart-3` |
| Documents / proof of delivery | `file-text` |
| Billing | `receipt` |
| Settings | `settings` |
| Search | `search` |
| Filter | `sliders-horizontal` |
| Notifications | `bell` |
| Add | `plus` |
| Edit | `pencil` |
| Delete | `trash-2` |
| Download / export | `download` |
| Refresh | `refresh-cw` |
| More actions | `more-horizontal` |
| Success | `check-circle-2` |
| Warning | `alert-triangle` |
| Error | `x-circle` |
| Info | `info` |
| Delayed / ETA | `clock` |
| Forward / next | `chevron-right` |
| Expand | `chevron-down` |
| Close | `x` |
| External link | `arrow-up-right` |
| Help | `life-buoy` |

Any icon needed outside this list is raised as a change request and added to the library — never inlined ad hoc in a feature branch.

---

## 7. Motion

### 7.1 Tokens
| Token | Duration | Easing | Use |
|---|---|---|---|
| `motion-instant` | 100ms | `cubic-bezier(.4,0,.2,1)` | Hover, colour and border changes |
| `motion-fast` | 160ms | `cubic-bezier(.4,0,.2,1)` | Tooltips, dropdowns, checkbox |
| `motion-base` | 240ms | `cubic-bezier(.2,.8,.2,1)` | Modals, drawers, accordions |
| `motion-slow` | 400ms | `cubic-bezier(.2,.8,.2,1)` | Page transitions, route-line draw |

### 7.2 Rules
**MUST**
- Honour `prefers-reduced-motion: reduce` — replace movement with an opacity change of ≤ 100ms. Never remove the feedback entirely.
- Animate only `transform` and `opacity`. Never animate `width`, `height`, `top`, or `left`.
- Keep motion directional and truthful: a drawer that opens from the right closes to the right.

**MUST NOT**
- Animate anything on a data table refresh other than a 2px route-line loading bar at the top of the table.
- Use bounce, elastic, or spring overshoot. This is operational software; overshoot reads as instability.
- Auto-play looping animation in the Console.

---

## 8. Component standards

### 8.1 Every interactive component MUST define seven states
`default` · `hover` · `focus-visible` · `active/pressed` · `disabled` · `loading` · `error`

A design is not ready for handoff until all seven exist in the file. Missing states are the single most common cause of rework.

### 8.2 Focus
One global treatment, no exceptions:
```css
:focus-visible {
  outline: 3px solid #FF5F03;
  outline-offset: 2px;
  border-radius: inherit;
}
```
On navy surfaces, the ring switches to `#FF8038`. **MUST NOT** ever set `outline: none` without an equivalent replacement.

### 8.3 Buttons
| Variant | Fill | Text | Border | Hover | Use |
|---|---|---|---|---|---|
| Primary | `navy-700` | white | none | `navy-800` | The one main action per view |
| Accent | `orange-500` | `ink-950` | none | `orange-600` | Conversion moments; max one per screen |
| Secondary | white | `navy-700` | 1px `slate-300` | `slate-050` bg | Alternative actions |
| Tertiary | transparent | `navy-600` | none | `slate-100` bg | Low-priority, in-table actions |
| Destructive | `#B8112F` | white | none | `#960D26` | Delete, cancel a shipment |

Sizes: `sm` 32px / `md` 40px (default) / `lg` 48px. Horizontal padding 16/20/24. Icon gap 8px.

**MUST** — one primary button per view region. Loading state disables the button, swaps the leading icon for a spinner, and keeps the label so width does not jump. Destructive actions always require a confirmation modal that names the object: "Cancel shipment RVN-48213?"

### 8.4 Forms
- Label above the field, always visible. **MUST NOT** use placeholder text as the label.
- Field height 40px (48px on mobile), 12px horizontal padding, `radius-md`, 1px `slate-300` border.
- Helper text sits below at `caption`, `slate-600`.
- Errors: border `#B8112F`, `x-circle` icon inside the right edge, message below in `#B8112F`. The message says what to do — "Enter a date on or after today", not "Invalid input".
- Validate on blur, never on keystroke. Re-validate on keystroke only after a field has already errored.
- Required fields are marked; optional fields are marked "(optional)" when a form is mostly required. Pick one convention per form and hold it.
- Group related fields with a `fieldset` and a `legend`. 24px between groups, 16px between fields.

### 8.5 Data tables (the Console's most-used component)
- Row height: 44px comfortable, 36px compact. Compact is a user preference, remembered.
- Header: `overline` style, `slate-600`, `slate-050` background, sticky on scroll.
- First column is the identifier and links to the detail view. Last column is a right-aligned actions cell.
- Numeric columns right-aligned with `tabular-nums`. Dates in `mono`.
- Row hover `slate-100`; selected row `navy-100` with a 3px `orange-500` left edge — the route line.
- Zebra striping is not used. Use 1px `slate-200` rules instead.
- Every table has: a result count, a sort indicator, pagination or virtualised scroll, an empty state, a loading skeleton, and an error state.

### 8.6 Feedback
- **Toast**: bottom-right, 4s auto-dismiss, max one at a time, never for errors that need action. `elev-2`, `radius-md`, semantic left border 3px.
- **Inline alert**: for context-bound messages. Semantic tint background, 1px semantic border, icon, optional action link.
- **Modal**: `radius-lg`, `elev-3`, 480px default width, focus trapped, `Esc` closes, backdrop `rgba(6,11,22,.48)`. Never nest modals.
- **Empty state**: 48px icon in `slate-400`, an `h4` that states the situation, one line of `body-sm` explaining it, and one primary action. Empty screens are invitations, not apologies.
- **Loading**: skeletons that match the final layout, not spinners, for anything above 300ms. A 2px orange route line at the top of the container for background refreshes.

---

## 9. Accessibility standard

**Target: WCAG 2.2 Level AA.** This is a contractual quality bar, not an aspiration.

**MUST**
- Text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 24px or ≥ 19px bold). UI components and focus indicators ≥ 3:1.
- Every function reachable by keyboard, in a logical DOM order, with a visible focus ring and a "Skip to content" link.
- Semantic HTML first: `button` for actions, `a` for navigation, real `table` markup for tables, one `h1` per page.
- Form controls have programmatically associated labels. Errors use `aria-describedby` and `aria-invalid`.
- Live regions (`aria-live="polite"`) announce toasts, filter result counts, and async completions.
- Touch targets ≥ 44px, ≥ 48px on driver-facing screens.
- Content reflows at 320px width and remains usable at 200% zoom with no horizontal scrolling.
- Colour is never the only means of conveying information.
- All media has captions; all meaningful images have alt text; decorative images have `alt=""`.

**Testing gate — a feature does not ship until it passes:**
1. Automated axe-core scan: zero critical or serious issues.
2. Full keyboard-only pass of the primary flow.
3. Screen reader pass — NVDA on Windows and VoiceOver on macOS/iOS — of the primary flow.
4. 200% zoom and 320px reflow check.
5. Greyscale check: is the screen still fully understandable with colour removed?

---

## 10. Design process

### 10.1 Stages
| # | Stage | Output | Exit criteria |
|---|---|---|---|
| 1 | Discover | Problem statement, user evidence, success metric | Written problem the team agrees on |
| 2 | Define | User flow, IA, acceptance criteria | Flow covers happy path, empty, error, loading, offline |
| 3 | Explore | 2–3 divergent low-fidelity options | Options are genuinely different, not variants |
| 4 | Design | High-fidelity screens using only DS tokens | Zero detached components; all seven states present |
| 5 | Review | Design critique + accessibility pre-check | Written sign-off from Design Lead and Frontend Lead |
| 6 | Prototype & test | Clickable prototype, 5-user usability test | Findings logged with severity |
| 7 | Handoff | Annotated specs, tokens, edge cases, copy deck | Engineer confirms Definition of Ready |
| 8 | Build support | Daily availability for questions | — |
| 9 | Design QA | Annotated screenshot review against spec | All P1/P2 defects closed |
| 10 | Post-launch | Metric review at 2 and 6 weeks | Learning logged in the decision record |

### 10.2 Definition of Ready (design → engineering)
- [ ] All breakpoints specified: 375 / 768 / 1440
- [ ] All seven interaction states designed
- [ ] Empty, loading, error, partial-data, and long-content variants included
- [ ] Every value maps to a named token — no detached styles, no one-off hex
- [ ] Final copy written and reviewed, not lorem ipsum
- [ ] Accessibility notes: tab order, ARIA roles, focus management on open/close
- [ ] Edge cases: longest realistic string, zero items, 10,000 items, slow network, offline
- [ ] Localisation allowance: layout tolerates +35% text expansion

### 10.3 Definition of Done (engineering → QA)
- [ ] Rendered UI matches spec within 2px on all three breakpoints
- [ ] Only design tokens used — no hard-coded colours, sizes, or spacing values
- [ ] Keyboard and screen reader passes complete
- [ ] axe-core clean; Lighthouse Accessibility ≥ 95
- [ ] Reduced-motion path implemented
- [ ] Loading, empty, and error states verified with the network throttled
- [ ] Component added or updated in the Storybook library with all states

### 10.4 Critique rules
Critique is scheduled, not ambient. 45 minutes, max three topics. The presenter states the problem and the constraint before showing pixels. Feedback is framed as an observation plus a consequence — "the primary and accent buttons carry equal weight here, so I can't tell which one to press" — never as a preference. Decisions and their reasons are recorded in the decision log the same day.

---

## 11. Naming and file conventions

**Figma structure**
```
Rouvin DS — Foundations   (colour, type, spacing, elevation, icons)
Rouvin DS — Components    (published library, all variants)
Rouvin DS — Patterns      (page templates, flows)
Rouvin — Product          (feature files, one page per epic)
Rouvin — Archive
```

- Layers: `component/variant/state` — e.g. `button/accent/hover`
- Frames: `[Platform] Flow – Screen – State` — e.g. `[Desktop] Dispatch – Route detail – Empty`
- Branches: `feature/RVN-1284-route-detail`
- Assets export: `kebab-case` — `icon-truck-24.svg`, `hero-fleet@2x.webp`

**Token naming:** `--rv-{category}-{role}-{modifier}` — e.g. `--rv-color-navy-700`, `--rv-space-16`, `--rv-radius-md`, `--rv-motion-base`.

Tokens live in one `tokens.json`, exported to CSS custom properties and to the Figma variables collection. **The JSON file is the source of truth. Neither Figma nor CSS is edited directly.**

---

## 12. Design QA checklist (run before every release)

**Visual**
- [ ] All colour values come from the palette; contrast checked on the exact rendered pairing
- [ ] Spacing uses only the 4px scale
- [ ] One primary action per view region
- [ ] Orange occupies roughly 10% of the viewport, no more
- [ ] Icons uniform in size and stroke weight; correct icons from the inventory
- [ ] Logo clear space respected; correct variant for the background

**Behaviour**
- [ ] Hover, focus, active, disabled, loading verified on every control
- [ ] Focus ring visible on every interactive element, including inside modals
- [ ] Modal focus trap and `Esc` close working; focus returns to the trigger
- [ ] Forms validate on blur; error messages are actionable
- [ ] Destructive actions confirm and name the object

**Content**
- [ ] Sentence case throughout; button verb matches the confirmation verb
- [ ] No lorem ipsum, no placeholder names, no "Click here"
- [ ] Errors explain what happened and what to do next
- [ ] Numbers, dates, and units formatted consistently and localised

**Resilience**
- [ ] Longest realistic string does not break layout
- [ ] Zero-state and 10,000-row states both render correctly
- [ ] Offline and slow-network paths tested
- [ ] 200% zoom and 320px width usable

---

## 13. Governance and change control

### 13.1 Roles
| Role | Responsibility |
|---|---|
| Design Lead | Owns the system, approves all token and component changes, chairs critique |
| Frontend Lead | Owns the code implementation, approves API and token naming |
| Product | Owns priority and acceptance criteria |
| QA | Owns the release gate, runs the accessibility suite |
| Contributors | Anyone may propose; no one may merge without the two Leads |

### 13.2 Change request process
1. Open a `design-system` issue: problem, evidence it is not solvable with existing components, proposed solution.
2. Design Lead triages within 3 working days: **Reuse** / **Extend** / **Add new**.
3. New components require two real use cases before approval. One use case is a feature style, not a system component.
4. Approved changes are built with all states, documented, added to Storybook, and versioned.
5. Announced in the release note with a migration path.

### 13.3 Versioning (semver)
- **Major** — breaking token or API change. 30 days notice, codemod or migration guide provided.
- **Minor** — new components or tokens, backwards compatible.
- **Patch** — bug and accessibility fixes.

Deprecations are announced one minor version ahead, marked in Figma and code, and removed no earlier than the next major.

### 13.4 Metrics reviewed each quarter
Token adoption (% of styles using tokens), detached-component count in Figma, average design-QA defects per feature, axe violations in production, and time from handoff to merge.

---

## Appendix A — Token quick reference

```css
:root {
  /* Brand */
  --rv-color-navy-900:#05204F; --rv-color-navy-800:#072B67; --rv-color-navy-700:#0A3681;
  --rv-color-navy-600:#14479C; --rv-color-navy-500:#1F5BC0; --rv-color-navy-400:#4C82DB;
  --rv-color-navy-300:#85AAE9; --rv-color-navy-200:#BBD0F4; --rv-color-navy-100:#E3ECFB;
  --rv-color-navy-050:#F2F6FD;

  --rv-color-orange-900:#7A2C00; --rv-color-orange-800:#A83D00; --rv-color-orange-700:#D24E00;
  --rv-color-orange-600:#EE5800; --rv-color-orange-500:#FF5F03; --rv-color-orange-400:#FF8038;
  --rv-color-orange-300:#FFA771; --rv-color-orange-200:#FFCDAE; --rv-color-orange-100:#FFE8DA;
  --rv-color-orange-050:#FFF4EE;

  /* Neutral */
  --rv-color-ink-950:#060B16; --rv-color-ink-900:#0E1729; --rv-color-ink-800:#1C2740;
  --rv-color-slate-700:#33405C; --rv-color-slate-600:#4E5C7A; --rv-color-slate-500:#6B7997;
  --rv-color-slate-400:#93A0B8; --rv-color-slate-300:#BEC7D8; --rv-color-slate-200:#DDE3EE;
  --rv-color-slate-100:#EEF1F7; --rv-color-slate-050:#F7F9FC; --rv-color-white:#FFFFFF;

  /* Semantic */
  --rv-color-success:#0B7350; --rv-color-success-bg:#E6F6F0; --rv-color-success-border:#A8DCC6;
  --rv-color-warning:#8A5205; --rv-color-warning-bg:#FDF3E0; --rv-color-warning-border:#EBCF9A;
  --rv-color-error:#B8112F;   --rv-color-error-bg:#FDECEF;   --rv-color-error-border:#F3B7C2;
  --rv-color-info:#14479C;    --rv-color-info-bg:#E3ECFB;    --rv-color-info-border:#BBD0F4;

  /* Type */
  --rv-font-display:"Sora","IBM Plex Sans",system-ui,sans-serif;
  --rv-font-body:"IBM Plex Sans",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --rv-font-mono:"IBM Plex Mono",ui-monospace,"SFMono-Regular",Menlo,monospace;

  /* Space */
  --rv-space-2:2px;  --rv-space-4:4px;   --rv-space-8:8px;   --rv-space-12:12px;
  --rv-space-16:16px;--rv-space-20:20px; --rv-space-24:24px; --rv-space-32:32px;
  --rv-space-40:40px;--rv-space-48:48px; --rv-space-64:64px; --rv-space-80:80px;
  --rv-space-96:96px;--rv-space-128:128px;

  /* Radius */
  --rv-radius-sm:6px; --rv-radius-md:10px; --rv-radius-lg:16px; --rv-radius-full:999px;

  /* Elevation */
  --rv-elev-1:0 1px 2px rgba(10,54,129,.08), 0 1px 3px rgba(10,54,129,.06);
  --rv-elev-2:0 4px 12px rgba(10,54,129,.10);
  --rv-elev-3:0 16px 40px rgba(10,54,129,.16);

  /* Motion */
  --rv-motion-instant:100ms; --rv-motion-fast:160ms;
  --rv-motion-base:240ms;    --rv-motion-slow:400ms;
  --rv-ease-standard:cubic-bezier(.4,0,.2,1);
  --rv-ease-emphasis:cubic-bezier(.2,.8,.2,1);
}
```

## Appendix B — Contrast reference (measured, WCAG 2.2)

| Foreground | Background | Ratio | Verdict |
|---|---|---|---|
| `navy-700` | white | 11.31 | AAA — all text |
| white | `navy-700` | 11.31 | AAA — primary button |
| `ink-900` | white | 17.90 | AAA — body |
| `slate-600` | white | 6.70 | AA — secondary text |
| `slate-500` | white | 4.37 | AA at 14px+ — smallest passing |
| `orange-500` | white | 3.05 | **Fails text.** Non-text UI and ≥24px bold only |
| white | `orange-500` | 3.05 | **Fails. Never use.** |
| `ink-900` | `orange-500` | 5.87 | AA — the approved orange-fill pairing |
| `orange-700` | white | 4.35 | AA — the only orange text on light |
| `orange-400` | `navy-700` | 4.52 | AA — accent on dark navy |
| `navy-200` | `navy-700` | 7.24 | AAA — secondary text on dark |

## Appendix C — Deliverables checklist for this project

- [ ] `tokens.json` generated and wired into CSS + Figma variables
- [ ] Logo master SVGs produced in all five variants (§2.2)
- [ ] Sora and IBM Plex self-hosted as WOFF2 with subset ranges
- [ ] Lucide installed, stroke default overridden to 1.75
- [ ] Storybook set up with the §8 component inventory, all seven states each
- [ ] axe-core integrated into CI as a blocking check
- [ ] This SOP linked from the repo README and the Figma cover
