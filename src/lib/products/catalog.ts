import {prisma} from '@/lib/db/prisma';
export const publishedProducts={isDraft:false,contentMode:'HTML',publishedRevisionId:{not:null}} as const;
export async function getTaxonomy(activeOnly=false){
 const [categories,groups]=await Promise.all([
  prisma.productCategory.findMany({where:activeOnly?{isActive:true}:{},orderBy:[{order:'asc'},{name:'asc'}]}),
  prisma.productFilterGroup.findMany({where:activeOnly?{isActive:true}:{},orderBy:[{order:'asc'},{name:'asc'}],include:{options:{where:activeOnly?{isActive:true}:{},orderBy:[{order:'asc'},{name:'asc'}]}}}),
 ]);return {categories,groups};
}
export async function getCatalogProducts(){
 const records=await prisma.product.findMany({where:publishedProducts,include:{categoryAssignments:true,filterAssignments:true},orderBy:[{order:'asc'},{name:'asc'}]});
 return records.map(p=>({id:p.id,slug:p.slug||p.id,name:p.name,model:p.modelCode,description:p.description,image:p.imageUrl||'',platforms:p.platforms,brochure:!!p.brochureUrl,brochureUrl:p.brochureUrl,categoryIds:p.categoryAssignments.map(c=>c.categoryId),optionIds:p.filterAssignments.map(f=>f.optionId),highlights:Array.isArray(p.features)?p.features.filter((x):x is string=>typeof x==='string'):[]}));
}
export type CatalogProduct=Awaited<ReturnType<typeof getCatalogProducts>>[number];
export type Taxonomy=Awaited<ReturnType<typeof getTaxonomy>>;
