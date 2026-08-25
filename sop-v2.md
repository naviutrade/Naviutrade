# Rouvin DS v2 — “Ledger”
## UI/UX Standard Operating Procedure

**Supersedes:** Rouvin DS v1.0 (`sop.md`, `rouvin-design-system.html`)
**Applies to:** Rouvin vendor console (authenticated web app), frontend only
**Visual source of truth:** `rouvin-ds-v2.html`
**Code changes:** `frontend-migration-v2.md`
**Status:** Approved direction — ready to build
**Owner:** Design Lead · **Contributors:** Frontend Lead, Product, QA
**Date:** 25 August 2026

---

## 0. Read this first — what v1 got wrong

v1 was written before anyone had seen the product. It inferred a **logistics and fleet platform** from the chevron in the logo, and it built an icon set full of trucks, routes, map pins and delivery windows.

The implementation report shows what Rouvin actually is:

> A **vendor trading and wallet console**. Vendors top up a wallet, buy listed stock (regular and “wild”) at a buy price, hold it under a time lock, sell it at a selling price for profit, and withdraw to a bank account. Around that sits referrals, initial claims, commission earnings, deposit and withdrawal history, and a read-only KYC profile. Currency is ₹, payments run through UPI and Easebuzz, identity is Aadhar and PAN, and every timestamp is IST.

That is a different product with different verbs. v2 rebuilds the interface around **money, time locks, and risk** instead of movement and delivery. This is not a repaint — it is a correction, and it is why so much changes at once.

What survives from v1: the two brand colours (fixed by the logo), the orange contrast rule, warning-is-mustard, and colour-is-never-alone. Everything else is new.

**Rule hierarchy:** **MUST** is a hard rule and grounds for rejecting a review or a PR. **SHOULD** is the default and needs a written reason to break. **MAY** is discretionary.

---

## 1. Design direction

### 1.1 The concept: a ledger, not a dashboard
A vendor opens this app to answer two questions: *what am I worth right now*, and *what needs me today*. Everything else is secondary. The interface should read like a well-kept trading ledger — ruled, aligned, numeric, unfussy — not like a marketing dashboard.

### 1.2 The seven direction changes
| Axis | v1 “Route” | v2 “Ledger” |
|---|---|---|
| Shell | 264px labelled navy sidebar + 64px top bar | 72px icon rail + sticky context header carrying title, tabs and live balance |
| Surface logic | White cards floating on a tinted page, navy shadows | **Inverted** — tinted panels set into a white page, zero shadow, hairline rules |
| Radius | 6 / 10 / 16px, uniformly soft | 4px structure · 8px controls · full pill for tags — three deliberate registers |
| Buttons | Flat fills | **Keycap** — 1px border, 2px shelf, presses down 2px |
| Type | Sora + IBM Plex Sans + Plex Mono (IDs only) | Archivo + Figtree + **JetBrains Mono as a first-class UI face** |
| Icons | Lucide 1.75px, logistics inventory | **Phosphor bold 2.25px**, fill variants, trading inventory |
| Signature | Route line | **The cut** — 45° corner slice on value-bearing surfaces |

### 1.3 Dark mode is not a variant
v1 deferred dark mode to a hypothetical v1.1 and the implementation ended up with a raw Chakra colour-mode toggle over untokenised values. In v2, **light and dark are two value sets behind one set of semantic names**. A component written correctly is correct in both, and neither is “the real one”.

**MUST** — no component may reference a raw hex. Every colour resolves through a semantic token (§3).

---

## 2. Voice and content

The register is a careful bookkeeper: exact, calm, never excitable.

**MUST**
- Sentence case everywhere — headings, buttons, labels, tabs, menu items. Micro-labels above form fields are the one uppercase exception.
- **No exclamation marks anywhere in the product.** The report flags `ID Copied!` and similar. They go.
- The verb on the control reappears in the confirmation: **Sell now** → **Sold**. **Claim bonus** → **Claimed**. **Add money** → **Money added**.
- Every error states the shortfall and the next action in rupees. “Insufficient funds” is not acceptable; “This purchase costs ₹ 14,880.00 and your balance is ₹ 9,250.00. Add ₹ 5,630.00 to continue.” is.
- Destructive confirmations name the object **and** the amount: “Cancel your withdrawal request of ₹ 5,000.00?”
- Never blame the vendor and never apologise for the system. State what happened.

