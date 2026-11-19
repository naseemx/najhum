export const PRODUCT_CONTENT_TAG = 'published-products-v1';
export const SOLUTION_CONTENT_TAG = 'published-solutions-v1';
export type PublishedKind = 'products' | 'solutions';
export function publishedAssetBase(kind:PublishedKind,slug:string,revision:string){
 return `/api/published-content/${kind}/${encodeURIComponent(slug)}/${encodeURIComponent(revision)}`;
}
