# Rouvin v1 → v2 “Ledger”
## Frontend migration instructions

**Scope:** `frontend/` only. No API contracts, no backend, no database, no route paths change.
**Stack in place:** React + Chakra UI, tokens in `theme/tokens.json` → `theme/tokens.css` → `theme/index.js`
**Read alongside:** `sop-v2.md` (rules) and `rouvin-ds-v2.html` (appearance)
**Estimated effort:** 8–11 working days for one frontend engineer, or 5–6 with two

---

## 0. Ground rules before anyone opens an editor

1. **Branch:** `feature/ds-v2-ledger`. Do not merge into `main` until Phase 7 passes.
2. **Feature flag it.** Add `VITE_DS_VERSION=v2` (or a `localStorage` override) and gate the shell swap on it. The client will want to see v1 and v2 side by side. Being able to flip back in one env var is what makes this a safe change rather than a scary one.
3. **Nothing outside `frontend/src` is touched.** Same routes, same API calls, same payload shapes. If a change needs a backend field, it is out of scope for this pass — log it.
4. **Zero raw hex.** By the end of Phase 2, `grep -rE "#[0-9A-Fa-f]{6}" frontend/src --include=*.jsx` should return nothing outside `theme/`. That single check is the difference between a real design system and a repaint.
5. **Do the phases in order.** Phases 1 and 2 make every later phase cheap. Reversing them makes every later phase manual.

---

## Phase 1 — The token layer (day 1)

**This is the highest-leverage change in the whole migration.** Everything else is downstream of it.

### 1.1 `frontend/src/theme/tokens.json`

Restructure from a flat palette into three layers. Components must only ever read layer 3.

```jsonc
{
  "brand":   { "navy": "#0A3681", "orange": "#FF5F03" },

  "light": {
    "bg": "#FFFFFF", "panel": "#F4F7FC", "panel2": "#EAF0F9",
    "hairline": "#DCE3F0", "border": "#C9D4E8", "controlBorder": "#7A88A3",
    "text": "#0B1424", "text2": "#3D4B68", "text3": "#5A6883",
    "brand": "#0A3681", "brandHover": "#072B67", "brandOn": "#FFFFFF",
    "accent": "#FF5F03", "accentHover": "#EE5800", "accentOn": "#0B1424", "accentText": "#D24E00",
    "ok": "#0B7350", "okBg": "#E4F4EC", "okBd": "#A8DCC6",
    "warn": "#8A5205", "warnBg": "#FBF1DC", "warnBd": "#EBCF9A",
    "bad": "#B8112F", "badBg": "#FCEAEE", "badBd": "#F3B7C2",
    "note": "#14479C", "noteBg": "#E6EDFB", "noteBd": "#BBD0F4",
    "rail": "#05204F"
  },

  "dark": {
    "bg": "#070C18", "panel": "#0E1626", "panel2": "#16203A",
    "hairline": "#1E2A45", "border": "#22304F", "controlBorder": "#5A6C90",
    "text": "#E8EDF7", "text2": "#C3CDE2", "text3": "#9AA9C4",
    "brand": "#2E63D8", "brandHover": "#3B6FE0", "brandOn": "#FFFFFF",
    "accent": "#FF6A1F", "accentHover": "#FF8038", "accentOn": "#0B1424", "accentText": "#FF8038",
    "ok": "#3ECF9A", "okBg": "rgba(62,207,154,.10)",  "okBd": "rgba(62,207,154,.34)",
    "warn": "#F2C14E", "warnBg": "rgba(242,193,78,.10)", "warnBd": "rgba(242,193,78,.32)",
    "bad": "#FF6B7A", "badBg": "rgba(255,107,122,.10)", "badBd": "rgba(255,107,122,.32)",
    "note": "#7BA5F5", "noteBg": "rgba(123,165,245,.10)", "noteBd": "rgba(123,165,245,.30)",
    "rail": "#050912"
  }
}
```

