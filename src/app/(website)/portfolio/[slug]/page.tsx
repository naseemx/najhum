import {portfolioResources} from '@/lib/portfolio/choices';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { publishedProjects } from '@/lib/portfolio/server';
import { projectSchema } from '@/lib/portfolio/schema';
import { buildMetadata, pageSchema } from '@/lib/seo';
import StructuredData from '@/components/seo/StructuredData';
import PortfolioView from '@/components/portfolio/PortfolioView';
export const dynamic='force-dynamic';
type Props={params:Promise<{slug:string}>};
async function get(slug:string){return prisma.portfolioProject.findFirst({where:{slug,...publishedProjects}});}
export async function generateMetadata({params}:Props){const project=await get((await params).slug);if(!project)notFound();return buildMetadata({title:project.seoTitle||project.title,description:project.seoDescription||project.summary,path:`/portfolio/${project.slug}`,image:project.ogImage||project.coverImage,noIndex:project.noIndex});}
export default async function ProjectPage({params}:Props){const record=await get((await params).slug);if(!record)notFound();const project=projectSchema.parse(record);const [related,resources]=await Promise.all([prisma.portfolioProject.findMany({where:{...publishedProjects,id:{not:record.id},OR:[{platforms:{hasSome:project.platforms}},{industry:project.industry}]},orderBy:[{featured:'desc'},{publishedAt:'desc'}],take:3}),portfolioResources()]);return <><StructuredData data={pageSchema({title:project.title,description:project.summary,path:`/portfolio/${project.slug}`})}/><PortfolioView project={project} related={related.map(item=>projectSchema.parse(item))} resources={resources}/></>;}
