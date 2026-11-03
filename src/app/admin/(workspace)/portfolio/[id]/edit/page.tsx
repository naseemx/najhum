import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db/prisma';
import { projectSchema } from '@/lib/portfolio/schema';
import { portfolioChoices } from '@/lib/portfolio/choices';
import ProjectEditor from '@/components/admin/portfolio/ProjectEditor';
export default async function EditProject({params}:{params:Promise<{id:string}>}){const record=await prisma.portfolioProject.findUnique({where:{id:(await params).id}});if(!record)notFound();return <ProjectEditor id={record.id} initialData={projectSchema.parse(record)} {...await portfolioChoices()}/>;}
