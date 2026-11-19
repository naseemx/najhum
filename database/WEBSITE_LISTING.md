# Published pages and website listing

Run `database/website-listing.sql` in the Supabase SQL Editor before deploying this change. This adds `isListed` to Solution and Product. It does not delete, replace or archive content. Existing published pages remain listed; existing drafts and new pages are unlisted by default. Rerunning the SQL preserves listing preferences.

## Admin workflow

1. Upload HTML/ZIP and save a draft as before. Upload format and assets do not change.
2. Publish. A new page is published but unlisted, so its direct link works immediately.
3. Enable **View on Website** to include it in public listings, navigation, search, platform cards and related-product cards.
4. **Hide on Website** removes those listings while leaving the published direct link available.
5. **Unpublish** disables the public page and its direct link. Preview still works for authenticated administrators.

Publishing changes never automatically enables website listing. Unpublishing preserves the listing preference, so republishing a previously listed page restores its listing. To share without listing again, hide it before unpublishing.

Unlisted published pages send `noindex` metadata and are omitted from the sitemap. This is a listing control, not access protection: anyone with the URL can open or forward it. Search engines may take time to remove previously indexed pages. Links manually embedded in uploaded HTML remain part of that design; remove those manually when necessary.

The application invalidates its page and data caches when listing changes. An already open browser tab must be refreshed to see updated menus/cards. No Supabase data has been changed automatically.
