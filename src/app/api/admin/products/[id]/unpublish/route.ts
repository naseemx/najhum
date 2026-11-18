import {NextRequest,NextResponse} from 'next/server';
import {requireAdmin,requireSameOrigin} from '@/lib/auth/require-admin';
import {prisma} from '@/lib/db/prisma';
import {handleApiError} from '@/lib/utils/api-error';
import {refreshProducts} from '@/lib/products/server';
export async function POST(req:NextRequest,{params}:{params:Promise<{id:string}>}){try{await requireAdmin(req);requireSameOrigin(req);const project=await prisma.product.update({where:{id:(await params).id},data:{isDraft:true}});refreshProducts(project.slug||project.id);return NextResponse.json({isDraft:true});}catch(error){return handleApiError(error);}}
