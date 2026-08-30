# Design System — SKIMS-Style Fashion E-Commerce
> Reference doc for this design system. Use this whenever building new pages, sections, or Shopify modules.

---

## 1. Brand Voice & Aesthetic

**Stance:** Editorial minimalism — clean white canvas, bold condensed type, generous whitespace. Every element earns its place.

**Tone:** Confident, inclusive, direct. Copy is short and declarative. No filler adjectives.

**Reference:** SKIMS.com — pure white backgrounds, uppercase bold headers, nude/sand product photography, zero ornamentation.

---

## 2. Typography

### Font Stack

| Role | Family | Weight | Style |
|------|--------|--------|-------|
| Display / Headings | Barlow Condensed | 800 (ExtraBold) | Normal |
| Body / UI | Barlow | 400, 500, 600 | Normal |
| Fallback | Arial Narrow / system-ui | — | — |

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@300;400;500;600&display=swap');
```

### CSS Variables
```css
--font-display: 'Barlow Condensed', 'Arial Narrow', sans-serif;
--font-body:    'Barlow', system-ui, sans-serif;
```

### Type Scale

| Token | Size | Weight | Tracking | Use |
|-------|------|--------|----------|-----|
| `heading-hero` | 52px (desktop) / 36px (mobile) | 800 | -0.01em | Page titles: BEST SELLERS, FAQS |
| `heading-pdp` | 48px (desktop) / 40px (mobile) | 800 | -0.01em | Product name on PDP |
| `heading-section` | 32px | 800 | 0.02em | REVIEWS, major sections |
| `heading-sub` | 22–24px | 800 | 0.04–0.05em | COMPLETE THE LOOK, STAY IN THE KNOW |
| `label-nav` | 13px | 400 | normal | Nav links |
| `label-filter` | 11px | 500 | 0.12em | Filter bar, uppercase |
| `label-collection` | 10px | 400 | 0.10em | Product collection name, uppercase, gray |
| `label-caps` | 11px | 400–500 | 0.08–0.20em | Color/size labels, footer headings, uppercase |
| `body` | 13–14px | 400 | normal | Descriptions, review body, footer links |
| `body-sm` | 11–12px | 400 | normal | Disclaimers, dates, meta info |
| `price` | 20px | 400 | normal | Product price (PDP) |
| `price-grid` | 13px | 400 | normal | Product price (grid card) |
| `price-bundle` | 13px | 400 | normal | "or 3 for $39", accent color |
| `product-name-grid` | 13px | 700 | 0.04em | Bold uppercase in product cards |
| `btn-label` | 11–12px | 600 | 0.15–0.20em | Button text, always uppercase |
| `announcement` | 11px | 400 | 0.08em | Top bar |
| `logo` | 28px | 800 | -0.02em | SKIMS wordmark |

### Rules
- **All headings: uppercase.** No exceptions.
- **Body copy: sentence case.** Never all-caps for paragraphs.
- **Collection labels above product names: all-caps + gray.** Always smaller than the product name.
- **Product names on cards: bold + uppercase.** Always.
- **Buttons: uppercase + tracked.** `tracking-[0.15em]` minimum.

---

## 3. Color Palette

### Core Colors

| Token | Hex | Use |
|-------|-----|-----|
| `white` | `#ffffff` | Page background, cards, nav |
| `black` | `#1a1a1a` | Primary text, filled buttons, borders |
| `gray-text` | `#444444` | Review body, secondary text |
| `gray-muted` | `#888888` | Labels, placeholders, meta |
| `gray-light` | `#aaaaaa` | Disabled, copyright |
| `border` | `#e8e8e8` | All hairline dividers |
| `border-mid` | `#c8c8c8` | Input borders, size buttons |
| `surface` | `#f5f3f0` | Product card bg, section bg (Complete the Look) |
| `surface-warm` | `#f0ede8` | Image placeholder, product photo bg |
| `surface-dark` | `#e8e5e0` | PDP image background |
| `accent-bundle` | `#8B6345` | "or 3 for $39", bundle pricing |

### Nude Shade Swatches (product colors)

| Name | Hex |
|------|-----|
| Sand | `#C9A882` |
| Dune | `#B8906E` |
| Clay | `#A67C5B` |
| Camel | `#8B6345` |
| Sienna | `#7A5030` |
| Umber | `#5E3A1E` |
| Espresso | `#3D2010` |
| Onyx | `#1a1a1a` |

