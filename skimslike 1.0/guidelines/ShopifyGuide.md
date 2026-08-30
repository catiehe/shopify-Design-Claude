# Shopify Integration Guide
> How to bring this design system into a Shopify store.

---

## Option A — Use an Existing Theme + Customize CSS (Fastest)

Best if you already have a Shopify store and just want to apply this design on top.

### Step 1 — Choose a base theme

Pick one of these from the Shopify Theme Store — they have clean HTML structure that's easy to override:

- **Dawn** (free, official Shopify default) ← recommended starting point
- **Sense** (free)
- **Craft** (free, minimal)

All three use CSS custom properties and don't fight you.

### Step 2 — Add the fonts

In your theme editor: **Online Store → Themes → Edit code → `layout/theme.liquid`**

Add inside `<head>`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=Barlow:wght@300;400;500;600&display=swap" rel="stylesheet">
```

### Step 3 — Override CSS variables

In **`assets/base.css`** (or create `assets/custom.css` and link it in `theme.liquid`):

```css
/* ─── Font variables ─── */
:root {
  --font-heading-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  --font-heading-style: normal;
  --font-heading-weight: 800;
  --font-body-family: 'Barlow', system-ui, sans-serif;
  --font-body-style: normal;
  --font-body-weight: 400;

  /* ─── Color tokens ─── */
  --color-background: #ffffff;
  --color-foreground: #1a1a1a;
  --color-base-background-1: #ffffff;
  --color-base-background-2: #f5f3f0;
  --color-base-accent-1: #1a1a1a;
  --color-base-accent-2: #8B6345;
  --color-base-outline-button-labels: #1a1a1a;
  --color-base-text: #1a1a1a;
  --color-border: #e8e8e8;
  --color-border-mid: #c8c8c8;
  --color-muted: #888888;
  --color-surface: #f5f3f0;
  --color-surface-warm: #f0ede8;

  /* ─── Border radius ─── */
  --buttons-radius: 0px;
  --inputs-radius: 0px;
  --variant-pills-radius: 0px;
  --media-radius: 0px;

  /* ─── Button styles ─── */
  --buttons-border-width: 1px;
  --buttons-border-opacity: 100%;
}
```

### Step 4 — Override component styles

Add to your `custom.css`:

```css
/* Headings — all uppercase */
h1, h2, h3, .h1, .h2, .h3 {
  font-family: 'Barlow Condensed', 'Arial Narrow', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

/* Collection page title */
.collection__title {
  font-size: 52px;
  letter-spacing: -0.01em;
}

/* Product title on PDP */
.product__title {
  font-size: 48px;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
}

/* Product card name */
.card__heading {
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

/* Vendor / collection label above product name */
.card__vendor,
.product__vendor {
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.10em;
  color: #888888;
}

/* Price */
.price__regular .price-item {
  font-size: 20px;
  font-weight: 400;
}

/* Buttons */
.button,
.btn {
  font-family: 'Barlow', sans-serif;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  border-radius: 0;
}

/* Filter bar */
.facets__heading {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

/* Announcement bar */
.announcement-bar__message {
  font-size: 11px;
  letter-spacing: 0.08em;
}
```

---

## Option B — Build a Custom Theme with Shopify CLI (Full Control)

For a ground-up build that exactly matches this design system.

### Prerequisites
```bash
npm install -g @shopify/cli @shopify/theme
shopify auth login --store your-store.myshopify.com
```

### Scaffold a new theme
```bash
shopify theme init my-theme --clone-url https://github.com/Shopify/dawn.git
cd my-theme
shopify theme dev --store your-store.myshopify.com
```

### Folder structure for your custom sections
```
my-theme/
├── assets/
│   ├── custom.css          ← your design system CSS
│   └── custom.js           ← your JS (carousel, accordion, etc.)
├── layout/
│   └── theme.liquid        ← add font <link> here
├── sections/
│   ├── announcement-bar.liquid
│   ├── main-collection-product-grid.liquid
│   ├── main-product.liquid
│   ├── product-recommendations.liquid  ← Complete the Look / Similar Styles
│   ├── collapsible-content.liquid      ← FAQ accordion
│   └── footer.liquid
└── snippets/
    ├── card-product.liquid   ← product card component
    └── price.liquid
```

---

## Option C — Headless Shopify + this React App (Advanced)

Connect this React codebase directly to Shopify's Storefront API.

### Step 1 — Install Hydrogen or use Storefront API directly
```bash
# Option: Hydrogen (Shopify's React framework)
npm create @shopify/hydrogen@latest

# Option: Add Storefront API to this Vite project
npm install @shopify/storefront-api-client
```

### Step 2 — Create a Storefront API token

In your Shopify Admin:
1. **Settings → Apps and sales channels → Develop apps**
2. Create a private app
3. Enable **Storefront API** access
4. Copy your **Storefront API access token** and **store domain**

### Step 3 — Set up the client in this project
```ts
// src/lib/shopify.ts
import { createStorefrontApiClient } from '@shopify/storefront-api-client';

export const client = createStorefrontApiClient({
  storeDomain: 'your-store.myshopify.com',
  apiVersion: '2025-01',
  publicAccessToken: 'your_storefront_token',
});
```

### Step 4 — Fetch real products
```ts
// src/hooks/useProducts.ts
import { client } from '@/lib/shopify';

const PRODUCTS_QUERY = `
  query Products($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        vendor
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        images(first: 1) {
          nodes { url altText }
        }
        tags
      }
    }
  }
`;

export async function getProducts(first = 8) {
  const { data } = await client.request(PRODUCTS_QUERY, {
    variables: { first },
  });
  return data.products.nodes;
}
```

### Step 5 — Replace mock data in App.tsx

Replace `GRID_PRODUCTS` array with a `useEffect` call to `getProducts()` and map the Shopify response to your card component shape.

---

## Section-by-Section Shopify Liquid Code

### Announcement Bar (`sections/announcement-bar.liquid`)
```liquid
<div class="announcement-bar" style="border-bottom: 1px solid #e8e8e8; text-align: center; padding: 10px 24px;">
  <p style="font-size: 11px; letter-spacing: 0.08em; margin: 0;">
    {{ section.settings.text }}
  </p>
</div>

{% schema %}
{
  "name": "Announcement Bar",
  "settings": [
    { "type": "text", "id": "text", "label": "Message", "default": "Free Shipping on Domestic Orders $75+" }
  ]
}
{% endschema %}
```

### Product Card snippet (`snippets/card-product.liquid`)
```liquid
<div class="product-card" style="cursor: pointer;">
  <div style="position: relative; background: #f0ede8; aspect-ratio: 4/5; overflow: hidden;">
    {% if card_product.featured_image %}
      <img
        src="{{ card_product.featured_image | image_url: width: 480 }}"
        alt="{{ card_product.featured_image.alt | escape }}"
        style="width: 100%; height: 100%; object-fit: cover; object-position: top;"
        loading="lazy"
      >
    {% endif %}
    {% if card_product.tags contains 'new' %}
      <span style="position: absolute; top: 10px; left: 10px; background: #1a1a1a; color: white; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 8px;">New</span>
    {% endif %}
    {% if card_product.tags contains 'best-seller' %}
      <span style="position: absolute; top: 10px; left: 10px; background: #1a1a1a; color: white; font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 8px;">Best Seller</span>
    {% endif %}
  </div>
  <div style="margin-top: 12px;">
    <p style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.10em; color: #888; margin: 0;">{{ card_product.vendor }}</p>
    <p style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; margin: 2px 0 0;">
      <a href="{{ card_product.url }}" style="color: #1a1a1a; text-decoration: none;">{{ card_product.title }}</a>
    </p>
    <p style="font-size: 13px; margin: 2px 0 0;">{{ card_product.price | money }}</p>
  </div>
</div>
```

### FAQ Accordion (`sections/collapsible-content.liquid`)
```liquid
<section style="padding: 48px 40px; border-top: 1px solid #e8e8e8;">
  <h2 style="font-family: 'Barlow Condensed', sans-serif; font-size: 22px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 24px;">
    {{ section.settings.heading }}
  </h2>
  <div style="border-top: 1px solid #e8e8e8;">
    {% for block in section.blocks %}
      <details style="border-bottom: 1px solid #e8e8e8;" {{ block.shopify_attributes }}>
        <summary style="display: flex; justify-content: space-between; align-items: center; padding: 20px 0; cursor: pointer; list-style: none; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em;">
          {{ block.settings.question }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
        </summary>
        <div style="padding-bottom: 24px; font-size: 13px; color: #555; line-height: 1.6;">
          {{ block.settings.answer }}
        </div>
      </details>
    {% endfor %}
  </div>
</section>

{% schema %}
{
  "name": "FAQ Accordion",
  "settings": [
    { "type": "text", "id": "heading", "label": "Heading", "default": "RETURNS & EXCHANGES" }
  ],
  "blocks": [
    {
      "type": "question",
      "name": "Question",
      "settings": [
        { "type": "text", "id": "question", "label": "Question" },
        { "type": "richtext", "id": "answer", "label": "Answer" }
      ]
    }
  ],
  "presets": [{ "name": "FAQ Accordion" }]
}
{% endschema %}
```

### Footer (`sections/footer.liquid`) — key structure
```liquid
<footer style="border-top: 1px solid #e8e8e8; background: white; font-family: 'Barlow', sans-serif;">
  <div style="max-width: 1200px; margin: 0 auto; padding: 64px 40px; display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 48px; text-align: center;">

    <!-- HELP column -->
    <div>
      <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 24px;">HELP</h3>
      {% for link in linklists[section.settings.help_menu].links %}
        <p style="margin-bottom: 12px;"><a href="{{ link.url }}" style="font-size: 13px; color: #1a1a1a; text-decoration: none;">{{ link.title }}</a></p>
      {% endfor %}
    </div>

    <!-- Newsletter -->
    <div>
      <h3 style="font-family: 'Barlow Condensed', sans-serif; font-size: 24px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 12px;">STAY IN THE KNOW</h3>
      <p style="font-size: 13px; color: #555; margin-bottom: 24px;">{{ section.settings.newsletter_text }}</p>
      {% form 'customer', id: 'footer-email-form' %}
        <div style="display: flex; border: 1px solid #c8c8c8; max-width: 300px; margin: 0 auto;">
          <input type="email" name="contact[email]" placeholder="your email" style="flex: 1; padding: 12px 16px; font-size: 13px; border: none; outline: none;">
          <button type="submit" style="background: #1a1a1a; color: white; border: none; padding: 0 16px; cursor: pointer;">→</button>
        </div>
      {% endform %}
    </div>

    <!-- MORE column -->
    <div>
      <h3 style="font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; margin-bottom: 24px;">MORE</h3>
      {% for link in linklists[section.settings.more_menu].links %}
        <p style="margin-bottom: 12px;"><a href="{{ link.url }}" style="font-size: 13px; color: #1a1a1a; text-decoration: none;">{{ link.title }}</a></p>
      {% endfor %}
    </div>

  </div>
</footer>

{% schema %}
{
  "name": "Footer",
  "settings": [
    { "type": "link_list", "id": "help_menu", "label": "Help menu" },
    { "type": "link_list", "id": "more_menu", "label": "More menu" },
    { "type": "text", "id": "newsletter_text", "label": "Newsletter text", "default": "Be the first to discover new drops, special offers, and all things SKIMS" }
  ]
}
{% endschema %}
```

---

## Recommended Shopify Apps for Missing Features

| Feature | App |
|---------|-----|
| Reviews (star ratings, fit slider) | **Judge.me** (free) or **Okendo** |
| Recently Viewed / Similar Products | **LimeSpot** or **Frequently Bought Together** |
| Size guide popup | **Kiwi Size Chart** |
| Wishlist | **Wishlist King** |
| Announcement bar (rotating) | Built-in Dawn feature or **Marquify** |
| Bundle pricing ("3 for $39") | **Bundler** or **Bold Bundles** |
| SMS marketing | **Klaviyo** or **Postscript** |

---

## Quick Checklist Before Launch

- [ ] Fonts loading from Google Fonts (check Network tab)
- [ ] All headings uppercase + Barlow Condensed
- [ ] Product card images at 4:5 aspect ratio
- [ ] Buttons have 0 border-radius
- [ ] No colored shadows or gradients anywhere
- [ ] Mobile: product grid collapses to 2 columns
- [ ] Mobile: PDP stacks image above info
- [ ] ATC button text uppercase + tracked
- [ ] Footer newsletter form connected to Klaviyo / Shopify email
- [ ] Color swatches linked to product variants
- [ ] Size buttons linked to variant availability
