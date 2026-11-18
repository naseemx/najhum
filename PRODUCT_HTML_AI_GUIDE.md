# Najhum product HTML/ZIP authoring guide for AI models

## Deliverable

Create ONE responsive HTML product detail page. Deliver `product-slug.zip` with this structure:

```text
product-slug.zip
├── index.html
└── assets/
    ├── product-image.webp
    ├── detail-image.webp
    ├── tick-white.svg
    └── animations.js      # optional; classic JavaScript only
```

The HTML must be at the ZIP root. Include only assets the HTML/CSS/JavaScript actually uses. Paths are relative, such as `assets/product-image.webp`; filename casing must match. Do not include node_modules, package.json, React/TSX source, build folders, server code, credentials, another HTML page or a PDF.

The website accepts a ZIP or a single HTML file plus selected asset files. The HTML page controls the product presentation; the CMS separately controls product metadata, categories, filters, catalogue image, PDF, related products and SEO.

## Layout and brand

- Use Najhum's supplied design, brand colours and original approved product copy. Do not invent technical specs, certifications, savings or testimonials.
- Do not duplicate the site's navbar, main footer, cookie UI, verification dialog or analytics.
- Use local project font variables: `font-family: var(--font-sans-base, system-ui), sans-serif` for body and `var(--font-display-base, system-ui), sans-serif` for display text. The existing NPM-12 reference also supports `--font-poppins-base`. Do not call Google Fonts or download additional fonts.
- Wrap the design in a unique root, such as `.nj-product-npm12`, and scope CSS/selectors to it. The importer additionally scopes CSS and namespaces keyframes.
- One H1, semantic H2/H3, descriptive image alt text, explicit media dimensions, keyboard-operable controls and visible focus states.
- Support narrow mobile widths from 320 px through desktop. No horizontal page overflow. Use fluid type, wrapping and responsive grids.
- Include a reduced-motion alternative. Make the content visible when animation/JavaScript is unavailable. Label illustrative readings as illustrative.
- A 1200 × 1200 transparent PNG/WebP is recommended for the separate catalogue image; it is selected/uploaded in admin, not automatically extracted from the ZIP. Social images are selected separately and cropped to 1200 × 630.

## Required integration: datasheet download

Use the exact action marker on EVERY download button in your design:

```html
<button type="button" class="your-original-button-style"
        data-najhum-action="download-datasheet">
  Download datasheet
</button>
```

Keep your original icons, nested spans, text and CSS classes. The website intercepts the click and invokes its brochure/phone-verification flow using the PDF attached to THIS product in admin.

- Do not hard-code a PDF URL, model-to-PDF map, OTP flow, localStorage verification flag, window.open call or custom download script.
- Do not add onclick attributes. All ordinary interactions belong in a script block or local JS file.
- Upload the PDF separately through admin or enter its HTTPS URL. Maximum PDF upload: 4 MB.
- If the admin has attached no PDF, the website hides marked download buttons.
- Replacing the attached PDF updates the buttons after publication without changing the HTML.
- This integration reuses the current lead-capture flow. Public PDF URLs are not private access-controlled documents.

## Required integration: admin-selected related products

Insert one EMPTY slot at the desired position, normally above the final CTA:

```html
<section data-najhum-slot="related-products"></section>
```

Do not put a heading, static cards, example products, placeholder items, product IDs, an automatic category lookup or a JavaScript renderer in that slot. The website inserts the complete section, heading and cards from the admin's ordered selections. It uses live product names/images/URLs and excludes hidden/deleted products. With no eligible selections, the slot stays empty.

There is NO automatic selection, recommendation engine or fallback. The admin manually selects related products in the editor and orders them with up/down controls. A product cannot select itself. The first product may be published with no related products and linked to others later.

## CSS and animation support

Inline `<style>` and `<script>` blocks are supported. Bundled `.css` and classic `.js` files are also supported. Preserve the exact approved animation logic for the page's own visual elements, with cleanup-friendly standard listeners, timers, observers and RAFs.

- No CDN scripts, remote CSS, React, TSX, JSX, ES module imports, npm dependencies at runtime or server-side code.
- Do not include iframe/object/embed elements, executable attribute URLs or inline event handlers.
- SVG drawings must not contain scripts, external references, foreignObject, external image tags or event handlers.
- Relative image paths inside inline CSS/JS are resolved by the importer. Keep literal asset paths; do not construct filenames dynamically.
- Download hooks and related slots are owned by the website. Your JavaScript must not overwrite, replace or populate them.

## Package limits

- Combined HTML/ZIP/assets upload: 4 MiB maximum.
- ZIP expanded total: 40 MiB; maximum 150 entries; individual asset maximum 4 MiB.
- Supported media: PNG, JPEG, WebP, AVIF, GIF, drawing-only SVG, MP4, WOFF2.
- Keep PDFs outside the ZIP and upload separately in admin. Optimise large images/video before packaging.
- The importer preserves local classic JavaScript but never runs uploaded code on the server. Only trusted administrators may publish code.

## Information to supply alongside the ZIP

Give the administrator the following as plain text, separate from the ZIP:

1. Product name, model code, stable URL slug and short catalogue description (up to 180 characters).
2. Up to four short card highlights, each up to 120 characters.
3. Suggested category names and filter values (platform, connectivity, power, installation). Admin selections are authoritative; the ZIP does not create taxonomy records.
4. SEO title and meta description (up to 300 characters), social image and descriptive alt text.
5. Separate PDF file or HTTPS PDF URL, if available.
6. Suggested related products for the admin to select manually. Never invent IDs or embed their cards.

## Upload workflow

1. Details: name, model, description/highlights, categories and filter options. Add new options inline if necessary.
2. Page & images: upload ZIP/HTML and set the catalogue image.
3. Downloads & SEO: upload/link PDF, select and order related products, enter SEO and social metadata.
4. Preview & publish: Save draft, optional external preview, or Publish changes directly. Publication saves pending edits first. Preview itself does not save.

A working draft and the current live page are retained. There is no selectable version history. Replacing a draft does not change the live page until published.

## Working reference

See `examples/product-upload/npm-12/index.html` and `examples/product-upload/npm-12-ready-to-upload.zip`. The NPM-12 reference preserves its original visuals, tabs and illustrative channel animation, replaces both PDF buttons with integration markers, and replaces static related cards with the empty CMS slot. No sample PDF or related product is invented.