**MUST NOT**
- Use “Oops”, “Uh oh”, “Something went wrong”, or a raw API string as user-facing copy.
- Use Title Case. The report lists surviving instances — “Active Investments”, “Request a Withdrawal”, “Submit Request”, “Confirm Sell”, “Keep Request” — all of which are rewritten.

---

## 3. Colour

### 3.1 Architecture
Three layers, in this order. **A component may only ever touch layer 3.**

1. **Brand constants** — `--rv-navy #0A3681`, `--rv-orange #FF5F03`. Sampled from the logo, never edited.
2. **Theme ramps** — the light and dark value sets.
3. **Semantic tokens** — what components consume: `--bg`, `--panel`, `--panel-2`, `--hairline`, `--border`, `--control-border`, `--text`, `--text-2`, `--text-3`, `--brand`, `--brand-on`, `--accent`, `--accent-on`, `--accent-text`, `--ok`, `--warn`, `--bad`, `--note` and their `-bg` / `-bd` pairs.

### 3.2 Light mode
| Token | Value | Contrast | Use |
|---|---|---|---|
| `--bg` | `#FFFFFF` | — | Page canvas |
| `--panel` | `#F4F7FC` | — | Panels, table headers, quiet fills |
| `--panel-2` | `#EAF0F9` | — | Nested panels, hover wash, selected rows |
| `--hairline` | `#DCE3F0` | — | Row rules, internal dividers |
| `--border` | `#C9D4E8` | — | Panel and table outlines |
| `--control-border` | `#7A88A3` | **3.57** on white | Inputs, quiet buttons, steppers |
| `--text` | `#0B1424` | 18.42 | Body, figures |
| `--text-2` | `#3D4B68` | 8.73 | Secondary copy |
| `--text-3` | `#5A6883` | 5.61 | Labels, meta, placeholders |
| `--brand` | `#0A3681` | 11.31 | Solid buttons, links |
| `--accent` | `#FF5F03` | 3.05 | **Fills, edges, the cut — never text** |
| `--accent-text` | `#D24E00` | 4.35 | The only orange permitted as text on light |
| `--ok` | `#0B7350` on `#E4F4EC` | 5.46 | Profit, approved, sold, delivered |
| `--warn` | `#8A5205` on `#FBF1DC` | 5.94 | Pending, locked, at-risk |
| `--bad` | `#B8112F` on `#FCEAEE` | 6.19 | Loss, rejected, failed, destructive |
| `--note` | `#14479C` on `#E6EDFB` | 8.11 | Neutral system information |

### 3.3 Dark mode
| Token | Value | Contrast on `--panel` | Use |
|---|---|---|---|
| `--bg` | `#070C18` | — | Canvas. Never pure black |
| `--panel` | `#0E1626` | — | Panels |
| `--panel-2` | `#16203A` | — | Nested, hover, selected |
| `--hairline` | `#1E2A45` | — | Row rules |
| `--border` | `#22304F` | — | Outlines |
| `--control-border` | `#5A6C90` | **3.43** | Inputs, quiet buttons |
| `--text` | `#E8EDF7` | 15.40 | Body, figures |
| `--text-2` | `#C3CDE2` | 11.32 | Secondary |
| `--text-3` | `#9AA9C4` | 7.62 | Labels, meta |
| `--brand` | `#2E63D8` | white text **5.40** | Solid buttons |
| `--accent` | `#FF6A1F` | 6.31 | Fills, edges, the cut |
| `--accent-text` | `#FF8038` | 7.23 | **Orange as text is permitted in dark** |
| `--ok` | `#3ECF9A` | 9.12 | Profit |
| `--warn` | `#F2C14E` | 10.77 | Pending, locked |
| `--bad` | `#FF6B7A` | 6.57 | Loss, rejected |
| `--note` | `#7BA5F5` | 7.36 | Information |

### 3.4 Rules carried over from v1 — still hard rules
- **Orange on light fails as text.** `#FF5F03` on white is 3.05:1. Orange fills carry `--accent-on` (near-black), never white. Orange text on light is `#D24E00` only.
- **Warning is mustard, never brand orange.** Orange means “this is the action”; if alerts were orange too, a vendor could not tell a Sell button from a risk notice.
- **Colour is never the only signal.** Every status carries a glyph and a word; profit and loss also carry a sign.

