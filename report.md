# Rouvin vendor console — frontend blueprint and UI design report

**Product:** Rouvin vendor web app (authenticated console)  
**Scope:** Frontend vendor side only  
**Design system:** Rouvin DS v1.0 (`sop.md` + `rouvin-design-system.html`)  
**Date:** 25 August 2026  
**Status:** Implemented baseline — vendor chrome and primary surfaces restyled; some nested wallet/sell components still use older Chakra defaults

This report is a page-by-page inventory of what a vendor actually sees: layout, controls, popups, empty/loading/error states, and how each maps to the Rouvin design system.

---

## 1. How to read this document

- **Shell** is shared. Every listed vendor route except unrouted leftovers sits inside `VendorShell`.
- **Primary** = navy fill, white text (`#0A3681` / `#FFFFFF`). One main action per region.
- **Accent** = orange fill, dark ink text (`#FF5F03` / `#0E1729`). Conversion moments only. White-on-orange is forbidden.
- **Secondary** = white fill, navy text, slate border.
- **Tertiary / ghost** = transparent, navy or ink text, slate hover wash.
- **Destructive** = crimson `#B8112F`, white text. Must name the object in the confirm copy.
- Sentence case is the product standard. Leftover title-case strings are called out as gaps.

---

## 2. Visual system in force

| Token | Value | Vendor use |
|---|---|---|
| Navy 700 (brand primary) | `#0A3681` | Primary buttons, page titles, active chrome |
| Navy 900 | `#05204F` | Sidebar |
| Orange 500 (accent) | `#FF5F03` | Accent buttons, route line, chart series 2, focus ring |
| Orange 700 | `#D24E00` | Orange *text* on light (the only passing orange text at 16px) |
| Ink 900 | `#0E1729` | Body text; text on orange fills |
| Slate 050 | `#F7F9FC` | Page background |
| Slate 200 | `#DDE3EE` | Card and table borders |
| Success | `#0B7350` on `#E6F6F0` | Approved, profit, delivered-style states |
| Warning | `#8A5205` on `#FDF3E0` | Pending / blocked — never brand orange |
| Error | `#B8112F` on `#FDECEF` | Failures, insufficient funds, cancel |
| Display type | Sora 600/700 | Page titles (`h1`/`h2`/`h3`) |
| UI type | IBM Plex Sans 400/500/600 | Body, buttons, labels |
| Mono | IBM Plex Mono | IDs, codes |
| Radius default | 10px | Buttons, cards, inputs |
| Sidebar | 264px | Desktop left nav |
| Top bar | 64px sticky | Breadcrumb + account |
| Route line | 2px navy → orange | Under the top bar; 3px orange left edge on active nav |

Focus ring on vendor surfaces: `3px solid #FF5F03`, offset 2px.  
Colour budget: ~60% neutral / 30% navy / 10% orange.

---

## 3. Shared chrome (every vendor page)

**Files:** `frontend/src/components/layout/VendorShell.jsx`, `VendorNavBar.jsx`

### 3.1 Skip link
- **Skip to content** — visually hidden until focused. Jumps to `#rv-content`.

### 3.2 Left navigation (desktop always; mobile as a left drawer)

| Control | Type | Destination / action | Style |
|---|---|---|---|
| Logo (inverted lockup) | Image | Brand only | White knockout on navy-900 |
| Dashboard | Nav link | `/vendor/dashboard` | Lucide `layout-dashboard` |
| Products | Nav link | `/vendor/products` | Lucide `package` |
| Wild products | Nav link | `/vendor/wild-products` | Lucide `leaf` |
| Purchases | Nav link | `/vendor/purchase-history` | Lucide `file-text` |
| Wallet | Nav link | `/vendor/wallet` | Lucide `wallet` |
| Claims | Nav link | `/vendor/wallet?view=earnings` | Lucide `gift` |
| Profile | Nav link | `/vendor/profile` | Lucide `user` |
| Log out | Button | Clears session, goes to login | Crimson text |
| Theme toggle | Icon button | Light / dark | Ghost on navy chrome |

**Active item:** 10% white wash, filled icon, 3px orange route line on the left edge.  
**Hover:** 7% white wash, white text.  
**Touch target:** min 44px.  
**Mobile:** hamburger in the top bar opens the same nav in a drawer. Overlay `rgba(6,11,22,.48)`. Tapping a link closes the drawer.

