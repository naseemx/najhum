import {generateSlug} from '@/lib/utils/slug';
import type {PortfolioResource} from './resources';
import {prisma} from '@/lib/db/prisma';
import {projectSchema} from './schema';
import {CLIENT_LOGOS} from './client-logos';
export async function portfolioResources():Promise<PortfolioResource[]>{
 const [products,solutions]=await Promise.all([
  prisma.product.findMany({where:{isDraft:false},select:{id:true,name:true,imageUrl:true},orderBy:{name:'asc'}}),
  prisma.solution.findMany({where:{isDraft:false},select:{id:true,title:true,slug:true,coverImage:true},orderBy:{title:'asc'}})
 ]);
 return [...products.map(p=>({id:p.id,kind:'Product' as const,title:p.name,image:p.imageUrl,href:`/products/${generateSlug(p.name)}`})),...solutions.map(s=>({id:s.id,kind:'Solution' as const,title:s.title,image:s.coverImage,href:`/solutions/${s.slug}`}))];
}
export async function portfolioChoices(){
 const records=await prisma.portfolioProject.findMany({orderBy:[{featured:'desc'},{publishedAt:'desc'},{updatedAt:'desc'}],take:100});
 const sources=records.map(record=>({id:record.id,project:projectSchema.parse(record),published:!record.isDraft&&!!record.publishedAt}));
 const logos=[...CLIENT_LOGOS.map(logo=>({name:logo.name,src:logo.src})),...records.filter(p=>p.clientLogo).map(p=>({name:p.clientName||p.title,src:p.clientLogo}))].filter((logo,index,list)=>list.findIndex(l=>l.src===logo.src)===index);
 return {sources,logos,resources:await portfolioResources()};
}