### 3.5 New in v2
- **In dark mode, orange becomes readable text** (`#FF8038`, 7.23:1). Dark is the one place orange may set labels, countdowns and figures.
- **Control borders now pass SC 1.4.11.** v1 specified `#BEC7D8` for input borders — 1.70:1 against white, below the 3:1 needed for a boundary that identifies a control. Fixed in both themes.
- **`--brand` differs by theme.** Navy `#0A3681` is invisible on a dark canvas, so dark mode uses `#2E63D8`. Accent orange stays the accent in both, so the *meaning* of each variant never changes — only its value.

### 3.6 Colour budget
Per viewport: roughly **70% neutral / 20% brand / 10% accent**, in both themes. Accent orange **MUST NOT** exceed four surfaces in one viewport, counting the cut, the active rail edge, and any accent button.

### 3.7 Charts
Fixed series order, both themes, never reshuffled:
`--brand` → `--accent` → `--note` → `--ok` → `--text-3` → `--warn`.
**MUST** additionally encode by dash pattern or direct label. Profit and loss series **MUST** also differ in sign and position, not only hue.

---

## 4. Typography

| Role | Family | Weight | Size / line | Notes |
|---|---|---|---|---|
| `display-1` | Archivo | 700 | 50 / 52 · −.035em | Marketing and hero figures only |
| `display-2` | Archivo | 700 | 36 / 40 · −.03em | Empty-state headlines |
| `page-title` | Archivo | 700 | 26 / 30 · −.02em | One per page, in the context header |
| `panel-title` | Archivo | 600 | 20 / 25 · −.01em | Panel and modal headings |
| `section` | Archivo | 600 | 17 · .06em · caps | Group headers inside a panel |
| `body` | Figtree | 400 | 15 / 23 | Default |
| `body-sm` | Figtree | 400 | 13.5 / 20 | Table rows, helper text, modal bodies |
| `label` | Figtree | 600 | 12 · .04em · caps | Field micro-labels |
| `figure-lg` | JetBrains Mono | 700 | 30 · −.03em | Balances, position, headline money |
| `figure` | JetBrains Mono | 500 | 15 | Table money, quantities, countdowns |
| `meta` | JetBrains Mono | 400 | 12.5 | IDs, timestamps, reference numbers |
| `tag` | JetBrains Mono | 500 | 10.5 · .06em · caps | Status tags |

**MUST**
- Never set body below 13.5px; never set anything below 12px.
- Self-host Archivo, Figtree and JetBrains Mono as WOFF2 with `font-display: swap`. Only the weights listed.
- Cap reading measure at 74 characters.

**MUST NOT**
- Use italics for emphasis — the wordmark owns the italic. Use weight 600.
- Use more than three sizes in a single panel.

### 4.1 Number standards — domain-specific, non-negotiable
This is a money product; these rules are functional, not stylistic.

**MUST**
- Every figure uses `font-variant-numeric: tabular-nums`.
- Currency is `₹ 48,250.00` — symbol, thin space, **Indian digit grouping** (`1,40,650.00`, not `140,650.00`), always two decimals.
- Signed values lead with the sign, before the symbol: `+₹ 6,140.00` / `−₹ 820.00`, using a true minus (U+2212), not a hyphen.
- Countdowns are `HH:MM:SS`, mono, so digits do not jitter as they tick.
- All timestamps state IST explicitly. Vendors reconcile against bank statements.
- Money inputs are right-aligned, mono, and formatted on blur.

**MUST NOT**
- Round or abbreviate a balance, profit, quantity or fee to look tidier. `₹ 3.8L` is never acceptable for a real balance; it may only appear on a chart axis.

---

## 5. Signature: the cut

A 45° slice off the top-right corner of a surface, with the notch filled in `--accent`. Taken directly from the diagonal cut through the logo's R.

**It carries meaning: if a surface is cut, there is money in it.**

**Use on** — money panels and KPI tiles showing rupees, the wallet balance strip, purchase and sale confirmation modals, payout and withdrawal rows, the position panel.

**MUST NOT** appear on navigation, plain content cards, counts that are not currency, avatars, or images. **MUST NOT** exceed four cut surfaces in one viewport.

Two sizes: `cut` (18px) for tiles and strips, `cut-lg` (28px) for the position panel and modals.

Implementation is `clip-path` plus a gradient pseudo-element — no images, no extra DOM.

---

## 6. Layout and shell