### 1.2 `frontend/src/theme/tokens.css`

Replace the `.rv-vendor` scope with `:root` + `[data-theme="dark"]`. Copy the block from **Appendix A of `sop-v2.md`** verbatim, then add the signature and density rules:

```css
/* the cut — signature device */
.rv-cut{ position:relative; clip-path:polygon(0 0, calc(100% - 18px) 0, 100% 18px, 100% 100%, 0 100%); }
.rv-cut::after{ content:""; position:absolute; top:0; right:0; width:18px; height:18px;
  background:linear-gradient(45deg, transparent 50%, var(--accent) 50%); }
.rv-cut-lg{ clip-path:polygon(0 0, calc(100% - 28px) 0, 100% 28px, 100% 100%, 0 100%); }
.rv-cut-lg::after{ width:28px; height:28px; }

[data-density="compact"]{ --row-h:36px; --pad-panel:14px; --gap-block:14px; }

*:focus-visible{ outline:2px solid var(--accent); outline-offset:3px; border-radius:var(--r-control); }
@media (prefers-reduced-motion:reduce){
  *,*::before,*::after{ animation-duration:.01ms!important; transition-duration:.01ms!important; }
}
```

### 1.3 Fonts

Remove Sora and IBM Plex. Add **Archivo** (500/600/700), **Figtree** (400/500/600), **JetBrains Mono** (400/500/700). Self-host as WOFF2 in `frontend/public/fonts/` with `font-display: swap` — do not rely on the Google CDN in production.

### 1.4 `frontend/src/theme/rv.js`

Rewrite the `RV` helper so it returns **CSS variable strings**, not hexes:

```js
export const RV = {
  bg: 'var(--bg)', panel: 'var(--panel)', panel2: 'var(--panel-2)',
  border: 'var(--border)', hairline: 'var(--hairline)', controlBorder: 'var(--control-border)',
  text: 'var(--text)', text2: 'var(--text-2)', text3: 'var(--text-3)',
  brand: 'var(--brand)', accent: 'var(--accent)', accentText: 'var(--accent-text)',
  ok: 'var(--ok)', warn: 'var(--warn)', bad: 'var(--bad)', note: 'var(--note)',
  fDisplay: 'var(--f-display)', fBody: 'var(--f-body)', fNum: 'var(--f-num)',
};
```

Every existing `RV.navy700`-style import keeps working if you alias the old names to the new variables for one release, then delete the aliases. That lets Phases 3–5 land page by page instead of in one enormous commit.

---

## Phase 2 — Chakra theme and button variants (day 1–2)

### 2.1 `frontend/src/theme/index.js`

