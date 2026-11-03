import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db/prisma';
import { prepareProject, refreshPortfolio } from '@/lib/portfolio/server';
import { handleApiError } from '@/lib/utils/api-error';
type Context={params:Promise<{id:string}>};
export async function PUT(request:NextRequest,{params}:Context) { try {await requireAdmin(request);requireSameOrigin(request);const {id}=await params;const data=prepareProject(await request.json());const result=await prisma.$transaction(async tx=>{const previous=await tx.portfolioProject.findUniqueOrThrow({where:{id}});const project=await tx.portfolioProject.update({where:{id},data:{...data,publishedAt:data.isDraft?previous.publishedAt:previous.publishedAt??new Date()}});return {project,oldSlug:previous.slug};});refreshPortfolio(result.oldSlug,result.project.slug);return NextResponse.json({project:result.project});}catch(error){return handleApiError(error);} }
export async function DELETE(request:NextRequest,{params}:Context) {try{await requireAdmin(request);requireSameOrigin(request);const project=await prisma.portfolioProject.delete({where:{id:(await params).id}});refreshPortfolio(project.slug);return new NextResponse(null,{status:204});}catch(error){return handleApiError(error);} }
export async function PATCH(request:NextRequest,{params}:Context){
 try{
  await requireAdmin(request);requireSameOrigin(request);
  const {isDraft}=await request.json();
  if(typeof isDraft!=='boolean')return NextResponse.json({error:'Choose whether to hide this project.'},{status:400});
  const {id}=await params;
  const project=await prisma.$transaction(async tx=>{
   const existing=await tx.portfolioProject.findUniqueOrThrow({where:{id}});
   if(!isDraft)prepareProject({...existing,isDraft:false});
   return tx.portfolioProject.update({where:{id},data:{isDraft,publishedAt:isDraft?existing.publishedAt:existing.publishedAt??new Date()}});
  });
  refreshPortfolio(project.slug);
  return NextResponse.json({project});
 }catch(error){return handleApiError(error);}
}