### 6.1 Spacing — 2px base
`2, 4, 6, 8, 10, 14, 18, 22, 28, 36, 48, 64, 88`

Finer than v1's 4px scale because dense financial rows need 6px and 10px steps. Every margin, padding and gap **MUST** come from it.

### 6.2 Density
Two modes, toggled by the vendor and persisted: **comfortable** (48px rows, 22px panel padding) and **compact** (36px rows, 14px padding). Both **MUST** keep touch targets at 44px minimum by expanding the hit area, not the row.

### 6.3 Radius
`4px` structure (panels, tables, alerts) · `8px` controls (buttons, inputs, steppers) · `999px` tags. **MUST NOT** introduce a fourth value.

### 6.4 Elevation
**Panels have no shadow.** Structure is expressed with borders and hairlines. Shadow exists only for things that float above the page: `--shadow-pop` on modals, the command palette, popovers and toasts.

### 6.5 The rail — 72px
Dark in both themes, so the frame is always distinguishable from the ledger. Icon-only, seven destinations plus profile and log out.

**MUST** — every rail button has an `aria-label` and a tooltip on hover **and** on focus. Active state uses the Phosphor `fill` glyph plus a 3px `--accent` left edge.

Below `md`, the rail becomes a **bottom bar** with the five most-used destinations. Not a hamburger drawer — a vendor checking an unlock time on a phone should reach Wallet in one tap.

### 6.6 Context header — sticky
One block replacing v1's breadcrumb bar and per-page `h1`: page title, optional subtitle, tab strip, and the **balance strip**.

The balance strip shows wallet, held value and unrealised P&L, and is **present on every authenticated screen**. In v1 a vendor had to navigate to Wallet to check affordability before a purchase; that is now always answered in the top-right.

### 6.7 Command palette — `⌘K` / `Ctrl+K`
Replaces the three separate page-level search fields and the dead bell. Searches products, held trades, purchases and payouts; also runs actions (add money, request withdrawal, sell an unlocked trade).

### 6.8 Breakpoints
`sm 480 · md 768 · lg 1024 · xl 1280 · 2xl 1536`. Design at 375 / 768 / 1440 minimum before handoff.

---

## 7. Components

### 7.1 The state matrix — nine states
Every interactive component **MUST** define:
`default · hover · focus-visible · pressed · disabled · loading · error · empty · locked`

**`locked` is new and specific to Rouvin.** A held trade before its unlock time is not disabled — it is *pending by design*. It **MUST** show the countdown, not a grey button with no explanation. A disabled control with no stated reason is a defect.

### 7.2 Focus
```css
:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; border-radius: var(--r-control); }
```
2px with a 3px offset, so it reads on both the white canvas (3.05:1 — non-text, passes) and the dark canvas (6.82:1). **MUST NOT** set `outline: none` without an equivalent replacement.

### 7.3 Buttons — keycap
1px border on every variant, a 2px shelf below, `translateY(2px)` on press with the shelf collapsing. In a product where a click spends real money, the control should feel pressed.

| Variant | Fill | Text | Use |
|---|---|---|---|
| Solid | `--brand` | `--brand-on` | The one main action per region |
| Accent | `--accent` | `--accent-on` | **Money-moving only** — buy, sell, claim, submit withdrawal |
| Quiet | `--bg` + `--control-border` | `--text` | Alternatives, export, filter |
| Ghost | transparent | `--text-2` | In-row and low-priority |
| Danger | `--bad` | white / dark ink | Cancel a request, destructive |

Sizes 30 / 38 / 46px.

**MUST**
- One accent button per screen region. Two accents means neither is the answer.
- Money buttons state the amount: **Pay ₹ 14,880.00 with wallet**.
- Loading keeps the label so the width does not jump mid-transaction.
- Never use a raw Chakra `colorScheme` — the report flags a green `Confirm Sell`, which becomes accent.

### 7.4 Tags
Mono, uppercase, tracked, with a filled glyph. Semantic set: approved / pending / rejected / locked / unlocked / cancelled / draft.

### 7.5 Alerts and toasts
- **Inline alert** for anything bound to a form or a region. Semantic tint, 1px border, 3px semantic left edge, filled glyph.
- **Toast** for confirmations only: bottom-right, 4s, **one at a time**, `--shadow-pop`, 3px semantic edge. **MUST NOT** be used for an error that requires action — that is an inline alert.
- The report notes toasts currently use mixed Chakra defaults. One shared helper, one duration.

