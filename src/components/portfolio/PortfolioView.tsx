import Link from 'next/link';
import { ArrowUpRight, BriefcaseBusiness } from 'lucide-react';
import { platformLabels, type ProjectInput } from '@/lib/portfolio/schema';
import './portfolio.css';
export type ProjectView = ProjectInput & {id?:string};
export function ProjectCard({project}:{project:ProjectView}) {return <article className="pf-card"><Link className="pf-card-image" href={`/portfolio/${project.slug}`}>{project.coverImage?<img src={project.coverImage} alt={project.coverAlt} loading="lazy"/>:<BriefcaseBusiness size={32}/>}</Link><div className="pf-card-copy"><div className="pf-tags">{project.platforms.map(platform=><span key={platform}>{platformLabels[platform]}</span>)}</div><p className="pf-eyebrow">{project.clientName} {project.industry&&`/ ${project.industry}`}</p><h2><Link href={`/portfolio/${project.slug}`}>{project.title}</Link></h2><p>{project.summary}</p><Link className="pf-link" href={`/portfolio/${project.slug}`}>Explore the project <ArrowUpRight size={17}/></Link></div></article>;}
export {default} from './CaseStudyView';