### 3.3 Top bar (64px, sticky, white)

| Control | Type | Notes |
|---|---|---|
| Open menu | Icon button | Mobile only. Lucide `menu`. Ghost navy. |
| Logo | Image | Desktop `lg+`. Min 120px wide. `/rouvin.png` |
| Breadcrumb | Text | `Vendor / {page}` |
| Bell | Decorative icon | Not wired to a notifications feed |
| Account name | Text | `vendorName` or email |

A 2px route line sits under the bar (navy turning orange).

### 3.4 Page title
One `h1` per page, Sora 600, navy-700, 25/32px mobile and 31/40px desktop.

---

## 4. Vendor sitemap

| Route | Page | File | In nav |
|---|---|---|---|
| `/vendor/dashboard` | Dashboard | `pages/vendor/VendorDashboard.jsx` | Yes |
| `/vendor/products` | Products | `pages/vendor/BuyProduct.jsx` | Yes |
| `/vendor/wild-products` | Wild products | `pages/vendor/WildProductTradingPage.jsx` | Yes |
| `/vendor/purchase-history` | Purchase history | `pages/vendor/PurchaseHistoryPage.jsx` | Yes |
| `/vendor/wallet` | Wallet | `pages/WalletPage.jsx` | Yes |
| `/vendor/wallet?view=earnings` | Wallet → Earnings (Claims) | same | Yes (Claims) |
| `/vendor/profile` | Profile | `pages/vendor/VendorProfile.jsx` | Yes |
| `/vendor/activity` | Recent activity | `pages/vendor/RecentActivityPage.jsx` | No — reached from dashboard |
| `/vendor/referrals` | My referrals | `pages/vendor/MyReferralsPage.jsx` | No — not linked from current dashboard widget |
| `/product-trading` | Product trading (legacy QR flow) | `pages/vendor/ProductTradingPage.jsx` | No — not in sidebar |
| *(unrouted)* | Vendor all-vendors widget | `pages/vendor/AllVendorsPage.jsx` | Not mounted in `App.jsx` |

All of the above except the unrouted file require `ProtectedRoute role="vendor"`.

---

## 5. Page blueprints

### 5.1 Dashboard — `/vendor/dashboard`

**Purpose:** Home for an 8-hour ops session. Greeting, shortcuts, trading stats, financial snapshot, charts, recent activity.

**Layout (top → bottom)**
1. Shell `h1`: Dashboard  
2. Greeting row (avatar, name, copyable vendor ID)  
3. Four shortcut buttons  
4. Six stacked stat cards + profit banner  
5. Financial snapshot (4 KPIs)  
6. Two charts (earnings growth, earnings sources)  
7. Recent activity list (last 5)

#### Buttons and clickable surfaces

| Control | Opens / goes to | Variant | Notes |
|---|---|---|---|
| Vendor ID text | Copies ID | Text, not a button | Success toast “ID Copied!” |
| Wallet | `/vendor/wallet` | Ghost + navy icon tile | Primary shortcut |
| Refer | Add member modal | Ghost + orange icon tile | Accent shortcut (max one accent in this region) |
| Chat | WhatsApp (`wa.me`) | Ghost + slate icon tile | New tab |
| Request | Product request modal | Ghost + slate icon tile | |
| Products available to buy | `/vendor/products` | Whole card is clickable | |
| Wild products available | `/vendor/wild-products` | Card | |
| My approved purchases | `/vendor/purchase-history` | Card | |
| Total spent | `/vendor/purchase-history` | Card | |
| Items ready to sell | `/vendor/wallet` | Card | |
| View more (activity) | `/vendor/activity` | Secondary sm | |

**Profit banner:** navy-700 panel, orange 3px left route line, white tabular amount. Not a button.

#### Popups

**Add a new member** (`AddMemberModal`)
- Trigger: Refer  
- Body: referral URL (`/register?ref={id}`)  
- Buttons: **Copy** (secondary → accent when copied), **Cancel** (secondary), **Log out and register** (accent)  
- Accent action logs the vendor out and sends them to the referral registration URL  
- Close: X, Cancel, overlay click (Chakra default)