```js
import { extendTheme } from '@chakra-ui/react';

const config = { initialColorMode: 'system', useSystemColorMode: false };

const shelf = { boxShadow: '0 2px 0 0 var(--btn-shelf)' };
const keycap = {
  borderRadius: 'var(--r-control)',
  fontFamily: 'var(--f-body)',
  fontWeight: 600,
  border: '1px solid transparent',
  transition: 'transform 90ms var(--ease), box-shadow 90ms var(--ease), background-color 90ms var(--ease)',
  ...shelf,
  _active: { transform: 'translateY(2px)', boxShadow: 'none' },
  _focusVisible: { outline: '2px solid var(--accent)', outlineOffset: '3px', boxShadow: 'none' },
  _disabled: { bg: 'var(--panel-2)', color: 'var(--text-3)', borderColor: 'var(--border)', boxShadow: 'none', opacity: .75 },
};

export default extendTheme({
  config,
  fonts: { heading: 'var(--f-display)', body: 'var(--f-body)', mono: 'var(--f-num)' },
  styles: { global: { body: { bg: 'var(--bg)', color: 'var(--text)' } } },
  components: {
    Button: {
      baseStyle: keycap,
      sizes: {
        xs: { h: '30px', px: '12px', fontSize: '13px' },
        sm: { h: '30px', px: '12px', fontSize: '13px' },
        md: { h: '38px', px: '16px', fontSize: '14px' },
        lg: { h: '46px', px: '22px', fontSize: '15px' },
      },
      variants: {
        rvSolid:  { '--btn-shelf': 'rgba(11,20,36,.28)',  bg: 'var(--brand)',  color: 'var(--brand-on)',  borderColor: 'var(--brand)',  _hover: { bg: 'var(--brand-hover)' } },
        rvAccent: { '--btn-shelf': 'rgba(122,44,0,.42)',  bg: 'var(--accent)', color: 'var(--accent-on)', borderColor: 'var(--accent)', _hover: { bg: 'var(--accent-hover)' } },
        rvQuiet:  { '--btn-shelf': 'var(--border)',       bg: 'var(--bg)',     color: 'var(--text)',      borderColor: 'var(--control-border)', _hover: { bg: 'var(--panel-2)' } },
        rvGhost:  { '--btn-shelf': 'transparent', boxShadow: 'none', bg: 'transparent', color: 'var(--text-2)', _hover: { bg: 'var(--panel-2)', color: 'var(--text)' }, _active: { transform: 'none' } },
        rvDanger: { '--btn-shelf': 'rgba(120,8,26,.42)',  bg: 'var(--bad)',    color: '#fff',             borderColor: 'var(--bad)',   _hover: { filter: 'brightness(1.08)' } },
      },
      defaultProps: { variant: 'rvQuiet', size: 'md' },
    },
    Input: {
      baseStyle: { field: {
        bg: 'var(--bg)', color: 'var(--text)',
        border: '1px solid var(--control-border)', borderRadius: 'var(--r-control)',
        _placeholder: { color: 'var(--text-3)' },
        _focusVisible: { borderColor: 'var(--accent)', boxShadow: '0 0 0 3px color-mix(in srgb, var(--accent) 22%, transparent)' },
      }},
      defaultProps: { variant: null },
    },
    Modal: { baseStyle: {
      dialog: { bg: 'var(--bg)', color: 'var(--text)', borderRadius: 'var(--r-structure)', border: '1px solid var(--border)' },
      overlay: { bg: 'rgba(6,11,22,.60)' },
    }},
  },
});
```

### 2.2 Bridge Chakra colour mode to `data-theme`

Chakra writes `chakra-ui-light` / `chakra-ui-dark` onto `<body>`. Your CSS variables key off `data-theme` on `<html>`. Bridge them once, in `App.jsx`:

```js
const { colorMode } = useColorMode();
useEffect(() => {
  document.documentElement.setAttribute('data-theme', colorMode);
}, [colorMode]);
```

Now `useColorMode()` toggles both systems at once and every component follows automatically.

### 2.3 Rename map

| Old | New | Notes |
|---|---|---|
| `rvPrimary` / `rvPrimaryBtn` | `rvSolid` | Same role |
| `rvAccent` / `rvAccentBtn` | `rvAccent` | Unchanged name, new anatomy |
| `rvSecondary` / `rvSecondaryBtn` | `rvQuiet` | |
| Chakra `ghost` | `rvGhost` | |
| `rvDanger` / `colorScheme="red"` | `rvDanger` | |
| `colorScheme="green"` | `rvAccent` | Report §5.5 — `Confirm Sell` |

A codemod handles most of it:
```bash
grep -rl 'rvPrimary\|rvSecondary\|colorScheme="green"' frontend/src \
  | xargs sed -i 's/rvPrimaryBtn/rvSolid/g; s/rvPrimary/rvSolid/g; s/rvSecondaryBtn/rvQuiet/g; s/rvSecondary/rvQuiet/g; s/colorScheme="green"/variant="rvAccent"/g'
```
Review the diff by hand — `colorScheme="green"` may also appear on non-button elements.

---

## Phase 3 — Icons (day 2)

