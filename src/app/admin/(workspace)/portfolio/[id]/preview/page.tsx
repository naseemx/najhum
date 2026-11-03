import {portfolioResources} from '@/lib/portfolio/choices';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { prisma } from '@/lib/db/prisma';
import { projectSchema } from '@/lib/portfolio/schema';
import PortfolioView from '@/components/portfolio/PortfolioView';
export default async function PreviewProject({params}:{params:Promise<{id:string}>}){const record=await prisma.portfolioProject.findUnique({where:{id:(await params).id}});if(!record)notFound();return <><Link className="blog-admin-button" href={`/admin/portfolio/${record.id}/edit`}>Back to editing</Link><p className="blog-admin-notice">Private admin preview · Saved content</p><PortfolioView project={projectSchema.parse(record)} resources={await portfolioResources()} preview/></>;}
