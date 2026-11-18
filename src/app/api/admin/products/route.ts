import {NextRequest,NextResponse} from 'next/server';
import {prisma} from '@/lib/db/prisma';
import {requireAdmin} from '@/lib/auth/require-admin';
import {handleApiError} from '@/lib/utils/api-error';
export async function GET(req:NextRequest){try{await requireAdmin(req);const products=await prisma.product.findMany({orderBy:{order:'asc'}});return NextResponse.json({products});}catch(error){return handleApiError(error);}}
export async function POST(req:NextRequest){try{await requireAdmin(req);return NextResponse.json({error:'Use the HTML/ZIP product editor.'},{status:410});}catch(error){return handleApiError(error);}}