### Usage Rules
- **Background is always white.** No off-white or cream page backgrounds.
- **Borders are always `#e8e8e8`** (hairline) or `#c8c8c8` (inputs/buttons).
- **Filled button = `#1a1a1a` bg + white text.** No other filled button colors.
- **Outlined button = white bg + `#c8c8c8` border + `#888` text** (inactive) → hover to `#1a1a1a` border + text.
- **Tags/badges (New, Best Seller) = `#1a1a1a` bg + white text.**
- **No gradients. No shadows (except focus rings).** Flat UI only.

---

## 4. Spacing & Layout

### Page Padding
```
Mobile:  px-6  (24px left/right)
Desktop: px-10 (40px left/right)
```

### Max Width
```
Content max-width: 1400px, centered (mx-auto)
Footer content:    1200px, centered
```

### Grid System

| Layout | Columns | Gap |
|--------|---------|-----|
| Product grid (mobile) | 2 | 16px x 32px |
| Product grid (tablet) | 3 | 16px x 32px |
| Product grid (desktop) | 4 | 16px x 32px |
| Complete the Look | 1 → 3 | 16px |
| Similar Styles | 2 → 4 | 0 (bordered grid) |
| Footer | 1 → 3 | 48px |
| FAQ layout | sidebar 208px + flex-1 | — |
| PDP layout | 55% image / 45% info | — |

### Section Spacing
```
Section vertical padding: py-12 (48px top + bottom)
Between page header and first section: pt-8 pb-6
```

---

## 5. Components

### 5.1 Navigation

**Announcement Bar**
- Height: 40px | `py-2.5`
- Text: 11px, `tracking-[0.08em]`, centered, `#1a1a1a`
- Border-bottom: `#e8e8e8`

**Main Nav**
- Height: 52px
- Logo: Barlow Condensed 800, 28px, `tracking-[-0.02em]`
- Nav links: Barlow 400, 13px, hover underline `underline-offset-4`
- Icons: 20×20px stroke `#1a1a1a` strokeWidth 1.5
- Cart badge: 14×14px circle, `#1a1a1a` bg, 9px white text

**Module Switcher Bar** (demo only — remove in Shopify)
- `bg-[#f5f3f0]` | border-b-2 active indicator
- 11px uppercase tracked text

---

### 5.2 Product Card (Grid)

```
Image container: aspect-ratio 4/5, bg #f0ede8
Image: object-cover object-top, hover scale(1.03) 500ms
Tag badge: absolute top-left, 10px uppercase, #1a1a1a bg
Wishlist icon: absolute top-right, 18px heart
Quick Add overlay: absolute bottom, white/90 bg, 11px uppercase, opacity-0 → hover opacity-100

Below image:
  Collection name: 10px, uppercase, tracking-[0.1em], #888
  Product name:    13px, bold, uppercase, tracking-[0.04em], #1a1a1a
  Price:           13px, normal, #1a1a1a
```

---

### 5.3 Product Detail Page (PDP)

**Layout:** `lg:flex-row` split — left 55% image, right 45% info panel

**Info Panel order:**
1. Collection name — 11px, uppercase, underlined, `tracking-[0.12em]`
2. Product name — 48px (desktop) Barlow Condensed 800, uppercase
3. Price — 20px, normal weight
4. Bundle price — 13px, `#8B6345`
5. Returns banner — border-y, flex row, 12px text
6. Color swatches — 32×32px square buttons, border-2 selected
7. Size grid — 40px height square buttons, 12px text, `border-[#c8c8c8]` → selected `bg-[#1a1a1a]`
8. ATC button — full width, 48px height, 12px uppercase `tracking-[0.2em]`

**ATC States:**
- No size: `bg-white border-[#c8c8c8] text-[#888]` — "SELECT A SIZE"
- Size selected: `bg-[#1a1a1a] text-white` — "ADD TO BAG — {SIZE}"

---

### 5.4 Complete the Look

- Background: `#f5f3f0`
- Cards: white bg, `p-4`, no border-radius
- "Styled With" tag: absolute top-left on image
- Price: 14px semibold, right-aligned
- Size select: native `<select>` with custom chevron overlay
- ADD TO CART: outlined button, hover to black border + text

---

### 5.5 Similar Styles

- Bordered grid layout: `border-l border-t` on container, `border-r border-b` on each card
- Product image: `bg-[#f5f3f0]`, aspect 4/5
- Heart icon: absolute top-right
- Carousel controls: 32×32px square buttons with chevron SVGs
- Page counter: "1 / 5", 12px, `#888`