### 7.6 Forms
- Uppercase micro-label above the field, always visible. Placeholders are examples, never labels.
- Field height 40px, `--control-border`, `8px` radius.
- Money inputs: right-aligned, mono, formatted on blur.
- Validate on blur; re-validate live only after a field has already errored.
- Errors use `aria-describedby` + `aria-invalid`, and state the fix.

### 7.7 Tables
- Header: mono uppercase, tracked, `--panel` background, sticky.
- First column is the identifier and links to detail. Money columns right-aligned and mono.
- Row hover `--panel`; selected row `--panel-2` with a 3px accent inset edge.
- No zebra striping — hairline rules.
- Every table ships with: a result count, sort indicators, an empty state, a **skeleton**, and an error state.

### 7.8 Loading
**Skeletons, not spinners**, for anything over 300ms. The skeleton **MUST** match the shape of the arriving content so the layout does not jump. Spinners survive only inside a button that is already mid-action.

### 7.9 Empty states
Phosphor glyph at 48px in `--text-3`, a `display-2` line stating the situation, one line of `body-sm`, and one action. Empty screens are invitations, not apologies.

### 7.10 Motion
| Token | Duration | Use |
|---|---|---|
| `--dur-1` | 90ms | Hover, colour, border |
| `--dur-2` | 150ms | Tooltips, dropdowns, tags |
| `--dur-3` | 220ms | Modals, drawers, theme change |

Easing `cubic-bezier(.32,.72,.28,1)`.

**MUST** — animate only `transform` and `opacity`; honour `prefers-reduced-motion` by replacing movement with a ≤90ms opacity change.

**MUST NOT** — bounce, elastic or spring overshoot anywhere. The report flags the bonus popup's bounce and confetti; that becomes a 220ms opacity-and-scale settle that respects reduced motion.

---

## 8. Accessibility

**Target: WCAG 2.2 AA, verified in both themes.** Every pairing in §3 was measured, not estimated.

**MUST**
- Text ≥ 4.5:1; large text and component boundaries ≥ 3:1 — **in light and in dark**.
- Every rail and icon-only control labelled, with a tooltip on hover and focus.
- Modal focus trap, `Esc` to close, focus returns to the trigger.
- Touch targets ≥ 44px; the mobile bottom bar uses 48px.
- Usable at 200% zoom; reflows at 320px with no horizontal scroll.
- Countdowns announce via `aria-live="polite"` at 10 minutes remaining and at unlock — **not on every tick**.
- Theme follows the OS on first load, then remembers the vendor's choice.

**Release gate — six checks, every feature:**
1. axe-core: zero critical or serious, **run in both themes**
2. Keyboard-only pass of the primary flow
3. Screen reader pass — NVDA and VoiceOver
4. 200% zoom and 320px reflow
5. Greyscale test — still fully readable with colour removed
6. Theme-parity diff — the same screen captured light and dark, reviewed side by side

---

## 9. Definition of Ready / Done

**Ready (design → engineering)**
- [ ] Designed at 375 / 768 / 1440, **in both themes**
- [ ] All nine states present, including `locked`
- [ ] Empty, skeleton, error, zero-balance and long-value variants included
- [ ] Every value maps to a semantic token — no raw hex, no detached styles
- [ ] Final copy written; no lorem, no Title Case, no exclamation marks
- [ ] Money formatting specified: grouping, decimals, sign, timezone
- [ ] Accessibility notes: tab order, ARIA, focus management, live regions

**Done (engineering → QA)**
- [ ] Matches spec within 2px at all three breakpoints, both themes
- [ ] Zero hard-coded colours; theme toggle re-renders the screen correctly
- [ ] Keyboard and screen reader passes complete
- [ ] axe-core clean in both themes; Lighthouse Accessibility ≥ 95
- [ ] Reduced-motion path implemented
- [ ] Skeleton, empty and error states verified with the network throttled
- [ ] Component in Storybook with all nine states × two themes

---

## 10. Governance

| Role | Responsibility |
|---|---|
| Design Lead | Owns the system; approves token and component changes |
| Frontend Lead | Owns implementation and token naming |
| Product | Owns priority and acceptance criteria |
| QA | Owns the six-check release gate |