**Request products** (`ProductRequestModal`)
- Trigger: Request  
- Loading: “Checking for existing requests…”  
- If a pending request exists: warning alert (amount, pending tag, created time). Submit hidden. Only **Cancel**  
- Else: info guidelines; **Amount (₹)** required number field (max = wallet balance); **Remarks** optional textarea  
- Buttons: **Cancel** (secondary), **Submit request** (accent, loading “Submitting…”)  
- Toasts: “Request Submitted” / “Submission Error”  
- Client errors: amount over balance, amount ≤ 0, already pending

#### Data widgets

| Widget | Empty | Loading | Error |
|---|---|---|---|
| Financial snapshot | Zero rupees | Spinner in card | Error text in card |
| Earnings growth | 48px-style empty: icon + “No earnings data to display yet.” | Spinner | Error text |
| Earnings sources | “No earnings sources to show.” | Spinner | Error text |
| Recent activity | “No recent activity.” | Spinner | Error text |

Charts: navy `#0A3681` line with orange dots; pie uses SOP sequence navy → orange → navy-500 → …

---

### 5.2 Products — `/vendor/products`

**Purpose:** Buy listed paper/stock products from wallet.

**Layout**
- `h1`: Products  
- Loading: centred navy spinner  
- Empty: `package-x` icon, “No products available”, one line of help, **Refresh** (primary)  
- Grid: 1 / 2 / 3 / 4 columns by breakpoint

**Product card**
- Image (150px), name, size, available units, profit (success green), selling days (orange-700 text), buy price (navy)  
- **Buy stock** (accent, full width) or **Out of stock** (disabled)

**Popup — Buy stock: {paper type}**
- Quantity stepper (1 … remaining quota or available stock)  
- Live total cost vs wallet balance  
- Insufficient funds: error text, Pay disabled  
- **Pay with Wallet** (accent, full width)  
- Close: X  
- Success toast then refresh list; error toast “Wallet Payment Error”

**Other toasts**
- Warning if the catalogue is closed by time window (“Products Not Available”)  
- Error on fetch failure

---

### 5.3 Wild products — `/vendor/wild-products`

**Purpose:** Buy GST-inclusive wild products from wallet.

**Layout**
- `h1`: Wild products  
- Intro line when stock exists  
- Grid of cards: image, name, base / selling / GST / final / profit, available badge, selling-days badge, **Buy now** (accent) or **Out of stock**

**Empty**
- Lucide `package` 48px, slate-400  
- “No wild products available”  
- “Nothing is listed right now. Refresh to check again.”  
- **Refresh** (primary, can show loading)

**Error:** inline error alert (error tint + border)

**Popup — wild product purchase**
- Price per unit, GST breakdown, profit, quantity stepper, total, wallet balance  
- Insufficient funds: error text  
- **Pay with Wallet** (accent, loading “Processing…”)  
- Same wallet execute pattern as products

**Toast:** warning when the wild-product window is closed.

---

### 5.4 Purchase history — `/vendor/purchase-history`

**Purpose:** Transaction log of the vendor’s buys.

**Layout**
- `h1`: Purchase history  
- Card: search field, divider, table (desktop) or stacked cards (mobile)

**Controls**

| Control | Type | Behaviour |
|---|---|---|
| Search | Text input | Filters product, qty, amount, status, comment, date |
| Status badge | Display | Approved (green) / Rejected (red) / Pending (yellow) |

No primary action on this page. It is a read surface.

**Empty:** info alert — “You have no purchase history.” or “No purchases match your search.”  
**Loading:** centred spinner  
**Error:** error alert inside the shell  
**Rejected rows:** optional admin comment in an error alert on mobile cards

Numeric columns use tabular figures. Dates are IST via `formatISTDate`.

---

### 5.5 Wallet — `/vendor/wallet`

**Purpose:** Balance, add/withdraw, hold/sell trades, claims, earnings, deposit and withdrawal history.

**Deep link:** `?view=earnings` opens the Earnings tab and marks **Claims** active in the sidebar. Other views: `investments` (default), `history`, `claims`, `deposits`, `withdrawals`.

#### Header

