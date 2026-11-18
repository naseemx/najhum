import {NextRequest,NextResponse} from 'next/server';
import {z} from 'zod';
import {prisma} from '@/lib/db/prisma';
import {requireAdmin,requireSameOrigin} from '@/lib/auth/require-admin';
import {handleApiError,apiErrors} from '@/lib/utils/api-error';
import {getTaxonomy} from '@/lib/products/catalog';
import {refreshProducts} from '@/lib/products/server';
const schema=z.object({kind:z.enum(['category','group','option']),id:z.string().optional(),groupId:z.string().optional(),name:z.string().trim().min(1).max(100),slug:z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/).max(100).optional(),icon:z.enum(['grid','people','bolt','building','water','air','sensor']).default('grid'),order:z.number().int().min(0).max(100000).default(0),isActive:z.boolean().default(true)});
const slug=(name:string)=>name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,100);
export async function GET(req:NextRequest){try{await requireAdmin(req);return NextResponse.json(await getTaxonomy());}catch(error){return handleApiError(error);}}
export async function POST(req:NextRequest){try{
 await requireAdmin(req);requireSameOrigin(req);const data=schema.parse(await req.json());
 const common={name:data.name,order:data.order,isActive:data.isActive,...(!data.id?{slug:data.slug||slug(data.name)}:{})};
 if(!data.id&&!common.slug)throw apiErrors.badRequest('Add a URL-safe name or slug.');
 let record;
 // IDs/slugs remain stable when labels are renamed. Archive instead of deleting assignments.
 if(data.kind==='category')record=data.id?await prisma.productCategory.update({where:{id:data.id},data:{...common,icon:data.icon}}):await prisma.productCategory.create({data:{...common,slug:common.slug!,icon:data.icon}});
 else if(data.kind==='group')record=data.id?await prisma.productFilterGroup.update({where:{id:data.id},data:common}):await prisma.productFilterGroup.create({data:{...common,slug:common.slug!}});
 else {if(!data.groupId)throw apiErrors.badRequest('Choose a filter group.');const group=await prisma.productFilterGroup.findUnique({where:{id:data.groupId}});if(!group)throw apiErrors.notFound();if(data.id){const existing=await prisma.productFilterOption.findFirst({where:{id:data.id,groupId:data.groupId}});if(!existing)throw apiErrors.notFound();}record=data.id?await prisma.productFilterOption.update({where:{id:data.id},data:common}):await prisma.productFilterOption.create({data:{...common,slug:common.slug!,groupId:data.groupId}});}
 refreshProducts();return NextResponse.json({record,taxonomy:await getTaxonomy()});
 }catch(error){return handleApiError(error);}}
