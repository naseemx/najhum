import { NextRequest,NextResponse } from 'next/server';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db/prisma';
import { settingsSchema } from '@/lib/portfolio/schema';
import { refreshPortfolio } from '@/lib/portfolio/server';
import { handleApiError } from '@/lib/utils/api-error';
export async function PUT(request:NextRequest){try{await requireAdmin(request);requireSameOrigin(request);const data=settingsSchema.parse(await request.json());await prisma.portfolioSettings.upsert({where:{id:'main'},create:{id:'main',...data},update:data});refreshPortfolio();return NextResponse.json({saved:true});}catch(error){return handleApiError(error);}}
