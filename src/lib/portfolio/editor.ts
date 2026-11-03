import {projectSchema,type ProjectInput} from './schema';
import {articleText} from '@/lib/blog/content';
export const editorSections=[
 {id:'hero',label:'Project & hero',hint:'Title, headline and cover image'},
 {id:'client',label:'Client overview',hint:'Client identity, logo and project facts'},
 {id:'challenge',label:'The challenge',hint:'Problem, pain points and site images'},
 {id:'solution',label:'Our solution',hint:'Your approach, components and images'},
 {id:'technology',label:'Technology stack',hint:'Platform, hardware and connectivity'},
 {id:'journey',label:'Monitoring approach',hint:'Connected step cards'},
 {id:'results',label:'Objectives & results',hint:'Benefits, verified metrics and evidence'},
 {id:'gallery',label:'Project gallery',hint:'Additional project photographs'},
 {id:'testimonial',label:'Client testimonial',hint:'Approved quote and attribution'},
 {id:'contact',label:'Contact & related projects',hint:'Final call to action and download'},
 {id:'seo',label:'Search & publishing',hint:'Search appearance and publishing checks'},
] as const;
export type EditorSection=typeof editorSections[number]['id'];
export type PublishIssue={field:string;section:EditorSection;message:string};
export function fieldSection(field:string):EditorSection{
 if(/client|overview|industry|location|year|duration|deliveryModel|platforms/.test(field)&&!field.includes('heroClient'))return 'client';
 if(/challenge|painPoints/.test(field))return 'challenge';if(/solution|components/.test(field))return 'solution';
 if(/architecture/.test(field))return 'journey';if(/technology/.test(field))return 'technology';
 if(/results|outcomes|comparison|keyWins/.test(field))return 'results';if(/testimonial/.test(field))return 'testimonial';
 if(/cta|document|related/.test(field))return 'contact';if(/gallery/.test(field))return 'gallery';if(/seo|ogImage|noIndex/.test(field))return 'seo';return 'hero';
}
export function publishIssues(data:ProjectInput):PublishIssue[]{
 const issues:PublishIssue[]=[];const add=(field:string,message:string,section=fieldSection(field))=>{if(!issues.some(issue=>issue.field===field))issues.push({field,section,message});};
 const parsed=projectSchema.safeParse(data);
 if(!parsed.success)for(const issue of parsed.error.issues)add(issue.path.join('.'),issue.message);
 const required=[['summary','Add a short project summary.'],['clientName','Add the public client name.'],['industry','Add an industry.'],['coverImage','Upload a cover image.'],['coverAlt','Describe the cover image.']] as const;
 for(const [key,message] of required)if(!data[key]?.trim())add(key,message);
 if(!data.platforms.length)add('platforms','Choose at least one platform.');
 const visible=(section:ProjectInput['caseStudy']['hiddenSections'][number])=>!data.caseStudy.hiddenSections.includes(section);
 for(const [key,section] of [['painPoints','challenge'],['components','solution'],['architectureSteps','technology'],['keyWins','results']] as const){
  if(visible(section))data.caseStudy[key].forEach((card,i)=>{if((card.title||card.description)&&(!card.title.trim()||!card.description.trim()))add(`caseStudy.${key}.${i}.${!card.title.trim()?'title':'description'}`,`Complete the title and description of ${key==='architectureSteps'?'monitoring step':key==='keyWins'?'objective / result':'card'} ${i+1}.`);});
 }
 if(visible('overview'))data.caseStudy.clientFacts.forEach((f,i)=>{if((f.label||f.value)&&(!f.label||!f.value))add(`caseStudy.clientFacts.${i}.${!f.label?'label':'value'}`,`Complete client fact ${i+1}.`,'client');});
 if(visible('technology'))data.technology.forEach((g,i)=>{if((g.label||g.items)&&(!g.label||!g.items))add(`technology.${i}.${!g.label?'label':'items'}`,`Complete technology group ${i+1}.`);});
 if(visible('results'))data.outcomes.forEach((o,i)=>{if((o.value||o.label||o.context)&&(!o.value||!o.label))add(`outcomes.${i}.${!o.value?'value':'label'}`,`Complete measured outcome ${i+1}.`);});
 if(visible('solution')&&!(articleText(data.solution).trim()||data.caseStudy.solutionIntro||data.caseStudy.solutionCallout||data.caseStudy.components.some(c=>c.title||c.description)||data.gallery.some(i=>['solution','dashboard','mobile'].includes(i.section)&&i.url)))add('solution','Add solution text, a component or an image, or hide this section.');
 const placement={challenge:'challenge',solution:'solution',dashboard:'solution',mobile:'solution',results:'results',technology:'technology',gallery:'gallery'} as const;
 data.gallery.forEach((image,i)=>{if(visible(placement[image.section])&&(!image.url||!image.alt.trim()))add(`gallery.${i}.${!image.url?'url':'alt'}`,`Add ${!image.url?'a file':'an image description'} for ${image.section} image ${i+1}.`,placement[image.section]);});
 return issues;
}
export function guidedProject():ProjectInput{
 return {...projectSchema.parse({title:'Untitled project',slug:'untitled-project',caseStudy:{heroTitle:'',heroAccent:'',overviewHeading:'About the client',challengeHeading:'The challenge',solutionHeading:'Our connected solution',technologyHeading:'Platform, hardware & [connectivity]',architectureTitle:'Monitoring approach',architectureSteps:['Measure','Connect','Understand','Review'].map(title=>({title,description:'',icon:'sensor'})),resultsHeading:'What the project aims to enable',galleryHeading:'Deployment in pictures',ctaHeading:'Connect your [infrastructure]'},galleryLayout:'mixed'}),title:'',slug:''};
}
export function copyProject(source:ProjectInput):ProjectInput{return {...structuredClone(source),title:`${source.title} (copy)`,slug:`${source.slug.slice(0,104)}-copy-${crypto.randomUUID().slice(0,8)}`,isDraft:true,featured:false,order:0};}
export function restoreEditorData(value:unknown):ProjectInput|null{
 if(!value||typeof value!=='object')return null;const source=value as Record<string,unknown>;
 const result=projectSchema.safeParse({...source,title:source.title||'Untitled recovery',slug:source.slug||'recovered-project'});
 return result.success?{...result.data,title:typeof source.title==='string'?source.title:'',slug:typeof source.slug==='string'?source.slug:''}:null;
}
