import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {getPublishedPage} from '@/lib/published-content/queries';
import { buildMetadata,pageSchema } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import PublishedHtml from '@/components/solutions/published/PublishedHtml';
export const revalidate=300;
export async function generateStaticParams(){return [];}
const published=(slug:string)=>getPublishedPage('solutions',slug);
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{
 const result=await published((await params).slug);if(!result)return {title:'Solution not found',robots:{index:false,follow:false}};
 const m=result.document.metadata,path=`/solutions/${result.slug}`;
 const base=buildMetadata({title:m.seoTitle,description:m.metaDescription,path,image:m.socialImage||m.coverImage});
 // The CMS SEO title is exact; do not append Najhum a second time.
 return {...base,...(!result.isListed?{robots:{index:false,follow:true}}:{}),title:{absolute:m.seoTitle},openGraph:{...base.openGraph,title:m.seoTitle,images:m.socialImage?[{url:new URL(m.socialImage,process.env.NEXT_PUBLIC_APP_URL||'https://najhumgroup.com').href,width:1200,height:630,alt:m.socialImageAlt||m.title}]:base.openGraph?.images},twitter:{...base.twitter,title:m.seoTitle}};
}
export default async function SolutionPage({params}:{params:Promise<{slug:string}>}){
 const result=await published((await params).slug);if(!result)notFound();
 const m=result.document.metadata;
 return <><StructuredData data={pageSchema({title:m.seoTitle,description:m.metaDescription,path:`/solutions/${m.slug}`},[],{'@type':'Service',name:m.title,provider:{'@type':'Organization',name:'Najhum Technologies LLC'}})}/><main className="solution-page min-h-screen pt-20"><PublishedHtml kind="solutions" slug={result.slug} revisionId={result.revisionId} document={result.document}/></main></>;
}
