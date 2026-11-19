import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {getPublishedPage} from '@/lib/published-content/queries';
import PublishedHtml from '@/components/solutions/published/PublishedHtml';
import {buildMetadata,pageSchema,absoluteSiteUrl} from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import ImportedProduct from '@/components/products/ImportedProduct';
import {getRelatedCatalogProducts,getProductCardCategories} from '@/lib/products/catalog';
export const revalidate=300;
export async function generateStaticParams(){return [];}
type Props={params:Promise<{slug:string}>};
const get=(slug:string)=>getPublishedPage('products',slug);
export async function generateMetadata({params}:Props):Promise<Metadata>{const result=await get((await params).slug);if(!result)return {title:'Product not found',robots:{index:false,follow:false}};const m=result.document.metadata;const base=buildMetadata({title:m.seoTitle,description:m.metaDescription,path:`/products/${m.slug}`,image:m.socialImage||m.coverImage});return {...base,...(!result.isListed?{robots:{index:false,follow:true}}:{}),title:{absolute:m.seoTitle},openGraph:{...base.openGraph,title:m.seoTitle,images:m.socialImage?[{url:absoluteSiteUrl(m.socialImage),width:1200,height:630,alt:m.socialImageAlt||m.title}]:base.openGraph?.images}};}
export default async function ProductPage({params}:Props){const result=await get((await params).slug);if(!result)notFound();const page=result.document,m=page.metadata;const [related,categories]=await Promise.all([getRelatedCatalogProducts(result.id),getProductCardCategories()]);return <><StructuredData data={pageSchema({title:m.seoTitle,description:m.metaDescription,path:`/products/${m.slug}`},[],{'@type':'Product',name:m.title,model:m.modelCode,brand:{'@type':'Brand',name:'Najhum'},...(m.coverImage?{image:absoluteSiteUrl(m.coverImage)}:{})})}/><main className="min-h-screen pt-20"><ImportedProduct metadata={{title:m.title,brochureUrl:m.brochureUrl}} related={related} categories={categories}><PublishedHtml kind="products" slug={result.slug} revisionId={result.revisionId} document={page}/></ImportedProduct></main></>;}
