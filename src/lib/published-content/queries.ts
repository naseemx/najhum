import {cache} from 'react';
import {unstable_cache} from 'next/cache';
import {prisma} from '@/lib/db/prisma';
import type {ImportedDocument} from '@/lib/solution-import/types';
import {PRODUCT_CONTENT_TAG,SOLUTION_CONTENT_TAG,type PublishedKind} from './constants';

const visible={isDraft:false,contentMode:'HTML',publishedRevisionId:{not:null}} as const;
const pointer={id:true,slug:true,publishedRevisionId:true} as const;
async function readProduct(slug:string){
 const product=await prisma.product.findFirst({where:{...visible,OR:[{slug},{id:slug}]},select:pointer});
 if(!product?.publishedRevisionId)return null;
 const revision=await prisma.productRevision.findFirst({where:{id:product.publishedRevisionId,productId:product.id},select:{document:true}});
 return revision?{id:product.id,slug:product.slug||product.id,revisionId:product.publishedRevisionId,document:revision.document as unknown as ImportedDocument}:null;
}
async function readSolution(slug:string){
 const solution=await prisma.solution.findFirst({where:{...visible,slug},select:pointer});
 if(!solution?.publishedRevisionId)return null;
 const revision=await prisma.solutionRevision.findFirst({where:{id:solution.publishedRevisionId,solutionId:solution.id},select:{document:true}});
 return revision?{id:solution.id,slug:solution.slug,revisionId:solution.publishedRevisionId,document:revision.document as unknown as ImportedDocument}:null;
}
// Persistent cache is public-only. React cache also shares the metadata/page lookup per request.
const product=unstable_cache(readProduct,['public-product-document-v1'],{tags:[PRODUCT_CONTENT_TAG],revalidate:300});
const solution=unstable_cache(readSolution,['public-solution-document-v1'],{tags:[SOLUTION_CONTENT_TAG],revalidate:300});
export const getPublishedPage=cache(async(kind:PublishedKind,slug:string)=>kind==='products'?product(slug):solution(slug));
