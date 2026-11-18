import {parseDocument} from 'htmlparser2';
import {findAll} from 'domutils';
import type {Element} from 'domhandler';
import {Prisma} from '@prisma/client';
import {prisma} from '@/lib/db/prisma';
import {apiErrors} from '@/lib/utils/api-error';
import {describeAssets} from '@/lib/solution-import/asset-edits';
import {cleanUnusedImportAssets} from '@/lib/solution-import/storage-cleanup';
import type {ImportedDocument} from '@/lib/solution-import/types';
import {revalidatePath} from 'next/cache';
export function refreshProducts(...slugs:string[]){for(const path of ['/products','/admin/products','/admin/dashboard','/sitemap.xml',...slugs.map(s=>`/products/${s}`),'/platforms/iotrics','/platforms/evoltics','/platforms/cropifai'])revalidatePath(path);}
export async function saveProductImport(id:string|undefined,document:ImportedDocument,actor:string,baseRevisionId?:string){
 const result=await prisma.$transaction(async tx=>{
  let product=id?await tx.product.findUnique({where:{id}}):null;
  if(id&&!product)throw apiErrors.notFound();
  if(!product)product=await tx.product.create({data:{name:document.metadata.title,description:document.metadata.menuDescription,slug:document.metadata.slug,contentMode:'HTML',isDraft:true,platforms:[],solutions:[]}});
  const latest=await tx.productRevision.findFirst({where:{productId:product.id},orderBy:{number:'desc'}});
  if((latest?.id||'')!==(baseRevisionId||''))throw apiErrors.conflict('Another administrator changed this draft. Reload before saving.');
  const obsolete=await tx.productRevision.findMany({where:{productId:product.id,id:{notIn:product.publishedRevisionId?[product.publishedRevisionId]:[]}}});
  const revision=await tx.productRevision.create({data:{productId:product.id,number:(latest?.number||0)+1,document:document as unknown as Prisma.InputJsonValue,createdBy:actor}});
  await tx.productRevision.deleteMany({where:{id:{in:obsolete.map(d=>d.id)}}});
  await tx.product.update({where:{id:product.id},data:{updatedAt:new Date()}});
  return {id:product.id,revisionId:revision.id,number:revision.number,obsolete:obsolete.map(d=>d.document as unknown as ImportedDocument)};
 },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
 await cleanUnusedImportAssets(result.obsolete).catch(error=>console.error('Product upload cleanup failed',error));
 return {id:result.id,revisionId:result.revisionId,number:result.number};
}
export async function publishProductImport(id:string,revisionId:string){
 const result=await prisma.$transaction(async tx=>{
  const product=await tx.product.findUniqueOrThrow({where:{id}});
  const revision=await tx.productRevision.findFirst({where:{productId:id},orderBy:{number:'desc'}});
  if(!revision||revision.id!==revisionId)throw apiErrors.conflict('The draft changed. Reload before publishing.');
  const page=revision.document as unknown as ImportedDocument,m=page.metadata;
  const dom=parseDocument(page.html);
  const hooks=findAll(node=>node.type==='tag'&&(node as Element).attribs?.['data-najhum-action']==='download-datasheet',dom.children);
  const slots=findAll(node=>node.type==='tag'&&(node as Element).attribs?.['data-najhum-slot']==='related-products',dom.children);
  if(m.brochureUrl&&!hooks.length)throw apiErrors.badRequest('Add data-najhum-action="download-datasheet" to the download buttons in your HTML before attaching a PDF.');
  if(slots.length>1)throw apiErrors.badRequest('Use only one related-products slot in the HTML.');
  const categoryIds=[...new Set(m.categoryIds||[])],optionIds=[...new Set(m.filterOptionIds||[])],relatedIds=[...new Set(m.relatedProductIds||[])];
  if(!categoryIds.length)throw apiErrors.badRequest('Select at least one product category.');
  if(await tx.productCategory.count({where:{id:{in:categoryIds},isActive:true}})!==categoryIds.length)throw apiErrors.badRequest('Select active product categories.');
  const options=await tx.productFilterOption.findMany({where:{id:{in:optionIds},isActive:true,group:{isActive:true}},include:{group:true}});
  if(options.length!==optionIds.length)throw apiErrors.badRequest('A selected filter option is hidden or unavailable.');
  if(relatedIds.includes(id))throw apiErrors.badRequest('A product cannot relate to itself.');
  if(await tx.product.count({where:{id:{in:relatedIds},isDraft:false,contentMode:'HTML',publishedRevisionId:{not:null}}})!==relatedIds.length)throw apiErrors.badRequest('Related products must be published and visible.');
  const obsolete=await tx.productRevision.findMany({where:{productId:id,id:{not:revision.id}}});
  const platforms=options.filter(o=>o.group.slug==='platform'&&['iotrics','evoltics','cropifai'].includes(o.slug)).map(o=>o.slug);
  await tx.product.update({where:{id},data:{name:m.title,slug:m.slug,description:m.menuDescription,modelCode:m.modelCode||'',imageUrl:m.coverImage||null,brochureUrl:m.brochureUrl||null,seoTitle:m.seoTitle,seoDescription:m.metaDescription,socialImage:m.socialImage||'',socialImageAlt:m.socialImageAlt||'',features:m.highlights||[],details:{model:m.modelCode||''},platforms,contentMode:'HTML',publishedRevisionId:revision.id,isDraft:false}});
  await tx.productCategoryAssignment.deleteMany({where:{productId:id}});
  await tx.productFilterAssignment.deleteMany({where:{productId:id}});
  await tx.relatedProduct.deleteMany({where:{sourceId:id}});
  await tx.productCategoryAssignment.createMany({data:categoryIds.map(categoryId=>({productId:id,categoryId}))});
  if(optionIds.length)await tx.productFilterAssignment.createMany({data:optionIds.map(optionId=>({productId:id,optionId}))});
  if(relatedIds.length)await tx.relatedProduct.createMany({data:relatedIds.map((targetId,position)=>({sourceId:id,targetId,position}))});
  await tx.productRevision.deleteMany({where:{productId:id,id:{not:revision.id}}});
  return {slug:m.slug,oldSlug:product.slug||product.id,obsolete:obsolete.map(d=>d.document as unknown as ImportedDocument)};
 },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
 await cleanUnusedImportAssets(result.obsolete).catch(error=>console.error('Product upload cleanup failed',error));
 return {slug:result.slug,oldSlug:result.oldSlug};
}
export async function getProductImportSession(id:string){
 const product=await prisma.product.findUnique({where:{id},include:{revisions:{orderBy:{number:'desc'},take:1}}});
 if(!product)return null;const draft=product.revisions[0];
 return {id:product.id,publishedSlug:product.slug||product.id,isDraft:product.isDraft,publishedRevisionId:product.publishedRevisionId,baseRevisionId:draft?.id||'',document:draft?describeAssets(draft.document as unknown as ImportedDocument):null,revisions:draft?[{id:draft.id,number:draft.number,createdAt:draft.createdAt.toISOString()}]:[]};
}
