# Design System — SKIMS-Style Fashion E-Commerce

Reference document for this design system. Use this whenever building new pages, sections, or Shopify modules.

## 1. Brand Voice & Aesthetic

**Stance:** Editorial minimalism — clean white canvas, bold condensed type, generous whitespace. Every element earns its place.

**Tone:** Confident, inclusive, direct. Copy is short and declarative. No filler adjectives.

**Reference:** SKIMS.com — pure white backgrounds, uppercase bold headers, nude/sand product photography, zero ornamentation.

## 2. Typography

### Font Stack

| Role | Family | Weight | Style |
| --- | --- | --- | --- |
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
--font-body: 'Barlow', system-ui, sans-serif;
```

### Type Scale

| Token | Size | Weight | Tracking | Use |
| --- | --- | --- | --- | --- |
| `heading-hero` | 52px desktop / 36px mobile | 800 | -0.01em | Page titles: BEST SELLERS, FAQS |
| `heading-pdp` | 48px desktop / 40px mobile | 800 | -0.01em | Product name on PDP |
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
| `product-name-grid` | 13px | 700 | 0.04em | Bold uppercase in product cards |
| `btn-label` | 11–12px | 600 | 0.15–0.20em | Button text, always uppercase |
| `logo` | 28px | 800 | -0.02em | Wordmark |

### Rules

- All headings: uppercase. No exceptions.
- Body copy: sentence case. Never all-caps for paragraphs.
- Collection labels above product names: all-caps + gray. Always smaller than the product name.
- Buttons: uppercase + tracked. `tracking-[0.15em]` minimum.

## 3. Color Palette

| Token | Hex | Use |
| --- | --- | --- |
| `white` | `#ffffff` | Page background, cards, nav |
| `black` | `#1a1a1a` | Primary text, filled buttons |
| `gray-text` | `#444444` | Review body, secondary text |
| `gray-muted` | `#888888` | Labels, placeholders |
| `gray-light` | `#aaaaaa` | Disabled, copyright |
| `border` | `#e8e8e8` | All hairline dividers |
| `border-mid` | `#c8c8c8` | Input borders, size buttons |
| `surface` | `#f5f3f0` | Section backgrounds |
| `surface-warm` | `#f0ede8` | Product photo background |
| `accent-bundle` | `#8B6345` | Bundle pricing text |

**Rules:** No gradients. No shadows. No border-radius. White background always.

## 4. Spacing & Layout

- Page padding: `px-6` mobile / `px-10` desktop
- Max-width: 1400px content, 1200px footer
- Section padding: `py-12` (48px)
- PDP split: 55% image / 45% info
- Product grid: 2 col → 3 col → 4 col

## 5. Buttons

| Variant | BG | Border | Text |
| --- | --- | --- | --- |
| Primary | `#1a1a1a` | `#1a1a1a` | White |
| Outline (default) | White | `#c8c8c8` | `#888` |
| Outline (hover) | White | `#1a1a1a` | `#1a1a1a` |
| Size (selected) | `#1a1a1a` | `#1a1a1a` | White |

All buttons: 0 border-radius, uppercase, tracked.

## 6. Shopify Section Mapping

| Module | Shopify Section |
| --- | --- |
| Announcement bar | `announcement-bar` |
| Collection header + filters | `collection-banner` + `main-collection-product-grid` |
| Product card | `card-product` snippet |
| PDP info panel | `main-product` |
| Complete the Look | `product-recommendations` (custom) |
| Reviews | Judge.me / Okendo app block |
| FAQ accordion | `collapsible-content` |
| Footer | `footer` section |