| Control | Variant | Behaviour |
|---|---|---|
| Balance | Display | `₹ x,xxx.xx` tabular |
| Add | Primary + plus icon | Opens Add money modal |
| Withdraw | Accent + banknote | Hidden for 2s on mount; disabled if a withdrawal is pending or the window is closed. Disabled click still fires a warning toast. |

#### Tab strip (3 cols mobile, 6 desktop)

Icons only on mobile (tooltip). Label + icon on `md+`.  
Active tab: navy-100 fill, navy-700 text, 3px orange inset left edge (route line).  
Inactive: white, slate border.

| Tab | Content |
|---|---|
| Investments | Active trades with countdown / **Sell now** |
| History | Sold trades + total profit summary |
| Claims | Initial referral-bonus claims (`InitialClaimsPage`) |
| Earnings | Unclaimed / history commissions (`ReferralPage`) |
| Deposits | Approved / pending / rejected lists |
| Withdrawals | Approved / pending / rejected / cancelled; pending rows can cancel |

#### Investments — per trade

- Product image, name, qty, purchase price, current selling price  
- If locked: countdown until sell unlock; list polls until unlock  
- If unlocked: **Sell now** (`variant="rvAccent"`, loading “Selling”)  
- Empty: “You have no active investments.”

#### History
- Sold trade rows (read-only)  
- Profit summary panel (green if ≥ 0, red if not)  
- Empty: “You have not sold any items yet.”

#### Claims (`InitialClaimsPage`)
- List of referred users with **Claim bonus** (accent) per row  
- Claimed rows: orange “Claimed” tag  
- Loading / empty handled in-page

#### Earnings (`ReferralPage`)
- **Claim all earnings** (accent, lg)  
- Sub-tabs: **Unclaimed (n)** / **History (n)** (navy primary when selected, orange bottom rule)  
- Table of commission rows on desktop

#### Deposits / withdrawals
- Grouped lists by status  
- Withdrawal **pending** rows: **Cancel** (red outline sm) → confirmation modal

#### Wallet popups

**Add money to wallet**
- Info alert: redirect to payment gateway  
- Amount (₹), min from config  
- **Cancel** (ghost), **submit** (accent, “Processing…”)  
- On success: browser redirect to Easebuzz `payment_url`  
- Then parent refreshes balance, deposit history, switches to Deposits tab

**Request a withdrawal**
- Info: processed in 3 bank working days; min ₹50, max ₹25,000  
- Amount field  
- **Cancel** (ghost), **Submit Request** (accent)  
- Success toast; parent disables Withdraw and jumps to Withdrawals

**Confirm sale** (`SellOffersModal`)
- Trigger: Sell now  
- Summary: product, qty, price per unit, total  
- **Confirm Sell** (green — **gap:** not navy/accent tokens), **Cancel** (ghost gray)  
- On accept: POST sell; if bonus, Bonus popup; else success toast “Sold”

**Bonus popup** (`BonusPopup`)
- Auto after a sale with `has_bonus`  
- Confetti / bounce animation (**gap:** SOP forbids bounce/elastic in the Console)  
- Coins / gift / star icons from `react-icons` (**gap:** Lucide-only)  
- Closes on overlay / timeout pattern in that component

**Cancel withdrawal request** (`ConfirmationModal`)
- Trigger: Cancel on a pending withdrawal  
- Copy names the amount: “Are you sure you want to cancel your withdrawal request of ₹{amount}?”  
- **Keep Request** / **Yes, Cancel Request** (red, loading “Cancelling…”)  
- Warning alert type + triangle icon (correct: warning is mustard, not orange)

**Toasts:** wallet load errors, sell errors, withdrawal unavailable, cancel success/fail.

---

### 5.6 Profile — `/vendor/profile`

**Purpose:** View identity and bank details. The only edit is the passport photo.

**Layout**
- `h1`: Profile  
- Toolbar right: **Edit photo** (accent) or **Cancel** (secondary) + **Save changes** (primary, disabled until a file is chosen)  
- Left card: avatar, name, email, phone  
- Right card: Aadhar, PAN, address, bank name / account / IFSC (read-only inputs)

**While editing**
- **Change Photo** — opens hidden file input (`image/*`)  
- Preview replaces avatar immediately

**Popup — Confirm changes** (`AlertDialog`)
- “Are you sure you want to save these changes to your profile?”  
- **Cancel** (secondary), **Save** (primary)  
- Success toast “Profile Updated”; failure toast with server message