---

### 5.6 Reviews

**Summary Row:**
- Rating number: 40px bold
- Stars: 18px filled polygons, `#1a1a1a`
- "Based on X reviews": 12px, `#888`
- Fit slider: 4px track `#e8e8e8`, dot `#555` at position, labels 11px
- FILTERS button: outlined, 12px uppercase semibold tracked

**Review Row:**
- Left column (md:w-48): Name 13px semibold, verified badge, age/size 11px gray
- Right: Stars 14px, title 14px bold uppercase tracked, date 11px gray right-aligned, body 13px `#444`, thumbs-up 11px

---

### 5.7 FAQ Page

**Hero image:** full-width, height 260px, `object-cover object-top`

**Sidebar nav:**
- Width: 208px (desktop)
- Links: 13px, bold, uppercase, `tracking-[0.06em]`
- Active: `border-b-2 border-[#1a1a1a] pb-0.5`
- Inactive: `text-[#888]` → hover `#1a1a1a`

**Accordion:**
- Question: 13px bold uppercase tracked, full-width button, chevron right
- Answer: 13px, `#555`, leading-relaxed
- Dividers: `divide-y divide-[#e8e8e8]`

---

### 5.8 Footer

**Layout:** 3-column centered grid (1200px max)

| Column | Content |
|--------|---------|
| Left | "HELP" header 13px bold + 7 links 13px |
| Center | "STAY IN THE KNOW" 24px display bold + description + email form |
| Right | "MORE" header 13px bold + 7 links 13px |

**Email form:** flex row, `border border-[#c8c8c8]`, input + black arrow button

**Social bar:** 20px SVG icons, `#888` → hover `#1a1a1a`

**Copyright:** 11px, `#aaa`

---

## 6. Buttons

| Variant | Background | Border | Text | Size |
|---------|-----------|--------|------|------|
| Primary (filled) | `#1a1a1a` | `#1a1a1a` | white | 12px, 0.2em tracking |
| Secondary (outline) | white | `#c8c8c8` | `#888` | 12px, 0.15em tracking |
| Secondary (hover) | white | `#1a1a1a` | `#1a1a1a` | same |
| Size button | white | `#c8c8c8` | `#1a1a1a` | 12px, 40px tall |
| Size selected | `#1a1a1a` | `#1a1a1a` | white | same |
| Ghost (nav) | transparent | none | `#1a1a1a` | 13px, hover underline |

All buttons: **no border-radius** (square corners). All text: **uppercase**.

---

## 7. Icons

- Style: outline (stroke), strokeWidth 1.5
- Size: 18–20px for nav/UI, 14px for inline/review
- Color: `#1a1a1a` (default), `#888` (muted)
- No filled icons except: wishlist (toggled), verified badge, cart count

---

## 8. Animation & Interaction

| Element | Transition |
|---------|-----------|
| Product image hover | `scale(1.03)` 500ms ease |
| Quick Add overlay | `opacity 200ms` |
| Button hover | `color/border 150ms` |
| FAQ chevron | `rotate-180 200ms` |
| Active tab underline | instant (border-b-2) |

**No bounce, no spring, no parallax.** Transitions are fast and functional.

---

## 9. Responsive Breakpoints

| Breakpoint | Class | Width |
|-----------|-------|-------|
| Mobile | default | < 768px |
| Tablet | `md:` | ≥ 768px |
| Desktop | `lg:` | ≥ 1024px |

Key responsive changes:
- Product grid: 2 → 3 → 4 columns
- PDP: stacked → side-by-side (55/45)
- FAQ: stacked → sidebar + content
- Footer: 1 column → 3 columns
- Nav links: hidden → visible at `lg:`

---

## 10. Shopify Section Mapping

| This Module | Shopify Section Type |
|-------------|---------------------|
| Announcement bar | `announcement-bar` |
| Navigation | `header` (theme default) |
| Collection header + filters | `collection-banner` + `main-collection-product-grid` |
| Product grid card | Product card snippet |
| PDP info panel | `main-product` section |
| Complete the Look | `product-recommendations` (custom) |
| Similar Styles carousel | `product-recommendations` |
| Reviews | Third-party app block (Okendo / Yotpo / Judge.me) |
| FAQ accordion | `accordion` or `collapsible-content` section |
| Footer newsletter + links | `footer` section |

See Shopify guide below for implementation steps.
