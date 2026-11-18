# Product catalogue cutover and administration

## Run in Supabase, in this order

1. `database/product-html-import.sql` adds the product HTML/draft fields, private product-document storage, category/filter tables, assignments and manually ordered related-product relationships. It seeds only editable category/filter definitions from the supplied catalogue design. It does not add product records.
2. `database/product-html-reset.sql` permanently deletes all legacy product records, published and draft, with no backup or archive. It removes their legacy portfolio product links. It leaves solutions, portfolio pages, leads, categories and filters intact. It excludes new HTML-imported products on reruns.
3. Restart/redeploy the app after applying both files. The build regenerates Prisma Client. The local client has already been regenerated.

Neither script has been executed against Supabase by this task. Run them before using the new product pages. The scripts require the existing Product and PortfolioProject tables. SQL deletes database data, not R2/Blob objects; old images/PDFs can be shared and are not blindly removed from storage.

## Public catalogue

The supplied `products-upload/products.html` design has been adapted into a database-driven website component at `/products`. It uses:

- Editable top category tabs, labels, icons, order and visibility.
- Editable sidebar groups/options, including Platform, Connectivity, Power and Installation defaults.
- Actual published-product counts, search and alphabetical/category sorting.
- OR within each filter group; AND between groups. Facet counts retain other filters while ignoring the current group. Category counts retain search/sidebar filters while ignoring the current category.
- A mobile filter dialog, removable active filters and shared URLs using `q`, `cat` and `filters` parameters.
- Live product cards and hero images. No fixed product count or invented client totals.

Zero-count options remain visible but disabled unless selected, so counts are clear. Draft/hidden products never appear. Renaming a category or option preserves assignments because IDs and slugs remain stable. Hide definitions rather than deleting them. A product assigned to a hidden option must be updated before republishing.

## Admin

`/admin/products/taxonomy` manages category tabs and sidebar filter groups/options. Each entry supports name, order and visibility; categories also offer an icon picker. New entries can also be created inline while editing a product. The Platform group's stable slug is `platform`; its `iotrics`, `evoltics`, and `cropifai` option slugs map to existing platform-page tags. Additional platform labels can be used as catalogue filters but do not create a new platform page.

`/admin/products/new` and `/admin/products/[id]/edit` use the shared four-step importer:

1. Details, model code, up to four card highlights, categories and filter selections.
2. HTML/ZIP package, asset replacements and a separate 1200 × 1200 catalogue image.
3. SEO/social metadata, PDF upload/URL, searchable manual related-product selection and ordering.
4. Optional external-tab preview, Save draft, or direct Publish changes.

Preview opens only the saved draft; it never saves. Direct publishing first saves pending edits, and stops if the save fails. A single working draft and the live document are retained. There is no version-history selector. Save replaces the previous draft; publish removes the superseded live document. Standard owned unused-upload cleanup checks retained product, solution, portfolio and catalogue references before deleting files.

The old structured product form/API writes are retired. Existing components remain in source but are not used for new product creation or public detail pages.

## Downloads

The attached product PDF is kept in CMS metadata, independent of uploaded HTML. PDF upload checks a `.pdf` extension, `%PDF-` signature and MIME type, with a 4 MB limit. An existing HTTPS PDF URL can also be used.

`data-najhum-action="download-datasheet"` buttons invoke the existing brochure/WhatsApp phone-verification flow on the public website. The existing flow is lead capture; a public PDF URL is not a private access-control boundary. Administrators can open the PDF directly in their private preview. Missing PDFs hide marked buttons. Publishing a PDF without a marked button is rejected with an actionable message.

## Related products

Admin selections only. No automatic category lookup, recommendations or fallback. Maximum 12, manually ordered. The current product cannot select itself, and publication validates that selected targets are published HTML products. The public renderer excludes targets later hidden or deleted. Live card metadata is used, with links to actual detail pages.

Use one empty `<section data-najhum-slot="related-products"></section>` in the HTML. Multiple slots are rejected. If the slot is absent, selected related products are appended after the uploaded content. With no eligible selections, the section is hidden. Preview uses the saved draft's selections without publishing them.

## Authoring and sample

- AI instructions: `PRODUCT_HTML_AI_GUIDE.md`.
- Upload ZIP: `examples/product-upload/npm-12-ready-to-upload.zip`.
- Editable sample: `examples/product-upload/npm-12/index.html` and its `assets/` directory.
- The sample preserves the approved NPM-12 animation and tabs; both PDF buttons are marked and static related products are removed.
- No PDF, sample product record or automatic related-product list has been fabricated.

Suggested first product fields: NPM-12 Power Monitor; model NPM-12; slug npm-12; category Energy & Power. Choose the correct platform, connectivity, power and installation options based on the actual datasheet. Upload the catalogue image and genuine PDF separately. Publish other products before selecting them as related products.
