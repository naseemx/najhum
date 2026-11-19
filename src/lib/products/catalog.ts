import {unstable_cache} from 'next/cache';
import {PRODUCT_CONTENT_TAG} from '@/lib/published-content/constants';
import {prisma} from '@/lib/db/prisma';
export const publishedProducts={isDraft:false,contentMode:'HTML',publishedRevisionId:{not:null}} as const;
async function readTaxonomy(activeOnly=false){
 const [categories,groups]=await Promise.all([
  prisma.productCategory.findMany({where:activeOnly?{isActive:true}:{},orderBy:[{order:'asc'},{name:'asc'}]}),
  prisma.productFilterGroup.findMany({where:activeOnly?{isActive:true}:{},orderBy:[{order:'asc'},{name:'asc'}],include:{options:{where:activeOnly?{isActive:true}:{},orderBy:[{order:'asc'},{name:'asc'}]}}}),
 ]);return {categories,groups};
}
async function readCatalogProducts(){
 const records=await prisma.product.findMany({where:publishedProducts,select:catalogProductSelect,orderBy:[{order:'asc'},{name:'asc'}]});
 return records.map(p=>({id:p.id,slug:p.slug||p.id,name:p.name,model:p.modelCode,description:p.description,image:p.imageUrl||'',platforms:p.platforms,brochure:!!p.brochureUrl,brochureUrl:p.brochureUrl,categoryIds:p.categoryAssignments.map(c=>c.categoryId),optionIds:p.filterAssignments.map(f=>f.optionId),highlights:Array.isArray(p.features)?p.features.filter((x):x is string=>typeof x==='string'):[]}));
}
export const catalogProductSelect={id:true,slug:true,name:true,modelCode:true,description:true,imageUrl:true,platforms:true,brochureUrl:true,features:true,categoryAssignments:{select:{categoryId:true}},filterAssignments:{select:{optionId:true}}} as const;
const publicTaxonomy=unstable_cache(()=>readTaxonomy(true),['public-product-taxonomy-v1'],{tags:[PRODUCT_CONTENT_TAG],revalidate:300});
export function getTaxonomy(activeOnly=false){return activeOnly?publicTaxonomy():readTaxonomy(false);}
export const getCatalogProducts=unstable_cache(readCatalogProducts,['public-product-catalog-v1'],{tags:[PRODUCT_CONTENT_TAG],revalidate:300});
export const getRelatedCatalogProducts=unstable_cache(async(sourceId:string)=>{
 const rows=await prisma.relatedProduct.findMany({where:{sourceId,target:publishedProducts},orderBy:{position:'asc'},select:{target:{select:catalogProductSelect}}});
 return rows.map(({target:p})=>({id:p.id,slug:p.slug||p.id,name:p.name,model:p.modelCode,description:p.description,image:p.imageUrl||'',platforms:p.platforms,brochure:!!p.brochureUrl,brochureUrl:p.brochureUrl,categoryIds:p.categoryAssignments.map(c=>c.categoryId),optionIds:p.filterAssignments.map(f=>f.optionId),highlights:Array.isArray(p.features)?p.features.filter((x):x is string=>typeof x==='string'):[]}));
},['public-related-products-v1'],{tags:[PRODUCT_CONTENT_TAG],revalidate:300});
export const getProductCardCategories=unstable_cache(()=>prisma.productCategory.findMany({where:{isActive:true},orderBy:[{order:'asc'},{name:'asc'}]}),['public-product-card-categories-v1'],{tags:[PRODUCT_CONTENT_TAG],revalidate:300});
export type CatalogProduct=Awaited<ReturnType<typeof getCatalogProducts>>[number];
export type Taxonomy=Awaited<ReturnType<typeof getTaxonomy>>;
