import {buildMetadata,pageSchema} from '@/lib/seo';
import {pageSeo} from '@/content/page-seo';
import StructuredData from '@/components/seo/StructuredData';
import ProductCatalog from '@/components/products/catalog/ProductCatalog';
import {getCatalogProducts,getTaxonomy} from '@/lib/products/catalog';
export const dynamic='force-dynamic';
export const metadata=buildMetadata(pageSeo.products);
export default async function ProductsPage({searchParams}:{searchParams:Promise<{q?:string;cat?:string;filters?:string}>}){
 const params=await searchParams;
 try{const [products,taxonomy]=await Promise.all([getCatalogProducts(),getTaxonomy(true)]);return <><StructuredData data={pageSchema(pageSeo.products)}/><ProductCatalog products={products} taxonomy={taxonomy} initialQuery={(params.q||'').slice(0,120)} initialCategory={params.cat||''} initialOptions={(params.filters||'').split(',').filter(Boolean)}/></>;}catch(error){console.error('Product catalogue unavailable',error);return <main className="min-h-screen pt-36 px-6 max-w-6xl mx-auto"><h1 className="text-3xl font-semibold">Products</h1><p role="status" className="mt-6">The product catalogue is temporarily unavailable. Please contact our team or try again shortly.</p></main>;}
}
