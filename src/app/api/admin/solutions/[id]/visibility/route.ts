import { NextRequest, NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { apiErrors, handleApiError } from '@/lib/utils/api-error';
import { revalidateSolutions } from '@/lib/utils/revalidate-solutions';

export async function POST(request:NextRequest,{params}:{params:Promise<{id:string}>}) {
 try {
  await requireAdmin(request);requireSameOrigin(request);
  const {visible}=await request.json();
  if(typeof visible!=='boolean')throw apiErrors.badRequest('Choose whether to show or hide this solution.');
  const {id}=await params;
  const saved=await prisma.$transaction(async tx=>{
   const solution=await tx.solution.findUnique({where:{id}});
   if(!solution)throw apiErrors.notFound();
   if(visible){
    if(solution.isDraft)throw apiErrors.badRequest("Publish the page before listing it on the website.");
    const live=solution.publishedRevisionId?await tx.solutionRevision.findFirst({where:{id:solution.publishedRevisionId,solutionId:id}}):null;
    if(!live)throw apiErrors.badRequest('Publish the draft in the editor first.');
   }
   return tx.solution.update({where:{id},data:{isListed:visible}});
  },{isolationLevel:Prisma.TransactionIsolationLevel.Serializable});
  revalidateSolutions(saved.slug);
  return NextResponse.json({isListed:saved.isListed});
 }catch(error){return handleApiError(error);}
}