```bash
npm uninstall lucide-react react-icons
npm install @phosphor-icons/react
```

Set the defaults once via context so no component passes `weight` manually:

```jsx
<IconContext.Provider value={{ size: 20, weight: 'bold' }}>
```

Active nav items and status glyphs pass `weight="fill"`.

### Swap map

| Where | v1 (Lucide) | v2 (Phosphor) |
|---|---|---|
| Dashboard | `layout-dashboard` | `SquaresFour` |
| Products | `package` | `Package` |
| Wild products | `leaf` | `Leaf` |
| Purchases | `file-text` | `Receipt` |
| Wallet | `wallet` | `Wallet` |
| Claims | `gift` | `Gift` |
| Earnings | — | `Coins` |
| Referrals | — | `UsersThree` |
| Profile | `user` | `UserCircle` |
| Buy | — | `ShoppingCart` |
| Sell / profit | — | `TrendUp` |
| Loss | — | `TrendDown` |
| Withdraw | — | `Bank` |
| Locked trade | — | `HourglassMedium` |
| Countdown | `clock` | `ClockCountdown` |
| Copy ID | — | `Copy` |
| Search | `search` | `MagnifyingGlass` |
| Filter | `sliders-horizontal` | `Funnel` |
| Export | `download` | `DownloadSimple` |
| Approved | `check-circle-2` | `CheckCircle` **fill** |
| Pending | `alert-triangle` | `Warning` **fill** |
| Rejected | `x-circle` | `XCircle` **fill** |
| Info | `info` | `Info` **fill** |
| Log out | — | `SignOut` |

**Delete outright:** `truck`, `route`, `map-pin`, `calendar-clock`, `life-buoy`. They were logistics icons for a product with no logistics.

**`react-icons` must be fully removed** — the report flags it in `BonusPopup.jsx`. Those coin/gift/star glyphs become Phosphor `Coins`, `Gift` and `Sparkle`.

---

## Phase 4 — The shell (day 2–4)

### 4.1 `components/layout/VendorNavBar.jsx` → rewrite as `VendorRail.jsx`

- 72px wide, `background: var(--rail)`, full height, sticky.
- Icon-only buttons, 48px targets, `aria-label` + tooltip on hover **and** focus.
- Active: `weight="fill"` glyph + `::before` 3px `var(--accent)` left edge + 13% white wash.
- Order: Dashboard · Products · Wild products · Purchases · Wallet · Claims · Referrals — then spacer — Profile · Log out.
- **Below `md`:** render as a fixed bottom bar with five items (Dashboard, Products, Wallet, Purchases, Profile) at 48px. Delete the hamburger drawer.

> **Fixes report gap #8:** Referrals gets a permanent rail entry, so `/vendor/referrals` is no longer reachable only by typing the URL.

### 4.2 `components/layout/VendorShell.jsx`

Replace the 64px top bar with the **context header**:

```
┌──────────────────────────────────────────────────────────────┐
│  Page title            [ Wallet ₹… │ Unrealised +₹… ]  ⌘K  ☾ │
│  Subtitle (date · IST)                                        │
│  ──────────────────────────────────────────────────────────── │
│  Tab strip                                                    │
└──────────────────────────────────────────────────────────────┘
```

