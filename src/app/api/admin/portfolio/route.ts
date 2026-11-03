import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin, requireSameOrigin } from '@/lib/auth/require-admin';
import { prisma } from '@/lib/db/prisma';
import { prepareProject, refreshPortfolio } from '@/lib/portfolio/server';
import { handleApiError } from '@/lib/utils/api-error';
export async function POST(request:NextRequest) { try { await requireAdmin(request);requireSameOrigin(request);const data=prepareProject(await request.json());const project=await prisma.portfolioProject.create({data:{...data,publishedAt:data.isDraft?null:new Date()}});refreshPortfolio(project.slug);return NextResponse.json({project},{status:201}); } catch(error){return handleApiError(error);} }
