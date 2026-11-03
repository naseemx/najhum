import { describe,it,expect } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { projectSchema } from './schema';
import PortfolioView from '@/components/portfolio/PortfolioView';
import CustomSection from '@/components/solutions/CustomSection';
import { makePreset } from '@/lib/builder/catalog';
import { customContentSchema } from '@/lib/validation/section-schemas';
import type { CustomContent } from '@/types/section';
describe('portfolio content and media',()=>{
 it('hides absent optional sections and sanitizes rendered stories',()=>{
 const project=projectSchema.parse({title:'Campus',slug:'campus',solution:'<h2>Connected assets</h2><p>On site</p><script>alert(1)</script>'});
 const html=renderToStaticMarkup(<PortfolioView project={project}/>);
 expect(html).toContain('Connected assets');expect(html).not.toContain('<script>');expect(html).not.toContain('Technology stack');expect(html).not.toContain('Project gallery');expect(html).not.toContain('Client overview');
 });
 it('keeps section image assignments, captions and gallery layout in saved input',()=>{
 const project=projectSchema.parse({title:'Campus',slug:'campus',galleryLayout:'full',gallery:[{url:'/a.webp',alt:'Sensor',caption:'Inside the plant room',section:'challenge'},{url:'/b.webp',alt:'Building',caption:'Exterior',section:'gallery'}]});
 const html=renderToStaticMarkup(<PortfolioView project={project}/>);
 expect(html).toContain('pf-gallery-full');expect(html).toContain('Inside the plant room');expect(html).toContain('Exterior');expect(html).toContain('Enlarge image: Sensor');
 expect(()=>projectSchema.parse({...project,coverImage:'javascript:alert(1)'})).toThrow();
 });
 it('renders the approved structured layout while keeping legacy stories compatible',()=>{
 const project=projectSchema.parse({title:'Campus project',slug:'campus',challenge:'<h2>Original heading</h2><p>Existing story</p>',galleryLayout:'mixed',gallery:[{url:'/diagram.webp',alt:'System diagram',section:'technology'}],caseStudy:{heroTitle:'One campus.',heroAccent:'Connected.',clientFacts:[{label:'Location',value:'Dubai'}],challengeHeading:'A clearer challenge',painPoints:[{title:'Data visibility',description:'Understand the readings.'}],components:[{title:'Energy',description:'Sub-metered loads.',icon:'energy'}],architectureSteps:[{title:'Measure',description:'Sensors',icon:'sensor'},{title:'Connect',description:'Network',icon:'network'}],keyWins:[{title:'Context',description:'Asset-level review.'}],outcomeMode:'results',comparisonRows:[{label:'Baseline',value:100},{label:'Current',value:80}],comparisonUnit:' kWh'}});
 const html=renderToStaticMarkup(<PortfolioView project={project}/>);
 for(const value of ['One campus.','Connected.','A clearer challenge','Existing story','Data visibility','Sub-metered loads.','Measure','System diagram','100','80','kWh'])expect(html).toContain(value);
 expect(html).not.toContain('Original heading');expect(html.indexOf('id="technology"')).toBeLessThan(html.indexOf('id="project-results"'));
 expect(project.caseStudy.components[0].icon).toBe('energy');
 });
 it('defaults old projects safely and rejects invalid comparison and media values',()=>{
 const project=projectSchema.parse({title:'Old project',slug:'old-project'});
 expect(project.caseStudy.painPoints).toEqual([]);expect(project.caseStudy.heroTitle).toBe('');
 expect(()=>projectSchema.parse({...project,caseStudy:{comparisonRows:[{label:'Invalid',value:-1}]}})).toThrow();
 expect(()=>projectSchema.parse({...project,caseStudy:{components:[{title:'Invalid',description:'Icon',icon:'unknown'}]}})).toThrow();
 expect(()=>projectSchema.parse({...project,gallery:[{url:'javascript:alert(1)',alt:'Unsafe',section:'dashboard'}]})).toThrow();
 });
 it('removes hidden sections and their navigation even when saved content exists',()=>{
 const project=projectSchema.parse({title:'Campus',slug:'campus',solution:'<p>Private solution wording</p>',challenge:'<p>Hidden challenge</p>',technology:[{label:'Hidden technology',items:'Sensors'}],caseStudy:{hiddenSections:['challenge','technology'],showFacts:false}});
 const html=renderToStaticMarkup(<PortfolioView project={project}/>);
 expect(html).not.toContain('id="project-challenge"');expect(html).not.toContain('id="technology"');expect(html).not.toContain('Hidden challenge');expect(html).not.toContain('Hidden technology');expect(html).not.toContain('class="pc-facts"');expect(html).not.toContain('Case study sections');expect(html).toContain('Private solution wording');
 });
 it('collapses empty rich text and uses a single content column for cards without narrative',()=>{
 const project=projectSchema.parse({title:'Campus',slug:'campus',challenge:'<p><br></p>',results:'<p> </p>',caseStudy:{components:[{title:'Energy',description:'Metering'}]}});
 const html=renderToStaticMarkup(<PortfolioView project={project}/>);
 expect(html).not.toContain('id="project-challenge"');expect(html).not.toContain('id="project-results"');expect(html).not.toContain('class="pc-solution-grid"');expect(html).toContain('Metering');
 });
 it('uses safe explicit heading accents and does not render blank saved card shells',()=>{
 const project=projectSchema.parse({title:'Campus',slug:'campus',solution:'<p>Monitoring</p>',caseStudy:{solutionHeading:'Connected [operations]',components:[{title:'',description:''}]}});
 const html=renderToStaticMarkup(<PortfolioView project={project}/>);
 expect(html).toContain('aria-label="Connected operations"');expect(html).toContain('class="pc-title-accent">operations</span>');expect(html).not.toContain('class="pc-components"');
 });
 it('removes duplicate hero and story images from the gallery without leaving navigation or section gaps',()=>{
 const project=projectSchema.parse({title:'Campus',slug:'campus',coverImage:'/cover.webp',solution:'<p>Story</p>',gallery:[{url:'/cover.webp',alt:'Repeated cover',section:'gallery'},{url:'/sensor.webp',alt:'Sensor',section:'solution'},{url:'/sensor.webp',alt:'Repeated sensor',section:'gallery'}]});
 const html=renderToStaticMarkup(<PortfolioView project={project}/>);
 expect(html).not.toContain('id="project-gallery"');expect(html).not.toContain('Repeated cover');expect(html).not.toContain('Repeated sensor');expect(html).toContain('Enlarge image: Sensor');
 });
 it('deduplicates overview facts only when those values already appear in the hero',()=>{
 const base={title:'Campus',slug:'campus',location:'Dubai',clientOverview:'Project overview',caseStudy:{clientFacts:[{label:'Repeated location',value:'Dubai'},{label:'Connectivity',value:'LoRaWAN'}]}};
 expect(renderToStaticMarkup(<PortfolioView project={projectSchema.parse(base)}/>)).not.toContain('Repeated location');
 const html=renderToStaticMarkup(<PortfolioView project={projectSchema.parse({...base,caseStudy:{...base.caseStudy,showFacts:false}})}/>);
 expect(html).toContain('Repeated location');expect(html).toContain('Connectivity');
 });
 it('distinguishes objectives from verified results and places breadcrumbs before the hero',()=>{
 const base={title:'Campus',slug:'campus',outcomes:[{value:'21%',label:'Measured improvement'}],caseStudy:{keyWins:[{title:'Visibility',description:'Review monitored assets'}],comparisonRows:[{label:'Before',value:100}]}};
 const html=renderToStaticMarkup(<PortfolioView project={projectSchema.parse(base)}/>);
 expect(html).toContain('Project objectives');expect(html).not.toContain('21%');expect(html).not.toContain('Measured impact');expect(html.indexOf('class="pc-breadcrumb')).toBeLessThan(html.indexOf('<header class="pc-hero'));
 const verified=renderToStaticMarkup(<PortfolioView project={projectSchema.parse({...base,caseStudy:{...base.caseStudy,outcomeMode:'results'}})}/>);
 expect(verified).toContain('Results &amp; outcomes');expect(verified).toContain('21%');expect(verified).toContain('Measured impact');
 });
 it('adds a repeatable image gallery to the existing solution section system',()=>{
 const section=makePreset('project-gallery');
 const content={...section.content,columns:1,entries:[{title:'',description:'Site caption',image:'/site.webp',imageAlt:'Site photo'}]};
 expect(customContentSchema.safeParse(content).success).toBe(true);
 const html=renderToStaticMarkup(<CustomSection content={content as CustomContent}/>);
 expect(html).toContain('Site caption');expect(html).toContain('pf-gallery-full');
 });
});