- Sticky, `background: var(--bg)`, `border-bottom: 1px solid var(--hairline)`.
- Accepts `title`, `subtitle`, `tabs` and `actions` as props so every page stops rendering its own `h1`.
- The **balance strip** is a shared component reading from the wallet store, present on every authenticated route. Apply `.rv-cut`.
- Keep the skip link. Delete the breadcrumb.
- **Delete the decorative bell** (report gap #1) — an unlabelled control that does nothing costs trust. Reinstate it only when there is a real notifications feed.
- Drop the 2px route line entirely. It is v1's signature and it is retired.

### 4.3 New — `components/layout/CommandPalette.jsx`

`⌘K` / `Ctrl+K`. Searches products, held trades, purchases and payouts; runs actions (add money, request withdrawal, sell an unlocked trade). Focus-trapped, `Esc` closes, arrow keys navigate, `Enter` selects.

> **Replaces** the three separate page-level search fields on Purchase history, Recent activity and Referrals. Keep those local fields for one release, then remove.

### 4.4 New — `components/common/ThemeToggle.jsx` and `DensityToggle.jsx`

Both live in the context header. Theme follows the OS on first load (`initialColorMode: 'system'`), then persists the vendor's choice. Density persists to `localStorage` and sets `data-density` on `<html>`.

---

## Phase 5 — Shared components (day 4–6)

Build these in `components/common/` **before** touching pages. Every page edit afterwards becomes a delete-and-replace instead of a rewrite.

| Component | Replaces | Notes |
|---|---|---|
| `MoneyPanel.jsx` | Ad-hoc stat cards across dashboard and wallet | Props: `label`, `value`, `delta`, `cut`. Renders mono figure, applies `.rv-cut` when the value is currency |
| `Money.jsx` | Every inline `₹{x}` template literal | **Single formatter.** `en-IN` grouping, two decimals, true minus (U+2212), sign leading, `tabular-nums` |
| `StatusTag.jsx` | Chakra `Badge` | Mono uppercase, filled glyph, semantic set: approved / pending / rejected / locked / unlocked / cancelled |
| `Countdown.jsx` | Inline countdown logic in the wallet | `HH:MM:SS` mono; `aria-live="polite"` at 10 min and at unlock only — **never every tick** |
| `LedgerTable.jsx` | Hand-rolled tables in purchase history and earnings | Mono uppercase sticky header, right-aligned money, hairline rules, result count, sort, accent edge on selected rows |
| `Skeleton.jsx` | Every `<Spinner>` | Shape-matched shimmer |
| `EmptyState.jsx` | Text-only empties in wallet tabs | 48px Phosphor glyph + headline + one line + one action |
| `Alert.jsx` | Mixed Chakra alerts | 3px semantic left edge, filled glyph |
| `toast.js` | Scattered `useToast` calls | One helper: bottom-right, 4s, **one at a time**, 3px semantic edge. Errors needing action must use `Alert.jsx` instead |

> **Fixes report gaps #6 and #7** (spinners, inconsistent toasts) in one place rather than fourteen.

---

## Phase 6 — Pages (day 6–9)

Order matters: dashboard first, because it is what the client will look at.

### 6.1 `pages/vendor/VendorDashboard.jsx` — the restructure

The current page stacks seven blocks and reports the same money twice (six stat cards, then a four-KPI financial snapshot). Collapse to four:

| # | Block | Built from |
|---|---|---|
| 1 | **Position + Action queue**, two columns | New. Position = wallet + held + unrealised, `.rv-cut-lg`, with Add money / Withdraw. Queue = unlocked trades, pending withdrawals, rejected purchases |
| 2 | **One metric strip**, four tiles | Merges the six stat cards and the four snapshot KPIs. Deduplicate: keep products to buy, wild available, approved buys, total spent |
| 3 | Two charts | Keep; restyle to the §3.7 series order |
| 4 | Recent activity (5) + view all | Keep |

**Removed:** greeting row and copyable vendor ID → move into the profile menu on the rail. Four shortcut tiles → replaced by the command palette and the action queue, which are contextual rather than fixed.

**The action queue is the single most valuable addition.** In v1 nothing surfaced an unlocked trade, so a vendor could miss a sell window entirely. That is a revenue bug wearing a UI costume.

### 6.2 `pages/vendor/BuyProduct.jsx` and `WildProductTradingPage.jsx`
- Product card: image, name, spec, `Money` for buy price, `StatusTag` for availability, `rvAccent` full-width **Buy stock** stating the amount.
- Purchase modal: `.rv-cut-lg`, stepper from `Phase 5`, live total vs balance, shortfall stated in rupees.
- Replace the loading spinner with a skeleton grid of six cards.

### 6.3 `pages/vendor/PurchaseHistoryPage.jsx`
Swap the hand-rolled table for `LedgerTable`. Adds the result count, sticky mono header and sort — **closes report gap #14**. Keep the mobile card fallback; restyle to panels.

### 6.4 `pages/WalletPage.jsx`
- Header balance moves into the shared balance strip. The page keeps a larger `MoneyPanel` for detail.
- Tab strip moves into the context header — six tabs, `tabs` prop.
- Investments: `Countdown` for locked rows, `rvAccent` **Sell now** for unlocked. Locked rows show the countdown, never a bare disabled button (SOP §7.1, the `locked` state).
- `components/common/SellOffersModal.jsx`: green `Confirm Sell` → `rvAccent` **Sell now** (**gap #3**). Cancel → `rvQuiet` (**gap #5**).
- Withdrawal cancel button in the list → `rvDanger` (**gap #4**).
- Add money / Withdraw modal cancels → `rvQuiet` (**gap #5**).

### 6.5 `components/common/BonusPopup.jsx`
Strip the bounce and confetti. Replace with a 220ms opacity-and-scale settle on `--ease`, gated behind `prefers-reduced-motion`. Icons → Phosphor. **Closes gap #2.**

### 6.6 `pages/vendor/VendorProfile.jsx`
Read-only fields render as definition rows, not disabled inputs — a disabled input invites a click that does nothing. Keep the photo edit flow; restyle the confirm dialog.

### 6.7 `pages/vendor/RecentActivityPage.jsx` and `MyReferralsPage.jsx`
`LedgerTable`, signed `Money`, `StatusTag`. Referrals now has a rail entry (**gap #8**).

### 6.8 `pages/vendor/ProductTradingPage.jsx` — decide and act
This legacy UPI-proof flow is a second buy path outside the IA (**gap #9**). Either delete the route or move it behind an admin flag. Two ways to buy the same thing is a support burden, not a feature. **Get a decision from the client before the build starts.**

### 6.9 `pages/vendor/AllVendorsPage.jsx`
Dead code — not mounted in `App.jsx` (**gap #15**). Delete it.

### 6.10 Copy sweep across all pages
- Title Case → sentence case: “Active Investments”, “Request a Withdrawal”, “Submit Request”, “Confirm Sell”, “Keep Request” (**gap #11**).
- Remove every exclamation mark, starting with “ID Copied!” → “Vendor ID copied” (**gap #12**).
- Rewrite raw API error strings into the §2 format.

---

## Phase 7 — QA gate (day 9–11)

Nothing merges until all six pass, **run twice — once light, once dark**.

1. **axe-core** — zero critical or serious, both themes
2. **Keyboard only** — full vendor flow: log in → dashboard → buy → wallet → sell → withdraw → log out. One modal opened, `Esc`, focus returns to the trigger
3. **Screen reader** — NVDA and VoiceOver over the same flow. Countdowns must not spam the buffer
4. **Zoom and reflow** — 200% zoom, 320px width, no horizontal scroll
5. **Greyscale** — screenshot with colour removed; profit and loss still distinguishable
6. **Theme parity** — same screen captured in both themes, reviewed side by side

Plus the functional walk from report §11, run in both themes.

**Grep checks that must return nothing:**
```bash
grep -rE "#[0-9A-Fa-f]{6}" frontend/src --include=*.jsx      # raw hex
grep -rn "react-icons\|lucide-react" frontend/src            # dead icon libs
grep -rn "<Spinner" frontend/src/pages                       # spinners over skeletons
grep -rn "colorScheme=\"green\"\|colorScheme=\"red\"" frontend/src
```

---

## File-by-file summary

| File | Action | Phase |
|---|---|---|
| `theme/tokens.json` | Rewrite — three layers, two themes | 1 |
| `theme/tokens.css` | Rewrite — `:root` + `[data-theme]`, cut, density, focus | 1 |
| `theme/rv.js` | Rewrite — returns CSS variables | 1 |
| `theme/index.js` | Rewrite — keycap variants, semantic tokens, colour-mode config | 2 |
| `App.jsx` | Add colour-mode → `data-theme` bridge; unmount `/product-trading` if agreed | 2, 6 |
| `layout/VendorNavBar.jsx` | Replace with `VendorRail.jsx` | 4 |
| `layout/VendorShell.jsx` | Rewrite — context header, balance strip, no bell | 4 |
| `layout/CommandPalette.jsx` | **New** | 4 |
| `common/ThemeToggle.jsx`, `DensityToggle.jsx` | **New** | 4 |
| `common/MoneyPanel/Money/StatusTag/Countdown/LedgerTable/Skeleton/EmptyState/Alert/toast` | **New** | 5 |
| `vendor/VendorDashboard.jsx` | Restructure 7 blocks → 4 | 6 |
| `vendor/BuyProduct.jsx`, `WildProductTradingPage.jsx` | Restyle cards + modals | 6 |
| `vendor/PurchaseHistoryPage.jsx` | Swap to `LedgerTable` | 6 |
| `WalletPage.jsx` + `components/wallet/*` | Tabs to header, countdown, button variants | 6 |
| `common/SellOffersModal.jsx` | Green → accent; cancel → quiet | 6 |
| `common/ConfirmationModal.jsx` | Restyle; keep the named-amount copy | 6 |
| `common/BonusPopup.jsx` | Remove bounce; Phosphor icons | 6 |
| `vendor/VendorProfile.jsx` | Definition rows instead of disabled inputs | 6 |
| `vendor/RecentActivityPage.jsx`, `MyReferralsPage.jsx` | `LedgerTable` | 6 |
| `vendor/ProductTradingPage.jsx` | Delete or flag — **needs a decision** | 6 |
| `vendor/AllVendorsPage.jsx` | Delete — dead code | 6 |

---

## Report gaps closed by this migration

| # | Gap | Closed in |
|---|---|---|
| 1 | Decorative bell, no `aria-label` | 4.2 |
| 2 | Bonus popup bounce, confetti, `react-icons` | 3, 6.5 |
| 3 | Green `Confirm Sell` | 6.4 |
| 4 | Withdrawal cancel not `rvDanger` | 6.4 |
| 5 | Modal cancels still Chakra `ghost` | 6.4 |
| 6 | Spinners instead of skeletons | 5 |
| 7 | Toasts not to spec | 5 |
| 8 | `/vendor/referrals` orphaned | 4.1 |
| 9 | `/product-trading` second buy path | 6.8 |
| 10 | Dark mode untokenised | 1, 2.2 |
| 11 | Surviving Title Case | 6.10 |
| 12 | Exclamation marks | 6.10 |
| 13 | Focus trap unaudited | 7 |
| 14 | Tables missing overline / sticky / count | 6.3 |
| 15 | `AllVendorsPage` dead code | 6.9 |

**All fifteen.** Worth saying out loud in the client review — v2 is not only a new look, it clears the entire outstanding QA list.

---

## What to show the client, in this order

1. **Open `rouvin-ds-v2.html` in light mode.** Let them read the “what changed” table.
2. **Press the theme toggle.** The whole page re-renders. That single click is the strongest argument in the deck — it proves the system is tokenised rather than painted.
3. **Press a keycap button.** The 2px press is the detail people remember.
4. **Scroll to the dashboard before/after.** Seven blocks → four, with the duplicate money block removed and an action queue that stops vendors missing sell windows.
5. **Point at the cut.** Explain that it comes out of the diagonal in their own logo and that it means “money lives here”.
6. **Finish on the gaps table.** Fifteen open QA items, all closed.

Lead with the dashboard restructure and the action queue, not the colours. The restyle is what they will see first; the restructure is what will make them money.
