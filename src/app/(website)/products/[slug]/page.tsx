import {notFound} from 'next/navigation';
import type {Metadata} from 'next';
import {prisma} from '@/lib/db/prisma';
import {getPublishedProductBySlug} from '@/lib/published-product';
import {buildMetadata,pageSchema,absoluteSiteUrl} from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import ImportedProduct from '@/components/products/ImportedProduct';
import {getCatalogProducts,getTaxonomy,publishedProducts} from '@/lib/products/catalog';
import type {ImportedDocument} from '@/lib/solution-import/types';
export const dynamic='force-dynamic';
type Props={params:Promise<{slug:string}>};
async function get(slug:string){const product=await getPublishedProductBySlug(slug);if(!product?.publishedRevisionId)return null;const saved=await prisma.productRevision.findFirst({where:{id:product.publishedRevisionId,productId:product.id}});return saved?{product,page:saved.document as unknown as ImportedDocument}:null;}
export async function generateMetadata({params}:Props):Promise<Metadata>{const result=await get((await params).slug);if(!result)return {title:'Product not found',robots:{index:false,follow:false}};const m=result.page.metadata;const base=buildMetadata({title:m.seoTitle,description:m.metaDescription,path:`/products/${m.slug}`,image:m.socialImage||m.coverImage});return {...base,title:{absolute:m.seoTitle},openGraph:{...base.openGraph,title:m.seoTitle,images:m.socialImage?[{url:absoluteSiteUrl(m.socialImage),width:1200,height:630,alt:m.socialImageAlt||m.title}]:base.openGraph?.images}};}
export default async function ProductPage({params}:Props){const result=await get((await params).slug);if(!result)notFound();const {product,page}=result,m=page.metadata;const [edges,products,tax]=await Promise.all([prisma.relatedProduct.findMany({where:{sourceId:product.id,target:publishedProducts},orderBy:{position:'asc'}}),getCatalogProducts(),getTaxonomy(true)]);const related=edges.map(edge=>products.find(p=>p.id===edge.targetId)).filter((p):p is typeof products[number]=>!!p);return <><StructuredData data={pageSchema({title:m.seoTitle,description:m.metaDescription,path:`/products/${m.slug}`},[],{'@type':'Product',name:m.title,model:m.modelCode,brand:{'@type':'Brand',name:'Najhum'},...(m.coverImage?{image:absoluteSiteUrl(m.coverImage)}:{})})}/><main className="min-h-screen pt-20"><ImportedProduct document={page} related={related} categories={tax.categories}/></main></>;}