**Change control:** open a `design-system` issue with the problem, evidence it cannot be solved with existing components, and a proposal. Triage within three working days as **Reuse / Extend / Add**. New components need two real use cases. Approved changes ship with all nine states, both themes, docs and a version bump.

**Versioning:** major = breaking token change, 30 days notice with a migration guide · minor = additive · patch = bug and accessibility fixes.

**Quarterly metrics:** token adoption, raw-hex count in the codebase, design-QA defects per feature, axe violations in production, theme-parity defects.

---

## Appendix A — Token reference

```css
:root{
  --rv-navy:#0A3681; --rv-orange:#FF5F03;

  /* light */
  --bg:#FFFFFF; --panel:#F4F7FC; --panel-2:#EAF0F9;
  --hairline:#DCE3F0; --border:#C9D4E8; --control-border:#7A88A3;
  --text:#0B1424; --text-2:#3D4B68; --text-3:#5A6883;
  --brand:#0A3681; --brand-hover:#072B67; --brand-on:#FFFFFF;
  --accent:#FF5F03; --accent-hover:#EE5800; --accent-on:#0B1424; --accent-text:#D24E00;
  --ok:#0B7350; --ok-bg:#E4F4EC; --ok-bd:#A8DCC6;
  --warn:#8A5205; --warn-bg:#FBF1DC; --warn-bd:#EBCF9A;
  --bad:#B8112F; --bad-bg:#FCEAEE; --bad-bd:#F3B7C2;
  --note:#14479C; --note-bg:#E6EDFB; --note-bd:#BBD0F4;
  --rail:#05204F;

  /* type */
  --f-display:"Archivo",system-ui,sans-serif;
  --f-body:"Figtree",system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  --f-num:"JetBrains Mono",ui-monospace,SFMono-Regular,Menlo,monospace;

  /* structure */
  --r-structure:4px; --r-control:8px; --r-tag:999px;
  --rail-w:72px; --row-h:48px; --pad-panel:22px; --gap-block:22px;
  --dur-1:90ms; --dur-2:150ms; --dur-3:220ms;
  --ease:cubic-bezier(.32,.72,.28,1);
}
[data-theme="dark"]{
  --bg:#070C18; --panel:#0E1626; --panel-2:#16203A;
  --hairline:#1E2A45; --border:#22304F; --control-border:#5A6C90;
  --text:#E8EDF7; --text-2:#C3CDE2; --text-3:#9AA9C4;
  --brand:#2E63D8; --brand-hover:#3B6FE0; --brand-on:#FFFFFF;
  --accent:#FF6A1F; --accent-hover:#FF8038; --accent-on:#0B1424; --accent-text:#FF8038;
  --ok:#3ECF9A; --warn:#F2C14E; --bad:#FF6B7A; --note:#7BA5F5;
  --rail:#050912;
}
[data-density="compact"]{ --row-h:36px; --pad-panel:14px; --gap-block:14px; }
```

## Appendix B — Measured contrast

**Light**
| Pair | Ratio | Verdict |
|---|---|---|
| `--text` on `--bg` | 18.42 | AAA |
| `--text-2` on `--bg` | 8.73 | AAA |
| `--text-3` on `--bg` | 5.61 | AA |
| `--brand` on `--bg` | 11.31 | AAA |
| `--brand-on` on `--brand` | 11.31 | AAA |
| `--control-border` on `--bg` | 3.57 | Passes SC 1.4.11 |
| `--accent` on `--bg` | 3.05 | **Non-text only** |
| `--accent-on` on `--accent` | 6.05 | AA |
| `--accent-text` on `--bg` | 4.35 | AA |
| `--ok` / `--warn` / `--bad` on tint | 5.46 / 5.94 / 6.19 | AA |

**Dark**
| Pair | Ratio | Verdict |
|---|---|---|
| `--text` on `--panel` | 15.40 | AAA |
| `--text-2` on `--panel` | 11.32 | AAA |
| `--text-3` on `--panel` | 7.62 | AAA |
| `--brand-on` on `--brand` | 5.40 | AA |
| `--control-border` on `--panel` | 3.43 | Passes SC 1.4.11 |
| `--accent` on `--panel` | 6.31 | AA |
| `--accent-text` on `--panel` | 7.23 | AAA — orange as text is allowed here |
| `--ok` / `--warn` / `--bad` on `--panel` | 9.12 / 10.77 / 6.57 | AAA / AAA / AA |
| Focus ring on `--bg` | 6.82 | Passes |
