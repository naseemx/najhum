import ProjectEditor from '@/components/admin/portfolio/ProjectEditor';
import { projectSchema } from '@/lib/portfolio/schema';
import { portfolioChoices } from '@/lib/portfolio/choices';
export default async function NewProject(){const choices=await portfolioChoices();return <ProjectEditor initialData={{...projectSchema.parse({title:'Untitled project',slug:'untitled-project'}),title:'',slug:''}} {...choices}/>;}