Bank fields are display-only. There is no vendor-side bank edit.

---

### 5.7 Recent activity — `/vendor/activity`

**Purpose:** Full activity feed (dashboard shows 5).

**Controls**
- Search (type, amount, date, UPI ID, description) — leading search icon navy  
- Rows: type tag, IST timestamp, description, signed amount (success green / error crimson)

No modal. Empty: “No matching activity.” Loading spinner. Error text in crimson.

Not in the sidebar; reached from Dashboard → View more.

---

### 5.8 My referrals — `/vendor/referrals`

**Purpose:** Full referral list.

**Controls**
- Count line: “Total referrals: **n**”  
- Search by name, amount, purchases, email, id  
- Row: avatar, name, spend (success), purchase count

No modal. Empty: “No matching referrals.”

**Gap:** dashboard referral widget is commented out, so this route has no in-product entry except a direct URL.

---

### 5.9 Product trading (legacy) — `/product-trading`

**Purpose:** Older two-step buy: quantity then UPI proof. Not in the sidebar.

**Card:** image, size/GSM, available units, selling days, price, **Buy stock** (accent)

**Popup — two steps**
1. Quantity → **Proceed to payment** (accent) / **Cancel** (ghost)  
2. Amount alert, QR image `/images/payment-qr-code.png`, transaction ID field → **Submit and complete payment** (primary) / **Cancel**

This flow is parallel to wallet-pay on `/vendor/products`. Treat as legacy unless product still requires UPI proof.

---

### 5.10 Unrouted: `AllVendorsPage.jsx` (vendor folder)

Exists as a vendor-style directory/table with search, Excel download, and a “View all” / vendor-detail modal. **Not registered in `App.jsx`.** Do not treat as a live vendor screen until it is mounted and wrapped in `VendorShell`.

---

## 6. Popup and overlay inventory

| ID | Component | Pages | Kind | Primary / accent / destructive |
|---|---|---|---|---|
| P1 | Mobile nav drawer | All shelled pages | Drawer | N/A |
| P2 | Add a new member | Dashboard | Modal | Accent: Log out and register |
| P3 | Request products | Dashboard | Modal | Accent: Submit request |
| P4 | Buy stock (wallet) | Products | Modal | Accent: Pay with Wallet |
| P5 | Buy wild product | Wild products | Modal | Accent: Pay with Wallet |
| P6 | Add money | Wallet | Modal | Accent: submit → gateway redirect |
| P7 | Request a withdrawal | Wallet | Modal | Accent: Submit Request |
| P8 | Confirm sale | Wallet investments | Modal | **Gap:** green Confirm Sell |
| P9 | Bonus popup | After sell | Modal + motion | Display |
| P10 | Cancel withdrawal | Wallet withdrawals | Confirm modal | Destructive red |
| P11 | Confirm profile photo | Profile | Alert dialog | Primary: Save |
| P12 | Legacy purchase / proof | `/product-trading` | Modal, 2 steps | Accent then primary |
| — | Chakra toasts | Many | Bottom-right default | Success / warning / error |

SOP toast spec: bottom-right, 4s auto-dismiss, max one at a time, `elev-2`, 3px semantic left border, never for errors that need action. Current toasts use Chakra defaults (closable, mixed durations). Inline alerts are used correctly for form-bound errors.

---

## 7. Button variant map (vendor)

| Variant | Fill | Text | Hover | Code |
|---|---|---|---|---|
| Primary | navy-700 | white | navy-800 | `rvPrimary` / `rvPrimaryBtn` |
| Accent | orange-500 | ink-900 | orange-600 | `rvAccent` / `rvAccentBtn` |
| Secondary | white | navy-700 | slate-050 | `rvSecondary` / `rvSecondaryBtn` |
| Ghost / tertiary | transparent | ink / navy | slate-100 | Chakra `ghost` + token hover |
| Destructive | `#B8112F` | white | `#960D26` | `rvDanger` or `colorScheme="red"` |

Sizes in the SOP: sm 32px / md 40px / lg 48px. Vendor headers sometimes use `size="sm"` on narrow viewports.

---

## 8. Empty, loading, error pattern

