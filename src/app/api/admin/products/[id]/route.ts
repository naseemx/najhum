import {NextRequest,NextResponse} from 'next/server';
import {prisma} from '@/lib/db/prisma';
import {requireAdmin,requireSameOrigin} from '@/lib/auth/require-admin';
import {handleApiError,apiErrors} from '@/lib/utils/api-error';
import {refreshProducts} from '@/lib/products/server';
import {cleanUnusedImportAssets} from '@/lib/solution-import/storage-cleanup';
import type {ImportedDocument} from '@/lib/solution-import/types';
type Context={params:Promise<{id:string}>};
export async function GET(req:NextRequest,{params}:Context){try{await requireAdmin(req);const product=await prisma.product.findUnique({where:{id:(await params).id}});if(!product)throw apiErrors.notFound();return NextResponse.json({product});}catch(error){return handleApiError(error);}}
export async function PUT(req:NextRequest){try{await requireAdmin(req);return NextResponse.json({error:'Use the HTML/ZIP product editor.'},{status:410});}catch(error){return handleApiError(error);}}
export async function DELETE(req:NextRequest,{params}:Context){try{await requireAdmin(req);requireSameOrigin(req);const {id}=await params;const removed=await prisma.$transaction(async tx=>{const product=await tx.product.findUniqueOrThrow({where:{id},include:{revisions:true}});await tx.product.delete({where:{id}});return product;});await cleanUnusedImportAssets(removed.revisions.map(r=>r.document as unknown as ImportedDocument)).catch(error=>console.error('Product cleanup failed',error));refreshProducts(removed.slug||removed.id);return new NextResponse(null,{status:204});}catch(error){return handleApiError(error);}}
export async function PATCH(req:NextRequest,{params}:Context){try{await requireAdmin(req);requireSameOrigin(req);const {isDraft}=await req.json();if(typeof isDraft!=='boolean')throw apiErrors.badRequest('Choose visibility.');const {id}=await params;const product=await prisma.$transaction(async tx=>{const existing=await tx.product.findUniqueOrThrow({where:{id}});if(!isDraft){const live=existing.publishedRevisionId?await tx.productRevision.findFirst({where:{id:existing.publishedRevisionId,productId:id}}):null;if(!live)throw apiErrors.badRequest('Publish the draft in the editor first.');}return tx.product.update({where:{id},data:{isDraft}});});refreshProducts(product.slug||product.id);return NextResponse.json({product});}catch(error){return handleApiError(error);}}
