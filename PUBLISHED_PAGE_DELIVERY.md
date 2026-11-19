# Published product and solution page delivery

The admin ZIP / HTML + assets importer, image storage, metadata editor, drafts and
private previews are unchanged. No Supabase schema migration or SQL is required.
Existing published documents work immediately; re-uploading is unnecessary.

## Public delivery

- `/products/[slug]` and `/solutions/[slug]` use on-demand ISR with a 300-second
  fallback revalidation interval. Unknown paths are generated on their first visit.
- Metadata and page rendering share one request-level lookup. Published documents
  are also cached in Next.js Data Cache under separate product/solution tags.
- Queries select only the published pointer and revision document. Related product
  queries retrieve only the administrator's selections, in their stored order.
  Product card labels no longer load filter groups. Catalogue queries select public
  card fields rather than entire product records.
- HTML is rendered by the server and kept in place when scripts start. Normal
  React/Next.js hydration data still exists; the complete import document, including
  CSS, scripts, asset manifests and editor metadata, is no longer a client prop.
- CSS and each original classic script have their own versioned URL:
  `/api/published-content/{products|solutions}/{slug}/{revision}/page.css`
  and `/script-0.js`, `/script-1.js`, etc. These files are generated from the existing
  database document and cached over HTTP for five minutes. No second storage copy,
  R2 credentials change or upload-format change is required.
- CSS loads as a stylesheet. Scripts download in parallel and execute in their
  original order with the existing trusted-admin browser model. Timers, animation
  frames, global listeners, observers and generated elements are cleaned up on
  navigation. SVG fragment references in CSS still point to the page's SVG defs.
- Datasheet download hooks and related-product slots are preserved, including hooks
  added by imported scripts after startup. Asset failures retain the server HTML and
  offer a retry for interactive features.

## Publication and privacy

`refreshProducts()` and `revalidateSolutions()` expire their Data Cache tag with
`{expire: 0}` and invalidate the detail-page route. Existing publish, slug-change,
hide/show, unpublish, delete and product-taxonomy handlers use these helpers.
All product pages are invalidated when a product changes because it may appear
in another product's related cards. Draft saves do not replace the public page.

The asset endpoint only reads the currently published, visible revision, and
returns uncached 404s for private, missing or superseded revisions. As with public
images, files downloaded while a revision was public can remain in browser/CDN
caches for their HTTP cache lifetime. Existing open tabs are not a real-time CMS
subscription; publication changes apply to newly fetched public pages.

Admin previews remain authenticated and use their existing uncached preview path.
Portfolio delivery is unchanged by this product/solution performance update.

## Verification

Run the focused tests for `published-content`, product catalogue/renderer and
published runtime. The production build should identify both detail routes as SSG
with `generateStaticParams`, rather than forced dynamic routes. To measure warm
page performance, run a production server, request a published slug twice and
inspect `x-nextjs-cache` (local) or `x-vercel-cache` (deployment). Measure the full
HTML response, not just initial streaming headers. An end-to-end visual check must
also confirm the supplied animations, download modal and selected related cards.