| Pattern | SOP | Vendor implementation |
|---|---|---|
| Empty | 48px slate-400 icon, h4 situation, one line body-sm, one primary action | Products and wild products match. Wallet tabs are text-only. Charts match in spirit. |
| Loading > 300ms | Skeleton matching layout | Spinners, not skeletons |
| Background refresh | 2px orange route line | Not implemented on tables |
| Error | What happened + what to do | Mix of toasts and inline alerts; some messages are raw API strings |
| Offline | Required in DoR | Not implemented |

---

## 9. Gaps versus SOP (vendor)

These are the remaining design-QA items if the next pass is a polish cycle:

1. **Bell** in the top bar is decorative — no notifications, no `aria-label` on a control.  
2. **Bonus popup** uses bounce, confetti, and `react-icons` — SOP: Lucide only, no bounce, honour reduced motion.  
3. **Confirm sale** still uses green `colorScheme` instead of navy primary.  
4. **Withdrawal cancel** uses outline red; confirm modal is correct destructive, but list button is not `rvDanger`.  
5. **Add money / withdraw** Cancel buttons are still Chakra `ghost`, not `rvSecondary`.  
6. **Skeletons** not used; spinners remain.  
7. **Toasts** not fully SOP (duration, single-toast, semantic 3px bar).  
8. **`/vendor/referrals`** has no nav or dashboard entry.  
9. **`/product-trading`** is a second buy path outside the IA.  
10. **Theme toggle** is global Chakra colour mode; SOP dark mode (v1.1) is Console-only and not fully tokenised.  
11. **Sentence case** is applied on new chrome; some older headings remain Title Case (“Active Investments”, “Request a Withdrawal”).  
12. **Exclamation marks** remain in a few toasts (“ID Copied!”). SOP: none in product.  
13. **Focus trap / Esc** rely on Chakra Modal defaults — generally fine; not separately audited.  
14. **Tables** (purchase history, earnings) do not yet use overline headers + sticky + result count as specified in §8.5.  
15. **AllVendorsPage** in the vendor folder is dead code for this role.

---

## 10. File map (vendor frontend)

```
frontend/src/theme/tokens.json          Token source of truth
frontend/src/theme/tokens.css           CSS variables + .rv-vendor scope
frontend/src/theme/rv.js                JS helpers (RV, button presets)
frontend/src/theme/index.js             Chakra palettes + rv* button variants
frontend/src/components/layout/VendorShell.jsx
frontend/src/components/layout/VendorNavBar.jsx
frontend/src/pages/vendor/VendorDashboard.jsx
frontend/src/pages/vendor/BuyProduct.jsx
frontend/src/pages/vendor/WildProductTradingPage.jsx
frontend/src/pages/vendor/PurchaseHistoryPage.jsx
frontend/src/pages/vendor/VendorProfile.jsx
frontend/src/pages/vendor/RecentActivityPage.jsx
frontend/src/pages/vendor/MyReferralsPage.jsx
frontend/src/pages/vendor/ProductTradingPage.jsx
frontend/src/pages/WalletPage.jsx
frontend/src/components/vendordashboard/*
frontend/src/components/vendor/ProductRequestModal.jsx
frontend/src/components/wallet/*
frontend/src/components/common/SellOffersModal.jsx
frontend/src/components/common/ConfirmationModal.jsx
frontend/src/components/common/BonusPopup.jsx
```

---

## 11. Suggested QA walk (vendor)

1. Login as vendor. Confirm skip link, sidebar 264px, top bar 64px, route line.  
2. Dashboard: copy ID, Wallet, Refer (copy + cancel), Chat (WhatsApp), Request (submit + pending lock).  
3. Click each stat card; land on the right route.  
4. Products: empty refresh; buy with too little balance; buy success.  
5. Wild products: same.  
6. Purchase history: search, desktop table, mobile cards, rejected comment.  
7. Wallet: Add (gateway redirect in staging), Withdraw limits, Sell now → confirm → bonus if any, cancel pending withdrawal (named amount).  
8. Profile: edit photo, cancel, save confirm.  
9. Keyboard: tab through header, one modal open/Esc/focus return.  
10. 375 / 768 / 1440 widths; 200% zoom; reduced-motion OS setting.

---

*End of report. Visual tokens win from `rouvin-design-system.html`; process rules win from `sop.md`.*
